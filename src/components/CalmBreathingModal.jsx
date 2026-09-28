import React, { useState, useEffect } from 'react';
import { X, Wind, Heart, Sparkles, Volume2, VolumeX, CheckCircle } from 'lucide-react';

export default function CalmBreathingModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('Inhale'); // Inhale (4s), Hold (7s), Exhale (8s)
  const [timer, setTimer] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (phase === 'Inhale') {
          setPhase('Hold');
          return 7;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return 8;
        } else {
          setPhase('Inhale');
          setCycle((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/10 text-center relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
          <Wind className="w-3.5 h-3.5 animate-spin" />
          <span>Latihan Napas Relaksasi 4-7-8</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Jeda & Tenangkan Pikiran
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8">
          Untuk Mama & Papa saat merasa lelah, cemas, atau menghadapi badai emosi balita.
        </p>

        {/* Breathing Circle Visualization */}
        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
          {/* Animated pulsing orb */}
          <div 
            className={`absolute rounded-full transition-all duration-1000 ${
              phase === 'Inhale' 
                ? 'w-44 h-44 bg-gradient-to-tr from-brand-500/40 to-sky-400/40 scale-110 shadow-glow' 
                : phase === 'Hold' 
                  ? 'w-44 h-44 bg-gradient-to-tr from-indigo-500/40 to-brand-400/40 scale-100' 
                  : 'w-28 h-28 bg-gradient-to-tr from-rose-500/30 to-amber-400/30 scale-90'
            }`}
          ></div>

          <div className="relative z-10 text-center">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block">
              {timer}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-300">
              {phase === 'Inhale' ? 'Tarik Napas (4s)' : phase === 'Hold' ? 'Tahan Napas (7s)' : 'Hembuskan Perlahan (8s)'}
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 text-left">
          <p className="text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Afirmasi Positif Putaran ke-{cycle}:</span>
          </p>
          <p className="text-xs italic text-slate-400">
            "Saya adalah orang tua yang cukup baik. Saya berhak beristirahat sejenak agar hadir lebih penuh kasih untuk anak saya."
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold tracking-wide transition-all shadow-glow"
        >
          Selesai & Lanjutkan Pengasuhan
        </button>

      </div>
    </div>
  );
}
