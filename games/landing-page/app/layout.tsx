import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Leviathan — Enter the Universe",
  description: "The next evolution of immersive gaming. Characters, NPCs, armors, addons — built for Unity, always online.",
  openGraph: {
    title: "Leviathan — Enter the Universe",
    description: "Cinematic game experience powered by AI.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
