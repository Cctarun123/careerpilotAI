const InterviewSession = require('../models/InterviewSession');
const Resume = require('../models/Resume');
const { GEMINI_PROMPTS } = require('../services/promptTemplates');
const { callGemini } = require('../services/geminiService');
const { safeJsonParse } = require('../utils/jsonSafeParse');

exports.generateQuestions = async (req, res, next) => {
  try {
    const { resumeId, resumeText, targetRole, category = 'behavioral' } = req.body;

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
    }

    const role = targetRole || req.user.target_role;
    if (!role) {
      return res.status(400).json({ error: 'Set a target role first' });
    }

    const prompt = GEMINI_PROMPTS.interviewGenerate(text, role, category);
    const raw = await callGemini(prompt, { retryOnParseFailure: true });
    const parsed = safeJsonParse(raw);

    if (!parsed) {
      return res.status(502).json({ error: 'AI returned invalid format' });
    }

    await InterviewSession.create({
      resumeId: id,
      category,
      questions: parsed.questions || parsed,
    });

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};

exports.explainAnswer = async (req, res, next) => {
  try {
    const { question, userAnswer } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'question and userAnswer are required' });
    }

    const prompt = GEMINI_PROMPTS.interviewExplain(question, userAnswer);
    const raw = await callGemini(prompt, { retryOnParseFailure: true });
    const parsed = safeJsonParse(raw);

    if (!parsed) {
      return res.status(502).json({ error: 'AI returned invalid format' });
    }

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};

exports.getLatestSession = async (req, res, next) => {
  try {
    const { category = 'behavioral' } = req.query;

    const resume = await Resume.findLatestByUserId(req.user.id);
    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }

    const session = await InterviewSession.findLatestByResumeAndCategory(resume.id, category);
    if (!session) {
      return res.status(404).json({ error: 'No saved session yet' });
    }

    res.json({
      category: session.category,
      questions: session.questions,
    });
  } catch (err) {
    next(err);
  }
};
