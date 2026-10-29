import { Link } from 'react-router-dom'
import { BRANDS } from '../data.js'
import { CtaBand, PageHero, Reveal, SITE, usePageMeta } from '../ui.jsx'
import { Img, usePhoto } from '../Photo.jsx'
import { TeamArt } from '../art.jsx'
import { Areas } from '../sections.jsx'

const VALUES = [
  ['One team, one contract', 'Design, site work, construction and project management are handled by one team, so there are fewer handoffs and fewer surprises.'],
  ['Our own crew and equipment', 'We own and operate our own excavators, and our crew handles the site work and foundations.'],
  ['Plans you can see first', 'Floor plans, elevations and 3D renderings let you make decisions with confidence before construction begins.'],
]

export default function About() {
  usePageMeta('About Our House Design & Construction | Family-Owned Design-Build, Southbury, CT', 'Our House is a family-owned design-build firm in Southbury, CT, creating custom homes, kitchens and additions across western Connecticut.')
  const ok = usePhoto('lakeHouse')
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['About us', null]]} title="A family-owned design-build firm in Southbury" lede="We design and build custom homes, kitchens, additions and renovations across western Connecticut.">
        <Link to="/contact" className="btn bg-forest text-cream hover:bg-pine">Meet us at a consultation</Link>
      </PageHero>
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="label">Who we are</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Fewer handoffs, a home that matches the plans</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-forest/75">Most homeowners hire an architect, a designer, an excavator and a builder, then try to get them to agree. With Our House it is one team and one contract.</p>
          <p className="mt-4 max-w-xl leading-relaxed text-forest/75">Rachel leads design. Drew leads the build. Our own crew and equipment handle the site work. You get fewer surprises, and a home that matches what you approved on paper.</p>
        </Reveal>
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-forest">
            {ok ? <Img k="lakeHouse" /> : <TeamArt className="absolute inset-0 h-full w-full p-10 text-cream/40" />}
          </div>
        </Reveal>
      </section>
      <section className="bg-stone py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-4xl">How we work</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {VALUES.map(([t, d]) => <li key={t} className="border-t-2 border-brass pt-5"><h3 className="font-serif text-2xl">{t}</h3><p className="mt-2 leading-relaxed text-forest/70">{d}</p></li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="label">Visit the showroom</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">See cabinetry, stone and fixtures in person</h2>
          <address className="mt-6 space-y-1 not-italic text-forest/75">
            <p>{SITE.address}</p>
            <p><a className="underline" href={SITE.tel}>{SITE.phone}</a></p>
          </address>
        </div>
        <div>
          <h3 className="font-serif text-2xl">Brands we build with</h3>
          <ul className="mt-5 flex flex-wrap gap-2">{BRANDS.map((b) => <li key={b} className="border border-forest/20 px-3 py-1.5 text-sm">{b}</li>)}</ul>
        </div>
      </section>
      <Areas />
      <CtaBand />
    </>
  )
}
