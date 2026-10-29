import { Link } from 'react-router-dom'
import { SERVICES, AREAS } from './data.js'
import { SITE } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="bg-[#1a1d1c] text-cream/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-serif text-2xl tracking-[0.12em] text-cream">OUR HOUSE</p>
          <p className="mt-1 text-xs tracking-[0.08em] text-cream/55">Design &amp; Construction</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">A family-owned design-build firm creating custom homes, kitchens and additions across western Connecticut.</p>
          <address className="mt-6 space-y-1.5 text-sm not-italic">
            <p>{SITE.address}</p>
            <p><a className="hover:text-cream" href={SITE.tel}>{SITE.phone}</a></p>
            <p><a className="hover:text-cream" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </address>
        </div>
        <nav aria-label="Services">
          <h2 className="font-serif text-xl text-cream">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">{SERVICES.map((s) => <li key={s.slug}><Link className="hover:text-cream" to={'/' + s.slug}>{s.nav}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="font-serif text-xl text-cream">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[['Our process', '/process'], ['Portfolio', '/portfolio'], ['About us', '/about'], ['Contact', '/contact']].map(([t, to]) => <li key={to}><Link className="hover:text-cream" to={to}>{t}</Link></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="font-serif text-xl text-cream">Where we build</h2>
          <ul className="mt-4 space-y-2.5 text-sm">{AREAS.map(([c, towns]) => <li key={c}><span className="text-cream">{c}</span><br /><span className="text-cream/55">{towns.slice(0, 4).join(', ')} and more</span></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-cream/55">
          <p>© {new Date().getFullYear()} Our House Design &amp; Construction LLC, Southbury, CT</p>
          <p>Custom homes, kitchens, additions, renovations and bathrooms</p>
        </div>
      </div>
    </footer>
  )
}
