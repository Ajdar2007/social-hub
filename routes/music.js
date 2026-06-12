const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Multer konfigurasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.MUSIC_UPLOAD_DIR || './uploads/music');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

/**
 * POST /api/music/upload - Mahnı yüklə
 */
router.post('/upload', upload.single('music'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Mahnı faylı seçilmədi' });
    }

    res.status(201).json({
      message: 'Mahnı uğurla yükləndi',
      file: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: 'Mahnı yüklənə bilmədi' });
  }
});

/**
 * GET /api/music - Bütün mahnıları al
 */
router.get('/', async (req, res) => {
  res.json({ message: 'Music list endpoint' });
});

/**
 * GET /api/music/:id/stream - Mahnı streaming
 */
router.get('/:id/stream', async (req, res) => {
  res.json({ message: 'Music streaming endpoint' });
});

/**
 * GET /api/music/recommendations/for-you - Mahnı tövsiyələri
 */
router.get('/recommendations/for-you', async (req, res) => {
  res.json({ message: 'Music recommendations endpoint' });
});

module.exports = router;