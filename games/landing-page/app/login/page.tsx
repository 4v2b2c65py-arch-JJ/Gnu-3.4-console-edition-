"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("leviathan_user")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setForm({ email: data.email || "", password: "" })
        setRemember(true)
      } catch {}
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, rememberMe: remember }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Invalid email or password")
        setLoading(false)
        return
      }
      if (remember) {
        try {
          localStorage.setItem(
            "leviathan_user",
            JSON.stringify({ email: form.email, rememberedAt: Date.now() })
          )
        } catch {}
      } else {
        try {
          localStorage.removeItem("leviathan_user")
        } catch {}
      }
      router.push("/launcher")
    } catch {
      setError("Unable to connect to server. Please try again.")
      setLoading(false)
    }
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
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60 disabled:opacity-50"
              placeholder="you@leviathan.game"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all pr-10 placeholder-levi-textMuted/60 disabled:opacity-50"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
              <button
                type="button"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-levi-textMuted/60 hover:text-white text-xs disabled:opacity-50"
              >
                👁
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <label className="flex items-center gap-2 cursor-pointer text-levi-textMuted disabled:opacity-50">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 rounded border-white/20 bg-black rounded"
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-levi-accent font-semibold hover:underline disabled:opacity-50">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:shadow-none ${
              loading
                ? "bg-white/10 border border-white/20 text-brand-text-muted"
                : "bg-gradient-to-br from-levi-accent to-pink-600 shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] hover:scale-[1.01]"
            }`}
          >
            {loading ? "Signing in…" : "Sign In"}
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
