export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-black/60 pt-20 pb-12 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534795657775-755f9a3a8d71?w=1920&q=85')] bg-cover bg-center opacity-6 blur-[80px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-[10px] font-black shadow-[0_0_15px_rgba(139,92,246,0.7)]">
              L
            </div>
            <span className="font-heading font-black text-lg tracking-tight text-white">LEVIATHAN</span>
          </div>
          <p className="text-brand-text-muted text-sm hidden md:block max-w-xs leading-relaxed">
            AI-powered always-on game world. Built with Unity, Hugging Face models, cinematic design.
          </p>
        </div>
        <div className="flex items-center gap-8 border-t brand-border pt-8 w-full">
          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div>
              <p className="font-black text-white uppercase text-[10px] tracking-widest mb-4">World</p>
              <ul className="space-y-2 text-brand-text-muted/80">
                <li><a href="#world" className="hover:text-white transition-colors">Cinematic Presentation</a></li>
                <li><a href="#characters" className="hover:text-white transition-colors">Characters</a></li>
                <li><a href="#armor" className="hover:text-white transition-colors">Armor & Addons</a></li>
              </ul>
            </div>
            <div>
              <p className="font-black text-white uppercase text-[10px] tracking-widest mb-4">Connect</p>
              <ul className="space-y-2 text-brand-text-muted/80">
                <li><a href="/signup" className="hover:text-white transition-colors">Create Account</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Sign In</a></li>
                <li><a href="/launcher" className="hover:text-white transition-colors">Launcher</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="h-px flex-grow bg-white/10 mx-4 hidden sm:block"></div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border brand-border flex items-center justify-center text-brand-text-muted hover:text-white hover:bg-white/10 transition-all text-xs">🎮</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border brand-border flex items-center justify-center text-brand-text-muted hover:text-white hover:bg-white/10 transition-all text-xs">💬</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border brand-border flex items-center justify-center text-brand-text-muted hover:text-white hover:bg-white/10 transition-all text-xs">🐦</a>
          </div>
        </div>
        <div className="mt-16 flex justify-between items-center">
          <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
            &copy; 2026 Leviathan Interactive
          </span>
          <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
            AI World Engine v2.0
          </span>
        </div>
      </div>
    </footer>
  )
}
