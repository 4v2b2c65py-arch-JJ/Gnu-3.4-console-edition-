"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const NPCS = [
  { id: "npc-1", name: "Garrick", archetype: "Merchant", state: "idle", energy: 92, position: [12, 4, 8] },
  { id: "npc-2", name: "Veyra", archetype: "Guard", state: "patrolling", energy: 78, position: [44, 2, 19] },
  { id: "npc-3", name: "Mira", archetype: "Quest Giver", state: "thinking", energy: 64, position: [8, 1, 31] },
  { id: "npc-4", name: "Drosk", archetype: "Vendor", state: "interacting", energy: 88, position: [52, 3, 14] },
  { id: "npc-5", name: "Elian", archetype: "Enemy", state: "sleeping", energy: 15, position: [90, 5, 67] },
]

const STATE_COLOR: Record<string, string> = {
  idle: "text-brand-accent",
  patrolling: "text-emerald-400",
  thinking: "text-purple-400",
  interacting: "text-brand-secondary",
  sleeping: "text-amber-400",
}

const STATE_BG: Record<string, string> = {
  idle: "brand-accent",
  patrolling: "emerald-400",
  thinking: "purple-400",
  interacting: "brand-secondary",
  sleeping: "amber-400",
}

export default function NPCMonitor() {
  const [npcs, setNpcs] = useState(NPCS)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setTick((t) => t + 1)
      setNpcs((prev) =>
        prev.map((n) => {
          const roll = Math.random()
          let state = n.state
          if (roll > 0.85) {
            const states = ["idle", "patrolling", "thinking", "interacting", "sleeping"]
            state = states[Math.floor(Math.random() * states.length)]
          }
          let energy = Math.max(0, n.energy - (state === "sleeping" ? -2 : 1))
          if (state === "sleeping") energy = Math.min(100, energy + 5)
          return { ...n, state, energy }
        })
      )
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section id="armor" className="section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.06)_0%,transparent_50%)] -z-10"></div>
      <div className="section-inner">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-[10px] font-black text-brand-secondary tracking-wider uppercase block mb-2">Autonomous World</span>
            <h3 className="text-3xl font-black text-white tracking-tight">NPC Monitor</h3>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-black border bg-black/40 border-brand-border text-brand-accent">
              ● Live
            </span>
            <span className="px-3 py-1.5 rounded-full text-[10px] font-black border bg-black/40 border-brand-border text-brand-text-muted">
              {npcs.length} Active
            </span>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">NPC</th>
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Archetype</th>
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">State</th>
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Energy</th>
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Position</th>
                  <th className="pb-4 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {npcs.map((n) => (
                  <motion.tr
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group hover:bg-white/5 transition-colors border-b border-brand-border/50 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-black">
                          {n.name.charAt(0)}
                        </div>
                        <div className="font-black text-white">{n.name}</div>
                      </div>
                    </td>
                    <td className="py-4 text-brand-text-secondary text-sm">{n.archetype}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${STATE_COLOR[n.state]}`}>
                        {n.state}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="w-full bg-white/5 rounded-full h-1.5 mb-1">
                        <div className={`h-full bg-gradient-to-r from-${STATE_BG[n.state]} w-[${n.energy}%] rounded-full`}></div>
                      </div>
                      <span className="text-[10px] font-black text-white">{n.energy}%</span>
                    </td>
                    <td className="py-4 text-brand-text-muted text-sm">{n.position.join(", ")}</td>
                    <td className="py-4">
                      <button className="text-[10px] font-black text-brand-accent hover:text-white underline decoration-brand-accent/30">
                        Interact
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] text-brand-text-muted/70">
            <span>AGI Engine: Autonomous &bull; Offline-capable</span>
            <span>Tick: {tick}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
