# CareerPilot AI — Demo Script (2–3 min)

## Hook (15s)

"CareerPilot AI is your personal career coach. Upload your resume, pick a target role, and get eight AI-powered insights — from resume scoring to JD matching — all in one dashboard."

## Flow

### 1. Onboarding (20s)
- Register → choose target role (e.g. Frontend Developer)
- Upload PDF resume
- Land on dashboard — 8 feature cards with progress badges

### 2. Resume Score (15s)
- Click Resume Score → Run Analysis
- Show overall score ring + category feedback
- Highlight "quick wins"

### 3. Skill Gap → Roadmap (25s)
- Show match percentage + missing skills
- Click **Build roadmap from these gaps**
- Show 4-week plan with resources

### 4. JD Match ⭐ (30s)
- Paste a real job description
- Show match % ring + matched vs missing keywords
- "This is the killer feature — know before you apply"
- Click **Optimize resume for this JD**

### 5. Resume Optimizer (15s)
- Show bullet rewrites (before/after)
- Keywords to add + ATS tips

### 6. Interview Coach (20s)
- Generate behavioral questions
- Type an answer → get scored feedback
- Show strengths + improvements

### 7. HR Feedback (15s)
- Verdict badge (shortlist / maybe / reject)
- Green flags vs red flags

### 8. Close (15s)
- "Built in 3 days: React, Express, PostgreSQL, Gemini"
- "One pattern everywhere: prompt → Gemini → JSONB → React page"
- "No scope creep — just the features that matter for landing your next role"

## Tech talking points (if asked)

- `safeJsonParse()` handles Gemini markdown fence wrapping
- 5-table schema — AI outputs stored as JSONB
- Supabase transaction pooler for IPv4 networks
- Each card = one route + one controller + one prompt template
