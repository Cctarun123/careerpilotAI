const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');
const { GEMINI_PROMPTS } = require('../services/promptTemplates');
const { callGemini } = require('../services/geminiService');
const { safeJsonParse } = require('../utils/jsonSafeParse');

async function resolveResumeContext(req) {
  const { resumeId, resumeText, targetRole } = req.body;
  let text = resumeText;
  let id = resumeId;

  if (!text && resumeId) {
    const resume = await Resume.findById(resumeId);
    if (!resume || resume.user_id !== req.user.id) {
      return { error: 'Resume not found', status: 404 };
    }
    text = resume.raw_text;
    id = resume.id;
  }

  if (!text) {
    const latest = await Resume.findLatestByUserId(req.user.id);
    if (!latest) {
      return { error: 'Upload a resume first', status: 400 };
    }
    text = latest.raw_text;
    id = latest.id;
  }

  const role = targetRole || req.user.target_role;
  if (!role) {
    return { error: 'Set a target role first', status: 400 };
  }

  return { resumeText: text, resumeId: id, targetRole: role };
}

async function runAnalysis(req, res, next, { type, buildPrompt }) {
  try {
    const ctx = await resolveResumeContext(req);
    if (ctx.error) {
      return res.status(ctx.status).json({ error: ctx.error });
    }

    const prompt = buildPrompt(ctx.resumeText, ctx.targetRole, req.body);
    const raw = await callGemini(prompt, { retryOnParseFailure: true });
    const parsed = safeJsonParse(raw);

    if (!parsed) {
      return res.status(502).json({ error: 'AI returned invalid format' });
    }

    await Analysis.create({
      resumeId: ctx.resumeId,
      type,
      resultJson: parsed,
    });

    res.json(parsed);
  } catch (err) {
    next(err);
  }
}

exports.scoreResume = (req, res, next) =>
  runAnalysis(req, res, next, {
    type: 'resume_score',
    buildPrompt: (text, role) => GEMINI_PROMPTS.resumeScore(text, role),
  });

exports.getSkillGap = (req, res, next) =>
  runAnalysis(req, res, next, {
    type: 'skill_gap',
    buildPrompt: (text, role) => GEMINI_PROMPTS.skillGap(text, role),
  });

exports.matchJd = async (req, res, next) => {
  if (!req.body.jobDescription?.trim()) {
    return res.status(400).json({ error: 'Job description is required' });
  }
  return runAnalysis(req, res, next, {
    type: 'jd_match',
    buildPrompt: (text, role, body) =>
      GEMINI_PROMPTS.jdMatch(text, body.jobDescription, role),
  });
};

exports.getHrFeedback = (req, res, next) =>
  runAnalysis(req, res, next, {
    type: 'hr_feedback',
    buildPrompt: (text, role) => GEMINI_PROMPTS.hrFeedback(text, role),
  });

exports.getLatest = async (req, res, next) => {
  try {
    const { type } = req.params;
    const allowed = [
      'resume_score',
      'skill_gap',
      'hr_feedback',
      'project_suggest',
      'roadmap',
      'jd_match',
      'resume_optimize',
    ];
    if (!allowed.includes(type)) {
      return res.status(400).json({ error: 'Invalid analysis type' });
    }

    const resume = await Resume.findLatestByUserId(req.user.id);
    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    const analysis = await Analysis.findLatestByResumeAndType(resume.id, type);
    if (!analysis) {
      return res.status(404).json({ error: 'No saved analysis yet' });
    }

    res.json(analysis.result_json);
  } catch (err) {
    next(err);
  }
};
