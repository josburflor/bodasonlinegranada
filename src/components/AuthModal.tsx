import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Chrome, ArrowRight, User, Store, Heart } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'couple' | 'vendor'>('couple');
  const { signIn } = useAuth();

  const handleSocialLogin = async (type: 'google') => {
    // In this mock, we just trigger the signIn from AuthProvider
    await signIn(role as any);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Left Side: Visual/Context */}
              <div className="hidden md:block w-5/12 bg-[#FF4D6D] relative p-12 text-white">
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="/assets/images/unsplash-photo-1519741497674-611481863552.jpg" 
                    className="w-full h-full object-cover"
                    alt="Auth Background"
                  />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#FF4D6D]">
                      <Heart size={20} className="fill-current" />
                    </div>
                    <span className="font-serif italic text-2xl tracking-tighter">BodasOnline</span>
                  </div>
                  
                  <div className="mt-auto">
                    <h2 className="text-4xl font-serif italic leading-tight mb-6">
                      {mode === 'login' ? 'Bienvenido de nuevo a tu sueño.' : 'Comienza a crear vuestro momento eterno.'}
                    </h2>
                    <p className="text-white/70 text-sm font-medium leading-relaxed">
                      Únete a la comunidad de bodas más exclusiva de Granada.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-16 relative">
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="mb-10">
                  <div className="flex gap-8 border-b border-slate-100">
                    <button 
                      onClick={() => setMode('login')}
                      className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${mode === 'login' ? 'text-[#FF4D6D]' : 'text-slate-400'}`}
                    >
                      Iniciar Sesión
                      {mode === 'login' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF4D6D] rounded-full" />}
                    </button>
                    <button 
                      onClick={() => setMode('register')}
                      className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${mode === 'register' ? 'text-[#FF4D6D]' : 'text-slate-400'}`}
                    >
                      Regístrate
                      {mode === 'register' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF4D6D] rounded-full" />}
                    </button>
                  </div>
                </div>

                {/* Role Switcher (Inspired by bodas.net) */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <button 
                    onClick={() => setRole('couple')}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${role === 'couple' ? 'border-[#FF4D6D] bg-[#FF4D6D]/5' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'}`}
                  >
                    <User size={24} className={role === 'couple' ? 'text-[#FF4D6D]' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Soy Pareja</span>
                  </button>
                  <button 
                    onClick={() => setRole('vendor')}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${role === 'vendor' ? 'border-[#1A365D] bg-[#1A365D]/5' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'}`}
                  >
                    <Store size={24} className={role === 'vendor' ? 'text-[#1A365D]' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Soy Profesional</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Social Buttons */}
                  <button 
                    onClick={() => handleSocialLogin('google')}
                    className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 transition-all group"
                  >
                    <Chrome size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">Continuar con Google</span>
                  </button>

                  <div className="relative flex items-center justify-center py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <span className="relative bg-white px-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">o con tu email</span>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="email" 
                        placeholder="Tu correo electrónico"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none outline-none text-xs font-bold focus:ring-4 focus:ring-[#FF4D6D]/5 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="password" 
                        placeholder="Contraseña"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none outline-none text-xs font-bold focus:ring-4 focus:ring-[#FF4D6D]/5 transition-all"
                      />
                    </div>
                  </div>

                  <button className="w-full py-5 bg-[#FF4D6D] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#FF4D6D]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4">
                    {mode === 'login' ? 'Entrar ahora' : 'Crear mi cuenta'}
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed">
                    Al continuar, aceptas nuestros <a href="/terminos" className="text-slate-900 font-black underline">Términos</a> y <a href="/privacidad" className="text-slate-900 font-black underline">Privacidad</a>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
