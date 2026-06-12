const express = require('express');
const router = express.Router();

/**
 * GET /api/chat/messages - Mesajları al
 */
router.get('/messages', (req, res) => {
  res.json({ message: 'Chat messages endpoint' });
});

/**
 * POST /api/chat/send - Mesaj göndər
 */
router.post('/send', (req, res) => {
  res.json({ message: 'Send message endpoint' });
});

module.exports = router;