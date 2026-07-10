function stripMarkdownFences(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();

  const fenceMatch = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }

  const inlineMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (inlineMatch) {
    cleaned = inlineMatch[1].trim();
  }

  return cleaned;
}

function safeJsonParse(raw) {
  if (!raw) return null;

  const attempts = [raw, stripMarkdownFences(raw)];

  for (const attempt of attempts) {
    try {
      return JSON.parse(attempt);
    } catch {
      const jsonStart = attempt.indexOf('{');
      const jsonEnd = attempt.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        try {
          return JSON.parse(attempt.slice(jsonStart, jsonEnd + 1));
        } catch {
          // continue
        }
      }
    }
  }

  return null;
}

module.exports = { safeJsonParse, stripMarkdownFences };
