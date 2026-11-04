"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CHARACTERS = [
  { name: "KAEL EN", role: "Blade Dancer", tier: "LEGENDARY", color: "from-pink-500 to-fuchsia-600", badge: "AI-Driven" },
  { name: "VEYRA", role: "Void Archer", tier: "EPIC", color: "from-purple-500 to-indigo-600", badge: "Autonomous" },
  { name: "DROSK", role: "Iron Guard", tier: "RARE", color: "from-amber-500 to-orange-600", badge: "Replicated" },
  { name: "MIRA", role: "Arc Weaver", tier: "COMMON", color: "from-emerald-500 to-teal-600", badge: "Base Model" },
]

export default function Characters() {
  const [selected, setSelected] = useState(CHARACTERS[0])
  const [sync, setSync] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSync((s) => s + 1), 7000)
    return () => clearInterval(t)
  }, [])

  const tierStyle = (tier: string) => {
    switch (tier) {
      case "LEGENDARY": return "border-pink-500/40 text-pink-400 bg-pink-500/10"
      case "EPIC": return "border-purple-500/40 text-purple-400 bg-purple-500/10"
      case "RARE": return "border-amber-500/40 text-amber-400 bg-amber-500/10"
      default: return "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    }
  }

  return (
    <section id="characters" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.10)_0%,transparent_50%)] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-[2.5rem] blur opacity-35 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative rounded-[2.5rem] border border-white/10 bg-black/50 backdrop-blur overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="/characters/placeholder.png"
                alt={selected.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1500"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${tierStyle(selected.tier)}`}>
                  {selected.tier}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${tierStyle(selected.tier)}`}>
                {selected.badge}
              </span>
              <span className="text-xs font-medium text-levi-textMuted">Built from replicated face schematics</span>
            </div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight"
            >
              {selected.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-levi-accent text-xl font-black mb-8"
            >
              {selected.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-levi-textMuted text-lg leading-relaxed mb-10 max-w-lg"
            >
              High-poly body polygons matched from AI reference. Autonomous behavior engine active.
              Ready for main menu integration and live NPC spawning.
            </motion.p>
            <div className="flex gap-4">
              <button className="group relative px-7 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm overflow-hidden">
                <span className="relative z-10">Inspect Model</span>
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/15 transition duration-300"></div>
              </button>
              <button className={`px-7 py-3 rounded-2xl bg-gradient-to-r ${selected.color.split(' ')[0]} text-white font-black text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all`}>
                Spawn NPC
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {CHARACTERS.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(c)}
              className={`glass-panel p-5 text-left cursor-pointer transition-all duration-300 group ${selected.name === c.name ? "border-levi-accent/70 bg-white/5 shadow-[0_0_30px_rgba(139,92,246,0.15)]" : "border-transparent hover:border-white/10 hover:bg-white/5"}`}
            >
              <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/5 overflow-hidden mb-4 group-hover:scale-105 transition duration-300">
                <img
                  src="/characters/placeholder.png"
                  alt={c.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-start mb-1.5">
                <h4 className="font-black text-white text-sm">{c.name}</h4>
                <span className="text-[10px] font-black uppercase tracking-wider text-levi-accent">{c.tier}</span>
              </div>
              <p className="text-[10px] text-levi-textMuted">{c.role}</p>
            </button>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-levi-textMuted/70">
          <span className="w-1.5 h-1.5 rounded-full bg-levi-accent animate-pulse"></span>
          <span>AI world sync: {sync}m ago &bull; {CHARACTERS.length} characters online</span>
        </div>
      </div>
    </section>
  )
}
