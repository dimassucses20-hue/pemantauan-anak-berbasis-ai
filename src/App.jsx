import React, { useState } from 'react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import JournalForm from './components/JournalForm';
import KmsScanner from './components/KmsScanner';
import HistorySection from './components/HistorySection';
import ReferralWidget from './components/ReferralWidget';
import { 
  MessageSquareHeart, 
  LineChart, 
  History as HistoryIcon, 
  ShieldAlert, 
  Sparkles,
  Heart,
  Baby
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('journal'); // 'journal' | 'kms' | 'history' | 'referral'

  // Child Profile State (Gibran, 4 Tahun)
  const [childInfo] = useState({
    name: 'Gibran Al-Farizi',
    nickname: 'Gibran',
    age: '4 Tahun (48 Bulan)',
    gender: 'Laki-laki',
    birthDate: '2022-07-15'
  });

  // Growth Curve standard dataset (WHO vs Gibran's measurements)
  const [growthCurveData, setGrowthCurveData] = useState([
    { age: '0 bln', whoWeightMedian: 3.3, gibranWeight: 3.2, whoHeightMedian: 49.9, gibranHeight: 49.0 },
    { age: '12 bln', whoWeightMedian: 9.6, gibranWeight: 9.5, whoHeightMedian: 75.7, gibranHeight: 75.5 },
    { age: '24 bln', whoWeightMedian: 12.2, gibranWeight: 12.0, whoHeightMedian: 87.8, gibranHeight: 88.0 },
    { age: '36 bln', whoWeightMedian: 14.3, gibranWeight: 14.1, whoHeightMedian: 96.1, gibranHeight: 96.5 },
    { age: '48 bln', whoWeightMedian: 16.3, gibranWeight: 16.2, whoHeightMedian: 103.3, gibranHeight: 103.5 }
  ]);

  // Initial Real History List (Mental + Physical Records)
  const [historyList, setHistoryList] = useState([
    {
      id: 'h-1',
      type: 'physical',
      date: '15 Sep 2026',
      title: 'Pengukuran Rutin Posyandu (Usia 48 Bln)',
      summary: 'Tinggi: 103.5 cm, Berat: 16.2 kg (Gizi Baik WHO, Bebas Stunting)',
      details: {
        actionPlan: 'Pertahankan asupan 2 porsi protein hewani + stimulasi melompat dua kaki.'
      },
      timestamp: Date.now() - 86400000 * 3
    },
    {
      id: 'h-2',
      type: 'mental',
      date: '12 Sep 2026',
      title: 'Observasi Emosi: Ceria & Berbagi',
      summary: 'Gibran dengan senang hati meminjamkan mainan mobilannya kepada sepupunya tanpa menangis.',
      details: {
        mood: 'Ceria & Empatis',
        moodEmoji: '😊',
        actionPlan: 'Beri pujian deskriptif atas perilaku berbaginya untuk memperkuat inisiatif sosial.'
      },
      timestamp: Date.now() - 86400000 * 6
    },
    {
      id: 'h-3',
      type: 'mental',
      date: '05 Sep 2026',
      title: 'Observasi Emosi: Frustrasi Main Balok',
      summary: 'Sempat menangis karena menara balok roboh, berhasil ditenangkan dengan validasi emosi.',
      details: {
        mood: 'Frustrasi Ringan',
        moodEmoji: '🥺',
        actionPlan: 'Latih kesabaran melalui permainan puzzle sederhana.'
      },
      timestamp: Date.now() - 86400000 * 14
    }
  ]);

  // Handle adding new analysis result from Journal or KMS to history
  const handleAddAnalysisResult = (newRecord) => {
    setHistoryList(prev => [newRecord, ...prev]);

    // If it's a physical record, also update the chart
    if (newRecord.type === 'physical' && newRecord.details) {
      setGrowthCurveData(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex] = {
          ...updated[lastIndex],
          gibranWeight: newRecord.details.detectedWeight,
          gibranHeight: newRecord.details.detectedHeight
        };
        return updated;
      });
    }
  };

  const latestPhysical = historyList.find(item => item.type === 'physical')?.details;
  const latestMental = historyList.find(item => item.type === 'mental')?.details;

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center">
      
      {/* Mobile-First Constrained Wrapper */}
      <div className="w-full max-w-md bg-[#fdfbf7] min-h-screen flex flex-col shadow-2xl border-x border-warmAmber-100/80">
        
        {/* Header */}
        <Header />

        {/* Content Container */}
        <main className="flex-1 p-4 space-y-4">
          
          {/* Child Profile Bar */}
          <ProfileCard
            childInfo={childInfo}
            latestPhysical={latestPhysical ? { weight: latestPhysical.detectedWeight || 16.2, height: latestPhysical.detectedHeight || 103.5 } : null}
            latestMental={latestMental}
          />

          {/* Dual-Mode Switcher Tabs */}
          <div className="bg-warmCream-200/90 p-1.5 rounded-2xl border border-warmAmber-200/70 grid grid-cols-2 gap-1 shadow-xs">
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'journal'
                  ? 'bg-warmAmber-500 text-white shadow-xs scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-warmCream-100'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>🗣️ Jurnal Ortu</span>
            </button>

            <button
              onClick={() => setActiveTab('kms')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'kms'
                  ? 'bg-softTeal-600 text-white shadow-xs scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-warmCream-100'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>📈 Input Fisik (KMS)</span>
            </button>
          </div>

          {/* Tab 1: Mental & Journal Form */}
          {activeTab === 'journal' && (
            <JournalForm
              childInfo={childInfo}
              onAddAnalysisResult={handleAddAnalysisResult}
            />
          )}

          {/* Tab 2: Physical & KMS Scanner */}
          {activeTab === 'kms' && (
            <KmsScanner
              childInfo={childInfo}
              onAddAnalysisResult={handleAddAnalysisResult}
            />
          )}

          {/* History & Trend Visualizer Component */}
          <HistorySection
            historyList={historyList}
            growthCurveData={growthCurveData}
          />

          {/* Referral Clinic Widget */}
          <ReferralWidget />

        </main>

        {/* Medical Disclaimer & Footer */}
        <footer className="p-4 pt-2 pb-8 border-t border-warmAmber-100 bg-warmCream-100 text-center space-y-2">
          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-200/60 text-left flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-rose-900/80 leading-relaxed font-medium">
              <strong>Penafian Medis Wajib:</strong> Analisis AI KembangKita berfungsi sebagai instrumen pencatatan dan skrining awal mandiri orang tua. Hasil ini tidak menggantikan diagnosis medis resmi, evaluasi klinis dokter spesialis anak (Sp.A), atau psikolog klinis berlisensi.
            </p>
          </div>

          <p className="text-[10px] text-slate-400 font-semibold">
            © 2026 KembangKita • Standar WHO & Kemenkes RI • AI-Powered Parenting
          </p>
        </footer>

      </div>

    </div>
  );
}
