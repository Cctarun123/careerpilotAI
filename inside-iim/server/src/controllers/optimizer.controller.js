const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { GEMINI_PROMPTS } = require('../services/promptTemplates');
const { callGemini } = require('../services/geminiService');
const { safeJsonParse } = require('../utils/jsonSafeParse');

exports.tailorResume = async (req, res, next) => {
  try {
    const { resumeId, resumeText, targetRole, jobDescription } = req.body;

    let text = resumeText;
    let id = resumeId;

    if (!text) {
      const resume = resumeId
        ? await Resume.findById(resumeId)
        : await Resume.findLatestByUserId(req.user.id);

      if (!resume || resume.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      text = resume.raw_text;
      id = resume.id;
    } else if (!id) {
      const latest = await Resume.findLatestByUserId(req.user.id);
      if (!latest) {
        return res.status(400).json({ error: 'Upload a resume first' });
      }
      id = latest.id;
    }

    const role = targetRole || req.user.target_role;
    if (!role) {
      return res.status(400).json({ error: 'Set a target role first' });
    }

    const prompt = GEMINI_PROMPTS.resumeOptimize(text, role, jobDescription);
    const raw = await callGemini(prompt, { retryOnParseFailure: true });
    const parsed = safeJsonParse(raw);

    if (!parsed) {
      return res.status(502).json({ error: 'AI returned invalid format' });
    }

    await Analysis.create({
      resumeId: id,
      type: 'resume_optimize',
      resultJson: parsed,
    });

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};
