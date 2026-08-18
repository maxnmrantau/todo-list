# 🌟 AuraTasks — Smart & Aesthetic Todo List

Aplikasi Todo List modern, elegan, dan kaya fitur yang dirancang dengan estetika *Glassmorphism*, analitik produktivitas interaktif, micro-animations, efek suara Web Audio, serta **100% siap dideploy ke [Vercel](https://vercel.com)**.

---

## ✨ Fitur Utama

- 🎨 **Desain Premium & Glassmorphism**:
  - Pilihan 3 Tema Dinamis: **Dark Slate**, **Aurora Cyber**, dan **Clean Light**.
  - Background Mesh Aurora Animated yang estetik.
  - Tipografi Google Fonts modern (*Plus Jakarta Sans* & *Outfit*).
- 📝 **Manajemen Tugas Lengkap**:
  - Quick Add dengan pintasan keyboard.
  - Subtasks / Checklist interaktif dengan progress bar visual.
  - 4 Tingkat Prioritas: *Urgent* (🔥), *Tinggi* (🔴), *Sedang* (🟡), *Rendah* (🟢).
  - Indikator cerdas *Overdue* (berkedip lembut) dan *Today*.
  - Pin/Sematkan tugas penting ke urutan teratas.
  - Duplikasi tugas & Edit modal yang lengkap.
- 🔍 **Filter, Pencarian & Sortir Cerdas**:
  - Filter status: *Semua*, *Aktif*, *Hari Ini*, *Selesai*.
  - Filter kategori & prioritas.
  - Pencarian instan (tekan `/` untuk fokus pencarian).
  - Pengurutan berdasarkan tanggal dibuat, tenggat terdekat, prioritas, atau abjad.
- 📊 **Dashboard & Produktivitas**:
  - *Radial Progress Ring* animasi persentase penyelesaian tugas.
  - Penghitung habit streak harian.
  - Kutipan motivasi produktivitas dinamis.
- 🔊 **Micro-Interactions & Audio**:
  - Animasi perayaan Confetti (`canvas-confetti`) saat menyelesaikan tugas.
  - Efek suara sintetis (Web Audio API - tanpa file eksternal) dengan opsi mute.
- 💾 **Portabilitas Data & Backup**:
  - Penyimpanan otomatis instan di `localStorage`.
  - Fitur **Export ke JSON** & **Export ke CSV** (kompatibel dengan Excel/Google Sheets).
  - Fitur **Import JSON** untuk restore data.
  - Notifikasi Toast dengan aksi **Undo** penghapusan.

---

## 🚀 Menjalankan Aplikasi Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18+ disarankan).

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Buka URL lokal yang muncul (misalnya `http://localhost:5173`) di browser Anda.

3. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   Hasil build akan tersimpan di folder `dist/`.

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dilengkapi dengan file konfigurasi [`vercel.json`](file:///d:/CODING/AI%20STUDIO/Todo%20List/vercel.json) dan struktur build Vite standar sehingga siap dideploy langsung ke Vercel tanpa pengaturan rumit.

### Opsi 1: Deploy via GitHub (Paling Direkomendasikan)

1. Upload / Push folder proyek ini ke repository **GitHub** Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AuraTasks Todo App"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com) dan login.
3. Klik tombol **"Add New..."** -> **"Project"**.
4. Pilih repository GitHub Anda (`REPO_NAME`).
5. Vercel akan secara otomatis mendeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Klik **"Deploy"**. Dalam beberapa detik aplikasi Anda sudah aktif secara global dengan domain gratis `https://nama-proyek.vercel.app`! 🎉

---

### Opsi 2: Deploy Cepat via Vercel CLI

1. Install Vercel CLI secara global (jika belum):
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di folder proyek:
   ```bash
   vercel
   ```
3. Ikuti instruksi di terminal (tekan `Enter` untuk opsi default).
4. Untuk deploy ke lingkungan produksi:
   ```bash
   vercel --prod
   ```

---

## 📁 Struktur Proyek

```
Todo List/
├── index.html         # Halaman utama aplikasi (HTML5 semantik & responsif)
├── style.css          # Design system, Glassmorphism, 3 tema, dan animasi
├── app.js             # State management, sound engine, filter, subtasks, & confetti
├── vercel.json        # Konfigurasi routing, cache, dan security headers Vercel
├── package.json       # Metadata proyek & script build Vite
└── README.md          # Dokumentasi proyek & panduan deploy
```

---

## 📄 Lisensi

Dilisensikan di bawah [MIT License](LICENSE). Bebas digunakan dan dimodifikasi untuk kebutuhan personal maupun komersial.
