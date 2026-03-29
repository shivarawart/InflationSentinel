// src/pages/Auth.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    city: '', 
    country: 'JP' 
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required!');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const submitData = isLogin 
        ? { email: form.email, password: form.password }
        : form;
      
      const res = await api.post(endpoint, submitData);
      
      login(res.data.user, res.data.token);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            InflationSentinel
          </h1>
          <p className="text-slate-400 mt-2">Protect your purchasing power</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            {isLogin ? 'Welcome Back' : 'Join the Shield'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="Tokyo / Gurugram / New York"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-8">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Join Now" 
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Secure • Private • Built for 2026 inflation
        </p>
      </div>
    </div>
  );
};

export default Auth;