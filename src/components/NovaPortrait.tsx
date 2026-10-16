export const NOVA_PORTRAIT_SRC = '/nova-avatar.svg?v=2' as const;

interface NovaPortraitProps {
  variant?: 'header' | 'intro' | 'dialogue';
  alt?: string;
}

/** A mesma ilustração é usada em TODAS as transmissões da comandante. */
export function NovaPortrait({ variant = 'dialogue', alt = 'Retrato da comandante Nova' }: NovaPortraitProps) {
  return (
    <span className={'nova-portrait nova-portrait--' + variant}>
      <img
        className="nova-portrait__image"
        src={NOVA_PORTRAIT_SRC}
        alt={alt}
        width="240"
        height="240"
        decoding="async"
      />
      <span className="nova-portrait__corner nova-portrait__corner--a" aria-hidden="true" />
      <span className="nova-portrait__corner nova-portrait__corner--b" aria-hidden="true" />
      <span className="nova-portrait__signal" aria-hidden="true" />
    </span>
  );
}
