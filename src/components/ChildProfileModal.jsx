import React, { useState } from 'react';
import { X, Baby, Calendar, Weight, Ruler, Heart, ShieldCheck } from 'lucide-react';

export default function ChildProfileModal({ isOpen, onClose, onSaveChild }) {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    gender: 'male',
    birthDate: '',
    birthWeight: 3.2,
    birthHeight: 49.0,
    bloodType: 'O+',
    allergies: '',
    notes: '',
    avatar: '👦'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate) {
      alert('Nama dan Tanggal Lahir wajib diisi!');
      return;
    }

    const newChild = {
      id: `child-${Date.now()}`,
      ...formData,
      birthWeight: parseFloat(formData.birthWeight) || 3.0,
      birthHeight: parseFloat(formData.birthHeight) || 49.0,
      avatar: formData.gender === 'male' ? '👦' : '👧',
      growthHistory: [
        {
          date: formData.birthDate,
          ageMonths: 0,
          weight: parseFloat(formData.birthWeight) || 3.0,
          height: parseFloat(formData.birthHeight) || 49.0,
          headCirc: 34.0,
          note: 'Data Kelahiran'
        }
      ],
      completedMilestones: [],
      completedVaccines: []
    };

    onSaveChild(newChild);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Tambah Profil Balita Baru</h3>
              <p className="text-xs text-brand-100">Pantau pertumbuhan & imunisasinya secara personal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Anak *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Rayyan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Panggilan</label>
              <input
                type="text"
                placeholder="Rayyan"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="male">Laki-laki 👦</option>
                <option value="female">Perempuan 👧</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Lahir *</label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Berat Lahir (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="3.2"
                value={formData.birthWeight}
                onChange={(e) => setFormData({ ...formData, birthWeight: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Panjang Lahir (cm)</label>
              <input
                type="number"
                step="0.1"
                placeholder="49.0"
                value={formData.birthHeight}
                onChange={(e) => setFormData({ ...formData, birthHeight: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Golongan Darah</label>
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="Belum Tahu">Belum Tahu</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Alergi (jika ada)</label>
              <input
                type="text"
                placeholder="Misal: Susu sapi, Telur"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-glow transition-all"
            >
              Simpan Profil Anak
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
