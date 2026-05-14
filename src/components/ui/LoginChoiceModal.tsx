import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Key, LogIn, Chrome, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../AuthProvider';

interface LoginChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'couple' | 'vendor' | 'admin';
}

export default function LoginChoiceModal({ isOpen, onClose, role }: LoginChoiceModalProps) {
  const { signIn } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1A365D]/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-[#1A365D] transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-10 text-center">
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl ${role === 'vendor' ? 'bg-[#4D8BFF] shadow-[#4D8BFF]/20' : 'bg-[#FF4D6D] shadow-[#FF4D6D]/20'}`}>
              <ShieldCheck className="text-white" size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-[#1A365D] mb-2">Acceso {role === 'vendor' ? 'Profesional' : 'de Pareja'}</h3>
            <p className="text-gray-500 font-medium text-sm mb-10 italic">
              "Elige el método más seguro para gestionar {role === 'vendor' ? 'tus servicios' : 'vuestra boda'}"
            </p>

            <div className="space-y-4">
              {!showEmailForm ? (
                <>
                  <button 
                    onClick={() => signIn(role)}
                    className="w-full bg-white border-2 border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[#1A365D] hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                  >
                    <Chrome className="text-[#4285F4]" size={24} />
                    Ingresar con Gmail
                  </button>
                  
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 tracking-widest bg-white px-4">O bien</div>
                  </div>

                  <button 
                    onClick={() => setShowEmailForm(true)}
                    className="w-full bg-[#1A365D] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-[#1A365D]/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Mail size={20} />
                    Email y Contraseña
                  </button>
                </>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input type="email" placeholder="ejemplo@correo.com" className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 font-bold text-[#1A365D] outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Contraseña</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 font-bold text-[#1A365D] outline-none" />
                    </div>
                  </div>
                  <button 
                    onClick={() => signIn(role)}
                    className="w-full bg-[#4D8BFF] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#4D8BFF]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <LogIn size={20} />
                    INICIAR SESIÓN
                  </button>
                  <button 
                    onClick={() => setShowEmailForm(false)}
                    className="w-full text-gray-400 font-bold text-xs hover:text-[#1A365D] transition-colors mt-2"
                  >
                    ← Volver a opciones
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
