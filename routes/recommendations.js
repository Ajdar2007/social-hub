const express = require('express');
const router = express.Router();

/**
 * GET /api/recommendations - Tövsiyələri al
 */
router.get('/', (req, res) => {
  res.json({ message: 'Recommendations endpoint' });
});

module.exports = router;