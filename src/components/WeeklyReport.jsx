import React from 'react';
import { 
  Smile, 
  Activity, 
  Moon, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function WeeklyReport({ childInfo }) {
  const insights = [
    {
      id: 1,
      title: "Mood Pekanan",
      status: "Relatif Stabil",
      statusColor: "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]",
      statusDot: "bg-[#10b981]",
      icon: Smile,
      iconBg: "bg-emerald-50 text-emerald-600",
      description: "Konsisten ceria dengan 1 momen frustrasi wajar (saat balok jatuh)."
    },
    {
      id: 2,
      title: "Aktivitas Fisik",
      status: "Sedikit Menurun",
      statusColor: "bg-[#fffbeb] text-[#92400e] border-[#fde68a]",
      statusDot: "bg-[#f59e0b]",
      icon: Activity,
      iconBg: "bg-amber-50 text-amber-600",
      description: "Motorik di luar ruangan berkurang 15% karena cuaca hujan deras."
    },
    {
      id: 3,
      title: "Kebiasaan Tidur",
      status: "Berubah",
      statusColor: "bg-[#fffbeb] text-[#92400e] border-[#fde68a]",
      statusDot: "bg-[#f59e0b]",
      icon: Moon,
      iconBg: "bg-indigo-50 text-indigo-600",
      description: "Waktu tidur malam bergeser 35 menit lebih larut dari jadwal biasa."
    },
    {
      id: 4,
      title: "Interaksi Keluarga",
      status: "Meningkat",
      statusColor: "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]",
      statusDot: "bg-[#10b981]",
      icon: Users,
      iconBg: "bg-teal-50 text-teal-600",
      description: "Durasi deep-talk & bonding ortu naik signifikan (+40 menit/hari)."
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">📝</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              AI Weekly Child Report
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Daripada orang tua harus membaca banyak data mentah, AI menyusun rangkuman otomatis perkembangan emosi & fisik balita.
          </p>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-amber-200 flex items-center space-x-1.5 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Rangkuman Otomatis Pekanan (17 – 23 Maret)</span>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-[#f8fafc] border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {item.title}
                  </h4>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center space-x-1 ${item.statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.statusDot}`}></span>
                  <span>{item.status}</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Attention / Action Warning Callout */}
      <div className="bg-[#fffbeb] p-4 sm:p-5 rounded-2xl border border-[#fef08a] flex items-start space-x-3">
        <span className="text-lg shrink-0 mt-0.5">⚠️</span>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-extrabold text-amber-950">
            Hal yang Perlu Diperhatikan:
          </p>
          <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
            Perubahan aktivitas fisik dan pergeseran rutinitas jam tidur. Disarankan memulai transisi bedtime 15 menit lebih awal serta memperbanyak aktivitas gerak indoor yang menyenangkan.
          </p>
        </div>
      </div>

    </div>
  );
}
