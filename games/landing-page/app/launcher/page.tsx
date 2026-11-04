"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const PLATFORMS = [
  { name: "Windows", icon: "🪟", file: "LeviathanSetup.exe", size: "2.4 GB", recommended: true },
  { name: "macOS", icon: "🍎", file: "LeviathanInstaller.dmg", size: "2.1 GB", recommended: false },
]

export default function LauncherPage() {
  const [selected, setSelected] = useState(PLATFORMS[0])
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    setDownloading(true)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 12
      if (p >= 100) { p = 100; clearInterval(iv); setDownloading(false) }
      setProgress(p)
    }, 200)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-levi-accent/8 rounded-full blur-[120px]"></div>
        <div className="scanline-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-levi-accent to-pink-600 flex items-center justify-center text-[10px] font-black">
            L
          </div>
          <span className="font-heading font-black text-sm tracking-tight text-white">LEVIATHAN</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-levi-textMuted">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="/signup" className="hover:text-white transition-colors">Create Account</a>
          <a href="/login" className="hover:text-white transition-colors">Sign In</a>
        </div>
        <a href="/" className="px-5 py-2 rounded-xl border border-white/10 text-white text-xs font-black hover:bg-white/10 transition">
          Back to Home
        </a>
      </nav>

      <main className="flex-grow px-6 pt-24 pb-20 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black text-levi-accent tracking-[0.3em] uppercase block mb-4">Launcher</span>
          <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Download the Launcher
          </h1>
          <p className="text-levi-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
            Your gateway to the always-on AI world. Install once, enter anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {PLATFORMS.map((p) => (
            <button
              key={p.name}
              onClick={() => setSelected(p)}
              className={`glass-panel p-8 rounded-[2rem] cursor-pointer transition-all group ${selected.name === p.name ? "border-levi-accent/80 bg-white/5 shadow-[0_0_30px_rgba(139,92,246,0.15)]" : "border-transparent hover:border-white/10 hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <div className="font-black text-white text-lg">{p.name}</div>
                  <div className="text-[10px] text-levi-textMuted/80">{p.recommended ? "Recommended" : "Alternative"}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black text-white">{p.file}</span>
                  <span className="text-levi-textMuted text-sm">{p.size}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-levi-accent to-pink-600 w-full" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-10 rounded-[2rem] max-w-md mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-white text-lg">Downloading {selected.file}</h3>
            <span className="text-levi-textMuted text-xs">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3 mb-6 overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-levi-accent to-pink-600 w-[${progress}%] transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.6)]`} />
          </div>
          {downloading ? (
            <button
              disabled
              className="w-full py-4 rounded-xl bg-white/10 border border-white/20 text-levi-textMuted font-black text-sm uppercase tracking-wider"
            >
              Preparing installer…
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-xl bg-gradient-to-br from-levi-accent to-pink-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] transition-all"
            >
              Start Download
            </button>
          )}
          <p className="text-[10px] text-levi-textMuted/70 text-center mt-4">
            Requires Windows 10/11 &bull; 8 GB RAM &bull; DirectX 12
          </p>
        </motion.div>
      </main>

      <footer className="border-t border-white/10 bg-black/60 pt-10 pb-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-levi-textMuted">
          <span>&copy; 2026 Leviathan Interactive</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
