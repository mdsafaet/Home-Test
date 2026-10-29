import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CustomHomeArt, KitchenArt, AdditionArt, FoundationArt, PlansArt, BathArt } from './art.jsx'
import { Img, usePhoto } from './Photo.jsx'
import { reduced } from './ui.jsx'

/* Slides use real project photos when they exist (npm run photos); otherwise a line illustration on a tinted panel. */
const SLIDES = [
  ['lakeHouse', CustomHomeArt, 'bg-forest text-cream/70'],
  ['scullery', KitchenArt, 'bg-stone text-forest/60'],
  ['remodel', AdditionArt, 'bg-pine text-cream/70'],
  ['poolHouse', FoundationArt, 'bg-sand text-forest/60'],
  ['interior', BathArt, 'bg-forest text-cream/70'],
  ['remodel2', PlansArt, 'bg-stone text-forest/60'],
]

function Slide({ k, Art, tone }) {
  const ok = usePhoto(k)
  return (
    <div className="h-80 w-60 flex-shrink-0 overflow-hidden rounded-2xl sm:h-[32rem] sm:w-80">
      {ok
        ? <Img k={k} className="pointer-events-none" />
        : <div className={`flex h-full w-full items-center justify-center p-6 ${tone}`}><Art className="w-full" /></div>}
    </div>
  )
}

/* requestAnimationFrame crawl + pointer drag with momentum. Seamless because the strip is duplicated and wraps at half its width. */
function ImageMarquee() {
  const track = useRef(null)
  const dragging = useRef(false)
  useEffect(() => {
    const el = track.current
    const SPEED = reduced ? 0 : 0.8
    let offset = 0, velocity = 0, raf, lastX = 0, lastT = 0, startX = 0, startOffset = 0
    const wrap = () => {
      const half = el.scrollWidth / 2
      if (offset <= -half) offset += half
      if (offset > 0) offset -= half
    }
    const tick = () => {
      if (!dragging.current) {
        if (Math.abs(velocity) > 0.1) { offset += velocity; velocity *= 0.95 }
        else { velocity = 0; offset -= SPEED }
      }
      wrap()
      el.style.transform = `translate3d(${offset}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    const down = (e) => {
      dragging.current = true; velocity = 0
      el.setPointerCapture(e.pointerId)
      startX = lastX = e.clientX; lastT = performance.now(); startOffset = offset
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!dragging.current) return
      const now = performance.now(), dt = Math.max(1, now - lastT)
      velocity = ((e.clientX - lastX) / dt) * 16
      lastX = e.clientX; lastT = now
      offset = startOffset + (e.clientX - startX)
    }
    const up = () => { dragging.current = false; el.style.cursor = 'grab' }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up) }
  }, [])
  const slides = [...SLIDES, ...SLIDES]
  return (
    <section className="relative overflow-hidden py-4" aria-label="Recent projects. Drag to browse.">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[80px] sm:h-[100px]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" fill="white" /></svg>
      </div>
      <div ref={track} className="flex w-max cursor-grab select-none gap-3 py-4 [touch-action:pan-y] sm:gap-4" style={{ willChange: 'transform' }}>
        {slides.map(([k, Art, tone], i) => <Slide key={i} k={k} Art={Art} tone={tone} />)}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[80px] sm:h-[100px]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" fill="white" /></svg>
      </div>
    </section>
  )
}

export function Hero() {
  return (
    <>
      <section className="px-4 pb-1 pt-28 text-center sm:px-6 sm:pt-32">
        <h1 className="mx-auto max-w-4xl text-balance text-4xl leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[4.75rem]">
          Custom homes and kitchens, designed and built by one team
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-900 sm:mt-6 sm:text-lg md:text-xl">
          A family-owned design-build firm in Southbury, Connecticut. From excavation to the final cabinet pull.
        </p>
      </section>
      <ImageMarquee />
      <section className="mx-auto max-w-2xl px-4 pb-12 pt-2 text-center sm:px-6 sm:pb-16">
        <p className="text-base leading-relaxed text-neutral-900 sm:text-lg md:text-xl">
          We design and build custom homes, kitchens and additions across Litchfield and Fairfield County. One team, one contract, no handoffs.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-8">
          {[['Request a consultation', '/contact'], ['See projects', '/portfolio']].map(([t, to]) => (
            <Link key={t} to={to} className="font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-900">{t}</Link>
          ))}
        </div>
      </section>
    </>
  )
}
