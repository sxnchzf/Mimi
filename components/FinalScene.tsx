
import React from 'react';

interface FinalSceneProps {
    note: string;
}

const FinalScene: React.FC<FinalSceneProps> = ({ note }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
        <div className="mb-12 relative">
            {/* Hug Animation */}
            <div className="flex items-center space-x-4">
                 <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center text-4xl animate-bounce">
                    🦝
                 </div>
                 <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center text-4xl animate-bounce [animation-delay:0.2s]">
                    👸
                 </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-ping opacity-40">❤️</div>
            </div>
        </div>

        <div className="max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
            <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-amber-50">
                {note}
            </p>
            
            <div className="mt-8 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>

        <div className="mt-16 font-handwriting text-3xl text-zinc-400">
            Con amor, siempre.
        </div>
    </div>
  );
};

export default FinalScene;
