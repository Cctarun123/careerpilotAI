const pool = require('../config/db');

const Resume = {
  async create({ userId, fileUrl, rawText }) {
    const { rows } = await pool.query(
      `INSERT INTO resumes (user_id, file_url, raw_text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, fileUrl, rawText]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
    return rows[0];
  },

  async findLatestByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM resumes WHERE user_id = $1 ORDER BY uploaded_at DESC LIMIT 1`,
      [userId]
    );
    return rows[0];
  },

  async findByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM resumes WHERE user_id = $1 ORDER BY uploaded_at DESC`,
      [userId]
    );
    return rows;
  },
};

module.exports = Resume;
