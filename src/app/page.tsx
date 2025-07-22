import Player from "./components/Player";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Base urban gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/30 to-black" />
        
        {/* Neon accent gradients */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent" 
             style={{ backgroundPosition: '20% 80%' }} />
        <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent" 
             style={{ backgroundPosition: '80% 20%' }} />
        
        {/* Grid overlay - cyber aesthetic */}
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-15"
          style={{ backgroundSize: '60px 60px' }}
        />
        
        {/* City silhouette - Delhi skyline */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-80 bg-[url('/city.svg')] bg-repeat-x opacity-25 animate-slide"
          style={{ backgroundSize: 'auto 100%' }}
        />
        
        {/* Floating particles - urban dust/smoke */}
        <div 
          className="absolute inset-0 bg-[url('/particles.svg')] bg-repeat opacity-8 animate-float"
          style={{ backgroundSize: '300px 300px' }}
        />
        
        {/* Anime-style scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent absolute top-1/4 animate-pulse" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent absolute top-3/4 animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Player />
      </div>
    </div>
  );
}
