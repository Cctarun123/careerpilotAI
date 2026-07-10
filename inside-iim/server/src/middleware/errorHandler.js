function errorHandler(err, _req, res, _next) {
  console.error(err);

  if (err.message === 'GEMINI_API_KEY is not configured') {
    return res.status(503).json({ error: 'AI service not configured. Set GEMINI_API_KEY in .env' });
  }

  if (err.status === 429 || err.message?.includes('Quota exceeded') || err.message?.includes('quota exceeded')) {
    return res.status(429).json({
      error: 'Gemini API quota exceeded. Wait ~1 minute and retry.',
    });
  }

  if (
    err.status === 503 ||
    err.message?.includes('high demand') ||
    err.message?.includes('Service Unavailable') ||
    err.message?.includes('All Gemini models are busy') ||
    err.message?.includes('Could not reach Gemini API')
  ) {
    return res.status(503).json({
      error: err.message?.includes('Could not reach Gemini')
        ? err.message
        : 'Gemini is temporarily overloaded. Wait 30 seconds and try again.',
    });
  }

  if (
    err.message?.includes('fetch failed') ||
    err.message?.includes('GoogleGenerativeAI Error')
  ) {
    return res.status(503).json({
      error: 'Could not reach Gemini API. Check your connection and try again in a few seconds.',
    });
  }

  if (err.status === 503 && err.message?.includes('GEMINI_API_KEY')) {
    return res.status(503).json({ error: err.message });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Max 5MB.' });
  }

  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 'ENOTFOUND') {
    return res.status(503).json({
      error: 'Cannot reach database host. Check DATABASE_URL in .env — copy a fresh URI from Supabase → Settings → Database.',
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'Database connection refused. Is PostgreSQL running, or is your Supabase project active?',
    });
  }

  if (err.code === '22P02') {
    return res.status(502).json({
      error: 'Failed to save AI result. Please try generating again.',
    });
  }

  if (err.code === '42P01') {
    return res.status(503).json({
      error: 'Database tables missing. Run schema.sql in Supabase SQL Editor or: npm run db:init',
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
