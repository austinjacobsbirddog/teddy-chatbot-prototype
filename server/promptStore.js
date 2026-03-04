const fs = require('fs');
const path = require('path');
const DEFAULT_PROMPT = require('./systemPrompt');

const CUSTOM_PROMPT_PATH = path.join(__dirname, 'customPrompt.json');

let currentPrompt = DEFAULT_PROMPT;

try {
  if (fs.existsSync(CUSTOM_PROMPT_PATH)) {
    const data = JSON.parse(fs.readFileSync(CUSTOM_PROMPT_PATH, 'utf-8'));
    if (data.prompt && typeof data.prompt === 'string') {
      currentPrompt = data.prompt;
      console.log('Loaded custom prompt from customPrompt.json');
    }
  }
} catch (err) {
  console.warn('Could not load custom prompt, using default:', err.message);
}

function getPrompt() {
  return currentPrompt;
}

function setPrompt(newPrompt) {
  currentPrompt = newPrompt;
  fs.writeFileSync(
    CUSTOM_PROMPT_PATH,
    JSON.stringify({ prompt: newPrompt, updatedAt: new Date().toISOString() }, null, 2),
    'utf-8'
  );
}

function getDefaultPrompt() {
  return DEFAULT_PROMPT;
}

module.exports = { getPrompt, setPrompt, getDefaultPrompt };
