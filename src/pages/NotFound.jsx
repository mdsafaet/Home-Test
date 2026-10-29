import { Link } from 'react-router-dom'
import { PageHero, usePageMeta } from '../ui.jsx'

export default function NotFound() {
  usePageMeta('Page not found | Our House Design & Construction', 'The page you are looking for could not be found.')
  return (
    <PageHero title="We couldn’t find that page" lede="The link may be out of date. Try one of our main pages instead.">
      <Link to="/" className="btn bg-forest text-cream hover:bg-pine">Back to the home page</Link>
      <Link to="/contact" className="btn border border-forest/25 text-forest hover:bg-forest hover:text-cream">Contact us</Link>
    </PageHero>
  )
}
