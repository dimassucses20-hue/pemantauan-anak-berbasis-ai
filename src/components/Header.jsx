import React from 'react';
import { Sparkles } from 'lucide-react';
import { isGeminiConfigured } from '../services/geminiService';

export default function Header() {
  const isLive = isGeminiConfigured();

  return (
    <header className="pt-4 pb-3 px-4 border-b border-warmAmber-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo & Exclusive Custom SVG Icon */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-warmCream-200 border border-warmAmber-200/80 flex items-center justify-center shadow-xs p-1.5 transition-transform hover:scale-105">
            {/* 
              Exclusive KembangKita SVG:
              Minimalist modern line-art combining an upward growth chart curve
              forming two blooming leaves that enclose a subtle heart silhouette in the center.
              Stroke: Warm Amber (#e0a84e), Fill: Soft Teal (#14b8a6)
            */}
            <svg 
              viewBox="0 0 48 48" 
              className="w-full h-full"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Teal background heart & leaf accent glow */}
              <path
                d="M24 16 C20 10, 10 14, 12 24 C14 32, 24 38, 24 38 C24 38, 34 32, 36 24 C38 14, 28 10, 24 16 Z"
                fill="#14b8a6"
                fillOpacity="0.22"
              />

              {/* Left Leaf / Sprout Curve */}
              <path
                d="M24 38 C20 30, 11 26, 12 18 C13 11, 21 12, 24 18"
                stroke="#e0a84e"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Right Leaf & Upward Growth Trajectory */}
              <path
                d="M24 38 C28 30, 37 26, 36 18 C35 11, 27 12, 24 18"
                stroke="#e0a84e"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Center Heart Line & Growth Sprout Stem */}
              <path
                d="M24 38 L24 22 M24 22 C21.5 19, 18 19, 18 22 C18 26, 24 29, 24 29 C24 29, 30 26, 30 22 C30 19, 26.5 19, 24 22 Z"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#14b8a6"
                fillOpacity="0.4"
              />

              {/* Upward Growth Trend Arrow Accent on the Leaf Tip */}
              <path
                d="M34 14 L38 10 M38 10 L33 10 M38 10 L38 15"
                stroke="#e0a84e"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Little Bloom Sparkle */}
              <circle cx="24" cy="8" r="1.8" fill="#e0a84e" />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-lg font-black tracking-tight text-slateDark">
                Kembang<span className="text-softTeal-600">Kita</span>
              </h1>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 leading-tight">
              AI Child Growth & Emotional Tracker
            </p>
          </div>
        </div>

        {/* Gemini API Status Badge */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-warmCream-200/90 border border-warmAmber-200 text-[10px] font-bold text-slate-700 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isLive ? 'bg-softTeal-400' : 'bg-warmAmber-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isLive ? 'bg-softTeal-500' : 'bg-warmAmber-500'
            }`}></span>
          </span>
          <Sparkles className="w-3 h-3 text-warmAmber-600" />
          <span>{isLive ? 'Gemini AI Active' : 'Gemini Ready (Demo)'}</span>
        </div>

      </div>
    </header>
  );
}
