import { Link } from 'react-router-dom'
import { FromFoundation } from '../sections.jsx'
import { STEPS } from '../data.js'
import { CtaBand, Faq, PageHero, Reveal, usePageMeta } from '../ui.jsx'

const FAQ = [
  ['Who will I be working with?', 'Rachel leads design and Drew leads the build. You also get a dedicated project manager and your own interior designer for finishes.'],
  ['Do I sign one contract or several?', 'One. Design, site work, construction and project management sit under a single contract.'],
  ['Will I see the home before it is built?', 'Yes. We prepare plans, elevations and 3D renderings so you can make decisions with confidence before construction starts.'],
  ['How will I know what is happening on site?', 'Your project manager provides clear schedules and regular updates throughout the project.'],
]

export default function Process() {
  usePageMeta('Our Design-Build Process | Our House Design & Construction, Southbury, CT', 'How Our House designs and builds custom homes, kitchens and additions: consultation and design, site and foundation, frame, finish. One team, one contract.')
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Our process', null]]} title="How we design and build your home" lede="Four stages, one team and one contract. Scroll to watch a house go up, then read what happens at each stage.">
        <Link to="/contact" className="btn bg-forest text-cream hover:bg-pine">Start your project</Link>
      </PageHero>
      <FromFoundation />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="label">Stage by stage</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">What you do, and what we do</h2>
        <ol className="mt-12 divide-y divide-forest/15 border-y border-forest/15">
          {STEPS.map(([t, you, we], i) => (
            <Reveal key={t}>
              <li className="grid gap-6 py-10 md:grid-cols-[6rem_1.2fr_1fr_1.4fr] md:gap-10">
                <span className="font-serif text-5xl text-brass">{i + 1}</span>
                <h3 className="font-serif text-3xl leading-tight">{t}</h3>
                <p className="text-forest/70"><span className="block text-sm font-semibold text-forest">You</span>{you}</p>
                <p className="text-forest/70"><span className="block text-sm font-semibold text-forest">Our team</span>{we}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="bg-stone py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
          <div><p className="label">Common questions</p><h2 className="mt-3 font-serif text-4xl leading-tight">About working with us</h2></div>
          <Faq items={FAQ} />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
