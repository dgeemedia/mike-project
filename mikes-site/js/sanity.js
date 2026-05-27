// mikes-site/js/sanity.js
// =============================================
//   SANITY CLIENT — mikes-site/js/sanity.js
//   Fetches live content from Sanity CMS
// =============================================

// ⚠️ Replace these with your real values after setup
const PROJECT_ID = '2ap09xp4'
const DATASET    = 'production'
const API_VERSION = '2024-01-01'

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`

// ── Core fetch function ──
async function sanityFetch(query) {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`)
  const data = await res.json()
  return data.result
}

// ── Image URL builder ──
export function imageUrl(ref, width = 800) {
  if (!ref) return ''
  // ref format: image-{id}-{width}x{height}-{ext}
  const [,id,,ext] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}.${ext}?w=${width}&auto=format`
}

// ══════════════════════════════════════
//   QUERIES
// ══════════════════════════════════════

// About Us
export async function getAbout() {
  return sanityFetch(`*[_type == "about"][0]{
    headline, intro, body, yearsExperience,
    mainImage{ asset->{_id, url}, alt },
    accentImage{ asset->{_id, url}, alt },
    highlights
  }`)
}

// Projects — all
export async function getProjects(status = null) {
  const filter = status
    ? `*[_type == "project" && status == "${status}"]`
    : `*[_type == "project"]`
  return sanityFetch(`${filter} | order(order asc, completedDate desc) {
    _id, title, slug, status, category, location, description, featured,
    mainImage{ asset->{_id, url}, alt },
    gallery[]{ asset->{_id, url}, alt }
  }`)
}

// Featured projects for homepage
export async function getFeaturedProjects() {
  return sanityFetch(`*[_type == "project" && featured == true] | order(order asc)[0...6] {
    _id, title, slug, status, category, location, description,
    mainImage{ asset->{_id, url}, alt }
  }`)
}

// Single project
export async function getProject(slug) {
  return sanityFetch(`*[_type == "project" && slug.current == "${slug}"][0]{
    _id, title, slug, status, category, location, description, completedDate,
    mainImage{ asset->{_id, url}, alt },
    gallery[]{ asset->{_id, url}, alt }
  }`)
}

// Blog posts
export async function getPosts(limit = 10) {
  return sanityFetch(`*[_type == "post" && status == "published"] | order(publishedAt desc)[0...${limit}] {
    _id, title, slug, category, excerpt, publishedAt, author,
    coverImage{ asset->{_id, url}, alt }
  }`)
}

// Single post
export async function getPost(slug) {
  return sanityFetch(`*[_type == "post" && slug.current == "${slug}"][0]{
    _id, title, slug, category, excerpt, publishedAt, author,
    coverImage{ asset->{_id, url}, alt },
    body, seoTitle, seoDescription
  }`)
}

// Services
export async function getServices() {
  return sanityFetch(`*[_type == "service"] | order(order asc) {
    _id, title, slug, icon, shortDescription,
    mainImage{ asset->{_id, url}, alt }
  }`)
}

// Testimonials
export async function getTestimonials(featuredOnly = false) {
  const filter = featuredOnly
    ? `*[_type == "testimonial" && featured == true]`
    : `*[_type == "testimonial"]`
  return sanityFetch(`${filter} | order(order asc) {
    _id, name, location, rating, review
  }`)
}

// Site settings
export async function getSiteSettings() {
  return sanityFetch(`*[_type == "siteSettings"][0]{
    companyName, tagline, phone, email, address,
    facebook, instagram, linkedin, tiktok, youtube, x,
    projectsCompleted, yearsExperience
  }`)
}

export default sanityFetch
