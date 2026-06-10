import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAdminLogin, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const login = useAdminLogin();
  const [, navigate] = useLocation();
  const qc = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ data: form });
      await qc.invalidateQueries({ queryKey: getGetAdminMeQueryKey() });
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">IF</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-slate-900 text-xl leading-none">Infofin</span>
              <span className="block text-[11px] text-slate-400 leading-none font-medium tracking-wide">SOLUTIONS LLP</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Sign In</h1>
          <p className="text-slate-500 text-sm">Access the management dashboard</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input required type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={login.isPending} className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-all text-sm">
              <Lock className="w-4 h-4" />
              {login.isPending ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
