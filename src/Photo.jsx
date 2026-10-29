import { useEffect, useState } from 'react'

/* Real photos live in /public/images (run `npm run photos` to download them from the live site).
   Every slot falls back to the line illustration when its file is missing. */
export const PHOTOS = {
  lakeHouse: ['/images/lake-house.jpg', 'Lake house exterior with a peaked roof, built by Our House'],
  plans: ['/images/plans.jpg', 'Architectural plans and 3D renderings for a custom home'],
  interior: ['/images/interior.jpg', 'Finished interior designed and built by Our House'],
  portrait: ['/images/portrait.jpg', 'Finished custom interior in Connecticut'],
  remodel: ['/images/remodel.jpg', 'Custom whole-home remodel, front elevation'],
  remodel2: ['/images/remodel-2.jpg', 'Custom whole-home remodel, second view'],
  poolHouse: ['/images/pool-house.jpg', 'Aerial view of a custom pool house and property'],
  poolHouse2: ['/images/pool-house-2.jpg', 'Aerial view of the pool house build, second angle'],
  scullery: ['/images/scullery.jpg', 'Custom scullery with cabinetry and stone counters'],
  scullery2: ['/images/scullery-2.jpg', 'Custom scullery, second view'],
  testimonial: ['/images/testimonial.jpg', 'Finished home belonging to an Our House client'],
  before: ['/images/before.jpg', 'Home before renovation'],
  after: ['/images/after.jpg', 'Home after renovation'],
}

const cache = {}
export function usePhoto(key) {
  const src = PHOTOS[key]?.[0]
  const [ok, setOk] = useState(src ? cache[src] ?? null : false)
  useEffect(() => {
    if (!src) return
    if (cache[src] !== undefined) { setOk(cache[src]); return }
    const i = new Image()
    i.onload = () => { cache[src] = true; setOk(true) }
    i.onerror = () => { cache[src] = false; setOk(false) }
    i.src = src
  }, [src])
  return ok
}

export const Img = ({ k, className = '' }) => <img src={PHOTOS[k][0]} alt={PHOTOS[k][1]} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />

/* Card image: the photo if present, otherwise the illustration on a sand panel. */
export function Snap({ k, Fallback }) {
  const ok = usePhoto(k)
  if (ok) return <div className="aspect-[4/3] overflow-hidden rounded-2xl"><Img k={k} className="transition-transform duration-700 hover:scale-105" /></div>
  return <div className="aspect-[4/3] rounded-2xl bg-stone p-6 text-forest transition-colors duration-500 hover:bg-sand"><Fallback className="h-full w-full" /></div>
}
