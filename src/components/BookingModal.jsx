import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Building2, 
  Stethoscope, 
  QrCode, 
  Download,
  Share2,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function BookingModal({ isOpen, onClose, targetItem, type = 'expert', childInfo }) {
  if (!isOpen || !targetItem) return null;

  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('10:00 - 10:45');
  const [serviceType, setServiceType] = useState('Online Video Call (45 Mnt)');
  const [parentName, setParentName] = useState('Bunda Sarah');
  const [parentPhone, setParentPhone] = useState('0812-3456-7890');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [bookingCode, setBookingCode] = useState('');

  const timeSlots = [
    '09:00 - 09:45',
    '10:00 - 10:45',
    '13:00 - 13:45',
    '15:30 - 16:15',
    '19:00 - 19:45'
  ];

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const code = 'KBK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slateDark/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-warmAmber-200/80 p-6 relative custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-5 border-b border-slate-100 pb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${
                type === 'expert' ? 'bg-warmAmber-100 text-warmAmber-800' : 'bg-softTeal-100 text-softTeal-800'
              }`}>
                {type === 'expert' ? (targetItem.avatar || '👨‍⚕️') : <Building2 className="w-6 h-6 text-softTeal-700" />}
              </div>
              <div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  type === 'expert' ? 'bg-warmAmber-100 text-warmAmber-900' : 'bg-softTeal-100 text-softTeal-900'
                }`}>
                  {type === 'expert' ? 'Telekonsultasi Pakar' : 'Booking Janji Temu Faskes'}
                </span>
                <h3 className="text-base font-extrabold text-slateDark mt-0.5">
                  {targetItem.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {targetItem.role || targetItem.category} {targetItem.hospital ? `• ${targetItem.hospital}` : ''}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              
              {/* Info Pasien (Auto filled from Child Profile) */}
              <div className="bg-warmCream-100 p-3.5 rounded-2xl border border-warmAmber-200/60 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm shadow-xs border border-warmAmber-200/60">
                    👦
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Pasien Terdaftar</span>
                    <p className="text-xs font-extrabold text-slateDark">{childInfo?.name || 'Gibran Al-Farizi'}</p>
                    <span className="text-[10px] text-slate-500 font-medium">{childInfo?.age || '4 Tahun (48 Bulan)'}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                  Rekam Medis Siap
                </span>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pilih Layanan Konsultasi / Tindakan:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
                >
                  {type === 'expert' ? (
                    <>
                      <option value="Online Video Call (45 Mnt)">Online Video Call HD + Resume Medis AI (45 Mnt)</option>
                      <option value="Chat Interaktif 3 Hari">Chat Intensif Tanya Dokter 3 Hari</option>
                      <option value="Tatap Muka di Klinik">Konsultasi Tatap Muka / Klinis Langsung</option>
                    </>
                  ) : (
                    <>
                      <option value="Pemeriksaan Antropometri & Stunting">Pemeriksaan Antropometri & Skrining Stunting</option>
                      <option value="Konsultasi Tumbuh Kembang & Emosi">Konsultasi Poli Tumbuh Kembang & Psikologi</option>
                      <option value="Imunisasi & Vitamin Tambahan">Layanan Imunisasi Balita & Pemberian Vitamin</option>
                      <option value="Terapi Sensori & Wicara">Pemeriksaan Terapi Wicara & Okupasi</option>
                    </>
                  )}
                </select>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-warmAmber-600" />
                    <span>Pilih Tanggal Kunjungan:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-softTeal-600" />
                    <span>Pilih Sesi Jam:</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-softTeal-400"
                  >
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot} WIB</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Parent Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Pendamping / Orang Tua:
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. WhatsApp (Notifikasi Booking):
                  </label>
                  <input
                    type="text"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-warmAmber-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keluhan / Catatan Awal untuk Tenaga Medis:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Ingin konsultasi pola makan GTM dan stimulasi bicara..."
                  className="w-full p-2.5 rounded-xl bg-warmCream-100 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-warmAmber-400 resize-none"
                />
              </div>

              {/* Payment Summary Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Biaya Konsultasi / Layanan:</span>
                  <span className="font-extrabold text-slateDark">
                    {targetItem.price || (targetItem.fee ? `Rp ${targetItem.fee.toLocaleString('id-ID')}` : 'Rp 125.000')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Biaya Platform & AI Rekam Medis:</span>
                  <span className="font-bold text-emerald-600">Gratis (Promo KembangKita)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black">
                  <span className="text-slateDark">Total Pembayaran:</span>
                  <span className="text-warmAmber-600">
                    {targetItem.price || (targetItem.fee ? `Rp ${targetItem.fee.toLocaleString('id-ID')}` : 'Rp 125.000')}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                <span>Metode:</span>
                <label className="flex items-center space-x-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'qris'}
                    onChange={() => setPaymentMethod('qris')}
                  />
                  <span>QRIS / E-Wallet</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'va'}
                    onChange={() => setPaymentMethod('va')}
                  />
                  <span>Transfer Virtual Account</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'clinic'}
                    onChange={() => setPaymentMethod('clinic')}
                  />
                  <span>Bayar di Tempat / BPJS</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-warmAmber-500 to-warmAmber-600 hover:from-warmAmber-600 hover:to-warmAmber-700 text-white text-sm font-extrabold transition-all shadow-glow-amber flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Konfirmasi Janji Temu & Dapatkan Tiket Antrean</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Confirmation & E-Ticket */
          <div className="text-center space-y-4 py-2 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-soft-card">
              ✓
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Pemesanan Berhasil Terverifikasi
              </span>
              <h3 className="text-lg font-black text-slateDark mt-2">
                Janji Temu Siap & Terjadwal!
              </h3>
              <p className="text-xs text-slate-500">
                Kode booking telah dikirimkan ke WhatsApp <strong>{parentPhone}</strong>
              </p>
            </div>

            {/* E-Ticket Card */}
            <div className="bg-gradient-to-br from-warmCream-100 to-warmCream-200 p-5 rounded-3xl border-2 border-dashed border-warmAmber-300 text-left space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-warmAmber-200/80 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">E-TIKET RESERVASI</span>
                  <h4 className="text-sm font-extrabold text-slateDark">{targetItem.name}</h4>
                  <p className="text-[11px] text-slate-600">{serviceType}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-warmAmber-800 bg-warmAmber-200 px-2 py-0.5 rounded-md block mb-1">
                    NO. ANTREAN: A-07
                  </span>
                  <span className="text-xs font-black text-slateDark font-mono">{bookingCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">PASIEN:</span>
                  <p className="font-bold text-slateDark">{childInfo?.name || 'Gibran Al-Farizi'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">JADWAL:</span>
                  <p className="font-bold text-slateDark">{selectedDate}</p>
                  <p className="text-[10px] text-slate-600 font-semibold">{selectedTime} WIB</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-warmAmber-200/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-8 h-8 text-slateDark" />
                  <div>
                    <p className="text-[10px] font-bold text-slateDark">Tunjukkan QR ini saat kedatangan</p>
                    <p className="text-[9px] text-slate-400">Atau masuk ke ruang telekonsultasi virtual</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600">LUNAS</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => alert(`Tiket ${bookingCode} telah disimpan ke perangkat.`)}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-2xl border border-slate-200 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Simpan Tiket PDF</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-3 bg-softTeal-600 hover:bg-softTeal-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
