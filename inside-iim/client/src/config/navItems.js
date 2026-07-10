export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'home' },
  { to: '/resume-analysis', label: 'Resume Score', icon: 'chart' },
  { to: '/skill-gap', label: 'Skill Gap', icon: 'target' },
  { to: '/jd-match', label: 'JD Match', icon: 'bolt', featured: true },
  { to: '/roadmap', label: 'Roadmap', icon: 'map' },
  { to: '/projects', label: 'Projects', icon: 'bulb' },
  { to: '/optimizer', label: 'Optimizer', icon: 'edit' },
  { to: '/interview', label: 'Interview', icon: 'mic' },
  { to: '/hr-feedback', label: 'HR Feedback', icon: 'building' },
];

export const FEATURE_CARDS = [
  {
    title: 'Resume Score',
    description: 'AI-powered resume quality score with category breakdown',
    icon: 'chart',
    path: '/resume-analysis',
    type: 'resume_score',
    scoreKey: 'overallScore',
  },
  {
    title: 'Skill Gap Analysis',
    description: 'Compare your skills against your target role',
    icon: 'target',
    path: '/skill-gap',
    type: 'skill_gap',
    scoreKey: 'matchPercentage',
  },
  {
    title: 'JD Match',
    description: 'Paste a job description — see your match % instantly',
    icon: 'bolt',
    path: '/jd-match',
    type: 'jd_match',
    scoreKey: 'matchPercentage',
    featured: true,
  },
  {
    title: 'Learning Roadmap',
    description: '4-week plan to close your skill gaps',
    icon: 'map',
    path: '/roadmap',
    type: 'roadmap',
  },
  {
    title: 'Project Advisor',
    description: 'Portfolio project ideas tailored to your profile',
    icon: 'bulb',
    path: '/projects',
    type: 'project_suggest',
  },
  {
    title: 'Resume Optimizer',
    description: 'Tailor bullets and keywords for ATS',
    icon: 'edit',
    path: '/optimizer',
    type: 'resume_optimize',
  },
  {
    title: 'Interview Coach',
    description: 'Practice questions with scored feedback',
    icon: 'mic',
    path: '/interview',
  },
  {
    title: 'HR Feedback',
    description: 'Candid recruiter-style review of your resume',
    icon: 'building',
    path: '/hr-feedback',
    type: 'hr_feedback',
  },
];

export const MOBILE_NAV = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/jd-match', label: 'JD Match', icon: 'bolt' },
  { to: '/skill-gap', label: 'Skills', icon: 'target' },
  { to: '/interview', label: 'Interview', icon: 'mic' },
  { to: '/resume-analysis', label: 'More', icon: 'grid' },
];

export const INTERVIEW_CATEGORIES = [
  { id: 'behavioral', label: 'Behavioral', icon: 'message' },
  { id: 'technical', label: 'Technical', icon: 'code' },
  { id: 'hr', label: 'HR', icon: 'building' },
  { id: 'project', label: 'Project', icon: 'folder' },
];
