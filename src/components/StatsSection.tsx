import { GraduationCap, Users, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Active Students', value: '10M+', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: 'Pro Instructors', value: '1.2K+', icon: GraduationCap, color: 'bg-amber-100 text-amber-600' },
  { label: 'Expert Courses', value: '4.5K+', icon: BookOpen, color: 'bg-primary-100 text-primary-600' },
  { label: 'Awards Won', value: '120+', icon: Trophy, color: 'bg-emerald-100 text-emerald-600' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
