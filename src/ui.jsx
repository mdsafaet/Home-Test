import { createContext, lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const SITE = {
  name: 'Our House Design & Construction',
  phone: '(203) 794-0304',
  tel: 'tel:2037940304',
  email: 'info@ourhousellc.com',
  address: '77 Main Street North, Unit 101, Southbury, CT 06488',
  url: 'https://www.ourhousellc.com',
}
export const clamp01 = (v) => Math.min(1, Math.max(0, v))
export const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const hasWebGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } })()

const Scene3D = lazy(() => import('./Scene3D.jsx'))
export function Stage3D({ fallback, ...props }) {
  if (!hasWebGL) return fallback
  return <Suspense fallback={fallback}><Scene3D {...props} /></Suspense>
}

export const Reveal = ({ children, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
)

export const Arrow = ({ className = '' }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 ${className}`} aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
)

/* Notes from the kitchen studio travel to the contact form. */
const BriefCtx = createContext({ brief: '', setBrief: () => {} })
export const useBrief = () => useContext(BriefCtx)
export function BriefProvider({ children }) {
  const [brief, setBrief] = useState('')
  return <BriefCtx.Provider value={{ brief, setBrief }}>{children}</BriefCtx.Provider>
}

/* Per-page title, description and optional structured data (good for local SEO). */
export function usePageMeta(title, description, jsonLd) {
  useEffect(() => {
    document.title = title
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    let node
    if (jsonLd) {
      node = document.createElement('script'); node.type = 'application/ld+json'; node.dataset.page = '1'
      node.textContent = JSON.stringify(jsonLd); document.head.appendChild(node)
    }
    return () => { if (node) node.remove() }
  }, [title, description, jsonLd])
}

export function PageHero({ crumbs = [], title, lede, children, media }) {
  return (
    <section className="px-4 pb-10 pt-28 text-center sm:px-6 sm:pt-36">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <ol className="flex flex-wrap justify-center gap-2">
            {crumbs.map(([t, to], i) => (
              <li key={t} className="flex gap-2">
                {to ? <Link to={to} className="hover:text-neutral-900">{t}</Link> : <span aria-current="page" className="text-neutral-900">{t}</span>}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="mx-auto mt-5 max-w-4xl text-balance text-4xl leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[4.25rem]">{title}</h1>
      {lede && <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg md:text-xl">{lede}</p>}
      {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      {media && <div className="mx-auto mt-12 max-w-6xl text-left">{media}</div>}
    </section>
  )
}

export function CtaBand({ title = 'Planning a build or a renovation?', text = 'Tell us about your project and we’ll set up a consultation at your property or in our Southbury showroom.' }) {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-14">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-cream/90">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/contact" className="btn bg-cream text-forest hover:bg-lamp">Request a consultation</Link>
          <a href={SITE.tel} className="font-medium underline underline-offset-4">{SITE.phone}</a>
        </div>
      </div>
    </section>
  )
}

export function Faq({ items }) {
  return (
    <div className="divide-y divide-forest/15 border-y border-forest/15">
      {items.map(([q, a]) => (
        <details key={q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl marker:hidden [&::-webkit-details-marker]:hidden">
            {q}
            <span className="text-2xl leading-none text-brass transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-forest/75">{a}</p>
        </details>
      ))}
    </div>
  )
}
