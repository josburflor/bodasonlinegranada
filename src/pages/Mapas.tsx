import { Search, MapPin, Star, Filter, Heart, Sparkles, Quote, MessageCircle } from 'lucide-react';
import { SPACES } from '@/src/constants';
import { motion } from 'framer-motion';

const LOCAL_PROVIDERS = [
  { id: 1, name: 'Floristería Albaicín', category: 'Flores', rating: 4.9, image: '/assets/images/unsplash-photo-1526047932273-341f2a7631f9.jpg' },
  { id: 2, name: 'Catering Nevada', category: 'Banquetes', rating: 4.8, image: '/assets/images/unsplash-photo-1555244162-803834f70033.jpg' },
  { id: 3, name: 'DJ Alhambra Beats', category: 'Música', rating: 5.0, image: '/assets/images/unsplash-photo-1470225620780-dba8ba36b745.jpg' },
];

const TESTIMONIALS = [
  { id: 1, user: 'Lucía & Carlos', comment: 'El espacio fue mágico, superó todas nuestras expectativas. ¡Granada tiene lugares increíbles!', date: 'Hace 2 semanas' },
  { id: 2, user: 'Miguel & Elena', comment: 'Contratamos a la floristería Albaicín y fue la mejor decisión. El trato fue impecable.', date: 'Hace 1 mes' },
];

export default function Mapas() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Seamless Modern Hero Section */}
      <section className="relative h-[100vh] w-full flex items-start justify-center overflow-hidden pt-64">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2000" 
            alt="Espacios con Alma"
            className="w-full h-full object-cover"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.5em] mb-10 shadow-2xl">
              <Sparkles size={14} className="text-[#FF4D6D]" /> Granada Histórica
            </span>
            <h1 className="text-8xl md:text-[160px] font-serif font-light text-slate-900 leading-[0.8] mb-10 tracking-tighter">
              Espacios con <br />
              <span className="italic text-[#FF4D6D]">Alma</span>
            </h1>
            <p className="text-slate-500 text-xl font-light italic max-w-2xl mx-auto">
              "Donde la piedra susurra historias de amor y la Alhambra es testigo de vuestra unión."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32 mt-32">
        
        {/* Interactive Experience Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Places List (Left Sidebar) */}
          <div className="lg:col-span-4 h-[700px] flex flex-col gap-6">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Resultados en la zona</h2>
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
              {SPACES.map((space, index) => (
                <motion.div 
                  key={space.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-[32px] shadow-sm border-2 border-gray-50 hover:border-[#FF4D6D]/20 hover:shadow-2xl hover:shadow-gray-200 transition-all cursor-pointer group"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                      <img
                        src={space.imageUrl}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h3 className="font-black text-[#1A365D] text-xs uppercase tracking-tight leading-tight group-hover:text-[#FF4D6D] transition-colors">{space.name}</h3>
                        <div className="flex items-center gap-1 text-gray-300 text-[10px] font-black uppercase tracking-widest mt-2">
                          <MapPin size={12} className="text-[#FF4D6D]" strokeWidth={3} />
                          <span>Granada</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-4">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] font-black text-[#1A365D]">{space.rating}</span>
                        </div>
                        <Heart size={16} className="text-gray-200 group-hover:text-[#FF4D6D] transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map View (Center/Right) */}
          <div className="lg:col-span-8 bg-white p-4 rounded-[48px] shadow-2xl shadow-gray-200 overflow-hidden relative">
            <div className="w-full h-[668px] bg-slate-100 rounded-[40px] relative overflow-hidden group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.966!2d-3.593!3d37.177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce13545b633%3A0x6734c5625c28262a!2sGranada!5e0!3m2!1ses!2ses!4v1715735000000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              
              {/* Luxury Floating UI Overlay over map */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF4D6D] rounded-full flex items-center justify-center text-white shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona Explorada</p>
                    <p className="text-sm font-serif italic text-slate-900">Centro Histórico & Albaicín</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Providers Cards Section */}
        <section className="pt-24 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#4D8BFF] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Red local</span>
              <h2 className="text-4xl font-serif text-slate-800 italic">Proveedores Destacados</h2>
            </div>
            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#FF4D6D] transition-colors border-b-2 border-transparent hover:border-[#FF4D6D] pb-1">
              Explorar directorio completo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {LOCAL_PROVIDERS.map((provider, index) => (
              <motion.div 
                key={provider.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-slate-50 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={provider.image} alt={provider.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#1A365D] uppercase tracking-widest shadow-lg">
                      {provider.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black text-[#1A365D] uppercase leading-tight group-hover:text-[#FF4D6D] transition-colors">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#FFD700]">
                      <Star size={16} className="fill-current" />
                      <span className="text-xs font-black text-gray-400">{provider.rating}</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-slate-50 text-[#1A365D] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#1A365D] hover:text-white transition-all">
                    Ver Perfil
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#1A365D] rounded-[60px] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF4D6D] rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 text-center mb-16">
            <Quote className="text-[#FF4D6D] mx-auto mb-6" size={40} />
            <h2 className="text-5xl md:text-6xl font-serif text-white leading-none mb-4 italic">
              Lo que dicen <br />nuestras parejas
            </h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Experiencias reales en Granada</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 relative z-10">
            {TESTIMONIALS.map((t, index) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-[#FF4D6D] mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-current" />)}
                  </div>
                  <p className="text-white text-lg font-medium italic leading-relaxed mb-8">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-white font-black uppercase text-xs tracking-tight">{t.user}</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{t.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

