
import React, { useEffect, useRef } from 'react';

interface LetterScrollProps {
  paragraphs: string[];
  onFinish: () => void;
}

const LetterScroll: React.FC<LetterScrollProps> = ({ paragraphs, onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startTime: number | null = null;
    const duration = 160000; // 2 minutes approx for long reading
    const totalHeight = container.scrollHeight + window.innerHeight;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const scrollY = (progress / duration) * totalHeight;

      container.scrollTop = scrollY;

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [onFinish]);

  // Map paragraphs to some icons to represent the message
  const getIconForIndex = (index: number) => {
    const icons = ['✨', '🎂', '🫂', '👯‍♀️', '🌱', '❤️', '🌙', '🌊', '🏠', '🕊️', '☀️', '🌈', '👣', '💖', '🎞️'];
    return icons[index % icons.length];
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-zinc-950 overflow-hidden scrollbar-hide flex flex-col items-center pt-[100vh] pb-[50vh]"
    >
      <div className="max-w-2xl w-full px-6 text-center space-y-20">
        <h1 className="text-5xl md:text-7xl font-handwriting text-amber-100 mb-32 animate-pulse">
            Feliz Cumpleaños, Mia
        </h1>

        {paragraphs.map((text, i) => (
          <div key={i} className="group relative">
            <div className="text-3xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {getIconForIcon(i)}
            </div>
            <p className="text-lg md:text-2xl leading-relaxed font-serif text-zinc-200">
              {text}
            </p>
          </div>
        ))}

        <div className="h-64 flex items-center justify-center">
            <div className="w-1 h-32 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </div>
    </div>
  );
};

// Helper for icons mapping
const getIconForIcon = (index: number) => {
    const icons = ['🎂', '👭', '⭐', '🌊', '🌱', '❤️', '🌙', '📣', '🏡', '🕊️', '✨', '🫂', '🎞️', '🗝️', '☀️'];
    return icons[index % icons.length];
};

export default LetterScroll;
