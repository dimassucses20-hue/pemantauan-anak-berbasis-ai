import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import JournalForm from './components/JournalForm';
import KmsScanner from './components/KmsScanner';
import HistorySection from './components/HistorySection';
import ExpertConsultation from './components/ExpertConsultation';
import ReferralWidget from './components/ReferralWidget';
import BusinessModels from './components/BusinessModels';
import { 
  MessageSquareHeart, 
  LineChart, 
  Stethoscope,
  Building2,
  Crown,
  History as HistoryIcon, 
  ShieldAlert, 
  Sparkles,
  Heart,
  Baby,
  BarChart2,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda'); // 'beranda' | 'kms' | 'jurnal' | 'riwayat' | 'pakar' | 'klinik' | 'bisnis'

  // Child Profile State (Gibran, 4 Tahun)
  const [childInfo, setChildInfo] = useState({
    name: 'Gibran Al-Farizi',
    nickname: 'Gibran',
    age: '4 Tahun (48 Bulan)',
    gender: 'Laki-laki',
    birthDate: '2022-07-15'
  });

  // Growth Curve dataset for Bar Chart (WHO vs Gibran's measurements)
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
        detectedWeight: 16.2,
        detectedHeight: 103.5,
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

    // If it's a physical record, update chart
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
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col selection:bg-warmAmber-200 selection:text-warmAmber-900">
      
      {/* Top Website-Style Full-Width Navbar */}
      <Navbar 
        activeSection={activeSection}
        onNavigate={(sec) => setActiveSection(sec)}
        childInfo={childInfo}
      />

      {/* Main Full-Width Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Child Profile Card Summary Banner */}
        <ProfileCard
          childInfo={childInfo}
          latestPhysical={latestPhysical ? { weight: latestPhysical.detectedWeight || 16.2, height: latestPhysical.detectedHeight || 103.5 } : null}
          latestMental={latestMental}
          onActionClick={(sec) => setActiveSection(sec)}
        />

        {/* Website Feature Navigation Tabs Bar */}
        <div className="bg-white p-2 rounded-3xl border border-warmAmber-200/80 shadow-soft-card">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            
            <button
              onClick={() => setActiveSection('beranda')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'beranda'
                  ? 'bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 text-white shadow-glow-amber scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-warmAmber-50 text-slate-700'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>Semua Tampilan</span>
            </button>

            <button
              onClick={() => setActiveSection('kms')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'kms'
                  ? 'bg-softTeal-600 text-white shadow-glow-teal scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-softTeal-50 text-slate-700'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Input Fisik & KMS</span>
            </button>

            <button
              onClick={() => setActiveSection('jurnal')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'jurnal'
                  ? 'bg-warmAmber-500 text-white shadow-glow-amber scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-warmAmber-50 text-slate-700'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Jurnal Emosi Ortu</span>
            </button>

            <button
              onClick={() => setActiveSection('riwayat')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'riwayat'
                  ? 'bg-slateDark text-white shadow-md scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Diagram Batang</span>
            </button>

            <button
              onClick={() => setActiveSection('pakar')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'pakar'
                  ? 'bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 text-white shadow-glow-amber scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-warmAmber-50 text-slate-700'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Pakar & Tarif</span>
            </button>

            <button
              onClick={() => setActiveSection('klinik')}
              className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center space-y-1 ${
                activeSection === 'klinik'
                  ? 'bg-rose-600 text-white shadow-md scale-[1.02]'
                  : 'bg-warmCream-100 hover:bg-rose-50 text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Booking Klinik</span>
            </button>

          </div>
        </div>

        {/* VIEW 1: BERANDA (OVERVIEW OF ALL MODULES IN WIDE GRID) */}
        {activeSection === 'beranda' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top 2-Column Split: KMS Input & Jurnal Emosi */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <KmsScanner
                  childInfo={childInfo}
                  onAddAnalysisResult={handleAddAnalysisResult}
                />
              </div>

              <div>
                <JournalForm
                  childInfo={childInfo}
                  onAddAnalysisResult={handleAddAnalysisResult}
                />
              </div>
            </div>

            {/* Diagram Batang (Bar Chart) Section */}
            <HistorySection
              historyList={historyList}
              growthCurveData={growthCurveData}
              childInfo={childInfo}
            />

            {/* Pakar & Dokter Spesialis Section */}
            <ExpertConsultation childInfo={childInfo} />

            {/* Model Bisnis Lainnya (Subscription, NutriKit, Academy, Home Visit) */}
            <BusinessModels />

            {/* Klinik Terdekat & Booking Section */}
            <ReferralWidget childInfo={childInfo} />

          </div>
        )}

        {/* VIEW 2: DEDICATED INPUT FISIK & KMS */}
        {activeSection === 'kms' && (
          <div className="space-y-6">
            <KmsScanner
              childInfo={childInfo}
              onAddAnalysisResult={handleAddAnalysisResult}
            />
            <HistorySection
              historyList={historyList}
              growthCurveData={growthCurveData}
              childInfo={childInfo}
            />
          </div>
        )}

        {/* VIEW 3: DEDICATED JURNAL EMOSI */}
        {activeSection === 'jurnal' && (
          <div className="space-y-6">
            <JournalForm
              childInfo={childInfo}
              onAddAnalysisResult={handleAddAnalysisResult}
            />
          </div>
        )}

        {/* VIEW 4: DEDICATED DIAGRAM BATANG & RIWAYAT */}
        {activeSection === 'riwayat' && (
          <div className="space-y-6">
            <HistorySection
              historyList={historyList}
              growthCurveData={growthCurveData}
              childInfo={childInfo}
            />
          </div>
        )}

        {/* VIEW 5: DEDICATED PAKAR & TARIF */}
        {activeSection === 'pakar' && (
          <div className="space-y-6">
            <ExpertConsultation childInfo={childInfo} />
          </div>
        )}

        {/* VIEW 6: DEDICATED BOOKING KLINIK TERDEKAT */}
        {activeSection === 'klinik' && (
          <div className="space-y-6">
            <ReferralWidget childInfo={childInfo} />
          </div>
        )}

        {/* VIEW 7: DEDICATED PAKET & TOKO NUTRISI */}
        {activeSection === 'bisnis' && (
          <div className="space-y-6">
            <BusinessModels />
          </div>
        )}

      </main>

      {/* Modern Wide Website Footer */}
      <footer className="mt-12 bg-white border-t border-warmAmber-200/80 pt-10 pb-8 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-warmCream-200 border border-warmAmber-200 flex items-center justify-center shadow-xs p-1">
                  <span className="text-sm">🌱</span>
                </div>
                <span className="text-lg font-black text-slateDark">
                  Kembang<span className="text-softTeal-600">Kita</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ekosistem terpadu pemantauan tumbuh kembang fisik (Antropometri WHO) dan regulasi emosi anak berbasis kecerdasan buatan Google Gemini.
              </p>
              <div className="flex items-center space-x-2 text-xs font-bold text-softTeal-700">
                <CheckCircle2 className="w-4 h-4 text-softTeal-600" />
                <span>Terverifikasi Standar Kemenkes RI</span>
              </div>
            </div>

            {/* Col 2: Fitur Utama */}
            <div>
              <h4 className="text-xs font-extrabold text-slateDark uppercase tracking-wider mb-3">
                Layanan & Fitur
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li><button onClick={() => setActiveSection('kms')} className="hover:text-warmAmber-600">Input Fisik & Scan KMS</button></li>
                <li><button onClick={() => setActiveSection('jurnal')} className="hover:text-warmAmber-600">Jurnal Psikologi & Emosi</button></li>
                <li><button onClick={() => setActiveSection('riwayat')} className="hover:text-warmAmber-600">Diagram Batang WHO</button></li>
                <li><button onClick={() => setActiveSection('pakar')} className="hover:text-warmAmber-600">Telekonsultasi Dokter Anak (Sp.A)</button></li>
                <li><button onClick={() => setActiveSection('klinik')} className="hover:text-warmAmber-600">Booking Klinik & Faskes</button></li>
              </ul>
            </div>

            {/* Col 3: Model Bisnis & Layanan */}
            <div>
              <h4 className="text-xs font-extrabold text-slateDark uppercase tracking-wider mb-3">
                Model Bisnis & Produk
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li><button onClick={() => setActiveSection('bisnis')} className="hover:text-warmAmber-600">Langganan KembangKita Pro</button></li>
                <li><button onClick={() => setActiveSection('bisnis')} className="hover:text-warmAmber-600">Toko NutriKit Anti-Stunting</button></li>
                <li><button onClick={() => setActiveSection('bisnis')} className="hover:text-warmAmber-600">Akademi Masterclass Parenting</button></li>
                <li><button onClick={() => setActiveSection('bisnis')} className="hover:text-warmAmber-600">Layanan Home Visit Nakes</button></li>
                <li><button onClick={() => setActiveSection('bisnis')} className="hover:text-warmAmber-600">Kemitraan Faskes & Posyandu</button></li>
              </ul>
            </div>

            {/* Col 4: Layanan Darurat */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slateDark uppercase tracking-wider mb-3">
                Bantuan & Darurat
              </h4>
              <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1">
                <p className="font-extrabold flex items-center space-x-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  <span>Hotline SEJIWA Kemenkes</span>
                </p>
                <p className="text-[11px] text-rose-700">Telepon Darurat Mental & Anak: <strong>119 ext. 8</strong></p>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Email Dukungan: support@kembangkita.id
              </p>
            </div>

          </div>

          {/* Medical Disclaimer Banner */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-left flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950/80 leading-relaxed font-medium">
              <strong>Penafian Medis Wajib (Medical Disclaimer):</strong> Platform KembangKita dan analisis AI berfungsi sebagai instrumen pencatatan, skrining awal mandiri, dan edukasi parenting. Hasil ini tidak menggantikan diagnosis resmi dokter spesialis anak (Sp.A), evaluasi klinis psikolog anak berlisensi, atau pemeriksaan laboratorium medis.
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p>© 2026 KembangKita • Standar WHO 2006 & Kemenkes RI • AI-Powered Child Development</p>
            <div className="flex space-x-4">
              <span className="hover:text-slate-600 cursor-pointer">Syarat & Ketentuan</span>
              <span className="hover:text-slate-600 cursor-pointer">Kebijakan Privasi</span>
              <span className="hover:text-slate-600 cursor-pointer">Pedoman Medis</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
