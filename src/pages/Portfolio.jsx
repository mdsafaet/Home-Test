import { PROJECTS } from '../data.js'
import { CtaBand, PageHero, Reveal, usePageMeta } from '../ui.jsx'
import { Img, usePhoto } from '../Photo.jsx'
import { CustomHomeArt, KitchenArt, AdditionArt } from '../art.jsx'
import BeforeAfter from '../BeforeAfter.jsx'

const ARTS = [CustomHomeArt, KitchenArt, AdditionArt]

function Shot({ k, Art, className = '' }) {
  const ok = usePhoto(k)
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-forest ${className}`}>
      {ok ? <Img k={k} className="transition-transform duration-700 hover:scale-105" /> : <Art className="absolute inset-0 h-full w-full p-8 text-cream/35" />}
    </div>
  )
}

export default function Portfolio() {
  usePageMeta('Portfolio: Custom Homes, Kitchens & Remodels | Our House, Southbury, CT', 'Recent custom homes, kitchens and remodels by Our House Design & Construction across Litchfield and Fairfield County, CT.')
  const b1 = usePhoto('before'), b2 = usePhoto('after')
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Portfolio', null]]} title="Recent work across western Connecticut" lede="A look at homes, kitchens and remodels designed and built by our team." />
      <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title}>
            <article className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <Shot k={p.photos[0]} Art={ARTS[i]} className={`aspect-[4/3] lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`} />
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:pr-10' : 'lg:pl-10'}`}>
                <p className="label">{p.kind}</p>
                <h2 className="mt-2 font-serif text-4xl">{p.title}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-forest/70">{p.text}</p>
                <Shot k={p.photos[1]} Art={ARTS[i]} className="mt-8 aspect-[16/9] max-w-md" />
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="bg-stone py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="label">Before and after</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">See the transformation</h2>
          <div className="mt-10"><BeforeAfter photos={b1 && b2} /></div>
          <p className="mt-3 text-sm text-forest/60">Drag the handle to compare.</p>
        </div>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  )
}
