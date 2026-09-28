# Product Requirement Document (PRD)

## 1. Project Overview & Vision
- **Project Name:** KembangKita
- **Tagline:** AI Child Growth & Emotional Tracker
- **Target User:** Orang tua, ibu muda, dan pengasuh anak balita (0–10 tahun).
- **Vision:** Aplikasi web berbasis AI yang mempermudah pemantauan tumbuh kembang fisik (kurva WHO/KMS) dan kesehatan emosional anak melalui jurnal observasi orang tua.

---

## 2. Problem Statement
1. **Fisik (KMS):** Pencatatan grafik KMS fisik/Buku KIA sering rawan hilang, rusak, atau membingungkan untuk dibaca oleh orang tua.
2. **Emosi/Mental:** Anak balita belum lancar menyampaikan emosinya secara verbal, sehingga orang tua sering salah memahami penyebab anak tantrum atau cemas.

---

## 3. Core Product Modules & Features

### Module A: Header & Profile Bar
- Logo 🌱 `KembangKita` & Badge Indikator `Gemini Active`.
- Ringkasan Profil Anak (Nama: *Gibran*, Usia: *4 Thn*, Foto Avatar).

### Module B: Dual-Mode Switcher
Aplikasi memiliki 2 tab navigasi utama:
1. **Tab 🗣️ Jurnal Cerita Ortu (Mental & Perilaku)**
   - **Input:** Teks cerita/observasi orang tua mengenai perilaku anak harian.
   - **Output AI:**
     - *Ringkasan Emosi:* Indikator mood utama (Ceria, Cemas, Butuh Perhatian).
     - *Level Stres:* Status visual (🟢 Rendah / 🟡 Sedang / 🔴 Perhatian).
     - *Insight Psikologi:* Penjelasan naratif yang ramah.
     - *Action Plan:* 1 Rekomendasi dialog/aktivitas bonding ortu-anak.


### Module C: Interactive AI Scan/Submit Zone
- Area Input Teks (Jurnal) & Upload Foto (KMS).
- Tombol CTA "Analisis dengan AI".
- Loading State Interaktif dengan Spinner.
- Result Cards yang bersih dan mudah dibaca.

### Module D: Supporting Features
- **Referral Widget:** Rekomendasi lokasi klinik tumbuh kembang / psikolog anak terdekat.
- **Medical Disclaimer:** Penafian hukum wajib bahwa analisis bersifat jurnal pemantauan awal, bukan diagnosis medis resmi.

---

## 4. UI/UX Design System
- **Layout:** Mobile-First Width (`max-w-md` terpusat di layar desktop).
- **Color Palette:**
  - Background Base: Warm Cream (`#fdfbf7`)
  - Primary Accent: Warm Amber (`#e0a84e`)
  - Secondary Accent: Soft Teal (`#14b8a6`)
  - Text Neutral: Slate Dark (`#1e293b`)
- **Typography:** Modern Sans-Serif (Inter / system-ui).

---

## 5. Technical Specifications & API Integration
- **Frontend Framework:** React.js (Vite) + Tailwind CSS.
- **AI Engine:** Google Gemini API (`@google/genai`).
  - *Jurnal Text:* Gemini Text Processing / Sentiment NLP.
- **Fallback / Demo Mode:** Simulasi data dengan `setTimeout` 2 detik jika API Key belum dipasang.