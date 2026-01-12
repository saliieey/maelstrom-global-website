export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg" 
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
          404
        </h1>
        <h2 className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
          This page could not be found.
        </h2>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors duration-200"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}

