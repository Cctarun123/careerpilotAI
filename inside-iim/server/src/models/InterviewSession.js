const pool = require('../config/db');
const { toJsonbParam } = require('../utils/jsonb');

const InterviewSession = {
  async create({ resumeId, category, questions }) {
    const { rows } = await pool.query(
      `INSERT INTO interview_sessions (resume_id, category, questions)
       VALUES ($1, $2, $3::jsonb)
       RETURNING *`,
      [resumeId, category, toJsonbParam(questions, [])]
    );
    return rows[0];
  },

  async findLatestByResumeAndCategory(resumeId, category) {
    const { rows } = await pool.query(
      `SELECT * FROM interview_sessions
       WHERE resume_id = $1 AND category = $2
       ORDER BY created_at DESC LIMIT 1`,
      [resumeId, category]
    );
    return rows[0];
  },
};

module.exports = InterviewSession;
