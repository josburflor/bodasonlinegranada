import { ROUTES } from '@/src/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function Routes() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-serif text-slate-800 italic">Rutas por Granada para Enamorado</h2>
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-slate-200 text-slate-400 hover:border-[#FF4D6D] hover:text-[#FF4D6D] hover:bg-white transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-slate-200 text-slate-400 hover:border-[#FF4D6D] hover:text-[#FF4D6D] hover:bg-white transition-all shadow-sm active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth"
        >
          {ROUTES.map((route) => (
            <div key={route.id} className="min-w-[300px] md:min-w-[350px] group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg mb-6">
                <img
                  src={route.imageUrl}
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif italic text-slate-800 text-xl group-hover:text-[#FF4D6D] transition-colors pl-4">
                {route.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Progress Bar Visual */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <div className="w-48 h-1 bg-gray-200 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-[#FF4D6D] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
