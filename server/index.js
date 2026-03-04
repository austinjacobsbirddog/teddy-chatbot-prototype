require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const chatRouter = require('./routes/chat');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Teddy - BirdDog Land Advisor' });
});

app.use('/api/chat', chatRouter);
app.use('/api/admin', adminRouter);

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Teddy server running on http://localhost:${PORT}`);
});
