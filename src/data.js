import { CustomHomeArt, KitchenArt, AdditionArt, BathArt, FoundationArt } from './art.jsx'

/* Draft copy for review with the client. Nothing here states prices, timelines or years in business. */
export const SERVICES = [
  {
    slug: 'custom-homes', nav: 'Custom Homes', short: 'New construction and rebuilds on your lot.',
    metaTitle: 'Custom Home Builder in Southbury, CT | Our House Design & Construction',
    desc: 'Custom and semi-custom homes designed and built by one family-owned team in Litchfield, Fairfield and New Haven County, CT. Our own excavation crew, one contract.',
    title: 'Custom homes, designed and built by one team',
    lede: 'New construction and rebuilds on your lot. We handle the plans, the site work, the build and the finishes, so the home you approve on paper is the home you walk into.',
    photo: 'lakeHouse', Art: CustomHomeArt,
    intro: ['A custom home involves dozens of decisions and a long list of trades. Most homeowners end up coordinating an architect, a designer, an excavator and a builder. With Our House, that coordination is our job.',
      'We start with floor plans, elevations and 3D renderings so you can see the house before a shovel goes in the ground. Our own crew and excavators clear the site and pour the foundation. The same team then frames, finishes and walks you through the completed home.'],
    points: [['Plans and 3D renderings', 'See layouts, elevations and finishes before you commit.'], ['Site work by our own crew', 'Clearing, excavation, drainage and foundations on our schedule.'], ['A dedicated project manager', 'Clear schedules and regular updates from start to walkthrough.'], ['Custom or semi-custom', 'Start from scratch, or adapt a proven plan to your lot.']],
    faq: [
      ['What areas do you build in?', 'We build custom homes across Litchfield County, northern Fairfield County and the Southbury area, including Woodbury, Newtown, Brookfield, Ridgefield and New Milford.'],
      ['What is the difference between custom and semi-custom?', 'A custom home is designed from scratch around your lot and how you live. A semi-custom home starts from an existing plan that we adapt, which can simplify design decisions. We’ll help you decide which suits your project.'],
      ['Do you handle both design and construction?', 'Yes. Design, site work, construction and project management are all handled by our team under one contract.'],
      ['How long will it take and what will it cost?', 'Both depend on the size, the site and the level of finish. After the consultation we put the scope, schedule and budget in writing so you know what to expect before you commit.'],
      ['How do I get started?', 'Request a consultation. We meet at your property or in our Southbury showroom to talk through your goals, your lot and what you want the finished home to be.'],
    ],
  },
  {
    slug: 'kitchens', nav: 'Kitchens', short: 'Custom and semi-custom kitchens designed around how you live.',
    metaTitle: 'Luxury Kitchen Remodeling in Southbury, CT | Our House Design & Construction',
    desc: 'Custom and semi-custom kitchen design-build in Litchfield and Fairfield County, CT. Plans, 3D renderings, a Southbury showroom and one team from design to the last cabinet pull.',
    title: 'Custom kitchens designed around how you live',
    lede: 'Custom and semi-custom kitchens, planned with a dedicated designer and built by the crew that will be in your home every day.',
    photo: 'scullery', Art: KitchenArt, studio: true,
    intro: ['A kitchen remodel touches plumbing, electrical, cabinetry, stone and tile, and all of it has to arrive in the right order. We plan the whole project up front with layouts and renderings, then build it with one team.',
      'Visit our Southbury showroom to see finishes in person, or try combinations in the kitchen studio below and bring them to your consultation.'],
    points: [['Design with 3D renderings', 'Walk through your kitchen on screen before construction starts.'], ['Cabinetry and surfaces', 'We work with brands including Dura Supreme, Cambria, Caesarstone and Top Knobs.'], ['A showroom you can visit', 'Compare cabinetry, stone and hardware in person in Southbury.'], ['One project manager', 'One point of contact from demolition to the final walkthrough.']],
    faq: [
      ['Can I see materials before I choose?', 'Yes. Our Southbury showroom lets you compare cabinetry, stone and hardware in person.'],
      ['Do you build semi-custom kitchens?', 'Yes. We build both custom and semi-custom kitchens and will help you choose the approach that fits your space and priorities.'],
      ['Will the kitchen suit the rest of my home?', 'That is the point of designing it as part of the whole house. Layout, finishes and trim are chosen to match your home.'],
      ['How do I start a kitchen project?', 'Request a consultation. We’ll review your space, your goals and the finishes you like, and outline the next steps.'],
    ],
  },
  {
    slug: 'additions', nav: 'Additions & Renovations', short: 'More space and better flow, built to match your home.',
    metaTitle: 'Home Additions & Whole-House Renovations in CT | Our House Design & Construction',
    desc: 'Home additions and whole-house renovations designed and built by one team in Fairfield and Litchfield County, CT. More space and better flow, matched to your existing home.',
    title: 'Additions and renovations built to match your home',
    lede: 'More space and better flow, whether that is a new wing, a second story or a whole-house renovation.',
    photo: 'remodel2', Art: AdditionArt,
    intro: ['A good addition looks like it was always part of the house. That takes careful design, structural planning and trades who understand how new work meets old.',
      'We design the addition, prepare the site and foundation with our own crew, and build it so the roofline, trim and finishes match what is already there.'],
    points: [['Designed to match', 'Rooflines, materials and trim planned around your existing home.'], ['Structural and site planning', 'Foundations and excavation handled by our own crew.'], ['Whole-house renovation', 'Reworking layout, finishes and systems across the entire home.'], ['One team, one schedule', 'Design and construction coordinated under a single contract.']],
    faq: [
      ['Can you match my existing home’s style?', 'Yes. We design additions around your home’s rooflines, materials and details so the new space feels original.'],
      ['Do I need to move out during construction?', 'It depends on the scope. We’ll talk through living arrangements and phasing at your consultation.'],
      ['Do you handle the foundation and site work?', 'Yes. Our own crew and excavators handle excavation, drainage and foundations.'],
    ],
  },
  {
    slug: 'bathrooms', nav: 'Bathrooms', short: 'Primary suites and baths finished with care.',
    metaTitle: 'Bathroom Remodeling in Southbury, CT | Our House Design & Construction',
    desc: 'Primary suites and bathroom remodels designed with a dedicated interior designer and built by one team in Litchfield and Fairfield County, CT.',
    title: 'Bathrooms finished with care',
    lede: 'Primary suites and baths designed with your own interior designer and built by the same team that handles the rest of your home.',
    photo: null, Art: BathArt,
    intro: ['A bathroom packs plumbing, tile, waterproofing and fine finishes into a small space, so the details matter. We plan layouts, fixtures and materials together before work begins.',
      'Whether you are updating a single bath or building a new primary suite, one team designs it, builds it and stands behind it.'],
    points: [['Layout and fixture planning', 'Brands including Kohler, Grohe and Brizo, and others on request.'], ['Tile and stone', 'Surfaces chosen with your designer and installed by our team.'], ['Custom vanities and storage', 'Cabinetry planned to the room, not the other way around.'], ['Primary suites', 'Whole-suite design when a bath is part of a larger project.']],
    faq: [
      ['Do you build full primary suites?', 'Yes. We design and build primary suites, including additions when more space is needed.'],
      ['Which fixture brands do you work with?', 'We work with brands including Kohler, Grohe and Brizo, and can source others to suit your design.'],
      ['Can a bathroom be part of a larger renovation?', 'Yes. We often combine bathrooms with kitchen, addition or whole-house projects so everything is coordinated.'],
    ],
  },
  {
    slug: 'site-work', nav: 'Site Work & Foundations', short: 'Excavation, drainage and concrete by our own crew.',
    metaTitle: 'Excavation, Site Work & Foundations in CT | Our House Design & Construction',
    desc: 'Excavation, drainage and foundations by our own crew and equipment in Litchfield, Fairfield and New Haven County, CT. One team from the first cut to the finished home.',
    title: 'Site work and foundations by our own crew',
    lede: 'We own and operate our own excavators. Clearing, excavation, drainage and concrete are handled by our crew, on our schedule.',
    photo: 'poolHouse2', Art: FoundationArt,
    intro: ['Site work sets the schedule for everything that follows. Because our own crew and equipment handle it, we are not waiting on an outside contractor to fit us in.',
      'The foundation is built for the house on the plans, by the people who will frame it.'],
    points: [['Our own excavators', 'Clearing and excavation without outside scheduling gaps.'], ['Drainage', 'Planned into the site from the start.'], ['Footings and concrete', 'Poured by our crew for the house on the plans.'], ['A smooth handoff', 'The same team continues from foundation to framing.']],
    faq: [
      ['Do you own your equipment?', 'Yes. We own and operate our own excavators.'],
      ['Do you do site work as a standalone service?', 'Our site work is part of our design-build projects. Get in touch with details of your project and we’ll tell you how we can help.'],
    ],
  },
]
export const bySlug = (s) => SERVICES.find((x) => x.slug === s)

export const PROJECTS = [
  { photos: ['poolHouse', 'poolHouse2'], kind: 'Custom build', title: 'Pool House', text: 'A custom pool house, designed and built by the Our House team.' },
  { photos: ['scullery', 'scullery2'], kind: 'Kitchen', title: 'Custom Scullery', text: 'A custom scullery with cabinetry and stone, designed and built by our team.' },
  { photos: ['remodel', 'remodel2'], kind: 'Whole-home remodel', title: 'Custom Remodel', text: 'A whole-home remodel, designed and built under one contract.' },
]

export const STEPS = [
  ['Consultation and design', 'Tell us about your goals, your lot and the finishes you like.', 'We prepare plans, elevations and 3D renderings. A dedicated interior designer helps you select finishes before anything is built.'],
  ['Site and foundation', 'Approve the plans and the schedule.', 'Our own crew clears the site and handles excavation, drainage, footings and concrete, built for the house on the plans.'],
  ['Frame and systems', 'Stay informed with regular updates from your project manager.', 'The structure goes up from the same drawings, checked on site by Drew, with trades coordinated by one team.'],
  ['Finish and walkthrough', 'Walk the finished home with us.', 'Cabinetry, stone, trim and the last details, followed by a final walkthrough. One contract the whole way.'],
]

export const BRANDS = ['Kohler', 'Grohe', 'Brizo', 'Cambria', 'Caesarstone', 'Silestone', 'Dura Supreme', 'Fabuwood', 'Executive Cabinetry', 'Tedd Wood', 'Top Knobs', 'Daltile', 'Vadara', 'Viatera']

export const AREAS = [
  ['Litchfield County', ['Woodbury', 'Washington', 'Roxbury', 'Bridgewater', 'New Milford', 'Litchfield', 'Bethlehem', 'Watertown']],
  ['Fairfield County', ['Newtown', 'Brookfield', 'Ridgefield', 'Redding', 'Monroe', 'Trumbull', 'Sherman', 'New Fairfield']],
  ['New Haven County', ['Southbury', 'Middlebury', 'Oxford', 'Woodbridge', 'Beacon Falls', 'Orange']],
]
