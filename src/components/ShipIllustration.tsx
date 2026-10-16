import { useId, type ReactNode } from 'react';
import { ships, type ShipId } from '../features/recommendation/ships';

interface ShipIllustrationProps {
  shipId: ShipId;
  name: string;
}

interface HullProps {
  hull: string;
  accent: string;
  shade: string;
}

/** Delta ágil, com asas longas e propulsores laterais. */
function AuroraHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M210 33 250 99 326 191 266 183 246 236 174 236 154 183 94 191 170 99Z"
        fill={hull} stroke={accent} strokeWidth="3" strokeLinejoin="round" />
      <path d="M170 112 93 198 168 171 189 118ZM250 112 327 198 252 171 231 118Z"
        fill={shade} stroke={accent} strokeWidth="2" />
      <path d="M210 60 232 136 210 191 188 136Z" fill="#0a3436" stroke="#d9fff2" strokeWidth="3" />
      <path d="M199 133 210 88 221 133" fill="none" stroke="#9ffff6" strokeWidth="8" strokeLinecap="round" />
      <path d="M179 217v43h17l8-43M241 217v43h-17l-8-43" fill={accent} opacity=".8" />
      <path d="M190 250 198 294 205 250M215 250 222 294 230 250" fill={accent} opacity=".52" />
      <path d="M126 179 174 160M246 160l48 19" stroke="#e2fff0" opacity=".65" strokeWidth="3" />
    </>
  );
}

/** Disco de pesquisa: fuselagem arredondada, antenas e anéis de sensores. */
function NebulonHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M207 60 245 85 263 115 342 149 350 190 305 211 266 198 239 239 181 239 154 198 115 211 70 190 78 149 157 115 175 85Z"
        fill={shade} stroke={accent} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="210" cy="166" rx="132" ry="70" fill={hull} stroke="#d2f5ff" strokeWidth="4" />
      <ellipse cx="210" cy="163" rx="110" ry="52" fill="none" stroke={shade} strokeWidth="7" opacity=".85" />
      <ellipse cx="210" cy="163" rx="88" ry="35" fill="none" stroke="#e1ffff" strokeWidth="2" strokeDasharray="10 9" opacity=".8" />
      <ellipse cx="210" cy="162" rx="48" ry="39" fill="#123e65" stroke="#f0fcff" strokeWidth="3" />
      <ellipse cx="210" cy="153" rx="29" ry="21" fill="#7ceeff" opacity=".83" />
      <path d="M210 115V55M190 62h40M210 55l-14-18m14 18 14-18" stroke={accent} strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="113" cy="169" r="8" fill="#d8fcff" />
      <circle cx="307" cy="169" r="8" fill="#d8fcff" />
      <rect x="159" y="215" width="26" height="25" rx="7" fill={shade} />
      <rect x="235" y="215" width="26" height="25" rx="7" fill={shade} />
      <path d="M164 240v43h16v-43M240 240v43h16v-43" fill={accent} opacity=".6" />
    </>
  );
}

/** Nave de comando: grandes painéis dourados e núcleo de escudo. */
function SolarisHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M210 30 257 89 290 128 355 169 321 204 279 203 257 248 163 248 141 203 99 204 65 169 130 128 163 89Z"
        fill={hull} stroke="#fff8c8" strokeWidth="4" strokeLinejoin="round" />
      <path d="M170 103 78 171l53 12 49-34ZM250 103l92 68-53 12-49-34Z"
        fill={shade} stroke={accent} strokeWidth="4" />
      <path d="M210 54 246 134 210 184 174 134Z" fill="#624525" stroke="#fff4c0" strokeWidth="4" />
      <path d="M210 71 230 135 210 166 190 135Z" fill="#fff6b2" opacity=".9" />
      <circle cx="210" cy="137" r="12" fill="#fffdf0" />
      <path d="M161 174 135 205l46-9m78-22 26 31-46-9" fill="none" stroke="#fff8d0" strokeWidth="6" strokeLinejoin="round" />
      <path d="M175 233v25h25v-19M245 233v25h-25v-19" fill={shade} stroke={accent} strokeWidth="3" />
      <path d="M184 257 185 295 199 259M236 257 235 295 221 259" fill={accent} opacity=".6" />
      <path d="M115 177h33M272 177h33" stroke="#fff9d2" strokeWidth="5" />
    </>
  );
}

/** Interceptadora: nariz estreito, asas em garras e motores de combate. */
function VortexHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M210 21 238 98 270 140 355 166 315 199 266 181 244 244 176 244 154 181 105 199 65 166 150 140 182 98Z"
        fill={hull} stroke="#ffd6da" strokeWidth="3" strokeLinejoin="round" />
      <path d="M148 143 55 158l52 54 65-27-5-34ZM272 143l93 15-52 54-65-27 5-34Z"
        fill={shade} stroke={accent} strokeWidth="3" strokeLinejoin="round" />
      <path d="M154 180 106 226 122 182M266 180l48 46-16-44" fill={shade} stroke={accent} strokeWidth="3" />
      <path d="M210 48 230 137 210 183 190 137Z" fill="#4a1a36" stroke="#ffd9e2" strokeWidth="3" />
      <path d="M203 127 210 73 217 127" stroke="#ffedfb" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M183 220h21l-5 26h-24ZM216 220h21l8 26h-24Z" fill={shade} />
      <path d="M179 245 182 296 195 245M225 245l13 51 3-51" fill={accent} opacity=".72" />
      <path d="M91 171l32 16M329 171l-32 16" stroke="#ffe3e3" strokeWidth="4" />
    </>
  );
}

/** Cargueira: casco volumoso, contêineres laterais e quatro motores. */
function AtlasHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M210 51 263 94 287 136 307 214 269 253H151l-38-39 20-78 24-42Z"
        fill={hull} stroke="#ffe2c0" strokeWidth="4" strokeLinejoin="round" />
      <rect x="60" y="127" width="87" height="104" rx="12" fill={shade} stroke={accent} strokeWidth="4" />
      <rect x="273" y="127" width="87" height="104" rx="12" fill={shade} stroke={accent} strokeWidth="4" />
      <rect x="73" y="141" width="60" height="26" rx="5" fill={accent} opacity=".85" />
      <rect x="287" y="141" width="60" height="26" rx="5" fill={accent} opacity=".85" />
      <path d="M74 188h61m-61 16h61M285 188h61m-61 16h61" stroke="#ffdbb2" strokeWidth="4" opacity=".85" />
      <path d="M210 75 239 129 210 169 181 129Z" fill="#244851" stroke="#fff0d7" strokeWidth="4" />
      <path d="M195 127 210 96 225 127" stroke="#a1efff" strokeWidth="8" fill="none" />
      <rect x="153" y="184" width="114" height="39" rx="8" fill={shade} opacity=".84" />
      <path d="M162 194h97m-97 14h97" stroke={accent} strokeWidth="4" />
      <rect x="84" y="228" width="35" height="25" rx="5" fill="#633a32" stroke={accent} strokeWidth="3" />
      <rect x="301" y="228" width="35" height="25" rx="5" fill="#633a32" stroke={accent} strokeWidth="3" />
      <rect x="161" y="246" width="35" height="19" rx="5" fill="#633a32" stroke={accent} strokeWidth="3" />
      <rect x="224" y="246" width="35" height="19" rx="5" fill="#633a32" stroke={accent} strokeWidth="3" />
      <path d="M94 251v38h14v-38M312 251v38h14v-38M170 264v30h17v-30M234 264v30h17v-30"
        fill={accent} opacity=".63" />
    </>
  );
}

/** Manta furtiva: asas curvas, corpo escuro e dois núcleos violetas. */
function OnyxHull({ hull, accent, shade }: HullProps) {
  return (
    <>
      <path d="M210 35 245 96Q294 141 370 122L336 174 373 211 296 209 258 251 210 222 162 251 124 209 47 211 84 174 50 122Q126 141 175 96Z"
        fill={shade} stroke={accent} strokeWidth="4" strokeLinejoin="round" />
      <path d="M211 55 242 122 299 179 251 213 210 191 169 213 121 179 178 122Z"
        fill={hull} stroke="#e5d0ff" strokeWidth="3" />
      <path d="M210 64 228 132 210 179 192 132Z" fill="#20143f" stroke="#efddff" strokeWidth="3" />
      <path d="M205 125 210 93 215 125" stroke="#c5f4ff" strokeWidth="6" fill="none" />
      <path d="M67 142 153 168 178 129M353 142 267 168l-25-39"
        fill="none" stroke={accent} strokeWidth="4" opacity=".8" />
      <path d="M105 203 159 201M315 203l-54-2" stroke="#f2e3ff" strokeWidth="3" opacity=".55" />
      <ellipse cx="177" cy="221" rx="16" ry="10" fill={accent} opacity=".8" />
      <ellipse cx="243" cy="221" rx="16" ry="10" fill={accent} opacity=".8" />
      <path d="M175 228 164 280 190 234M245 228l11 52-26-46"
        fill={accent} opacity=".45" />
      <path d="M160 236 210 220 260 236" fill="none" stroke="#e7d2ff" strokeWidth="3" opacity=".45" />
    </>
  );
}

const hulls = {
  aurora: AuroraHull,
  nebulon: NebulonHull,
  solaris: SolarisHull,
  vortex: VortexHull,
  atlas: AtlasHull,
  onyx: OnyxHull,
} satisfies Record<ShipId, (props: HullProps) => ReactNode>;

/** Seis desenhos SVG independentes: formato, detalhes e paleta de cada nave. */
export function ShipIllustration({ shipId, name }: ShipIllustrationProps) {
  const id = useId().replace(/:/g, '');
  const ship = ships.find((item) => item.id === shipId) ?? ships[0];
  const artwork = hulls[shipId];
  const gradient = 'ship-hull-' + id;
  const aura = 'ship-aura-' + id;
  const Hull = artwork;

  return (
    <svg className={'ship-art ship-art--' + shipId} viewBox="0 0 420 320"
      role="img" aria-label={'Ilustração da nave fictícia ' + name}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2=".85" y2="1">
          <stop offset="0" stopColor="#f1fffa" />
          <stop offset=".42" stopColor={ship.accent} />
          <stop offset="1" stopColor={ship.shade} />
        </linearGradient>
        <radialGradient id={aura}>
          <stop offset="0" stopColor={ship.accent} stopOpacity=".4" />
          <stop offset="1" stopColor={ship.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="170" rx="194" ry="142" fill={'url(#' + aura + ')'} />
      <g className="ship-vector-interface" fill="none" stroke={ship.accent}>
        <circle className="ship-vector-interface__orbit" cx="210" cy="160" r="149" strokeWidth="1.25" strokeOpacity=".33" strokeDasharray="3 13" />
        <path d="M42 80V51h28M350 51h28v29M42 240v28h28M350 268h28v-28" strokeWidth="2" strokeOpacity=".56" />
        <path d="M210 12v27M210 281v27M30 160h24M366 160h24" strokeWidth="1.5" strokeOpacity=".3" />
        <path d="m62 120 12-12m275 104 12-12" strokeWidth="2" strokeOpacity=".58" />
      </g>
      <g className="ship-vector-interface__readout" fill={ship.accent} opacity=".75" fontFamily="monospace" fontSize="11" letterSpacing="1">
        <text x="44" y="42">ARC / 06</text>
        <text x="298" y="42">{shipId.toUpperCase()}</text>
      </g>
      <ellipse cx="210" cy="291" rx="130" ry="10" fill={ship.accent} opacity=".15" />
      <path d="M24 275h75m222 0h75" stroke={ship.accent} strokeOpacity=".45" strokeWidth="1.5" />
      <g fill={ship.accent} opacity=".82">
        <circle cx="24" cy="71" r="2" /><circle cx="377" cy="55" r="3" />
        <circle cx="390" cy="240" r="2" /><circle cx="44" cy="235" r="1.5" />
        <circle cx="342" cy="32" r="1.5" />
      </g>
      <Hull hull={'url(#' + gradient + ')'} accent={ship.accent} shade={ship.shade} />
    </svg>
  );
}
