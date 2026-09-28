import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Baby, 
  Plus, 
  TrendingUp, 
  Ruler, 
  Weight, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  FileText,
  Info,
  ShieldCheck
} from 'lucide-react';
import { 
  calculateAgeInMonths, 
  calculateWeightForAgeZScore, 
  calculateHeightForAgeZScore, 
  calculateBMI 
} from '../utils/growthCalculators';
import { whoGrowthStandards } from '../data/mockData';

export default function GrowthTracker({ activeChild, onAddGrowthRecord }) {
  const [metricType, setMetricType] = useState('weight'); // 'weight' | 'height'
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    height: '',
    headCirc: '',
    note: 'Pengukuran Rutin Posyandu'
  });

  if (!activeChild) return null;

  const currentAge = calculateAgeInMonths(activeChild.birthDate);
  const latestGrowth = activeChild.growthHistory[activeChild.growthHistory.length - 1] || {
    weight: activeChild.birthWeight,
    height: activeChild.birthHeight,
    headCirc: 34.0,
    date: activeChild.birthDate,
    ageMonths: 0
  };

  const weightZ = calculateWeightForAgeZScore(activeChild.gender, currentAge.totalMonths, latestGrowth.weight);
  const heightZ = calculateHeightForAgeZScore(activeChild.gender, currentAge.totalMonths, latestGrowth.height);
  const bmiInfo = calculateBMI(latestGrowth.weight, latestGrowth.height);

  // Prepare chart dataset by merging WHO Standards and Child Records
  const standardsData = whoGrowthStandards[activeChild.gender][metricType];
  
  const chartData = standardsData.map(std => {
    // find child record near this age
    const match = activeChild.growthHistory.find(h => Math.abs(h.ageMonths - std.age) <= 1);
    return {
      age: `${std.age} bln`,
      sdNeg2: std.sdNeg2,
      median: std.median,
      sdPos2: std.sdPos2,
      childValue: match ? (metricType === 'weight' ? match.weight : match.height) : null
    };
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newMeasurement.weight || !newMeasurement.height) {
      alert('Mohon isi Berat dan Tinggi badan!');
      return;
    }

    const calcAge = calculateAgeInMonths(activeChild.birthDate, newMeasurement.date);
    const newRecord = {
      date: newMeasurement.date,
      ageMonths: calcAge.totalMonths,
      weight: parseFloat(newMeasurement.weight),
      height: parseFloat(newMeasurement.height),
      headCirc: parseFloat(newMeasurement.headCirc) || 0,
      note: newMeasurement.note
    };

    onAddGrowthRecord(activeChild.id, newRecord);
    setShowAddForm(false);
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      height: '',
      headCirc: '',
      note: 'Pengukuran Rutin Posyandu'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <span>Kurva Tumbuh Kembang & Z-Score WHO</span>
            <span className="text-xs bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold">
              Standar Kemenkes RI
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau pertumbuhan fisik {activeChild.name} terhadap kurva standar Organisasi Kesehatan Dunia (WHO).
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-glow flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Hasil Timbangan Baru</span>
        </button>
      </div>

      {/* Form Input Pengukuran Baru */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-brand-50/80 to-sky-50/80 p-6 rounded-3xl border border-brand-200/80 shadow-md animate-in slide-in-from-top-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
            <Baby className="w-4 h-4 text-brand-600" />
            <span>Formulir Pengukuran Fisik Balita</span>
          </h3>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tanggal Pengukuran</label>
              <input
                type="date"
                required
                value={newMeasurement.date}
                onChange={(e) => setNewMeasurement({ ...newMeasurement, date: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Berat Badan (kg) *</label>
              <input
                type="number"
                step="0.05"
                required
                placeholder="misal: 9.8"
                value={newMeasurement.weight}
                onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Panjang/Tinggi (cm) *</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="misal: 76.5"
                value={newMeasurement.height}
                onChange={(e) => setNewMeasurement({ ...newMeasurement, height: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Lingkar Kepala (cm)</label>
              <input
                type="number"
                step="0.1"
                placeholder="misal: 45.0"
                value={newMeasurement.headCirc}
                onChange={(e) => setNewMeasurement({ ...newMeasurement, headCirc: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Catatan / Posyandu</label>
              <input
                type="text"
                placeholder="Catatan..."
                value={newMeasurement.note}
                onChange={(e) => setNewMeasurement({ ...newMeasurement, note: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-5 flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
              >
                Simpan & Hitung Z-Score
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Realtime Z-Score Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* BB / U */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Berat menurut Usia (BB/U)</span>
            <span className="p-1.5 bg-brand-50 text-brand-600 rounded-xl">
              <Weight className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-2xl font-black text-slate-800">{latestGrowth.weight} kg</span>
            <span className="text-xs font-semibold text-slate-400">
              (Standar Median: {weightZ.median} kg)
            </span>
          </div>
          <p className="text-xs font-bold text-emerald-700 flex items-center space-x-1 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{weightZ.status}</span>
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Z-Score: <strong>{weightZ.zScore > 0 ? `+${weightZ.zScore}` : weightZ.zScore} SD</strong> (Rentang aman: -2 SD hingga +2 SD)
          </div>
        </div>

        {/* TB / U (Stunting Check) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tinggi menurut Usia (TB/U)</span>
            <span className="p-1.5 bg-sky-50 text-sky-600 rounded-xl">
              <Ruler className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-2xl font-black text-slate-800">{latestGrowth.height} cm</span>
            <span className="text-xs font-semibold text-slate-400">
              (Standar Median: {heightZ.median} cm)
            </span>
          </div>
          <p className={`text-xs font-bold flex items-center space-x-1 mb-2 ${
            heightZ.isStunted ? 'text-rose-700' : 'text-emerald-700'
          }`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{heightZ.status}</span>
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Z-Score: <strong>{heightZ.zScore > 0 ? `+${heightZ.zScore}` : heightZ.zScore} SD</strong> (Indikator Stunting)
          </div>
        </div>

        {/* BMI & Proporsi Tubuh */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Indeks Massa Tubuh (BMI)</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-2xl font-black text-slate-800">{bmiInfo.bmi}</span>
            <span className="text-xs font-semibold text-slate-400">kg/m²</span>
          </div>
          <p className="text-xs font-bold text-indigo-700 flex items-center space-x-1 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span>{bmiInfo.status}</span>
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Lingkar Kepala Terakhir: <strong>{latestGrowth.headCirc || 34.0} cm</strong> (Perkembangan Otak)
          </div>
        </div>

      </div>

      {/* Interactive Growth Curve Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Grafik Pertumbuhan ({metricType === 'weight' ? 'Berat Badan vs Umur' : 'Panjang Badan vs Umur'})
            </h3>
            <p className="text-xs text-slate-400">
              Garis biru tebal adalah data pertumbuhan riil {activeChild.name} dibandingkan standar WHO.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setMetricType('weight')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                metricType === 'weight' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Berat Badan (kg)
            </button>
            <button
              onClick={() => setMetricType('height')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                metricType === 'height' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Panjang Badan (cm)
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="age" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line 
                type="monotone" 
                dataKey="sdPos2" 
                name="+2 SD (Batas Atas)" 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="median" 
                name="Median Standar WHO" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="sdNeg2" 
                name="-2 SD (Batas Bawah Stunting)" 
                stroke="#ef4444" 
                strokeDasharray="4 4" 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="childValue" 
                name={`Pertumbuhan ${activeChild.nickname}`} 
                stroke="#0284c7" 
                strokeWidth={3.5} 
                dot={{ r: 5, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }} 
                connectNulls 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth History Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-brand-600" />
          <span>Buku Catatan Riwayat Pengukuran (KMS Digital)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Usia</th>
                <th className="py-3 px-4">Berat (kg)</th>
                <th className="py-3 px-4">Panjang (cm)</th>
                <th className="py-3 px-4">LK (cm)</th>
                <th className="py-3 px-4">Catatan / Posyandu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {activeChild.growthHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-700">{item.date}</td>
                  <td className="py-3 px-4 text-slate-500">{item.ageMonths} Bulan</td>
                  <td className="py-3 px-4 font-extrabold text-brand-700">{item.weight} kg</td>
                  <td className="py-3 px-4 font-extrabold text-sky-700">{item.height} cm</td>
                  <td className="py-3 px-4 text-slate-600">{item.headCirc || '-'} cm</td>
                  <td className="py-3 px-4 text-slate-500 italic">{item.note || 'Pemeriksaan Rutin'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
