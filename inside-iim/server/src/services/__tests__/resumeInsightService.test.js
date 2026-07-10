const test = require('node:test');
const assert = require('node:assert/strict');
const { extractProjectNames, buildFallbackRoleBenchmark } = require('../resumeInsightService');

test('extractProjectNames finds named projects from resume text', () => {
  const resumeText = `
  John Doe
  Senior Frontend Engineer

  Projects
  Project: CareerPilot AI
  - Built a personalized career coaching platform

  Experience
  Lead Developer at Resume Matcher
  `;

  assert.deepEqual(extractProjectNames(resumeText), ['CareerPilot AI', 'Resume Matcher']);
});

test('buildFallbackRoleBenchmark creates role-specific expectations', () => {
  const benchmark = buildFallbackRoleBenchmark('Senior Frontend Engineer');

  assert.ok(benchmark.skills.some((skill) => skill.name === 'React'));
  assert.ok(benchmark.skills.some((skill) => skill.name === 'TypeScript'));
  assert.ok(benchmark.priorityAreas.includes('UI architecture'));
});
