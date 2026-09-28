import React, { useState } from 'react';
import { 
  Heart, 
  Baby, 
  Activity, 
  CheckCircle2, 
  BrainCircuit, 
  Syringe, 
  PhoneCall, 
  Plus, 
  Printer, 
  Sparkles, 
  Wind,
  Smile
} from 'lucide-react';
import { calculateAgeInMonths } from '../utils/growthCalculators';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  childrenList, 
  activeChildId, 
  setActiveChildId,
  onOpenAddChild,
  onOpenExport,
  onOpenCalmMode
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activeChild = childrenList.find(c => c.id === activeChildId) || childrenList[0];
  const childAge = activeChild ? calculateAgeInMonths(activeChild.birthDate) : null;

  const navItems = [
    { id: 'dashboard', label: 'Ringkasan', icon: Activity },
    { id: 'growth', label: 'Tumbuh Fisik & Z-Score', icon: Baby },
    { id: 'milestone', label: 'Milestone KPSP', icon: CheckCircle2 },
    { id: 'mental', label: 'Mental Health & Skrining', icon: Heart },
    { id: 'ai-coach', label: 'AI Parenting Copilot', icon: BrainCircuit, badge: 'AI Cerdas' },
    { id: 'vaccines', label: 'Jadwal Imunisasi', icon: Syringe },
    { id: 'sos', label: 'SOS 119 & Bantuan', icon: PhoneCall, isEmergency: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-glow">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-brand-700 via-brand-600 to-sky-600 bg-clip-text text-transparent">
                  TumbuhHarmoni
                </span>
                <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                  MVP 48h
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Tumbuh Kembang Balita & Kesehatan Mental Keluarga
              </p>
            </div>
          </div>

          {/* Child Switcher & Quick Utility Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Calm Breathing Button */}
            <button
              onClick={onOpenCalmMode}
              title="Mode Relaksasi & Latihan Napas Orang Tua"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-200/60 shadow-xs"
            >
              <Wind className="w-4 h-4 text-sky-500" />
              <span className="hidden md:inline">Relaksasi Napas</span>
            </button>

            {/* Export / Cetak Resume Medis */}
            <button
              onClick={onOpenExport}
              title="Cetak Resume Medis Posyandu / Dokter"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Resume PDF</span>
            </button>

            {/* Active Child Profile Dropdown */}
            {activeChild && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100/80 rounded-2xl border border-brand-200 transition-all text-left group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {activeChild.avatar || "👶"}
                  </span>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {activeChild.nickname}
                    </p>
                    <p className="text-[10px] text-brand-700 font-semibold">
                      {childAge?.formatted || 'Usia balita'}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                    <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Pilih Profil Anak
                    </p>
                    {childrenList.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          setActiveChildId(child.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                          child.id === activeChildId 
                            ? 'bg-brand-500 text-white font-bold' 
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">{child.avatar}</span>
                          <span>{child.name}</span>
                        </span>
                        {child.id === activeChildId && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                    
                    <div className="my-1 border-t border-slate-100"></div>
                    
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenAddChild();
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Profil Balita Baru</span>
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 custom-scrollbar scroll-smooth no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? item.isEmergency
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-brand-600 text-white shadow-glow'
                    : item.isEmergency
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isEmergency ? 'text-rose-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-brand-800 text-brand-100' : 'bg-brand-100 text-brand-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
