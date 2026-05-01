import { Star, Clock, FileText, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../constants';

interface CourseCardProps {
  course: Course;
  onAddToCart: (course: Course) => void;
  isInCart: boolean;
}

export default function CourseCard({ course, onAddToCart, isInCart }: CourseCardProps) {
  return (
    <motion.div 
      layout
      whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden course-card-hover flex flex-col h-full shadow-sm"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold rounded uppercase tracking-wider">
           BESTSELLER
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md uppercase tracking-wide">
            {course.category}
          </span>
          <span className="text-[10px] font-medium text-slate-400 capitalize">
            {course.level}
          </span>
        </div>
        
        <h3 className="text-base font-bold text-slate-900 mb-2 font-display leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-[11px] text-slate-400 mb-4 italic">
          by <span className="text-slate-600 NOT-italic">{course.instructor}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span className="text-xs font-bold text-slate-900">{course.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            {isInCart ? (
               <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                 <Check className="w-3.5 h-3.5" /> In Cart
               </span>
            ) : (
              <span className="text-lg font-bold text-primary-600">${course.price.toFixed(2)}</span>
            )}
            {!isInCart && (
              <button 
                onClick={() => onAddToCart(course)}
                className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
