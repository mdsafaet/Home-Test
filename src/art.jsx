import { motion } from 'framer-motion'

/* Line-art illustrations. Every stroke draws itself once when scrolled into view.
   Elements with className="lamp" fill with warm window-light when the parent .group is hovered. */

const pv = { h: { pathLength: 0 }, v: { pathLength: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }
const P = (props) => <motion.path variants={pv} {...props} />
const C = (props) => <motion.circle variants={pv} {...props} />
const R = (x, y, w, h) => `M${x} ${y}h${w}v${h}h${-w}Z`

export const Art = ({ children, className = '', label, vb = '0 0 400 300' }) => (
  <motion.svg
    viewBox={vb}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className={className}
    initial="h" whileInView="v" viewport={{ once: true, margin: '-60px' }}
    variants={{ h: {}, v: { transition: { staggerChildren: 0.09 } } }}
  >{children}</motion.svg>
)

export const CustomHomeArt = (p) => (
  <Art {...p}>
    <P d="M10 250H390" />
    <P d="M110 250V140H290V250" />
    <P d="M95 145L200 65L305 145" />
    <P d="M250 95V62H274V112" />
    <P d="M185 250V195H215V250" />
    <P className="lamp" d={R(130, 165, 36, 36)} />
    <P className="lamp" d={R(234, 165, 36, 36)} />
    <P className="lamp" d={R(130, 215, 36, 28)} />
    <P className="lamp" d={R(234, 215, 36, 28)} />
    <C className="lamp" cx="200" cy="118" r="11" />
    <P d="M40 250V230L55 205L40 205L58 170L44 170L62 130L80 170L66 170L84 205L69 205L84 230V250" />
    <P d="M330 250V232L343 210L331 210L346 180L335 180L350 145L365 180L354 180L369 210L357 210L370 232V250" />
  </Art>
)

export const KitchenArt = (p) => (
  <Art {...p}>
    <P d={R(30, 50, 75, 70)} /><P d={R(110, 50, 65, 70)} /><P d={R(290, 50, 80, 70)} />
    <P d="M185 45H275L262 120H198Z" />
    <P d="M30 170H370M20 170H380" />
    <P d={R(30, 170, 340, 80)} />
    <P d="M115 170V250M200 170V250M285 170V250" />
    <P d="M30 205H370" />
    <P d="M100 0V28M300 0V28" />
    <P className="lamp" d="M84 44a16 16 0 0 1 32 0Z" />
    <P className="lamp" d="M284 44a16 16 0 0 1 32 0Z" />
    <P d="M206 170V158H258V170" />
    <P d="M10 250H390" />
  </Art>
)

export const AdditionArt = (p) => (
  <Art {...p}>
    <P d="M10 250H390" />
    <P d="M60 250V150H190V250" />
    <P d="M48 155L125 95L202 155" />
    <P className="lamp" d={R(85, 175, 28, 28)} />
    <P className="lamp" d={R(137, 175, 28, 28)} />
    <P d="M190 250V160H340V250M190 160L265 110L340 160" strokeDasharray="5 6" />
    <P className="lamp" d={R(215, 185, 40, 30)} />
    <P d="M285 195H315M300 180V210" />
    <P d="M120 250V222H150V250" />
  </Art>
)

export const BathArt = (p) => (
  <Art {...p}>
    <P d="M10 250H390" />
    <P d="M80 175H290L278 226Q274 244 256 244H114Q96 244 92 226Z" />
    <P d="M110 244V250M260 244V250" />
    <P d="M318 135V178M318 135q0-18 -26 -14" />
    <C cx="190" cy="85" r="46" />
    <C className="lamp" cx="105" cy="85" r="11" />
    <C className="lamp" cx="275" cy="85" r="11" />
    <P d="M105 96V120M275 96V120" />
    <P d="M340 250V150H378V250" />
  </Art>
)

export const FoundationArt = (p) => (
  <Art {...p}>
    <P d="M10 200H390" />
    <P d="M80 200V246H320V200" />
    <P d="M115 200V150H285V200" />
    <P d="M115 150V62M165 150V62M215 150V62M265 150V62M285 150V62" />
    <P d="M115 62H285M115 74H285" />
    <P d="M115 150L215 62" />
    <P d="M95 226H305" strokeDasharray="4 6" />
    <P d="M340 200V120M340 120L372 150M340 120L308 150" />
  </Art>
)

export const PlansArt = (p) => (
  <Art {...p}>
    <P d={R(40, 60, 170, 140)} />
    <P d="M125 60V140H40M125 140V200M125 110H210" />
    <P d="M125 165a18 18 0 0 1 18 -18" />
    <P d="M40 232H210M40 224V240M210 224V240" />
    <P d="M290 112L340 87L390 112L340 137Z" />
    <P d="M290 112V172L340 197V137M390 112V172L340 197" />
    <P d="M306 150V176M324 160V186" strokeWidth="1" />
    <P d="M220 130H270M262 122L270 130L262 138" />
    <text x="125" y="226" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="Manrope, sans-serif">42&#8242;&#8209;0&#8243;</text>
  </Art>
)

export const ExcavatorArt = (p) => (
  <Art {...p}>
    <P d="M20 245H380" />
    <P d="M105 245H225Q245 245 245 228Q245 211 225 211H105Q85 211 85 228Q85 245 105 245Z" />
    <C cx="110" cy="228" r="9" /><C cx="165" cy="228" r="9" /><C cx="220" cy="228" r="9" />
    <P d="M105 211V165H190V211" />
    <P d="M118 176H168V198H118Z" />
    <P d="M190 185L262 108L298 124L334 196" />
    <P d="M206 192L254 138" />
    <P d="M334 196L316 222H356Z" />
    <P d="M290 245Q315 212 372 245" />
  </Art>
)

export const TeamArt = (p) => (
  <Art {...p}>
    <P d="M40 215H360M70 215V255M330 215V255" />
    <P d="M105 215L125 188H275L295 215" />
    <P d="M140 200H260M140 208H225" strokeWidth="1" />
    <C cx="130" cy="108" r="17" />
    <P d="M112 106a18 18 0 0 1 36 0Z" />
    <P d="M100 188V150Q130 132 160 150V188" />
    <C cx="270" cy="112" r="17" />
    <P d="M240 188V154Q270 138 300 154V188" />
    <P d="M160 150L190 180M240 154L220 178" />
  </Art>
)

/* The hero: a house in twilight. Draws on load, then the windows light up. */
export const heroDraw = (delay, dur = 1.3) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay, duration: dur, ease: [0.22, 1, 0.36, 1] } })
