import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SERVICES } from './data.js'
import { SITE } from './ui.jsx'

const EASE = 'duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
const MAIN = [['Process', '/process'], ['Portfolio', '/portfolio'], ['About', '/about'], ['Contact', '/contact']]

const Mark = () => (
  <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    <path d="M4 15L16 5l12 10M7 13v14h18V13" /><path d="M13 27v-7h6v7" />
  </svg>
)
const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} aria-label="Our House Design & Construction, home" className="flex items-center gap-2.5 text-neutral-900">
    <Mark /><span className="text-[15px] font-semibold tracking-tight">Our House</span>
  </Link>
)

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const closeBtn = useRef(null)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', key)
    if (open) setTimeout(() => closeBtn.current?.focus(), 50)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [open])

  const ti = open ? 0 : -1
  const item = (i) => ({ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' })
  const link = `block py-3 text-3xl font-medium tracking-tight text-neutral-900 transition-all ${EASE} hover:text-neutral-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-colors duration-300 sm:px-6 sm:py-5 md:px-10 ${scrolled ? 'bg-white/95 shadow-[0_1px_0_rgba(0,0,0,.06)] backdrop-blur-md' : 'bg-transparent'}`}>
        <Logo />
        <button type="button" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)} className="group absolute left-1/2 flex h-10 w-10 -translate-x-1/2 flex-col items-center justify-center gap-[5px]">
          <span className="block h-[1.5px] w-6 rounded-full bg-neutral-900 transition-all duration-300 group-hover:w-5" />
          <span className="block h-[1.5px] w-6 rounded-full bg-neutral-900 transition-all duration-300 group-hover:w-5" />
        </button>
        <Link to="/contact" className="hidden rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:block">Book a consultation</Link>
        <div className="w-7 sm:hidden" aria-hidden="true" />
      </header>

      <div onClick={() => setOpen(false)} aria-hidden="true" className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-all ${EASE} ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />

      <nav id="site-menu" aria-label="Site menu" aria-hidden={!open} className={`fixed z-[70] flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-4 transition-all ${EASE} inset-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm ${open ? 'translate-y-0 opacity-100 sm:translate-x-0' : 'translate-y-full opacity-0 sm:translate-x-full sm:translate-y-0'}`}>
        <div className="flex items-center justify-between py-1">
          <Logo onClick={() => setOpen(false)} />
          <button ref={closeBtn} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="relative h-10 w-10 rounded-full hover:bg-neutral-100">
            <span className={`absolute left-1/2 top-1/2 -ml-2.5 -mt-px h-[1.5px] w-5 rounded-full bg-neutral-900 transition-all ${EASE} ${open ? 'rotate-45' : 'rotate-0 -translate-y-[3px]'}`} />
            <span className={`absolute left-1/2 top-1/2 -ml-2.5 -mt-px h-[1.5px] w-5 rounded-full bg-neutral-900 transition-all ${EASE} ${open ? '-rotate-45' : 'rotate-0 translate-y-[3px]'}`} />
          </button>
        </div>

        <div className="mt-8 flex-1">
          <p className={`text-sm text-neutral-500 transition-all ${EASE} ${open ? 'opacity-100' : 'opacity-0'}`} style={item(0)}>Services</p>
          <ul className="mb-4 mt-1">
            {SERVICES.map((s, i) => (
              <li key={s.slug}><Link tabIndex={ti} to={'/' + s.slug} style={item(i)} className={link.replace('text-3xl', 'text-2xl')}>{s.nav}</Link></li>
            ))}
          </ul>
          <ul className="border-t border-neutral-200 pt-3">
            {MAIN.map(([t, to], i) => <li key={to}><Link tabIndex={ti} to={to} style={item(i + SERVICES.length)} className={link}>{t}</Link></li>)}
          </ul>
        </div>

        <div className={`pt-8 transition-all ${EASE} ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: open ? '400ms' : '0ms' }}>
          <Link tabIndex={ti} to="/contact" className="inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">Book a consultation</Link>
          <p className="mt-5 text-sm text-neutral-500">Call <a tabIndex={ti} className="font-medium text-neutral-900 underline underline-offset-4" href={SITE.tel}>{SITE.phone}</a></p>
        </div>
      </nav>
    </>
  )
}
