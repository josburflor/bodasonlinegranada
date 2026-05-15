import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* High-End Data Hero */}
      <section className="relative h-[85vh] w-full flex items-start justify-center overflow-hidden pt-56">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
            alt="Política de Privacidad"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#4D8BFF] font-black text-[9px] uppercase tracking-[0.6em] mb-6 block">Compromiso Ético</span>
            <h1 className="text-8xl md:text-[140px] font-serif font-light text-slate-900 italic leading-none tracking-tighter">Privacidad</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 relative z-10 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-10 md:p-20 border border-gray-50 -mt-20 relative z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#FF4D6D]/10 rounded-2xl flex items-center justify-center text-[#FF4D6D]">
              <Shield size={24} />
            </div>
            <h2 className="text-4xl font-black text-[#1A365D] uppercase tracking-tight">Política de Datos</h2>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#1A365D] prose-headings:uppercase prose-p:text-gray-600 prose-p:leading-relaxed">
            <p className="text-sm text-gray-400 mb-8 font-bold italic underline decoration-[#4D8BFF] decoration-2 underline-offset-4">Última actualización: 14 de mayo de 2026</p>

            <section className="mb-12">
              <h2 className="text-xl">Nuestra Promesa de Privacidad</h2>
              <p>Tu privacidad es fundamental para nosotros. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra plataforma de gestión de bodas.</p>
            </section>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <Lock className="text-[#4D8BFF] mb-4" size={24} />
                <h3 className="text-xs font-black text-[#1A365D] uppercase mb-2">Seguridad</h3>
                <p className="text-[10px] text-gray-500 font-medium">Cifrado de alto nivel para proteger tus datos sensibles.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <Eye className="text-[#FF4D6D] mb-4" size={24} />
                <h3 className="text-xs font-black text-[#1A365D] uppercase mb-2">Transparencia</h3>
                <p className="text-[10px] text-gray-500 font-medium">Sabrás exactamente qué datos usamos y por qué.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <CheckCircle2 className="text-green-500 mb-4" size={24} />
                <h3 className="text-xs font-black text-[#1A365D] uppercase mb-2">Control</h3>
                <p className="text-[10px] text-gray-500 font-medium">Tú decides qué proveedores pueden ver tu información.</p>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-xl">1. Información que recopilamos</h2>
              <p>Recopilamos información necesaria para el funcionamiento del servicio, como:</p>
              <ul className="text-sm font-medium text-gray-500 list-disc pl-5 space-y-2">
                <li>Datos de registro (Nombre, email, foto de perfil).</li>
                <li>Detalles de la celebración (Fecha, ubicación, presupuesto).</li>
                <li>Mensajes intercambiados mediante el chat interno.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">2. Cómo usamos tus datos</h2>
              <p>Utilizamos la información para personalizar tu experiencia, facilitar el contacto con proveedores, procesar reservas y mejorar nuestras herramientas de planificación.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">3. Derechos del Usuario</h2>
              <p>Puedes acceder, rectificar o eliminar tus datos en cualquier momento desde tu perfil o contactándonos directamente. Tienes derecho a la portabilidad y a oponerte al tratamiento de tus datos para fines comerciales.</p>
            </section>

            <div className="p-8 bg-slate-50 border-l-4 border-[#FF4D6D] italic">
              <p className="text-xs text-gray-500 m-0">"Nos comprometemos a no vender nunca tus datos personales a terceros. Tu boda es tuya, y tus datos también."</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
