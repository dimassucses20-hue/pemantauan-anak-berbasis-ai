# Task Checklist: KembangKita Development

- [x] **Task 1: Setup Layout Utama & Tailwind Configuration**
  - Pastikan warna Warm Amber (`#e0a84e`), Soft Teal (`#14b8a6`), dan Warm Cream (`#fdfbf7`) terkonfigurasi di `tailwind.config.js`.
  - Buat container utama aplikasi di `App.jsx` dengan tata letak mobile-first (`max-w-md mx-auto min-h-screen`).

- [x] **Task 2: Buat Component Header & Profile Bar**
  - Buat file `src/components/Header.jsx` untuk menampilkan logo eksklusif SVG KembangKita (kurva grafik naik + tunas mekar + silhouette hati, stroke Warm Amber & fill Soft Teal) dan badge status `Gemini Active / Ready`.
  - Buat file `src/components/ProfileCard.jsx` untuk menampilkan foto avatar anak, nama (Gibran), usia (7 Tahun), dan ringkasan status harian emosi & fisik WHO.

- [x] **Task 3: Buat State & Tab Switcher (Dual-Mode)**
  - Implementasikan tab switcher interaktif di `App.jsx` untuk berpindah antara `Tab Jurnal Cerita Ortu` dan `Tab Catat Tumbuh Kembang`.
  - Buat indikator visual tombol yang aktif dan sesuaikan tampilan formulir sesuai tab yang dipilih.

- [x] **Task 4: Buat Component Jurnal Cerita Ortu (Mental & Perilaku)**
  - Buat file `src/components/JournalForm.jsx` berisi `textarea` tempat orang tua menceritakan observasi perilaku anak harian.
  - Tambahkan tombol CTA "Analisis Cerita dengan AI" dan indikator animasi loading spinner.
  - Buat kartu hasil analisis NLP (Ringkasan Emosi, Level Stres/Pemicu 🟢/🟡/🔴, Insight Psikologi, dan Rekomendasi Dialog Orang Tua).

- [x] **Task 5: Buat Component Input Tumbuh Kembang Fisik (Manual Input)**
  - Buat file `src/components/GrowthInputForm.jsx` berisi form input angka: Berat Badan (kg), Tinggi Badan (cm), dan Usia (Bulan/Tahun) untuk rentang usia anak 0–10 tahun.
  - Tambahkan tombol CTA "Simpan & Plot ke Grafik" beserta indikator umpan balik setelah data berhasil disimpan.
  - Hubungkan form ke state utama agar data fisik terbaru otomatis terkirim dan langsung di-plot ke komponen `HistorySection.jsx`.

- [x] **Task 6: Buat Component Riwayat & Grafik Tren (History & Trend Visualizer)**
  - Buat file `src/components/HistorySection.jsx` untuk menampilkan grafik kurva pertumbuhan fisik (TB/BB vs Standar WHO 0-10 Tahun) dan riwayat timeline emosi anak.
  - Buat komponen grafik interaktif menggunakan Recharts untuk memvisualisasikan data historis dari waktu ke waktu.
  - Sediakan tombol filter kategori: `Semua`, `Mental`, dan `Fisik`.
  - Sinkronisasi state otomatis saat ada analisis baru dari Jurnal atau Input Fisik.

- [x] **Task 7: Buat Component Referral & Medical Disclaimer**
  - Buat file `src/components/ReferralWidget.jsx` berisi rekomendasi lokasi klinik tumbuh kembang / psikolog anak terdekat (Radius 5 km) + SOS 119 Call.
  - Buat footer penafian medis wajib di bagian bawah aplikasi (`App.jsx`).

- [x] **Task 8: Integrasi Fallback & Mock Data Simulation**
  - Integrasi Gemini API (`@google/genai` / REST API) dengan key `VITE_GEMINI_API_KEY`.
  - Tambahkan fungsi penundaan waktu (`setTimeout` 2 detik) di tiap proses analisis untuk menyimulasikan respon AI Gemini jika API key belum dikonfigurasi.
  - Buat data tiruan (*mock response & history*) yang realistis dalam bahasa Indonesia untuk keperluan demo panggung.