/**
 * Emblema vetorial do sistema de navegação NOVA.
 * Sem imagens externas: mesmas coordenadas e identidade em todo o funil.
 */
export function HudGlyph() {
  return (
    <svg className="hud-glyph" viewBox="0 0 88 88" width="88" height="88" focusable="false" aria-hidden="true">
      <circle cx="44" cy="44" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".28" />
      <circle cx="44" cy="44" r="25" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 7" opacity=".58" />
      <circle cx="44" cy="44" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M44 3v20M44 65v20M3 44h20m42 0h20" stroke="currentColor" strokeWidth="1.7" opacity=".78" />
      <path d="m44 34 5 10-5 10-5-10Z" fill="currentColor" />
      <path className="hud-glyph__sweep" d="M44 44 44 13A31 31 0 0 1 75 44Z" fill="currentColor" opacity=".12" />
      <circle cx="69" cy="26" r="3.2" fill="#d3ffac" />
      <path d="M10 10h11M10 10v11M78 10H67M78 10v11M10 78h11M10 78V67M78 78H67M78 78V67" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
