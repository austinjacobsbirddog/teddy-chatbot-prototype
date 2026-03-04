const Anthropic = require('@anthropic-ai/sdk');
const { getPrompt } = require('../server/promptStore');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = async (req, res) => {
  // CORS — allow BirdDog site and any other origin
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: getPrompt(),
      messages,
    });

    const content = response.content[0].text;
    let action = null;
    let cleanContent = content;

    const qualifyMatch = content.match(/\{"action":\s*"QUALIFY"\}/);
    const disqualifyMatch = content.match(/\{"action":\s*"DISQUALIFY"\}/);

    if (qualifyMatch) {
      action = 'QUALIFY';
      cleanContent = content.replace(/\{"action":\s*"QUALIFY"\}/, '').trim();
    } else if (disqualifyMatch) {
      action = 'DISQUALIFY';
      cleanContent = content.replace(/\{"action":\s*"DISQUALIFY"\}/, '').trim();
    }

    res.json({ message: cleanContent, action });
  } catch (error) {
    console.error('Anthropic API error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};
