import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, Heart, MessageCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-serif italic text-slate-800 mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-[#FF4D6D] font-bold hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-64 left-0 right-0 p-6 z-10">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/blog')}
              className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white px-6 py-2.5 rounded-full flex items-center gap-2 mb-12 transition-all font-black uppercase text-[10px] tracking-widest border border-white/20"
            >
              <ArrowLeft size={16} />
              Volver al blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="bg-[#FF4D6D] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#FF4D6D]/30 mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-light text-white leading-[1.1] mb-10">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-8 items-center text-white/80 font-black text-[10px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  {post.readTime} de lectura
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-headings:text-slate-800 prose-headings:font-normal prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Post Interaction */}
            <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-[#1A365D] font-black text-[10px] uppercase tracking-widest hover:text-[#FF4D6D] transition-colors">
                  <Heart size={20} /> Me gusta
                </button>
                <button className="flex items-center gap-2 text-[#1A365D] font-black text-[10px] uppercase tracking-widest hover:text-[#FF4D6D] transition-colors">
                  <MessageCircle size={20} /> 12 Comentarios
                </button>
              </div>
              <button className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center text-[#1A365D] hover:bg-gray-100 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-80 space-y-12">
            <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
              <h4 className="text-2xl font-serif italic text-slate-800 mb-6">Sobre la autora</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1A365D] rounded-2xl flex items-center justify-center text-white font-black text-xl">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-black text-[#1A365D] uppercase text-xs">{post.author}</p>
                  <p className="text-[10px] text-[#FF4D6D] font-bold uppercase tracking-widest">Wedding Planner</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">
                Especialista en bodas destino y planificación estratégica con más de 10 años en el sector.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-serif italic text-slate-800 mb-8">Artículos relacionados</h4>
              <div className="space-y-8">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} to={`/blog/${rp.id}`} className="group block">
                    <div className="h-40 rounded-[30px] overflow-hidden mb-4 relative">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h5 className="font-serif italic text-slate-800 text-lg leading-tight group-hover:text-[#FF4D6D] transition-colors">{rp.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
