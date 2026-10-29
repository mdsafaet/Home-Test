import { useState } from 'react'

/* Swap <BeforeScene /> and <AfterScene /> for two <img> tags (same crop) once real photos arrive. */
const bodyStuds = Array.from({ length: 13 }).map((_, i) => 130 + i * 28.3)

function BeforeScene() {
  return (
    <svg viewBox="0 0 600 450" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="450" fill="#dcd8d0" />
      <rect y="380" width="600" height="70" fill="#b9ad9a" />
      <g stroke="#8a7a62" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M130 380V230H470V380M130 230H470M130 248H470" />
        {bodyStuds.map((x) => <path key={x} d={`M${x} 248V380`} />)}
        <path d="M100 235L300 110L500 235" strokeWidth="2.4" />
        {[160, 200, 240, 280, 320, 360, 400, 440].map((x) => <path key={x} d={`M${x} ${x < 300 ? 205 : 205}L300 110`} strokeWidth="1" opacity=".0" />)}
        <path d="M300 110V235M200 172V235M400 172V235M250 141V235M350 141V235" strokeWidth="1.2" />
        <path d="M140 218L300 118L460 218" strokeWidth="1" />
      </g>
      <rect x="300" y="248" width="170" height="132" fill="#cdb792" opacity=".85" />
      <path d="M300 248V380M385 248V380M300 314H470" stroke="#a48f6c" />
      <rect x="160" y="270" width="60" height="50" fill="#dcd8d0" stroke="#8a7a62" strokeWidth="1.6" />
      <rect x="275" y="300" width="50" height="80" fill="#dcd8d0" stroke="#8a7a62" strokeWidth="1.6" />
      <path d="M60 380L90 350L130 380M470 380L520 345L560 380" stroke="#8a7a62" fill="#b0a48f" />
      <path d="M20 410H580" stroke="#9a8c76" strokeDasharray="6 8" />
    </svg>
  )
}

function AfterScene() {
  return (
    <svg viewBox="0 0 600 450" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="dusk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#22303b" /><stop offset=".7" stopColor="#c98a62" /><stop offset="1" stopColor="#efc387" /></linearGradient>
        <radialGradient id="warm" cx="50%" cy="70%" r="50%"><stop offset="0" stopColor="#f4c872" stopOpacity=".45" /><stop offset="1" stopColor="#f4c872" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="600" height="450" fill="url(#dusk)" />
      {[[60, 40], [150, 80], [450, 50], [540, 100], [330, 30]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.6" fill="#fff" opacity=".8" />)}
      <rect y="380" width="600" height="70" fill="#34503f" />
      <rect x="390" y="130" width="28" height="70" fill="#6b4f3e" />
      <path d="M100 235L300 110L500 235Z" fill="#2b3430" />
      <rect x="130" y="230" width="340" height="150" fill="#ebe4d4" />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M130 ${246 + i * 14}H470`} stroke="rgba(0,0,0,.08)" />)}
      <path d="M100 235H500" stroke="#fbfaf6" strokeWidth="5" />
      <rect x="160" y="270" width="60" height="50" fill="#f4c872" stroke="#fbfaf6" strokeWidth="5" /><path d="M190 270V320M160 295H220" stroke="#fbfaf6" strokeWidth="3" />
      <rect x="380" y="270" width="60" height="50" fill="#f4c872" stroke="#fbfaf6" strokeWidth="5" /><path d="M410 270V320M380 295H440" stroke="#fbfaf6" strokeWidth="3" />
      <circle cx="300" cy="185" r="16" fill="#f4c872" stroke="#fbfaf6" strokeWidth="4" />
      <rect x="275" y="300" width="50" height="80" fill="#8a5a2b" stroke="#fbfaf6" strokeWidth="4" /><circle cx="316" cy="342" r="2.6" fill="#f4c872" />
      <path d="M255 300H345V292H255Z" fill="#2b3430" />
      <path d="M285 380L270 420H330L315 380Z" fill="#cfc4b3" />
      <ellipse cx="300" cy="380" rx="260" ry="60" fill="url(#warm)" />
      {[[100, 372, 26], [160, 376, 20], [440, 376, 20], [500, 372, 26]].map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r} fill="#2f5139" />)}
    </svg>
  )
}

import { Img } from './Photo.jsx'

export default function BeforeAfter({ photos }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl bg-stone">
      {photos ? <Img k="before" className="absolute inset-0" /> : <BeforeScene />}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{photos ? <Img k="after" className="absolute inset-0" /> : <AfterScene />}</div>
      <span className="absolute left-4 top-4 bg-forest/90 px-3 py-1 text-xs text-cream">After</span>
      <span className="absolute right-4 top-4 bg-cream/90 px-3 py-1 text-xs text-forest">Before</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-cream shadow-[0_0_0_1px_rgba(38,51,46,.25)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-forest/20 bg-cream text-forest shadow-lg" aria-hidden="true">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1L1 6L6 11M16 1L21 6L16 11" /></svg>
        </span>
      </div>
      <input type="range" min="0" max="100" step="0.5" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Drag to compare the house before and after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}
