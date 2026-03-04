const express = require('express');
const router = express.Router();
const { getPrompt, setPrompt, getDefaultPrompt } = require('../promptStore');

function requireAdmin(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured on server' });
  }
  const provided = req.headers['x-admin-password'];
  if (!provided || provided !== adminPassword) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }
  next();
}

router.get('/prompt', requireAdmin, (req, res) => {
  res.json({
    prompt: getPrompt(),
    defaultPrompt: getDefaultPrompt(),
  });
});

router.put('/prompt', requireAdmin, (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'prompt (non-empty string) is required' });
  }
  setPrompt(prompt);
  res.json({ success: true, message: 'Prompt updated successfully' });
});

router.post('/prompt/reset', requireAdmin, (req, res) => {
  setPrompt(getDefaultPrompt());
  res.json({ success: true, message: 'Prompt reset to default' });
});

module.exports = router;
