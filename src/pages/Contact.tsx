import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      alert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Cinematic Contact Hero */}
      <section className="relative h-[90vh] w-full flex items-start justify-center overflow-hidden pt-56">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=2000" 
            alt="Contacto BodasOnline"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-[#FF4D6D] font-black text-[10px] uppercase tracking-[0.6em] mb-8 block">Atención Personalizada</span>
            <h1 className="text-8xl md:text-[180px] font-serif font-light text-slate-900 mb-8 italic leading-[0.75] tracking-tighter">Hablemos</h1>
            <p className="text-slate-600 font-light max-w-2xl mx-auto text-xl leading-relaxed italic">
              "Vuestra visión, nuestra misión. Estamos a un mensaje de distancia para hacer realidad lo extraordinario."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-32">
        <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden grid lg:grid-cols-5 border border-white">
          
          {/* Info Side */}
          <div className="lg:col-span-2 bg-[#1A365D] p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D6D] rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
             
             <div className="relative z-10 space-y-12">
                <div>
                   <h3 className="text-3xl font-serif italic mb-10">Canales Directos</h3>
                   <div className="space-y-8">
                      {[
                        { icon: Phone, label: 'Atención 24/7', value: '+34 900 123 456' },
                        { icon: Mail, label: 'Consultas Técnicas', value: 'hello@bodasonline.ai' },
                        { icon: MapPin, label: 'Oficinas Centrales', value: 'Calle de la Innovación 42, Madrid' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-center group">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF4D6D] transition-all">
                              <item.icon size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF4D6D]">{item.label}</p>
                              <p className="text-lg font-bold">{item.value}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-10">
                   <p className="text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-40">Síguenos en RRSS</p>
                   <div className="flex gap-4">
                      {[Instagram, Twitter, Facebook].map((Icon, i) => (
                        <button key={i} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1A365D] transition-all">
                           <Icon size={20} />
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-20 pt-10 border-t border-white/10 relative z-10">
                <p className="text-sm font-medium italic text-white/50">"Cada mensaje es el inicio de una nueva historia. No dudes en consultarnos cualquier detalle técnico o logístico."</p>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 p-12 md:p-16 bg-white">
             <div className="mb-12">
                <span className="text-[#FF4D6D] font-black text-xs uppercase tracking-widest">Formulario de Contacto</span>
                <h2 className="text-4xl font-serif italic text-slate-800 mt-2">Envíanos un mensaje</h2>
             </div>

             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Tu Nombre</label>
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-[#1A365D] focus:ring-2 focus:ring-[#4D8BFF]/20 outline-none transition-all" 
                        placeholder="Ej: Sofía García"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Tu Email</label>
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-[#1A365D] focus:ring-2 focus:ring-[#4D8BFF]/20 outline-none transition-all" 
                        placeholder="sofia@ejemplo.com"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Asunto de la Consulta</label>
                    <select 
                      value={formState.subject}
                      onChange={e => setFormState({...formState, subject: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-[#1A365D] focus:ring-2 focus:ring-[#4D8BFF]/20 outline-none transition-all"
                    >
                       <option value="">¿Cómo podemos ayudarte?</option>
                       <option value="Soporte Técnico">Soporte Técnico</option>
                       <option value="Publicidad/Partnerships">Publicidad / Ventas</option>
                       <option value="Dudas sobre mi Boda">Dudas sobre mi Boda</option>
                       <option value="Otros">Otros</option>
                    </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Mensaje</label>
                   <textarea 
                     required
                     rows={6} 
                     value={formState.message}
                     onChange={e => setFormState({...formState, message: e.target.value})}
                     className="w-full bg-slate-50 border-none rounded-3xl p-6 font-medium text-[#1A365D] focus:ring-2 focus:ring-[#4D8BFF]/20 outline-none transition-all" 
                     placeholder="Escribe aquí tus dudas o sugerencias..."
                   />
                </div>

                <button 
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#1A365D] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {sending ? 'ENVIANDO...' : (
                    <>
                      ENVIAR MENSAJE
                      <Send size={24} />
                    </>
                  )}
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
