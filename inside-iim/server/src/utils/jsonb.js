function sanitizeResources(resources) {
  if (!Array.isArray(resources)) {
    if (typeof resources === 'string') {
      try {
        resources = JSON.parse(resources);
      } catch {
        return [];
      }
    } else {
      return [];
    }
  }

  return resources
    .filter((r) => r && typeof r === 'object')
    .map((r) => ({
      title: String(r.title || r.name || 'Resource').slice(0, 500),
      type: String(r.type || 'article').slice(0, 50),
      url: String(r.url || '')
        .replace(/\\/g, '')
        .trim()
        .slice(0, 2000),
    }));
}

function sanitizeForJson(value, fallback = null) {
  if (value == null) return fallback;

  let data = value;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return fallback;
    }
  }

  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return fallback;
  }
}

/** Returns a JSON string safe for PostgreSQL ::jsonb casts */
function toJsonbParam(value, fallback = null) {
  const sanitized = sanitizeForJson(value, fallback);
  if (sanitized == null) return null;
  return JSON.stringify(sanitized);
}

module.exports = { sanitizeResources, sanitizeForJson, toJsonbParam };
