"use client"

import { useEffect, useState } from "react"

export default function AIStatus() {
  const [status, setStatus] = useState<{ model: string; lastUpdate: string; assets: number }>({
    model: "Syncing…",
    lastUpdate: "—",
    assets: 0,
  })

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/ai-status", { cache: "no-store" })
        if (res.ok) setStatus(await res.json())
      } catch {
        setStatus({ model: "Offline", lastUpdate: "—", assets: 0 })
      }
    }
    fetchStatus()
    const t = setInterval(fetchStatus, 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed bottom-8 left-8 z-50 glass-panel p-5 min-w-[320px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0 mt-1.5">
          <div className="absolute inset-0 rounded-full bg-green-400 blur opacity-50 animate-pulse"></div>
        </div>
        <div>
          <div className="text-[10px] font-black text-white uppercase tracking-wider">AI Core</div>
          <div className="text-sm font-medium text-white">{status.model}</div>
        </div>
      </div>
      <div className="flex justify-between text-[10px] font-medium text-levi-textMuted border-t border-white/10 pt-3">
        <span>Last sync: {status.lastUpdate}</span>
        <span>Assets: {status.assets}</span>
      </div>
    </div>
  )
}
