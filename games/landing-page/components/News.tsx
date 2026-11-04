"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const NEWS = [
  { title: "AGI Autonomy Update", time: "1h ago", body: "NPCs now sleep, think, and interact fully offline." },
  { title: "Armor Tier System Live", time: "4h ago", body: "Common → Legendary PBR materials integrated in Unity." },
  { title: "Turbosquid + Vket Sync", time: "12h ago", body: "Premium avatar packs replicated via Hugging Face models." },
  { title: "Main Menu Panels", time: "1d ago", body: "Character & NPC creation integrated into main menu UI." },
]

export default function News() {
  const [items, setItems] = useState(NEWS)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = "1"
            ;(entry.target as HTMLElement).style.transform = "translateX(0)"
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".news-item").forEach((el, i) => {
      observer.observe(el)
      ;(el as HTMLElement).style.opacity = "0"
      ;(el as HTMLElement).style.transform = "translateX(-30px)"
      ;(el as HTMLElement).style.transition = `all 0.8s ease-out ${i * 0.1}s`
    })
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => [
        { title: "AI Model Synced", time: "just now", body: "Hugging Face weights refreshed asset metadata." },
        ...prev.slice(0, 3),
      ])
    }, 14000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="news" className="py-32 border-y border-white/10 bg-black/30 relative overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -z-10"></div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black text-levi-accent tracking-[0.3em] uppercase block mb-4"
          >
            Intelligence Feed
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-black text-white mt-3 tracking-tight"
          >
            Latest from the World
          </motion.h2>
        </div>
        <div className="space-y-5">
          {items.map((n, i) => (
            <motion.div
              key={i}
              className="news-item glass-panel p-6 flex gap-4 group hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-levi-accent to-pink-600 flex items-center justify-center text-[10px] font-black shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                {i + 1}
              </div>
              <div>
                <span className="text-[10px] font-black text-levi-textMuted uppercase tracking-wider">{n.time}</span>
                <h4 className="text-sm font-black text-white mt-1">{n.title}</h4>
                <p className="text-xs text-levi-textMuted/90 mt-1.5 leading-relaxed">{n.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
