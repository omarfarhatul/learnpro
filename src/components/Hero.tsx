import { Search, Play } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[480px] lg:h-[560px] flex items-center px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
      {/* Sleek Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#4338ca_0%,transparent_50%)] opacity-40" />
      
      {/* Background Decorative Element */}
      <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-16">
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-widest rounded-full border border-primary-400/30"
          >
            Next Level Learning 2024
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-white mt-6 leading-[1.1] tracking-tight"
          >
            Master the skills that <span className="text-primary-400">define the future.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 mt-6 text-lg lg:text-xl max-w-2xl font-light leading-relaxed"
          >
            Access over 4,500+ world-class courses designed by industry experts from Google, Meta, and Netflix. Your career evolution starts here.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 max-w-md bg-white rounded-xl flex items-center px-4 py-3.5 shadow-2xl">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="What do you want to learn today?" 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
              />
            </div>
            <button className="px-10 py-3.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/40 active:scale-95">
              Search
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 text-slate-400 text-sm"
          >
            <div className="flex -space-x-2">
               {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                    className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
            </div>
            <p>Join <span className="text-white font-semibold">12,402+</span> learners online now</p>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
