import React, { useState } from 'react';
import { 
  Baby, 
  Heart, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Activity, 
  Smile, 
  Meh, 
  Frown, 
  BrainCircuit,
  Award,
  Clock
} from 'lucide-react';
import { calculateAgeInMonths, calculateWeightForAgeZScore, calculateHeightForAgeZScore } from '../utils/growthCalculators';
import { milestoneDatabase, vaccineSchedule } from '../data/mockData';

export default function Dashboard({ 
  activeChild, 
  setActiveTab, 
  onOpenCalmMode,
  moodLog,
  setMoodLog
}) {
  if (!activeChild) return null;

  const age = calculateAgeInMonths(activeChild.birthDate);
  const latestGrowth = activeChild.growthHistory[activeChild.growthHistory.length - 1] || {
    weight: activeChild.birthWeight,
    height: activeChild.birthHeight,
    headCirc: 34.0,
    date: activeChild.birthDate
  };

  const weightZ = calculateWeightForAgeZScore(activeChild.gender, age.totalMonths, latestGrowth.weight);
  const heightZ = calculateHeightForAgeZScore(activeChild.gender, age.totalMonths, latestGrowth.height);

  // Relevant milestones for this age
  const relevantMilestones = milestoneDatabase.filter(m => m.maxAge <= Math.max(12, age.totalMonths + 3));
  const completedCount = activeChild.completedMilestones.length;
  const milestoneProgress = Math.min(100, Math.round((completedCount / (relevantMilestones.length || 1)) * 100));

  // Next upcoming vaccine
  const completedVaccineIds = new Set(activeChild.completedVaccines || []);
  const upcomingVaccine = vaccineSchedule.find(v => !completedVaccineIds.has(v.id));

  const handleMoodSelect = (mood) => {
    const newEntry = { date: new Date().toLocaleDateString('id-ID'), mood, timestamp: Date.now() };
    setMoodLog([newEntry, ...moodLog.slice(0, 6)]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-sky-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-8 translate-y-8">
          <Baby className="w-72 h-72 text-white" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-brand-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Harmoni Tumbuh Kembang 1000 HPK</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Halo Bunda & Ayah! 👋
          </h1>
          <p className="text-sm text-brand-100 leading-relaxed mb-6">
            Hari ini <strong className="text-white underline decoration-brand-300">{activeChild.name}</strong> berusia <strong className="text-white">{age.formatted}</strong>. Pantau terus kurva KMS dan berikan stimulasi penuh kasih sayang.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('growth')}
              className="px-4 py-2.5 rounded-xl bg-white text-brand-800 text-xs font-bold hover:bg-brand-50 transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Update Pengukuran Baru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('ai-coach')}
              className="px-4 py-2.5 rounded-xl bg-brand-800/60 hover:bg-brand-800/80 text-white text-xs font-bold border border-white/20 transition-all backdrop-blur-sm flex items-center space-x-1.5"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
              <span>Tanya AI Parenting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Status Berat & Z-Score */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
              <Activity className="w-5 h-5" />
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              weightZ.statusBadge === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Z-Score: {weightZ.zScore > 0 ? `+${weightZ.zScore}` : weightZ.zScore} SD
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-0.5">Berat Badan Terakhir</p>
          <div className="flex items-baseline space-x-1 mb-2">
            <span className="text-2xl font-black text-slate-800">{latestGrowth.weight}</span>
            <span className="text-xs font-bold text-slate-500">kg</span>
          </div>
          <p className="text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{weightZ.status}</span>
          </p>
        </div>

        {/* Status Tinggi & Risiko Stunting */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              !heightZ.isStunted ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {heightZ.isStunted ? 'Waspada Stunting' : 'Bebas Stunting'}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-0.5">Panjang / Tinggi Badan</p>
          <div className="flex items-baseline space-x-1 mb-2">
            <span className="text-2xl font-black text-slate-800">{latestGrowth.height}</span>
            <span className="text-xs font-bold text-slate-500">cm</span>
          </div>
          <p className="text-[11px] font-semibold text-sky-700 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{heightZ.status}</span>
          </p>
        </div>

        {/* Milestone Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              {completedCount} Milestone
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-0.5">Pencapaian Perkembangan</p>
          <div className="flex items-baseline space-x-1 mb-2">
            <span className="text-2xl font-black text-slate-800">{milestoneProgress}%</span>
            <span className="text-xs font-bold text-slate-400">target usia</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${milestoneProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Jadwal Vaksin Berikutnya */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              Imunisasi
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-0.5">Vaksin Berikutnya</p>
          <p className="text-sm font-bold text-slate-800 truncate mb-1">
            {upcomingVaccine ? upcomingVaccine.name : "Vaksin Lengkap! 🎉"}
          </p>
          <p className="text-[11px] text-slate-500">
            {upcomingVaccine ? `Jadwal: ${upcomingVaccine.targetAge}` : 'Semua imunisasi dasar terpenuhi'}
          </p>
        </div>

      </div>

      {/* Dual Section: Daily Mood Check & Quick Mental Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mood Tracker for Parent */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-2 bg-rosebud-100 text-rosebud-500 rounded-2xl">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Bagaimana Perasaan Bunda/Ayah Hari Ini?</h3>
              <p className="text-xs text-slate-400">Kesehatan mental Anda sama pentingnya dengan anak</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <button
              onClick={() => handleMoodSelect('Senang & Berenergi 😊')}
              className="p-3 rounded-2xl border border-slate-100 hover:border-brand-300 hover:bg-brand-50/50 transition-all text-center flex flex-col items-center group"
            >
              <Smile className="w-7 h-7 text-emerald-500 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700">Gembira</span>
              <span className="text-[10px] text-slate-400">Penuh energi</span>
            </button>

            <button
              onClick={() => handleMoodSelect('Cukup Baik / Lelah Sedang 😐')}
              className="p-3 rounded-2xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-center flex flex-col items-center group"
            >
              <Meh className="w-7 h-7 text-amber-500 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700">Lelah</span>
              <span className="text-[10px] text-slate-400">Butuh jeda</span>
            </button>

            <button
              onClick={() => handleMoodSelect('Sangat Stres & Butuh Bantuan 😔')}
              className="p-3 rounded-2xl border border-slate-100 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-center flex flex-col items-center group"
            >
              <Frown className="w-7 h-7 text-rose-500 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700">Kewalahan</span>
              <span className="text-[10px] text-slate-400">Butuh curhat</span>
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-bold text-slate-700 mb-1">Riwayat Check-In Terakhir:</p>
            {moodLog.length > 0 ? (
              <div className="space-y-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                {moodLog.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-600 bg-white px-2.5 py-1.5 rounded-xl border border-slate-100">
                    <span>{item.mood}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Belum ada check-in hari ini. Klik emotikon di atas untuk mencatat!</p>
            )}
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setActiveTab('mental')}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors text-center"
            >
              Skrining EPDS (Depresi Pascamelahirkan)
            </button>
          </div>
        </div>

        {/* Daily Expert Parenting Insight & Action */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-2xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Tips Stimulasi Hari Ini (Usia {age.formatted})</h3>
                  <p className="text-xs text-slate-400">Berdasarkan panduan Kementerian Kesehatan RI & IDAI</p>
                </div>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200">
                1000 HPK
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/40 rounded-2xl p-4 border border-amber-100/80 mb-4">
              <h4 className="text-xs font-bold text-slate-800 mb-1">
                🗣️ Stimulasi Bahasa: Berbicara Dua Arah (Serve & Return)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Saat balita mengoceh atau menunjuk suatu benda, tatap matanya dan beri label kata yang jelas. Hindari gaya bicara cadel (*baby talk*), sebutkan benda dengan kosakata tepat (misal: "Iya sayang, itu kucing belang tiga sedang makan ikan").
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-start space-x-3">
                <div className="p-2 bg-brand-500 text-white rounded-xl text-xs font-bold">🍗</div>
                <div>
                  <h5 className="text-xs font-bold text-brand-900">Asupan Protein Hewani</h5>
                  <p className="text-[11px] text-brand-700 leading-tight mt-0.5">
                    1 butir telur + hati ayam/ikan setiap hari menurunkan risiko stunting hingga 47%.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start space-x-3">
                <div className="p-2 bg-sky-500 text-white rounded-xl text-xs font-bold">😴</div>
                <div>
                  <h5 className="text-xs font-bold text-sky-900">Hormon Pertumbuhan (HGH)</h5>
                  <p className="text-[11px] text-sky-700 leading-tight mt-0.5">
                    Tidur lelap sebelum jam 21.00 memicu sekresi hormon pertumbuhan puncak bagi balita.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Butuh panduan mengatasi anak tantrum atau GTM?</span>
            <button
              onClick={() => setActiveTab('ai-coach')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
            >
              <span>Konsultasi dengan AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
