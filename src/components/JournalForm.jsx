import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Heart, 
  Send, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  MessageCircle,
  ShieldCheck,
  RefreshCw,
  Smile,
  Frown,
  Meh,
  Tag
} from 'lucide-react';
import { analyzeJournalStory } from '../services/geminiService';

export default function JournalForm({ childInfo, onAddAnalysisResult }) {
  const [story, setStory] = useState('');
  const [selectedMoodTag, setSelectedMoodTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const moodChips = [
    { label: 'Ceria & Berbagi', emoji: '😊' },
    { label: 'Tantrum / Menangis', emoji: '😤' },
    { label: 'Takut & Cemas', emoji: '🥺' },
    { label: 'Susah Makan (GTM)', emoji: '🤐' },
    { label: 'Aktif Eksploratif', emoji: '🌟' }
  ];

  const samplePrompts = [
    {
      title: "Tantrum saat Berhenti Main",
      text: "Gibran menangis kencang dan melempar balok saat diminta merapikan mainan sebelum waktu mandi sore."
    },
    {
      title: "Kecemasan Menjelang Tidur",
      text: "Malam ini Gibran gelisah, minta ditemani terus dan bercerita takut ada monster di balik pintu lemari."
    },
    {
      title: "Inisiatif Sosial & Berbagi",
      text: "Hari ini sangat ceria! Gibran mau meminjamkan mainan mobilannya kepada sepupunya tanpa menangis atau berebut."
    }
  ];

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!story.trim()) {
      alert('Mohon tuliskan cerita atau observasi perilaku si kecil terlebih dahulu.');
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const fullText = selectedMoodTag ? `[Konteks Mood: ${selectedMoodTag}] ${story}` : story;
      const result = await analyzeJournalStory(fullText, childInfo);
      setAnalysisResult(result);
      
      // Add to overall history
      onAddAnalysisResult({
        id: `journal-${Date.now()}`,
        type: 'mental',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: `Observasi Emosi: ${result.mood}`,
        summary: story,
        details: result,
        timestamp: Date.now()
      });
    } catch (err) {
      console.error(err);
      alert('Gagal memproses analisis. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="jurnal-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warmAmber-200/70 shadow-soft-card space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warmAmber-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-warmAmber-100 text-warmAmber-700 flex items-center justify-center font-bold shadow-xs">
              <MessageSquare className="w-6 h-6 text-warmAmber-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slateDark">
                Jurnal Observasi Emosi & Perilaku Anak
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Ceritakan dinamika harian, tantrum, rasa takut, atau kebiasaan {childInfo.name} untuk dianalisis psikologi anak
              </p>
            </div>
          </div>

          <span className="text-xs font-bold bg-warmAmber-100 text-warmAmber-900 px-3 py-1 rounded-full border border-warmAmber-200 self-start sm:self-auto">
            AI Child Psychology Engine
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          
          {/* Mood Selector Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-warmAmber-600" />
              <span>Pilih Suasana Hati / Mood Si Kecil:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {moodChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMoodTag(chip.label === selectedMoodTag ? '' : chip.label)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    selectedMoodTag === chip.label
                      ? 'bg-warmAmber-500 text-white shadow-xs scale-105'
                      : 'bg-warmCream-200 text-slate-700 hover:bg-warmAmber-100 border border-warmAmber-200/60'
                  }`}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div className="relative">
            <textarea
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder={`Ceritakan apa yang dialami ${childInfo.nickname || 'si kecil'} hari ini... (Contoh: Tadi sore saat pulang sekolah sempat menangis lama karena mainan rodanya lepas, lalu ditenangkan...)`}
              className="w-full p-4 rounded-3xl bg-warmCream-100/90 border border-warmAmber-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-warmAmber-400 focus:bg-white transition-all resize-none leading-relaxed shadow-xs"
            />
          </div>

          {/* Quick Prompt Samples */}
          <div className="bg-warmCream-100 p-4 rounded-2xl border border-warmAmber-200/50 space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-warmAmber-600" />
              <span>Contoh Skenario Cerita (Klik untuk Mencoba):</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setStory(item.text);
                    setSelectedMoodTag(item.title);
                  }}
                  className="text-left p-2.5 rounded-xl bg-white hover:bg-warmAmber-50 text-slate-700 border border-slate-200 transition-colors shadow-xs"
                >
                  <p className="text-xs font-bold text-slateDark line-clamp-1">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">{item.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading || !story.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-warmAmber-500 via-warmAmber-600 to-softTeal-600 hover:from-warmAmber-600 hover:to-softTeal-700 disabled:opacity-50 text-white text-sm font-black transition-all shadow-glow-amber flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gemini Sedang Menganalisis Pola Emosi & Respon Psikologis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Analisis Emosi & Dapatkan Rekomendasi Dialog Empati</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Analysis Result Display Card */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-warmAmber-300 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
          
          {/* Header of Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warmAmber-100 pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl p-2 rounded-2xl bg-warmAmber-100">{analysisResult.moodEmoji}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Status Emosi Terdeteksi</span>
                <h3 className="text-lg font-black text-slateDark">{analysisResult.mood}</h3>
              </div>
            </div>

            {/* Stress Badge */}
            <div>
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black ${
                analysisResult.stressColor === 'emerald'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : analysisResult.stressColor === 'rose'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                <span>●</span>
                <span>Level Stres: {analysisResult.stressLevel}</span>
              </span>
            </div>
          </div>

          {/* Psychology Insight */}
          <div className="bg-warmCream-200/90 p-5 rounded-2xl border border-warmAmber-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="font-extrabold text-slateDark mb-1.5 flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Insight Psikologi & Perkembangan Otak Anak:</span>
            </p>
            <p className="text-slate-600 font-medium">{analysisResult.psychologyInsight}</p>
          </div>

          {/* Action Plan & Dialog Script (Wide 2-Column Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div className="p-4 sm:p-5 bg-softTeal-50/90 rounded-2xl border border-softTeal-200/80 space-y-2">
              <p className="font-extrabold text-softTeal-900 flex items-center space-x-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-softTeal-600" />
                <span>Rekomendasi Tindakan / Bonding Ortu:</span>
              </p>
              <p className="text-softTeal-900/90 leading-relaxed font-medium">
                {analysisResult.actionPlan}
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-warmAmber-50/90 rounded-2xl border border-warmAmber-200/80 space-y-2">
              <p className="font-extrabold text-warmAmber-900 flex items-center space-x-2 text-sm">
                <MessageCircle className="w-4 h-4 text-warmAmber-600" />
                <span>Panduan Dialog Empati yang Menenangkan:</span>
              </p>
              <p className="italic text-slate-800 font-semibold leading-relaxed bg-white/90 p-3 rounded-xl border border-warmAmber-200/60">
                {analysisResult.parentDialogScript}
              </p>
            </div>

          </div>

          {/* Result Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>{analysisResult.isLiveApi ? '✓ Dianalisis Realtime Gemini AI' : '✓ AI Simulated Engine Terverifikasi'}</span>
            <span className="text-softTeal-700 font-bold">Tersimpan Otomatis ke Riwayat & Log ✓</span>
          </div>

        </div>
      )}

    </div>
  );
}
