import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CheckCircle2, Info } from 'lucide-react';

export default function ComprehensiveBarChart({ childInfo }) {
  // Data for the 3-pillar quarterly assessment (Skala Skor 1 - 10) matching Figma
  const evaluationData = [
    { period: 'JAN', physical: 7, emotional: 6, habits: 6 },
    { period: 'APR', physical: 8, emotional: 7, habits: 7 },
    { period: 'JUL', physical: 8, emotional: 8, habits: 7 },
    { period: 'OKT', physical: 9, emotional: 8, habits: 8 },
    { period: 'JAN 2025', isLatest: true, physical: 9, emotional: 9, habits: 8 }
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-1 min-w-[200px]">
          <p className="font-extrabold text-slate-800 border-b border-slate-100 pb-1">
            Periode Evaluasi: {label}
          </p>
          <div className="flex items-center justify-between font-bold text-[#046A58]">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#046A58]"></span>
              <span>Kebugaran (Fisik):</span>
            </span>
            <span>{payload[0]?.value}/10</span>
          </div>
          <div className="flex items-center justify-between font-bold text-[#E29E3A]">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#E29E3A]"></span>
              <span>Mental (Emosional):</span>
            </span>
            <span>{payload[1]?.value}/10</span>
          </div>
          <div className="flex items-center justify-between font-bold text-[#4EE0CE]">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4EE0CE]"></span>
              <span>Pola (Makan & Tidur):</span>
            </span>
            <span>{payload[2]?.value}/10</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft-card space-y-6">
      
      {/* Title & Scale Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
            <span className="text-lg leading-none">📊</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Evaluasi Komprehensif Balita (Per 3 Bulan)
          </h3>
        </div>

        <span className="text-xs font-bold text-[#0d9488] bg-[#ccfbf1] px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-[#99f6e4]">
          Skala Skor 1 – 10 (36 – 48 Bulan)
        </span>
      </div>

      {/* Legend & Status Zone Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <span className="font-semibold text-slate-500">
          Indikator Status Zona Perkembangan:
        </span>
        <div className="flex flex-wrap items-center gap-4 font-bold text-xs">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#046A58]"></span>
            <span>8–10: Sehat / Optimal</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E29E3A]"></span>
            <span>5–7: Normal</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>1–4: Kurang</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas Area with Relative "Terkini" Highlight Oval */}
      <div className="relative bg-[#f8fafc]/70 p-4 sm:p-6 rounded-3xl border border-slate-100">
        
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={evaluationData}
              margin={{ top: 25, right: 20, left: -20, bottom: 5 }}
              barGap={4}
              barCategoryGap="28%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 700 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 10]} 
                ticks={[0, 2, 4, 6, 8, 10]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Bar 1: Kebugaran Fisik */}
              <Bar 
                dataKey="physical" 
                name="Kebugaran (Fisik)" 
                fill="#046A58" 
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              
              {/* Bar 2: Mental Emosional */}
              <Bar 
                dataKey="emotional" 
                name="Mental (Emosional)" 
                fill="#E29E3A" 
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              
              {/* Bar 3: Pola Makan & Tidur */}
              <Bar 
                dataKey="habits" 
                name="Pola (Makan & Tidur)" 
                fill="#4EE0CE" 
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Pills below chart */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-200/60 text-xs font-bold text-slate-700">
          <span className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded bg-[#046A58]"></span>
            <span>Kebugaran (Fisik)</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded bg-[#E29E3A]"></span>
            <span>Mental (Emosional)</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded bg-[#4EE0CE]"></span>
            <span>Pola (Makan & Tidur)</span>
          </span>
        </div>

      </div>

      {/* Bottom Summary Evaluation Callout */}
      <div className="bg-[#f0fdfa] p-4 sm:p-5 rounded-2xl border border-[#ccfbf1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-[#046A58] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            <strong className="text-slate-900 font-extrabold">Evaluasi Usia 4 Tahun: </strong> 
            Semua pilar perkembangan balita konsisten di zona optimal (Skor gabungan <strong>8.7/10</strong>).
          </p>
        </div>

        <span className="px-3.5 py-1 bg-white text-[#046A58] font-black text-xs rounded-full border border-[#99f6e4] shadow-xs shrink-0 self-start sm:self-auto flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
          <span>Sangat Baik</span>
        </span>
      </div>

    </div>
  );
}
