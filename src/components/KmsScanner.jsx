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
  Activity
} from 'lucide-react';
import { analyzeKmsPhysical } from '../services/geminiService';

export default function KmsScanner({ childInfo, onAddAnalysisResult }) {
  const [weightInput, setWeightInput] = useState('16.2');
  const [heightInput, setHeightInput] = useState('103.5');
  const [headCircInput, setHeadCircInput] = useState('50.2');
  const [measureDate, setMeasureDate] = useState(new Date().toISOString().split('T')[0]);
  const [measureNote, setMeasureNote] = useState('Pemeriksaan Rutin Posyandu');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Quick Preset Chips for rapid testing / demo
  const presetOptions = [
    { label: "Normal (16.2 kg / 103.5 cm)", weight: "16.2", height: "103.5", headCirc: "50.2" },
    { label: "Waspada Stunting (13.5 kg / 93.0 cm)", weight: "13.5", height: "93.0", headCirc: "48.5" },
    { label: "Gizi Lebih (19.8 kg / 106.0 cm)", weight: "19.8", height: "106.0", headCirc: "51.0" }
  ];

  const handleAdjustWeight = (delta) => {
    const current = parseFloat(weightInput) || 16.0;
    const nextVal = Math.max(2, Math.min(40, current + delta));
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

      // Add to overall history
      onAddAnalysisResult({
        id: `kms-${Date.now()}`,
        type: 'physical',
        date: new Date(measureDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: `Input Fisik Manual: ${result.detectedWeight} kg / ${result.detectedHeight} cm`,
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
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Main Manual Input Form Container */}
      <div className="bg-white rounded-3xl p-5 border border-softTeal-200/80 shadow-soft-card">
        
        {/* Header Title */}
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-softTeal-100 text-softTeal-700 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5 text-softTeal-600" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slateDark flex items-center space-x-1.5">
              <span>Input Manual Pertumbuhan Fisik</span>
              <span className="text-[10px] bg-softTeal-100 text-softTeal-800 font-bold px-2 py-0.5 rounded-full border border-softTeal-200">
                Standar WHO
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Masukkan hasil timbangan & pengukuran {childInfo.name}
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Pilihan Sampel Cepat (Klik untuk Isi):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(opt)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-warmCream-200/90 hover:bg-softTeal-100 text-slate-700 hover:text-softTeal-900 border border-warmAmber-200/60 transition-colors"
              >
                📊 {opt.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAnalyzeKms} className="space-y-4">
          
          {/* Dual Big Number Input Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Input Berat Badan (kg) */}
            <div className="bg-warmCream-100/90 p-3.5 rounded-2xl border border-warmAmber-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slateDark flex items-center space-x-1">
                  <Weight className="w-3.5 h-3.5 text-warmAmber-600" />
                  <span>Berat Badan (kg) *</span>
                </label>
                <span className="text-[10px] font-bold text-warmAmber-800 bg-warmAmber-100 px-1.5 py-0.5 rounded-md">
                  BB / U
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleAdjustWeight(-0.1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-warmAmber-50 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 transition-all"
                  title="Kurangi 0.1 kg"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="Contoh: 16.2"
                    className="w-full text-center py-2 px-2 bg-white rounded-xl border border-warmAmber-300 text-base font-black text-slateDark focus:outline-none focus:ring-2 focus:ring-warmAmber-400 shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-bold text-slate-400 pointer-events-none">
                    kg
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustWeight(0.1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-warmAmber-50 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 transition-all"
                  title="Tambah 0.1 kg"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 text-center">Standar Median WHO 4 Thn: 16.3 kg</p>
            </div>

            {/* 2. Input Tinggi Badan (cm) */}
            <div className="bg-softTeal-50/70 p-3.5 rounded-2xl border border-softTeal-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slateDark flex items-center space-x-1">
                  <Ruler className="w-3.5 h-3.5 text-softTeal-600" />
                  <span>Tinggi / Panjang (cm) *</span>
                </label>
                <span className="text-[10px] font-bold text-softTeal-800 bg-softTeal-100 px-1.5 py-0.5 rounded-md">
                  TB / U (Stunting)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleAdjustHeight(-0.5)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-softTeal-50 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 transition-all"
                  title="Kurangi 0.5 cm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={heightInput}
                    onChange={(e) => setHeightInput(e.target.value)}
                    placeholder="Contoh: 103.5"
                    className="w-full text-center py-2 px-2 bg-white rounded-xl border border-softTeal-300 text-base font-black text-slateDark focus:outline-none focus:ring-2 focus:ring-softTeal-400 shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-bold text-slate-400 pointer-events-none">
                    cm
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustHeight(0.5)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-softTeal-50 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 transition-all"
                  title="Tambah 0.5 cm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 text-center">Standar Median WHO 4 Thn: 103.3 cm</p>
            </div>

          </div>

          {/* Metadata: Lingkar Kepala, Tanggal & Catatan */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Lingkar Kepala (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={headCircInput}
                onChange={(e) => setHeadCircInput(e.target.value)}
                placeholder="50.2"
                className="w-full px-3 py-2 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Tanggal Pengukuran</span>
              </label>
              <input
                type="date"
                required
                value={measureDate}
                onChange={(e) => setMeasureDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Catatan / Lokasi Pengukuran
            </label>
            <input
              type="text"
              value={measureNote}
              onChange={(e) => setMeasureNote(e.target.value)}
              placeholder="Contoh: Posyandu Melati / Puskesmas"
              className="w-full px-3 py-2 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
            />
          </div>

          {/* Optional Attachment Section */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowPhotoUpload(!showPhotoUpload)}
              className="text-[11px] font-bold text-softTeal-700 hover:text-softTeal-800 flex items-center space-x-1"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{showPhotoUpload ? "− Sembunyikan Lampiran Foto" : "+ Lampirkan Foto Halaman KMS / Buku KIA (Opsional)"}</span>
            </button>

            {showPhotoUpload && (
              <div className="mt-2.5 animate-in fade-in">
                {!selectedImage ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-softTeal-300 hover:border-softTeal-500 rounded-2xl p-4 bg-softTeal-50/40 hover:bg-softTeal-50/80 transition-all cursor-pointer text-center group">
                    <UploadCloud className="w-6 h-6 text-softTeal-500 group-hover:scale-110 transition-transform mb-1" />
                    <p className="text-xs font-bold text-slate-700 mb-0.5">
                      Pilih Foto Halaman Buku KIA Pink
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Sebagai arsip dokumentasi fisik digital
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-softTeal-200 bg-slate-900">
                    <img
                      src={selectedImage}
                      alt="Preview KMS"
                      className="w-full h-32 object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5 text-white justify-between">
                      <span className="text-[10px] font-bold flex items-center space-x-1">
                        <FileCheck className="w-3.5 h-3.5 text-softTeal-400" />
                        <span>Foto KMS Terlampir</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-softTeal-500 to-softTeal-600 hover:from-softTeal-600 hover:to-softTeal-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-teal flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gemini Sedang Mengkalkulasi Z-Score WHO...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-softTeal-200" />
                <span>Analisis Status Fisik & Z-Score dengan AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* KMS Anthropometry Result Card */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-5 border-2 border-softTeal-300 shadow-soft-card space-y-4 animate-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between border-b border-softTeal-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Hasil Evaluasi Pertumbuhan WHO</span>
              <h4 className="text-sm font-black text-slateDark">{analysisResult.whoStatus}</h4>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 ${
              analysisResult.stuntingColor === 'emerald'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}>
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{analysisResult.stuntingRisk}</span>
            </span>
          </div>

          {/* Detected Values 3-Col Box */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-softTeal-50/70 rounded-2xl border border-softTeal-200/60">
              <span className="text-[9px] font-bold text-softTeal-700 uppercase block">Berat (BB/U)</span>
              <p className="text-base font-black text-slateDark">{analysisResult.detectedWeight} kg</p>
              <span className="text-[9px] text-slate-500 font-semibold">{analysisResult.zScoreWeight}</span>
            </div>

            <div className="p-2.5 bg-warmCream-200/80 rounded-2xl border border-warmAmber-200/60">
              <span className="text-[9px] font-bold text-warmAmber-800 uppercase block">Tinggi (TB/U)</span>
              <p className="text-base font-black text-slateDark">{analysisResult.detectedHeight} cm</p>
              <span className="text-[9px] text-slate-500 font-semibold">{analysisResult.zScoreHeight}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Lingkar Kepala</span>
              <p className="text-base font-black text-slateDark">{analysisResult.detectedHeadCirc} cm</p>
              <span className="text-[9px] text-emerald-600 font-bold">Normal</span>
            </div>
          </div>

          {/* Action Plans */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/70">
              <p className="font-bold text-amber-900 mb-1 flex items-center space-x-1.5">
                <span>🍗</span>
                <span>Rekomendasi Gizi & Nutrisi Harian:</span>
              </p>
              <p className="text-amber-900/80 leading-relaxed">{analysisResult.nutritionAdvice}</p>
            </div>

            <div className="p-3 bg-softTeal-50/80 rounded-2xl border border-softTeal-200/70">
              <p className="font-bold text-softTeal-900 mb-1 flex items-center space-x-1.5">
                <span>🤸</span>
                <span>Stimulasi Motorik & Aktivitas:</span>
              </p>
              <p className="text-softTeal-900/80 leading-relaxed">{analysisResult.motoricAdvice}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span>Standar WHO 2006 (Kemenkes RI)</span>
            <span className="text-softTeal-700 font-semibold">Tersimpan Otomatis ke Grafik ✓</span>
          </div>

        </div>
      )}

    </div>
  );
}
