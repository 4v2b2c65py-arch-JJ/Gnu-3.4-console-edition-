"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

const steps = [
  { num: "01", title: "Download", desc: "Install the Leviathan client for Windows." },
  { num: "02", title: "Create", desc: "Build your character in the main menu panel." },
  { num: "03", title: "Enter", desc: "Step into a world where NPCs think for themselves." },
]

export default function Download() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = "1"
            ;(entry.target as HTMLElement).style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".download-reveal").forEach((el, i) => {
      observer.observe(el)
      ;(el as HTMLElement).style.opacity = "0"
      ;(el as HTMLElement).style.transform = "translateY(40px)"
      ;(el as HTMLElement).style.transition = `all 0.9s ease-out ${i * 0.15}s`
    })
  }, [])

  return (
    <section id="download" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,22,30,0.6)_0%,#0a0a0c_70%)] -z-10"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black text-levi-accent tracking-[0.3em] uppercase block mb-4"
          >
            Entry Point
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-black text-white mt-3 tracking-tight leading-tight"
          >
            Your Game,<br />
            Your Universe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-levi-textMuted text-lg max-w-xl mx-auto mt-6 leading-relaxed"
          >
            Official website &bull; Social media &bull; Support &bull; AI World Sync
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <motion.div
              key={s.num}
              whileHover={{ y: -8 }}
              className="download-reveal text-center"
            >
              <span className="inline-block w-14 h-14 rounded-[2rem] bg-gradient-to-br from-levi-accent to-pink-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(139,92,246,0.7)] relative">
                {s.num}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-levi-accent to-pink-600 rounded-[2rem] blur opacity-40 animate-pulse"></div>
              </span>
              <h4 className="text-lg font-black text-white mb-2.5">{s.title}</h4>
              <p className="text-sm text-levi-textMuted/90 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 flex justify-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="group relative px-12 py-5 rounded-[2.5rem] bg-gradient-to-br from-levi-accent via-purple-600 to-pink-600 text-white font-black text-lg uppercase tracking-wider shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:shadow-[0_0_60px_rgba(139,92,246,1)] transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Download Leviathan <span className="text-xs">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition duration-500"></div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
