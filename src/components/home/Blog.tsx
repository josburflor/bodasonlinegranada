import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blogPosts';
import { ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#FF4D6D] font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Inspiración</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 italic">Blog al Día</h2>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-2 text-[#1A365D] font-black uppercase text-[10px] tracking-widest hover:text-[#FF4D6D] transition-colors"
          >
            Ver todo el blog
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#FF4D6D] group-hover:text-white transition-all">
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl mb-8 bg-slate-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 text-white/80 font-black text-[8px] uppercase tracking-widest mb-2">
                    <Clock size={10} /> {post.readTime}
                  </div>
                  <h3 className="text-white font-serif text-2xl italic leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-[#FF4D6D] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
