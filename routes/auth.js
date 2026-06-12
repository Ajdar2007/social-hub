const express = require('express');
const router = express.Router();

/**
 * POST /api/auth/register - Qeydiyyat
 */
router.post('/register', (req, res) => {
  res.json({ message: 'Qeydiyyat endpoint' });
});

/**
 * POST /api/auth/login - Daxil ol
 */
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

/**
 * POST /api/auth/logout - Çıx
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint' });
});

module.exports = router;