/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CourseCard from './components/CourseCard';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './contexts/AuthContext';
import { COURSES, CATEGORIES, Course } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronRight, ArrowRight } from 'lucide-react';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Course[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'All') return COURSES;
    return COURSES.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (course: Course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        cartCount={cart.length} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <TrustBar />
        <StatsSection />

        {/* Course Catalog */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-10">
              {/* Sidebar Filters */}
              <aside className="hidden lg:block col-span-3 space-y-8">
                <div className="sticky top-24">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trending Categories</h3>
                  <ul className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <li 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`sidebar-item ${selectedCategory === cat ? 'bg-primary-50 border border-primary-100' : 'hover:bg-slate-50'}`}
                      >
                        <span className={`text-sm font-medium ${selectedCategory === cat ? 'text-primary-700 font-bold' : 'text-slate-600'}`}>{cat}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-primary-200 text-primary-800' : 'bg-slate-200 text-slate-500'}`}>
                          {cat === 'All' ? COURSES.length : COURSES.filter(c => c.category === cat).length}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-6 bg-primary-900 rounded-3xl text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                      <p className="text-primary-300 text-[10px] font-bold tracking-widest uppercase mb-1">Elite Membership</p>
                      <h4 className="text-xl font-bold font-display leading-tight">Get Unlimited Access</h4>
                      <p className="text-sm text-primary-200/70 mt-3 font-light leading-relaxed">Save 40% on annual plans for students.</p>
                      <button className="mt-6 w-full py-3 bg-white text-primary-900 rounded-xl text-sm font-bold hover:bg-primary-50 transition-colors active:scale-95">
                        Upgrade Now
                      </button>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
                  </div>
                </div>
              </aside>

              {/* Main Grid */}
              <div className="col-span-12 lg:col-span-9">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 font-display tracking-tight">Recommended for you</h2>
                  <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border ${selectedCategory === cat ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-500 border-slate-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        layout={true}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                      >
                        <CourseCard 
                          course={course} 
                          onAddToCart={handleAddToCart}
                          isInCart={cart.some(item => item.id === course.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-primary-950 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl"
            >
              {/* Patterns */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-display">
                    Join Our Community of <span className="text-primary-400">10 Million+</span> Learners.
                  </h2>
                  <p className="text-primary-100 text-lg mb-10 opacity-80 font-light">
                    Get unlimited access to over 4,500 courses taught by industry leaders. Start your 7-day free trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-10 py-4 bg-white text-primary-950 font-bold rounded-2xl hover:bg-primary-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 active:scale-95">
                       Start Free Trial
                       <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-10 py-4 bg-primary-800 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all border border-primary-700 active:scale-95 text-sm uppercase tracking-widest">
                      View Group Plans
                    </button>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden lg:block relative"
                >
                   <div className="absolute inset-0 bg-primary-600 blur-[100px] opacity-20" />
                   <img 
                    src="https://picsum.photos/seed/happy/800/600" 
                    className="rounded-3xl shadow-2xl relative z-10 w-full" 
                    alt="Happy student" 
                    referrerPolicy="no-referrer"
                   />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


