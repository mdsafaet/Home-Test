import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { CustomHomeArt, KitchenArt, AdditionArt, BathArt, FoundationArt, PlansArt, ExcavatorArt, TeamArt } from './art.jsx'
import BeforeAfter from './BeforeAfter.jsx'
import { Snap, Img, usePhoto } from './Photo.jsx'
import { Arrow, Reveal, Stage3D, clamp01, reduced } from './ui.jsx'
import { AREAS, BRANDS } from './data.js'

export function Provide() {
  const items = [
    ['Design & 3D Modeling', 'See your home before it’s built. Floor plans, elevations, and 3D renderings let you make decisions with confidence, not guesswork.', PlansArt, 'plans'],
    ['Site Work & Foundations', 'We own and operate our own excavators. Clearing, excavation, drainage, and foundations are handled by our crew, on our schedule.', ExcavatorArt, 'poolHouse'],
    ['Construction & Project Management', 'One team from the foundation to the finishes. A dedicated project manager, clear schedules, and regular updates.', TeamArt, 'remodel'],
  ]
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="label">What we provide</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight sm:text-5xl">One team, from the first sketch to the final walkthrough</h2></div>
        <Link to="/process" className="border-b border-forest pb-0.5 text-sm font-semibold">See our process</Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {items.map(([t, d, Pic, k]) => (
          <Reveal key={t}>
            <Snap k={k} Fallback={Pic} />
            <h3 className="mt-5 font-serif text-2xl">{t}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-forest/75">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const MLink = motion.create(Link)
export function Tile({ to, title, text, Pic, photo, cta, className = '', big }) {
  const ok = usePhoto(photo)
  return (
    <MLink to={to} whileHover="hover" className={`group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl p-8 text-cream ${className}`}>
      {ok ? (
        <>
          <Img k={photo} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/35 to-forest/5" />
        </>
      ) : (
        <Pic className={`pointer-events-none absolute text-cream/25 transition-colors duration-500 group-hover:text-cream/70 ${big ? 'right-2 top-0 w-[62%] max-w-[420px]' : '-right-4 -top-2 w-[78%]'}`} />
      )}
      <motion.div variants={{ hover: { y: -6 } }} transition={{ duration: 0.4 }} className="relative">
        <h3 className={`font-serif leading-tight ${big ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/85">{text}</p>
        {cta && <span className="mt-3 inline-block font-serif text-lg text-gold">{cta}</span>}
      </motion.div>
    </MLink>
  )
}

export function Build() {
  return (
    <section className="bg-stone py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label">What we build</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">From a raw lot to a reimagined kitchen</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <Tile big to="/custom-homes" className="bg-forest lg:col-span-4 lg:min-h-[26rem]" title="Custom Homes" text="New construction and rebuilds on your lot. Custom or semi-custom, designed and built by the same team." Pic={CustomHomeArt} photo="lakeHouse" cta="Explore custom homes" />
          <Tile big to="/kitchens" className="bg-[#33423b] lg:col-span-2 lg:row-span-1" title="Custom Kitchens" text="Custom and semi-custom kitchens designed around how you live." Pic={KitchenArt} photo="scullery" cta="Explore kitchens" />
          <Tile to="/additions" className="bg-pine lg:col-span-2" title="Additions & Renovations" text="More space and better flow, built to match your home." Pic={AdditionArt} photo="remodel2" />
          <Tile to="/bathrooms" className="bg-pine lg:col-span-2" title="Bathrooms" text="Primary suites and baths finished with care." Pic={BathArt} />
          <Tile to="/site-work" className="bg-pine lg:col-span-2" title="Site Work & Foundations" text="Excavation, drainage, and concrete by our own crew." Pic={FoundationArt} photo="poolHouse2" />
        </div>
      </div>
    </section>
  )
}

/* The page's one signature moment: the house draws itself as you scroll, ground first. */
const STAGES = [
  ['Site', 'Clearing, excavation, and drainage with our own two excavators.'],
  ['Foundation', 'Footings and concrete poured by our crew, built for the house on the plans.'],
  ['Frame', 'Structure goes up from the same drawings, checked on site by Drew.'],
  ['Finish', 'Cabinetry, stone, trim, and the last walkthrough. One contract the whole way.'],
]
function Stroke({ p, range, d, dash, w = 2 }) {
  const pathLength = useTransform(p, range, [0, 1])
  return <motion.path d={d} style={{ pathLength }} strokeDasharray={dash} strokeWidth={w} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
}
export function FromFoundation() {
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(p, 'change', (v) => setStage(Math.min(3, Math.floor(v * 4))))
  const lit = useTransform(p, [0.9, 1], [0, 1])
  const studs = [150, 200, 250, 300, 350, 400, 450].map((x) => `M${x} 300V170`).join('')
  const fallback = (
    <svg viewBox="0 0 600 400" role="img" aria-label="A house drawing itself: site, foundation, frame, finish" className="w-full text-cream">
      <Stroke p={p} range={[0, 0.2]} d="M20 330H580" />
      <Stroke p={p} range={[0.05, 0.25]} d="M150 330V372H450V330" dash="6 7" w={1.5} />
      <Stroke p={p} range={[0.25, 0.5]} d="M140 300H460V335H140Z" w={2.5} />
      <Stroke p={p} range={[0.5, 0.72]} d={studs + 'M150 170H450'} w={1.5} />
      <Stroke p={p} range={[0.55, 0.75]} d="M125 175L300 75L475 175" w={2.5} />
      <g className="text-gold">
        <Stroke p={p} range={[0.75, 0.85]} d="M280 300V235H320V300" />
        <Stroke p={p} range={[0.85, 1]} d="M395 128V85H425V143" />
        <motion.path d="M175 195H235V245H175ZM365 195H425V245H365Z" fill="#f4c872" stroke="none" style={{ opacity: lit }} />
      </g>
    </svg>
  )
  return (
    <section id="process" ref={ref} className="relative h-[360vh] bg-[#1d2723] text-cream">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Stage3D mode="scroll" fog="#1d2723" getP={() => p.get()} fallback={<div className="flex h-full items-center px-6">{fallback}</div>} />
        </div>
        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-end px-6 pb-10 lg:items-center lg:pb-0 lg:pt-16">
          <div className="max-w-md rounded-sm bg-[#1d2723]/70 p-0 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-0">
            <p className="label !text-gold">From the foundation up</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">One team. One contract. No handoffs.</h2>
            <p className="mt-6 hidden leading-relaxed text-cream/75 lg:block">Most homeowners hire an architect, a designer, an excavator, and a builder, then try to get them to agree. With Our House, it’s one team and one contract.</p>
            <p className="mt-4 hidden leading-relaxed text-cream/75 lg:block">Rachel leads design. Drew leads the build. Our own crew and equipment handle the site work, so you get fewer handoffs, fewer surprises, and a home that matches the plans.</p>
            <ol className="mt-8 grid grid-cols-4 gap-2 text-xs">
              {STAGES.map(([t], i) => (
                <li key={t} className={`border-t-2 pt-2 transition-colors duration-500 ${i <= stage ? 'border-lamp text-cream' : 'border-cream/15 text-cream/40'}`}>{t}</li>
              ))}
            </ol>
            <p aria-live="polite" className="mt-4 min-h-[3.5rem] font-serif text-xl text-cream/85">{STAGES[stage][1]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const b1 = usePhoto('before'), b2 = usePhoto('after')
  const hasBA = b1 && b2
  const hero = usePhoto('poolHouse')
  const side = [
    [CustomHomeArt, 'remodel', 'Custom remodel', 'Whole-Home Remodel'],
    [KitchenArt, 'scullery', 'Custom scullery', 'Kitchen & Scullery'],
  ]
  return (
    <section className="bg-stone py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="label">Featured projects</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Recent work across western Connecticut</h2></div>
          <Link to="/portfolio" className="border-b border-forest pb-0.5 text-sm font-semibold">View full portfolio</Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            {hasBA ? <BeforeAfter photos /> : hero ? <div className="aspect-[4/3] overflow-hidden rounded-2xl"><Img k="poolHouse" className="transition-transform duration-700 hover:scale-105" /></div> : <BeforeAfter />}
            <p className="label mt-4">{hasBA ? 'Whole-home renovation' : hero ? 'Custom build' : 'Whole-house transformation'}</p>
            <h3 className="mt-1 font-serif text-3xl">{hasBA ? 'Before and After' : hero ? 'Pool House' : 'Whole-House Transformation'}</h3>
            {(hasBA || !hero) && <p className="mt-1 text-sm text-forest/60">Drag the handle to compare.</p>}
          </Reveal>
          <div className="flex flex-col gap-6">
            {side.map(([Pic, k, kick, t]) => <SideCard key={t} Pic={Pic} k={k} kick={kick} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function SideCard({ Pic, k, kick, t }) {
  const ok = usePhoto(k)
  return (
    <Reveal className="flex-1">
      <Link to="/portfolio" className="group relative flex h-full min-h-[16rem] flex-col justify-end overflow-hidden rounded-2xl bg-forest p-6 text-cream">
        {ok ? (<><Img k={k} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" /></>)
          : <Pic className="pointer-events-none absolute -right-2 top-0 w-[70%] text-cream/30 transition-colors duration-500 group-hover:text-cream/75" />}
        <p className="label relative !text-gold">{kick}</p><h3 className="relative mt-1 font-serif text-2xl">{t}</h3>
      </Link>
    </Reveal>
  )
}

export function Proof() {
  const tPhoto = usePhoto('testimonial')
  const brands = BRANDS.slice(0, 9)
  return (
    <>
      <section className={`mx-auto px-6 py-24 ${tPhoto ? 'grid max-w-6xl items-center gap-10 md:grid-cols-2' : 'max-w-4xl text-center'}`}>
        {tPhoto && <div className="aspect-[4/3] overflow-hidden rounded-2xl"><Img k="testimonial" /></div>}
        <div>
        <p className="label">What our clients say</p>
        <blockquote className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">“Our House Design and Construction did an amazing job in our home, on schedule and within the budget established.”</blockquote>
        <p className="mt-6 text-sm text-forest/60">L.L., Connecticut</p>
        </div>
      </section>
      <section className="border-y border-forest/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-8">
          <p className="label">Brands we build with</p>
          {brands.map((b) => <span key={b} className="font-serif text-xl text-forest/70">{b}</span>)}
        </div>
      </section>
    </>
  )
}

export function Areas() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-4">
      <div><p className="label">Where we build</p><h2 className="mt-3 font-serif text-4xl leading-tight">Serving western Connecticut from Southbury</h2></div>
      {AREAS.map(([c, towns]) => (
        <div key={c}><h3 className="font-serif text-2xl">{c}</h3><ul className="mt-4 flex flex-wrap gap-2">{towns.map((x) => <li key={x} className="rounded-full border border-forest/20 px-3 py-1 text-sm text-forest/80">{x}</li>)}</ul></div>
      ))}
    </section>
  )
}
