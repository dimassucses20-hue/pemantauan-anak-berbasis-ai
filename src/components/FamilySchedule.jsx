import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Sun, 
  BookOpen, 
  Bike, 
  HeartHandshake, 
  Moon, 
  TreePine,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function FamilySchedule({ childInfo }) {
  const [scheduleMode, setScheduleMode] = useState('weekday'); // 'weekday' | 'weekend'

  const weekdaySchedule = [
    {
      time: "07:00 – 07:45",
      title: "Sarapan sehat & obrolan pagi santai",
      desc: "Membangun mood positif & afirmasi sebelum ortu mulai bekerja.",
      category: "Gizi & Relasional",
      icon: "🍳",
      tagColor: "bg-slate-100 text-slate-700",
      highlight: false
    },
    {
      time: "09:30 – 10:30",
      title: "Bermain sensorik & mengenal warna/angka",
      desc: "Didampingi pengasuh/ibu secara terstruktur melalui permainan balok & sensory bin.",
      category: "Waktu Belajar Eksploratif",
      icon: "🧩",
      tagColor: "bg-teal-50 text-teal-800 border border-teal-200",
      highlight: false
    },
    {
      time: "16:00 – 17:00",
      title: "Sepeda roda tiga di taman & stimulasi motorik kasar",
      desc: "Menyalurkan kebutuhan gerak anak serta menurunkan stres setelah seharian di dalam rumah.",
      category: "Aktivitas Fisik",
      icon: "🚲",
      tagColor: "bg-slate-100 text-slate-700",
      highlight: false
    },
    {
      time: "18:30 – 19:00",
      title: "Bercerita hari ini & validasi perasaan bersama Ibu/Ayah",
      desc: "Waktu khusus mendengar ekspresi emosi anak tanpa distraksi gadget (screen-free zone).",
      category: "Daily Check-in & Validasi Emosi",
      icon: "💛",
      tagColor: "bg-amber-100 text-amber-900 border border-amber-300 font-extrabold",
      highlight: true
    },
    {
      time: "20:00 – 20:30",
      title: "Dongeng tidur malam, redupkan lampu, sleep hygiene",
      desc: "Relaksasi sensorik untuk mencegah keterlambatan jam tidur lelap (deep sleep).",
      category: "Rutinitas Tidur",
      icon: "🌙",
      tagColor: "bg-slate-100 text-slate-700",
      highlight: false
    }
  ];

  const weekendSchedule = [
    {
      time: "08:00 – 11:00",
      title: "Piknik sensorik & bonding alam bebas di taman kota",
      desc: "Eksplorasi tekstur alami (rumput, pasir/tanah), mengasah kecerdasan naturalis & interaksi keluarga.",
      category: "Kegiatan Keluarga",
      icon: "🏕️",
      tagColor: "bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold",
      highlight: true
    },
    {
      time: "14:00 – 15:30",
      title: "Eksplorasi seni: Cat air, finger painting & playdough",
      desc: "Melatih motorik halus dan katarsis emosi anak melalui media warna bebas.",
      category: "Kreativitas & Seni",
      icon: "🎨",
      tagColor: "bg-purple-50 text-purple-800 border border-purple-200",
      highlight: false
    },
    {
      time: "19:00 – 20:00",
      title: "Family Game Night & Baca Buku Bersama",
      desc: "Bermain puzzle bersama seluruh keluarga dan sharing cerita seru pekan ini.",
      category: "Kelekatan Keluarga",
      icon: "🎲",
      tagColor: "bg-amber-100 text-amber-900",
      highlight: false
    }
  ];

  const currentList = scheduleMode === 'weekday' ? weekdaySchedule : weekendSchedule;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">📅</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              AI Personalized Family Schedule
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            AI mengaturkan jadwal keluarga harian berdasarkan kebutuhan riil emosi balita & waktu optimal {childInfo?.nickname || 'Gibran'}.
          </p>
        </div>

        <span className="text-xs font-bold text-[#0d9488] bg-[#ccfbf1] px-3 py-1 rounded-full self-start sm:self-auto border border-[#99f6e4] flex items-center space-x-1.5 shrink-0">
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          <span>Diperbarui 3j lalu</span>
        </span>
      </div>

      {/* Mode Switcher Bar */}
      <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700 flex items-center space-x-2">
          <span>📋</span>
          <span>Sesuaikan dengan Kesibukan Ortu:</span>
        </span>

        <div className="flex space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setScheduleMode('weekday')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scheduleMode === 'weekday'
                ? 'bg-gradient-to-r from-warmAmber-500 to-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode Hari Kerja
          </button>
          <button
            type="button"
            onClick={() => setScheduleMode('weekend')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scheduleMode === 'weekend'
                ? 'bg-gradient-to-r from-warmAmber-500 to-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode Akhir Pekan
          </button>
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3">
        {currentList.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl transition-all border ${
              item.highlight
                ? 'bg-[#fefce8] border-[#fef08a] shadow-xs'
                : 'bg-white border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-black text-slate-800 tracking-wide">
                  {item.time}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {item.title}
                </h4>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md self-start sm:self-auto ${item.tagColor}`}>
                {item.category}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium pl-6 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
