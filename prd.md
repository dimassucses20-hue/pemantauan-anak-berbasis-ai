# Product Requirement Document (PRD) — KembangKita Web Platform

**Versi**: 2.0 (Web Dashboard Comprehensive Edition)  
**Status**: Active / Production-Ready  
**Target Platform**: Responsive Web Application (Desktop, Tablet, Mobile)  
**Teknologi**: React 18, Vite, Tailwind CSS, Recharts, Lucide Icons, Google Gemini AI API  

---

## 1. Executive Summary & Vision

**KembangKita** adalah platform web terpadu pemantauan tumbuh kembang fisik (Antropometri Standar WHO & Kemenkes RI) dan regulasi emosi/psikologi anak usia emas (0–5 tahun) berbasis AI.

Platform ini bertransformasi dari antarmuka sempit menjadi **Web Dashboard Modern & Luas (Full-Width Responsive)** dengan fitur pencatatan fisik manual presisi, scan foto Buku KIA/KMS, evaluasi komprehensif 3 pilar per 3 bulan via Diagram Batang (Bar Chart), AI Family Schedule harian, AI Weekly Child Report, serta ekosistem bisnis lengkap (Telekonsultasi Pakar, Booking Janji Temu Klinik, Langganan Pro, Toko NutriKit Anti-Stunting, Parenting Academy, dan Layanan Home Visit).

---

## 2. Core Personas & Stakeholders

1. **Orang Tua / Pengasuh (Parent Persona)**: Membutuhkan pencatatan antropometri dan emosi balita yang cepat, mudah dipahami, visual, serta akses instan ke dokter anak atau psikolog saat si kecil mengalami kendala.
2. **Tenaga Medis / Dokter Anak (Sp.A) & Psikolog**: Membutuhkan rekam jejak digital riil (grafik, Z-score, log emosi) yang terstruktur untuk diagnosis klinis akurat saat sesi telekonsultasi atau kunjungan faskes.
3. **Fasilitas Kesehatan / Klinik Mitra**: Membutuhkan sistem penerimaan janji temu dan antrean online terpadu.

---

## 3. Fitur Utama & Kebutuhan Fungsional

### A. Input Pertumbuhan Fisik & Antropometri (KMS Digital)
- **Input Manual Presisi**:
  - Input Tinggi Badan (cm) dengan stepper button `+` / `-` dan interactive slider.
  - Input Berat Badan (kg) dengan stepper button `+` / `-` dan interactive slider.
  - Input Lingkar Kepala (cm), Tanggal Pengukuran, dan Catatan Lokasi Faskes.
  - Preset Cepat: *Normal Ideal*, *Waspada Stunting*, *Gizi Lebih*.
- **Lampiran & Scan Foto Buku KIA / KMS**:
  - Upload foto grafik KMS fisik untuk verifikasi visual Gemini Vision AI.
- **Kalkulasi Otomatis Standar WHO**:
  - Penghitungan Z-Score BB/U, TB/U (Indikator Stunting), dan status gizi.
  - Rekomendasi asupan protein hewani dan stimulasi motorik harian.

### B. Jurnal Emosi & Observasi Perilaku Anak
- Input narasi harian orang tua dengan filter mood (Ceria, Tantrum, Cemas, GTM, Eksploratif).
- Gemini AI Psychology Analysis:
  - Deteksi mood primer, skor level stres, dan pemicu emosi anak.
  - Insight psikologis perkembangan otak anak (korteks prefrontal vs amygdala).
  - Panduan dialog empati orang tua-anak (*Parent-Child Validation Script*).

### C. Visualisasi Diagram Batang (Comprehensive Bar Chart)
- **Evaluasi Komprehensif Balita (Per 3 Bulan)**:
  - Diagram batang 3 pilar: *Kebugaran Fisik* (`#046A58`), *Mental Emosional* (`#E29E3A`), *Pola Makan & Tidur* (`#4EE0CE`).
  - Skala skor 1–10 dengan indikator zona perkembangan (*8–10: Sehat/Optimal, 5–7: Normal, 1–4: Kurang*).
  - Highlighting periode terkini dengan skor gabungan dan badge status.
- **Diagram Batang Antropometri TB/BB vs Median WHO**:
  - Perbandingan batang aktual anak vs standar median WHO per kelompok usia (0, 12, 24, 36, 48 bulan).

### D. Fitur AI Parenting Cerdas Baru
1. **AI Personalized Family Schedule**:
   - Jadwal keluarga terpersonalisasi berdasarkan kebutuhan emosi & ritme sirkadian anak.
   - Mode Hari Kerja & Mode Akhir Pekan.
   - Slot aktivitas: Sarapan & Gizi, Waktu Belajar Eksploratif, Aktivitas Fisik, Daily Empathy Check-in, Rutinitas Tidur, Piknik Sensorik.
2. **AI Weekly Child Report**:
   - Rangkuman pekanan otomatis: *Mood Pekanan*, *Aktivitas Fisik*, *Kebiasaan Tidur*, *Interaksi Keluarga*.
   - Rekomendasi antisipasi dan hal yang perlu diperhatikan orang tua.

### E. Telekonsultasi Pakar Profesional & Tarif
- Daftar dokter spesialis anak (Sp.A), psikolog anak (M.Psi), nutritionist (S.Gz), dan terapis wicara.
- Transparansi harga per sesi (Rp 85.000 – Rp 150.000 / sesi), rating, review, dan jadwal tersedia.
- Modal Booking terintegrasi.

### F. Rekomendasi Klinik Terdekat & Booking Janji Temu
- Daftar klinik, puskesmas BPJS, dan pusat terapi terdekat dengan jarak radius dan fasilitas.
- **Fitur Booking Janji Temu**:
  - Pemilihan layanan poli, tanggal kunjungan, sesi jam, data pasien, dan keluhan.
  - Konfirmasi instan: Terbit **E-Tiket Janji Temu, Nomor Antrean (A-07), dan QR Code**.
- Akses langsung Hotline SEJIWA Kemenkes RI 119 ext. 8.

### G. Ekosistem Model Bisnis & Monetisasi Tambahan
1. **Langganan SaaS (KembangKita Pro & Family)**: Fitur AI tanpa batas, ekspor PDF rekam medis posyandu, skrining KPSP/Denver II.
2. **Toko NutriKit Anti-Stunting (E-Commerce)**: Paket pangan kaya protein hewani (Abon Salmon, Hati Ayam Organik), zink, vitamin D3, dan paket starter MPASI.
3. **Akademi Parenting & Masterclass (EdTech)**: Webinar dan video course seputar MPASI, penanganan tantrum, dan speech delay.
4. **Layanan Home Visit Nakes**: Kunjungan perawat/bidan dan terapis ke rumah.

---

## 4. Non-Functional Requirements
- **Desain & Responsivitas**: Lebar web dashboard modern (`max-w-7xl`), navigasi kapsul elegan tanpa tombol ganda, palet warna warm amber, soft teal, dan soft slate.
- **Performa**: Bundle size optimal, zero build errors, render cepat dengan Vite & Recharts.
- **Keamanan Data**: Penafian medis wajib (medical disclaimer) dan kepatuhan privasi rekam medis anak.