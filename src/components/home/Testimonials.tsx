import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sofía & Alejandro",
    text: "Organizar nuestra boda en Granada fue un sueño gracias a esta plataforma. Encontramos el Carmen perfecto con vistas a la Alhambra en cuestión de días.",
    date: "Septiembre 2025",
    rating: 5,
    image: "/assets/images/unsplash-photo-1583939003579-730e3918a45a.jpg"
  },
  {
    id: 2,
    name: "Lucía & Manuel",
    text: "La elegancia de los proveedores sugeridos es insuperable. El fotógrafo captó cada detalle romántico de nuestra ceremonia en el Albaicín.",
    date: "Junio 2025",
    rating: 5,
    image: "/assets/images/unsplash-photo-1511795409834-ef04bbd61622.jpg"
  },
  {
    id: 3,
    name: "Elena & David",
    text: "Buscábamos algo moderno pero sutil, y el panel de control nos permitió gestionar todo el presupuesto sin perder la magia del proceso.",
    date: "Agosto 2025",
    rating: 5,
    image: "/assets/images/unsplash-photo-1519741497674-611481863552.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Soft romantic gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF4D6D]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4D8BFF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF4D6D] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block"
          >
            Historias Reales
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-slate-900 leading-none mb-6 italic"
          >
            Nuestras Parejas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-light text-lg max-w-2xl mx-auto"
          >
            Momentos inolvidables creados con amor y dedicación en el corazón de Granada.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] border border-slate-50 sublime-shadow relative group"
            >
              <Quote className="absolute top-8 right-8 text-[#FF4D6D]/10" size={60} strokeWidth={1} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-600 font-light leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-2xl object-cover ring-4 ring-[#FF4D6D]/5"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-serif italic text-slate-800">{t.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
