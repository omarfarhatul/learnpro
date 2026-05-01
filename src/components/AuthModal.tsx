import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Chrome, Loader2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-display text-slate-900">
                    {isLogin ? 'Welcome back' : 'Create account'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {isLogin ? 'Enter your details to sign in' : 'Start your learning journey today'}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 italic">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <button 
                  onClick={onGoogleSignIn}
                  className="w-full h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
                >
                  <Chrome className="w-5 h-5" />
                  Continue with Google
                </button>
                
                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    OR EMAIL
                  </span>
                </div>

                {isLogin ? (
                  <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-1">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...registerLogin('email')}
                          type="email"
                          placeholder="Email address"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {loginErrors.email && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{loginErrors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...registerLogin('password')}
                          type="password"
                          placeholder="Password"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {loginErrors.password && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{loginErrors.password.message}</p>}
                    </div>

                    <button 
                      disabled={isLoading}
                      type="submit"
                      className="w-full h-12 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
                    <div className="space-y-1">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...registerSignup('name')}
                          type="text"
                          placeholder="Full Name"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {signupErrors.name && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{signupErrors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...registerSignup('email')}
                          type="email"
                          placeholder="Email address"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {signupErrors.email && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{signupErrors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...registerSignup('password')}
                          type="password"
                          placeholder="Password"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {signupErrors.password && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{signupErrors.password.message}</p>}
                    </div>

                    <button 
                      disabled={isLoading}
                      type="submit"
                      className="w-full h-12 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                    </button>
                  </form>
                )}
              </div>

              <p className="mt-8 text-center text-sm text-slate-500 font-medium">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-600 font-bold hover:underline underline-offset-4"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
