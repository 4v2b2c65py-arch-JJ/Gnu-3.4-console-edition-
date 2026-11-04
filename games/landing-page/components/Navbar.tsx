"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const links = [
  { name: "World", href: "#world" },
  { name: "Characters", href: "#characters" },
  { name: "Armor & Addons", href: "#armor" },
  { name: "News", href: "#news" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-brand-border shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-20">
        <Link href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-accent via-purple-600 to-pink-600 flex items-center justify-center text-xs font-black tracking-tighter shadow-[0_0_20px_rgba(139,92,246,0.7)] group-hover:scale-110 transition-transform duration-300">
            L
          </div>
          <span className="font-heading font-black text-lg tracking-tight text-white">LEVIATHAN</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-white">
              {link.name}
            </Link>
          ))}
          <Link href="/signup" className="text-brand-accent font-black hover:underline">
            Create Account
          </Link>
          <Link href="/login" className="border border-white/20 px-3 py-1 rounded-full text-brand-text-muted hover:text-white hover:bg-white/10 transition-all duration-200">
            Sign In
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/launcher">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] hover:scale-[1.02] transition-all duration-300">
              Download
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
