import { ChevronLeft, ChevronRight, Share2, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TEAM_MEMBERS = [
  {
    name: "Maria Sosa",
    role: "Directora",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    color: "#4D8BFF"
  },
  {
    name: "Juan Rodríguez",
    role: "Coordinador",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    color: "#FF4D6D"
  },
  {
    name: "Elena Martínez",
    role: "Especialista",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    color: "#4D8BFF"
  }
];

export default function Team() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % TEAM_MEMBERS.length);
  const prev = () => setIndex((index - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);

  return (
    <section className="py-32 bg-gray-50 overflow-hidden relative">
      {/* Background Large Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none">
        <h2 className="text-[12vw] font-serif italic text-slate-900 opacity-[0.03] whitespace-nowrap text-center leading-none">
            THE DREAM TEAM
          </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h2 className="text-[#FF4D6D] font-bold tracking-[0.2em] text-xs md:text-sm uppercase">Nuestra Gente</h2>
          <h3 className="text-4xl md:text-7xl font-serif text-slate-900 leading-tight">Mentes Brillantes detrás</h3>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Main Card Container */}
          <div className="w-full max-w-4xl relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="grid md:grid-cols-2 gap-0 bg-white rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-full"
              >
                {/* Photo Side */}
                <div className="relative h-[300px] md:h-[600px] overflow-hidden">
                  <img 
                    src={TEAM_MEMBERS[index].image} 
                    alt={TEAM_MEMBERS[index].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-multiply"
                    style={{ backgroundColor: TEAM_MEMBERS[index].color }}
                  />
                  
                  {/* Social Badge */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {[Instagram, Twitter, Share2].map((Icon, i) => (
                      <button key={i} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Side */}
                <div className="p-10 md:p-20 flex flex-col justify-center space-y-6 md:space-y-8 relative overflow-hidden group">
                  <div 
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.05] transition-colors duration-500"
                    style={{ backgroundColor: TEAM_MEMBERS[index].color }}
                  />
                  
                  <div className="space-y-3">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 
                        className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase mb-2 md:mb-4"
                        style={{ color: TEAM_MEMBERS[index].color }}
                      >
                        {TEAM_MEMBERS[index].role}
                      </h4>
                      <h3 className="text-4xl md:text-7xl font-serif text-slate-900 leading-none">
                        {TEAM_MEMBERS[index].name.split(' ')[0]} <br />
                        <span className="opacity-20 italic">{TEAM_MEMBERS[index].name.split(' ').slice(1).join(' ')}</span>
                      </h3>
                    </motion.div>
                  </div>

                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none"
                  >
                    Expertos en crear momentos inolvidables con más de 8 años de trayectoria en el sector nupcial granadino.
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button 
                      className="inline-flex items-center gap-4 text-white font-black uppercase text-[10px] md:text-xs py-4 md:py-5 px-8 md:px-10 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: TEAM_MEMBERS[index].color }}
                    >
                      Conectar ahora
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls - Responsive positioning */}
            <div className="absolute -bottom-16 md:bottom-auto md:left-0 lg:left-[-60px] md:top-1/2 md:-translate-y-1/2 z-30 flex md:block gap-4">
              <button 
                onClick={prev}
                className="p-4 md:p-5 rounded-full bg-white text-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all shadow-xl group active:scale-95 border border-slate-100"
              >
                <ChevronLeft size={24} md:size={32} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="md:hidden">
                <button 
                  onClick={next}
                  className="p-4 md:p-5 rounded-full bg-white text-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all shadow-xl group active:scale-95 border border-slate-100"
                >
                  <ChevronRight size={24} md:size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="hidden md:block absolute right-0 lg:right-[-60px] top-1/2 -translate-y-1/2 z-30">
              <button 
                onClick={next}
                className="p-5 rounded-full bg-white text-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all shadow-xl group active:scale-95 border border-slate-100"
              >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-4 mt-20">
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: index === i ? '48px' : '12px',
                backgroundColor: index === i ? '#1A365D' : '#D1D5DB'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
