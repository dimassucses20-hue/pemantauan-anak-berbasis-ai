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
  User,
  ChevronDown
} from 'lucide-react';
import { isGeminiConfigured } from '../services/geminiService';

export default function Navbar({ activeSection, onNavigate, childInfo }) {
  const isLive = isGeminiConfigured();

  const navLinks = [
    { id: 'beranda', label: 'Dashboard Utama', icon: Baby },
    { id: 'kms', label: 'Input Fisik & KMS', icon: LineChart },
    { id: 'jurnal', label: 'Jurnal Emosi Ortu', icon: MessageSquareHeart },
    { id: 'riwayat', label: 'Diagram Batang', icon: LineChart },
    { id: 'pakar', label: 'Konsultasi Pakar', icon: Stethoscope },
    { id: 'klinik', label: 'Booking Klinik', icon: Building2 },
    { id: 'bisnis', label: 'Paket & Toko Nutrisi', icon: Crown }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-warmAmber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo with Custom SVG */}
          <div 
            onClick={() => onNavigate('beranda')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-warmCream-200 border border-warmAmber-300/80 flex items-center justify-center shadow-xs p-2 transition-transform group-hover:scale-105">
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
                <path
                  d="M34 14 L38 10 M38 10 L33 10 M38 10 L38 15"
                  stroke="#e0a84e"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="8" r="2" fill="#e0a84e" />
              </svg>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slateDark">
                  Kembang<span className="text-softTeal-600">Kita</span>
                </span>
                <span className="text-[9px] font-extrabold bg-warmAmber-100 text-warmAmber-800 px-1.5 py-0.5 rounded-md border border-warmAmber-200">
                  WEB PRO
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight hidden sm:block">
                Platform Terpadu Tumbuh Kembang & Kesehatan Mental Anak
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-warmAmber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-warmCream-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Gemini AI Live Status */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-warmCream-200 border border-warmAmber-200 text-xs font-bold text-slate-700 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLive ? 'bg-softTeal-400' : 'bg-warmAmber-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isLive ? 'bg-softTeal-500' : 'bg-warmAmber-500'
                }`}></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-warmAmber-600" />
              <span>{isLive ? 'Gemini AI Active' : 'Gemini Ready'}</span>
            </div>

            {/* Child Profile Quick Tag */}
            <div className="flex items-center space-x-2 bg-warmCream-100 pl-2 pr-3 py-1.5 rounded-2xl border border-warmAmber-200/80 shadow-xs">
              <div className="w-7 h-7 rounded-xl bg-warmAmber-200 flex items-center justify-center text-sm font-bold">
                👦
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-black text-slateDark leading-tight">{childInfo?.nickname || 'Gibran'}</p>
                <p className="text-[10px] text-slate-500 font-medium">4 Tahun (48 bln)</p>
              </div>
            </div>

            {/* Hotline 119 Direct Call CTA */}
            <a
              href="tel:119"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center space-x-1"
              title="Hotline Krisis Emosi 119"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Hotline 119</span>
            </a>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1.5 custom-scrollbar border-t border-slate-100">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-warmAmber-500 text-white shadow-xs'
                    : 'bg-warmCream-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
