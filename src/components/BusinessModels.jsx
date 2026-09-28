import React, { useState } from 'react';
import { 
  Crown, 
  ShoppingBag, 
  GraduationCap, 
  Home, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Package, 
  Video, 
  Calendar,
  Gift,
  HeartHandshake
} from 'lucide-react';

export default function BusinessModels() {
  const [activeTab, setActiveTab] = useState('subscription'); // 'subscription' | 'nutrikit' | 'academy' | 'homevisit'
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'KembangKita Basic',
      price: 'Rp 0',
      period: 'Gratis Selamanya',
      desc: 'Fitur esensial pencatatan dan skrining awal harian anak.',
      badge: 'Starter',
      isPopular: false,
      features: [
        'Input Manual & Scan Fisik KMS (5x/bulan)',
        'Jurnal Emosi Dasar dengan AI (5x/bulan)',
        'Kurva Pertumbuhan Standar WHO',
        'Pencarian Klinik Terdekat',
        'Akses Artikel Edukasi Parenting'
      ],
      buttonText: 'Paket Saat Ini'
    },
    {
      id: 'pro',
      name: 'KembangKita Pro (Anak Juara)',
      price: 'Rp 49.000',
      period: '/ bulan (atau Rp 399rb/thn)',
      desc: 'Pendampingan AI intensif & rekam medis lengkap untuk 1 anak.',
      badge: 'Paling Populer',
      isPopular: true,
      features: [
        '✨ Unlimited AI Analisis Jurnal Emosi & KMS Scan',
        '📄 Ekspor Laporan PDF Medis Resmi (Bisa dibawa ke Dokter Sp.A)',
        '🧪 Skrining Perkembangan KPSP & Denver II Interaktif',
        '🔔 Reminder Cerdas Jadwal Imunisasi & Posyandu WhatsApp',
        '🏷️ Diskon 15% Konsultasi Dokter & Psikolog',
        '💬 Akses Komunitas WhatsApp VIP Dokter Tumbuh Kembang'
      ],
      buttonText: 'Mulai Uji Coba Gratis 7 Hari'
    },
    {
      id: 'family',
      name: 'KembangKita Family Sultan',
      price: 'Rp 99.000',
      period: '/ bulan',
      desc: 'Solusi lengkap untuk keluarga dengan multi-anak (hingga 4 anak).',
      badge: 'Keluarga Bahagia',
      isPopular: false,
      features: [
        '👨‍👩‍👧‍👦 Profil Hingga 4 Anak Sekaligus',
        '✨ Semua Fitur Pro Tanpa Batas',
        '🎟️ 1x Tiket Gratis Masterclass Parenting Setiap Bulan',
        '👩‍⚕️ Prioritas Antrean Telekonsultasi & Booking Klinik',
        '📦 Diskon 20% Pembelian NutriKit Anti-Stunting',
        '📞 Akses Hotline Pendampingan Bidan Pribadi 24/7'
      ],
      buttonText: 'Langganan Family Pack'
    }
  ];

  const nutriKits = [
    {
      id: 'nutri-1',
      name: 'Paket Booster Protein Hewani (Anti-Stunting)',
      category: 'Pangan Bergizi Terverifikasi',
      price: 'Rp 145.000',
      originalPrice: 'Rp 180.000',
      rating: 4.9,
      sold: '1.4k+ terjual',
      image: '🥩',
      items: ['Abon Salmon Liar Kaya Omega 3', 'Bubuk Hati Ayam Kampung Organik', 'Minyak Lemak Tambahan (Evoo Kids)'],
      desc: 'Diformulasikan dokter spesialis gizi untuk melipatgandakan asupan zat besi & protein hewani harian balita.'
    },
    {
      id: 'nutri-2',
      name: 'Paket Suplemen Multivitamin & Zink Balita',
      category: 'Suplemen BPOM & IDAI Recommended',
      price: 'Rp 95.000',
      originalPrice: 'Rp 125.000',
      rating: 5.0,
      sold: '2.1k+ terjual',
      image: '💊',
      items: ['Sirup Zink Sulfat 20mg', 'Vitamin D3 400 IU Drop', 'Minyak Ikan Cod DHA Murni'],
      desc: 'Mendukung kepadatan tulang, nafsu makan optimal, dan perkembangan neuron otak usia emas 0-5 tahun.'
    },
    {
      id: 'nutri-3',
      name: 'Starter Kit MPASI Lengkap Anti-GTM',
      category: 'Peralatan & Bahan Siap Saji',
      price: 'Rp 185.000',
      originalPrice: 'Rp 230.000',
      rating: 4.8,
      sold: '890+ terjual',
      image: '🥣',
      items: ['Buku 60 Resep MPASI Gizi Seimbang', 'Food Masher & Grater BPA Free', 'Kaldu Jamur & Sapi Non-MSG Ramah Anak'],
      desc: 'Panduan lengkap dan bahan masakan lezat untuk mengatasi anak susah makan dan gerakan tutup mulut.'
    }
  ];

  const academyClasses = [
    {
      id: 'class-1',
      title: 'Masterclass: Sukseskan MPASI Anti-GTM & Bebas Stunting',
      speaker: 'dr. Andini Paramitha, Sp.A & Chef Spesialis MPASI',
      date: 'Sabtu, 12 Oktober 2026 • 09:30 WIB',
      type: 'Live Webinar Interaktif + E-Book Resep',
      price: 'Rp 45.000',
      originalPrice: 'Rp 100.000',
      slots: 'Tersisa 18 Tiket',
      rating: 4.9,
      badge: 'Live Session'
    },
    {
      id: 'class-2',
      title: 'Workshop Emosi: Mengatasi Tantrum & Menumbuhkan Empati Anak',
      speaker: 'Rizka Amelia, M.Psi., Psikolog Anak',
      date: 'Minggu, 20 Oktober 2026 • 14:00 WIB',
      type: 'Video Course 4 Modul + Lembar Kerja Ortu',
      price: 'Rp 65.000',
      originalPrice: 'Rp 150.000',
      slots: 'Akses Selamanya',
      rating: 5.0,
      badge: 'Best Seller'
    },
    {
      id: 'class-3',
      title: 'Stimulasi Wicara Mandiri: Deteksi Dini & Terapi Speech Delay',
      speaker: 'Bagas Wicaksono, S.Tr.Kes (TW)',
      date: 'Kamis, 25 Oktober 2026 • 19:30 WIB',
      type: 'Live Q&A Klinis + Panduan Video Latihan',
      price: 'Rp 50.000',
      originalPrice: 'Rp 120.000',
      slots: 'Tersisa 9 Tiket',
      rating: 4.9,
      badge: 'Sertifikat Resmi'
    }
  ];

  const homeVisitServices = [
    {
      id: 'hv-1',
      name: 'Paket Home Visit Posyandu Plus (Nakes ke Rumah)',
      provider: 'Bidan Terakreditasi Kemenkes',
      price: 'Rp 150.000',
      desc: 'Pemeriksaan antropometri digital akurat (panjang badan, berat, lingkar kepala) + imunisasi rutin di kenyamanan rumah Bunda.',
      includes: ['Pemeriksaan Antropometri Standar WHO', 'Konseling Gizi Personal 30 Mnt', 'Pencatatan Resmi Buku KIA Digital', 'Pemberian Vitamin A & Obat Cacing']
    },
    {
      id: 'hv-2',
      name: 'Paket Terapi Sensori & Fisioterapi Anak di Rumah',
      provider: 'Terapis Okupasi & Wicara Bersertifikat',
      price: 'Rp 275.000',
      desc: 'Sesi latihan dan stimulasi tumbuh kembang privat untuk anak dengan speech delay atau tantangan sensori integrasi.',
      includes: ['Asesmen 60 Menit di Lingkungan Rumah', 'Alat Terapi Sensori Portabel Lengkap', 'Rencana Latihan Mandiri untuk Ortu', 'Laporan Perkembangan Mingguan']
    }
  ];

  return (
    <div id="model-bisnis-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warmAmber-200/80 shadow-soft-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-warmAmber-100 text-warmAmber-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Crown className="w-3.5 h-3.5 text-warmAmber-600" />
              <span>Ekosistem Layanan & Model Bisnis KembangKita</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slateDark tracking-tight">
              Solusi Tumbuh Kembang Menyeluruh untuk Keluarga Modern
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mt-1">
              Pilih layanan premium sesuai kebutuhan si kecil: mulai dari langganan AI cerdas, produk nutrisi anti-stunting, kelas parenting, hingga kunjungan nakes ke rumah.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="bg-warmCream-200 p-1.5 rounded-2xl border border-warmAmber-200/80 flex flex-wrap sm:flex-nowrap gap-1 shrink-0">
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'subscription'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Langganan Plus</span>
            </button>

            <button
              onClick={() => setActiveTab('nutrikit')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'nutrikit'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Toko Nutrisi</span>
            </button>

            <button
              onClick={() => setActiveTab('academy')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'academy'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Akademi Ortu</span>
            </button>

            <button
              onClick={() => setActiveTab('homevisit')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'homevisit'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home Visit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Subscriptions (SaaS Model) */}
      {activeTab === 'subscription' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 transition-all flex flex-col justify-between relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-white to-warmAmber-50/50 border-2 border-warmAmber-400 shadow-xl shadow-warmAmber-500/10 scale-[1.02]'
                    : 'bg-white border border-warmAmber-200/70 shadow-soft-card'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-warmAmber-500 to-amber-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                    ⭐ Rekomendasi Utama
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-warmCream-200 text-slate-700">
                        {plan.badge}
                      </span>
                      <h3 className="text-base font-extrabold text-slateDark mt-1.5">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {plan.desc}
                  </p>

                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slateDark">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium ml-1">
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Keuntungan yang Didapat:</p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-warmAmber-600 font-bold' : 'text-slate-400'}`} />
                        <span className="leading-tight font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Memilih paket ${plan.name}. Lanjutkan ke checkout?`)}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-extrabold transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 hover:from-warmAmber-600 hover:to-warmAmber-700 text-white shadow-glow-amber'
                      : 'bg-warmCream-200 hover:bg-warmAmber-100 text-slate-800 border border-warmAmber-200/80'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: NutriKit Shop (E-Commerce Model) */}
      {activeTab === 'nutrikit' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nutriKits.map((kit) => (
              <div 
                key={kit.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-warmAmber-200/70 shadow-soft-card flex flex-col justify-between hover:border-warmAmber-400 transition-all"
              >
                <div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-warmCream-200 to-amber-100/50 flex items-center justify-center text-5xl mb-4 border border-warmAmber-200/40">
                    {kit.image}
                  </div>

                  <span className="text-[10px] font-bold text-softTeal-800 bg-softTeal-100 px-2 py-0.5 rounded-full uppercase">
                    {kit.category}
                  </span>

                  <h3 className="text-sm sm:text-base font-extrabold text-slateDark mt-1.5 mb-1">
                    {kit.name}
                  </h3>

                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    {kit.desc}
                  </p>

                  <div className="bg-warmCream-100 p-3 rounded-2xl border border-warmAmber-200/50 mb-4 text-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Isi Paket Terdiri Dari:</p>
                    <ul className="space-y-1 text-slate-700">
                      {kit.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-warmAmber-500"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through font-semibold block">{kit.originalPrice}</span>
                    <span className="text-base font-black text-warmAmber-600">{kit.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Paket "${kit.name}" ditambahkan ke keranjang belanja!`)}
                    className="px-3.5 py-2.5 rounded-xl bg-softTeal-600 hover:bg-softTeal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Beli Paket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Parenting Academy (EdTech Model) */}
      {activeTab === 'academy' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {academyClasses.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-warmAmber-200/70 shadow-soft-card flex flex-col justify-between hover:border-warmAmber-400 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-warmAmber-100 text-warmAmber-900">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{item.rating}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slateDark mt-1 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-warmCream-100 p-3 rounded-2xl border border-warmAmber-200/50">
                    <p className="font-bold text-slateDark">Pemateri: {item.speaker}</p>
                    <p className="flex items-center space-x-1 text-slate-500">
                      <Calendar className="w-3 h-3 text-warmAmber-600" />
                      <span>{item.date}</span>
                    </p>
                    <p className="flex items-center space-x-1 text-softTeal-700 font-semibold">
                      <Video className="w-3 h-3" />
                      <span>{item.type}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through font-semibold block">{item.originalPrice}</span>
                    <span className="text-base font-black text-warmAmber-600">{item.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Mendaftar kelas "${item.title}". Tiket akan dikirimkan via email!`)}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 hover:from-warmAmber-600 hover:to-warmAmber-700 text-white text-xs font-bold transition-all shadow-glow-amber flex items-center space-x-1"
                  >
                    <span>Daftar Kelas</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Home Visit Care (On-Demand Healthcare Model) */}
      {activeTab === 'homevisit' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {homeVisitServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-warmAmber-200/70 shadow-soft-card flex flex-col justify-between hover:border-warmAmber-400 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-softTeal-100 text-softTeal-900 border border-softTeal-200">
                      Layanan Tenaga Kesehatan ke Rumah
                    </span>
                    <span className="text-lg font-black text-warmAmber-600">{service.price}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slateDark mt-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-softTeal-700 font-bold mb-2">
                    Mitra: {service.provider}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="bg-warmCream-100 p-3.5 rounded-2xl border border-warmAmber-200/50 mb-4 text-xs space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cakupan Pemeriksaan:</p>
                    {service.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-softTeal-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Pemesanan Home Visit "${service.name}" dibuka. Nakes akan konfirmasi jadwal kedatangan!`)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-softTeal-600 to-softTeal-700 hover:from-softTeal-700 hover:to-softTeal-800 text-white text-xs font-bold transition-all shadow-glow-teal flex items-center justify-center space-x-1.5"
                >
                  <Home className="w-4 h-4" />
                  <span>Pesan Kunjungan Nakes ke Rumah</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
