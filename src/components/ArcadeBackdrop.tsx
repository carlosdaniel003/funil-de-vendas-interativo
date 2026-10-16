/**
 * Cenário em vetores e traços de radar — a interface continua em HTML.
 * Decorativo, não recebe foco ou eventos e não faz trabalho em cada frame.
 */
const stars = Array.from({ length: 46 }, (_, index) => ({
  x: (index * 251 + 83) % 1370 + 30,
  y: (index * 173 + 97) % 840 + 24,
  radius: index % 11 === 0 ? 2.1 : index % 4 === 0 ? 1.45 : 0.7,
  opacity: 0.13 + (index % 6) * 0.095,
}));

export function ArcadeBackdrop() {
  return (
    <div className="arcade-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" focusable="false">
        <defs>
          <radialGradient id="arcade-planet-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#257b6a" stopOpacity=".48" />
            <stop offset=".6" stopColor="#10503e" stopOpacity=".23" />
            <stop offset="1" stopColor="#061910" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arcade-horizon">
            <stop stopColor="#57ffaf" stopOpacity="0" />
            <stop offset=".5" stopColor="#65fda9" stopOpacity=".21" />
            <stop offset="1" stopColor="#57ffaf" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="arcade-backdrop__stars" fill="#a6f8c0">
          {stars.map((star, index) => (
            <circle key={index} cx={star.x} cy={star.y} r={star.radius} opacity={star.opacity} />
          ))}
        </g>
        <g fill="none" stroke="#51dd97" strokeWidth="1.5">
          <path d="M70 170h55m-55 0v48m1300-130h-55m55 0v50" opacity=".24" />
          <path d="M50 734h65m-65 0v-56M1390 752h-65m65 0v-56" opacity=".24" />
          <path d="M-90 695Q720 427 1530 695" opacity=".16" stroke="url(#arcade-horizon)" strokeWidth="2" />
          <path d="M-70 745Q720 492 1510 745" opacity=".12" strokeDasharray="5 17" />
          <path d="M-70 802Q720 569 1510 802" opacity=".1" />
        </g>
        <g className="arcade-backdrop__orbit" transform="translate(1125 220)">
          <circle r="176" fill="url(#arcade-planet-fill)" />
          <circle r="174" fill="none" stroke="#75e3bd" strokeOpacity=".17" strokeWidth="2" />
          <circle r="140" fill="none" stroke="#76e6b7" strokeOpacity=".22" strokeDasharray="4 13" />
          <circle r="109" fill="none" stroke="#78f5d3" strokeOpacity=".11" />
          <ellipse rx="215" ry="49" transform="rotate(-25)" fill="none" stroke="#7afad2" strokeOpacity=".13" strokeWidth="3" />
          <circle cx="-110" cy="-89" r="5" fill="#b7ffcf" opacity=".58" />
          <path d="M-22 0h44m-22-22v44" stroke="#84e1bf" strokeOpacity=".27" />
          <path d="M-192 0h29M163 0h29M0-192v29M0 163v29" stroke="#4cbb8c" strokeOpacity=".28" strokeWidth="2" />
        </g>
        <g fill="none" stroke="#59d995" strokeOpacity=".16" strokeWidth="1.3">
          <path d="M175 130h90l30-22h66M130 250h78l17 17h56M1164 653h66l33-33h77" />
          <circle cx="175" cy="130" r="3" fill="#8bffb1" />
          <circle cx="281" cy="267" r="3" fill="#8bffb1" />
          <circle cx="1164" cy="653" r="3" fill="#8bffb1" />
        </g>
      </svg>
    </div>
  );
}
