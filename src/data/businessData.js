// Data for Teleconsultation Specialists, Clinics, Products, and Business Models

export const expertSpecialists = [
  {
    id: "exp-1",
    name: "dr. Amanda Rahmania, Sp.A",
    title: "Dokter Spesialis Anak (Pediatrician)",
    hospital: "RSIA Bunda & Tele-KembangKita",
    experience: "9 Tahun Pengalaman",
    rating: 4.9,
    reviewsCount: 342,
    avatar: "👩‍⚕️",
    price: 85000,
    priceFormatted: "Rp 85.000",
    duration: "30 Menit",
    specialties: ["Tumbuh Kembang 1000 HPK", "Pencegahan Stunting", "Nutrisi & GTM", "Vaksinasi"],
    isAvailable: true,
    availableSchedule: ["Hari ini, 19:30 WIB", "Besok, 10:00 WIB", "Besok, 14:00 WIB"]
  },
  {
    id: "exp-2",
    name: "Rania Faradilla, M.Psi., Psikolog",
    title: "Psikolog Perkembangan Anak & Keluarga",
    hospital: "Lembaga Psikologi Terpadu & KembangKita",
    experience: "7 Tahun Pengalaman",
    rating: 5.0,
    reviewsCount: 289,
    avatar: "🧕",
    price: 95000,
    priceFormatted: "Rp 95.000",
    duration: "45 Menit",
    specialties: ["Regulasi Emosi & Tantrum", "Speech Delay", "Parental Burnout", "Separation Anxiety"],
    isAvailable: true,
    availableSchedule: ["Hari ini, 20:00 WIB", "Besok, 13:00 WIB", "Sabtu, 09:00 WIB"]
  },
  {
    id: "exp-3",
    name: "dr. Budi Setiawan, Sp.A(K)",
    title: "Konsultan Tumbuh Kembang Pediatrik",
    hospital: "RS Hermina & Mitra KembangKita",
    experience: "14 Tahun Pengalaman",
    rating: 4.9,
    reviewsCount: 512,
    avatar: "👨‍⚕️",
    price: 140000,
    priceFormatted: "Rp 140.000",
    duration: "45 Menit",
    specialties: ["Evaluasi Milestones KPSP", "ADHD & Sensori Integrasi", "Diagnosa Perawakan Pendek"],
    isAvailable: false,
    availableSchedule: ["Besok, 16:00 WIB", "Lusa, 10:00 WIB"]
  },
  {
    id: "exp-4",
    name: "Nabila Saraswati, S.Gz, RD",
    title: "Ahli Gizi Klinis & MPASI Balita",
    hospital: "Pusat Nutrisi Anak Kemenkes",
    experience: "6 Tahun Pengalaman",
    rating: 4.8,
    reviewsCount: 198,
    avatar: "👩‍🔬",
    price: 60000,
    priceFormatted: "Rp 60.000",
    duration: "30 Menit",
    specialties: ["Penyusunan Menu MPASI Protein Hewani", "Koreksi Berat Badan", "Alergi Makanan"],
    isAvailable: true,
    availableSchedule: ["Hari ini, 21:00 WIB", "Besok, 11:30 WIB"]
  }
];

export const partnerClinics = [
  {
    id: "clinic-1",
    name: "Klinik Tumbuh Kembang Anak Bunda",
    type: "Klinik Pratama & Terapi Sensori",
    distance: "1.4 km",
    address: "Jl. Margonda Raya No. 45, Jakarta Selatan",
    phone: "(021) 7888-1234",
    facilities: ["Poli Dokter Anak", "Terapi Wicara", "Sensori Integrasi", "Fisioterapi Anak"],
    consultationFee: "Mulai Rp 150.000",
    availableSlots: ["09:00 WIB", "11:00 WIB", "14:30 WIB", "16:00 WIB"],
    bpjsCovered: true
  },
  {
    id: "clinic-2",
    name: "RSIA Permata Harapan",
    type: "Rumah Sakit Ibu & Anak",
    distance: "2.8 km",
    address: "Jl. Boulevard Timur Blok A2, Jakarta",
    phone: "(021) 8990-5678",
    facilities: ["IGD 24 Jam Anak", "USG & Antropometri Digital", "Klinik Laktasi", "Vaksinasi Lengkap"],
    consultationFee: "Mulai Rp 220.000",
    availableSlots: ["10:00 WIB", "13:00 WIB", "15:30 WIB", "18:30 WIB"],
    bpjsCovered: true
  },
  {
    id: "clinic-3",
    name: "Puskesmas Ramah Anak Terpadu",
    type: "Fasilitas Kesehatan Tingkat Pertama (FKTP)",
    distance: "0.9 km",
    address: "Jl. Cendrawasih No. 12",
    phone: "(021) 7755-9090",
    facilities: ["Poli KIA / Posyandu", "Imunisasi Dasar Gratis", "Pemberian Makanan Tambahan (PMT)"],
    consultationFee: "Gratis (BPJS) / Rp 15.000 (Umum)",
    availableSlots: ["08:30 WIB", "09:30 WIB", "10:30 WIB"],
    bpjsCovered: true
  }
];

export const nutritionProducts = [
  {
    id: "prod-1",
    name: "Abon Hati Ayam Organik (Zat Besi Booster)",
    category: "Nutrisi Anti-Stunting",
    tag: "Best Seller MPASI",
    weight: "100 gram",
    price: 38000,
    priceFormatted: "Rp 38.000",
    description: "Kaya zat besi hewani alami untuk mencegah anemia dan mendongkrak nafsu makan balita.",
    icon: "🍗",
    stock: 45
  },
  {
    id: "prod-2",
    name: "Minyak Ikan Wild Salmon Norwegia (DHA 600mg)",
    category: "Perkembangan Otak",
    tag: "Nutrisi Kognitif",
    weight: "150 ml",
    price: 89000,
    priceFormatted: "Rp 89.000",
    description: "Mendukung perkembangan neurotransmitter otak, fokus bicara, dan imunitas balita.",
    icon: "🐟",
    stock: 28
  },
  {
    id: "prod-3",
    name: "Sereal Beras Merah & Kaldu Sapi Sumsum",
    category: "MPASI Padat Gizi",
    tag: "BB Booster",
    weight: "250 gram",
    price: 45000,
    priceFormatted: "Rp 45.000",
    description: "Formula kalori tinggi untuk mengejar ketertinggalan berat badan balita (*catch-up growth*).",
    icon: "🥣",
    stock: 60
  }
];

export const subscriptionPlans = [
  {
    id: "plan-free",
    name: "Starter (Free)",
    price: 0,
    priceFormatted: "Gratis",
    period: "Selamanya",
    badge: "Paket Dasar",
    features: [
      "Input Manual Berat & Tinggi Badan",
      "Kalkulator WHO Z-Score Standar",
      "1x Analisis AI Jurnal Emosi per hari",
      "Akses Direktori SOS 119 & Klinik"
    ],
    highlight: false,
    cta: "Paket Saat Ini"
  },
  {
    id: "plan-pro",
    name: "KembangKita Pro Family",
    price: 49000,
    priceFormatted: "Rp 49.000",
    period: "/ bulan",
    badge: "Paling Populer ⭐",
    features: [
      "Semua fitur Starter",
      "Unlimited Analisis AI Emosi & Vision OCR Buku KIA",
      "Prediksi Risiko Stunting 6 Bulan Kedepan",
      "Ekspor Resume Medis PDF Siap Cetak Dokter/Posyandu",
      "Diskon 20% Telekonsultasi Dokter Spesialis Anak",
      "Dukungan Multi-Anak hingga 3 Balita"
    ],
    highlight: true,
    cta: "Upgrade ke Pro"
  },
  {
    id: "plan-vip",
    name: "VIP Holistic Care",
    price: 129000,
    priceFormatted: "Rp 129.000",
    period: "/ bulan",
    badge: "Lengkap & Dedicated",
    features: [
      "Semua fitur Pro Family",
      "1x Gratis Konsultasi Psikolog / Dokter Anak per bulan",
      "Akses Eksklusif Masterclass Parenting Bulanan",
      "Prioritas Jalur Cepat Booking Klinik Mitra",
      "Paket Nutrisi Anti-Stunting Bulanan Terkirim ke Rumah"
    ],
    highlight: false,
    cta: "Pilih VIP Care"
  }
];
