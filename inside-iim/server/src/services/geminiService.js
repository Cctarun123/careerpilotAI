const { GoogleGenerativeAI } = require('@google/generative-ai');
const { geminiApiKey, geminiModel } = require('../config/env');
const { safeJsonParse } = require('../utils/jsonSafeParse');

let genAI = null;

// Order: lite/cheaper first; skip retired 1.5 / 2.0 models
const FALLBACK_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-lite-latest',
];

function getClient() {
  if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(geminiApiKey);
  }
  return genAI;
}

function getModelNames() {
  const primary = geminiModel || 'gemini-3.1-flash-lite';
  return [...new Set([primary, ...FALLBACK_MODELS])];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isQuotaError(err) {
  const msg = err?.message || '';
  return err?.status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('Quota exceeded');
}

function isOverloadError(err) {
  const msg = err?.message || '';
  return (
    err?.status === 503 ||
    msg.includes('503') ||
    msg.includes('high demand') ||
    msg.includes('Service Unavailable') ||
    msg.includes('overloaded')
  );
}

function isNotFoundError(err) {
  const msg = err?.message || '';
  return err?.status === 404 || msg.includes('404') || msg.includes('not found') || msg.includes('is not supported');
}

function isNetworkError(err) {
  const msg = err?.message || '';
  const cause = err?.cause?.message || err?.cause?.code || '';
  return (
    msg.includes('fetch failed') ||
    msg.includes('ECONNRESET') ||
    msg.includes('ETIMEDOUT') ||
    msg.includes('ENOTFOUND') ||
    msg.includes('network') ||
    String(cause).includes('ECONNRESET') ||
    String(cause).includes('ETIMEDOUT') ||
    String(cause).includes('UND_ERR')
  );
}

function isAuthError(err) {
  const msg = err?.message || '';
  return err?.status === 401 || err?.status === 403 || msg.includes('API key not valid') || msg.includes('API_KEY_INVALID');
}

function parseRetryDelayMs(err, attempt = 0) {
  const match = err?.message?.match(/retry in ([\d.]+)s/i);
  if (match) return Math.ceil(parseFloat(match[1]) * 1000) + 500;
  if (isNetworkError(err)) return Math.min(1000 * 2 ** attempt, 8000);
  if (isOverloadError(err)) return Math.min(2000 * 2 ** attempt, 10000);
  return 15000;
}

function isRetryableError(err) {
  return isQuotaError(err) || isNotFoundError(err) || isOverloadError(err) || isNetworkError(err);
}

function retryReason(err) {
  if (isNetworkError(err)) return 'network error';
  if (isNotFoundError(err)) return 'not found';
  if (isOverloadError(err)) return 'overloaded';
  if (isQuotaError(err)) return 'quota exceeded';
  return 'failed';
}

async function generateOnce(modelName, fullPrompt) {
  const model = getClient().getGenerativeModel({ model: modelName });
  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}

async function generateWithRetries(modelName, fullPrompt, { maxRetries = 3 } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await generateOnce(modelName, fullPrompt);
    } catch (err) {
      lastError = err;

      if (isAuthError(err)) {
        const authErr = new Error(
          'Invalid GEMINI_API_KEY. Create one at https://aistudio.google.com/apikey — keys start with AIza'
        );
        authErr.status = 503;
        throw authErr;
      }

      if (isNotFoundError(err)) {
        throw err;
      }

      const canRetry =
        (isQuotaError(err) || isOverloadError(err) || isNetworkError(err)) && attempt < maxRetries;
      if (canRetry) {
        const delay = parseRetryDelayMs(err, attempt);
        console.warn(`Gemini ${retryReason(err)} on ${modelName}, retry ${attempt + 1}/${maxRetries} in ${delay}ms...`);
        await sleep(delay);
        continue;
      }

      throw err;
    }
  }

  throw lastError;
}

async function callGemini(prompt, { retryOnParseFailure = false } = {}) {
  const fullPrompt = `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no prose, no code fences.`;
  const models = getModelNames();
  let lastError;

  for (const modelName of models) {
    try {
      let raw = await generateWithRetries(modelName, fullPrompt);

      if (!retryOnParseFailure) {
        console.log(`Gemini OK: ${modelName}`);
        return raw;
      }

      if (safeJsonParse(raw)) {
        console.log(`Gemini OK: ${modelName}`);
        return raw;
      }

      raw = await generateWithRetries(
        modelName,
        `${fullPrompt}\n\nYour previous response was not valid JSON. Try again.`
      );
      console.log(`Gemini OK: ${modelName}`);
      return raw;
    } catch (err) {
      lastError = err;
      if (isRetryableError(err)) {
        console.warn(`Model ${modelName} ${retryReason(err)}, trying next...`);
        continue;
      }
      throw err;
    }
  }

  const err = new Error(
    lastError && isNetworkError(lastError)
      ? 'Could not reach Gemini API. Check your internet connection and try again.'
      : 'All Gemini models are busy or unavailable. Wait 30 seconds and try again.'
  );
  err.status = 503;
  throw err;
}

module.exports = { callGemini, isQuotaError, isOverloadError };
