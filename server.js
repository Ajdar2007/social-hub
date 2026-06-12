require('dotenv').config();
const express = require('express');
const cors = require('express-cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Upload direktoriləri yaratqual
const uploadDirs = [
  process.env.MUSIC_UPLOAD_DIR || './uploads/music',
  process.env.UPLOAD_DIR || './uploads',
  './uploads/posts',
  './uploads/avatars',
  './uploads/videos',
  './cache/music'
];

(async () => {
  for (const dir of uploadDirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      console.warn(`Directory yaratma xətası: ${dir}`, error.message);
    }
  }
})();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-hub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB qoşuldu'))
.catch(err => console.error('❌ MongoDB xətası:', err));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server işləyir ✅', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    features: {
      chat: true,
      music: true,
      recommendations: true,
      ai_chatbot: true
    }
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/users', require('./routes/users'));
app.use('/api/music', require('./routes/music'));

// Socket.IO Real-time Chat & Notifications
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log(`👤 Yeni istifadəçi qoşuldu: ${socket.id}`);

  // İstifadəçi online oldu
  socket.on('user-online', (userId) => {
    activeUsers.set(socket.id, userId);
    io.emit('user-status', { userId, status: 'online', onlineCount: activeUsers.size });
  });

  // Söhbət mesajı
  socket.on('send-message', (data) => {
    io.emit('receive-message', {
      user: data.user,
      message: data.message,
      timestamp: new Date(),
      avatar: data.avatar
    });
  });

  // Typing indicatoru
  socket.on('user-typing', (data) => {
    socket.broadcast.emit('user-typing', {
      user: data.user,
      isTyping: true
    });
  });

  // 🎵 Mahnı paylaşılması
  socket.on('share-music', (data) => {
    io.emit('music-shared', {
      user: data.user,
      music: data.music,
      timestamp: new Date(),
      message: `${data.user} mahnı paylaşdı: ${data.music.title} - ${data.music.artist}`
    });
  });

  // 🎵 Oynatılan mahnı
  socket.on('music-playing', (data) => {
    socket.broadcast.emit('music-playing-broadcast', {
      user: data.user,
      music: data.music,
      isPlaying: data.isPlaying
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    const userId = activeUsers.get(socket.id);
    activeUsers.delete(socket.id);
    io.emit('user-status', { userId, status: 'offline', onlineCount: activeUsers.size });
    console.log(`👤 İstifadəçi getdi: ${socket.id}`);
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('🔴 Xəta:', err);
  res.status(500).json({ 
    error: 'Serverr xətası', 
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota tapılmadı', path: req.originalUrl });
});

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║       🚀 SOCIAL HUB SERVER 🚀          ║
╠════════════════════════════════════════╣
║ 📍 URL: http://localhost:${PORT}
║ 🎵 Mahnı Streaming: FƏAL ✅            ║
║ 💬 Real-time Chat: FƏAL ✅             ║
║ 🤖 AI Chatbot: FƏAL ✅                 ║
║ 🎯 Recommendations: FƏAL ✅            ║
║ 📝 WebSocket: QOŞULMUŞ ✅              ║
╚════════════════════════════════════════╝
  `);
});

module.exports = { app, io };