import { useEffect } from 'react';
import { useSound } from '../features/audio/SoundProvider';

interface LoadingScreenProps {
  onFinish: () => void;
}

const LOADING_TIME_MS = 1900;
const COMPLETION_CUE_ADVANCE_MS = 460;

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const { play } = useSound();

  useEffect(() => {
    play('loading');
    const scanner = window.setInterval(() => play('scan'), 520);
    const completionCue = window.setTimeout(() => {
      // Para a varredura e toca a confirmação antes de iniciar os confetes.
      window.clearInterval(scanner);
      play('loading-complete');
    }, LOADING_TIME_MS - COMPLETION_CUE_ADVANCE_MS);
    const timer = window.setTimeout(onFinish, LOADING_TIME_MS);

    return () => {
      window.clearTimeout(completionCue);
      window.clearTimeout(timer);
      window.clearInterval(scanner);
    };
  }, [onFinish, play]);

  return (
    <section className="loading-screen" aria-labelledby="loading-title" aria-busy="true">
      <div className="loading-orbit" aria-hidden="true">
        <span className="loading-planet" />
        <span className="loading-satellite" />
      </div>
      <div className="completion-marker">ANÁLISE EM ANDAMENTO</div>
      <h1 id="loading-title" className="stage-title">CALCULANDO SUA ROTA...</h1>
      <p>Comparando suas escolhas com quatro naves do catálogo fictício.</p>
      <div className="loading-track" aria-hidden="true"><span /></div>
      <p role="status" className="advance-notice">PROCESSANDO COORDENADAS</p>
    </section>
  );
}
