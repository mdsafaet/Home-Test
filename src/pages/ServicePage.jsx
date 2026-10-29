import { Link } from 'react-router-dom'
import { SERVICES, PROJECTS, bySlug } from '../data.js'
import { CtaBand, Faq, PageHero, Reveal, SITE, usePageMeta } from '../ui.jsx'
import { Img, Snap, usePhoto } from '../Photo.jsx'
import KitchenStudio from '../KitchenStudio.jsx'
import { STEPS } from '../data.js'
import NotFound from './NotFound.jsx'

function Side({ s }) {
  const ok = usePhoto(s.photo)
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone sm:aspect-[2/1]">
      {ok ? <Img k={s.photo} /> : <s.Art className="absolute inset-0 h-full w-full p-10 text-forest/40" />}
    </div>
  )
}

function Gallery() {
  return (
    <section className="bg-stone py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="label">Recent work</p><h2 className="mt-2 font-serif text-4xl">See what we have built</h2></div>
          <Link to="/portfolio" className="border-b border-forest pb-0.5 text-sm font-semibold">View full portfolio</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <Reveal key={p.title}>
              <Snap k={p.photos[0]} Fallback={SERVICES[0].Art} />
              <p className="label mt-4">{p.kind}</p>
              <h3 className="font-serif text-2xl">{p.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicePage({ slug }) {
  const s = bySlug(slug)
  const faqLd = s && { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
  usePageMeta(s ? s.metaTitle : 'Not found', s ? s.desc : '', faqLd)
  if (!s) return <NotFound />
  const others = SERVICES.filter((x) => x.slug !== slug)
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Services', null], [s.nav, null]]} title={s.title} lede={s.lede} media={<Side s={s} />}>
        <Link to="/contact" className="btn bg-forest text-cream hover:bg-pine">Request a consultation</Link>
        <a href={SITE.tel} className="btn border border-forest/25 text-forest hover:bg-forest hover:text-cream">{SITE.phone}</a>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="label">What we do</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{s.slug === 'kitchens' ? 'Planned in full before the first cabinet is built' : 'One team from the first sketch to the final walkthrough'}</h2>
          {s.intro.map((t) => <p key={t} className="mt-5 max-w-xl leading-relaxed text-forest/75">{t}</p>)}
        </Reveal>
        <Reveal>
          <ul className="divide-y divide-forest/15 border-y border-forest/15">
            {s.points.map(([t, d]) => (
              <li key={t} className="py-5"><h3 className="font-serif text-2xl">{t}</h3><p className="mt-1 text-forest/70">{d}</p></li>
            ))}
          </ul>
        </Reveal>
      </section>

      {s.studio && <KitchenStudio />}

      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-7xl px-6">
          <p className="label !text-gold">How a project runs</p>
          <h2 className="mt-2 font-serif text-4xl">Four stages, one team</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {STEPS.map(([t, , d], i) => (
              <li key={t} className="border-t border-cream/25 pt-5">
                <span className="text-sm text-cream/50">Stage {i + 1}</span>
                <h3 className="mt-1 font-serif text-2xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{d}</p>
              </li>
            ))}
          </ol>
          <Link to="/process" className="mt-10 inline-block border-b border-cream pb-0.5 text-sm font-semibold">See the full process</Link>
        </div>
      </section>

      <Gallery />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
        <div><p className="label">Common questions</p><h2 className="mt-3 font-serif text-4xl leading-tight">Before you reach out</h2></div>
        <Faq items={s.faq} />
      </section>

      <section className="border-t border-forest/10 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-serif text-3xl">Explore our other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}><Link to={'/' + o.slug} className="group block rounded-2xl bg-stone p-5 transition-colors hover:bg-sand"><span className="font-serif text-xl">{o.nav}</span><span className="mt-1 block text-sm text-forest/65">{o.short}</span></Link></li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
