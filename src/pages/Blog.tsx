import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Immersive Cinematic Blog Hero */}
      <section className="relative h-[85vh] w-full flex items-start justify-center overflow-hidden mb-24 pt-64">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
            alt="Inspiración de Bodas"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FF4D6D] font-black text-[11px] uppercase tracking-[0.6em] mb-10 bg-slate-900 text-white px-8 py-3 rounded-full shadow-2xl"
          >
            Saber Hacer Andaluz
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-[180px] font-serif font-light text-slate-900 leading-[0.75] mb-12 tracking-tighter"
          >
            Blog de <br /><span className="italic text-[#FF4D6D]">Inspiración</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-xl font-light italic max-w-2xl px-4"
          >
            "Relatos de uniones eternas bajo el sol de Granada, para vuestra eternidad."
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filters Area */}
        <div className="flex flex-col md:flex-row gap-10 mb-20 items-center justify-center">
          <div className="flex flex-wrap gap-4 p-3 bg-slate-50/50 rounded-[40px] border border-slate-100 justify-center">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${
                !selectedCategory ? 'bg-[#FF4D6D] text-white shadow-xl shadow-[#FF4D6D]/20' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${
                  selectedCategory === cat ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[40px] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-50 group hover:scale-[1.02] transition-all flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex gap-4 mb-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</div>
                  <div className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</div>
                </div>
                
                <h2 className="text-2xl font-serif italic text-slate-800 mb-4 group-hover:text-[#FF4D6D] transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-medium">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#1A365D]">
                      <User size={14} />
                    </div>
                    <span className="text-[10px] font-black text-[#1A365D] uppercase tracking-wider">{post.author}</span>
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#1A365D] hover:bg-[#FF4D6D] hover:text-white transition-all group/btn shadow-inner"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold italic">No se encontraron artículos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
