import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Eye } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* High-End Legal Hero */}
      <section className="relative h-[85vh] w-full flex items-start justify-center overflow-hidden pt-56">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" 
            alt="Términos y Condiciones"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#FF4D6D] font-black text-[9px] uppercase tracking-[0.6em] mb-6 block">Marco Legal</span>
            <h1 className="text-8xl md:text-[140px] font-serif font-light text-slate-900 italic leading-none tracking-tighter">Términos</h1>
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
            <div className="w-12 h-12 bg-[#1A365D]/10 rounded-2xl flex items-center justify-center text-[#1A365D]">
              <FileText size={24} />
            </div>
            <h2 className="text-4xl font-black text-[#1A365D] uppercase tracking-tight">Condiciones de Uso</h2>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#1A365D] prose-headings:uppercase prose-p:text-gray-600 prose-p:leading-relaxed">
            <p className="text-sm text-gray-400 mb-8 font-bold italic underline decoration-[#FF4D6D] decoration-2 underline-offset-4">Última actualización: 14 de mayo de 2026</p>

            <section className="mb-12">
              <h2 className="text-xl">1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar esta plataforma, aceptas quedar vinculado por estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">2. Uso de la Plataforma</h2>
              <p>Nuestra plataforma conecta a parejas que planean su boda con proveedores de servicios profesionales. Actuamos como un canal de comunicación e información, pero no somos parte de los contratos finales firmados entre parejas y proveedores.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">3. Registro de Usuarios</h2>
              <p>Para acceder a ciertas funciones, deberás registrarte. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Nos reservamos el derecho de retirar el acceso a cualquier usuario que haga un uso indebido de las herramientas.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">4. Propiedad Intelectual</h2>
              <p>Todo el contenido presente en la plataforma, incluyendo textos, gráficos, logotipos, iconos e imágenes, es propiedad de nuestra empresa o de sus respectivos creadores y está protegido por las leyes de propiedad intelectual.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl">5. Limitación de Responsabilidad</h2>
              <p>No garantizamos la disponibilidad ininterrumpida de nuestro servicio. No somos responsables de los desacuerdos o incumplimientos que puedan surgir entre parejas y proveedores contratados a través de la plataforma.</p>
            </section>

            <div className="bg-[#1A365D] p-8 rounded-[30px] text-white mt-12">
              <p className="text-sm font-bold m-0">¿Tienes dudas sobre nuestros términos?</p>
              <p className="text-xs text-white/70 mt-2 mb-0 italic">Escríbenos a legal@nuestrodominio.com y te ayudaremos.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
