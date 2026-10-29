import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBrief } from './ui.jsx'

const CABINETS = [
  ['Forest', '#2f4a3f'], ['Bone', '#e8e1d3'], ['Harbor', '#46607a'], ['Walnut', '#6b4a33'], ['Ink', '#24272a'],
]
const COUNTERS = [
  ['Carrara', '#f1efeb', '#e6e2da'], ['Soapstone', '#3a3d3c', '#c9c4b8'], ['Warm quartz', '#cdbfa8', '#e3d9c6'],
]
const HARDWARE = [['Brass', '#c29445'], ['Matte black', '#1b1c1c'], ['Nickel', '#b8bcbe']]

function Swatch({ items, value, onPick, name }) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-3 flex flex-wrap gap-3">
      {items.map(([label, c]) => (
        <button key={label} type="button" role="radio" aria-checked={value === label} onClick={() => onPick(label)}
          className={`group flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-sm transition-colors ${value === label ? 'border-forest bg-forest text-cream' : 'border-forest/20 hover:border-forest/60'}`}>
          <span className="h-7 w-7 rounded-full border border-black/15" style={{ background: c }} />{label}
        </button>
      ))}
    </div>
  )
}

export default function KitchenStudio() {
  const { setBrief } = useBrief()
  const [cab, setCab] = useState('Forest')
  const [cnt, setCnt] = useState('Carrara')
  const [hw, setHw] = useState('Brass')
  const cabC = CABINETS.find((x) => x[0] === cab)[1]
  const [, cntC, splash] = COUNTERS.find((x) => x[0] === cnt)
  const hwC = HARDWARE.find((x) => x[0] === hw)[1]
  const t = { transition: 'fill .5s ease, stroke .5s ease' }
  const door = { fill: cabC, stroke: 'rgba(0,0,0,.28)', strokeWidth: 1.2, ...t }
  const pull = { fill: hwC, stroke: 'rgba(255,255,255,.3)', strokeWidth: .6, ...t }
  const lowerX = [30, 140, 350, 460]
  const upperX = [30, 112, 410, 492]

  return (
    <section id="studio" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-2xl bg-[#ece6dc] shadow-[0_30px_60px_-30px_rgba(38,51,46,.45)]">
          <svg viewBox="0 0 600 400" role="img" aria-label={`Kitchen with ${cab} cabinets, ${cnt} counters and ${hw} hardware`} className="block w-full">
            <rect width="600" height="400" fill="#ece6dc" />
            <rect y="330" width="600" height="70" fill="#cfc4b3" />
            <path d="M0 330H600" stroke="rgba(0,0,0,.15)" />
            {/* window */}
            <rect x="222" y="48" width="156" height="104" fill="#cfe0e4" stroke="#fbfaf6" strokeWidth="6" />
            <path d="M300 48V152M222 100H378" stroke="#fbfaf6" strokeWidth="4" />
            <path d="M232 140L290 60M268 140L300 100" stroke="#fff" strokeOpacity=".5" strokeWidth="6" />
            {/* uppers */}
            {upperX.map((x) => <rect key={x} x={x} y="40" width="78" height="112" style={door} />)}
            {upperX.map((x, i) => <rect key={'p' + x} x={i % 2 ? x + 8 : x + 62} y="108" width="5" height="30" rx="2" style={pull} />)}
            {/* backsplash + counter */}
            <rect x="30" y="156" width="540" height="62" style={{ fill: splash, transition: 'fill .5s ease' }} />
            {Array.from({ length: 18 }).map((_, i) => <path key={i} d={`M${30 + i * 30} 156V218`} stroke="rgba(0,0,0,.07)" />)}
            <path d="M30 187H570" stroke="rgba(0,0,0,.07)" />
            {/* range */}
            <rect x="248" y="196" width="104" height="134" fill="#2b2d2c" />
            <rect x="256" y="236" width="88" height="62" fill="#161817" stroke="#555" />
            <path d="M262 226H338" stroke={hwC} strokeWidth="3" style={t} />
            {[266, 284, 302, 320].map((x) => <circle key={x} cx={x} cy="212" r="4" fill="#777" />)}
            <rect x="246" y="150" width="108" height="48" fill="none" />
            {/* counter slab */}
            <rect x="20" y="216" width="560" height="16" style={{ fill: cntC, transition: 'fill .5s ease' }} />
            <rect x="20" y="232" width="560" height="3" fill="rgba(0,0,0,.18)" />
            {/* lowers */}
            {lowerX.map((x) => (
              <g key={x}>
                <rect x={x} y="236" width="108" height="30" style={door} />
                <rect x={x} y="268" width="108" height="62" style={door} />
                <rect x={x + 34} y="248" width="40" height="5" rx="2" style={pull} />
                <rect x={x + 94} y="276" width="5" height="26" rx="2" style={pull} />
              </g>
            ))}
            {/* life on the counter */}
            <ellipse cx="85" cy="209" rx="22" ry="7" fill="#e9d7b5" /><circle cx="76" cy="200" r="9" fill="#c98a3b" /><circle cx="94" cy="201" r="8" fill="#9db36b" />
            <rect x="492" y="184" width="14" height="32" rx="4" fill="#f4f1ea" stroke="rgba(0,0,0,.2)" /><path d="M499 184Q494 160 487 154M499 184Q504 162 512 152" stroke="#4d6a45" strokeWidth="2" fill="none" />
            {/* pendants */}
            <path d="M120 0V26M480 0V26" stroke="#3a3d3c" />
            <path d="M104 44a16 16 0 0 1 32 0Z" fill={hwC} style={t} /><path d="M464 44a16 16 0 0 1 32 0Z" fill={hwC} style={t} />
          </svg>
        </div>

        <div>
          <p className="label">Kitchen studio</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Choose the finishes. We’ll bring them to the consultation.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-forest/75">Try a few combinations on the kitchen at left. Whatever you land on goes into your request, so Rachel can start from your taste instead of a blank page.</p>
          <div className="mt-8 space-y-6">
            <div><h3 className="text-sm font-semibold">Cabinets</h3><Swatch name="Cabinet color" items={CABINETS} value={cab} onPick={setCab} /></div>
            <div><h3 className="text-sm font-semibold">Counters</h3><Swatch name="Counter material" items={COUNTERS.map(([a, b]) => [a, b])} value={cnt} onPick={setCnt} /></div>
            <div><h3 className="text-sm font-semibold">Hardware</h3><Swatch name="Hardware finish" items={HARDWARE} value={hw} onPick={setHw} /></div>
          </div>
          <Link to="/contact" onClick={() => setBrief(`Kitchen finishes I like: ${cab} cabinets, ${cnt} counters, ${hw} hardware.`)} className="btn mt-9 bg-forest text-cream hover:bg-brass">Add these to my request</Link>
        </div>
      </div>
    </section>
  )
}
