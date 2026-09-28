import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  Sparkles, 
  Lightbulb, 
  Filter, 
  Check, 
  Baby, 
  HelpCircle,
  Trophy
} from 'lucide-react';
import { milestoneDatabase } from '../data/mockData';
import { calculateAgeInMonths } from '../utils/growthCalculators';

export default function MilestoneTracker({ activeChild, onToggleMilestone }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ageRangeFilter, setAgeRangeFilter] = useState('all');

  if (!activeChild) return null;

  const currentAge = calculateAgeInMonths(activeChild.birthDate);
  const completedSet = new Set(activeChild.completedMilestones || []);

  const categories = [
    { id: 'all', label: 'Semua Aspek' },
    { id: 'motorik_kasar', label: 'Motorik Kasar 🏃' },
    { id: 'motorik_halus', label: 'Motorik Halus ✍️' },
    { id: 'bahasa', label: 'Bahasa & Bicara 🗣️' },
    { id: 'sosial_emosional', label: 'Sosial & Emosi 🤗' },
  ];

  const filteredMilestones = milestoneDatabase.filter(m => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    let matchesAge = true;
    if (ageRangeFilter === 'current') {
      matchesAge = m.minAge <= currentAge.totalMonths + 3 && m.maxAge >= Math.max(0, currentAge.totalMonths - 3);
    } else if (ageRangeFilter === 'under12') {
      matchesAge = m.maxAge <= 12;
    } else if (ageRangeFilter === 'above12') {
      matchesAge = m.minAge >= 12;
    }
    return matchesCategory && matchesAge;
  });

  const totalFiltered = filteredMilestones.length;
  const totalCompletedInFiltered = filteredMilestones.filter(m => completedSet.has(m.id)).length;
  const progressPercent = totalFiltered > 0 ? Math.round((totalCompletedInFiltered / totalFiltered) * 100) : 0;

  const handleToggle = (milestoneId) => {
    const isNowComplete = !completedSet.has(milestoneId);
    
    // Trigger confetti on completion
    if (isNowComplete) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onToggleMilestone(activeChild.id, milestoneId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-brand-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Kuesioner Pra-Skrining Perkembangan (KPSP)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Pencapaian Milestone {activeChild.nickname}
          </h2>
          <p className="text-xs text-indigo-100 mt-1 max-w-xl">
            Tandai setiap kemampuan baru yang dikuasai si kecil. Setiap centang adalah langkah berharga dalam perkembangan otak & motoriknya!
          </p>
        </div>

        {/* Circular Progress Badge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center space-x-4 self-start sm:self-auto">
          <div className="w-16 h-16 rounded-full border-4 border-amber-300 flex items-center justify-center font-black text-lg text-white">
            {progressPercent}%
          </div>
          <div>
            <p className="text-[11px] font-bold text-indigo-200 uppercase">Progres Filter</p>
            <p className="text-sm font-extrabold text-white">{totalCompletedInFiltered} dari {totalFiltered} Selesai</p>
            <p className="text-[10px] text-indigo-200">Usia saat ini: {currentAge.formatted}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
        
        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          <span className="text-xs font-bold text-slate-400 flex items-center space-x-1 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Age Range Fast Filter */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Rentang Usia:</span>
          <button
            onClick={() => setAgeRangeFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              ageRangeFilter === 'all' ? 'bg-brand-100 text-brand-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Semua Usia (0-5 Thn)
          </button>
          <button
            onClick={() => setAgeRangeFilter('current')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              ageRangeFilter === 'current' ? 'bg-brand-100 text-brand-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sesuai Usia Saat Ini ({currentAge.totalMonths} Bulan) ⭐
          </button>
          <button
            onClick={() => setAgeRangeFilter('under12')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              ageRangeFilter === 'under12' ? 'bg-brand-100 text-brand-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            0 - 12 Bulan
          </button>
          <button
            onClick={() => setAgeRangeFilter('above12')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              ageRangeFilter === 'above12' ? 'bg-brand-100 text-brand-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            1 - 5 Tahun
          </button>
        </div>

      </div>

      {/* Milestone Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMilestones.map((m) => {
          const isDone = completedSet.has(m.id);
          return (
            <div
              key={m.id}
              onClick={() => handleToggle(m.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer select-none relative overflow-hidden flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-200 shadow-sm'
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Usia {m.minAge}–{m.maxAge} Bulan
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {m.categoryLabel}
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isDone ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <h3 className={`text-sm font-bold mb-1.5 transition-colors ${
                  isDone ? 'text-emerald-900 line-through' : 'text-slate-800'
                }`}>
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {m.description}
                </p>
              </div>

              {/* Stimulation Parenting Tip Box */}
              <div className="bg-white/80 rounded-2xl p-3 border border-slate-100/80 text-[11px] text-slate-600 flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Tips Stimulasi Orang Tua: </strong>
                  <span>{m.tips}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
