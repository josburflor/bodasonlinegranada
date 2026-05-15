import { SPACES, PROVIDERS } from '@/src/constants';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Featured() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Providers & Spaces Header */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif italic text-slate-800">Proveedores</h3>
              <span className="bg-[#FF4D6D] text-white text-[10px] font-bold px-3 py-1 rounded-full">+150 proveedores verificados</span>
            </div>
            <p className="text-gray-600 text-sm">Encuentra a los mejores profesionales de tu zona por categorías</p>
            <button className="text-[#FF4D6D] text-sm font-bold hover:underline">Descubres los proveedores →</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif italic text-slate-800">Espacios</h3>
              <span className="bg-[#FF4D6D] text-white text-[10px] font-bold px-3 py-1 rounded-full">+80 espacios disponibles</span>
            </div>
            <p className="text-gray-600 text-sm">Fotos espectaculares y muchos más ¡contáctalos desde aquí!</p>
            <button className="text-[#FF4D6D] text-sm font-bold hover:underline">Encuentra más Espacios →</button>
          </div>
        </div>

        {/* Spaces Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {SPACES.map((space) => (
            <Link key={space.id} to="/mapas" className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all block">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={space.imageUrl}
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-serif text-xl italic text-slate-800">{space.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{space.description}</p>
                <div className="text-[#FF4D6D] text-[10px] font-bold border border-[#FF4D6D] px-4 py-1.5 rounded-full group-hover:bg-pink-50 transition-colors inline-block">
                  Ver espacio
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Companies */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-serif italic text-slate-800">Empresas más Destacadas</h3>
            <span className="bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">PREMIUM</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROVIDERS.map((provider) => (
              <Link key={provider.id} to="/proveedores" className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] group block">
                <img
                  src={provider.imageUrl}
                  alt={provider.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-yellow-400 text-white text-[8px] font-bold px-2 py-1 rounded uppercase">PREMIUM</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-white font-serif text-2xl italic">{provider.name}</h4>
                    <div className="flex items-center gap-1 text-white/80 text-[10px]">
                      <MapPin size={10} />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#FF4D6D] text-white text-xs font-bold py-3 rounded-full group-hover:bg-pink-600 transition-colors text-center">
                    Ver más
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
