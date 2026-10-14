import { useEffect, type CSSProperties } from 'react';
import { useSound } from '../features/audio/SoundProvider';

interface CelebrationScreenProps {
  onFinish: () => void;
}

const CELEBRATION_DURATION_MS = 1550;
const COLORS = ['#aaff69', '#39e99d', '#d9fff2', '#ffdc6a', '#6acbff', '#ffffff'];

/** Posições distribuídas sem aleatoriedade, para manter o visual previsível. */
const confetti = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  left: `${(index * 67 + 23) % 101}%`,
  delay: `${((index * 11) % 19) * 18}ms`,
  duration: `${900 + (index % 5) * 65}ms`,
  drift: `${((index * 37) % 160) - 80}px`,
  rotation: `${(index % 2 ? 1 : -1) * (300 + index * 12)}deg`,
  color: COLORS[index % COLORS.length],
}));

export function CelebrationScreen({ onFinish }: CelebrationScreenProps) {
  const { play } = useSound();

  useEffect(() => {
    play('celebrate');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timerId = window.setTimeout(onFinish, prefersReducedMotion ? 500 : CELEBRATION_DURATION_MS);
    return () => window.clearTimeout(timerId);
  }, [onFinish, play]);

  return (
    <section className="celebration-screen" aria-labelledby="celebration-title">
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              '--drift': piece.drift,
              '--rotation': piece.rotation,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="celebration-core">
        <div className="celebration-spark" aria-hidden="true">✦</div>
        <span className="completion-marker">COORDENADAS CONFIRMADAS</span>
        <h1 id="celebration-title">NAVE ENCONTRADA!</h1>
        <p>Preparando a apresentação da sua nave.</p>
      </div>
    </section>
  );
}
