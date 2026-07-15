# CareerPilot AI 🚀

An AI-powered career coaching platform that provides comprehensive resume analysis, skill gap assessment, interview preparation, and personalized career guidance.

**Upload your resume, pick a target role, and get 8 AI-powered insights from one unified dashboard.**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-blue?logo=express)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)](https://www.postgresql.org)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Powered-red)](https://ai.google.dev)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Environment Setup](#-environment-setup)
- [Database](#-database)
- [Running Locally](#-running-locally)
- [Demo Flow](#-demo-flow)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Resume Score** | AI quality assessment with category breakdown (content, formatting, keywords) |
| **Skill Gap Analysis** | Compare your current skills against your target role requirements |
| **JD Match** ⭐ | Paste any job description — get instant match percentage |
| **Learning Roadmap** | AI-generated 4-week personalized learning plan to close skill gaps |
| **Project Advisor** | Suggested portfolio projects aligned with target role |
| **Resume Optimizer** | ATS-friendly bullet point rewrites + keyword optimization tips |
| **Interview Coach** | Generate practice questions, get real-time feedback with scoring |
| **HR Feedback** | Candid recruiter-style review with red flags and green flags |

## 🛠 Tech Stack

### Frontend
- **React 18** — Modern UI framework with hooks
- **Vite** — Lightning-fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **React Router v6** — Client-side routing
- **Axios** — HTTP client for API calls

### Backend
- **Node.js 18+** — JavaScript runtime
- **Express 4** — Fast, unopinionated web framework
- **PostgreSQL 14+** — Relational database
- **JWT (jsonwebtoken)** — Authentication & authorization
- **Multer** — File upload middleware
- **PDF Parser** — Resume PDF parsing

### AI & Services
- **Google Gemini API** — AI-powered analysis and recommendations
- **Supabase** — PostgreSQL hosting + realtime

### DevOps & Tools
- **npm** — Package management
- **.env** — Environment variable management

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** ([Download](https://nodejs.org))
- **npm 9+** (comes with Node.js)
- **PostgreSQL 14+** ([Download](https://www.postgresql.org)) OR [Supabase Account](https://supabase.com)
- **Google Gemini API Key** ([Get one](https://ai.google.dev))
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/careerpilot-ai.git
cd careerpilot-ai
```

### 2. Set Up Environment Variables

```bash
# Copy example env file
cp server/.env.example server/.env

# Edit and add your credentials
# Required variables:
# - DATABASE_URL (Supabase or local PostgreSQL)
# - JWT_SECRET (any random string)
# - GEMINI_API_KEY (from Google AI)
# - PORT (default: 5001)
# - FRONTEND_URL (default: http://localhost:5173)
```

### 3. Initialize Database

```bash
cd server
npm install
npm run db:init
```

### 4. Install Dependencies & Start Server

```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5001
```

### 5. Install Dependencies & Start Client

In a new terminal:

```bash
cd client
npm install
npm run dev
# Client runs at http://localhost:5173
```

### 6. Access the Application

Open your browser and navigate to: **http://localhost:5173**

Register with a test email and start exploring!

## 📁 Project Structure

```
careerpilot-ai/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── charts/              # Chart components
│   │   │   ├── icons/               # SVG icon components
│   │   │   ├── layout/              # Layout wrappers
│   │   │   └── ui/                  # UI components (buttons, modals, etc)
│   │   ├── pages/                   # Page components
│   │   │   ├── auth/                # Login, register pages
│   │   │   ├── dashboard/           # Main dashboard
│   │   │   ├── resume-analysis/     # Resume scoring
│   │   │   ├── skill-gap/           # Skill gap analysis
│   │   │   ├── jd-match/            # Job description matching
│   │   │   ├── roadmap/             # Learning roadmap
│   │   │   ├── projects/            # Project suggestions
│   │   │   ├── optimizer/           # Resume optimizer
│   │   │   ├── interview/           # Interview coach
│   │   │   └── hr-feedback/         # HR feedback
│   │   ├── services/                # API call functions
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── context/                 # React Context (Auth, Resume, Analysis)
│   │   ├── config/                  # App configuration
│   │   └── utils/                   # Helper functions
│   ├── public/                      # Static assets
│   ├── index.html                   # Entry HTML
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js/Express backend
│   ├── src/
│   │   ├── app.js                   # Express app setup
│   │   ├── config/                  # Configuration files
│   │   │   ├── db.js                # Database connection
│   │   │   ├── env.js               # Environment variables
│   │   │   └── schema.sql           # Database schema
│   │   ├── controllers/             # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── resume.controller.js
│   │   │   ├── analysis.controller.js
│   │   │   ├── jd.controller.js
│   │   │   ├── roadmap.controller.js
│   │   │   ├── projects.controller.js
│   │   │   ├── optimizer.controller.js
│   │   │   ├── interview.controller.js
│   │   │   └── hr.controller.js
│   │   ├── models/                  # Database models
│   │   │   ├── User.js
│   │   │   ├── Resume.js
│   │   │   ├── Analysis.js
│   │   │   ├── InterviewSession.js
│   │   │   └── Roadmap.js
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── analysis.routes.js
│   │   │   ├── jd.routes.js
│   │   │   ├── roadmap.routes.js
│   │   │   ├── projects.routes.js
│   │   │   ├── optimizer.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── hr.routes.js
│   │   ├── services/                # Business logic
│   │   │   ├── aiProviderService.js # AI provider abstraction
│   │   │   ├── geminiService.js     # Google Gemini API calls
│   │   │   ├── resumeInsightService.js
│   │   │   ├── accuracyService.js
│   │   │   ├── pdfParserService.js  # PDF parsing
│   │   │   └── promptTemplates.js   # AI prompt templates
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js              # JWT authentication
│   │   │   ├── errorHandler.js      # Error handling
│   │   │   └── upload.js            # File upload handling
│   │   └── utils/                   # Utility functions
│   ├── uploads/                     # Temporary file storage
│   ├── package.json
│   └── .env.example
│
└── docs/                            # Documentation
    ├── README.md
    └── demo-script.md
```

## 🔌 API Reference

### Authentication Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| POST | `/api/auth/logout` | User logout | ✅ |

### Resume Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/resume/upload` | Upload PDF resume | ✅ |
| GET | `/api/resume/latest` | Get latest uploaded resume | ✅ |

### Analysis Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/analysis/score` | Get resume quality score | ✅ |
| POST | `/api/analysis/skill-gap` | Analyze skill gaps | ✅ |
| GET | `/api/analysis/latest/:type` | Get saved analysis | ✅ |

### Job Description Matching

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/jd/match` | Match resume to JD | ✅ |
| GET | `/api/jd/history` | Get matching history | ✅ |

### Learning Roadmap

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/roadmap/generate` | Generate learning roadmap | ✅ |
| GET | `/api/roadmap/latest` | Get latest roadmap | ✅ |

### Project Advisor

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/projects/suggest` | Get project suggestions | ✅ |

### Resume Optimizer

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/optimizer/tailor` | Tailor resume to JD | ✅ |

### Interview Coach

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/interview/generate` | Generate interview questions | ✅ |
| POST | `/api/interview/answer` | Score interview answer | ✅ |
| GET | `/api/interview/latest` | Get latest session | ✅ |

### HR Feedback

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/hr/feedback` | Get HR recruiter feedback | ✅ |

## ⚙️ Environment Setup

Create a `.env` file in the `server/` directory:

```env
# Database Connection
# Use Transaction pooler (port 6543) for Supabase
DATABASE_URL=postgresql://username:password@host:5432/database_name

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_from_google_ai

# Server Configuration
PORT=5001
NODE_ENV=development

# Client URL
FRONTEND_URL=http://localhost:5173

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## 💾 Database

### Setup with Supabase (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to **SQL Editor** → Run the schema from `server/src/config/schema.sql`
4. Get `DATABASE_URL` from **Settings** → **Database** → **Connection Pooling**
5. Use **Transaction pooler** with port **6543**

### Local PostgreSQL Setup

```bash
# Install PostgreSQL
# macOS: brew install postgresql@14
# Windows: Download from postgresql.org
# Linux: apt-get install postgresql

# Create database
createdb careerpilot

# Run schema
psql careerpilot < server/src/config/schema.sql

# Update .env
DATABASE_URL=postgresql://localhost:5432/careerpilot
```

### Database Schema

The database includes tables for:
- `users` — User accounts and authentication
- `resumes` — Uploaded resume files and metadata
- `analysis_results` — Stored analysis outputs (score, skill gaps, etc)
- `jd_matches` — Job description matching history
- `roadmaps` — Learning roadmap results
- `interview_sessions` — Interview practice sessions

## 🏃 Running Locally

### Terminal 1: Start Backend Server

```bash
cd server
npm install
npm run dev
```

Expected output:
```
✓ Server running on http://localhost:5001
✓ Database connected
✓ Gemini AI configured
```

### Terminal 2: Start Frontend Dev Server

```bash
cd client
npm install
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Terminal 3: Check Database (Optional)

```bash
# Supabase - use web interface
# or
psql careerpilot  # local PostgreSQL
```

## 🎬 Demo Flow

1. **Register** → Choose target role (e.g., "Senior Full Stack Engineer")
2. **Upload Resume** → PDF automatically parsed
3. **Get Resume Score** → See quality breakdown instantly
4. **Skill Gap Analysis** → Identify missing skills
5. **Generate Roadmap** → 4-week plan to close gaps
6. **Job Description Match** → Paste a real job posting
7. **Tailor Resume** → One-click optimization for that JD
8. **Interview Practice** → Generate questions, practice, get scored
9. **HR Feedback** → Recruiter-style review with advice

See [demo-script.md](docs/demo-script.md) for detailed 2-3 minute video walkthrough.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 5001
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Fix:**
- Check PostgreSQL is running: `brew services start postgresql@14` (macOS)
- Verify `DATABASE_URL` in `.env` is correct
- For Supabase: Ensure you're using Transaction pooler (port 6543)

### PDF Upload Fails

```
Error: ENOENT: no such file or directory
```

**Fix:**
- Ensure `uploads/` directory exists: `mkdir server/uploads`
- Check file permissions: `chmod 755 server/uploads`

### Gemini API Errors

```
Error: Invalid API key
```

**Fix:**
- Verify `GEMINI_API_KEY` in `.env`
- Check key is active at [google.ai](https://ai.google.dev)
- Ensure quotas aren't exceeded

### CORS Issues

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
- Ensure `FRONTEND_URL` matches client URL in `.env`
- Check CORS middleware in `server/app.js`

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and commit: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Style

- Use **ES6+** syntax
- Follow **Airbnb Style Guide**
- Add comments for complex logic
- Keep components small and focused

### Testing

```bash
# Backend tests
cd server && npm test

# Frontend tests (if added)
cd client && npm test
```

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

---

## 🙋 Questions?

- 📖 Check [docs/](docs/) folder for guides
- 🐛 Open an [issue](https://github.com/yourusername/careerpilot-ai/issues)
- 💬 Start a [discussion](https://github.com/yourusername/careerpilot-ai/discussions)

## 🌟 Show Your Support

If you find this project helpful, please consider giving it a ⭐ star!

---

**Happy coding! 🚀**
