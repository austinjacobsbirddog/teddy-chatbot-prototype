const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { getPrompt } = require('../promptStore');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: getPrompt(),
      messages: messages,
    });

    const content = response.content[0].text;

    // Parse action signal from response
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

    res.json({
      message: cleanContent,
      action: action,
    });
  } catch (error) {
    console.error('Anthropic API error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router;
