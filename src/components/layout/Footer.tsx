import { Link } from 'react-router-dom';
import { Heart, Facebook, Youtube, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#fdfcfb] pt-24 pb-12 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#FF4D6D]/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4D6D] rounded-full flex items-center justify-center shadow-lg shadow-[#FF4D6D]/20">
                <Heart className="text-white fill-current" size={20} />
              </div>
              <span className="text-[#FF4D6D] font-serif italic text-2xl tracking-tighter">BodasOnline</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-light italic">
              "Donde la lógica se encuentra con la emoción para diseñar vuestro gran día en Granada."
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", color: "hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
                { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
                { icon: Youtube, href: "#", color: "hover:bg-[#FF0000]" },
                { icon: MessageCircle, href: "https://wa.me/34900123456", color: "hover:bg-[#25D366]" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm ${social.color}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/mi-boda" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Mi Boda</Link></li>
              <li><Link to="/mapas" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Lugares</Link></li>
              <li><Link to="/proveedores" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Proveedores</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Compañía</h4>
            <ul className="space-y-4">
              <li><Link to="/quienes-somos" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Quiénes somos</Link></li>
              <li><Link to="/contacto" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Contacto</Link></li>
              <li><Link to="/blog" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Blog</Link></li>
              <li><Link to="/terminos" className="text-slate-600 text-sm font-light hover:text-[#FF4D6D] transition-colors">Términos legales</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Contacto</h4>
            <ul className="space-y-4">
              <li className="text-slate-600 text-sm font-light">Granada, España</li>
              <li className="text-slate-600 text-sm font-light">hola@bodasonline.com</li>
              <li className="text-[#FF4D6D] text-sm font-black tracking-tight">+34 900 123 456</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">© 2026 BodasOnline. Design from Granada with Love.</p>
          <div className="flex gap-8">
            <Link to="/terminos" className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-[#FF4D6D]">Términos</Link>
            <Link to="/privacidad" className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-[#FF4D6D]">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
