import { useEffect, useRef, useState } from 'react';
import { SpaceMusicEngine } from '../features/audio/spaceMusic';

/** Permanece montado durante toda a navegação do quiz. */
export function MusicToggle() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const engineRef = useRef<SpaceMusicEngine | null>(null);

  useEffect(() => {
    const engine = new SpaceMusicEngine();
    engineRef.current = engine;
    engine.start();

    const unlockAudio = (event: Event) => {
      if (!enabledRef.current) return;
      // Tocar no botão para silenciar não deve desbloquear o áudio antes de desligar.
      if (event.target instanceof Element && event.target.closest('[data-music-toggle]')) return;
      engineRef.current?.resume();
    };

    window.addEventListener('pointerdown', unlockAudio, true);
    window.addEventListener('keydown', unlockAudio, true);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio, true);
      window.removeEventListener('keydown', unlockAudio, true);
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, []);

  function toggleMusic() {
    const nextEnabled = !enabledRef.current;
    enabledRef.current = nextEnabled;
    setEnabled(nextEnabled);

    if (nextEnabled) {
      // Criar/retomar aqui, diretamente no clique, funciona melhor no Safari iOS.
      const engine = new SpaceMusicEngine();
      engineRef.current = engine;
      engine.start();
    } else {
      engineRef.current?.stop();
      engineRef.current = null;
    }
  }

  return (
    <button
      data-music-toggle
      className={'music-toggle' + (enabled ? ' music-toggle--enabled' : ' music-toggle--muted')}
      type="button"
      aria-label={enabled ? 'Desativar música de fundo' : 'Ativar música de fundo'}
      aria-pressed={enabled}
      title={enabled ? 'Desligar música' : 'Ligar música'}
      onClick={toggleMusic}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17V5l12-2v12" />
        <ellipse cx="6" cy="18" rx="3" ry="2.2" />
        <ellipse cx="18" cy="16" rx="3" ry="2.2" />
      </svg>
    </button>
  );
}
