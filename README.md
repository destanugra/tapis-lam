# Geometri Transformasi pada Pola Tapis Lampung
Video Animasi Edukasi Matematika & Budaya Lampung (Format Vertikal Smartphone 9:16)

---

## 📱 Spesifikasi Teknis Video
- **Format**: Vertikal 9:16 (Optimasi Layar Smartphone)
- **Resolusi**: 1080 × 1920 piksel
- **Frame Rate**: 30 FPS
- **Durasi Target Total**: 4 Menit 45 Detik (285 detik / 8.550 frame)
- **Durasi Selesai Saat Ini**: 52 Detik (1.560 frame: Adegan 1 + 2 + 3)
- **Gaya Visual**: Cinematic Motion Graphics, Animasi 2.5D, Tekstur Kain & Sulam Benang Emas Lampung, Visualisasi Geometri Modern
- **Palet Warna**:
  - **Emas (#E5A93C, #FDE047)**: Motif Tapis asli & sulam benang emas
  - **Toska (#14B8A6, #5EEAD4)**: Sumbu X, bayangan hasil translasi, & aksen geometri
  - **Jingga (#F97316, #FB923C)**: Sumbu Y, garis cermin, penanda sudut
  - **Merah Marun (#701A28, #581825)**: Bingkai lajur kain Tapis tradisional
  - **Biru Gelap (#040711, #070D1E)**: Kanvas kain tenun gelap bertekstur
  - **Putih (#FFFFFF, #F8FAFC)**: Rumus matematika, titik koordinat, & subtitle narasi

---

## 🎬 Status Adegan

| Adegan | Judul / Topik | Durasi | Status |
|---|---|---|---|
| **01** | **Pembuka Sinematik (Pola Tapis & Benang Emas)** | 00:00–00:13 (390 frame) | ✅ Selesai |
| **02** | **Mengenal Kain Tapis (Struktur Lajur & Sulam Cucuk)** | 00:13–00:38 (750 frame) | ✅ Selesai |
| **03** | **Pertanyaan Pemantik (Translasi & Abstraksi Geometri)** | 00:38–00:52 (420 frame) | ✅ Selesai |
| 04–12 | Refleksi, Rotasi, Dilatasi, Kombinasi, & Penutup | - | ⏳ Menunggu Storyboard |

---

## 📐 Rincian Adegan 3 — Pertanyaan Pemantik (00:38 - 00:52)
1. **Motif Tunggal & Ruang Negatif (00:00 - 00:02)**: Satu motif pucuk rebung berdiri elegan di tengah layar dikelilingi kanvas tenun gelap bertekstur, memberikan ruang fokus bagi penonton.
2. **Animasi Translasi Vektor (00:01 - 00:06)**: Motif mulai meluncur dan menduplikasi diri ke kanan dan kiri dengan vektor pergeseran $\vec{T}(\Delta x, 0)$ bercahaya toska, memperlihatkan pengulangan pola melalui pergeseran teratur.
3. **Banner Pertanyaan Besar (00:01 - 00:07)**:
   > *“Bagaimana penyulam membuat pola berulang serapi ini tanpa komputer?”*
4. **Transformasi Menjadi Segitiga Geometris (00:06 - 00:12)**:
   - Garis bergerigi pucuk rebung bertransformasi (*morphing*) menjadi segitiga matematis $\triangle ABC$.
   - Sumbu koordinat kartesius tumbuh dari bawah ke tengah layar (Sumbu $+X$ Toska, Sumbu $+Y$ Jingga) dengan titik asal $(0,0)$.
   - Titik sudut $A(0, y_1)$, $B(-x_2, y_2)$, dan $C(x_2, y_2)$ berpendar.
5. **Jawaban Konseptual (00:07 - 00:13)**: Kartu pencerahan muncul dengan gong megah: *“JAWABANNYA: GEOMETRI TRANSFORMASI”* dan rumus $P(x, y) \to P'(x', y')$.
6. **Transisi ke Tiga Motif Kunci (00:12 - 00:14)**: Garis sumbu koordinat bergerak dan membelah secara dinamis menyiapkan tiga slot/ruang untuk menampilkan tiga motif kunci di Adegan 4.

---

## 🚀 Cara Menjalankan Pratinjau (Studio)

1. Jalankan Remotion Studio:
```bash
npm run dev
```
atau
```bash
npx remotion studio
```

2. Buka browser pada alamat yang ditampilkan (biasanya `http://localhost:3000`).
3. Anda dapat memilih:
   - `GeometriTransformasiTapis` untuk memutar gabungan Adegan 1, 2, & 3 secara berkesinambungan.
   - Folder `Scenes -> Scene01-Opening` untuk Adegan 1.
   - Folder `Scenes -> Scene02-MengenalTapis` untuk Adegan 2.
   - Folder `Scenes -> Scene03-PertanyaanPemantik` untuk Adegan 3.
