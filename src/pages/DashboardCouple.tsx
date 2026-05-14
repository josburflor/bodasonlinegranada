import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { Wedding, Message, Provider } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Calendar, Search, MessageSquare, Plus, Check, Clock, Heart, Settings, Star, MapPin, Camera, Utensils, Music, PartyPopper, Flower2, Users, Tent, Car, Sparkles, Shirt, Volume2, Palette, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import { useNavigate } from 'react-router-dom';

export default function DashboardCouple() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [targetAvailable, setTargetAvailable] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wedding' | 'profile'>('wedding');
  
  // Profile Editing State
  const [profileData, setProfileData] = useState({
    displayName: '',
    photoURL: '',
    date: '',
    religion: '',
    weddingColor: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);
  
  // Guest and Milestone State
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: '', side: 'mutual' as any, status: 'pending' as any });
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      if (!wedding?.date) return;
      const eventDate = new Date(wedding.date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [wedding?.date]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
      return;
    }
    if (userProfile?.role === 'vendor') {
      navigate('/panel-proveedor');
      return;
    }

    const fetchData = async () => {
      try {
        const qWedding = query(collection(db, 'weddings'), where('ownerId', '==', user.uid));
        const weddingSnap = await getDocs(qWedding);
        
        let currentWedding: Wedding | null = null;
        if (weddingSnap.empty) {
          const pendingDate = localStorage.getItem('pendingWeddingDate');
          const newWedding: Omit<Wedding, 'id'> = {
            ownerId: user.uid,
            date: pendingDate || '2026-12-31',
            status: 'planning',
            budget: 20000,
            spent: 0,
            updatedAt: serverTimestamp()
          };
          const docRef = await addDoc(collection(db, 'weddings'), newWedding);
          currentWedding = { id: docRef.id, ...newWedding } as Wedding;
          setWedding(currentWedding);
          localStorage.removeItem('pendingWeddingDate');
        } else {
          const wDoc = weddingSnap.docs[0];
          currentWedding = { id: wDoc.id, ...wDoc.data() } as Wedding;
          setWedding(currentWedding);
        }

        // Set initial profile state
        setProfileData({
          displayName: userProfile?.displayName || '',
          photoURL: userProfile?.photoURL || '',
          date: currentWedding?.date || '',
          religion: currentWedding?.religion || '',
          weddingColor: currentWedding?.weddingColor || ''
        });

        const qMessages = query(collection(db, 'messages'), where('receiverId', '==', user.uid));
        const msgSnap = await getDocs(qMessages);
        setMessages(msgSnap.docs.map(d => ({ id: d.id, ...d.data() } as Message)));

        const providerSnap = await getDocs(collection(db, 'providers'));
        setProviders(providerSnap.docs.map(d => ({ id: d.id, ...d.data() } as Provider)));

      } catch (error) {
        handleFirestoreError(error, 'list', 'dashboard');
      }
    };

    fetchData();
  }, [user, userProfile]);

  const updateBudget = async (type: 'total' | 'available') => {
    if (!wedding) return;
    try {
      let finalBudget = wedding.budget;
      if (type === 'total' && newBudget) {
        finalBudget = parseFloat(newBudget);
      } else if (type === 'available' && targetAvailable) {
        finalBudget = (wedding.spent || 0) + parseFloat(targetAvailable);
      } else {
        return;
      }

      await updateDoc(doc(db, 'weddings', wedding.id), { budget: finalBudget });
      setWedding({ ...wedding, budget: finalBudget });
      setNewBudget('');
      setTargetAvailable('');
      alert('Presupuesto actualizado correctamente');
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfileChanges = async () => {
    if (!user || !wedding) return;
    setSavingProfile(true);
    try {
      // 1. Update User Profile
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL
      });

      // 2. Update Wedding Details
      await updateDoc(doc(db, 'weddings', wedding.id), {
        date: profileData.date,
        religion: profileData.religion,
        weddingColor: profileData.weddingColor
      });

      setWedding({
        ...wedding,
        date: profileData.date,
        religion: profileData.religion,
        weddingColor: profileData.weddingColor
      });

      alert('Perfil y detalles de boda actualizados');
    } catch (error) {
      console.error(error);
    } finally {
      setSavingProfile(false);
    }
  };

  const hireProvider = async (provider: Provider) => {
    if (!wedding) return;
    
    // Choose the first package price or a default cost
    const cost = provider.packages?.[0]?.price || 1500;
    
    const newService = {
      id: Math.random().toString(36).substr(2, 9),
      providerId: provider.id,
      providerName: provider.name,
      category: provider.category,
      cost: cost,
      date: serverTimestamp()
    };

    const currentServices = wedding.contractedServices || [];
    
    // Check if already hired
    if (currentServices.find(s => s.providerId === provider.id)) {
      alert('Ya has contratado a este proveedor.');
      return;
    }

    const newServices = [...currentServices, newService];
    const newSpent = newServices.reduce((acc, s) => acc + s.cost, 0);
    
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { 
        contractedServices: newServices,
        spent: newSpent 
      });
      setWedding({ ...wedding, contractedServices: newServices, spent: newSpent });
      alert(`¡Felicidades! Has cerrado contrato con ${provider.name} por ${cost}€. Su presupuesto se ha actualizado.`);
    } catch (error) {
      console.error(error);
    }
  };

  const removeService = async (serviceId: string) => {
    if (!wedding || !wedding.contractedServices) return;
    const newServices = wedding.contractedServices.filter(s => s.id !== serviceId);
    const newSpent = newServices.reduce((acc, s) => acc + s.cost, 0);
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { 
        contractedServices: newServices,
        spent: newSpent 
      });
      setWedding({ ...wedding, contractedServices: newServices, spent: newSpent });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMilestone = async (id: number) => {
    if (!wedding) return;
    const currentCompleted = wedding.completedMilestones || [];
    const newCompleted = currentCompleted.includes(id) 
      ? currentCompleted.filter(mId => mId !== id)
      : [...currentCompleted, id];
    
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { completedMilestones: newCompleted });
      setWedding({ ...wedding, completedMilestones: newCompleted });
    } catch (error) {
      console.error(error);
    }
  };

  const addGuest = async () => {
    if (!wedding || !newGuest.name) return;
    const guestObj = {
      id: Math.random().toString(36).substr(2, 9),
      ...newGuest
    };
    const newGuests = [...(wedding.guests || []), guestObj];
    
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { guests: newGuests });
      setWedding({ ...wedding, guests: newGuests });
      setNewGuest({ name: '', side: 'mutual', status: 'pending' });
      setShowGuestModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGuest = async (id: string) => {
    if (!wedding || !wedding.guests) return;
    if (!window.confirm("¿Seguro que deseas eliminar a este invitado?")) return;
    const newGuests = wedding.guests.filter(g => g.id !== id);
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { guests: newGuests });
      setWedding({ ...wedding, guests: newGuests });
    } catch (error) {
      console.error(error);
    }
  };

  const updateGuestStatus = async (guestId: string, status: 'pending' | 'confirmed' | 'declined') => {
    if (!wedding || !wedding.guests) return;
    const newGuests = wedding.guests.map(g => g.id === guestId ? { ...g, status } : g);
    try {
      await updateDoc(doc(db, 'weddings', wedding.id), { guests: newGuests });
      setWedding({ ...wedding, guests: newGuests });
    } catch (error) {
      console.error(error);
    }
  };

  const markMessageAsRead = async (message: Message) => {
    if (!user || message.read) {
      setSelectedMessage(message);
      return;
    }
    try {
      await updateDoc(doc(db, 'messages', message.id), { read: true });
      setMessages(messages.map(m => m.id === message.id ? { ...m, read: true } : m));
      setSelectedMessage({ ...message, read: true });
    } catch (error) {
      console.error(error);
    }
  };

  const formatWeddingDate = () => {
    if (!wedding?.date) return 'Sin fecha';
    try {
      const [year, month, day] = wedding.date.split('-');
      if (year && month && day) return `${day}/${month}/${year}`;
      return wedding.date;
    } catch {
      return wedding.date;
    }
  };

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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

  const MILESTONES = [
    { id: 1, title: 'El Gran Paso', desc: 'Definir presupuesto y estilo', time: '12 meses', done: true },
    { id: 2, title: 'El Escenario', desc: 'Reservar lugar y catering', time: '10 meses', done: true },
    { id: 3, title: 'Vuestro Equipo', desc: 'Fotógrafo, música y deco', time: '8 meses', done: false },
    { id: 4, title: 'El Atuendo', desc: 'Vestido y traje listos', time: '6 meses', done: false },
    { id: 5, title: 'La Invitación', desc: 'Enviar y gestionar RSVPs', time: '4 meses', done: false },
    { id: 6, title: 'Detalles Finales', desc: 'Pruebas de menú y flores', time: '2 meses', done: false },
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="w-16 h-16 border-4 border-[#FF4D6D] border-t-transparent rounded-full shadow-2xl" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] pt-48 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Romantic Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale brightness-50 z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Decorative floral elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF4D6D]/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4D8BFF]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setActiveTab('wedding')}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 ${activeTab === 'wedding' ? 'bg-[#FF4D6D] text-white scale-105' : 'bg-white text-gray-400'}`}
          >
            <Heart size={18} className={activeTab === 'wedding' ? 'fill-current' : ''} />
            Mi Boda
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 ${activeTab === 'profile' ? 'bg-[#1A365D] text-white scale-105' : 'bg-white text-gray-400'}`}
          >
            <Settings size={18} />
            Mi Perfil
          </button>
          <button 
            onClick={() => {
              if (window.confirm("¿Deseas cambiar tu perfil a Profesional/Proveedor?")) {
                signIn('vendor', true);
              }
            }}
            className="bg-white/50 text-[#1A365D] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-50 transition-all"
          >
            Modo Profesional
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'wedding' ? (
            <motion.div 
              key="wedding-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Top Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                  <h1 className="text-6xl font-serif font-light text-slate-900 leading-none">Panel de <span className="italic text-[#FF4D6D]">Me Caso</span></h1>
                  <p className="text-gray-500 font-medium italic text-lg">Haciendo realidad vuestros sueños...</p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-[40px] shadow-[0_20px_50px_rgba(255,77,109,0.15)] border-2 border-white flex items-center gap-8"
                >
                  <div className="flex gap-4">
                    {[
                      { val: timeLeft.days, label: 'DÍAS' },
                      { val: timeLeft.hours, label: 'HORAS' },
                      { val: timeLeft.mins, label: 'MIN' }
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="text-3xl font-black text-[#1A365D] tabular-nums leading-none">{item.val}</p>
                        <p className="text-[8px] font-black text-[#FF4D6D] tracking-widest mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-10 w-px bg-slate-100" />
                  <div>
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Faltan para el</p>
                    <p className="text-xl font-black text-[#1A365D] whitespace-nowrap">{formatWeddingDate()}</p>
                  </div>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Budget Widget - Romantic Style */}
                <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-white space-y-8 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF4D6D]/5 rounded-full" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4D8BFF]/10 rounded-2xl flex items-center justify-center text-[#4D8BFF]">
                      <Wallet size={24} />
                    </div>
                    <h3 className="text-3xl font-serif italic text-slate-800">Presupuesto</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm font-black">
                        <span className="text-gray-400 uppercase tracking-widest">Calculado</span>
                        <span className="text-[#1A365D]">{wedding?.budget?.toLocaleString()}€</span>
                      </div>
                      <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden p-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${((wedding?.spent || 0) / (wedding?.budget || 1)) * 100}%` }}
                          className="bg-gradient-to-r from-[#4D8BFF] to-[#73a5ff] h-full rounded-full" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-3xl">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Disponible</p>
                        <p className="text-lg font-black text-[#1A365D]">{( (wedding?.budget || 0) - (wedding?.spent || 0) ).toLocaleString()}€</p>
                      </div>
                      <div className="bg-[#FF4D6D]/5 p-4 rounded-3xl">
                        <p className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest mb-1">Gastado</p>
                        <p className="text-lg font-black text-[#FF4D6D]">{wedding?.spent?.toLocaleString()}€</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Presupuesto Total</label>
                        <div className="flex gap-3">
                          <input 
                            type="number" 
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            placeholder="Ej: 30000"
                            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-3 font-bold text-[#1A365D] focus:ring-2 focus:ring-[#FF4D6D]/20 outline-none"
                          />
                          <button 
                            onClick={() => updateBudget('total')} 
                            className="bg-[#1A365D] text-white p-3 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                          >
                            <Check size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#4D8BFF] uppercase tracking-widest italic">Ajustar por Disponible</label>
                        <div className="flex gap-3">
                          <input 
                            type="number" 
                            value={targetAvailable}
                            onChange={(e) => setTargetAvailable(e.target.value)}
                            placeholder="Ej: 15000"
                            className="flex-1 bg-[#4D8BFF]/5 border-none rounded-2xl px-6 py-3 font-bold text-[#1A365D] focus:ring-2 focus:ring-[#4D8BFF]/20 outline-none"
                          />
                          <button 
                            onClick={() => updateBudget('available')} 
                            className="bg-[#4D8BFF] text-white p-3 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                          >
                            <Check size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages - Interactive Style */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[50px] shadow-2xl border border-white flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                     <Heart className="text-[#FF4D6D]/10" size={80} />
                  </div>
                  
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FF4D6D]/10 rounded-2xl flex items-center justify-center text-[#FF4D6D]">
                        <MessageSquare size={24} />
                      </div>
                      <h3 className="text-3xl font-serif italic text-slate-800">Respuestas de Proveedores</h3>
                    </div>
                    <span className="bg-[#FF4D6D] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                      {messages.filter(m => !m.read).length} NUEVOS
                    </span>
                  </div>
                  
                    <div className="flex-1 overflow-y-auto max-h-[350px] space-y-4 pr-4 custom-scrollbar">
                      {wedding?.contractedServices && wedding.contractedServices.length > 0 ? (
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-[#4D8BFF] uppercase tracking-widest mb-4">Servicios Cerrados</p>
                          {wedding.contractedServices.map(service => (
                            <motion.div 
                              key={service.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="bg-white border-2 border-gray-100 p-6 rounded-[32px] flex items-center justify-between group hover:border-[#FF4D6D]/30 transition-all shadow-sm"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#FF4D6D]/10 rounded-xl flex items-center justify-center text-[#FF4D6D]">
                                  {CATEGORIES.find(c => c.id === service.category)?.icon ? 
                                    (CATEGORIES.find(c => c.id === service.category) as any).icon({ size: 20 }) : 
                                    <Sparkles size={20} />
                                  }
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-[#1A365D] uppercase tracking-tight">{service.providerName}</h4>
                                  <p className="text-[10px] text-gray-400 font-bold">{service.category}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-[#FF4D6D]">{service.cost.toLocaleString()}€</p>
                                <button 
                                  onClick={() => removeService(service.id)}
                                  className="text-[10px] text-gray-300 hover:text-red-400 font-bold uppercase transition-colors"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-300 italic min-h-[200px]">
                          <Clock size={60} className="mb-4 opacity-10" />
                          <p className="text-lg">No hay servicios contratados aún...</p>
                        </div>
                      )}

                      <div className="pt-8 border-t border-gray-100 my-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mensajes Recibidos</p>
                      </div>

                      {messages.length > 0 ? messages.map(msg => (
                      <motion.div 
                        key={msg.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`p-6 rounded-[32px] border-l-8 transition-all hover:scale-[1.01] ${msg.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-[#FF4D6D] shadow-md'}`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-[#1A365D] font-medium leading-relaxed line-clamp-2">{msg.content}</p>
                          <button 
                            onClick={() => markMessageAsRead(msg)}
                            className={`text-xs font-black px-4 py-2 rounded-full transition-all ${msg.read ? 'text-[#4D8BFF] hover:bg-[#4D8BFF]/5' : 'bg-[#FF4D6D] text-white shadow-lg hover:bg-pink-600'}`}
                          >
                            {msg.read ? 'LEER' : 'NUEVO'}
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest flex items-center gap-2">
                           <Clock size={10} />
                           {msg.timestamp ? formatDistanceToNow(msg.timestamp instanceof Date ? msg.timestamp : (msg.timestamp as any).toDate(), { addSuffix: true, locale: es }) : 'Recientemente'}
                        </p>
                      </motion.div>
                    )) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-300 italic min-h-[200px]">
                        <Clock size={60} className="mb-4 opacity-10" />
                        <p className="text-lg">Esperando respuestas mágicas...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* NEW: Guest Summary & Roadmap Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Guest Summary Widget */}
                <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-white space-y-8 relative overflow-hidden group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                      <Users size={24} />
                    </div>
                    <h3 className="text-3xl font-serif italic text-slate-800">Invitados</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-5xl font-black text-[#1A365D]">{wedding?.guests?.length || 0}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total previstos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-green-500">
                          {wedding?.guests?.filter(g => g.status === 'confirmed').length || 0}
                        </p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirmados</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden flex">
                      <div className="bg-green-500 h-full" style={{ width: `${((wedding?.guests?.filter(g => g.status === 'confirmed').length || 0) / (wedding?.guests?.length || 1)) * 100}%` }} />
                      <div className="bg-yellow-400 h-full" style={{ width: `${((wedding?.guests?.filter(g => g.status === 'pending').length || 0) / (wedding?.guests?.length || 1)) * 100}%` }} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                       {wedding?.guests?.slice(0, 4).map(g => (
                         <div key={g.id} className="flex justify-between items-center text-[8px] font-bold text-gray-500 bg-slate-50 px-3 py-2 rounded-xl group/item">
                           <span className="truncate max-w-[60px]">{g.name}</span>
                           <div className="flex gap-1">
                              <button 
                                onClick={() => updateGuestStatus(g.id, 'confirmed')}
                                className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${g.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-green-100'}`}
                              >
                                <Check size={8} />
                              </button>
                              <button 
                                onClick={() => deleteGuest(g.id)}
                                className="w-4 h-4 bg-gray-100 text-gray-300 rounded-md flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-all opacity-0 group-hover/item:opacity-100"
                              >
                                <Plus size={8} className="rotate-45" />
                              </button>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowGuestModal(true)}
                    className="w-full py-4 bg-[#FF4D6D]/10 text-[#FF4D6D] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm"
                  >
                    + Gestionar Invitados
                  </button>
                </div>

                {/* Roadmap / Timeline Widget */}
                <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[50px] shadow-2xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles size={120} />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-3xl font-serif italic">Camino al "Sí, Quiero"</h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {MILESTONES.map((m) => {
                      const isDone = wedding?.completedMilestones?.includes(m.id);
                      return (
                        <div 
                          key={m.id} 
                          onClick={() => toggleMilestone(m.id)}
                          className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer ${isDone ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 opacity-50 hover:opacity-100'}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">{m.time}</span>
                            {isDone && <Check size={14} className="text-green-400" />}
                          </div>
                          <h4 className="text-sm font-black uppercase tracking-tight mb-1">{m.title}</h4>
                          <p className="text-[10px] text-white/50 leading-relaxed">{m.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Providers Explorer */}
              <div className="space-y-10 pt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <h2 className="text-5xl font-serif font-light text-slate-900 leading-none">Busca tu <span className="italic text-[#4D8BFF]">Dream Team</span></h2>
                  <div className="relative w-full max-w-xl">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4D8BFF]" size={24} />
                    <input 
                      type="text" 
                      placeholder="¿Qué servicio buscas? (Fotógrafos, catering...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border-none rounded-full py-6 pl-16 pr-8 shadow-2xl text-lg font-medium text-[#1A365D] outline-none placeholder:text-gray-300 focus:ring-4 focus:ring-[#4D8BFF]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={`p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all shadow-xl border-2 ${
                        selectedCategory === cat.id 
                          ? 'bg-[#FF4D6D] border-[#FF4D6D] text-white shadow-[#FF4D6D]/30' 
                          : 'bg-white border-white text-[#1A365D] hover:border-[#FF4D6D]/20'
                      }`}
                    >
                      <cat.icon size={32} strokeWidth={selectedCategory === cat.id ? 2.5 : 1.5} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredProviders.map(p => (
                    <motion.div 
                      key={p.id}
                      whileHover={{ y: -15 }}
                      className="bg-white rounded-[50px] overflow-hidden shadow-2xl border border-white group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                          <span className="bg-[#4D8BFF] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                            {p.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <h4 className="text-2xl font-serif italic text-slate-800">{p.name}</h4>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={18} fill="currentColor" />
                            <span className="text-[#1A365D] font-black">4.9</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center gap-2 text-gray-400">
                             <MapPin size={16} />
                             <span className="text-xs font-bold uppercase tracking-widest">{p.location}</span>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <button 
                              onClick={() => setSelectedProvider(p)}
                              className="flex-1 bg-[#1A365D] text-white px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                            >
                              Ver Portfolio
                            </button>
                            <button 
                              onClick={() => hireProvider(p)}
                              className="bg-[#FF4D6D] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg flex items-center gap-2"
                            >
                              <Check size={14} /> Contratar
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="profile-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto bg-white p-12 rounded-[50px] shadow-2xl space-y-12 border border-white"
            >
              <div className="text-center space-y-6">
                <div className="relative w-40 h-40 mx-auto group">
                  <div className="w-full h-full bg-gray-100 rounded-full border-4 border-[#FF4D6D] overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
                     <img src={profileData.photoURL || 'https://i.pravatar.cc/300'} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={32} />
                  </div>
                </div>
                <div>
                   <h2 className="text-5xl font-serif font-light text-slate-900 leading-none">Gestión de Vuestro Perfil</h2>
                   <p className="text-[#FF4D6D] font-bold uppercase tracking-[0.3em] text-sm">Personaliza vuestro gran día</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 {/* Column 1: Personal Info */}
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Nombre de la Pareja</label>
                       <input 
                        type="text"
                        value={profileData.displayName}
                        onChange={e => setProfileData({...profileData, displayName: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-[#1A365D]"
                        placeholder="Vuestro nombre"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Foto de Perfil (URL)</label>
                       <input 
                        type="text"
                        value={profileData.photoURL}
                        onChange={e => setProfileData({...profileData, photoURL: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 font-mono text-xs text-gray-400"
                        placeholder="URL de vuestra foto"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Correo Electrónico</label>
                       <div className="bg-gray-100/50 p-4 rounded-2xl text-gray-400 font-bold border border-transparent select-none">{userProfile?.email}</div>
                    </div>
                 </div>

                 {/* Column 2: Wedding Details */}
                 <div className="space-y-6 bg-[#FFF5F7] p-8 rounded-[40px]">
                    <h4 className="text-[#FF4D6D] font-black text-xs uppercase tracking-widest mb-4">Detalles de la Boda</h4>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">¿Qué día es la ceremonia?</label>
                          <input 
                            type="date"
                            value={profileData.date}
                            onChange={e => setProfileData({...profileData, date: e.target.value})}
                            className="w-full bg-white border-none rounded-2xl p-4 font-bold text-[#1A365D]"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Religión / Tipo de Ceremonia</label>
                          <select 
                            value={profileData.religion}
                            onChange={e => setProfileData({...profileData, religion: e.target.value})}
                            className="w-full bg-white border-none rounded-2xl p-4 font-bold text-[#1A365D]"
                          >
                             <option value="">Selecciona una opción</option>
                             <option value="Católica">Católica</option>
                             <option value="Civil">Civil</option>
                             <option value="Judía">Judía</option>
                             <option value="Musulmana">Musulmana</option>
                             <option value="Laica">Laica</option>
                             <option value="Otros">Otros</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color de la Boda</label>
                          <div className="flex gap-4 items-center">
                            <input 
                              type="color"
                              value={profileData.weddingColor || '#FF4D6D'}
                              onChange={e => setProfileData({...profileData, weddingColor: e.target.value})}
                              className="w-16 h-16 rounded-2xl border-none p-1 cursor-pointer"
                            />
                            <input 
                              type="text"
                              value={profileData.weddingColor}
                              onChange={e => setProfileData({...profileData, weddingColor: e.target.value})}
                              className="flex-1 bg-white border-none rounded-2xl p-4 font-mono font-bold text-[#1A365D]"
                              placeholder="#HEXCOLOR"
                            />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                 <button 
                  onClick={saveProfileChanges}
                  disabled={savingProfile}
                  className="bg-[#1A365D] text-white py-6 rounded-[32px] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                 >
                   {savingProfile ? 'GUARDANDO CAMBIOS...' : 'ACTUALIZAR VUESTRO PERFIL'}
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* High-End Provider Portfolio Modal */}
        <AnimatePresence>
          {selectedProvider && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProvider(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[60px] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProvider(null)}
                  className="absolute top-8 right-8 z-50 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/40 transition-all"
                >
                  <Plus size={24} className="rotate-45" />
                </button>

                {/* Left: Info & Packages */}
                <div className="w-full md:w-[400px] bg-slate-50 p-10 overflow-y-auto custom-scrollbar border-r border-slate-100">
                  <div className="space-y-10">
                    <div className="space-y-4">
                       <span className="bg-[#4D8BFF] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{selectedProvider.category}</span>
                       <h3 className="text-5xl font-serif italic text-slate-800 leading-tight">{selectedProvider.name}</h3>
                       <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                          <MapPin size={14} />
                          {selectedProvider.location}
                       </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Sobre este Profesional</h4>
                      <p className="text-slate-600 text-sm leading-relaxed italic">{selectedProvider.description || 'Este profesional aún no ha añadido una descripción detallada.'}</p>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest border-b border-[#FF4D6D]/20 pb-2">Paquetes Disponibles</h4>
                      {selectedProvider.packages && selectedProvider.packages.length > 0 ? (
                        <div className="space-y-4">
                          {selectedProvider.packages.map((pkg, i) => (
                            <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 group hover:border-[#FF4D6D]/30 transition-all">
                               <div className="flex justify-between items-start mb-2">
                                  <p className="font-serif italic text-slate-800">{pkg.title}</p>
                                  <span className="text-[#FF4D6D] font-black">{pkg.price}€</span>
                               </div>
                               <p className="text-[10px] text-slate-400 leading-relaxed">{pkg.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No hay paquetes definidos actualmente.</p>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        hireProvider(selectedProvider);
                        setSelectedProvider(null);
                      }}
                      className="w-full bg-[#1A365D] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#FF4D6D] transition-all"
                    >
                      Contratar Ahora
                    </button>
                  </div>
                </div>

                {/* Right: Gallery Grid */}
                <div className="flex-1 bg-white p-12 overflow-y-auto custom-scrollbar">
                   <div className="space-y-10">
                      <div className="flex items-center justify-between">
                         <h3 className="text-3xl font-serif italic text-slate-800">Portfolio Visual</h3>
                         <div className="flex gap-2">
                            <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                               {selectedProvider.gallery?.length || 0} Obras
                            </span>
                         </div>
                      </div>

                      {selectedProvider.gallery && selectedProvider.gallery.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                           {selectedProvider.gallery.map((url, i) => (
                             <motion.div 
                               key={i} 
                               initial={{ opacity: 0, scale: 0.9 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: i * 0.1 }}
                               className="aspect-square rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white"
                             >
                                <img src={url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             </motion.div>
                           ))}
                        </div>
                      ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-300">
                           <ImageIcon size={80} className="mb-4 opacity-10" />
                           <p className="text-xl italic font-serif">Galería en preparación...</p>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGuestModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowGuestModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-md rounded-[50px] shadow-2xl relative z-10 overflow-hidden"
              >
                <div className="p-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                      <Users size={24} />
                    </div>
                    <h3 className="text-3xl font-serif italic text-slate-800">Añadir Invitado</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Ej: Lucia Fernandez"
                        className="w-full bg-slate-50 border-none rounded-3xl p-6 font-bold text-[#1A365D] focus:ring-4 focus:ring-purple-100 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Lado</label>
                        <select 
                          value={newGuest.side}
                          onChange={(e) => setNewGuest({ ...newGuest, side: e.target.value as any })}
                          className="w-full bg-slate-50 border-none rounded-3xl p-4 font-bold text-[#1A365D] outline-none"
                        >
                          <option value="mutual">Mutuo</option>
                          <option value="bride">Novia</option>
                          <option value="groom">Novio</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Estado</label>
                        <select 
                          value={newGuest.status}
                          onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value as any })}
                          className="w-full bg-slate-50 border-none rounded-3xl p-4 font-bold text-[#1A365D] outline-none"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="declined">Declinado</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={addGuest}
                      className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl"
                    >
                      Añadir a la Lista
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                    <div className="w-14 h-14 bg-[#FF4D6D]/10 rounded-3xl flex items-center justify-center text-[#FF4D6D]">
                      <MessageSquare size={28} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-serif italic text-slate-800">Mensaje Recibido</h3>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Comunicación Directa</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <p className="text-[#1A365D] text-lg leading-relaxed italic font-medium">
                      "{selectedMessage.content}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                       {selectedMessage.timestamp ? formatDistanceToNow(selectedMessage.timestamp instanceof Date ? selectedMessage.timestamp : (selectedMessage.timestamp as any).toDate(), { addSuffix: true, locale: es }) : 'Recientemente'}
                     </p>
                     <button 
                       onClick={() => setSelectedMessage(null)}
                       className="bg-[#1A365D] text-white px-10 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF4D6D] transition-all shadow-xl"
                     >
                       Cerrar Mensaje
                     </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
