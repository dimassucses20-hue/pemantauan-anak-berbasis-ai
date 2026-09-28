import React from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Building2, 
  ExternalLink, 
  HeartHandshake, 
  Clock, 
  Navigation,
  ShieldAlert
} from 'lucide-react';

export default function ReferralWidget() {
  const referralClinics = [
    {
      id: 1,
      name: "Klinik Tumbuh Kembang Anak Bunda",
      category: "Klinik Spesialis Anak & Psikolog",
      distance: "1.4 km",
      address: "Jl. Margonda Raya No. 45",
      phone: "(021) 7888-1234",
      status: "Buka • Layanan Konsultasi & Terapi Sensori",
      tag: "Rekomendasi Utama"
    },
    {
      id: 2,
      name: "Puskesmas Ramah Anak Terpadu",
      category: "Layanan Primer BPJS & Posyandu",
      distance: "2.1 km",
      address: "Jl. Kenanga Indah No. 12",
      phone: "(021) 7755-9090",
      status: "Buka • Program Antropometri & KMS Gratis",
      tag: "BPJS Tercover"
    },
    {
      id: 3,
      name: "Pusat Konseling Keluarga PUSPAGA",
      category: "Dinas PPPA & Psikolog Komunitas",
      distance: "3.8 km",
      address: "Kompleks Perkantoran Balai Kota",
      phone: "0812-8888-8888",
      status: "Buka • Pendampingan Parenting Bebas Biaya",
      tag: "Gratis Pemerintah"
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Container Header */}
      <div className="bg-white rounded-3xl p-5 border border-warmAmber-200/70 shadow-soft-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slateDark">
                Rekomendasi Klinik & Psikolog Terdekat
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Mitra profesional tumbuh kembang dalam radius 5 km
              </p>
            </div>
          </div>
        </div>

        {/* SOS 119 Quick Call Banner */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs mb-3">
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-300 animate-pulse" />
            <div>
              <p className="text-xs font-bold leading-tight">Hotline SEJIWA Kemenkes RI</p>
              <p className="text-[10px] text-rose-100">Konseling Darurat Kesehatan Mental 24 Jam</p>
            </div>
          </div>
          <a
            href="tel:119"
            className="px-3 py-1.5 rounded-xl bg-white text-rose-700 text-xs font-extrabold hover:bg-rose-50 transition-colors shadow-xs"
          >
            Hubungi 119
          </a>
        </div>

        {/* Referral Clinic Cards */}
        <div className="space-y-2.5">
          {referralClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-3.5 rounded-2xl bg-warmCream-100 border border-warmAmber-200/60 hover:border-warmAmber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-extrabold bg-warmAmber-200 text-warmAmber-900 px-2 py-0.5 rounded-full">
                    {clinic.tag}
                  </span>
                  <span className="text-[10px] font-bold text-softTeal-700 flex items-center space-x-1">
                    <Navigation className="w-3 h-3" />
                    <span>{clinic.distance}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slateDark">
                  {clinic.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium mb-1">
                  {clinic.category} • {clinic.address}
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold">
                  {clinic.status}
                </p>
              </div>

              <div className="pt-2.5 mt-2 border-t border-warmAmber-200/40 flex items-center justify-between">
                <span className="text-[10px] text-slate-600 font-bold">{clinic.phone}</span>
                <div className="flex space-x-1.5">
                  <a
                    href={`tel:${clinic.phone}`}
                    className="px-2.5 py-1 bg-white hover:bg-softTeal-50 text-softTeal-700 text-[10px] font-bold rounded-lg border border-softTeal-200 transition-colors flex items-center space-x-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Telepon</span>
                  </a>
                  <button
                    onClick={() => alert(`Membuka rute Google Maps ke ${clinic.name}`)}
                    className="px-2.5 py-1 bg-softTeal-600 hover:bg-softTeal-700 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center space-x-1 shadow-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Rute</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
