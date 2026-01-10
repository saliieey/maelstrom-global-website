/**
 * Homepage - Maelstrom Global Website
 * This page will be implemented once the design is ready from the graphic design team.
 * Content scrolls below the fixed glassmorphism navigation bar.
 */

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg" 
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
            Maelstrom Global
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Website development in progress. Homepage design pending.
          </p>
        </div>
        
        {/* Demo content to show scrolling effect below navigation */}
        <div className="mt-32 space-y-16">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="p-8 rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl"
              style={{
                backdropFilter: 'blur(10px) saturate(180%)',
                WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Section {i + 1}
              </h2>
              <p className="text-white/90 leading-relaxed">
                This is demo content to demonstrate that content scrolls below the fixed glassmorphism navigation bar. 
                The navigation bar stays fixed at the top while you scroll through the page content. 
                Notice how the gradient background shows through the translucent navigation bar, creating a beautiful glassmorphism effect.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
