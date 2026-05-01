import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">LearnPro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering learners worldwide with accessible, high-quality education from industry experts.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Courses Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Popular Instructors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resource Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Success</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EduNext for Business</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Newsletter</h4>
            <p className="text-sm mb-6">Stay updated with latest courses and learning tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full bg-slate-800 border-none rounded-xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary-600 text-white outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center rounded-lg transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center">
          <p className="text-xs uppercase tracking-widest font-bold">
            &copy; 2024 LearnPro Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
