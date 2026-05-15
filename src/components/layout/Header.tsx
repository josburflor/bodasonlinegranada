import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Heart, User as UserIcon, LogOut, Lock, Store, Menu, X } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const location = useLocation();
  const { user, userProfile, signIn, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Lugares', path: '/mapas' },
    { name: 'Proveedores', path: '/proveedores' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {/* Top Premium Bar */}
      <div className="bg-[#FF4D6D] text-white py-3 px-4 md:px-6 flex justify-between items-center text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase shadow-lg">
        <div className="hidden lg:flex items-center gap-4">
          <span className="opacity-80">Diseñando momentos únicos</span>
          <div className="h-3 w-[1px] bg-white/30" />
          <span className="text-[9px] italic font-serif">Granada • España</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {user ? (
            <div className="flex items-center gap-2 md:gap-6">
              {/* Universal Panel Access Button */}
              <div className="flex gap-2">
                {userProfile?.role === 'admin' ? null : userProfile?.role === 'vendor' ? (
                  <Link 
                    to="/panel-proveedor" 
                    className="bg-[#1A365D] text-white px-3 md:px-6 py-2 rounded-full hover:bg-slate-900 transition-all text-[9px] md:text-[10px] font-black border border-white/20 shadow-xl flex items-center gap-2"
                  >
                    <Store size={14} className="hidden sm:block" />
                    <span className="whitespace-nowrap">Panel Pro</span>
                  </Link>
                ) : userProfile?.role === 'couple' ? (
                  <Link 
                    to="/mi-boda" 
                    className="bg-white text-[#FF4D6D] px-3 md:px-6 py-2 rounded-full hover:bg-slate-50 transition-all text-[9px] md:text-[10px] font-black shadow-xl flex items-center gap-2"
                  >
                    <Heart size={14} className="fill-current hidden sm:block" />
                    <span className="whitespace-nowrap">Mi Boda</span>
                  </Link>
                ) : null}
              </div>

              <div className="h-5 w-[1px] bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-2">
                <button 
                  onClick={logout}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-all text-white flex items-center justify-center shadow-lg"
                  title="Cerrar Sesión"
                >
                  <LogOut size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <button 
                id="identificate-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-[#FF4D6D] px-4 md:px-6 py-2 rounded-full hover:bg-slate-50 transition-all font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-2xl flex items-center gap-2"
              >
                <UserIcon size={12} />
                <span className="hidden xs:inline">Identifícate</span>
                <span className="xs:hidden">Entrar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <div className="bg-white/80 backdrop-blur-2xl border-b border-white/40 py-4 md:py-6 px-4 md:px-10 flex justify-between items-center shadow-xl">
        <Link to="/" className="flex items-center gap-2 md:gap-4 group">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-[#FF4D6D] rounded-[15px] md:rounded-[20px] flex items-center justify-center shadow-2xl shadow-[#FF4D6D]/30 group-hover:rotate-12 transition-transform duration-500">
            <Heart className="text-white fill-current" size={20} md:size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-4xl font-serif italic font-light tracking-tighter text-slate-900 leading-none">
              Bodas<span className="text-[#FF4D6D]">Online</span>
            </span>
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mt-0.5 md:mt-1 pl-1">Exclusividad Andaluza</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group",
                location.pathname === item.path ? "text-[#FF4D6D]" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute -bottom-2 left-0 h-[2px] bg-[#FF4D6D] transition-all",
                location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 bg-slate-100 rounded-2xl text-slate-900 hover:bg-slate-200 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-slate-100 shadow-2xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] transition-all",
                    location.pathname === item.path 
                      ? "bg-[#FF4D6D] text-white shadow-lg shadow-[#FF4D6D]/20" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              {!user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="mt-4 w-full bg-[#1A365D] text-white py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
                >
                  <UserIcon size={16} />
                  Área de Usuario
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
