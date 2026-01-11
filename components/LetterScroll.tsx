
import React, { useEffect, useRef } from 'react';

interface LetterScrollProps {
  paragraphs: string[];
  onFinish: () => void;
}

const icons = [
  '🎂','👭','⭐','🌊','🌱','❤️','🌙','📣','🏡','🕊️','✨','🫂','🎞️','🗝️','☀️'
];

const LetterScroll: React.FC<LetterScrollProps> = ({ paragraphs, onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startTime: number | null = null;
    const duration = 160000;
    const totalHeight = container.scrollHeight + window.innerHeight;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      container.scrollTop = (progress / duration) * totalHeight;

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-zinc-950 overflow-hidden flex flex-col items-center pt-[100vh] pb-[50vh]"
    >
      <div className="max-w-2xl w-full px-6 text-center space-y-20">
        <h1 className="text-5xl md:text-7xl font-handwriting text-amber-100 mb-32">
          Feliz Cumpleaños, Mia
        </h1>

        {paragraphs.map((text, i) => (
          <div key={i} className="relative">
            <div className="text-3xl mb-4 opacity-60">
              {icons[i % icons.length]}
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

export default LetterScroll;
