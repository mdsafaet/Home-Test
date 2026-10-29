import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { BriefProvider } from './ui.jsx'
import { SERVICES } from './data.js'
import Home from './pages/Home.jsx'
import ServicePage from './pages/ServicePage.jsx'
import Process from './pages/Process.jsx'
import Portfolio from './pages/Portfolio.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-lamp" />
}

function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -90 }) }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', onClick) }
  }, [])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-cream focus:px-4 focus:py-2">Skip to content</a>
      <ScrollBar /><Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {SERVICES.map((s) => <Route key={s.slug} path={'/' + s.slug} element={<ServicePage slug={s.slug} />} />)}
          <Route path="/process" element={<Process />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BriefProvider><BrowserRouter><Layout /></BrowserRouter></BriefProvider>
    </MotionConfig>
  )
}
