import React from 'react';
import { Baby, Heart, Activity, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProfileCard({ childInfo, latestPhysical, latestMental }) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-warmAmber-200/70 shadow-soft-card relative overflow-hidden transition-all hover:shadow-md">
      {/* Background soft ambient decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-warmAmber-100/50 via-softTeal-50/30 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="flex items-start space-x-3.5 relative z-10">
        
        {/* Child Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-warmAmber-200 to-warmAmber-100 border-2 border-warmAmber-300 flex items-center justify-center text-2xl shadow-xs">
            👦
          </div>
          <span className="absolute -bottom-1 -right-1 bg-softTeal-500 text-white p-0.5 rounded-full border-2 border-white shadow-xs" title="Terkoneksi Aktif">
            <CheckCircle className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Child Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slateDark flex items-center space-x-1.5 truncate">
                <span>{childInfo.name}</span>
                <span className="text-[11px] font-bold text-warmAmber-800 bg-warmAmber-100 px-2 py-0.5 rounded-full border border-warmAmber-200">
                  {childInfo.age}
                </span>
              </h2>
              <p className="text-[11px] font-medium text-slate-500">
                {childInfo.gender} • Lahir 15 Juli 2022
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-bold text-softTeal-800 bg-softTeal-100/80 px-2 py-0.5 rounded-full border border-softTeal-200 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-softTeal-600" />
                <span>WHO Tracked</span>
              </span>
            </div>
          </div>

          {/* Daily Status Highlights Pills */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-warmAmber-100/60 text-[11px]">
            
            {/* Emosi Terkini */}
            <div className="bg-warmCream-200/80 p-2 rounded-xl border border-warmAmber-200/50 flex items-center space-x-2">
              <span className="text-base shrink-0">{latestMental?.moodEmoji || '🌟'}</span>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Emosi Terkini</span>
                <p className="font-bold text-slate-800 truncate">
                  {latestMental?.mood || 'Tenang & Bahagia'}
                </p>
              </div>
            </div>

            {/* Fisik Terkini */}
            <div className="bg-softTeal-50/70 p-2 rounded-xl border border-softTeal-200/50 flex items-center space-x-2">
              <span className="text-base shrink-0">📏</span>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-softTeal-700 uppercase tracking-wider block">Fisik (TB/BB)</span>
                <p className="font-bold text-slate-800 truncate">
                  {latestPhysical ? `${latestPhysical.height}cm / ${latestPhysical.weight}kg` : '103cm / 16.2kg'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
