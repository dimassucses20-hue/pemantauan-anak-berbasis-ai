import React from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle, 
  HeartHandshake, 
  MapPin, 
  ExternalLink,
  LifeBuoy,
  PhoneForwarded,
  Info
} from 'lucide-react';
import { sosHelplines } from '../data/mockData';

export default function SosDirectory() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-white/20 rounded-2xl">
            <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-rose-200">
              Pusat Tanggap Darurat & Krisis
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              Layanan Bantuan 24 Jam & Kontak Penting
            </h2>
          </div>
        </div>
        <p className="text-xs text-rose-100 max-w-2xl leading-relaxed mt-2">
          Jika Anda, pasangan, atau anak Anda berada dalam kondisi krisis mental akut, kekerasan rumah tangga, atau kegawatdaruratan medis, jangan menanggungnya sendirian. Segera hubungi saluran bantuan bebas pulsa di bawah ini.
        </p>
      </div>

      {/* Helplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sosHelplines.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                  item.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  item.color === 'rose' ? 'bg-rose-100 text-rose-800' :
                  item.color === 'indigo' ? 'bg-indigo-100 text-indigo-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {item.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Nomor Hotline:</span>
                <strong className="text-sm font-black text-slate-800">{item.number}</strong>
              </div>
              <a
                href={`tel:${item.tel}`}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Panggil Sekarang</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* First-Aid Emergency Guidelines for Toddlers */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Panduan Tanda Bahaya Bayi & Balita (Red Flags Segera ke IGD)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl">
            <h4 className="font-bold text-rose-900 mb-1">🚨 Kejang Demam / Penurunan Kesadaran</h4>
            <p className="text-[11px] leading-relaxed">
              Mata mendelik, tidak merespon saat dibangunkan, atau tubuh kaku. Baringkan miring, jangan masukkan sendok/apapun ke mulut, segera bawa ke RS.
            </p>
          </div>

          <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl">
            <h4 className="font-bold text-rose-900 mb-1">🚨 Dehidrasi Berat</h4>
            <p className="text-[11px] leading-relaxed">
              Mata cekung, tidak buang air kecil lebih dari 6 jam, bibir sangat kering, dan anak tampak lemas lunglai saat muntah/diare terus-menerus.
            </p>
          </div>

          <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl">
            <h4 className="font-bold text-rose-900 mb-1">🚨 Sesak Napas Akut</h4>
            <p className="text-[11px] leading-relaxed">
              Napas cepat di atas 50x/menit, cuping hidung kembang-kempis, dan terlihat tarikan dinding dada bagian bawah ke dalam (retraksi).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
