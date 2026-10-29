import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero, SITE, useBrief, usePageMeta } from '../ui.jsx'
import { Areas } from '../sections.jsx'

const NEXT = [['Tell us about your project', 'Share your goals, your location and anything you have in mind.'], ['We set up a consultation', 'We meet at your property or in our Southbury showroom.'], ['You get a clear next step', 'We outline the approach so you know what to expect.']]

function Field({ label, name, type = 'text', req }) {
  return <label className="block text-sm font-medium">{label}{req && <span className="text-brass"> *</span>}<input className="mt-1.5 w-full rounded-lg border border-forest/25 bg-white px-3 py-3 font-normal outline-none transition-colors focus:border-brass" name={name} type={type} required={req} /></label>
}

export default function Contact() {
  usePageMeta('Contact Our House Design & Construction | Request a Consultation, Southbury, CT', 'Request a consultation for a custom home, kitchen, addition or renovation in Litchfield and Fairfield County, CT. Call (203) 794-0304 or visit our Southbury showroom.')
  const { brief } = useBrief()
  const [notes, setNotes] = useState('')
  const [sent, setSent] = useState(false)
  useEffect(() => { if (brief) setNotes(brief) }, [brief])
  const submit = (e) => { e.preventDefault(); /* TODO: POST new FormData(e.target) to Formspree, Netlify Forms, or your CRM */ setSent(true) }
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Contact', null]]} title="Start your project" lede="Tell us about your build or renovation and we’ll set up a consultation, at your property or in our Southbury showroom." />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1.3fr_1fr]">
        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="self-start rounded-2xl border border-forest/15 bg-stone p-10">
            <h2 className="font-serif text-4xl">Thank you.</h2>
            <p className="mt-3 max-w-md text-forest/75">We received your request and will be in touch about a consultation.</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" req /><Field label="Town" name="town" />
            <Field label="Email" name="email" type="email" req /><Field label="Phone" name="phone" type="tel" />
            <label className="block text-sm font-medium sm:col-span-2">Project type
              <select name="type" className="mt-1.5 w-full rounded-lg border border-forest/25 bg-white px-3 py-3 font-normal outline-none focus:border-brass">{['Custom home / new build', 'Kitchen', 'Addition', 'Whole-house renovation', 'Bathroom', 'Site work / foundation'].map((o) => <option key={o}>{o}</option>)}</select></label>
            <label className="block text-sm font-medium sm:col-span-2">Tell us about your project
              <textarea name="notes" rows="5" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1.5 w-full rounded-lg border border-forest/25 bg-white px-3 py-3 font-normal outline-none focus:border-brass" /></label>
            <div className="sm:col-span-2"><button className="btn bg-forest text-cream hover:bg-brass">Request a consultation</button><p className="mt-3 text-xs text-forest/55">Fields marked * are required.</p></div>
          </form>
        )}
        <aside className="space-y-10">
          <address className="space-y-1.5 not-italic text-forest/80">
            <h2 className="font-serif text-2xl text-forest">Showroom and office</h2>
            <p>{SITE.address}</p>
            <p><a className="underline" href={SITE.tel}>{SITE.phone}</a></p>
            <p><a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </address>
          <div>
            <h2 className="font-serif text-2xl">What happens next</h2>
            <ol className="mt-4 space-y-5">{NEXT.map(([t, d], i) => <li key={t} className="flex gap-4"><span className="font-serif text-3xl leading-none text-brass">{i + 1}</span><span><span className="block font-medium">{t}</span><span className="text-sm text-forest/70">{d}</span></span></li>)}</ol>
          </div>
        </aside>
      </section>
      <Areas />
    </>
  )
}
