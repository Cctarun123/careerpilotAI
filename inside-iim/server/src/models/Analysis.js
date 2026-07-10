const pool = require('../config/db');
const { toJsonbParam } = require('../utils/jsonb');

const Analysis = {
  async create({ resumeId, type, resultJson }) {
    const { rows } = await pool.query(
      `INSERT INTO analyses (resume_id, type, result_json)
       VALUES ($1, $2, $3::jsonb)
       RETURNING *`,
      [resumeId, type, toJsonbParam(resultJson, {})]
    );
    return rows[0];
  },

  async findLatestByResumeAndType(resumeId, type) {
    const { rows } = await pool.query(
      `SELECT * FROM analyses
       WHERE resume_id = $1 AND type = $2
       ORDER BY created_at DESC LIMIT 1`,
      [resumeId, type]
    );
    return rows[0];
  },
};

module.exports = Analysis;
