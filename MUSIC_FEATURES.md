# 🎵 SOCIAL HUB - MAHNIYA QULAQ ASMA SİSTEMİ

## 📋 Xüsusiyyətlər

### 🎧 Mahnı Yükləmə & Streaming
- MP3, WAV, FLAC, M4A, OGG formatlarını dəstəkləyir
- Metadata avtomatik çıxartılır (başlıq, sənətçi, album, müddət)
- Cover art generasiyası
- 320kbps high-quality streaming
- Byte-range streaming (pause/resume dəstəyi)

### 🎯 Mahnı Tövsiyə Sistemi
- **Collaborative Filtering** - Oxşar istifadəçilərin bəyəndikləri mahnılar
- **Genre-Based** - Janr əsaslı tövsiyələr
- **Trending** - Ən populyar mahnılar
- **Personalized** - Şəxsi bəyənkilərə əsaslanan tövsiyələr

### 💬 Social Features
- Real-time şərhlər
- Like/Unlike funksiyası
- Mahnı paylaşma (Socket.IO üstündən)
- Oynatılan mahnının broadcast edilməsi

### 🎵 Playlist Sistemi
- Playlist yaratqual/redaktə et/sil
- Mahnı əlavə/çıxart
- Public/Private seçimi
- Playlist followers

### 🔍 Axtarış & Filtrlər
- Başlıq, sənətçi, album, janr ilə axtarış
- Janr filtrləmə
- Tag əsaslı filtrlər

---

## 🛠️ API Endpoints

### 🎵 Mahnı Endpoints

```
POST   /api/music/upload              - Mahnı yüklə
GET    /api/music                     - Bütün mahnıları al
GET    /api/music/:id                 - Spesifik mahnı al
GET    /api/music/:id/stream          - Mahnı streaming
DELETE /api/music/:id                 - Mahnı sil
POST   /api/music/:id/like            - Mahnını bəyən
GET    /api/music/recommendations/for-you    - Şəxsi tövsiyələr
GET    /api/music/trending/now                - Trending mahnılar
GET    /api/music/search/query?q=...         - Mahnı axtarış
```

---

## 🚀 İstifadə Nümünəsi

### 1. Mahnı Yüklə
```bash
curl -X POST http://localhost:5000/api/music/upload \
  -F "music=@song.mp3" \
  -F "title=Mənim Mahnım" \
  -F "artist=Mənim Adım"
```

### 2. Streaming (HTML5 Audio)
```html
<audio controls>
  <source src="http://localhost:5000/api/music/123/stream" type="audio/mpeg">
</audio>
```

---

Her sual üçün Issues-da yazın! 🎧