"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState("form") // form | success
  const [form, setForm] = useState({ email: "", password: "", confirm: "", username: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError("Passwords do not match")
      return
    }
    if (!form.email || !form.password || !form.username) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, username: form.username }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Signup failed")
        setLoading(false)
        return
      }
      setStep("success")
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
            Create your Leviathan account
          </h2>
          <p className="text-levi-textMuted text-sm">
            Join the always-on AI world. Free to play.
          </p>
        </div>

        {step === "form" ? (
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
              <label className="text-[10px] font-black text-white uppercase tracking-wider">Username</label>
              <input
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60 disabled:opacity-50`}
                placeholder="leviathan_player"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white uppercase tracking-wider">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60 disabled:opacity-50`}
                placeholder="you@leviathan.game"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white uppercase tracking-wider">Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60 disabled:opacity-50`}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-levi-accent transition-all placeholder-levi-textMuted/60 disabled:opacity-50`}
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                disabled={loading}
              />
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
              {loading ? "Creating account…" : "Create Account"}
            </button>
            <p className="text-[11px] text-levi-textMuted text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-levi-accent font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-heading font-black text-xl text-white">Account created</h3>
            <p className="text-levi-textMuted text-sm leading-relaxed">
              Welcome to Leviathan, {form.username}. Download the launcher and enter the world.
            </p>
            <button
              onClick={() => router.push("/launcher")}
              className="w-full py-4 rounded-xl bg-white/10 border brand-border text-white font-black text-sm hover:bg-white/20 transition-all"
            >
              Download Launcher
            </button>
            <p className="text-[10px] text-levi-textMuted/60 text-center">
              By creating an account you agree to our Terms and Privacy Policy.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
