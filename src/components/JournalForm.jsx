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
  RefreshCw
} from 'lucide-react';
import { analyzeJournalStory } from '../services/geminiService';

export default function JournalForm({ childInfo, onAddAnalysisResult }) {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const samplePrompts = [
    "Gibran menangis kencang dan melempar mainan saat diminta merapikan balok kayu sebelum mandi.",
    "Malam ini Gibran gelisah, minta ditemani terus dan bercerita takut ada monster di balik pintu lemari.",
    "Hari ini sangat ceria! Gibran mau berbagi bekal roti dengan temannya di PAUD dan bercerita seru ke Bunda."
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
      const result = await analyzeJournalStory(story, childInfo);
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
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Form Container */}
      <div className="bg-white rounded-3xl p-5 border border-warmAmber-200/70 shadow-soft-card">
        <div className="flex items-center space-x-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-warmAmber-100 text-warmAmber-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slateDark">
              Jurnal Observasi Emosi & Perilaku
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Ceritakan momen tantrum, kegembiraan, atau kecemasan {childInfo.name}
            </p>
          </div>
        </div>

        {/* Textarea Input */}
        <form onSubmit={handleAnalyze} className="space-y-3">
          <div className="relative">
            <textarea
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Contoh: Sore tadi saat pulang sekolah, Gibran tiba-tiba menangis saat diminta ganti baju dan menolak bicara..."
              className="w-full p-3.5 rounded-2xl bg-warmCream-100 border border-warmAmber-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-warmAmber-400 focus:bg-white transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Quick Prompt Chips */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Lightbulb className="w-3 h-3 text-warmAmber-500" />
              <span>Contoh Cerita Cepat (Klik untuk Coba):</span>
            </p>
            <div className="flex flex-col gap-1.5">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setStory(prompt)}
                  className="text-left text-[11px] p-2 rounded-xl bg-warmCream-200/80 hover:bg-warmAmber-100 text-slate-700 border border-warmAmber-200/50 transition-colors line-clamp-1"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading || !story.trim()}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 hover:from-warmAmber-600 hover:to-warmAmber-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-amber flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gemini Sedang Menganalisis Emosi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-warmAmber-200" />
                <span>Analisis Cerita dengan AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-5 border-2 border-warmAmber-300 shadow-soft-card space-y-4 animate-in zoom-in-95 duration-200">
          
          {/* Header of Result */}
          <div className="flex items-center justify-between border-b border-warmAmber-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{analysisResult.moodEmoji}</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Status Emosi Utama</span>
                <h4 className="text-sm font-black text-slateDark">{analysisResult.mood}</h4>
              </div>
            </div>

            {/* Stress Badge */}
            <div className="text-right">
              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                analysisResult.stressColor === 'emerald'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : analysisResult.stressColor === 'rose'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                <span>●</span>
                <span>Level Stres: {analysisResult.stressLevel}</span>
              </span>
            </div>
          </div>

          {/* Psychology Insight */}
          <div className="bg-warmCream-200/80 p-3.5 rounded-2xl border border-warmAmber-200/60 text-xs text-slate-700 leading-relaxed">
            <p className="font-bold text-slateDark mb-1 flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Insight Psikologi Anak:</span>
            </p>
            <p className="text-slate-600">{analysisResult.psychologyInsight}</p>
          </div>

          {/* Action Plan & Script */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-softTeal-50/80 rounded-2xl border border-softTeal-200/70">
              <p className="font-bold text-softTeal-900 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-softTeal-600" />
                <span>Rekomendasi Tindakan / Bonding:</span>
              </p>
              <p className="text-softTeal-800 leading-relaxed">{analysisResult.actionPlan}</p>
            </div>

            <div className="p-3 bg-warmAmber-50/80 rounded-2xl border border-warmAmber-200/70">
              <p className="font-bold text-warmAmber-900 mb-1 flex items-center space-x-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-warmAmber-600" />
                <span>Contoh Dialog Empati Ortu-Anak:</span>
              </p>
              <p className="italic text-slate-700 font-medium leading-relaxed bg-white/90 p-2.5 rounded-xl border border-warmAmber-200/50">
                {analysisResult.parentDialogScript}
              </p>
            </div>
          </div>

          {/* Result Footer */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span>{analysisResult.isLiveApi ? '✓ Dianalisis Realtime Gemini AI' : '✓ AI Simulated Engine'}</span>
            <span className="text-softTeal-700 font-semibold">Tersimpan Otomatis ke Riwayat ✓</span>
          </div>

        </div>
      )}

    </div>
  );
}
