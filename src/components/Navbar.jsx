import React from 'react';
import { 
  Sparkles, 
  Baby, 
  LineChart, 
  MessageSquareHeart, 
  Stethoscope, 
  Crown, 
  Building2, 
  ShoppingBag, 
  PhoneCall,
  ChevronDown
} from 'lucide-react';
import { isGeminiConfigured } from '../services/geminiService';

export default function Navbar({ activeSection, onNavigate, childInfo }) {
  const isLive = isGeminiConfigured();

  const navLinks = [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'jurnal', label: 'Jurnal Emosi' },
    { id: 'evaluasi', label: 'Milestone & Diagram' },
    { id: 'pakar', label: 'Konsultasi Pakar' },
    { id: 'klinik', label: 'Booking Klinik' },
    { id: 'bisnis', label: 'Paket & Toko Nutrisi' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & Gemini Badge */}
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => onNavigate('ringkasan')}
              className="flex items-center space-x-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-warmCream-200 border border-warmAmber-300/80 flex items-center justify-center shadow-xs p-2 transition-transform group-hover:scale-105">
                <svg 
                  viewBox="0 0 48 48" 
                  className="w-full h-full"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 16 C20 10, 10 14, 12 24 C14 32, 24 38, 24 38 C24 38, 34 32, 36 24 C38 14, 28 10, 24 16 Z"
                    fill="#14b8a6"
                    fillOpacity="0.25"
                  />
                  <path
                    d="M24 38 C20 30, 11 26, 12 18 C13 11, 21 12, 24 18"
                    stroke="#e0a84e"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 38 C28 30, 37 26, 36 18 C35 11, 27 12, 24 18"
                    stroke="#e0a84e"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 38 L24 22 M24 22 C21.5 19, 18 19, 18 22 C18 26, 24 29, 24 29 C24 29, 30 26, 30 22 C30 19, 26.5 19, 24 22 Z"
                    stroke="#14b8a6"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="#14b8a6"
                    fillOpacity="0.4"
                  />
                  <circle cx="24" cy="8" r="2" fill="#e0a84e" />
                </svg>
              </div>

              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 block leading-tight">
                  Kembang<span className="text-softTeal-600">Kita</span>
                </span>
                <p className="text-[10px] font-semibold text-slate-500 leading-tight hidden sm:block">
                  AI Child Growth & Emotional Tracker
                </p>
              </div>
            </div>

            {/* Gemini Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ccfbf1]/70 text-[#0f766e] border border-[#99f6e4] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Gemini AI Aktif</span>
            </div>
          </div>

          {/* Center: Clean Capsule Navigation Pill Container */}
          <nav className="hidden lg:flex items-center bg-[#f1f5f9]/80 p-1.5 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#E29E3A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Child Profile Capsule with Avatar & Dropdown */}
          <div className="flex items-center space-x-3">
            
            <div 
              onClick={() => onNavigate('ringkasan')}
              className="flex items-center space-x-2.5 bg-white hover:bg-slate-50 cursor-pointer pl-3 pr-2 py-1.5 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              <div className="text-right">
                <p className="text-xs font-black text-slate-900 leading-tight">{childInfo?.nickname || 'Gibran'}</p>
                <p className="text-[10px] text-slate-500 font-bold">{childInfo?.age?.split(' ')[0] || '4'} Thn</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-base border border-amber-300">
                👦
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Emergency Hotline Button */}
            <a
              href="tel:119"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
              title="Hotline SEJIWA Kemenkes 119"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Hotline 119</span>
            </a>

          </div>

        </div>

        {/* Mobile Horizontal Sub-Navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1.5 custom-scrollbar border-t border-slate-100">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#E29E3A] text-white shadow-xs'
                    : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
