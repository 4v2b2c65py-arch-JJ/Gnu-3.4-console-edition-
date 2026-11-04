"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  {
    title: "Cinematic Presentation",
    subtitle: "Art is the star",
    desc: "Large character renders, environments, and trailers. The interface supports the artwork — never competes with it.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=85",
    accent: "from-brand-accent to-brand-secondary",
  },
  {
    title: "Minimalist UI",
    subtitle: "Only what matters",
    desc: "Clean, uncluttered interface. Essential buttons and information surface at the right moment.",
    img: "https://images.unsplash.com/photo-1633332756156-f926901bda86?w=900&q=85",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    title: "Always-On NPCs",
    subtitle: "AGI that never sleeps",
    desc: "AI-powered NPCs think, sleep, and interact autonomously — even when the main codespace is offline.",
    img: "https://images.unsplash.com/photo-1626984356731-602631202752?w=900&q=85",
    accent: "from-emerald-500 to-teal-600",
  },
]

export default function World() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = "1"
            ;(entry.target as HTMLElement).style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".world-card").forEach((el) => {
      observer.observe(el)
      ;(el as HTMLElement).style.opacity = "0"
      ;(el as HTMLElement).style.transform = "translateY(24px)"
      ;(el as HTMLElement).style.transition = "all 0.8s ease-out"
    })
  }, [])

  return (
    <section id="world" className="section">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534795657775-755f9a3a8d71?w=1920&q=85')] bg-cover bg-center opacity-12 blur-[50px] -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black -z-10"></div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-badge">Design Philosophy</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Built like the game,<br />
            not like a website
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-desc"
          >
            HoYoverse-grade polish meets Rockstar-grade atmosphere. Every visual element belongs to the Leviathan universe.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -8 }}
              className="world-card glass-panel-hover p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr {s.accent} rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition duration-1000 -mr-6 -mt-6"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-brand-border flex items-center justify-center mb-7 group-hover:scale-110 transition duration-300">
                  <span className="text-[10px] font-black text-white">{i + 1}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-sm text-brand-text-secondary/90 leading-relaxed">{s.desc}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition duration-700">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition duration-1000 grayscale group-hover:grayscale-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
