import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Heart, User as UserIcon, LogOut, Lock, Store } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import { useState } from 'react';
import AuthModal from '../AuthModal';

export default function Header() {
  const location = useLocation();
  const { user, userProfile, signIn, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
      <div className="bg-[#FF4D6D] text-white py-3 px-6 flex justify-between items-center text-[11px] font-black tracking-[0.2em] uppercase shadow-lg">
        <div className="hidden lg:flex items-center gap-4">
          <span className="opacity-80">Diseñando momentos únicos</span>
          <div className="h-3 w-[1px] bg-white/30" />
          <span className="text-[9px] italic font-serif">Granada • España</span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {user ? (
            <div className="flex items-center gap-6">
              {/* Universal Panel Access Button */}
              <div className="flex gap-2">
                {userProfile?.role === 'admin' ? null : userProfile?.role === 'vendor' ? (
                  <Link 
                    to="/panel-proveedor" 
                    className="bg-[#1A365D] text-white px-6 py-2.5 rounded-full hover:bg-slate-900 transition-all text-[10px] font-black border border-white/20 shadow-xl flex items-center gap-2"
                  >
                    <Store size={14} />
                    Panel Profesional
                  </Link>
                ) : userProfile?.role === 'couple' ? (
                  <Link 
                    to="/mi-boda" 
                    className="bg-white text-[#FF4D6D] px-6 py-2.5 rounded-full hover:bg-slate-50 transition-all text-[10px] font-black shadow-xl flex items-center gap-2"
                  >
                    <Heart size={14} className="fill-current" />
                    Mi Boda
                  </Link>
                ) : null}
              </div>

              <div className="h-5 w-[1px] bg-white/20" />

              <div className="flex items-center gap-4">
                <button 
                  onClick={logout}
                  className="bg-white/20 p-2.5 rounded-full hover:bg-white/40 transition-all text-white flex items-center justify-center shadow-lg"
                  title="Cerrar Sesión"
                >
                  <LogOut size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <button 
                id="identificate-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-[#FF4D6D] px-6 py-2.5 rounded-full hover:bg-slate-50 transition-all font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-2"
              >
                <UserIcon size={12} />
                Identifícate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <div className="bg-white/80 backdrop-blur-2xl border-b border-white/40 py-6 px-10 flex justify-between items-center shadow-xl">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 bg-[#FF4D6D] rounded-[20px] flex items-center justify-center shadow-2xl shadow-[#FF4D6D]/30 group-hover:rotate-12 transition-transform duration-500">
            <Heart className="text-white fill-current" size={28} />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-4xl font-serif italic font-light tracking-tighter text-slate-900 leading-none">
              Bodas<span className="text-[#FF4D6D]">Online</span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1 pl-1">Exclusividad Andaluza</span>
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

        {/* Mobile Toggle Placeholder */}
        <div className="lg:hidden">
          <button className="p-3 bg-slate-100 rounded-2xl text-slate-900">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
