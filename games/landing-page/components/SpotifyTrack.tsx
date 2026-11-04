"use client"

export default function SpotifyTrack() {
  return (
    <div className="w-full max-w-xs rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)]">
      <iframe
        src="https://open.spotify.com/embed/track/7uJO3vYc0QVxtE5vW8Pi0U?si=ec0c3fde27ab45b7"
        width="340"
        height="80"
        frameBorder={0}
        allow="encrypted-media"
        className="w-full h-full"
        title="Leviathan game soundtrack"
        loading="lazy"
      />
    </div>
  )
}
