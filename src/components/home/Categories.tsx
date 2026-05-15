import { Camera, Car, Music, Bus, PartyPopper, Utensils, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    { name: 'Fotógrafos', icon: Camera, color: '#FF4D6D', bg: 'bg-rose-50' },
    { name: 'Vehículos', icon: Car, color: '#4D8BFF', bg: 'bg-blue-50' },
    { name: 'Música', icon: Music, color: '#9F7AEA', bg: 'bg-purple-50' },
    { name: 'Transporte', icon: Bus, color: '#F6AD55', bg: 'bg-orange-50' },
    { name: 'Animación', icon: PartyPopper, color: '#48BB78', bg: 'bg-green-50' },
    { name: 'Banquetes', icon: Utensils, color: '#F687B3', bg: 'bg-pink-50' },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Dynamic Background Patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-[20deg] translate-x-1/4 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A365D_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 md:mb-28 gap-10 md:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8"
            >
              <span className="w-12 h-1 bg-[#FF4D6D] rounded-full" />
              <span className="text-[#FF4D6D] font-black text-[10px] md:text-[12px] uppercase tracking-[0.5em] leading-none">Wedding Planner</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-serif font-light text-slate-900 leading-[1.1] mb-4"
            >
              Disfruta <br />
              <span className="italic text-[#FF4D6D]">Organizando</span> <br />
              tu Boda
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="shrink-0 w-full lg:w-auto"
          >
            <Link 
              to="/proveedores"
              className="group relative flex items-center justify-center gap-6 md:gap-8 bg-[#1A365D] text-white px-10 md:px-16 py-6 md:py-10 rounded-[30px] md:rounded-[40px] font-black uppercase text-[12px] md:text-[14px] tracking-[0.3em] overflow-hidden transition-all hover:bg-[#FF4D6D] shadow-[0_30px_60px_-15px_rgba(26,54,93,0.3)] hover:shadow-[#FF4D6D]/40 active:scale-95"
            >
              <span className="relative z-10">Directorio VIP</span>
              <ArrowRight size={20} md:size={24} className="relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col items-center gap-6 p-8 rounded-[40px] border border-slate-100 hover:border-[#FF4D6D]/20 sublime-shadow transition-all bg-white"
            >
              <div className={`p-6 rounded-[28px] ${cat.bg} group-hover:bg-[#1A365D] transition-all duration-500`}>
                <cat.icon size={36} style={{ color: cat.color }} className="group-hover:!text-white transition-colors" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-black text-[#1A365D] uppercase tracking-widest group-hover:text-[#FF4D6D] transition-colors text-center">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
        
        {/* Removed extra section */}
      </div>
    </section>
  );
}
