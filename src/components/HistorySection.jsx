import React, { useState } from 'react';
import { 
  History, 
  TrendingUp, 
  Heart, 
  Baby, 
  Filter, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function HistorySection({ historyList, growthCurveData }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'mental' | 'physical'
  const [metricTab, setMetricTab] = useState('weight'); // 'weight' | 'height'

  const filteredHistory = historyList.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-3xl p-5 border border-warmAmber-200/70 shadow-soft-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-warmAmber-100 text-warmAmber-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slateDark">
                Grafik Tren & Riwayat Tumbuh Kembang
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Visualisasi terpadu fisik (WHO) dan emosional Gibran
              </p>
            </div>
          </div>
        </div>

        {/* Growth Curve Chart Container */}
        <div className="bg-warmCream-100/80 p-3 rounded-2xl border border-warmAmber-200/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Kurva Pertumbuhan vs Standar WHO ({metricTab === 'weight' ? 'BB/U' : 'TB/U'})
            </span>
            <div className="flex space-x-1 bg-white p-0.5 rounded-xl border border-slate-200 text-[10px] font-bold">
              <button
                onClick={() => setMetricTab('weight')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  metricTab === 'weight' ? 'bg-softTeal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Berat (kg)
              </button>
              <button
                onClick={() => setMetricTab('height')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  metricTab === 'height' ? 'bg-softTeal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tinggi (cm)
              </button>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="age" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey={metricTab === 'weight' ? 'whoWeightMedian' : 'whoHeightMedian'} 
                  name="Median WHO" 
                  stroke="#10b981" 
                  strokeDasharray="3 3"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey={metricTab === 'weight' ? 'gibranWeight' : 'gibranHeight'} 
                  name="Gibran (Riil)" 
                  stroke="#e0a84e" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#e0a84e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 px-1">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Garis Hijau: Standar Median WHO</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-warmAmber-500"></span>
              <span>Garis Kuning: Data Riil Gibran</span>
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filter === 'all'
                ? 'bg-slateDark text-white shadow-xs'
                : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
            }`}
          >
            Semua ({historyList.length})
          </button>
          <button
            onClick={() => setFilter('mental')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filter === 'mental'
                ? 'bg-warmAmber-500 text-white shadow-xs'
                : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
            }`}
          >
            Mental / Emosi ({historyList.filter(i => i.type === 'mental').length})
          </button>
          <button
            onClick={() => setFilter('physical')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filter === 'physical'
                ? 'bg-softTeal-600 text-white shadow-xs'
                : 'bg-warmCream-200 text-slate-600 hover:bg-warmAmber-100'
            }`}
          >
            Fisik / KMS ({historyList.filter(i => i.type === 'physical').length})
          </button>
        </div>

      </div>

      {/* Timeline List */}
      <div className="space-y-2.5">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-soft-card flex items-start space-x-3 transition-all hover:border-warmAmber-200"
          >
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-base ${
              item.type === 'mental' ? 'bg-warmAmber-100 text-warmAmber-700' : 'bg-softTeal-100 text-softTeal-700'
            }`}>
              {item.type === 'mental' ? (item.details?.moodEmoji || '💭') : '📊'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  item.type === 'mental' ? 'bg-warmAmber-100 text-warmAmber-800' : 'bg-softTeal-100 text-softTeal-800'
                }`}>
                  {item.type === 'mental' ? 'Emosi & Jurnal' : 'Fisik & KMS'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
              </div>

              <h4 className="text-xs font-bold text-slateDark line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                {item.summary}
              </p>

              {item.details?.actionPlan && (
                <div className="mt-2 text-[10px] bg-warmCream-200/90 p-2 rounded-xl border border-warmAmber-200/50 text-slate-700">
                  <strong className="text-slateDark">Rekomendasi AI: </strong>
                  <span>{item.details.actionPlan}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
