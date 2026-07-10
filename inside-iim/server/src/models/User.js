const pool = require('../config/db');

const User = {
  async create({ name, email, passwordHash, targetRole }) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, target_role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, target_role, created_at`,
      [name, email, passwordHash, targetRole || null]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, name, email, target_role, created_at FROM users WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async updateTargetRole(id, targetRole) {
    const { rows } = await pool.query(
      'UPDATE users SET target_role = $1 WHERE id = $2 RETURNING id, name, email, target_role',
      [targetRole, id]
    );
    return rows[0];
  },
};

module.exports = User;
