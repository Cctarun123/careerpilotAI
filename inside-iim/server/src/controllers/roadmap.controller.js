const Roadmap = require('../models/Roadmap');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { GEMINI_PROMPTS } = require('../services/promptTemplates');
const { callGemini } = require('../services/geminiService');
const { safeJsonParse } = require('../utils/jsonSafeParse');
const { sanitizeResources } = require('../utils/jsonb');

exports.generateRoadmap = async (req, res, next) => {
  try {
    const { resumeId, resumeText, targetRole, missingSkills } = req.body;

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

    const skills = missingSkills || [];
    const prompt = GEMINI_PROMPTS.roadmap(text, role, skills);
    const raw = await callGemini(prompt, { retryOnParseFailure: true });
    const parsed = safeJsonParse(raw);

    if (!parsed?.weeks) {
      return res.status(502).json({ error: 'AI returned invalid format' });
    }

    // Normalize resource URLs before DB insert
    parsed.weeks = parsed.weeks.map((week) => ({
      ...week,
      resources: sanitizeResources(week.resources),
    }));

    await Roadmap.deleteByResumeId(id);
    const items = parsed.weeks.flatMap((week) =>
      (week.skills || [week.focus]).map((skill) => ({
        resumeId: id,
        skillName: skill,
        weekNumber: week.weekNumber,
        resources: week.resources || [],
        miniTask: week.miniTask,
      }))
    );
    await Roadmap.createMany(items);

    await Analysis.create({
      resumeId: id,
      type: 'roadmap',
      resultJson: parsed,
    });

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};
