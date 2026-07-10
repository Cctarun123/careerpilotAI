const path = require('path');
const express = require('express');
const cors = require('cors');
const { port, clientUrl, nodeEnv } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const { testConnection } = require('./config/testDb');
const { checkGeminiKey } = require('./config/checkGemini');

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');
const analysisRoutes = require('./routes/analysis.routes');
const roadmapRoutes = require('./routes/roadmap.routes');
const projectsRoutes = require('./routes/projects.routes');
const optimizerRoutes = require('./routes/optimizer.routes');
const interviewRoutes = require('./routes/interview.routes');
const hrRoutes = require('./routes/hr.routes');
const jdRoutes = require('./routes/jd.routes');

const app = express();

const allowedOrigins = new Set([
  clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || nodeEnv === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/optimizer', optimizerRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/jd', jdRoutes);

app.use(errorHandler);

const server = app.listen(port, async () => {
  console.log(`CareerPilot API running on http://localhost:${port}`);
  checkGeminiKey();
  await testConnection();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} is in use. On macOS, port 5000 is often taken by AirPlay — use PORT=5001 in .env`
    );
  } else {
    console.error('Server failed to start:', err.message);
  }
  process.exit(1);
});

module.exports = app;
