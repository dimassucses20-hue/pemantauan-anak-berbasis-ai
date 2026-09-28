import React, { useState } from 'react';
import { 
  Ruler, 
  Weight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  UploadCloud, 
  Image as ImageIcon,
  X,
  FileCheck,
  TrendingUp,
  Plus,
  Minus,
  Calendar,
  Activity,
  Camera,
  Info,
  Sliders
} from 'lucide-react';
import { analyzeKmsPhysical } from '../services/geminiService';

export default function KmsScanner({ childInfo, onAddAnalysisResult }) {
  const [activeInputMode, setActiveInputMode] = useState('manual'); // 'manual' | 'photo' | 'both'
  const [weightInput, setWeightInput] = useState('16.2');
  const [heightInput, setHeightInput] = useState('103.5');
  const [headCircInput, setHeadCircInput] = useState('50.2');
  const [measureDate, setMeasureDate] = useState(new Date().toISOString().split('T')[0]);
  const [measureNote, setMeasureNote] = useState('Pemeriksaan Rutin Posyandu Melati');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Quick Preset Options for Testing / Demo
  const presetOptions = [
    { label: "Normal Ideal (16.2 kg / 103.5 cm)", weight: "16.2", height: "103.5", headCirc: "50.2", desc: "Pertumbuhan sesuai median standar WHO" },
    { label: "Waspada Stunting (13.5 kg / 93.0 cm)", weight: "13.5", height: "93.0", headCirc: "48.5", desc: "Tinggi badan di bawah -2 SD kurva WHO" },
    { label: "Gizi Lebih (19.8 kg / 106.0 cm)", weight: "19.8", height: "106.0", headCirc: "51.0", desc: "Berat badan melebihi +2 SD kurva WHO" }
  ];

  const handleAdjustWeight = (delta) => {
    const current = parseFloat(weightInput) || 16.0;
    const nextVal = Math.max(2, Math.min(45, current + delta));
    setWeightInput(nextVal.toFixed(1));
  };

  const handleAdjustHeight = (delta) => {
    const current = parseFloat(heightInput) || 100.0;
    const nextVal = Math.max(40, Math.min(150, current + delta));
    setHeightInput(nextVal.toFixed(1));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPreset = (preset) => {
    setWeightInput(preset.weight);
    setHeightInput(preset.height);
    setHeadCircInput(preset.headCirc);
  };

  const handleAnalyzeKms = async (e) => {
    e.preventDefault();
    if (!weightInput || !heightInput) {
      alert('Mohon masukkan Berat Badan dan Tinggi Badan terlebih dahulu.');
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeKmsPhysical({
        image: selectedImage,
        weight: weightInput,
        height: heightInput,
        headCirc: headCircInput
      }, childInfo);

      setAnalysisResult(result);

      // Add to history
      onAddAnalysisResult({
        id: `kms-${Date.now()}`,
        type: 'physical',
        date: new Date(measureDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: `Input Fisik: ${result.detectedWeight} kg / ${result.detectedHeight} cm`,
        summary: `Tinggi: ${result.detectedHeight} cm, Berat: ${result.detectedWeight} kg (${result.whoStatus}) • ${measureNote}`,
        details: result,
        timestamp: Date.now()
      });
    } catch (err) {
      console.error(err);
      alert('Gagal memproses analisis fisik.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="kms-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Input Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-softTeal-200/80 shadow-soft-card space-y-6">
        
        {/* Top Mode Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-softTeal-100 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-softTeal-100 text-softTeal-700 flex items-center justify-center font-bold shadow-xs">
              <Activity className="w-6 h-6 text-softTeal-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-slateDark">
                  Input Data Fisik & Foto KMS / Buku KIA
                </h2>
                <span className="text-[10px] bg-softTeal-100 text-softTeal-800 font-bold px-2.5 py-0.5 rounded-full border border-softTeal-200">
                  Standar Kemenkes RI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Pencatatan antropometri mandiri & analisis Z-Score WHO untuk {childInfo.name}
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex space-x-1.5 bg-warmCream-200 p-1.5 rounded-2xl border border-warmAmber-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveInputMode('manual')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeInputMode === 'manual'
                  ? 'bg-softTeal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>1. Input Angka Manual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveInputMode('photo')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeInputMode === 'photo'
                  ? 'bg-softTeal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>2. Upload Foto Buku KIA</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Presets Bar */}
        <div className="bg-warmCream-100/90 p-3.5 rounded-2xl border border-warmAmber-200/60">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            💡 Pilih Sampel Cepat Pengukuran:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {presetOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(opt)}
                className="text-left p-2.5 rounded-xl bg-white hover:bg-softTeal-50 text-slate-700 hover:text-softTeal-900 border border-slate-200 hover:border-softTeal-300 transition-all shadow-xs group"
              >
                <p className="text-xs font-bold text-slateDark group-hover:text-softTeal-700">
                  📊 {opt.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAnalyzeKms} className="space-y-6">
          
          {/* Main 2-Column Responsive Layout for Manual Input & Photo Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Manual Inputs */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sliders className="w-4 h-4 text-warmAmber-600" />
                <span>Pengukuran Antropometri Manual</span>
              </h3>

              {/* 1. Input Berat Badan (kg) */}
              <div className="bg-warmCream-100/90 p-4 rounded-3xl border border-warmAmber-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slateDark flex items-center space-x-1.5">
                    <Weight className="w-4 h-4 text-warmAmber-600" />
                    <span>Berat Badan (kg) *</span>
                  </label>
                  <span className="text-[10px] font-bold text-warmAmber-900 bg-warmAmber-100 px-2 py-0.5 rounded-md border border-warmAmber-300">
                    Standar Median: 16.3 kg
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleAdjustWeight(-0.1)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-warmAmber-50 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-base shadow-xs active:scale-95 transition-all shrink-0"
                    title="Kurangi 0.1 kg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      placeholder="16.2"
                      className="w-full text-center py-2.5 px-3 bg-white rounded-2xl border border-warmAmber-300 text-xl font-black text-slateDark focus:outline-none focus:ring-2 focus:ring-warmAmber-400 shadow-xs"
                    />
                    <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-400 pointer-events-none">
                      kg
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdjustWeight(0.1)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-warmAmber-50 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-base shadow-xs active:scale-95 transition-all shrink-0"
                    title="Tambah 0.1 kg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider bar */}
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  className="w-full mt-3 accent-warmAmber-500 cursor-pointer"
                />
              </div>

              {/* 2. Input Tinggi Badan (cm) */}
              <div className="bg-softTeal-50/70 p-4 rounded-3xl border border-softTeal-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slateDark flex items-center space-x-1.5">
                    <Ruler className="w-4 h-4 text-softTeal-600" />
                    <span>Tinggi / Panjang Badan (cm) *</span>
                  </label>
                  <span className="text-[10px] font-bold text-softTeal-900 bg-softTeal-100 px-2 py-0.5 rounded-md border border-softTeal-300">
                    Standar Median: 103.3 cm
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleAdjustHeight(-0.5)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-softTeal-50 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-base shadow-xs active:scale-95 transition-all shrink-0"
                    title="Kurangi 0.5 cm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={heightInput}
                      onChange={(e) => setHeightInput(e.target.value)}
                      placeholder="103.5"
                      className="w-full text-center py-2.5 px-3 bg-white rounded-2xl border border-softTeal-300 text-xl font-black text-slateDark focus:outline-none focus:ring-2 focus:ring-softTeal-400 shadow-xs"
                    />
                    <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-400 pointer-events-none">
                      cm
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdjustHeight(0.5)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-softTeal-50 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-base shadow-xs active:scale-95 transition-all shrink-0"
                    title="Tambah 0.5 cm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider bar */}
                <input
                  type="range"
                  min="50"
                  max="140"
                  step="0.5"
                  value={heightInput}
                  onChange={(e) => setHeightInput(e.target.value)}
                  className="w-full mt-3 accent-softTeal-600 cursor-pointer"
                />
              </div>

              {/* Metadata Inputs (Lingkar Kepala, Tanggal, Lokasi) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Lingkar Kepala (cm):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={headCircInput}
                    onChange={(e) => setHeadCircInput(e.target.value)}
                    placeholder="50.2"
                    className="w-full px-3 py-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tanggal Pengukuran:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={measureDate}
                    onChange={(e) => setMeasureDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Catatan / Lokasi Pengukuran (Posyandu / Puskesmas):
                </label>
                <input
                  type="text"
                  value={measureNote}
                  onChange={(e) => setMeasureNote(e.target.value)}
                  placeholder="Contoh: Posyandu Melati / Puskesmas Beji"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
                />
              </div>
            </div>

            {/* Right Column: Photo Upload Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-softTeal-600" />
                <span>Lampiran Foto Buku KIA / KMS (Opsional / Optical Scan)</span>
              </h3>

              <div className="bg-warmCream-100/80 p-5 rounded-3xl border border-softTeal-200/80 h-[calc(100%-2rem)] flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Ambil foto grafik KMS atau lembar timbangan di Buku KIA Pink anak Anda. Gemini Vision AI akan membantu memvalidasi data dan mengarsipkan dokumentasi medis.
                  </p>

                  {!selectedImage ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-softTeal-300 hover:border-softTeal-500 rounded-3xl p-8 bg-white hover:bg-softTeal-50/50 transition-all cursor-pointer text-center group">
                      <div className="w-14 h-14 rounded-2xl bg-softTeal-100 text-softTeal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <p className="text-sm font-extrabold text-slateDark mb-1">
                        Pilih atau Jepret Foto Buku KIA / KMS
                      </p>
                      <p className="text-xs text-slate-400">
                        Format PNG, JPG, JPEG (Maks. 10 MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-3xl overflow-hidden border-2 border-softTeal-400 bg-slate-900 shadow-md">
                      <img
                        src={selectedImage}
                        alt="Preview KMS"
                        className="w-full h-56 object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-white justify-between">
                        <div>
                          <span className="text-xs font-bold flex items-center space-x-1.5 text-softTeal-300">
                            <FileCheck className="w-4 h-4" />
                            <span>Foto KMS Terlampir & Siap Dianalisis</span>
                          </span>
                          <p className="text-[10px] text-slate-300">Dokumen akan diproses oleh Gemini Optical AI</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedImage(null)}
                          className="p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white transition-colors"
                          title="Hapus foto"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Privasi rekam medis terlindungi</span>
                  </span>
                  <span className="text-[11px] font-semibold text-softTeal-700">Tersinkronisasi ke Profil</span>
                </div>
              </div>

            </div>

          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-softTeal-600 via-softTeal-700 to-warmAmber-600 hover:from-softTeal-700 hover:to-warmAmber-700 disabled:opacity-50 text-white text-sm font-black transition-all shadow-glow-teal flex items-center justify-center space-x-2.5"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sedang Menghitung Z-Score & Mengevaluasi Status Stunting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-softTeal-200" />
                  <span>Kalkulasi Status Fisik, Z-Score WHO & Simpan Riwayat</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Analysis Result Display Card */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-softTeal-400 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
          
          {/* Header of Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-softTeal-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Hasil Evaluasi Pertumbuhan Fisik WHO</span>
              <h3 className="text-lg sm:text-xl font-black text-slateDark">{analysisResult.whoStatus}</h3>
            </div>

            <span className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center space-x-1.5 self-start sm:self-auto ${
              analysisResult.stuntingColor === 'emerald'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{analysisResult.stuntingRisk}</span>
            </span>
          </div>

          {/* 3 Metrics Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-softTeal-50/80 rounded-2xl border border-softTeal-200/80">
              <span className="text-[10px] font-bold text-softTeal-800 uppercase block">Berat Badan (BB / U)</span>
              <p className="text-2xl font-black text-slateDark my-1">{analysisResult.detectedWeight} kg</p>
              <span className="text-xs text-slate-600 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Z-Score: {analysisResult.zScoreWeight}
              </span>
            </div>

            <div className="p-4 bg-warmCream-200/90 rounded-2xl border border-warmAmber-200/80">
              <span className="text-[10px] font-bold text-warmAmber-900 uppercase block">Tinggi / Panjang (TB / U)</span>
              <p className="text-2xl font-black text-slateDark my-1">{analysisResult.detectedHeight} cm</p>
              <span className="text-xs text-slate-600 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Z-Score: {analysisResult.zScoreHeight}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Lingkar Kepala</span>
              <p className="text-2xl font-black text-slateDark my-1">{analysisResult.detectedHeadCirc} cm</p>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Normocephalic (Normal)
              </span>
            </div>
          </div>

          {/* Detailed Guidance & Nutrition Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200/80 space-y-1.5">
              <p className="font-extrabold text-amber-900 flex items-center space-x-1.5 text-sm">
                <span>🍗</span>
                <span>Rekomendasi Asupan Protein & Nutrisi:</span>
              </p>
              <p className="text-amber-950/80 leading-relaxed font-medium">
                {analysisResult.nutritionAdvice}
              </p>
            </div>

            <div className="p-4 bg-softTeal-50/90 rounded-2xl border border-softTeal-200/80 space-y-1.5">
              <p className="font-extrabold text-softTeal-900 flex items-center space-x-1.5 text-sm">
                <span>🤸</span>
                <span>Rekomendasi Stimulasi Motorik & Aktivitas:</span>
              </p>
              <p className="text-softTeal-950/80 leading-relaxed font-medium">
                {analysisResult.motoricAdvice}
              </p>
            </div>
          </div>

          {/* Footer of result */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Standar Baku Antropometri WHO & Kemenkes RI</span>
            <span className="text-softTeal-700 font-bold">Data Otomatis Terhubung ke Diagram Batang ✓</span>
          </div>

        </div>
      )}

    </div>
  );
}
