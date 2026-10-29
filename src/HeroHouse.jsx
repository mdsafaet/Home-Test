import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { heroDraw as d } from './art.jsx'

const STARS = [[60, 60], [150, 110], [230, 40], [330, 85], [420, 50], [560, 130], [600, 40], [90, 190], [520, 220], [380, 130]]
const rect = (x, y, w, h) => `M${x} ${y}h${w}v${h}h${-w}Z`
const pine = (x, base, h) => {
  const w = h * 0.22
  return `M${x} ${base}V${base - h * 0.16}M${x - w} ${base - h * 0.16}L${x} ${base - h * 0.55}L${x + w} ${base - h * 0.16}Z M${x - w * 0.8} ${base - h * 0.45}L${x} ${base - h * 0.82}L${x + w * 0.8} ${base - h * 0.45}Z M${x - w * 0.55} ${base - h * 0.72}L${x} ${base - h}L${x + w * 0.55} ${base - h * 0.72}Z`
}

export default function HeroHouse({ mx }) {
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const far = useTransform(sx, (v) => v * -6)
  const near = useTransform(sx, (v) => v * 14)
  const WIN = [rect(190, 335, 50, 44), rect(340, 335, 50, 44), rect(190, 405, 50, 42), rect(340, 405, 50, 42)]
  return (
    <svg viewBox="0 0 640 520" role="img" aria-label="Line drawing of a custom home at dusk with warm lit windows" className="h-full w-full overflow-visible text-cream" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <radialGradient id="glow" cx="50%" cy="60%" r="55%">
          <stop offset="0" stopColor="#f4c872" stopOpacity=".38" /><stop offset="1" stopColor="#f4c872" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f4c872" stopOpacity=".16" /><stop offset="1" stopColor="#f4c872" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g style={{ x: far }}>
        {STARS.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={i % 3 ? 1.2 : 1.8} fill="currentColor" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0.35, 0.8] }} transition={{ delay: 1.5 + i * 0.12, duration: 4 + (i % 4), repeat: Infinity, repeatType: 'mirror' }} />
        ))}
        <motion.circle cx="520" cy="95" r="26" stroke="#e3c48f" fill="#e3c48f" fillOpacity=".12" {...d(0.2, 1.6)} />
      </motion.g>

      <motion.ellipse cx="320" cy="420" rx="320" ry="190" fill="url(#glow)" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2.2 }} />

      <motion.path d="M0 470H640" {...d(0.1, 1.2)} />
      <motion.path d="M150 470V372H430V470" {...d(0.5)} />
      <motion.path d="M150 372V300H430V372" {...d(0.7)} />
      <motion.path d="M430 470V352H545V470M425 358L487 300L552 358" {...d(1.0)} />
      <motion.path d="M118 306L290 170L462 306" strokeWidth="2.2" {...d(1.2, 1.5)} />
      <motion.path d="M360 232V176H396V206" {...d(1.7)} />
      <motion.path d="M272 470V392H312V470" stroke="#e3c48f" {...d(1.9)} />
      <motion.path d="M448 395H524V470M448 420H524M448 445H524" {...d(2.0)} />
      <motion.circle cx="290" cy="248" r="15" {...d(2.1, 0.9)} />
      {WIN.map((w, i) => <motion.path key={i} d={w} {...d(2.1 + i * 0.1, 0.8)} />)}

      {/* windows light up once the drawing is done */}
      {[...WIN, 'C'].map((w, i) => (
        w === 'C'
          ? <motion.circle key="c" cx="290" cy="248" r="15" fill="#f4c872" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} transition={{ delay: 3.1, duration: 1.2 }} />
          : <motion.path key={i} d={w} fill="#f4c872" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.95, 0.85, 0.95] }} transition={{ delay: 2.8 + i * 0.35, duration: 1.6 }} />
      ))}
      <motion.path d="M215 335V379M365 335V379M215 405V447M365 405V447M190 357H240M340 357H390M190 426H240M340 426H390" stroke="#26332e" strokeWidth="1.4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }} />

      <motion.g style={{ x: near }}>
        <motion.path d={pine(60, 470, 190)} {...d(1.3, 1.6)} />
        <motion.path d={pine(110, 470, 120)} {...d(1.5, 1.4)} />
        <motion.path d={pine(590, 470, 210)} {...d(1.4, 1.6)} />
        <motion.path d={pine(560, 470, 130)} {...d(1.6, 1.4)} />
      </motion.g>
    </svg>
  )
}
