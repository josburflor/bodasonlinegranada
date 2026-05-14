import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: '¡Hola! Soy tu asistente de BodasOnline. ¿En qué puedo ayudarte hoy con la organización de tu boda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // @ts-ignore
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Gemini requires the first message in history to be from the 'user' role.
      // We filter out the initial greeting from the model if it's the first message.
      const firstUserIndex = messages.findIndex(m => m.role === 'user');
      const history = firstUserIndex === -1 ? [] : messages.slice(firstUserIndex).map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({
        history,
        systemInstruction: "Eres un experto organizador de bodas de BodasOnline. Tu objetivo es ayudar a las parejas a planificar su boda perfecta en Granada. Eres amable, entusiasta y conoces todos los detalles sobre proveedores, lugares y tendencias de bodas. Responde siempre en español.",
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', content: text }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', content: 'Lo siento, he tenido un pequeño problema técnico. ¿Podrías repetirme eso?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF4D6D] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#FF4D6D] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart size={16} className="fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Asistente BodasOnline</h3>
                  <p className="text-[10px] opacity-80">En línea ahora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-[#4D8BFF] text-white rounded-tr-none'
                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    <div className="markdown-body">
                      <Markdown>{m.content}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FF4D6D] transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="w-10 h-10 bg-[#FF4D6D] text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
