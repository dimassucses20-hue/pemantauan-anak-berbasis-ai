import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Building2, 
  ExternalLink, 
  HeartHandshake, 
  Clock, 
  Navigation,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  Stethoscope,
  Star,
  Users
} from 'lucide-react';
import BookingModal from './BookingModal';

export default function ReferralWidget({ childInfo }) {
  const [selectedFacilityType, setSelectedFacilityType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const referralClinics = [
    {
      id: 1,
      name: "RSIA & Klinik Tumbuh Kembang Bunda",
      category: "Klinik Spesialis Anak & Psikologi Terpadu",
      type: "clinic",
      distance: "1.4 km",
      address: "Jl. Margonda Raya No. 45, Beji",
      phone: "(021) 7888-1234",
      status: "Buka • 08:00 - 20:00 WIB",
      tag: "Pilihan Favorit",
      rating: 4.9,
      reviewCount: 420,
      doctorsAvailable: ["dr. Andini, Sp.A", "Rizka Amelia, M.Psi", "Bagas W., S.Tr.Kes"],
      facilities: ["Poli Tumbuh Kembang", "Sensory Gym", "Ruang ASI Nyaman", "Laboratorium Gizi"],
      price: "Rp 150.000",
      fee: 150000,
      acceptsBpjs: false
    },
    {
      id: 2,
      name: "Puskesmas Ramah Anak & Posyandu Plus",
      category: "Fasilitas Kesehatan Tingkat Pertama (FKTP)",
      type: "puskesmas",
      distance: "2.1 km",
      address: "Jl. Kenanga Indah No. 12",
      phone: "(021) 7755-9090",
      status: "Buka • 07:30 - 15:00 WIB",
      tag: "BPJS 100% Gratis",
      rating: 4.8,
      reviewCount: 310,
      doctorsAvailable: ["dr. Hendra (Dokter Umum)", "Bidan Siti, S.Tr.Keb", "Petugas Gizi"],
      facilities: ["Antropometri Standar Kemenkes", "Pemberian Makanan Tambahan (PMT)", "Poli KIA & Imunisasi"],
      price: "Gratis (BPJS) / Rp 25.000 (Umum)",
      fee: 25000,
      acceptsBpjs: true
    },
    {
      id: 3,
      name: "Pusat Terapi Sensori & Wicara Ceria Kids",
      category: "Klinik Khusus Terapi Tumbuh Kembang",
      type: "therapy",
      distance: "3.2 km",
      address: "Ruko Boulevard Hijau No. 8B",
      phone: "0812-7788-9900",
      status: "Buka • 09:00 - 18:00 WIB",
      tag: "Terapi Khusus",
      rating: 5.0,
      reviewCount: 156,
      doctorsAvailable: ["Tim Terapis Wicara & Okupasi Berlisensi"],
      facilities: ["Snoezelen Room", "Terapi Sensori Integrasi", "Konsultasi Parenting"],
      price: "Rp 180.000",
      fee: 180000,
      acceptsBpjs: false
    },
    {
      id: 4,
      name: "Pusat Konseling Keluarga PUSPAGA",
      category: "Layanan Konsultasi Psikologi Ramah Anak",
      type: "counseling",
      distance: "3.8 km",
      address: "Kompleks Perkantoran Balai Kota",
      phone: "0812-8888-8888",
      status: "Buka • 08:30 - 16:00 WIB",
      tag: "Program Pemerintah",
      rating: 4.9,
      reviewCount: 280,
      doctorsAvailable: ["Psikolog Klinis Komunitas PPPA"],
      facilities: ["Konseling Parenting", "Pencegahan Stunting Berbasis Keluarga"],
      price: "Gratis Pemerintah",
      fee: 0,
      acceptsBpjs: true
    }
  ];

  const filteredClinics = referralClinics.filter(clinic => {
    const matchType = selectedFacilityType === 'all' || 
                      (selectedFacilityType === 'bpjs' && clinic.acceptsBpjs) ||
                      clinic.type === selectedFacilityType;
    const matchSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        clinic.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const handleOpenBooking = (clinic) => {
    setSelectedClinic(clinic);
    setIsBookingOpen(true);
  };

  return (
    <div id="klinik-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warmAmber-200/70 shadow-soft-card space-y-5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slateDark">
                  Faskes & Klinik Tumbuh Kembang Terdekat
                </h3>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Fitur Booking Janji Temu
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Mitra faskes, puskesmas, dan klinik spesialis tumbuh kembang anak dalam radius sekitar
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-1.5 bg-warmCream-200 p-1.5 rounded-2xl border border-warmAmber-200 text-xs font-bold">
            <button
              onClick={() => setSelectedFacilityType('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedFacilityType === 'all'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Faskes
            </button>
            <button
              onClick={() => setSelectedFacilityType('clinic')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedFacilityType === 'clinic'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Klinik Spesialis
            </button>
            <button
              onClick={() => setSelectedFacilityType('puskesmas')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedFacilityType === 'puskesmas'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Puskesmas / Posyandu
            </button>
            <button
              onClick={() => setSelectedFacilityType('therapy')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedFacilityType === 'therapy'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Klinik Terapi
            </button>
            <button
              onClick={() => setSelectedFacilityType('bpjs')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedFacilityType === 'bpjs'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BPJS Tercover
            </button>
          </div>
        </div>

        {/* SOS 119 Hotline Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg relative overflow-hidden">
          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight">Hotline SEJIWA Kemenkes RI (Darurat Tumbuh Kembang & Mental)</p>
              <p className="text-xs text-rose-100">Konseling darurat krisis emosi orang tua & balita bebas pulsa 24 jam nonstop</p>
            </div>
          </div>
          <a
            href="tel:119"
            className="px-5 py-2.5 rounded-2xl bg-white text-rose-700 text-xs font-black hover:bg-rose-50 transition-colors shadow-md text-center shrink-0"
          >
            Hubungi Bebas Pulsa 119
          </a>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari faskes, rumah sakit, puskesmas, atau alamat klinik..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
          />
        </div>

        {/* Clinic Cards Grid (Wide Multi-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-5 sm:p-6 rounded-3xl bg-warmCream-100/90 border border-warmAmber-200/70 hover:border-warmAmber-400 transition-all flex flex-col justify-between shadow-soft-card group space-y-4"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-3 py-0.5 rounded-full ${
                    clinic.acceptsBpjs 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                      : 'bg-warmAmber-200 text-warmAmber-900 border border-warmAmber-300'
                  }`}>
                    {clinic.tag}
                  </span>
                  <span className="text-xs font-bold text-softTeal-700 flex items-center space-x-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{clinic.distance}</span>
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slateDark group-hover:text-warmAmber-700 transition-colors">
                  {clinic.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mb-2">
                  {clinic.category} • {clinic.address}
                </p>

                {/* Rating & Status */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                  <span className="flex items-center space-x-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{clinic.rating} ({clinic.reviewCount} ulasan)</span>
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{clinic.status}</span>
                  </span>
                </div>

                {/* Facilities Badges */}
                <div className="space-y-1.5 text-xs bg-white p-3 rounded-2xl border border-warmAmber-200/50 mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fasilitas & Layanan Unggulan:</span>
                  <div className="flex flex-wrap gap-1">
                    {clinic.facilities.map((fac, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-warmCream-200 text-slate-700 px-2 py-0.5 rounded-md">
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Doctors Preview */}
                <div className="text-xs text-slate-600 flex items-center space-x-1.5 pt-1">
                  <Users className="w-3.5 h-3.5 text-softTeal-600 shrink-0" />
                  <span className="truncate">Dokter / Terapis: {clinic.doctorsAvailable.join(', ')}</span>
                </div>
              </div>

              {/* Bottom Actions with Booking button */}
              <div className="pt-3.5 border-t border-warmAmber-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimasi Biaya:</span>
                  <span className="text-xs sm:text-sm font-black text-warmAmber-700">{clinic.price}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${clinic.phone}`}
                    className="px-3 py-2 bg-white hover:bg-softTeal-50 text-softTeal-700 text-xs font-bold rounded-xl border border-softTeal-200 transition-colors flex items-center space-x-1 shadow-xs"
                    title={`Telepon ${clinic.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Telepon</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(clinic)}
                    className="px-4 py-2 bg-gradient-to-r from-softTeal-600 to-softTeal-700 hover:from-softTeal-700 hover:to-softTeal-800 text-white text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1.5 shadow-glow-teal"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Buat Janji / Booking</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Booking Modal Instance */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        targetItem={selectedClinic}
        type="clinic"
        childInfo={childInfo}
      />

    </div>
  );
}
