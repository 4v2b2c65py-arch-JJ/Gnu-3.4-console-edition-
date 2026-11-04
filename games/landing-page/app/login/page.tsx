"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Please fill in all fields")
      return
    }
    // Mock success
    setError("")
    alert(`Welcome back. Redirecting to launcher... (mock)`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-levi-accent/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
        <div className="scanline-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-levi-accent to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.7)]">
            <span className="text-xs font-black">L</span>
          </div>
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-3 tracking-tight">
            Welcome back
          </h2>
          <p className="text-levi-textMuted text-sm">
            Sign in to your Leviathan account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-400 text-xs font-medium"
            >
              {error}
            </motion.div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase tracking-wider">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60"
              placeholder="you@leviathan.game"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all pr-10 placeholder-levi-textMuted/60"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-levi-textMuted/60 hover:text-white text-xs"
              >
                👁
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <label className="flex items-center gap-2 cursor-pointer text-levi-textMuted">
              <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-black rounded" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-levi-accent font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-br from-levi-accent to-pink-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] hover:scale-[1.01] transition-all duration-300"
          >
            Sign In
          </button>
          <p className="text-[11px] text-levi-textMuted text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-levi-accent font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
