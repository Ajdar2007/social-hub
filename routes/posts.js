const express = require('express');
const router = express.Router();

/**
 * GET /api/posts - Bütün postları al
 */
router.get('/', (req, res) => {
  res.json({ message: 'Posts list endpoint' });
});

/**
 * POST /api/posts - Yeni post yaratqual
 */
router.post('/', (req, res) => {
  res.json({ message: 'Create post endpoint' });
});

/**
 * GET /api/posts/:id - Spesifik posti al
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'Get post endpoint' });
});

module.exports = router;