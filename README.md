# 🎌 AnimeXStream Pro — Anime Streaming Website

Platform streaming anime subtitle Indonesia dengan teknologi React + TypeScript + Vite + Tailwind CSS. Siap deploy ke GitHub Pages!

---

## 🚀 CARA DEPLOY KE GITHUB PAGES

### 1. Build Project
```bash
npm run build
```

### 2. Upload ke GitHub
- Buat repository baru di GitHub
- Upload semua file (termasuk folder `dist/`)

### 3. Aktifkan GitHub Pages
- Masuk ke **Settings** repo
- Klik **Pages** di sidebar kiri
- Source: **Deploy from a branch**
- Branch: **main** → folder: **/ (root)**
- Klik **Save**

### 4. ✅ Selesai!
Website akan live di: `https://[username].github.io/[repo-name]/`

---

## 🔑 AKSES ADMIN

URL: `/admin`  
Password default: `admin123`

> ⚠️ **Ganti password segera** setelah deploy melalui Admin → Pengaturan Site!

---

## 📋 FITUR LENGKAP

### 🎬 Halaman Anime
- Grid anime dengan filter genre
- Search real-time
- Hero banner featured anime
- Statistik (total anime, episode)

### 📺 Halaman Episode
- Video player multi-server (YouTube, VK, Doodstream, dll)
- Auto-simpan server pilihan user
- Navigasi Prev/Next episode
- Donasi langsung (Gojek, DANA, OVO, ShopeePay)
- Donasi via WhatsApp
- QR Code (opsional)
- Daftar donatur dengan badge 🥇 Top Donator

### 🎛️ Admin Dashboard
- **Manajemen Anime** — tambah, edit, hapus anime
- **Manajemen Episode** — tambah episode dengan multi-server
- **Pengaturan Donasi** — edit semua link e-wallet
- **Manajemen Donatur** — tambah/hapus donatur manual
- **Pengaturan Site** — nama site, password admin

### 💾 Data
- Semua data disimpan di `localStorage` browser
- Tidak butuh server/database
- Admin bisa edit dari dashboard

---

## 🛠️ TEKNOLOGI

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components
- **React Router** — Routing
- **Lucide React** — Icons
- **localStorage** — Data storage

---

## 📁 STRUKTUR FOLDER

```
src/
├── components/
│   ├── layout/        # Header, Footer
│   └── ui-custom/     # AnimeCard, StatsBar, DonateSection, DonatorList
├── hooks/
│   ├── useDatabase.ts     # Database management
│   ├── useWatchHistory.ts # Watch history tracking
│   └── useAdminAuth.ts    # Admin authentication
├── pages/
│   ├── Home.tsx           # Homepage
│   ├── AnimeDetail.tsx    # Anime detail page
│   ├── EpisodePlayer.tsx  # Video player page
│   ├── AdminLogin.tsx     # Admin login
│   └── AdminDashboard.tsx # Admin dashboard
├── data/
│   └── default.ts         # Default database
├── types/
│   └── index.ts           # TypeScript types
└── App.tsx                # Main app component
```

---

## 🎨 CUSTOMISASI

### Ganti Data Anime Default
Edit file `src/data/default.ts`:
```typescript
export const DEFAULT_DB: Database = {
  anime: [
    {
      title: "Judul Anime",
      slug: "slug-anime",
      cover: "URL_gambar",
      // ...
    }
  ]
}
```

### Ganti Warna Tema
Edit file `src/index.css`:
```css
:root {
  --red: #e63946;       /* Warna utama */
  --purple: #7209b7;    /* Warna sekunder */
  --bg: #08080f;        /* Background gelap */
}
```

---

## 💡 TIPS

1. **Gambar cover** — Pakai URL dari MyAnimeList atau CDN lain
2. **Video embed** — Test URL embed dulu di browser sebelum save
3. **Backup data** — Export localStorage secara berkala
4. **Custom domain** — Bisa pakai custom domain di GitHub Pages settings

---

*Made with ❤️ untuk Anime Fans Indonesia*
