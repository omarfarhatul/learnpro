import { motion } from 'motion/react';

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Adobe', 'Slack'
];

export default function TrustBar() {
  return (
    <div className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
          Trusted by the world's best companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale">
          {companies.map((company) => (
            <motion.span 
              key={company} 
              className="text-2xl font-display font-bold text-slate-900"
              whileHover={{ scale: 1.1, opacity: 1, grayscale: 0 }}
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
