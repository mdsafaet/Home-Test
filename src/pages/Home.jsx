import { Hero } from '../Hero.jsx'
import { Provide, Build, FromFoundation, Projects, Proof, Areas } from '../sections.jsx'
import KitchenStudio from '../KitchenStudio.jsx'
import { CtaBand, usePageMeta } from '../ui.jsx'

export default function Home() {
  usePageMeta('Custom Home Builder & Kitchen Design-Build | Southbury, CT | Our House', 'Family-owned design-build firm creating custom homes, kitchens, and additions in Litchfield and Fairfield County, CT. One team from excavation to finish.')
  return (
    <>
      <Hero /><Provide /><Build /><FromFoundation /><Projects /><KitchenStudio /><Proof /><Areas /><CtaBand />
    </>
  )
}
