import React, { useState } from 'react';
import { 
  History, 
  BarChart2, 
  Heart, 
  Baby, 
  Filter, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

export default function HistorySection({ historyList, growthCurveData, childInfo }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'mental' | 'physical'
  const [metricTab, setMetricTab] = useState('height'); // 'height' | 'weight'

  const filteredHistory = historyList.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Transform growth data for Bar Chart comparison
  const barChartData = growthCurveData.map(item => ({
    age: item.age,
    gibran: metricTab === 'height' ? item.gibranHeight : item.gibranWeight,
    who: metricTab === 'height' ? item.whoHeightMedian : item.whoWeightMedian,
    diff: ((metricTab === 'height' ? item.gibranHeight - item.whoHeightMedian : item.gibranWeight - item.whoWeightMedian)).toFixed(1),
    unit: metricTab === 'height' ? 'cm' : 'kg'
  }));

  const latestData = barChartData[barChartData.length - 1];

  // Custom Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const gibranVal = payload[0]?.value;
      const whoVal = payload[1]?.value;
      const unit = metricTab === 'height' ? 'cm' : 'kg';
      const difference = (gibranVal - whoVal).toFixed(1);
      const isPositive = parseFloat(difference) >= 0;

      return (
        <div className="bg-white p-3 rounded-2xl shadow-xl border border-warmAmber-200 text-xs space-y-1.5 min-w-[190px]">
          <p className="font-extrabold text-slateDark border-b border-slate-100 pb-1">
            Periode: Usia {label}
          </p>
          <div className="flex items-center justify-between text-warmAmber-700 font-bold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-warmAmber-500"></span>
              <span>Gibran (Riil):</span>
            </span>
            <span>{gibranVal} {unit}</span>
          </div>
          <div className="flex items-center justify-between text-softTeal-800 font-bold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-softTeal-500"></span>
              <span>Standar Median WHO:</span>
            </span>
            <span>{whoVal} {unit}</span>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
            <span className="text-slate-500">Selisih Standar:</span>
            <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
              {isPositive ? `+${difference}` : difference} {unit} ({isPositive ? 'Ideal ✓' : 'Perhatian'})
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="riwayat-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Main Diagram Batang Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warmAmber-200/70 shadow-soft-card space-y-5">
        
        {/* Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warmAmber-100/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-warmAmber-100 text-warmAmber-700 flex items-center justify-center font-bold shadow-xs">
              <BarChart2 className="w-5 h-5 text-warmAmber-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slateDark">
                  Diagram Batang Tumbuh Kembang Fisik
                </h3>
                <span className="text-[10px] font-bold bg-softTeal-100 text-softTeal-800 px-2.5 py-0.5 rounded-full border border-softTeal-200">
                  Perbandingan Standar WHO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Komparasi riil hasil pengukuran fisik {childInfo?.name || 'Gibran'} vs Median Baku WHO per kelompok usia
              </p>
            </div>
          </div>

          {/* Metric Selector (Tinggi vs Berat) */}
          <div className="flex space-x-1.5 bg-warmCream-200 p-1.5 rounded-2xl border border-warmAmber-200 text-xs font-bold shrink-0">
            <button
              onClick={() => setMetricTab('height')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                metricTab === 'height' 
                  ? 'bg-softTeal-600 text-white shadow-xs scale-[1.02]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-warmCream-100'
              }`}
            >
              <span>📏</span>
              <span>Tinggi Badan (TB/U)</span>
            </button>
            <button
              onClick={() => setMetricTab('weight')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                metricTab === 'weight' 
                  ? 'bg-warmAmber-500 text-white shadow-xs scale-[1.02]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-warmCream-100'
              }`}
            >
              <span>⚖️</span>
              <span>Berat Badan (BB/U)</span>
            </button>
          </div>
        </div>

        {/* Highlight Summary Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-warmCream-100 rounded-2xl border border-warmAmber-200/60 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-warmAmber-100 flex items-center justify-center text-lg">
              {metricTab === 'height' ? '📏' : '⚖️'}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pengukuran Terakhir (48 Bln)</span>
              <p className="text-base font-black text-slateDark">
                {latestData.gibran} {latestData.unit}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-softTeal-50/70 rounded-2xl border border-softTeal-200/60 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-softTeal-100 flex items-center justify-center text-lg">
              🎯
            </div>
            <div>
              <span className="text-[10px] font-bold text-softTeal-800 uppercase">Standar Median Baku WHO</span>
              <p className="text-base font-black text-slateDark">
                {latestData.who} {latestData.unit}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Status Pertumbuhan</span>
              <p className="text-xs font-black text-emerald-900">
                {metricTab === 'height' ? 'Tinggi Ideal (Bebas Stunting)' : 'Gizi Baik (Normal)'}
              </p>
            </div>
          </div>
        </div>

        {/* Recharts Bar Chart (Diagram Batang) */}
        <div className="bg-warmCream-100/60 p-4 rounded-3xl border border-warmAmber-200/50">
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                barGap={8}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="age" 
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} 
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={metricTab === 'height' ? [40, 120] : [0, 25]} 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                  unit={metricTab === 'height' ? 'cm' : 'kg'}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="gibran" 
                  name={`Data Riil ${childInfo?.nickname || 'Gibran'}`} 
                  fill="#e0a84e" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="who" 
                  name="Standar Median WHO" 
                  fill="#14b8a6" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/70 px-2 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 font-bold text-slate-700">
                <span className="w-3 h-3 rounded-md bg-warmAmber-500"></span>
                <span>Batang Kuning: Riil {childInfo?.nickname || 'Gibran'}</span>
              </span>
              <span className="flex items-center space-x-1.5 font-bold text-slate-700">
                <span className="w-3 h-3 rounded-md bg-softTeal-500"></span>
                <span>Batang Teal: Standar Baku WHO (Kemenkes)</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Update otomatis setiap ada input fisik baru
            </span>
          </div>
        </div>

      </div>

      {/* History Timeline Section with Wide Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warmAmber-200/70 shadow-soft-card space-y-4">
        
        {/* Timeline Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slateDark flex items-center space-x-2">
              <History className="w-4 h-4 text-warmAmber-600" />
              <span>Log Riwayat Analisis Fisik & Emosi</span>
            </h3>
            <p className="text-xs text-slate-500">
              Arsip rekam catatan tumbuh kembang dan rekomendasi pendampingan orang tua
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === 'all'
                  ? 'bg-slateDark text-white shadow-xs'
                  : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
              }`}
            >
              Semua ({historyList.length})
            </button>
            <button
              onClick={() => setFilter('physical')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === 'physical'
                  ? 'bg-softTeal-600 text-white shadow-xs'
                  : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
              }`}
            >
              Fisik / KMS ({historyList.filter(i => i.type === 'physical').length})
            </button>
            <button
              onClick={() => setFilter('mental')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === 'mental'
                  ? 'bg-warmAmber-500 text-white shadow-xs'
                  : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
              }`}
            >
              Mental / Emosi ({historyList.filter(i => i.type === 'mental').length})
            </button>
          </div>
        </div>

        {/* History Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-warmCream-100/90 p-4 rounded-2xl border border-warmAmber-200/60 shadow-xs hover:border-warmAmber-400 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    item.type === 'mental' 
                      ? 'bg-warmAmber-200 text-warmAmber-900 border border-warmAmber-300' 
                      : 'bg-softTeal-100 text-softTeal-900 border border-softTeal-200'
                  }`}>
                    {item.type === 'mental' ? 'Emosi & Jurnal' : 'Fisik & KMS'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-slateDark line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {item.details?.actionPlan && (
                <div className="pt-2 border-t border-warmAmber-200/50 text-[11px] text-slate-700 bg-white/80 p-2.5 rounded-xl">
                  <strong className="text-slateDark block text-[10px] uppercase font-bold text-warmAmber-700 mb-0.5">
                    💡 Rekomendasi Tindakan:
                  </strong>
                  <span className="leading-snug line-clamp-2">{item.details.actionPlan}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
