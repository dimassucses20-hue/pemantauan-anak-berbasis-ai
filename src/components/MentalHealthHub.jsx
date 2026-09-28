import React, { useState } from 'react';
import { 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit, 
  HelpCircle, 
  AlertTriangle, 
  BookOpen, 
  RefreshCw,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { epdsQuestions, burnoutQuestions, childBehaviorQuestions } from '../data/mockData';

export default function MentalHealthHub({ setActiveTab, onOpenCalmMode }) {
  const [activeTest, setActiveTest] = useState('epds'); // 'epds' | 'burnout' | 'child_behavior'
  
  // EPDS State
  const [epdsAnswers, setEpdsAnswers] = useState({});
  const [epdsResult, setEpdsResult] = useState(null);

  // Burnout State
  const [burnoutAnswers, setBurnoutAnswers] = useState({});
  const [burnoutResult, setBurnoutResult] = useState(null);

  // Child Behavior State
  const [behaviorAnswers, setBehaviorAnswers] = useState({});
  const [behaviorResult, setBehaviorResult] = useState(null);

  // Calculate EPDS
  const handleCalculateEpds = () => {
    let totalScore = 0;
    const answeredCount = Object.keys(epdsAnswers).length;

    if (answeredCount < epdsQuestions.length) {
      alert(`Mohon lengkapi semua ${epdsQuestions.length} pertanyaan (sudah dijawab: ${answeredCount})`);
      return;
    }

    Object.values(epdsAnswers).forEach(val => {
      totalScore += val;
    });

    let riskLevel = "Normal (Kondisi Emosional Stabil)";
    let color = "emerald";
    let advice = "Kondisi psikologis Anda saat ini dalam batas stabil. Tetap luangkan waktu untuk me-time dan saling mendukung bersama pasangan.";

    if (totalScore >= 13) {
      riskLevel = "Risiko Tinggi Gejala Depresi Pascamelahirkan (PPD)";
      color = "rose";
      advice = "Skor Anda mengindikasikan beban emosional yang berat. Sangat disarankan untuk berbicara dengan pasangan, keluarga terdekat, atau berkonsultasi dengan psikolog/dokter di Puskesmas atau Hotline SEJIWA 119 ext 8.";
    } else if (totalScore >= 10) {
      riskLevel = "Risiko Sedang / Gejala Baby Blues Berlanjut";
      color = "amber";
      advice = "Anda mungkin sedang mengalami stres pengasuhan yang cukup tinggi. Jangan ragu meminta bantuan orang lain untuk bergantian menjaga si kecil.";
    }

    setEpdsResult({ score: totalScore, maxScore: 30, riskLevel, color, advice });
  };

  // Calculate Burnout
  const handleCalculateBurnout = () => {
    let totalScore = 0;
    const answeredCount = Object.keys(burnoutAnswers).length;

    if (answeredCount < burnoutQuestions.length) {
      alert(`Mohon jawab semua pertanyaan burnout!`);
      return;
    }

    Object.values(burnoutAnswers).forEach(val => {
      totalScore += val;
    });

    let level = "Kelelahan Ringan / Normal";
    let color = "emerald";
    let advice = "Tingkat energi Anda masih cukup terjaga. Pertahankan keseimbangan istirahat.";

    if (totalScore >= 10) {
      level = "Parental Burnout Berat (Sangat Lelah Emosional & Fisik)";
      color = "rose";
      advice = "Baterai emosional Anda sedang habis. Prioritaskan delegasi tugas rumah tangga dan ambil cuti jeda sejenak dari rutinitas yang melelahkan.";
    } else if (totalScore >= 6) {
      level = "Parental Burnout Sedang";
      color = "amber";
      advice = "Mulai terasa kejenuhan dalam rutinitas harian. Luangkan waktu untuk hobi sederhana dan latihan pernapasan teratur.";
    }

    setBurnoutResult({ score: totalScore, maxScore: 15, level, color, advice });
  };

  // Calculate Child Behavior
  const handleCalculateBehavior = () => {
    let totalScore = 0;
    const answeredCount = Object.keys(behaviorAnswers).length;

    if (answeredCount < childBehaviorQuestions.length) {
      alert(`Mohon jawab semua pertanyaan skrining balita!`);
      return;
    }

    Object.values(behaviorAnswers).forEach(val => {
      totalScore += val;
    });

    let level = "Perkembangan Sosial-Emosional Normal";
    let color = "emerald";
    let advice = "Ekspresi emosi dan tantrum anak masih dalam batas wajar sesuai fase perkembangannya. Lanjutkan stimulasi empati dan regulasi emosi.";

    if (totalScore >= 5) {
      level = "Perlu Observasi Lebih Lanjut / Konsultasi Tumbuh Kembang";
      color = "amber";
      advice = "Anak menunjukkan tanda kesulitan regulasi emosi atau komunikasi yang perlu diperhatikan. Anda dapat mengonsultasikannya ke dokter anak/psikolog anak.";
    }

    setBehaviorResult({ score: totalScore, maxScore: 8, level, color, advice });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-rose-100 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-200" />
            <span>Keluarga Sehat, Anak Bahagia</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Pusat Skrining Kesehatan Mental & Parenting
          </h2>
          <p className="text-xs text-rose-100 mt-1 max-w-xl leading-relaxed">
            Menjadi orang tua adalah perjalanan luar biasa sekaligus melelahkan. Skrining ini aman, rahasia, dan dirancang untuk memberi Anda dukungan nyata tanpa penghakiman.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onOpenCalmMode}
            className="px-4 py-2.5 rounded-2xl bg-white text-rose-700 text-xs font-bold hover:bg-rose-50 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Latihan Napas Relaksasi</span>
          </button>
        </div>
      </div>

      {/* Test Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTest('epds')}
          className={`p-4 rounded-3xl border text-left transition-all ${
            activeTest === 'epds'
              ? 'bg-white border-rose-400 shadow-md ring-2 ring-rose-200'
              : 'bg-white/80 border-slate-100 hover:bg-white text-slate-600'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-1">Skrining Ibu</span>
          <h3 className="text-sm font-black text-slate-800">EPDS (Depresi Pascamelahirkan)</h3>
          <p className="text-[11px] text-slate-400 mt-1">10 Pertanyaan Standar Internasional</p>
        </button>

        <button
          onClick={() => setActiveTest('burnout')}
          className={`p-4 rounded-3xl border text-left transition-all ${
            activeTest === 'burnout'
              ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-200'
              : 'bg-white/80 border-slate-100 hover:bg-white text-slate-600'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">Skrining Orang Tua</span>
          <h3 className="text-sm font-black text-slate-800">Parental Burnout Index</h3>
          <p className="text-[11px] text-slate-400 mt-1">Deteksi Kelelahan Fisik & Emosional</p>
        </button>

        <button
          onClick={() => setActiveTest('child_behavior')}
          className={`p-4 rounded-3xl border text-left transition-all ${
            activeTest === 'child_behavior'
              ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-200'
              : 'bg-white/80 border-slate-100 hover:bg-white text-slate-600'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">Skrining Balita</span>
          <h3 className="text-sm font-black text-slate-800">Perilaku & Emosi Anak</h3>
          <p className="text-[11px] text-slate-400 mt-1">Deteksi Tantrum Ekstrem & Kecemasan</p>
        </button>
      </div>

      {/* 1. EPDS Section */}
      {activeTest === 'epds' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Kuesioner Edinburgh Postnatal Depression Scale (EPDS)
              </h3>
              <p className="text-xs text-slate-400">
                Pilihlah jawaban yang paling menggambarkan perasaan Bunda dalam <strong>7 hari terakhir</strong>.
              </p>
            </div>
            {epdsResult && (
              <button
                onClick={() => { setEpdsAnswers({}); setEpdsResult(null); }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Ulang</span>
              </button>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {epdsQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                  {q.id}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = epdsAnswers[q.id] === opt.score;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setEpdsAnswers({ ...epdsAnswers, [q.id]: opt.score })}
                        className={`p-3 rounded-xl text-left text-xs transition-all flex items-center space-x-2.5 ${
                          isSelected
                            ? 'bg-rose-500 text-white font-bold shadow-sm'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-white bg-white/20' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleCalculateEpds}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg transition-all"
            >
              Lihat Hasil & Analisis Klinis EPDS
            </button>
          </div>

          {/* Result Card */}
          {epdsResult && (
            <div className={`p-6 rounded-3xl border animate-in zoom-in-95 ${
              epdsResult.color === 'rose'
                ? 'bg-rose-50 border-rose-200'
                : epdsResult.color === 'amber'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hasil Skrining EPDS
                </span>
                <span className="text-lg font-black text-slate-800">
                  Skor: {epdsResult.score} / {epdsResult.maxScore}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {epdsResult.riskLevel}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {epdsResult.advice}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('ai-coach')}
                  className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-xs hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
                >
                  <BrainCircuit className="w-4 h-4 text-brand-600" />
                  <span>Curhat ke AI MindCare</span>
                </button>
                <button
                  onClick={() => setActiveTab('sos')}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700 transition-colors flex items-center space-x-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Hubungi Hotline SEJIWA 119 ext 8</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Burnout Section */}
      {activeTest === 'burnout' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Parental Burnout Assessment (PBA)
              </h3>
              <p className="text-xs text-slate-400">
                Evaluasi tingkat kelelahan fisik, kejenuhan, dan stres dalam peran pengasuhan.
              </p>
            </div>
            {burnoutResult && (
              <button
                onClick={() => { setBurnoutAnswers({}); setBurnoutResult(null); }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {burnoutQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                  {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = burnoutAnswers[q.id] === opt.score;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setBurnoutAnswers({ ...burnoutAnswers, [q.id]: opt.score })}
                        className={`p-3 rounded-xl text-left text-xs transition-all flex items-center space-x-2.5 ${
                          isSelected
                            ? 'bg-amber-500 text-white font-bold shadow-sm'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-white bg-white/20' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleCalculateBurnout}
              className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-lg transition-all"
            >
              Hitung Skor Parental Burnout
            </button>
          </div>

          {burnoutResult && (
            <div className={`p-6 rounded-3xl border animate-in zoom-in-95 ${
              burnoutResult.color === 'rose'
                ? 'bg-rose-50 border-rose-200'
                : burnoutResult.color === 'amber'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hasil Parental Burnout
                </span>
                <span className="text-lg font-black text-slate-800">
                  Skor: {burnoutResult.score} / {burnoutResult.maxScore}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {burnoutResult.level}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {burnoutResult.advice}
              </p>
              <button
                onClick={onOpenCalmMode}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-sm"
              >
                Mulai Latihan Relaksasi & Jeda Mandiri
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Child Behavior Section */}
      {activeTest === 'child_behavior' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Skrining Dini Temperamen & Perilaku Balita
              </h3>
              <p className="text-xs text-slate-400">
                Deteksi awal tantrum berulang, kecemasan perpisahan, atau kesulitan sensorik.
              </p>
            </div>
            {behaviorResult && (
              <button
                onClick={() => { setBehaviorAnswers({}); setBehaviorResult(null); }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {childBehaviorQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                  {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = behaviorAnswers[q.id] === opt.score;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setBehaviorAnswers({ ...behaviorAnswers, [q.id]: opt.score })}
                        className={`p-3 rounded-xl text-left text-xs transition-all flex items-center space-x-2.5 ${
                          isSelected
                            ? 'bg-sky-600 text-white font-bold shadow-sm'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-white bg-white/20' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleCalculateBehavior}
              className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-lg transition-all"
            >
              Analisis Perilaku Balita
            </button>
          </div>

          {behaviorResult && (
            <div className={`p-6 rounded-3xl border animate-in zoom-in-95 ${
              behaviorResult.color === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hasil Analisis Emosi & Perilaku
                </span>
                <span className="text-lg font-black text-slate-800">
                  Skor: {behaviorResult.score} / {behaviorResult.maxScore}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {behaviorResult.level}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {behaviorResult.advice}
              </p>
              <button
                onClick={() => setActiveTab('ai-coach')}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 shadow-sm flex items-center space-x-1.5"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Tanya Trik De-Eskalasi Tantrum ke AI Copilot</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
