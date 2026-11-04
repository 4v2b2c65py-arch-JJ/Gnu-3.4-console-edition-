"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LauncherWidget() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Ready to download")
  const [downloading, setDownloading] = useState(false)
  const [checkedSession, setCheckedSession] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) setUser(data.user)
        }
      } catch {}
      if (!cancelled) setCheckedSession(true)
    }
    checkSession()
    return () => { cancelled = true }
  }, [])

  const handleDownload = () => {
    if (!user) return
    setDownloading(true)
    setStatus("Preparing download…")
    window.location.href = "/api/download/launcher"

    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 8 + 2
      if (p >= 100) {
        p = 100
        setStatus("Download complete — run LeviathanSetup.exe to install")
        setDownloading(false)
        clearInterval(iv)
        return
      }
      setProgress(p)
      if (p < 30) setStatus("Downloading Leviathan client…")
      else if (p < 70) setStatus("Verifying assets…")
      else setStatus("Finalizing install…")
    }, 300)
  }

  if (!checkedSession) {
    return null
  }

  return (
    <section id="download" className="section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,#0a0a0c_70%)] -z-10"></div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black text-brand-accent tracking-wider uppercase block mb-4">Launcher</span>
          <h3 className="text-3xl font-black text-white tracking-tight mb-4">Enter the World</h3>
          <p className="text-brand-text-secondary text-lg">
            Install the Leviathan client. Your gateway to autonomous NPCs, replicated assets, and the always-on AI world.
          </p>
        </div>

        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-10 rounded-[2.5rem] shadow-panel"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🪟</span>
                  <span className="font-black text-white text-lg">LeviathanSetup.exe</span>
                </div>
                <span className="text-[10px] text-brand-text-muted">Signed in as {user.email} &bull; Windows 10/11 &bull; 2.4 GB</span>
              </div>
              <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">v2.0.0</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-2">
                <span>Download Progress</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-brand-accent to-brand-secondary w-[${progress}%] transition-all duration-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]`}></div>
              </div>
              <p className="text-[10px] text-brand-text-muted/80 mt-3 text-center">{status}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full py-5 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all duration-300 ${downloading ? "bg-white/10 border border-white/20 text-brand-text-muted shadow-none" : "bg-gradient-to-br from-brand-accent to-brand-secondary shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:shadow-[0_0_45px_rgba(139,92,246,0.95)] hover:scale-[1.02]"}`}
              >
                {downloading ? "Downloading…" : "Download Launcher"}
              </button>
              <button className="w-full py-4 rounded-2xl bg-white/5 border brand-border text-brand-text-muted font-black text-sm hover:bg-white/10 transition-all">
                System Requirements
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-10 rounded-[2.5rem] shadow-panel text-center"
          >
            <div className="text-levi-accent font-black text-sm uppercase tracking-wider mb-2">Sign in required</div>
            <h3 className="font-black text-white text-lg mb-4">Sign in to download Leviathan</h3>
            <p className="text-brand-text-secondary text-sm mb-6">
              Create an account or sign in to access the launcher download. Your session is saved on our server.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full py-5 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary text-white font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:shadow-[0_0_45px_rgba(139,92,246,0.95)] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="w-full py-4 rounded-2xl bg-white/5 border brand-border text-brand-text-muted font-black text-sm hover:bg-white/10 transition-all"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🎮", label: "DirectX 12", desc: "Required" },
            { icon: "💾", label: "8 GB RAM", desc: "Recommended" },
            { icon: "🔗", label: "Broadband", desc: "For AI sync" },
          ].map((f) => (
            <div key={f.label} className="p-4 rounded-2xl bg-white/5 border brand-border">
              <span className="text-2xl mb-2 block">{f.icon}</span>
              <div className="font-black text-white text-sm">{f.label}</div>
              <div className="text-[10px] text-brand-text-muted">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
