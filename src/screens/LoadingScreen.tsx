import { useEffect } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
}

const LOADING_TIME_MS = 1900;

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, LOADING_TIME_MS);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

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
