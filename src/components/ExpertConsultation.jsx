import React, { useState } from 'react';
import { 
  Stethoscope, 
  Brain, 
  Utensils, 
  Activity, 
  Star, 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  ShieldCheck, 
  Filter, 
  Sparkles, 
  ArrowRight,
  Search,
  Award,
  CheckCircle2
} from 'lucide-react';
import BookingModal from './BookingModal';

export default function ExpertConsultation({ childInfo }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Pakar', icon: Sparkles },
    { id: 'psychology', label: 'Psikolog Anak & Emosi', icon: Brain },
    { id: 'pediatrician', label: 'Dokter Anak (Sp.A)', icon: Stethoscope },
    { id: 'nutrition', label: 'Ahli Gizi & MPASI', icon: Utensils },
    { id: 'therapy', label: 'Terapis Wicara & Sensori', icon: Activity }
  ];

  const expertsList = [
    {
      id: 1,
      name: "dr. Andini Paramitha, Sp.A, M.Kes",
      role: "Dokter Spesialis Anak (Konsultan Tumbuh Kembang)",
      category: "pediatrician",
      avatar: "👩‍⚕️",
      rating: 4.9,
      reviewCount: 342,
      experience: "11 Tahun Pengalaman",
      hospital: "RSIA Bunda Jakarta & RS Pondok Indah",
      str: "STR: 31.2.1.100.2.19.123456",
      specialties: ["Skrining Stunting", "Keterlambatan Bicara (Speech Delay)", "Gizi Buruk & Alergi"],
      price: "Rp 150.000",
      fee: 150000,
      originalPrice: "Rp 200.000",
      duration: "45 Menit",
      availableTime: "Hari Ini, 14:00 WIB",
      status: "Online Sekarang",
      isPopular: true
    },
    {
      id: 2,
      name: "Rizka Amelia, M.Psi., Psikolog Anak",
      role: "Psikolog Klinis Anak & Remaja",
      category: "psychology",
      avatar: "🧕",
      rating: 5.0,
      reviewCount: 512,
      experience: "8 Tahun Pengalaman",
      hospital: "Lembaga Psikologi Terapan UI & Private Clinic",
      str: "SIPP: 1987-2015-04-2-0012",
      specialties: ["Tantrum & Regulasi Emosi", "Kecemasan Anak (Anxiety)", "Sibling Rivalry & Bonding"],
      price: "Rp 120.000",
      fee: 120000,
      originalPrice: "Rp 175.000",
      duration: "50 Menit",
      availableTime: "Hari Ini, 16:30 WIB",
      status: "Tersedia 3 Slot",
      isPopular: true
    },
    {
      id: 3,
      name: "Nurul Hidayati, S.Gz, RD",
      role: "Nutritionist & Konselor MPASI Anak",
      category: "nutrition",
      avatar: "👩‍🍳",
      rating: 4.8,
      reviewCount: 219,
      experience: "6 Tahun Pengalaman",
      hospital: "Klinik Gizi Holistik Sehat Anak",
      str: "STRGz: 14.01.5.2.18.0987",
      specialties: ["Menu MPASI Anti-GTM", "Booster BB Stunting", "Alergi Makanan & Susu Sapi"],
      price: "Rp 85.000",
      fee: 85000,
      originalPrice: "Rp 120.000",
      duration: "35 Menit",
      availableTime: "Besok, 09:00 WIB",
      status: "Tersedia",
      isPopular: false
    },
    {
      id: 4,
      name: "Bagas Wicaksono, S.Tr.Kes (TW)",
      role: "Terapis Wicara & Sensori Integrasi Anak",
      category: "therapy",
      avatar: "👨‍⚕️",
      rating: 4.9,
      reviewCount: 184,
      experience: "9 Tahun Pengalaman",
      hospital: "Pusat Terapi Terpadu Tumbuh Ceria",
      str: "STRTW: 33.12.5.1.20.1122",
      specialties: ["Speech Delay", "Artikulasi & Gagap", "Sensory Processing Disorder"],
      price: "Rp 110.000",
      fee: 110000,
      originalPrice: "Rp 150.000",
      duration: "45 Menit",
      availableTime: "Besok, 13:00 WIB",
      status: "Tersedia",
      isPopular: false
    }
  ];

  const filteredExperts = expertsList.filter(expert => {
    const matchCategory = selectedCategory === 'all' || expert.category === selectedCategory;
    const matchSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleOpenBooking = (expert) => {
    setSelectedExpert(expert);
    setIsBookingOpen(true);
  };

  return (
    <div id="pakar-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header Card */}
      <div className="bg-gradient-to-r from-warmAmber-500 via-warmAmber-600 to-softTeal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% Terverifikasi IDAI, HIMPSI, & PERSAGI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Konsultasi Langsung dengan Pakar & Dokter Tumbuh Kembang
            </h2>
            <p className="text-xs sm:text-sm text-warmCream-200 leading-relaxed font-normal">
              Dapatkan analisis mendalam, resep gizi klinis, evaluasi emosi, serta sesi telekonsultasi intensif terpercaya dengan harga terjangkau dan transparan.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 min-w-[200px]">
            <span className="text-[10px] font-bold text-amber-200 uppercase tracking-widest block">Garansi Layanan</span>
            <p className="text-lg font-black text-white">Respon Cepat & Nyaman</p>
            <span className="text-[11px] text-warmCream-200">Video Call HD + Resume AI</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-warmAmber-200/70 shadow-soft-card space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-warmAmber-500 text-white shadow-xs scale-[1.02]'
                      : 'bg-warmCream-200 text-slate-600 hover:text-slate-900 hover:bg-warmAmber-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pakar, topik, atau keluhan..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
            />
          </div>

        </div>
      </div>

      {/* Expert Cards Grid (Wide Multi-Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredExperts.map((expert) => (
          <div 
            key={expert.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-warmAmber-200/70 shadow-soft-card hover:shadow-lg transition-all hover:border-warmAmber-400 flex flex-col justify-between relative group"
          >
            {expert.isPopular && (
              <span className="absolute -top-2.5 right-6 bg-gradient-to-r from-warmAmber-500 to-amber-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                ⭐ Terlaris & Paling Direkomendasikan
              </span>
            )}

            <div>
              {/* Profile Top Row */}
              <div className="flex items-start space-x-4 mb-3.5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-warmAmber-100 to-warmCream-200 border-2 border-warmAmber-300 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                  {expert.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm sm:text-base font-extrabold text-slateDark truncate">
                      {expert.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-softTeal-600 shrink-0" title="Terverifikasi SIP / STR Aktif" />
                  </div>
                  <p className="text-xs text-softTeal-700 font-bold mt-0.5">
                    {expert.role}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {expert.hospital}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-warmCream-100 p-2.5 rounded-2xl border border-warmAmber-200/50 text-center mb-3.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Rating</span>
                  <p className="font-extrabold text-slateDark flex items-center justify-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{expert.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({expert.reviewCount})</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Pengalaman</span>
                  <p className="font-extrabold text-slateDark">{expert.experience.split(' ')[0]} Thn</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Jadwal</span>
                  <p className="font-bold text-emerald-700 text-[11px] truncate">{expert.availableTime.split(',')[0]}</p>
                </div>
              </div>

              {/* Specialties Chips */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Fokus Penanganan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {expert.specialties.map((item, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-softTeal-50 text-softTeal-900 border border-softTeal-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Price & Booking CTA */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 line-through font-semibold block">
                  {expert.originalPrice}
                </span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-base sm:text-lg font-black text-warmAmber-600">
                    {expert.price}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    / {expert.duration}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleOpenBooking(expert)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 hover:from-warmAmber-600 hover:to-warmAmber-700 text-white text-xs font-bold transition-all shadow-glow-amber flex items-center space-x-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Konsultasi / Booking</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Modal Instance */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        targetItem={selectedExpert}
        type="expert"
        childInfo={childInfo}
      />

    </div>
  );
}
