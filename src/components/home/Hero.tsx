import { Search, MapPin, Users, Heart, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useState } from 'react';

export default function Hero() {
  const { user, userProfile, signIn } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-12-31');

  return (
    <section className="relative min-h-[100vh] flex items-start bg-[#FFF1F3] overflow-hidden pb-20">
      {/* Immersive Background Image & Pink Tone */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D6D]/15 via-transparent to-[#FF4D6D]/10 animate-pulse" />
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
          alt="Wedding Backdrop"
          className="w-full h-full object-cover opacity-10 blur-[100px]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/40 to-white" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-start px-6 relative z-10 pt-48 md:pt-56">
        {/* Text Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
          >
            <Sparkles size={14} className="text-[#FF4D6D] animate-pulse" />
            <span>Guía Exclusiva • Granada</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-7xl md:text-[140px] font-serif font-light text-slate-900 leading-[0.8] tracking-tighter">
              Boda de <br />
              <span className="italic text-[#FF4D6D]">Ensueño</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-light italic">
              "Donde el lujo andaluz se encuentra con la perfección técnica para crear vuestro momento eterno."
            </p>
          </motion.div>

          {/* Bodas.net Style Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white p-4 rounded-[40px] shadow-2xl flex flex-col md:flex-row gap-4 border border-slate-100">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FF4D6D]" size={20} />
                <input 
                  type="text" 
                  placeholder="¿Qué buscas? (Banquetes, DJ...)"
                  className="w-full pl-16 pr-6 py-6 bg-slate-50 rounded-[30px] border-none outline-none text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-[#FF4D6D]/5 transition-all"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FF4D6D]" size={20} />
                <input 
                  type="text" 
                  placeholder="¿Dónde? (Granada, Motril...)"
                  className="w-full pl-16 pr-6 py-6 bg-slate-50 rounded-[30px] border-none outline-none text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-[#FF4D6D]/5 transition-all"
                />
              </div>
              <button 
                onClick={() => navigate('/proveedores')}
                className="bg-[#FF4D6D] text-white px-10 py-6 rounded-[30px] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FF4D6D]/20"
              >
                Buscar
              </button>
            </div>

            {/* Quick Categories */}
            <div className="flex flex-wrap gap-4 mt-8">
              {['Banquetes', 'Fotografía', 'Música', 'Decoración', 'Vestidos'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => navigate('/proveedores')}
                  className="px-6 py-2 bg-white/50 backdrop-blur-md rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-[#FF4D6D] hover:text-white hover:border-[#FF4D6D] transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Seamless Visual Side */}
        <div className="relative aspect-[4/5] lg:aspect-auto h-full min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-full h-full relative"
          >
            {/* Main Immersive Cutout */}
            <div className="absolute inset-0 rounded-[100px] overflow-hidden shadow-2xl border-[16px] border-white shadow-[#FF4D6D]/10">
              <img
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2000"
                alt="Pareja de Enamorados"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Artistic Element */}
            <motion.div 
               animate={{ rotate: [0, 5, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D6D] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            />

            {/* Restored Moving Box (Right Side) */}
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-52 h-52 rounded-[48px] overflow-hidden border-[12px] border-white shadow-2xl z-20 hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                alt="Wedding Detail"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Optional: Add back the bottom-left badge for balance if it was part of the "alive" feel */}
            {/* Interactive Wedding Planner Widget */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[50px] shadow-2xl z-20 flex flex-col gap-8 border border-white/50 backdrop-blur-xl hidden md:flex w-80"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF4D6D] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">¿Vuestra Fecha?</p>
                  <p className="text-lg font-serif italic text-slate-900">El Gran Día</p>
                </div>
              </div>

              <div className="space-y-4">
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-black text-slate-800 focus:ring-2 focus:ring-[#FF4D6D]/20 outline-none"
                />
                <button 
                  onClick={() => {
                    localStorage.setItem('pendingWeddingDate', selectedDate);
                    // Open Auth Modal or Redirect to Signup
                    const authBtn = document.getElementById('identificate-btn');
                    if (authBtn) {
                      authBtn.click();
                    } else {
                      navigate('/proveedores'); // Fallback
                    }
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF4D6D] transition-all shadow-xl"
                >
                  Empieza a Organizar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
