import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Provider } from '../types';
import { useAuth } from '../components/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Utensils, Music, PartyPopper, Flower2, Users, Tent, Car, Sparkles, Shirt, Volume2, Palette, Star, MapPin, Search } from 'lucide-react';

const CATEGORIES = [
  { id: 'Fotografía', label: 'Fotógrafos', icon: Camera },
  { id: 'Catering', label: 'Catering', icon: Utensils },
  { id: 'Música', label: 'DJ / Música', icon: Music },
  { id: 'Animación', label: 'Animadores', icon: PartyPopper },
  { id: 'Floristería', label: 'Floristería', icon: Flower2 },
  { id: 'Mesoneros', label: 'Mesoneros', icon: Users },
  { id: 'Festejos', label: 'Agencias', icon: Tent },
  { id: 'Coches', label: 'Coches', icon: Car },
  { id: 'Belleza', label: 'Estética', icon: Sparkles },
  { id: 'Trajes', label: 'Vestuario', icon: Shirt },
  { id: 'Sonido', label: 'Sonido', icon: Volume2 },
  { id: 'Decoración', label: 'Decoración', icon: Palette },
];

export default function ProvidersPublic() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [sending, setSending] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'providers'));
        setProviders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Provider)));
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const sendMessage = async () => {
    if (!user) {
      alert("Debes iniciar sesión para contactar con proveedores.");
      return;
    }
    if (!selectedProvider || !messageContent) return;
    
    setSending(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'messages'), {
        senderId: user.uid,
        receiverId: selectedProvider.userId || selectedProvider.id, // Vendor's user ID
        content: messageContent,
        timestamp: serverTimestamp(),
        read: false,
        relatedProviderId: selectedProvider.id
      });
      alert("¡Mensaje enviado! El proveedor te contactará pronto.");
      setMessageContent('');
      setShowContactForm(false);
    } catch (error) {
      console.error(error);
      alert("Error al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  };

  const filtered = providers.filter(p => {
    const matchesCat = !selectedCategory || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* High-End Modern Hero Section */}
      <section className="relative h-[90vh] w-full flex items-start justify-center overflow-hidden pt-56">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
            alt="Proveedores de Bodas"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#FF4D6D] text-white text-[9px] font-black uppercase tracking-[0.5em] mb-10 shadow-2xl">
              <Sparkles size={12} /> Excelencia Certificada
            </span>
            <h1 className="text-7xl md:text-[160px] font-serif font-light text-slate-900 leading-[0.8] mb-10 tracking-tighter">
              Gremio de <br />
              <span className="italic text-[#FF4D6D]">Expertos</span>
            </h1>
            <p className="text-slate-500 text-xl font-light italic max-w-2xl mx-auto">
              "Los artesanos que darán vida a vuestro 'Para Siempre' con precisión y pasión."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-40">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
           <button 
             onClick={() => setSelectedCategory(null)}
             className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
               !selectedCategory ? 'bg-[#FF4D6D] text-white shadow-xl' : 'bg-white text-gray-400 hover:bg-gray-100'
             }`}
           >
             Todos
           </button>
           {CATEGORIES.map(cat => (
             <button 
               key={cat.id}
               onClick={() => setSelectedCategory(cat.id)}
               className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                 selectedCategory === cat.id ? 'bg-[#1A365D] text-white shadow-xl' : 'bg-white text-gray-400 hover:bg-gray-100'
               }`}
             >
               <cat.icon size={16} />
               {cat.label}
             </button>
           ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-[#1A365D] border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
             <AnimatePresence mode='popLayout'>
               {filtered.length > 0 ? filtered.map((p, i) => (
                 <motion.div
                   key={p.id}
                   layout
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: i * 0.05 }}
                   className="group bg-white rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
                 >
                    <div className="relative h-64 overflow-hidden">
                       <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1A365D]">
                             {p.category}
                          </span>
                       </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <div className="flex justify-between items-start mb-4">
                          <h3 className="text-3xl font-serif italic text-slate-800 group-hover:text-[#FF4D6D] transition-colors">{p.name}</h3>
                          <div className="flex items-center gap-1 bg-[#FFF5F7] px-2 py-1 rounded-lg">
                             <Star size={14} className="text-yellow-400 fill-current" />
                             <span className="text-xs font-black text-[#FF4D6D]">{p.rating}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-gray-400 mb-6">
                          <MapPin size={16} />
                          <span className="text-sm font-bold">{p.location}</span>
                       </div>
                       <p className="text-gray-500 font-medium italic text-sm line-clamp-3 mb-8 flex-1">
                          {p.description || 'Este proveedor aún no ha proporcionado una descripción detallada, pero su trabajo habla por sí solo.'}
                       </p>
                        <button 
                          onClick={() => setSelectedProvider(p)}
                          className="w-full bg-[#1A365D] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl group-hover:bg-[#FF4D6D] transition-all"
                        >
                           Ver Portfolio
                        </button>
                    </div>
                 </motion.div>
               )) : (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="col-span-full py-20 text-center"
                 >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Search size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-black text-[#1A365D] mb-2">No encontramos coincidencias</h3>
                    <p className="text-gray-400 font-medium">Intenta limpiar los filtros o buscar otro término.</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        )}
      </div>

      {/* High-End Portfolio Modal (Alert Type) */}
      <AnimatePresence>
        {selectedProvider && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProvider(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[60px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedProvider(null)}
                 className="absolute top-8 right-8 z-50 bg-white/10 backdrop-blur text-white p-4 rounded-full hover:bg-white hover:text-slate-900 transition-all border border-white/20"
               >
                  <Search size={24} className="rotate-45" />
               </button>

               {/* Left: Visual Story */}
               <div className="w-full md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={selectedProvider.imageUrl} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt={selectedProvider.name}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                     <span className="bg-[#FF4D6D] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-2xl">
                        {selectedProvider.category}
                     </span>
                     <h2 className="text-5xl font-serif italic mb-2 leading-none">{selectedProvider.name}</h2>
                     <div className="flex items-center gap-4 text-white/70">
                        <div className="flex items-center gap-1">
                           <MapPin size={16} />
                           <span className="text-sm font-bold">{selectedProvider.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Star size={16} className="text-yellow-400 fill-current" />
                           <span className="text-sm font-black">{selectedProvider.rating} / 5</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right: Content & Action */}
               <div className="flex-1 overflow-y-auto p-12 md:p-20 custom-scrollbar bg-slate-50/50">
                  <div className="max-w-3xl space-y-16">
                     
                     {/* Story */}
                     <section>
                        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Sobre el Artista</h4>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                           "{selectedProvider.description || 'Estamos trabajando en completar la biografía de este profesional.'}"
                        </p>
                     </section>

                     {/* Packages */}
                     {selectedProvider.packages && selectedProvider.packages.length > 0 && (
                        <section>
                           <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Opciones de Inversión</h4>
                           <div className="grid gap-6">
                              {selectedProvider.packages.map((pkg, idx) => (
                                 <div key={idx} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-[#FF4D6D]/30 transition-all">
                                    <div>
                                       <h5 className="text-xl font-serif italic text-slate-800">{pkg.title}</h5>
                                       <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-2xl font-black text-[#1A365D] group-hover:text-[#FF4D6D] transition-colors">{pkg.price}€</span>
                                       <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Desde</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </section>
                     )}

                     {/* Gallery */}
                     {selectedProvider.gallery && selectedProvider.gallery.length > 0 && (
                        <section>
                           <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Muestra de Talento</h4>
                           <div className="grid grid-cols-2 gap-4">
                              {selectedProvider.gallery.map((img, idx) => (
                                 <motion.div 
                                   key={idx}
                                   whileHover={{ scale: 0.98 }}
                                   className="aspect-square rounded-[32px] overflow-hidden bg-white shadow-xl border-4 border-white"
                                 >
                                    <img src={img} className="w-full h-full object-cover" />
                                 </motion.div>
                              ))}
                           </div>
                        </section>
                     )}

                     {/* Contact / Action */}
                     <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row gap-6 items-center">
                        {!showContactForm ? (
                           <button 
                             onClick={() => setShowContactForm(true)}
                             className="w-full sm:flex-1 bg-[#1A365D] text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-[#FF4D6D] transition-all hover:scale-105 active:scale-95"
                           >
                              Solicitar Presupuesto
                           </button>
                        ) : (
                           <div className="w-full space-y-4">
                              <textarea 
                                value={messageContent}
                                onChange={e => setMessageContent(e.target.value)}
                                placeholder="Escribe tu consulta aquí..."
                                className="w-full bg-white border border-slate-200 rounded-2xl p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-[#FF4D6D] transition-all"
                              />
                              <div className="flex gap-4">
                                 <button 
                                   onClick={() => setShowContactForm(false)}
                                   className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                                 >
                                    Cancelar
                                 </button>
                                 <button 
                                   onClick={sendMessage}
                                   disabled={sending}
                                   className="flex-[2] bg-[#FF4D6D] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl disabled:opacity-50"
                                 >
                                    {sending ? 'Enviando...' : 'Enviar Mensaje'}
                                 </button>
                              </div>
                           </div>
                        )}
                        {!showContactForm && (
                          <div className="flex gap-4">
                             {selectedProvider.phone && (
                                <a href={`tel:${selectedProvider.phone}`} className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#FF4D6D] hover:shadow-xl transition-all border border-slate-100">
                                   <Users size={24} />
                                </a>
                             )}
                             <button className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#FF4D6D] hover:shadow-xl transition-all border border-slate-100">
                                 <Sparkles size={24} />
                             </button>
                          </div>
                        )}
                     </div>

                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
