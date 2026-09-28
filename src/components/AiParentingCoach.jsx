import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Heart, 
  MessageSquare, 
  RefreshCw,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { aiParentingKnowledge } from '../data/mockData';

export default function AiParentingCoach({ activeChild }) {
  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Halo Ayah & Bunda! Saya **HarmoniAI**, asisten pintar tumbuh kembang & pendamping kesehatan mental keluarga.\n\nAda yang sedang membuat Ayah/Bunda cemas, lelah, atau bingung terkait perkembangan si kecil hari ini? Anda bisa curhat atau bertanya tentang tantrum, tips MPASI/GTM, stimulasi motorik, hingga cara mengelola stres pengasuhan.`,
      timestamp: 'Baru saja'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Anakku tantrum & memukul saat dilarang, harus bagaimana?",
    "Si kecil GTM parah gamau makan, tips mengatasinya?",
    "Saya merasa sangat lelah & burnout mengasuh sendirian",
    "Cara mencegah stunting & optimasi berat badan balita",
    "Anak usia 1 tahun belum mau jalan, apakah normal?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = input) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent AI triage / response matching
    setTimeout(() => {
      let matchedResponse = null;
      const lowerQuery = query.toLowerCase();

      for (const item of aiParentingKnowledge) {
        if (item.keywords.some(kw => lowerQuery.includes(kw))) {
          matchedResponse = item.reply;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `Terima kasih sudah berbagi, Bunda/Ayah. Terkait **"${query}"**:\n\n1. **Ketenangan Emosi Orang Tua**: Saat anak merasakan kestabilan emosi kita, saraf cerminnya (*mirror neurons*) akan perlahan ikut tenang.\n2. **Observasi Pola**: Coba perhatikan apakah anak sedang mengantuk, lapar (*hangry*), atau over-stimulasi layar gawai.\n3. **Sentuhan & Kontak Mata**: Dekati anak sejajar dengan tinggi matanya, lalu sampaikan pesan singkat dengan nada penuh kehangatan.\n\nBunda/Ayah juga jangan lupa istirahat ya, pengasuhan yang baik berawal dari orang tua yang jiwanya tenang. 🌸`;
      }

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-teal-700 via-brand-600 to-indigo-700 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
            <BrainCircuit className="w-7 h-7 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold">HarmoniAI Parenting Copilot</h2>
              <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold px-2 py-0.5 rounded-full">
                Online 24/7
              </span>
            </div>
            <p className="text-xs text-brand-100">
              Asisten Berbasis Konsensus Dokter Spesialis Anak (IDAI) & Psikologi Keluarga
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                m.sender === 'user' ? 'bg-indigo-600' : 'bg-brand-600 shadow-glow'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100 shadow-xs'
              }`}>
                <div className="whitespace-pre-line font-normal">
                  {m.text}
                </div>
                <span className={`block text-[10px] mt-2 font-medium ${
                  m.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                }`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs italic pl-10">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]"></div>
              <span>HarmoniAI sedang menyusun saran medis & psikologis...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto custom-scrollbar no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center space-x-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Topik Cepat:</span>
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs font-semibold rounded-full border border-slate-200/80 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tuliskan pertanyaan atau curhatan Anda di sini..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold transition-all shadow-glow flex items-center space-x-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Kirim</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
