import React from 'react';
import { X, Printer, Download, Baby, Heart, ShieldCheck, Award } from 'lucide-react';
import { calculateAgeInMonths, calculateWeightForAgeZScore, calculateHeightForAgeZScore } from '../utils/growthCalculators';

export default function ExportReportModal({ isOpen, onClose, activeChild }) {
  if (!isOpen || !activeChild) return null;

  const age = calculateAgeInMonths(activeChild.birthDate);
  const latestGrowth = activeChild.growthHistory[activeChild.growthHistory.length - 1] || {
    weight: activeChild.birthWeight,
    height: activeChild.birthHeight,
    headCirc: 34.0,
    date: activeChild.birthDate
  };

  const weightZ = calculateWeightForAgeZScore(activeChild.gender, age.totalMonths, latestGrowth.weight);
  const heightZ = calculateHeightForAgeZScore(activeChild.gender, age.totalMonths, latestGrowth.height);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Action Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-brand-400" />
            <h3 className="text-sm font-bold">Laporan Ringkasan Medis & Tumbuh Kembang</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar print:p-0">
          
          {/* Header Document */}
          <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                TUMBUH HARMONI - RESUME KESEHATAN ANAK & KELUARGA
              </h1>
              <p className="text-xs text-slate-500">
                Sistem Pemantauan Terpadu 1000 Hari Pertama Kehidupan (HPK) & Skrining Mental
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</p>
              <p className="font-bold text-slate-800">Dokumen Rekam Mandiri</p>
            </div>
          </div>

          {/* Child Biodata */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Nama Anak:</span>
              <strong className="text-slate-800 font-bold">{activeChild.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Tanggal Lahir:</span>
              <strong className="text-slate-800">{activeChild.birthDate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Usia Saat Ini:</span>
              <strong className="text-slate-800">{age.formatted}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Jenis Kelamin:</span>
              <strong className="text-slate-800">{activeChild.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</strong>
            </div>
          </div>

          {/* Status Pertumbuhan Terakhir */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Status Pertumbuhan Terkini (WHO Z-Score)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Berat Badan (BB/U)</span>
                <span className="text-lg font-black text-slate-800">{latestGrowth.weight} kg</span>
                <p className="text-[11px] font-semibold text-emerald-700 mt-1">{weightZ.status}</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Tinggi Badan (TB/U)</span>
                <span className="text-lg font-black text-slate-800">{latestGrowth.height} cm</span>
                <p className={`text-[11px] font-semibold mt-1 ${heightZ.isStunted ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {heightZ.status}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Lingkar Kepala</span>
                <span className="text-lg font-black text-slate-800">{latestGrowth.headCirc || '-'} cm</span>
                <p className="text-[11px] font-semibold text-slate-600 mt-1">Normocephalic</p>
              </div>
            </div>
          </div>

          {/* Milestone & Imunisasi Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200">
              <h5 className="font-bold text-slate-800 mb-1">Capaian Milestone KPSP</h5>
              <p className="text-slate-600">Total Milestone Tercapai: <strong>{activeChild.completedMilestones.length} kemampuan</strong></p>
              <p className="text-slate-400 text-[11px] mt-1">Motorik kasar, halus, bicara, dan sosial sesuai rentang usia.</p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200">
              <h5 className="font-bold text-slate-800 mb-1">Kelengkapan Vaksin IDAI</h5>
              <p className="text-slate-600">Vaksin Diberikan: <strong>{activeChild.completedVaccines.length} Vaksin</strong></p>
              <p className="text-slate-400 text-[11px] mt-1">Imunisasi dasar lengkap sesuai jadwal Kemenkes.</p>
            </div>
          </div>

          {/* Posyandu Sign-off */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p>Catatan Dokter / Bidan:</p>
              <div className="w-64 h-12 border-b border-dashed border-slate-300 mt-2"></div>
            </div>
            <div className="text-center">
              <p>Tanda Tangan Petugas / Pemeriksa</p>
              <div className="w-40 h-12 border-b border-slate-400 mt-2"></div>
              <p className="text-[10px] mt-1">( ......................................... )</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
