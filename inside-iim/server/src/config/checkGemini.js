const { geminiApiKey } = require('./env');

function checkGeminiKey() {
  if (!geminiApiKey) {
    console.warn('⚠ GEMINI_API_KEY not set — AI features will fail until configured.');
    return;
  }
  if (!geminiApiKey.startsWith('AIza')) {
    console.warn(
      '⚠ GEMINI_API_KEY does not look like a Google AI Studio key (expected AIza...).\n' +
        '   Create a free key at https://aistudio.google.com/apikey'
    );
  }
}

module.exports = { checkGeminiKey };
