import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { SpaceMusicEngine, type SoundEffect } from './spaceMusic';

interface SoundControls {
  enabled: boolean;
  toggle: () => void;
  play: (effect: SoundEffect) => void;
}

const SoundContext = createContext<SoundControls | null>(null);

/** Música e efeitos compartilham uma instância de áudio e a mesma preferência. */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const foregroundRef = useRef(true);
  const engineRef = useRef<SpaceMusicEngine | null>(null);

  /**
   * O áudio só pode tocar quando esta página estiver realmente em primeiro plano.
   * Após mudar de aba ou minimizar, criamos um motor novo ao retornar: assim não
   * ficam notas ou efeitos agendados tocando em segundo plano.
   */
  const ensureAudio = useCallback(() => {
    if (!enabledRef.current || !foregroundRef.current || document.hidden) return;

    if (!engineRef.current) {
      const engine = new SpaceMusicEngine();
      engineRef.current = engine;
      engine.start();
      return;
    }

    engineRef.current.resume();
  }, []);

  const stopAudio = useCallback(() => {
    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  const play = useCallback((effect: SoundEffect) => {
    if (!enabledRef.current || !foregroundRef.current || document.hidden) return;
    engineRef.current?.playEffect(effect);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);

    if (!next) {
      stopAudio();
      return;
    }

    // Ligar pelo botão é um gesto explícito. Nunca reativa numa aba oculta.
    ensureAudio();
    if (foregroundRef.current && !document.hidden) {
      engineRef.current?.playEffect('power');
    }
  }, [ensureAudio, stopAudio]);

  useEffect(() => {
    foregroundRef.current = !document.hidden;
    ensureAudio(); // Tentativa inicial; autoplay depende da permissão do navegador.

    const goToBackground = () => {
      foregroundRef.current = false;
      stopAudio();
    };

    const returnToForeground = () => {
      foregroundRef.current = !document.hidden;
      ensureAudio();
    };

    const activateFromGesture = (target: EventTarget | null) => {
      if (document.hidden) return;
      foregroundRef.current = true;
      // Não inicia a trilha apenas para desligá-la no mesmo toque.
      if (target instanceof Element && target.closest('[data-music-toggle]')) return;
      ensureAudio();
    };

    function onPointerDown(event: PointerEvent) {
      activateFromGesture(event.target);
    }
    function onTouchStart(event: TouchEvent) {
      activateFromGesture(event.target);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (!event.repeat) activateFromGesture(event.target);
    }
    function onClick(event: MouseEvent) {
      if (!enabledRef.current || !foregroundRef.current || document.hidden ||
          !(event.target instanceof Element)) return;
      const button = event.target.closest('button');
      if (!button || button.disabled || button.hasAttribute('data-music-toggle')) return;
      // As alternativas possuem seu próprio efeito, sem som de clique duplicado.
      if (button.classList.contains('option-card')) return;
      engineRef.current?.playEffect('click');
    }
    function onFocusIn(event: FocusEvent) {
      if (!enabledRef.current || !foregroundRef.current || document.hidden ||
          !(event.target instanceof Element)) return;
      if (event.target.matches('input, textarea, select')) {
        engineRef.current?.playEffect('click');
      }
    }
    function onVisibilityChange() {
      if (document.hidden) goToBackground();
      else returnToForeground();
    }

    // visibilitychange: troca de aba ou aplicativo (Android, iOS, desktop).
    document.addEventListener('visibilitychange', onVisibilityChange);
    // blur/focus: cobre alguns navegadores móveis que não ocultam a aba ao sair.
    window.addEventListener('blur', goToBackground);
    window.addEventListener('focus', returnToForeground);
    // pagehide/pageshow: navegação, congelamento e restauração do histórico.
    window.addEventListener('pagehide', goToBackground);
    window.addEventListener('pageshow', returnToForeground);
    // Ciclo Page Lifecycle (Chrome Android), quando disponível.
    document.addEventListener('freeze', goToBackground);
    document.addEventListener('resume', returnToForeground);

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onTouchStart, { capture: true, passive: true });
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocusIn, true);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', goToBackground);
      window.removeEventListener('focus', returnToForeground);
      window.removeEventListener('pagehide', goToBackground);
      window.removeEventListener('pageshow', returnToForeground);
      document.removeEventListener('freeze', goToBackground);
      document.removeEventListener('resume', returnToForeground);

      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('touchstart', onTouchStart, true);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn, true);

      stopAudio();
    };
  }, [ensureAudio, stopAudio]);

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
