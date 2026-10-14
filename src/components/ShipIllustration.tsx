import type { ShipId } from '../features/recommendation/ships';

interface ShipIllustrationProps {
  shipId: ShipId;
  name: string;
}

/** Silhuetas SVG originais. Cada modelo usa um desenho específico. */
const hulls: Record<ShipId, string> = {
  swift: 'M165 27 215 107 276 160 211 172 193 201 137 201 119 172 54 160 115 107Z',
  atlas: 'M165 35 206 81 228 124 281 142 265 187 198 183 183 214 147 214 132 183 65 187 49 142 102 124 124 81Z',
  aegis: 'M165 38 236 84 269 158 221 194 189 207 141 207 109 194 61 158 94 84Z',
  discovery: 'M165 28 198 107 276 117 249 162 198 171 180 207 150 207 132 171 81 162 54 117 132 107Z',
};

export function ShipIllustration({ shipId, name }: ShipIllustrationProps) {
  return (
    <svg className={'ship-art ship-art--' + shipId} viewBox="0 0 330 250" role="img" aria-label={'Ilustração da nave fictícia ' + name}>
      <defs>
        <linearGradient id="ship-hull" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#dbffd4" />
          <stop offset=".5" stopColor="#63dd8c" />
          <stop offset="1" stopColor="#1c725b" />
        </linearGradient>
        <radialGradient id="ship-glow">
          <stop offset="0" stopColor="#6afb84" stopOpacity=".30" />
          <stop offset="1" stopColor="#6afb84" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="165" cy="139" rx="150" ry="106" fill="url(#ship-glow)" />
      <ellipse cx="165" cy="219" rx="104" ry="11" fill="#41dc85" opacity=".16" />
      <path d={hulls[shipId]} fill="url(#ship-hull)" stroke="#d7ffcc" strokeWidth="3" strokeLinejoin="round" />
      <path d="M165 55 186 134 165 165 144 134Z" fill="#0a3936" stroke="#d2ffc1" strokeWidth="3" />
      <path d="M150 121 165 91 180 121" fill="none" stroke="#5bd9e8" strokeWidth="7" strokeLinecap="round" />
      <path d="M127 188h17l-8 38Zm59 0h17l-8 38Z" fill="#e5a45d" opacity=".8" />
      <path d="M90 158h44m62 0h44" stroke="#064c3e" strokeWidth="5" strokeLinecap="round" />
      <g fill="#b8ff7f"><circle cx="38" cy="78" r="2" /><circle cx="293" cy="61" r="3" /><circle cx="282" cy="214" r="2" /></g>
    </svg>
  );
}
