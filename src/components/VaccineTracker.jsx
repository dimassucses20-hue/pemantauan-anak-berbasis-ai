import React, { useState } from 'react';
import { 
  Syringe, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Calendar, 
  Check, 
  Info,
  Sparkles
} from 'lucide-react';
import { vaccineSchedule } from '../data/mockData';
import { calculateAgeInMonths } from '../utils/growthCalculators';

export default function VaccineTracker({ activeChild, onToggleVaccine }) {
  const [filterCategory, setFilterCategory] = useState('all');

  if (!activeChild) return null;

  const age = calculateAgeInMonths(activeChild.birthDate);
  const completedVaccinesSet = new Set(activeChild.completedVaccines || []);

  const totalVaccines = vaccineSchedule.length;
  const completedCount = completedVaccinesSet.size;
  const completionRate = Math.round((completedCount / totalVaccines) * 100);

  const filteredVaccines = vaccineSchedule.filter(v => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'completed') return completedVaccinesSet.has(v.id);
    if (filterCategory === 'pending') return !completedVaccinesSet.has(v.id);
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-brand-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sky-100 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Jadwal Imunisasi Nasional Kemenkes RI & IDAI</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Buku Imunisasi Digital {activeChild.nickname}
          </h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl leading-relaxed">
            Vaksinasi tepat waktu memberikan kekebalan optimal dari penyakit berbahaya seperti Polio, Campak, Hepatitis, dan Pneumonia.
          </p>
        </div>

        {/* Completion Gauge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center space-x-4 self-start sm:self-auto">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center font-black text-lg text-white">
            {completionRate}%
          </div>
          <div>
            <p className="text-[11px] font-bold text-sky-200 uppercase">Status Kelengkapan</p>
            <p className="text-sm font-extrabold text-white">{completedCount} dari {totalVaccines} Vaksin</p>
            <p className="text-[10px] text-sky-200">Usia balita: {age.formatted}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'all' ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Jadwal ({totalVaccines})
          </button>
          <button
            onClick={() => setFilterCategory('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sudah Diberikan ({completedCount})
          </button>
          <button
            onClick={() => setFilterCategory('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Belum / Mendatang ({totalVaccines - completedCount})
          </button>
        </div>
      </div>

      {/* Vaccine Timeline / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVaccines.map((v) => {
          const isDone = completedVaccinesSet.has(v.id);
          return (
            <div
              key={v.id}
              onClick={() => onToggleVaccine(activeChild.id, v.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Jadwal: {v.targetAge}
                    </span>
                    <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      {v.category}
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isDone ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <h3 className={`text-sm font-bold mb-1 ${isDone ? 'text-emerald-950 line-through' : 'text-slate-800'}`}>
                  {v.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {v.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className={isDone ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                  {isDone ? '✓ Sudah Tercatat Diberikan' : '⏳ Menunggu / Jadwalkan di Posyandu/Puskesmas'}
                </span>
                <span className="text-slate-400 text-[10px]">Klik untuk ubah</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
