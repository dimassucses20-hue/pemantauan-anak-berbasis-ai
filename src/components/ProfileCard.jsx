import React from 'react';
import { 
  Baby, 
  Heart, 
  Activity, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Ruler, 
  Weight, 
  FileText, 
  PlusCircle, 
  TrendingUp,
  Award
} from 'lucide-react';

export default function ProfileCard({ childInfo, latestPhysical, latestMental, onActionClick }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warmAmber-200/70 shadow-soft-card relative overflow-hidden transition-all hover:shadow-md">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-warmAmber-100/60 via-softTeal-50/40 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Child Profile Bio */}
        <div className="flex items-start sm:items-center space-x-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-warmAmber-300 via-warmAmber-200 to-warmCream-100 border-2 border-warmAmber-300 flex items-center justify-center text-3xl sm:text-4xl shadow-md">
              👦
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Status Aktif & Sehat">
              <CheckCircle className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slateDark tracking-tight">
                {childInfo.name}
              </h1>
              <span className="text-xs font-black text-warmAmber-900 bg-warmAmber-200/90 px-3 py-0.5 rounded-full border border-warmAmber-300">
                {childInfo.age}
              </span>
              <span className="text-xs font-bold text-softTeal-800 bg-softTeal-100 px-2.5 py-0.5 rounded-full border border-softTeal-200 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-softTeal-600" />
                <span>WHO Tracked</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {childInfo.gender} • Lahir 15 Juli 2022 • No. KMS Rekam Medis: <span className="font-mono font-bold text-slate-700">KM-202207-48</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-bold">Status Stunting: </span>
                <span className="text-emerald-700 font-extrabold">Bebas Stunting (Normal)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-warmAmber-500"></span>
                <span className="font-bold">Gizi WHO: </span>
                <span className="text-warmAmber-800 font-extrabold">Gizi Baik (+0.2 SD)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Metric Highlights & Quick Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            
            {/* Fisik Terkini */}
            <div className="bg-softTeal-50/80 p-3.5 rounded-2xl border border-softTeal-200/70 min-w-[140px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-softTeal-800 uppercase tracking-wider">Fisik (TB / BB)</span>
                <Ruler className="w-3.5 h-3.5 text-softTeal-600" />
              </div>
              <p className="text-base font-black text-slateDark">
                {latestPhysical ? `${latestPhysical.height} cm` : '103.5 cm'}
              </p>
              <p className="text-[11px] font-bold text-slate-500">
                {latestPhysical ? `${latestPhysical.weight} kg` : '16.2 kg'} <span className="text-emerald-600 font-extrabold text-[10px]">(Ideal)</span>
              </p>
            </div>

            {/* Emosi Terkini */}
            <div className="bg-warmCream-200/90 p-3.5 rounded-2xl border border-warmAmber-200/70 min-w-[140px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-warmAmber-800 uppercase tracking-wider">Status Emosi</span>
                <span className="text-sm">{latestMental?.moodEmoji || '😊'}</span>
              </div>
              <p className="text-xs font-black text-slateDark truncate">
                {latestMental?.mood || 'Ceria & Empatis'}
              </p>
              <p className="text-[10px] text-emerald-700 font-bold">
                Level Stres Rendah ✓
              </p>
            </div>

          </div>

          {/* Quick Export CTA Button */}
          <button
            type="button"
            onClick={() => alert(`Laporan Perkembangan Medis ${childInfo.name} (PDF) siap diunduh dan dicetak untuk Posyandu/Dokter.`)}
            className="p-3.5 rounded-2xl bg-warmCream-200 hover:bg-warmAmber-100 border border-warmAmber-200 text-slate-800 text-xs font-bold transition-all flex flex-col items-center justify-center text-center space-y-1 group shadow-xs"
          >
            <FileText className="w-5 h-5 text-warmAmber-600 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-black leading-tight">Cetak PDF Buku KIA</span>
          </button>

        </div>

      </div>
    </div>
  );
}
