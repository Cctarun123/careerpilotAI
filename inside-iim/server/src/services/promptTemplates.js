const { buildResumeInsightContext } = require('./resumeInsightService');

const GEMINI_PROMPTS = {
  resumeScore: (resumeText, targetRole) => `
You are a senior career coach. Score this resume for the target role "${targetRole}".

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}

Perform a multi-pass analysis: first extract the candidate's evidence, then score against role-specific benchmarks, and finally produce the final JSON.

Return JSON with this exact shape:
{
  "overallScore": number (0-100),
  "categories": [
    { "name": string, "score": number (0-100), "feedback": string }
  ],
  "topStrengths": [string],
  "quickWins": [string]
}`,

  skillGap: (resumeText, targetRole) => `
Compare this resume against the target role "${targetRole}".

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}

Use role-specific benchmarks and the candidate's project names to distinguish between generic and truly relevant experience. Avoid overly generic skill gaps.

Return JSON:
{
  "matchPercentage": number (0-100),
  "presentSkills": [{ "skill": string, "level": "beginner"|"intermediate"|"advanced" }],
  "missingSkills": [{ "skill": string, "priority": "high"|"medium"|"low", "reason": string }],
  "summary": string
}`,

  jdMatch: (resumeText, jobDescription, targetRole) => `
Match this resume to the job description for role "${targetRole}".

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}

Job Description:
${jobDescription}

Use the role benchmark and the candidate's project names to interpret experience contextually rather than by keyword only.

Return JSON:
{
  "matchPercentage": number (0-100),
  "matchedKeywords": [string],
  "missingKeywords": [string],
  "recommendations": [string],
  "summary": string
}`,

  roadmap: (resumeText, targetRole, missingSkills) => `
Create a 4-week learning roadmap for "${targetRole}".

${buildResumeInsightContext(resumeText, targetRole)}

Resume context:
${resumeText}

Skills to close:
${JSON.stringify(missingSkills)}

Return JSON:
{
  "weeks": [
    {
      "weekNumber": number,
      "focus": string,
      "skills": [string],
      "resources": [{ "title": string, "type": "course"|"article"|"video", "url": string }],
      "miniTask": string
    }
  ]
}`,

  projectSuggest: (resumeText, targetRole) => `
Suggest portfolio projects for someone targeting "${targetRole}".

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}

Return JSON:
{
  "projects": [
    {
      "title": string,
      "description": string,
      "skills": [string],
      "difficulty": "beginner"|"intermediate"|"advanced",
      "impact": string
    }
  ]
}`,

  resumeOptimize: (resumeText, targetRole, jobDescription) => `
Tailor this resume for "${targetRole}"${jobDescription ? ' and the provided job description' : ''}.

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}
${jobDescription ? `\nJob Description:\n${jobDescription}` : ''}

Return JSON:
{
  "summary": string,
  "bulletRewrites": [{ "section": string, "original": string, "improved": string }],
  "keywordsToAdd": [string],
  "atsTips": [string]
}`,

  interviewGenerate: (resumeText, targetRole, category) => `
Generate ${category} interview questions for "${targetRole}" based on this resume.

${buildResumeInsightContext(resumeText, targetRole)}

Resume:
${resumeText}

Create questions that explicitly reference the candidate's own projects and experiences by name when appropriate. Keep them tailored to the role benchmark and avoid generic questions.

Return JSON:
{
  "category": "${category}",
  "questions": [
    {
      "question": string,
      "goodAnswer": string,
      "commonMistakes": [string]
    }
  ]
}`,

  interviewExplain: (question, userAnswer) => `
Evaluate this interview answer.

Question: ${question}
Candidate answer: ${userAnswer}

Return JSON:
{
  "score": number (0-100),
  "strengths": [string],
  "improvements": [string],
  "modelAnswer": string
}`,

  hrFeedback: (resumeText, targetRole) => `
You are an HR manager reviewing this resume for "${targetRole}". Give candid feedback.

Resume:
${resumeText}

Return JSON:
{
  "verdict": "shortlist"|"maybe"|"reject",
  "firstImpression": string,
  "redFlags": [string],
  "greenFlags": [string],
  "questionsTheyWouldAsk": [string]
}`,
};

module.exports = { GEMINI_PROMPTS };
