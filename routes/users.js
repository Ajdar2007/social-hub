const express = require('express');
const router = express.Router();

/**
 * GET /api/users/:id - İstifadəçi məlumatları
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

module.exports = router;