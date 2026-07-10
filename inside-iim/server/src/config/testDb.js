const pool = require('./db');

async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected.');
    return true;
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      console.error(
        'Database host not found. Your DATABASE_URL hostname is invalid.\n' +
          '  → Supabase: Settings → Database → Connection string → URI\n' +
          '  → Make sure the project exists and is not paused.'
      );
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection refused. Check if PostgreSQL/Supabase is running.');
    } else if (err.code === '42P01') {
      console.error('Database connected but tables are missing. Run: npm run db:init');
    } else {
      console.error('Database connection failed:', err.message);
    }
    return false;
  }
}

module.exports = { testConnection };
