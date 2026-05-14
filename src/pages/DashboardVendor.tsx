import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Provider, Message } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Phone, MessageSquare, Star, Save, Image as ImageIcon, LayoutDashboard, User, BarChart3, Clock, Plus, Trash2, Tag, Search, Mail } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function DashboardVendor() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Partial<Provider> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'messages' | 'packages' | 'gallery'>('overview');

  // Local state for new package/gallery item
  const [newPackage, setNewPackage] = useState({ title: '', price: 0, description: '' });
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Profile Completion Calculation
  const completion = (() => {
    if (!provider) return 0;
    const fields = ['name', 'description', 'phone', 'location', 'imageUrl'];
    const filled = fields.filter(f => !!(provider as any)[f]).length;
    const hasPackages = (provider.packages?.length || 0) > 0 ? 1 : 0;
    const hasGallery = (provider.gallery?.length || 0) > 0 ? 1 : 0;
    return Math.round(((filled + hasPackages + hasGallery) / (fields.length + 2)) * 100);
  })();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/');
      return;
    }
    if (userProfile?.role === 'couple') {
      navigate('/mi-boda');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const qProvider = query(collection(db, 'providers'), where('userId', '==', user.uid));
        const providerSnap = await getDocs(qProvider);
        
        if (providerSnap.empty) {
          const initialProvider = {
            userId: user.uid,
            name: user.displayName || 'Mi Negocio',
            category: 'Fotografía',
            location: 'Granada',
            description: '',
            phone: '',
            imageUrl: '/assets/images/unsplash-photo-1511795409834-ef04bbd61622.jpg',
            email: user.email || '',
            testimonials: [
              { user: "Laura & Javi", text: "Excelente servicio, superó nuestras expectativas." }
            ],
            gallery: [],
            packages: []
          };
          setProvider(initialProvider);
        } else {
          const pDoc = providerSnap.docs[0];
          const data = pDoc.data();
          setProvider({ 
            id: pDoc.id, 
            ...data,
            gallery: data.gallery || [],
            packages: data.packages || []
          });
        }

        const qMessages = query(collection(db, 'messages'), where('receiverId', '==', user.uid));
        const msgSnap = await getDocs(qMessages);
        setMessages(msgSnap.docs.map(d => ({ id: d.id, ...d.data() } as Message)));

      } catch (error) {
        handleFirestoreError(error, 'list', 'vendor-dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const saveProfile = async () => {
    if (!user || !provider) return;
    setSaving(true);
    try {
      if (provider.id) {
        await updateDoc(doc(db, 'providers', provider.id), provider);
      } else {
        const newDocRef = doc(collection(db, 'providers'));
        await setDoc(newDocRef, { ...provider, id: newDocRef.id, createdAt: serverTimestamp() });
        setProvider({ ...provider, id: newDocRef.id });
      }
      alert("¡Perfil profesional actualizado exitosamente!");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const addPackage = () => {
    if (!newPackage.title) return;
    const packs = [...(provider?.packages || []), newPackage];
    setProvider({ ...provider, packages: packs });
    setNewPackage({ title: '', price: 0, description: '' });
  };

  const removePackage = (index: number) => {
    const packs = provider?.packages?.filter((_, i) => i !== index);
    setProvider({ ...provider, packages: packs });
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl) return;
    const gal = [...(provider?.gallery || []), newGalleryUrl];
    setProvider({ ...provider, gallery: gal });
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    const gal = provider?.gallery?.filter((_, i) => i !== index);
    setProvider({ ...provider, gallery: gal });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'imageUrl' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'imageUrl') {
        setProvider({ ...provider, imageUrl: base64String });
      } else {
        const gal = [...(provider?.gallery || []), base64String];
        setProvider({ ...provider, gallery: gal });
      }
    };
    reader.readAsDataURL(file);
  };

  const sendReply = async () => {
    if (!user || !selectedMessage || !replyText) return;
    try {
      const msgRef = collection(db, 'messages');
      await setDoc(doc(msgRef), {
        senderId: user.uid,
        receiverId: selectedMessage.senderId,
        content: replyText,
        timestamp: serverTimestamp(),
        read: false,
        relatedProviderId: provider?.id || ''
      });
      alert("¡Respuesta enviada correctamente!");
      setReplyText('');
      setSelectedMessage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (msg: Message) => {
    if (msg.read) return;
    try {
      await updateDoc(doc(db, 'messages', msg.id), { read: true });
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-[#1A365D] border-t-transparent rounded-full" />
    </div>
  );

  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-blue-50/30 pt-48 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Romantic Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Background ambient ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4D8BFF]/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1A365D]/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-72 space-y-4 pt-32">
           <div className="bg-[#1A365D] p-8 rounded-[32px] text-white shadow-xl mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-2">Panel Profesional</p>
              <h2 className="text-xl font-serif italic truncate">{provider?.name}</h2>
           </div>

           <nav className="space-y-2">
              {[
                { id: 'overview', icon: LayoutDashboard, label: 'Resumen' },
                { id: 'profile', icon: User, label: 'Perfil' },
                { id: 'packages', icon: Tag, label: 'Paquetes' },
                { id: 'gallery', icon: ImageIcon, label: 'Galería' },
                { id: 'messages', icon: MessageSquare, label: 'Mensajes', badge: unreadMessages },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-[#1A365D] text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} />
                    {item.label}
                  </div>
                  {item.badge ? (
                    <span className="bg-[#FF4D6D] text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
           </nav>

           <div className="pt-10">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative group overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-full bg-[#4D8BFF]" />
                 <BarChart3 className="text-[#4D8BFF] mb-4" size={32} />
                 <p className="text-sm font-black text-[#1A365D] uppercase tracking-widest mb-2">Perfil: {completion}%</p>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${completion}%` }}
                      className="h-full bg-gradient-to-r from-[#4D8BFF] to-[#1A365D]"
                    />
                 </div>
                 <p className="text-[10px] text-slate-500 mt-4 font-medium italic">Completa tu información para atraer a más parejas.</p>
              </div>
           </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="ov" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-white p-8 rounded-[32px] shadow-sm border border-blue-100 flex flex-col justify-between hover:border-[#4D8BFF]/50 transition-all group overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Search size={100} className="text-[#4D8BFF]" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#4D8BFF]">Impacto Total</p>
                        <h4 className="text-4xl font-serif italic text-slate-800">1,248</h4>
                      </div>
                      <p className="text-[10px] text-[#4D8BFF] font-black mt-4 uppercase tracking-widest relative z-10 flex items-center gap-1">↑ 15% <span className="text-slate-400">vs mes anterior</span></p>
                   </div>

                   <div className="bg-white p-8 rounded-[32px] shadow-sm border border-blue-100 flex flex-col justify-between hover:border-[#4D8BFF]/50 transition-all group overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Star size={100} className="text-[#4D8BFF]" />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#4D8BFF]">Reputación</p>
                         <h4 className="text-4xl font-serif italic text-slate-800">4.9</h4>
                      </div>
                      <div className="flex gap-1 mt-4 relative z-10">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#4D8BFF] fill-current" />)}
                      </div>
                   </div>

                   <div className="bg-white p-8 rounded-[32px] shadow-sm border border-blue-100 flex flex-col justify-between hover:border-[#4D8BFF]/50 transition-all group overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <MessageSquare size={100} className="text-[#4D8BFF]" />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#4D8BFF]">Prospectos</p>
                         <h4 className="text-4xl font-serif italic text-slate-800">{messages.length}</h4>
                      </div>
                      <p className="text-[10px] text-[#4D8BFF] font-black mt-4 uppercase tracking-widest relative z-10">Nuevos contactos</p>
                   </div>

                   <div className="bg-white p-8 rounded-[32px] shadow-sm border border-blue-100 flex flex-col justify-between hover:border-[#4D8BFF]/50 transition-all group overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Tag size={100} className="text-[#4D8BFF]" />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#4D8BFF]">Paquetes</p>
                         <h4 className="text-4xl font-serif italic text-slate-800">{provider?.packages?.length || 0}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest relative z-10">Ofertas activas</p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                   <h3 className="text-3xl font-serif font-light text-slate-800 mb-8">Estado de tu Perfil</h3>
                   <div className="relative p-8 bg-slate-50 rounded-[32px] border border-slate-100 group transition-all hover:bg-white hover:shadow-2xl">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                          <img src={provider?.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                           <div className="flex items-center gap-3">
                              <h4 className="font-serif italic text-slate-800 text-3xl">{provider?.name}</h4>
                              <span className="bg-green-100 text-green-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Activo</span>
                           </div>
                           <p className="text-slate-500 font-medium italic">{provider?.category} • {provider?.location}</p>
                           <div className="flex gap-3 pt-2">
                              <span className="bg-[#4D8BFF]/10 text-[#4D8BFF] text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">Premium Vendor</span>
                              <span className="bg-[#FF4D6D]/10 text-[#FF4D6D] text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">Recomendado</span>
                           </div>
                        </div>
                      </div>
                      <div className="absolute top-8 right-8">
                         <Star className="text-yellow-400 animate-pulse" size={32} fill="currentColor" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                key="pr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white p-12 rounded-[50px] shadow-2xl border border-blue-50 space-y-12"
              >
                <div className="flex justify-between items-center bg-[#1A365D] -mx-12 -mt-12 p-12 border-b border-[#4D8BFF]/20 mb-12 shadow-inner">
                   <div>
                      <h2 className="text-4xl font-serif font-light text-white leading-none">Gestión Profesional</h2>
                      <p className="text-white/60 font-medium italic mt-1">Configuración técnica de vuestro catálogo de servicios.</p>
                   </div>
                   <button 
                      onClick={saveProfile} disabled={saving}
                      className="bg-[#4D8BFF] text-white px-10 py-4 rounded-3xl font-black flex items-center gap-3 hover:bg-[#3b7ae6] transition-all disabled:opacity-50 shadow-2xl shadow-[#4D8BFF]/20 active:scale-95 border border-white/20"
                    >
                      <Save size={24} />
                      {saving ? 'PROCESANDO...' : 'ACTUALIZAR PANEL'}
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Información de Negocio</label>
                        <div className="grid gap-4">
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-slate-400 pl-4 mb-1">Nombre Comercial</p>
                              <input type="text" value={provider?.name} onChange={e => setProvider({...provider, name: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-5 font-serif italic text-2xl text-slate-800 border-none outline-none focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all shadow-inner" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-slate-400 pl-4 mb-1">Gremio / Categoría</p>
                              <select value={provider?.category} onChange={e => setProvider({...provider, category: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-5 font-black text-[#1A365D] border-none outline-none shadow-inner">
                                <option value="Fotografía">Fotografía</option>
                                <option value="Catering">Catering</option>
                                <option value="Música">Música / DJ</option>
                                <option value="Animación">Animación</option>
                                <option value="Floristería">Floristería</option>
                                <option value="Mesoneros">Mesoneros</option>
                                <option value="Festejos">Agencia de Festejos</option>
                                <option value="Coches">Alquiler de Coches</option>
                                <option value="Belleza">Salón de Belleza</option>
                                <option value="Trajes">Trajes / Vestidos</option>
                                <option value="Sonido">Sonido</option>
                                <option value="Decoración">Decoración</option>
                                <option value="Otros">Otros</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Localización y Contacto</label>
                        <div className="grid gap-4">
                           <div className="relative group"><Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4D8BFF] transition-colors" size={20} /><input type="text" placeholder="Teléfono Público" value={provider?.phone} onChange={e => setProvider({...provider, phone: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-black text-[#1A365D] border-none outline-none shadow-inner focus:bg-white transition-all" /></div>
                           <div className="relative group"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4D8BFF] transition-colors" size={20} /><input type="email" placeholder="Email Corporativo" value={provider?.email} onChange={e => setProvider({...provider, email: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-black text-[#1A365D] border-none outline-none shadow-inner focus:bg-white transition-all" /></div>
                           <div className="relative group"><MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF4D6D] transition-colors" size={20} /><input type="text" placeholder="Dirección / Ciudad" value={provider?.location} onChange={e => setProvider({...provider, location: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-black text-[#1A365D] border-none outline-none shadow-inner focus:bg-white transition-all" /></div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Imagen de Portada</label>
                        <div className="relative group rounded-[40px] overflow-hidden aspect-[16/10] bg-slate-100 shadow-2xl border-4 border-white">
                           <img src={provider?.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                           <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Camera className="text-white" size={48} />
                              <p className="text-white font-black text-xs mt-4 uppercase tracking-widest">Subir Foto (JPG/PNG)</p>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, 'imageUrl')} 
                              />
                           </label>
                        </div>
                        <p className="text-[9px] text-slate-400 italic pl-4">También puedes pegar una URL directa abajo si lo prefieres.</p>
                        <input type="text" placeholder="URL de la imagen destacada" value={provider?.imageUrl} onChange={e => setProvider({...provider, imageUrl: e.target.value})} className="w-full mt-4 bg-slate-50 rounded-2xl p-4 text-[10px] text-slate-400 font-mono outline-none shadow-inner" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Vuestra Historia</label>
                        <textarea rows={6} value={provider?.description} onChange={e => setProvider({...provider, description: e.target.value})} className="w-full bg-slate-50 rounded-3xl p-6 font-medium text-[#1A365D] border-none outline-none focus:bg-white transition-all shadow-inner placeholder:italic" placeholder="Describid vuestro arte y por qué deberían elegiros..." />
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'packages' && (
               <motion.div 
               key="pk" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
               className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100 space-y-12"
             >
                <div className="flex justify-between items-start">
                   <div>
                      <h2 className="text-4xl font-serif font-light text-slate-800">Paquetes y Precios</h2>
                      <p className="text-slate-500 font-medium italic mt-1">Definid vuestras tarifas comerciales.</p>
                   </div>
                   <button onClick={saveProfile} className="bg-[#4D8BFF] text-white px-8 py-3 rounded-2xl font-black shadow-lg">SINCRONIZAR</button>
                </div>

                <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-6">
                   <h4 className="text-[#1A365D] font-black text-sm uppercase tracking-widest">Nuevo Paquete</h4>
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-slate-400 pl-4 uppercase mb-1">Título del Pack</p>
                         <input type="text" placeholder="Ej: Pack Boda Completa" value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} className="w-full bg-white rounded-2xl p-4 font-bold outline-none shadow-sm" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-slate-400 pl-4 uppercase mb-1">Precio (€)</p>
                         <input type="number" placeholder="Ej: 1500" value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: parseFloat(e.target.value)})} className="w-full bg-white rounded-2xl p-4 font-bold outline-none shadow-sm" />
                      </div>
                      <div className="space-y-1 lg:col-span-3">
                         <p className="text-[10px] font-black text-slate-400 pl-4 uppercase mb-1">Descripción de Servicios Incluidos</p>
                         <div className="flex gap-4">
                            <textarea value={newPackage.description} onChange={e => setNewPackage({...newPackage, description: e.target.value})} className="flex-1 bg-white rounded-2xl p-4 font-medium outline-none shadow-sm" placeholder="Resumen de lo que incluye..." />
                            <button onClick={addPackage} className="bg-[#1A365D] text-white p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Plus size={32} /></button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   {provider?.packages?.map((pkg, i) => (
                      <div key={i} className="bg-white p-8 rounded-[40px] border-2 border-slate-100 shadow-xl relative group">
                         <button onClick={() => removePackage(i)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center">
                               <h5 className="text-2xl font-serif italic text-slate-800">{pkg.title}</h5>
                               <span className="text-[#4D8BFF] font-black text-2xl">{pkg.price}€</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{pkg.description}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div 
              key="gl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100 space-y-12"
            >
               <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-serif font-light text-slate-800">Gallería de Arte</h2>
                    <p className="text-slate-500 font-medium italic mt-1">Vuestro portfolio visual.</p>
                  </div>
                  <button onClick={saveProfile} className="bg-[#FF4D6D] text-white px-8 py-3 rounded-2xl font-black shadow-lg">PUBLICAR GALERÍA</button>
               </div>

                <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Opción 1: Subir Archivo Local (JPG/PNG)</label>
                      <label className="flex items-center justify-center gap-3 w-full bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5 hover:border-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all cursor-pointer group">
                        <ImageIcon className="text-slate-300 group-hover:text-[#FF4D6D]" />
                        <span className="text-slate-500 font-bold group-hover:text-[#FF4D6D]">Seleccionar Imagen</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, 'gallery')} 
                        />
                      </label>
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Opción 2: Añadir por URL</label>
                      <div className="flex gap-4">
                        <input type="text" placeholder="Pega aquí la URL..." value={newGalleryUrl} onChange={e => setNewGalleryUrl(e.target.value)} className="flex-1 bg-white rounded-2xl p-5 font-bold outline-none shadow-sm" />
                        <button onClick={addGalleryImage} className="bg-[#1A365D] text-white p-5 rounded-2xl hover:scale-110 active:scale-95 transition-all"><Plus size={28} /></button>
                      </div>
                    </div>
                  </div>
                </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {provider?.gallery?.map((url, i) => (
                    <div key={i} className="relative group rounded-[32px] overflow-hidden aspect-square border-4 border-white shadow-xl bg-slate-50">
                       <img src={url} className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-500" />
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => removeGalleryImage(i)} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"><Trash2 size={24} /></button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div 
                key="msg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100 h-full min-h-[600px] flex flex-col"
              >
                <div className="flex items-center gap-6 mb-10 border-b border-slate-100 pb-10">
                   <div className="w-20 h-20 bg-[#4D8BFF] rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-[#4D8BFF]/20">
                      <MessageSquare size={40} />
                   </div>
                   <div>
                      <h3 className="text-4xl font-serif font-light text-slate-800">Gestión de Interés</h3>
                      <p className="text-slate-500 font-medium italic">Personas que quieren contar con vuestro talento.</p>
                   </div>
                </div>

                <div className="flex-1 space-y-6">
                  {messages.length > 0 ? messages.map(msg => (
                    <div key={msg.id} className={`p-8 rounded-[40px] border-4 transition-all cursor-pointer group flex flex-col items-start ${msg.read ? 'bg-slate-50 border-transparent' : 'bg-white border-[#4D8BFF] shadow-2xl'}`}>
                       <div className="flex justify-between w-full items-start mb-6">
                          <div className="space-y-1">
                             <span className="bg-[#4D8BFF]/10 text-[#4D8BFF] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Interés en vuestra Marca</span>
                             <p className="text-[10px] text-slate-400 font-bold ml-1">Recibido hoy</p>
                          </div>
                          {!msg.read && <div className="w-4 h-4 bg-[#FF4D6D] rounded-full animate-ping" />}
                       </div>
                       <p className="text-[#1A365D] font-medium leading-relaxed italic text-lg pr-12">"{msg.content}"</p>
                       <div className="flex justify-end w-full mt-8 gap-4">
                          {!msg.read && (
                            <button 
                              onClick={() => markAsRead(msg)}
                              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#4D8BFF] transition-colors"
                            >
                              Marcar como leído
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setSelectedMessage(msg);
                              markAsRead(msg);
                            }}
                            className="bg-[#1A365D] text-white px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-[#1A365D]/20 hover:scale-105 transition-transform active:scale-95"
                          >
                            RESPONDER AHORA
                          </button>
                       </div>
                    </div>
                  )) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 py-20">
                       <Clock size={100} className="mb-8" />
                       <p className="text-2xl font-black text-[#1A365D]">El silencio es el preámbulo del éxito</p>
                       <p className="text-slate-500 font-medium italic mt-2 text-lg text-center">Te avisaremos al instante cuando alguien se enamore de vuestro portfolio.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      {/* Reply Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white w-full max-w-xl rounded-[60px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#4D8BFF]/10 rounded-3xl flex items-center justify-center text-[#4D8BFF]">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                     <h3 className="text-3xl font-serif italic text-slate-800">Responder al Cliente</h3>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Comunicación Directa</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 mb-4">
                  <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Consulta del Cliente:</p>
                  <p className="text-[#1A365D] text-sm italic">"{selectedMessage.content}"</p>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Vuestra Respuesta</label>
                   <textarea 
                     rows={5}
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                     placeholder="Escribe aquí vuestra respuesta profesional..."
                     className="w-full bg-slate-50 border-none rounded-[32px] p-8 font-medium text-[#1A365D] focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-inner"
                   />
                </div>

                <div className="flex gap-4 pt-4">
                   <button 
                     onClick={() => setSelectedMessage(null)}
                     className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                   >
                     Cancelar
                   </button>
                   <button 
                     onClick={sendReply}
                     className="flex-[2] bg-[#1A365D] text-white py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-[#4D8BFF] transition-all shadow-xl"
                   >
                     Enviar Respuesta
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
