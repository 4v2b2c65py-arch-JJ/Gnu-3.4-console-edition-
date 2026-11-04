"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import SpotifyTrack from "@/components/SpotifyTrack"

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const anim = (imgRef.current as HTMLImageElement).animate(
      [{ y: 0 }, { y: -18 }, { y: 0 }],
      { duration: 5000, iterations: Infinity, easing: "ease-in-out" }
    )
    return () => anim.cancel()
  }, [])

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-20 pb-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-accent/12 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-brand-secondary/12 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-brand-accent/8 rounded-full blur-[100px]" style={{ animationDelay: "4s" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
        <div className="scanline-overlay"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(139,92,246,0.9)] animate-pulse"></div>
            <div className="absolute -inset-1 rounded-full bg-brand-accent/20 blur opacity-50 animate-pulse"></div>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-black text-brand-accent tracking-[0.3em] uppercase"
          >
            World Online &bull; AI Sync Active
          </motion.span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-5xl md:text-8xl font-black tracking-tight text-white leading-[1.05] mb-6"
        >
          Enter a universe{" "}
          <span className="text-gradient italic">beyond imagination</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Cinematic characters. Autonomous AGI NPCs. Custom armors and addons.
          Built for Unity, kept always-on by AI. Step inside.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="/signup" className="btn-primary">
            Create Account
          </a>
          <a href="/launcher" className="btn-secondary">
            Download Launcher
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-24 relative z-20"
      >
        <div className="relative w-full max-w-5xl mx-auto group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative rounded-[2.5rem] border border-brand-border bg-black/60 backdrop-blur-md overflow-hidden shadow-panel aspect-video">
            <img
              ref={imgRef}
              src="/hero.png"
              alt="Leviathan hero artwork"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Live Render</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">The journey begins starward</h3>
              <p className="text-[10px] text-brand-text-muted/80 mt-1">Autonomous world &bull; AI-synced assets</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
        <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Soundtrack</span>
        <SpotifyTrack />
      </div>
    </section>
  )
}
