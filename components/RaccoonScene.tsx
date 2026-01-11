
import React, { useState, useEffect } from 'react';

interface RaccoonSceneProps {
  onComplete: () => void;
  onInteraction: () => void;
}

const RaccoonScene: React.FC<RaccoonSceneProps> = ({ onComplete, onInteraction }) => {
  const [phase, setPhase] = useState<'alone' | 'message' | 'slapped' | 'hugged'>('alone');
  const [dustParticles, setDustParticles] = useState<any[]>([]);

  useEffect(() => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setDustParticles(particles);
  }, []);

  const handleClick = () => {
    onInteraction();
    if (phase === 'alone') {
      setPhase('message');
    } else if (phase === 'message') {
      setPhase('slapped');
      // Transition to hugged after a brief moment
      setTimeout(() => {
        setPhase('hugged');
        setTimeout(() => {
            onComplete();
        }, 1500);
      }, 1000);
    }
  };

  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-zinc-950 transition-all duration-1000 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Dust particles */}
      {dustParticles.map(p => (
        <div 
          key={p.id}
          className="dust-particle animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            opacity: 0.3
          }}
        />
      )}

      {/* Spiderwebs (SVGs) */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 text-zinc-400">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M0,0 L100,100 M0,20 L80,100 M0,40 L60,100 M20,0 L100,80 M40,0 L100,60" />
          <path d="M10,10 Q50,0 90,10 Q100,50 90,90 Q50,100 10,90 Q0,50 10,10" />
        </svg>
      </div>

      <div className="text-center mb-8">
        <h2 className={`text-zinc-600 font-serif italic transition-opacity duration-1000 ${phase === 'alone' ? 'opacity-100' : 'opacity-0'}`}>
          Un rincón olvidado...
        </h2>
      </div>

      <div className="relative">
        {/* Box */}
        <div className="w-64 h-48 border-4 border-amber-900 bg-amber-950/20 relative z-10 flex items-end justify-center rounded-b-lg">
            {/* Raccoon Body */}
            <div className={`transition-all duration-500 transform ${phase === 'slapped' ? 'animate-shake' : ''} ${phase === 'hugged' ? 'scale-110' : ''}`}>
                <div className="relative w-32 h-32 bg-zinc-700 rounded-full flex flex-col items-center justify-center border-2 border-zinc-600">
                    {/* Mask */}
                    <div className="absolute top-8 w-full h-8 bg-zinc-900 rounded-full flex justify-around items-center px-4">
                        {/* Eyes */}
                        <div className="w-3 h-3 bg-white rounded-full relative">
                            {phase === 'alone' || phase === 'message' ? (
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-300 opacity-80 animate-pulse" />
                            ) : phase === 'slapped' ? (
                                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-black">X</div>
                            ) : (
                                <div className="w-1.5 h-1.5 bg-black rounded-full m-auto mt-0.5" />
                            )}
                        </div>
                        <div className="w-3 h-3 bg-white rounded-full relative">
                            {phase === 'alone' || phase === 'message' ? (
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-300 opacity-80 animate-pulse" />
                            ) : phase === 'slapped' ? (
                                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-black">X</div>
                            ) : (
                                <div className="w-1.5 h-1.5 bg-black rounded-full m-auto mt-0.5" />
                            )}
                        </div>
                    </div>
                    {/* Tears */}
                    {(phase === 'alone' || phase === 'message') && (
                        <div className="absolute top-12 left-1/4 w-1 h-3 bg-blue-400 rounded-full animate-bounce" />
                    )}
                    {(phase === 'alone' || phase === 'message') && (
                        <div className="absolute top-12 right-1/4 w-1 h-3 bg-blue-400 rounded-full animate-bounce delay-150" />
                    )}
                    
                    {/* Nose */}
                    <div className="w-4 h-4 bg-zinc-900 rounded-full mt-10" />
                </div>

                {/* Hug Arms */}
                {phase === 'hugged' && (
                    <div className="absolute -inset-4 border-4 border-pink-400/40 rounded-full animate-ping opacity-50" />
                )}
            </div>
            
            {/* Box Front Cover */}
            <div className="absolute -bottom-1 -left-1 -right-1 h-12 border-4 border-amber-900 bg-amber-900/40 rounded-b-lg" />
        </div>

        {/* Text Bubbles */}
        {phase === 'message' && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-2xl shadow-xl font-medium animate-bounce after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white">
                "no la he superado..."
            </div>
        )}

        {phase === 'slapped' && (
            <div className="absolute -right-12 top-0 text-4xl animate-ping">
                👋💥
            </div>
        )}
        
        {phase === 'hugged' && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center text-pink-300 font-handwriting text-3xl animate-float">
                ¡Ánimo! Te quiero mucho.
            </div>
        )}
      </div>

      <div className="mt-12 text-zinc-500 text-sm animate-pulse">
        {phase === 'alone' && "Toca al mapache..."}
        {phase === 'message' && "Él necesita reaccionar..."}
      </div>
    </div>
  );
};

export default RaccoonScene;
