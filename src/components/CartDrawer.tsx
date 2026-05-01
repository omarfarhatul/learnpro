import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Course } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Course[];
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 text-primary-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900 leading-none">Your Cart</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {items.length} {items.length === 1 ? 'item' : 'items'} added
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cart is empty</h3>
                  <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
                    Looks like you haven't added any courses yet.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-6 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-primary-500/20"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50 group border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 font-display mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium mb-2">
                        Instructor: <span className="text-slate-700 font-bold">{item.instructor}</span>
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-primary-600">${item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Tax</span>
                    <span className="font-bold text-slate-900">$0.00</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-lg font-bold text-slate-900 font-display uppercase tracking-tight">Total</span>
                    <span className="text-2xl font-black text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
