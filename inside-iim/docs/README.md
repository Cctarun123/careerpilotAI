# CareerPilot AI

AI-powered career coaching platform — upload your resume, pick a target role, and get 8 AI-powered insights from one dashboard.

## Features

| Feature | Description |
|---------|-------------|
| **Resume Score** | AI quality assessment with category breakdown |
| **Skill Gap Analysis** | Compare skills against your target role |
| **JD Match** ⭐ | Paste a job description — instant match % |
| **Learning Roadmap** | 4-week plan to close skill gaps |
| **Project Advisor** | Portfolio project suggestions |
| **Resume Optimizer** | ATS-friendly bullet rewrites + keyword tips |
| **Interview Coach** | Practice questions with scored feedback |
| **HR Feedback** | Candid recruiter-style review |

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL (Supabase) |
| AI | Google Gemini API |
| Auth | JWT |

## Quick Start

```bash
# 1. Configure
cp .env.example .env
# Set DATABASE_URL, JWT_SECRET, GEMINI_API_KEY
# Supabase: use Transaction pooler (port 6543) on IPv4 networks

# 2. Database
cd server && npm run db:init

# 3. Server (port 5001 — macOS AirPlay uses 5000)
cd server && npm install && npm run dev

# 4. Client
cd client && npm install && npm run dev
```

Open http://localhost:5173

## Demo Flow

1. Register → choose target role → upload PDF resume
2. **Resume Score** — immediate quality score
3. **Skill Gap** → **Build roadmap from gaps**
4. **JD Match** — paste a real job posting, get match %
5. **Optimize resume** for that JD (one-click from JD Match)
6. **Interview Coach** — generate + practice + get scored
7. **HR Feedback** — verdict + red/green flags

See `docs/demo-script.md` for the 2–3 min video script.

## API Routes

| Endpoint | Purpose |
|----------|---------|
| `POST /api/auth/register` | Create account |
| `POST /api/auth/login` | Sign in |
| `POST /api/resume/upload` | Upload PDF resume |
| `POST /api/analysis/score` | Resume scoring |
| `POST /api/analysis/skill-gap` | Skill gap analysis |
| `GET /api/analysis/latest/:type` | Load saved analysis |
| `POST /api/jd/match` | JD matching |
| `POST /api/roadmap/generate` | Learning roadmap |
| `POST /api/projects/suggest` | Project suggestions |
| `POST /api/optimizer/tailor` | Resume optimization |
| `POST /api/interview/generate` | Interview questions |
| `GET /api/interview/latest` | Load saved session |
| `POST /api/hr/feedback` | HR review |

## License

MIT
