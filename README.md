# Our House website (React + Vite + Tailwind + Framer Motion + Lenis)

    npm install
    npm run dev        # local preview
    npm run build      # production build in /dist

## Design (v7)
Modern light redesign: white page, Geist font (self-hosted via @fontsource-variable/geist), rounded corners, minimal header (logo, two-line hamburger, CTA) with a slide-in menu, and a hero built around a drag-and-inertia image marquee (src/Hero.jsx). The marquee shows real photos when they exist in public/images (npm run photos), otherwise line illustrations. The 3D scroll-built house lives in the "From the foundation up" section (home and /process).

## Site structure
Pages (React Router): / , /custom-homes, /kitchens, /additions, /bathrooms, /site-work, /process, /portfolio, /about, /contact, plus a 404.
- Shared header (utility bar, Services dropdown, mobile drawer) in src/Header.jsx, footer in src/Footer.jsx.
- Service pages are one template (src/pages/ServicePage.jsx) driven by src/data.js. Edit copy, FAQs and photos there.
- Each page sets its own title, description and (for services) FAQ structured data.
- Hosting: public/_redirects (Netlify) and vercel.json (Vercel) route every URL to index.html. public/sitemap.xml and robots.txt are included.
- All copy is draft. Confirm facts with the client before publishing.

## Real photos
Run `npm run photos` on your own computer. It downloads Our House's project photos from their live site into public/images. Check each one, swap any that don't fit the slot, and add before.jpg and after.jpg if you have them. Slots without a file fall back to the line illustrations. Photo slots and alt text are listed in src/Photo.jsx.

## 3D
The hero house and the scroll-built house are real 3D (three.js via @react-three/fiber), generated in code in src/Scene3D.jsx with no model files. They lazy-load, and fall back to the SVG drawings if WebGL is unavailable.

## Hero
Full-viewport 3D hero with a boomerang loop (builds, holds lit, un-builds, repeats) and a glass "What do we do?" panel at the bottom. Set LOOP = false in App.jsx to build once and stay built.

## What's new in this version
- Hero: house draws itself in line-art, then its windows light up (src/HeroHouse.jsx)
- Illustrated cards and tiles replace the grey photo placeholders (src/art.jsx). Windows light on hover.
- Kitchen studio: visitors pick cabinet, counter and hardware finishes; the choice pre-fills the contact form (src/KitchenStudio.jsx)
- Before/after slider on the Whole-House project (src/BeforeAfter.jsx). Swap BeforeScene/AfterScene for two <img> tags when real photos arrive.
- "From the foundation up" scroll build now shifts to dusk and lights the windows at the end
- Scroll progress bar, trust-points ticker, town chips

Real project photos still need adding: replace the illustrations in art.jsx usage (Provide, Tile, Projects) with <img> tags, wire the form in Contact().
