const pool = require('../config/db');
const { sanitizeResources, toJsonbParam } = require('../utils/jsonb');

const Roadmap = {
  async createMany(items) {
    const created = [];
    for (const item of items) {
      const resources = sanitizeResources(item.resources);
      const { rows } = await pool.query(
        `INSERT INTO roadmaps (resume_id, skill_name, week_number, resources, mini_task, completed)
         VALUES ($1, $2, $3, $4::jsonb, $5, $6)
         RETURNING *`,
        [
          item.resumeId,
          String(item.skillName || '').slice(0, 255),
          item.weekNumber,
          toJsonbParam(resources, []),
          item.miniTask ? String(item.miniTask).slice(0, 2000) : null,
          item.completed || false,
        ]
      );
      created.push(rows[0]);
    }
    return created;
  },

  async findByResumeId(resumeId) {
    const { rows } = await pool.query(
      `SELECT * FROM roadmaps WHERE resume_id = $1 ORDER BY week_number ASC`,
      [resumeId]
    );
    return rows;
  },

  async deleteByResumeId(resumeId) {
    await pool.query('DELETE FROM roadmaps WHERE resume_id = $1', [resumeId]);
  },
};

module.exports = Roadmap;
