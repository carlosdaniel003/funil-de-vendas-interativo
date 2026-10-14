import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { SpaceMusicEngine, type SoundEffect } from './spaceMusic';

interface SoundControls {
  enabled: boolean;
  toggle: () => void;
  play: (effect: SoundEffect) => void;
}

const SoundContext = createContext<SoundControls | null>(null);

/** Uma única instância de áudio, compartilhada por todo o funil. */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const engineRef = useRef<SpaceMusicEngine | null>(null);

  const play = useCallback((effect: SoundEffect) => {
    if (enabledRef.current) engineRef.current?.playEffect(effect);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);

    if (!next) {
      engineRef.current?.stop();
    } else {
      // O clique no botão é um gesto válido para desbloquear o contexto Web Audio.
      const engine = new SpaceMusicEngine();
      engineRef.current = engine;
      engine.start();
      engine.playEffect('power');
    }
  }, []);

  useEffect(() => {
    const engine = new SpaceMusicEngine();
    engineRef.current = engine;

    // Tentativa imediata. Se o navegador bloquear o áudio, liberamos no primeiro gesto.
    if (enabledRef.current) engine.start();

    const unlock = () => {
      if (enabledRef.current) engineRef.current?.resume();
    };

    function onPointerDown() {
      unlock();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (!event.repeat) unlock();
    }
    function onTouchStart() {
      unlock();
    }
    function onClick(event: MouseEvent) {
      if (!enabledRef.current || !(event.target instanceof Element)) return;
      const button = event.target.closest('button');
      if (!button || button.disabled || button.hasAttribute('data-music-toggle')) return;
      // Alternativas possuem efeito próprio, sem sobrepor dois cliques.
      if (button.classList.contains('option-card')) return;
      engineRef.current?.playEffect('click');
    }
    function onFocusIn(event: FocusEvent) {
      if (!enabledRef.current || !(event.target instanceof Element)) return;
      if (event.target.matches('input, textarea, select')) {
        engineRef.current?.playEffect('click');
      }
    }
    function onVisibilityChange() {
      if (!document.hidden) unlock();
    }

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onTouchStart, { capture: true, passive: true });
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('touchstart', onTouchStart, true);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundControls {
  const value = useContext(SoundContext);
  if (!value) throw new Error('useSound requer SoundProvider');
  return value;
}
