"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const ARCHETYPES = [
  { id: "kael_en", name: "KAEL EN", role: "Blade Dancer", tier: "LEGENDARY", accent: "#ec4899", stats: { STR: 60, AGI: 95, INT: 70, WIL: 85 } },
  { id: "veyra", name: "VEYRA", role: "Void Archer", tier: "EPIC", accent: "#8b5cf6", stats: { STR: 50, AGI: 90, INT: 80, WIL: 75 } },
  { id: "drosk", name: "DROSK", role: "Iron Guard", tier: "RARE", accent: "#f59e0b", stats: { STR: 95, AGI: 55, INT: 45, WIL: 80 } },
  { id: "mira", name: "MIRA", role: "Arc Weaver", tier: "COMMON", accent: "#10b981", stats: { STR: 40, AGI: 70, INT: 95, WIL: 60 } },
]

const TIERS = [
  { id: "common", label: "COMMON", color: "#10b981", poly: "10k", tex: "512px" },
  { id: "rare", label: "RARE", color: "#f59e0b", poly: "25k", tex: "1024px" },
  { id: "epic", label: "EPIC", color: "#8b5cf6", poly: "50k", tex: "2048px" },
  { id: "legendary", label: "LEGENDARY", color: "#ec4899", poly: "100k", tex: "4096px" },
]

const tierKeyMap: Record<string, string> = {
  "#10b981": "emerald",
  "#f59e0b": "amber",
  "#8b5cf6": "purple",
  "#ec4899": "pink",
}

export default function CharacterCustomizer() {
  const [arch, setArch] = useState(ARCHETYPES[0])
  const [tier, setTier] = useState(TIERS[2])
  const [rot, setRot] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setRot((r) => r + 1), 16)
    return () => clearInterval(iv)
  }, [])

  const accentKey = tierKeyMap[arch.accent] || "emerald"
  const tierKey = tierKeyMap[tier.color] || "emerald"

  return (
    <section id="characters" className="section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08)_0%,transparent_50%)] -z-10"></div>
      <div className="section-inner">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/2 flex flex-col items-center gap-6 relative group">
            <div className="relative w-64 h-80 rounded-[2.5rem] bg-black/40 border brand-border backdrop-blur overflow-hidden shadow-panel animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
              <img
                src={`/characters/${arch.id}.png`}
                alt={arch.name}
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition duration-1000"
                style={{ transform: `rotateY(${rot}deg)` }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-${tierKey}-500/40 text-${tierKey}-400 bg-${tierKey}-500/10`}>
                  {tier.label}
                </span>
                <span className="text-[10px] font-black text-white bg-black/60 backdrop-blur px-2 py-1 rounded">
                  {arch.role}
                </span>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black text-white tracking-tight mb-2"
              >
                {arch.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-lg font-black mb-6 text-${accentKey}-400`}
              >
                {arch.role}
              </motion.p>
              <div className="space-y-3">
                {Object.entries(arch.stats).map(([stat, val]) => (
                  <div key={stat} className="flex items-center gap-3">
                    <span className="w-20 text-xs font-medium text-brand-text-muted">{stat}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-${accentKey}-500 to-${accentKey}-600 w-[${val}%] shadow-[0_0_10px_rgba(139,92,246,0.5)]`}></div>
                    </div>
                    <span className="w-8 text-xs font-black text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 glass-panel p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black text-xl text-white">Character Customizer</h4>
              <span className="text-[10px] font-black text-brand-accent tracking-wider uppercase">AI-Replicated</span>
            </div>

            <div className="space-y-8">
              <div>
                <label className="label">Archetype</label>
                <div className="grid grid-cols-2 gap-3">
                  {ARCHETYPES.map((a) => {
                    const k = tierKeyMap[a.accent] || "emerald"
                    return (
                      <button
                        key={a.id}
                        onClick={() => setArch(a)}
                        className={`rounded-xl p-4 border transition-all duration-300 ${arch.id === a.id ? "border-brand-accent bg-white/5 shadow-[0_0_25px_rgba(139,92,246,0.2)]" : "border-brand-border hover:border-brand-border-hover hover:bg-white/5"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full bg-${k}-500/30 border border-${k}-500/40 flex items-center justify-center text-[10px] font-black`}>
                            {a.id.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <div className="font-black text-white text-sm">{a.name}</div>
                            <div className="text-[10px] text-brand-text-muted">{a.role}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="label">Asset Quality Tier</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {TIERS.map((t) => {
                    const k = tierKeyMap[t.color] || "emerald"
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTier(t)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border ${tier.id === t.id ? `border-${k}-500 text-${k}-400 bg-${k}-500/10` : "border-brand-border text-brand-text-muted/60 hover:bg-white/5"}`}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3 text-[10px]">
                  <div className="text-center">
                    <div className="text-brand-text-muted">Polygons</div>
                    <div className="font-black text-white">{tier.poly}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-brand-text-muted">Texture</div>
                    <div className="font-black text-white">{tier.tex}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-brand-text-muted">PBR Maps</div>
                    <div className="font-black text-white">{tier.id === "legendary" ? "5" : tier.id === "epic" ? "4" : tier.id === "rare" ? "3" : "2"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-brand-text-muted">LODs</div>
                    <div className="font-black text-white">{tier.id === "legendary" ? "5" : tier.id === "epic" ? "4" : "3"}</div>
                  </div>
                </div>
              </div>

              <button className="btn-primary flex items-center justify-center gap-2">
                <span>Replicate Asset via HF Model</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
