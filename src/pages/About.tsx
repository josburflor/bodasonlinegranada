import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Zap, Code, Rocket } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Bodas Realizadas', value: '1,200+' },
    { label: 'Proveedores Activos', value: '500+' },
    { label: 'Parejas Felices', value: '2,500+' },
    { label: 'Años de Innovación', value: '5' },
  ];

  const values = [
    {
      title: "Pasión por el Detalle",
      description: "Entendemos que en una boda cada segundo cuenta. Nuestra plataforma está diseñada para que la perfección sea el estándar, no la excepción.",
      icon: Heart,
      color: "#FF4D6D"
    },
    {
      title: "Tecnología Especialista",
      description: "Utilizamos algoritmos avanzados para conectar a las parejas con los proveedores que realmente encajan con su ADN y presupuesto.",
      icon: Code,
      color: "#1A365D"
    },
    {
      title: "Transparencia Total",
      description: "Sin letras pequeñas. Precios claros, reseñas verificadas y una gestión de presupuestos que nunca miente.",
      icon: ShieldCheck,
      color: "#4D8BFF"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Modern Hero Section */}
      <section className="relative h-[100vh] w-full flex items-start justify-center overflow-hidden pt-56">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/unsplash-photo-1519741497674-611481863552.jpg" 
            alt="Nuestra Esencia"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-white" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-center px-6 max-w-6xl"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#FF4D6D] font-black text-[11px] uppercase tracking-[0.6em] mb-10 block"
          >
            Pasión por Granada
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-8xl md:text-[180px] font-serif font-light text-slate-900 mb-12 tracking-tighter leading-[0.75]"
          >
            Nuestra <br /> <span className="text-[#FF4D6D] italic">Esencia</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16"
          >
            <p className="text-slate-500 text-xl font-light italic max-w-xl leading-relaxed">
              "Donde la precisión técnica se funde con la calidez del Albaicín para crear momentos irrepetibles."
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl md:text-6xl font-serif italic text-[#1A365D] mb-2">{stat.value}</p>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section - The "Ingenio Programador" part */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-[#FF4D6D]/10 text-[#FF4D6D] px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block">Nuestra Misión</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-slate-900 leading-[1.1] mb-10">
              Donde la Lógica se Encuentra con la <span className="italic text-[#4D8BFF]">Emoción</span>
            </h2>
            <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed">
              <p>
                En <span className="text-[#1A365D] font-bold">BodasOnline</span>, no solo construimos una plataforma; creamos un ecosistema donde cada proveedor y cada pareja operan en perfecta sintonía.
              </p>
              <p>
                Creemos que la planificación de una boda no debería ser un laberinto de correos y hojas de cálculo. Nuestro enfoque se basa en la <strong>optimización de flujos de trabajo</strong> aplicado a la vida real.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="w-12 h-12 bg-[#1A365D] rounded-2xl flex items-center justify-center text-white">
                  <Zap size={24} />
                </div>
                <p className="text-sm text-gray-500 italic">
                  "Nuestra arquitectura está diseñada para escalar con vuestros sueños, desde una ceremonia íntima hasta un evento de gala."
                </p>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FF4D6D]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#4D8BFF]/10 rounded-full blur-3xl" />
            <div className="grid gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 10 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 flex gap-6 items-start"
                >
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: `${value.color}15`, color: value.color }}>
                    <value.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif italic text-slate-800 mb-2">{value.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message / Specialist Touch */}
      <section className="bg-[#1A365D] py-32 text-center overflow-hidden relative">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" 
         />
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Sparkles className="text-[#FF4D6D] mx-auto mb-10" size={48} />
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-10 italic leading-snug">
              "No somos solo programadores. Somos los arquitectos de vuestro primer día como familia."
            </h3>
            <div className="w-16 h-1 bg-[#FF4D6D] mx-auto mb-6" />
            <p className="text-white font-black uppercase tracking-widest">El Equipo de BodasOnline</p>
         </div>
      </section>
    </div>
  );
}
