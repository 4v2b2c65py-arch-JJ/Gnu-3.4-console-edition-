"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import World from "@/components/World"
import CharacterCustomizer from "@/components/CharacterCustomizer"
import NPCMonitor from "@/components/NPCMonitor"
import ServerStatus from "@/components/ServerStatus"
import LauncherWidget from "@/components/LauncherWidget"

export default function Page() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(l)
    const raf = (time: number) => {
      l.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => { l.destroy() }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden selection:bg-brand-accent/30 selection:text-white">
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <World />
        <CharacterCustomizer />
        <NPCMonitor />
        <ServerStatus />
        <LauncherWidget />
      </main>
      <Footer />
    </div>
  )
}
