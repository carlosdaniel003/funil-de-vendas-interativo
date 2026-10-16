export function RocketIllustration() {
  return (
    <svg className="rocket-illustration" viewBox="0 0 320 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração original de uma nave espacial futurista">
      <defs>
        <linearGradient id="rocket-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#eaffd4" />
          <stop offset="0.55" stopColor="#70d98a" />
          <stop offset="1" stopColor="#207950" />
        </linearGradient>
        <linearGradient id="flame" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f4ffd0" />
          <stop offset="0.48" stopColor="#ffc46d" />
          <stop offset="1" stopColor="#ff6d5c" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#45e68b" stopOpacity="0.25" />
          <stop offset="1" stopColor="#45e68b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="150" r="136" fill="url(#halo)" />
      <g className="rocket-vector-hud" fill="none" stroke="#95fcb9">
        <circle cx="160" cy="150" r="115" strokeWidth="1.5" strokeOpacity=".31" strokeDasharray="8 14" />
        <circle className="rocket-vector-hud__orbit" cx="160" cy="150" r="131" strokeWidth="1" strokeOpacity=".4" strokeDasharray="2 18" />
        <path d="M27 77v-20h22M271 57h22v20M27 221v20h22M271 241h22v-20" strokeWidth="2" strokeOpacity=".8" />
        <path d="M31 150h31m196 0h31M160 11v21M160 259v20" strokeWidth="1.4" strokeOpacity=".48" />
        <path d="m43 122 7-7m220 70 7-7" strokeWidth="2.2" strokeOpacity=".85" />
      </g>
      <ellipse cx="160" cy="255" rx="98" ry="14" fill="#21c769" fillOpacity="0.08" />
      <path d="M138 204h44l-9 70-13 16-13-16z" fill="url(#flame)" className="rocket-flame" />
      <path d="M141 202h38l-10 39h-18z" fill="#477b5b" stroke="#a3f5b0" strokeWidth="2" />
      <path d="M146 150c-30 9-44 25-50 68 18-8 32-10 49-8z" fill="#226b4d" stroke="#80e0a0" strokeWidth="3" />
      <path d="M174 150c30 9 44 25 50 68-18-8-32-10-49-8z" fill="#226b4d" stroke="#80e0a0" strokeWidth="3" />
      <path d="M160 29C115 72 117 157 137 211h46c20-54 22-139-23-182Z" fill="url(#rocket-body)" stroke="#cbffbe" strokeWidth="4" strokeLinejoin="round" />
      <path d="M160 29c-12 13-22 29-30 47h60c-8-18-18-34-30-47Z" fill="#c8fc96" />
      <path d="M135 168h50" stroke="#20774f" strokeWidth="3" />
      <circle cx="160" cy="125" r="28" fill="#0d2e2b" stroke="#e5ffd7" strokeWidth="6" />
      <circle cx="160" cy="125" r="17" fill="#43b8ac" />
      <path d="M151 112a18 18 0 0 1 18 2" fill="none" stroke="#f3fff7" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M147 192h26" stroke="#205d4a" strokeWidth="4" strokeLinecap="round" />
      <g fill="#a7ef67">
        <path d="m58 86 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        <path d="m269 66 2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
        <circle cx="245" cy="190" r="3" />
        <circle cx="70" cy="184" r="3" />
      </g>
      <g fill="none" stroke="#5fc98b" opacity="0.22">
        <circle cx="160" cy="148" r="122" />
        <circle cx="160" cy="148" r="100" strokeDasharray="4 10" />
      </g>
    </svg>
  );
}
