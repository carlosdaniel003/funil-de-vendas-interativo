import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  animated: boolean;
  onComplete: () => void;
  onCharacter?: (character: string) => void;
}

const CHARACTER_INTERVAL_MS = 28;
const READING_PAUSE_MS = 440;

/**
 * O evento de término depende da quantidade de caracteres revelados,
 * não de um tempo fixo calculado em outro componente.
 */
export function TypewriterText({ text, animated, onComplete, onCharacter }: TypewriterTextProps) {
  const characters = Array.from(text);
  const [visibleCount, setVisibleCount] = useState(animated ? 0 : characters.length);
  const onCompleteRef = useRef(onComplete);
  const onCharacterRef = useRef(onCharacter);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onCharacterRef.current = onCharacter;
  }, [onComplete, onCharacter]);

  useEffect(() => {
    if (!animated) {
      setVisibleCount(characters.length);
      return;
    }

    setVisibleCount(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCount(characters.length);
      return;
    }

    let revealed = 0;
    const intervalId = window.setInterval(() => {
      revealed += 1;
      setVisibleCount(revealed);
      const character = characters[revealed - 1];
      if (character) onCharacterRef.current?.(character);

      if (revealed >= characters.length) window.clearInterval(intervalId);
    }, CHARACTER_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [animated, text, characters.length]);

  useEffect(() => {
    if (!animated || visibleCount < characters.length) return;

    // Pequena pausa para o último caractere permanecer legível antes da troca.
    const timeoutId = window.setTimeout(() => onCompleteRef.current(), READING_PAUSE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [animated, visibleCount, characters.length]);

  return <>{characters.slice(0, visibleCount).join('')}</>;
}
