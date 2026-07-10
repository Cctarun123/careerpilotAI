const ROLE_BENCHMARKS = {
  frontend: {
    skills: [
      { name: 'React', weight: 'high' },
      { name: 'TypeScript', weight: 'high' },
      { name: 'Accessibility', weight: 'medium' },
      { name: 'Performance optimization', weight: 'medium' },
    ],
    priorityAreas: ['UI architecture', 'Component design', 'Responsive UX'],
  },
  backend: {
    skills: [
      { name: 'Node.js', weight: 'high' },
      { name: 'APIs', weight: 'high' },
      { name: 'Databases', weight: 'high' },
      { name: 'Testing', weight: 'medium' },
    ],
    priorityAreas: ['Service reliability', 'System design', 'Data modeling'],
  },
  fullstack: {
    skills: [
      { name: 'Frontend development', weight: 'high' },
      { name: 'Backend services', weight: 'high' },
      { name: 'Cloud deployment', weight: 'medium' },
      { name: 'Product thinking', weight: 'medium' },
    ],
    priorityAreas: ['End-to-end ownership', 'Architecture tradeoffs', 'Cross-functional delivery'],
  },
  data: {
    skills: [
      { name: 'SQL', weight: 'high' },
      { name: 'Python', weight: 'high' },
      { name: 'Analytics', weight: 'high' },
      { name: 'Visualization', weight: 'medium' },
    ],
    priorityAreas: ['Experimentation', 'Insight communication', 'Data quality'],
  },
  product: {
    skills: [
      { name: 'Roadmapping', weight: 'high' },
      { name: 'Stakeholder management', weight: 'high' },
      { name: 'User research', weight: 'medium' },
      { name: 'Metrics', weight: 'medium' },
    ],
    priorityAreas: ['Prioritization', 'Customer empathy', 'Execution clarity'],
  },
};

function normalizeRole(role = '') {
  const value = role.toLowerCase();
  if (value.includes('frontend') || value.includes('ui') || value.includes('web')) return 'frontend';
  if (value.includes('backend') || value.includes('server') || value.includes('api')) return 'backend';
  if (value.includes('full stack') || value.includes('fullstack') || value.includes('software')) return 'fullstack';
  if (value.includes('data') || value.includes('analytics') || value.includes('ml')) return 'data';
  if (value.includes('product') || value.includes('manager')) return 'product';
  return 'generic';
}

function extractProjectNames(resumeText = '') {
  const lines = (resumeText || '').split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const seen = new Set();
  const names = [];

  const addName = (value) => {
    const clean = value.replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const key = clean.toLowerCase();
    if (seen.has(key) || clean.length > 80) return;
    seen.add(key);
    names.push(clean);
  };

  lines.forEach((line) => {
    const clean = line.replace(/\s+/g, ' ');
    const lower = clean.toLowerCase();

    const projectMatch = clean.match(/(?:project|portfolio|application|platform|system|tool|product|dashboard|service)\s*[:\-]\s*(.+)$/i);
    if (projectMatch) {
      addName(projectMatch[1]);
      return;
    }

    if (/developer|engineer|lead|manager|analyst|designer|architect|owner|intern/i.test(clean)) {
      const atMatch = clean.match(/\bat\s+([A-Z][A-Za-z0-9&/ .'-]+)$/);
      if (atMatch) {
        addName(atMatch[1]);
        return;
      }
    }

    if (/\b(?:built|developed|launched|designed|implemented|delivered)\b/i.test(lower)) {
      const titleMatch = clean.match(/\b(?:built|developed|launched|designed|implemented|delivered)\b[^A-Z]+([A-Z][A-Za-z0-9&/ .'-]+(?:\s+[A-Z][A-Za-z0-9&/ .'-]+)*)/);
      if (titleMatch) {
        addName(titleMatch[1]);
      }
    }
  });

  return names;
}

function buildFallbackRoleBenchmark(targetRole = '') {
  const roleType = normalizeRole(targetRole);
  const benchmark = ROLE_BENCHMARKS[roleType];

  if (benchmark) {
    return benchmark;
  }

  return {
    skills: [
      { name: 'Communication', weight: 'high' },
      { name: 'Problem solving', weight: 'high' },
      { name: 'Ownership', weight: 'medium' },
    ],
    priorityAreas: ['Core domain fluency', 'Execution quality', 'Business impact'],
  };
}

function buildResumeInsightContext(resumeText = '', targetRole = '') {
  const projectNames = extractProjectNames(resumeText);
  const benchmark = buildFallbackRoleBenchmark(targetRole);
  const projectContext = projectNames.length
    ? `Named projects or products: ${projectNames.join(', ')}`
    : 'Named projects or products: none explicitly listed';

  return [
    'Resume analysis context:',
    `- Target role: ${targetRole || 'unspecified'}`,
    `- Role benchmark skills: ${benchmark.skills.map((skill) => `${skill.name} (${skill.weight})`).join(', ')}`,
    `- Priority areas: ${benchmark.priorityAreas.join(', ')}`,
    `- ${projectContext}`,
    '- Interview questions should explicitly reference the candidate\'s own projects by name whenever possible.',
  ].join('\n');
}

module.exports = {
  extractProjectNames,
  buildFallbackRoleBenchmark,
  buildResumeInsightContext,
};
