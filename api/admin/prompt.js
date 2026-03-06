const { Redis } = require('@upstash/redis');
const DEFAULT_PROMPT = require('../../server/systemPrompt');

let redis;
try {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} catch (e) {
  console.error('Failed to init Redis client:', e.message);
}

const KV_KEY = 'teddy:system_prompt';

function requireAdmin(req, res) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD not configured on server' });
    return false;
  }
  const provided = req.headers['x-admin-password'];
  if (!provided || provided.trim() !== adminPassword.trim()) {
    res.status(401).json({ error: 'Invalid admin password' });
    return false;
  }
  return true;
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAdmin(req, res)) return;

  // GET — fetch current prompt
  if (req.method === 'GET') {
    try {
      const customPrompt = await redis.get(KV_KEY);
      return res.json({
        prompt: customPrompt || DEFAULT_PROMPT,
        defaultPrompt: DEFAULT_PROMPT,
      });
    } catch (err) {
      console.error('KV get error:', err.message);
      return res.json({
        prompt: DEFAULT_PROMPT,
        defaultPrompt: DEFAULT_PROMPT,
      });
    }
  }

  // PUT — save custom prompt
  if (req.method === 'PUT') {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }
    try {
      await redis.set(KV_KEY, prompt);
      return res.json({ message: 'Prompt saved successfully.' });
    } catch (err) {
      console.error('KV set error:', err.message);
      return res.status(500).json({ error: 'Failed to save prompt: ' + err.message });
    }
  }

  // POST — reset to default
  if (req.method === 'POST') {
    try {
      await redis.del(KV_KEY);
      return res.json({ message: 'Prompt reset to default.' });
    } catch (err) {
      console.error('KV del error:', err.message);
      return res.status(500).json({ error: 'Failed to reset prompt: ' + err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
