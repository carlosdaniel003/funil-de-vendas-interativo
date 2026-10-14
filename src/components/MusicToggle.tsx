import { useSound } from '../features/audio/SoundProvider';

/** Botão fixo: uma nota iluminada quando ativo, translúcida quando silenciado. */
export function MusicToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      data-music-toggle
      className={'music-toggle' + (enabled ? ' music-toggle--enabled' : ' music-toggle--muted')}
      type="button"
      aria-label={enabled ? 'Desativar todos os sons' : 'Ativar todos os sons'}
      aria-pressed={enabled}
      title={enabled ? 'Desligar som' : 'Ligar som'}
      onClick={toggle}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17V5l12-2v12" />
        <ellipse cx="6" cy="18" rx="3" ry="2.2" />
        <ellipse cx="18" cy="16" rx="3" ry="2.2" />
      </svg>
    </button>
  );
}
