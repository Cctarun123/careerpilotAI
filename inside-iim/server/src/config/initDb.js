const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('Database schema initialized.');
  await pool.end();
}

initDb().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
