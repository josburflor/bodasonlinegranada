import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Calendar() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const days = [...Array(30)].map((_, i) => i + 1);
  const startDay = 2; // Tuesday

  const handleDateSelect = async (day: number) => {
    const selectedDate = `2026-04-${day.toString().padStart(2, '0')}`;
    localStorage.setItem('pendingWeddingDate', selectedDate);
    
    if (!user) {
      await signIn('couple');
    } else {
      navigate('/mi-boda');
    }
  };

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FF4D6D] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#4D8BFF] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4D6D]/10 text-[#FF4D6D] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles size={14} /> El Gran Día
              </span>
              <h2 className="text-6xl md:text-8xl font-serif font-light text-slate-900 leading-[1] mb-8">
                ¿Qué Día desean <br />
                <span className="italic text-[#FF4D6D]">Casarse?</span>
              </h2>
              <p className="text-slate-500 text-lg font-light max-w-lg mb-12 leading-relaxed">
                Cada historia de amor tiene un momento único. Seleccionen su fecha y permítannos ayudarlos a organizar cada detalle desde hoy mismo.
              </p>
              
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User" 
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-400">
                  <span className="text-[#1A365D]">+500 parejas</span> ya eligieron su día
                </p>
              </div>
            </motion.div>
          </div>

          {/* Calendar Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-[48px] shadow-2xl shadow-gray-200/50 p-10 md:p-12 border border-white/50 relative">
              {/* Moon decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#FF4D6D] to-[#FF8FA3] rounded-[32px] rotate-12 flex items-center justify-center text-white shadow-xl shadow-[#FF4D6D]/30 border-4 border-white/50">
                <CalendarIcon size={32} strokeWidth={2.5} />
              </div>

              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-serif text-[#1A365D]">Abril</h3>
                  <p className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-[0.3em] mt-1">Dos mil veintiséis</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1A365D] hover:bg-[#FF4D6D] hover:text-white transition-all shadow-inner">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1A365D] hover:bg-[#FF4D6D] hover:text-white transition-all shadow-inner">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3 text-center mb-6">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                  <div key={day} className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">{day}</div>
                ))}
                
                {[...Array(startDay)].map((_, i) => (
                  <div key={`empty-${i}`} className="py-2" />
                ))}

                {days.map(day => {
                  const isSelected = day === 8;
                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDateSelect(day)}
                      className={`relative py-3 rounded-2xl text-xs font-black transition-all group ${
                        isSelected 
                        ? 'bg-[#FF4D6D] text-white shadow-lg shadow-[#FF4D6D]/40' 
                        : 'text-[#1A365D] hover:bg-slate-50'
                      }`}
                    >
                      {day}
                      {isSelected && (
                        <motion.div 
                          layoutId="selected"
                          className="absolute inset-0 border-2 border-white/40 rounded-2xl" 
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => handleDateSelect(8)}
                  className="w-full py-5 bg-[#1A365D] hover:bg-[#FF4D6D] text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:shadow-[#FF4D6D]/30"
                >
                  Confirmar Fecha Sugerida
                </button>
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                   Su aventura comienza aquí
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

