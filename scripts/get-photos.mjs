// Downloads Our House's own project photos from their live site into public/images.
// Run on your own computer:  npm run photos      (Node 18+)
// Check every file afterwards: the mapping below was inferred from the live page, so swap any that don't match.
import { mkdir, writeFile } from 'node:fs/promises'

const BASE = 'https://static.wixstatic.com/media/'
const FILES = {
  'lake-house.jpg': '5954d0_128508ffed004364b49189f6b5a11747~mv2.jpg',
  'plans.jpg': '5954d0_392e0d1ea37b4677b4672a9668b328c6~mv2.jpg',
  'interior.jpg': '5954d0_f2cda29c83674996a1348dc714d7a9fb~mv2.jpg',
  'portrait.jpg': '5954d0_90cdc7ccbbdd460c93a9b1b64de3736e~mv2.jpg',
  'remodel.jpg': '5954d0_20ab36e44d124bf2a154adfcb3435884~mv2.jpg',
  'remodel-2.jpg': '5954d0_dadd17a507a4417f8ef9e24fb44c5da5~mv2.jpg',
  'pool-house.jpg': '5954d0_771d2a1edff94c09aa4c93282805e7f8~mv2.jpg',
  'pool-house-2.jpg': '5954d0_9df83ea293c54172afee7d20ac1d6ee1~mv2.jpg',
  'scullery.jpg': '5954d0_9bd6c8e70d094c37af4342ac020d4db8~mv2.jpg',
  'scullery-2.jpg': '5954d0_852c1c7fae034735bd401be43a6321ca~mv2.jpg',
  'testimonial.jpg': '5954d0_1cbfc82b93c84e6994b4c45ba27b7d74~mv2.jpg',
}
await mkdir('public/images', { recursive: true })
for (const [name, id] of Object.entries(FILES)) {
  try {
    const r = await fetch(BASE + id)
    if (!r.ok) throw new Error(r.status)
    await writeFile(`public/images/${name}`, Buffer.from(await r.arrayBuffer()))
    console.log('saved', name)
  } catch (e) { console.log('FAILED', name, e.message) }
}
console.log('\nDone. Optional: add before.jpg and after.jpg to public/images for the before/after slider.')
