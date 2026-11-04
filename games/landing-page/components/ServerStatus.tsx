"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ServerStatus() {
  const [stats, setStats] = useState({
    hashes: 1240,
    earned: 0.0012,
    users: 7,
    uptime: "00:00:00",
  })

  useEffect(() => {
    let start = Date.now()
    let h = 1240
    let e = 0.0012
    let u = 7
    const iv = setInterval(() => {
      const now = Date.now()
      const ms = now - start
      const s = Math.floor(ms / 1000)
      const hms = new Date(ms).toISOString().substr(11, 8)
      h += Math.floor(Math.random() * 1500) + 500
      e = parseFloat((h * 0.000001).toFixed(4))
      u = Math.floor(Math.random() * 12) + 3
      setStats({ hashes: h, earned: e, users: u, uptime: hms })
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const statCards = [
    { label: "Hash Rate", value: `${stats.hashes}/s`, icon: "⚡", color: "emerald", glow: "bg-emerald-400/20" },
    { label: "Crypto Earned", value: `${stats.earned.toFixed(4)} LEVI`, icon: "🪙", color: "amber", glow: "bg-amber-400/20" },
    { label: "Active Users", value: stats.users, icon: "👥", color: "purple", glow: "bg-purple-400/20" },
    { label: "Uptime", value: stats.uptime, icon: "⏱", color: "brand-secondary", glow: "bg-pink-500/20" },
    { label: "Total Hashes", value: stats.hashes.toLocaleString(), icon: "🔢", color: "brand-accent", glow: "bg-purple-500/20" },
    { label: "Server Status", value: "ONLINE", icon: "🟢", color: "emerald", glow: "bg-emerald-400/20" },
  ]

  return (
    <section id="news" className="section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.06)_0%,transparent_50%)] -z-10"></div>
      <div className="section-inner">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-[10px] font-black text-emerald-400 tracking-wider uppercase block mb-2">Compute Network</span>
            <h3 className="text-3xl font-black text-white tracking-tight">Server Keeper</h3>
          </div>
          <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-brand-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            Compute Active
          </button>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] grid md:grid-cols-3 gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 border brand-border"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">{stat.label}</span>
                <span className={`text-xl ${stat.color === 'brand-accent' ? 'text-purple-500' : stat.color === 'brand-secondary' ? 'text-pink-500' : 'text-' + stat.color + '-400'}`}>{stat.icon}</span>
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="h-1 w-full bg-white/5 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-full rounded-full opacity-60"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 glass-panel p-6 rounded-[2.5rem] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">User Contribution</span>
            <h4 className="font-black text-white">Your compute keeps the world online</h4>
          </div>
          <button className="px-6 py-3 rounded-xl bg-brand-accent text-white font-black text-sm shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-[1.02] transition-all">
            Start Contributing
          </button>
        </div>
      </div>
    </section>
  )
}
