// =============================================
//   SANITY CLIENT — mikes-site/js/sanity.js
// =============================================

const PROJECT_ID  = '2ap09xp4'
const DATASET     = 'production'
const API_VERSION = '2024-01-01'
const BASE_URL    = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`

async function sanityFetch(query) {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}`
  const res  = await fetch(url)
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`)
  const data = await res.json()
  return data.result
}

export function imageUrl(ref, width = 800) {
  if (!ref) return ''
  const parts = ref.split('-')
  const id  = parts[1]
  const ext = parts[parts.length - 1]
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}.${ext}?w=${width}&auto=format`
}

// ── Pages ──
// FIX: removed stale 'eyebrow' field from hero projection — deleted from schema
// but was still being queried, returning null on every homepage fetch.
// FIX: getServicesPage no longer requests the deprecated inline 'services' array.
export const getHomepage = () => sanityFetch(
  `*[_type=="homepage"&&_id=="homepage"][0]{
    hero{
      headingLine1,headingLine2,headingLine3,subtext,
      primaryButtonText,secondaryButtonText,
      backgroundImage{asset->{_id},alt}
    },
    heroBadges[]{icon,title,subtitle},
    stats[]{number,prefix,suffix,label},
    aboutSnippet{
      label,headingMain,headingAccent,paragraph1,paragraph2,
      highlights,buttonText,yearsExperience,
      mainImage{asset->{_id},alt},accentImage{asset->{_id},alt}
    },
    servicesSection{label,headingMain,headingAccent,subtext,buttonText},
    whyChoose{label,headingMain,headingAccent,subtext,cards[]{title,body}},
    projectsSection{label,headingMain,headingAccent},
    process{label,headingMain,headingAccent,subtext,steps[]{title,description}},
    testimonialsSection{label,headingMain,headingAccent,subtext},
    ctaBanner{heading,subtext,primaryButtonText,secondaryButtonText}
  }`
)

export const getAboutPage    = () => sanityFetch(`*[_type=="aboutPage"&&_id=="aboutPage"][0]{pageHero,story{label,headingMain,headingAccent,paragraph1,paragraph2,paragraph3,yearsExperience,mainImage{asset->{_id},alt},accentImage{asset->{_id},alt}},commitment{label,headingMain,headingAccent,paragraph1,paragraph2},whyChoose{label,headingMain,headingAccent,reasons[]{title,body}},featuredTestimonial{quote,name,location},ctaBanner{heading,subtext,primaryButtonText,secondaryButtonText}}`)

// FIX: no longer requests the deprecated inline 'services' array from servicesPage.
// Page-level content (hero, intro, CTA) is still fetched from the singleton.
// Individual services now come from getServices() below.
export const getServicesPage = () => sanityFetch(`*[_type=="servicesPage"&&_id=="servicesPage"][0]{pageHero,introText,ctaBanner{heading,subtext,primaryButtonText,secondaryButtonText}}`)

export const getProjectsPage = () => sanityFetch(`*[_type=="projectsPage"&&_id=="projectsPage"][0]{pageHero,ctaBanner{heading,subtext,buttonText}}`)

export const getContactPage  = () => sanityFetch(`*[_type=="contactPage"&&_id=="contactPage"][0]{pageHero,intro{label,headingMain,headingAccent,paragraph},contactDetails{serviceArea,email,workingHours,workingHours2},nextSteps,locationsSection{label,headingMain,headingAccent,subtext},locations[]{icon,title,description}}`)

export const getFaqPage      = () => sanityFetch(`*[_type=="faqPage"&&_id=="faqPage"][0]{pageHero,sideLabel,sideHeadingMain,sideHeadingAccent,sideParagraph,faqs[]{question,answer},ctaBanner{heading,subtext,buttonText}}`)

// ── Collections ──
export const getFeaturedProjects = () => sanityFetch(`*[_type=="project"&&featured==true]|order(order asc)[0...6]{_id,title,slug,status,category,location,mainImage{asset->{_id},alt}}`)
export const getProjects         = () => sanityFetch(`*[_type=="project"]|order(order asc,completedDate desc){_id,title,slug,status,category,location,description,featured,mainImage{asset->{_id},alt}}`)
export const getPosts            = (n=12) => sanityFetch(`*[_type=="post"&&status=="published"]|order(publishedAt desc)[0...${n}]{_id,title,slug,category,excerpt,publishedAt,author,coverImage{asset->{_id},alt}}`)
export const getTestimonials     = (featured=false) => sanityFetch(`*[_type=="testimonial"${featured?'&&featured==true':''}]|order(order asc){_id,name,location,rating,review}`)
export const getSiteSettings     = () => sanityFetch(`*[_type=="siteSettings"&&_id=="siteSettings"][0]{logo{asset->{_id},alt},logoWidth,useLogo,companyName,tagline,phone,email,address,facebook,instagram,linkedin,tiktok,youtube,x,projectsCompleted,yearsExperience}`)
export const getDesignSettings   = () => sanityFetch(`*[_type=="designSettings"&&_id=="designSettings"][0]{accentColor,accentDark,primaryColor,textColor,lightBg,headingFont,bodyFont}`)

// FIX: getServices() fetches from the 'service' document collection.
// Previously the service collection existed in Sanity Studio but was never
// queried — content.js read the deprecated inline array inside servicesPage
// instead. Now the service collection is the single source of truth.
// Fields match the updated service.js schema.
export const getServices = () => sanityFetch(
  `*[_type=="service"]|order(order asc){
    _id,title,slug,icon,headingMain,headingAccent,
    paragraph1,paragraph2,
    mainImage{asset->{_id},alt},
    accentImage{asset->{_id},alt},
    order
  }`
)

// ── Single post by slug (used by post.html / post-content.js) ──
export const getPost = (slug) => sanityFetch(
  `*[_type=="post"&&slug.current=="${slug}"&&status=="published"][0]{
    _id,title,slug,category,excerpt,publishedAt,author,
    coverImage{asset->{_id},alt},
    body[]{
      ...,
      _type=="image"=>{...,asset->{_id},alt}
    },
    seoTitle,seoDescription
  }`
)

export default sanityFetch