import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface NavbarProps {
  cartCount: number;
  onOpenAuth: () => void;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenAuth, onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false);
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-primary-900">LearnPro.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-primary-600 transition-colors">Browse Courses</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Learning Paths</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Mentors</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">For Enterprise</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pl-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all active:scale-95"
                >
                  <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
                    )}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-[60]"
                    >
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={onOpenAuth}
                  className="hidden sm:inline-block text-sm font-semibold text-slate-700 hover:text-primary-600"
                >
                  Sign In
                </button>
                <button 
                  onClick={onOpenAuth}
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-all shadow-md shadow-primary-200 active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg">Browse Courses</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg">Learning Paths</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg">Mentors</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg">For Enterprise</a>
              {!user && (
                <button 
                  onClick={onOpenAuth}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-primary-600 rounded-xl"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

