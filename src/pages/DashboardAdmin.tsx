import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Store, 
  FileText, 
  TrendingUp, 
  Search, 
  Bell, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MoreVertical,
  Activity,
  Plus,
  Lock
} from 'lucide-react';

const STATS = [
  { label: 'Total Usuarios', value: '1,284', icon: Users, color: 'bg-blue-500', trend: '+12%' },
  { label: 'Proveedores VIP', value: '156', icon: Store, color: 'bg-[#FF4D6D]', trend: '+5%' },
  { label: 'Post del Blog', value: '48', icon: FileText, color: 'bg-purple-500', trend: '+2' },
  { label: 'Contratos Activos', value: '320', icon: TrendingUp, color: 'bg-green-500', trend: '+18%' },
];

const PENDING_PROVIDERS = [
  { id: 1, name: 'Hacienda Los Granados', email: 'vventas@granados.com', category: 'Espacios', date: 'Hace 2 horas' },
  { id: 2, name: 'Luz & Sombras Foto', email: 'luz@foto.com', category: 'Fotografía', date: 'Hace 5 horas' },
  { id: 3, name: 'Banquete Real Granada', email: 'contact@real.com', category: 'Banquetes', date: 'Ayer' },
];

const RECENT_ACTIVITY = [
  { id: 1, user: 'Maria & Jose', action: 'Contrataron a DJ Luna', date: 'Hoy, 10:30' },
  { id: 2, user: 'Carlos & Elena', action: 'Publicaron una nueva reseña', date: 'Hoy, 09:15' },
  { id: 3, user: 'Admin', action: 'Actualizó términos y condiciones', date: 'Ayer, 18:00' },
];

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [providers, setProviders] = useState(PENDING_PROVIDERS);
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState({
    portalName: 'BodasOnline Granada',
    adminEmail: 'admin@bodasonline.com'
  });

  const approveProvider = (id: number) => {
    setProviders(providers.filter(p => p.id !== id));
    setNotifications(prev => Math.max(0, prev - 1));
    alert('Proveedor aprobado con éxito');
  };

  const rejectProvider = (id: number) => {
    setProviders(providers.filter(p => p.id !== id));
    alert('Proveedor rechazado');
  };

  const handleSaveSettings = () => {
    alert('Configuración guardada exitosamente');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Table Column */}
            <div className="lg:col-span-2 space-y-12">
              <section className="bg-white rounded-[48px] shadow-sm border border-gray-50 overflow-hidden">
                <div className="p-10 flex items-center justify-between border-b border-gray-50">
                  <h3 className="text-lg font-black text-[#1A365D] uppercase tracking-tight">Proveedores por Validar</h3>
                  <button onClick={() => setActiveTab('providers')} className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest hover:underline">Ver todos</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Proveedor</th>
                        <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                        <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {providers.length > 0 ? providers.map((provider) => (
                        <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-[#1A365D] font-black text-lg shadow-inner">
                                {provider.name[0]}
                              </div>
                              <div>
                                <p className="text-xs font-black text-[#1A365D] uppercase tracking-tight">{provider.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest">{provider.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-8">
                            <span className="text-[10px] font-black text-[#1A365D] uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                              {provider.category}
                            </span>
                          </td>
                          <td className="px-6 py-8">
                            <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-amber-500 uppercase tracking-widest">
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                              Pendiente
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => approveProvider(provider.id)}
                                className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                title="Aprobar"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button 
                                onClick={() => rejectProvider(provider.id)}
                                className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm" 
                                title="Rechazar"
                              >
                                <XCircle size={18} />
                              </button>
                              <button className="w-10 h-10 bg-slate-50 text-[#1A365D] rounded-xl flex items-center justify-center hover:bg-[#1A365D] hover:text-white transition-all shadow-sm" title="Ver Perfil">
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-light italic">
                            No hay proveedores pendientes de validación.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-12">
              <section className="bg-white rounded-[40px] shadow-sm border border-gray-50 p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-[#1A365D] uppercase tracking-tight">Actividad</h3>
                  <Activity className="text-[#FF4D6D]" size={20} />
                </div>
                <div className="space-y-8">
                  {RECENT_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="flex gap-4 group">
                      <div className="w-1 h-12 bg-slate-100 rounded-full group-hover:bg-[#FF4D6D] transition-colors" />
                      <div>
                        <p className="text-xs font-black text-[#1A365D] uppercase tracking-tight">{activity.user}</p>
                        <p className="text-[10px] text-gray-500 font-medium my-1">{activity.action}</p>
                        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 text-[#1A365D] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#1A365D] hover:text-white transition-all">
                  Ver historial completo
                </button>
              </section>

              <section className="bg-[#1A365D] rounded-[40px] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">Crea un <br /><span className="text-[#FF4D6D]">Nuevo Proveedor</span></h4>
                  <p className="text-white/60 text-xs font-medium mb-8 leading-relaxed">¿Deseas dar de alta un proveedor VIP manualmente?</p>
                  <button className="flex items-center gap-3 bg-[#FF4D6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-black/10 hover:scale-105 transition-all">
                    <Plus size={18} />
                    Empezar ahora
                  </button>
                </div>
              </section>
            </div>
          </div>
        );
      case 'providers':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-serif text-slate-800 italic">Gestión de Proveedores</h3>
              <button className="bg-[#4D8BFF] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#3b7ae6] transition-all">
                <Plus size={16} /> Añadir Proveedor
              </button>
            </div>
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre</th>
                      <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gremio</th>
                      <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Pepe Bodas DJ', category: 'Música', rating: 4.9 },
                      { name: 'Hotel Alhambra Palace', category: 'Espacio', rating: 5.0 },
                      { name: 'Floristería Albaicín', category: 'Decoración', rating: 4.8 },
                    ].map((v, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-10 py-6 text-sm font-black text-slate-800 uppercase">{v.name}</td>
                        <td className="px-6 py-6"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{v.category}</span></td>
                        <td className="px-6 py-6 text-slate-500 font-bold">{v.rating} ⭐</td>
                        <td className="px-10 py-6 text-right">
                          <button className="text-slate-300 hover:text-[#FF4D6D] transition-colors"><MoreVertical size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-serif text-slate-800 italic">Directorio de Usuarios</h3>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: 'Maria & Jose', fate: 'Alhambra Palace', date: '22 Oct 2026' },
                  { name: 'Carlos & Elena', fate: 'Carmen de los Tores', date: '15 Nov 2026' },
                  { name: 'Lucia & David', fate: 'Palacio de los Cordova', date: '10 Sep 2026' },
                ].map((u, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                     <p className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest mb-1">Boda Confirmada</p>
                     <h4 className="text-xl font-serif text-slate-800 italic mb-4">{u.name}</h4>
                     <div className="space-y-2 mb-6">
                        <p className="text-xs text-slate-500">📍 {u.fate}</p>
                        <p className="text-xs text-slate-500">📅 {u.date}</p>
                     </div>
                     <button className="w-full py-3 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#4D8BFF] hover:text-[#4D8BFF] transition-all">
                        Ver Detalles
                     </button>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'blog':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-serif text-slate-800 italic">Gestión de Contenido</h3>
               <button className="bg-[#FF4D6D] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#e64562] transition-all">
                 <Plus size={16} /> Nuevo Artículo
               </button>
            </div>
            <div className="space-y-4">
               {[
                 { title: 'Cómo organizar tu boda en Granada', date: '12 May 2026', views: 450 },
                 { title: 'Los mejores cármenes para bodas', date: '08 May 2026', views: 820 },
                 { title: 'Checklist para novias estresadas', date: '02 May 2026', views: 310 },
               ].map((p, i) => (
                 <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between group hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#FF4D6D]/10 group-hover:text-[#FF4D6D] transition-all">
                          <Eye size={24} />
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{p.title}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{p.date} • {p.views} Visitas</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-3 text-slate-400 hover:text-blue-500 transition-colors"><Settings size={18} /></button>
                       <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><XCircle size={18} /></button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-serif text-slate-800 italic">Configuración del Sistema</h3>
            </div>
            <div className="bg-white rounded-[40px] border border-slate-100 p-10 space-y-12">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nombre del Portal</label>
                     <input 
                      type="text" 
                      value={settings.portalName} 
                      onChange={(e) => setSettings({...settings, portalName: e.target.value})}
                      className="w-full bg-slate-50 rounded-2xl p-5 font-black text-slate-800 text-xs border-none outline-none focus:ring-4 focus:ring-slate-100" 
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Email del Sistema</label>
                     <input 
                      type="text" 
                      value={settings.adminEmail} 
                      onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                      className="w-full bg-slate-50 rounded-2xl p-5 font-black text-slate-800 text-xs border-none outline-none focus:ring-4 focus:ring-slate-100" 
                     />
                  </div>
               </div>
               <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                        <CheckCircle2 size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-800 uppercase">Copias de Seguridad</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Última hace: 2 horas</p>
                     </div>
                  </div>
                  <button 
                    onClick={handleSaveSettings}
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                  >
                     Guardar Cambios
                  </button>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#fdfcfb] border-r border-slate-100 hidden lg:flex flex-col fixed h-full z-20 pt-32">
        <div className="p-10">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
             </div>
             <h1 className="text-2xl font-serif italic text-slate-900 tracking-tighter">Portal<span className="text-[#FF4D6D] font-sans font-black uppercase text-[8px] tracking-widest block -mt-1">Admin</span></h1>
          </Link>
        </div>
        
        <nav className="flex-1 mt-6 space-y-1 px-6">
          {[
            { id: 'overview', label: 'Resumen', icon: Activity },
            { id: 'providers', label: 'Proveedores', icon: Store },
            { id: 'users', label: 'Usuarios', icon: Users },
            { id: 'blog', label: 'Blog', icon: FileText },
            { id: 'settings', label: 'Ajustes', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] transition-all group ${
                activeTab === item.id ? 'bg-[#FF4D6D] text-white shadow-xl shadow-[#FF4D6D]/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === 'overview' && providers.length > 0 && (
                <span className={`ml-auto w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-black ${activeTab === item.id ? 'bg-white text-[#FF4D6D]' : 'bg-[#FF4D6D] text-white animate-pulse'}`}>
                  {providers.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D6D]/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 leading-none">Status</p>
            <p className="text-xs font-black uppercase tracking-tight flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Super Admin
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-12 pt-48 min-h-screen">
        {/* Admin Header Banner */}
        <div className="mb-12 bg-slate-900 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D6D]/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF4D6D] to-[#ff758f] rounded-[30px] flex items-center justify-center text-white shadow-xl shadow-[#FF4D6D]/20">
              <Lock size={40} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-[0.4em] mb-2">Acceso de Ingeniero</p>
              <h2 className="text-4xl font-black text-white tracking-tight leading-none">SISTEMA DE ADMINISTRACIÓN</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-10">
             <div className="text-right hidden md:block">
               <p className="text-white font-black text-sm uppercase">Modo: Operativo</p>
               <p className="text-green-400 text-[10px] font-black uppercase tracking-widest animate-pulse">● Servidores Online</p>
             </div>
             <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all"
             >
               Ver Web Pública
             </button>
          </div>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-none capitalize">{activeTab === 'overview' ? 'Panel de Control' : activeTab}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Bienvenido de nuevo, Josbur</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar en el portal..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white rounded-2xl border border-slate-100 outline-none text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#FF4D6D]/10 transition-all w-64 md:w-80 shadow-sm"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
            <button className="relative w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
              <Bell size={22} />
              {notifications > 0 && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#FF4D6D] rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </header>

        {/* Stats Grid - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 mt-32">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 flex items-center gap-6 group hover:translate-y-[-5px] transition-all"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-200 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-black text-slate-800 leading-none tracking-tight">{stat.value}</h3>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">{stat.trend}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-10 pb-20 mt-32">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
