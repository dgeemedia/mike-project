// =============================================
//   CONTENT LOADER — full homepage wiring
// =============================================
import {
  getHomepage, getAbout, getFeaturedProjects, getProjects,
  getPosts, getServices, getTestimonials,
  getSiteSettings, getDesignSettings, imageUrl
} from './sanity.js'

const page = location.pathname.split('/').filter(Boolean).pop()?.replace('.html','') || 'index'

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Promise.all([
      applyDesignSettings(),
      loadSiteSettings(),
    ])
    if (page === 'index' || page === '') loadHomepage()
    else if (page === 'about') loadAbout()
    else if (page === 'projects') loadProjects()
    else if (page === 'blog') loadBlog()
    else if (page === 'services') loadServices()
  } catch(err) {
    console.warn('Sanity load error:', err)
  }
})

// ══════════════════════════════════════
//   DESIGN SETTINGS — apply CSS vars
// ══════════════════════════════════════
async function applyDesignSettings() {
  const d = await getDesignSettings()
  if (!d) return
  const root = document.documentElement
  if (d.accentColor)  root.style.setProperty('--accent', d.accentColor)
  if (d.accentDark)   root.style.setProperty('--accent-dark', d.accentDark)
  if (d.primaryColor) root.style.setProperty('--primary', d.primaryColor)
  if (d.textColor)    root.style.setProperty('--text', d.textColor)
  if (d.lightBg)      root.style.setProperty('--light', d.lightBg)

  // Fonts
  const googleFonts = ['Playfair Display','Cormorant Garamond','Merriweather','Montserrat','Inter','Open Sans','Lato','Source Sans Pro','Raleway']
  if (d.headingFont && d.headingFont !== 'Playfair Display') {
    loadGoogleFont(d.headingFont)
    document.querySelectorAll('h1,h2,h3,h4').forEach(el => el.style.fontFamily = `'${d.headingFont}', serif`)
  }
  if (d.bodyFont && d.bodyFont !== 'Raleway') {
    loadGoogleFont(d.bodyFont)
    document.body.style.fontFamily = `'${d.bodyFont}', sans-serif`
  }
}

function loadGoogleFont(name) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g,'+')}:wght@300;400;500;600;700&display=swap`
  document.head.appendChild(link)
}

// ══════════════════════════════════════
//   SITE SETTINGS
// ══════════════════════════════════════
async function loadSiteSettings() {
  const s = await getSiteSettings()
  if (!s) return
  if (s.facebook)  updateHref('[aria-label="Facebook"]', s.facebook)
  if (s.instagram) updateHref('[aria-label="Instagram"]', s.instagram)
  if (s.linkedin)  updateHref('[aria-label="LinkedIn"]', s.linkedin)
  if (s.tiktok)    updateHref('[aria-label="TikTok"]', s.tiktok)
  if (s.youtube)   updateHref('[aria-label="YouTube"]', s.youtube)
  if (s.x)         updateHref('[aria-label="X (Twitter)"]', s.x)
  document.querySelectorAll('.footer-contact-item span').forEach(el => {
    if (s.email && el.textContent.includes('@')) el.textContent = s.email
    if (s.phone && el.textContent.includes('Contact via')) el.textContent = s.phone
    if (s.address && el.textContent.includes('Crewe')) el.textContent = s.address
  })
}

// ══════════════════════════════════════
//   HOMEPAGE — all sections
// ══════════════════════════════════════
async function loadHomepage() {
  const [hp, projects, testimonials] = await Promise.all([
    getHomepage(),
    getFeaturedProjects(),
    getTestimonials(true),
  ])

  if (hp) {
    applyHero(hp.hero)
    applyHeroBadges(hp.heroBadges)
    applyStats(hp.stats)
    applyAboutSnippet(hp.aboutSnippet)
    applyServicesSection(hp.servicesSection)
    applyWhyChoose(hp.whyChoose)
    applyProjectsSection(hp.projectsSection)
    applyProcess(hp.process)
    applyTestimonialsSection(hp.testimonialsSection)
    applyCtaBanner(hp.ctaBanner)
  }
  if (projects?.length) applyFeaturedProjects(projects)
  if (testimonials?.length) applyTestimonials(testimonials)
}

// ── HERO ──
function applyHero(h) {
  if (!h) return
  if (h.eyebrow)    setText('.hero-eyebrow', h.eyebrow)
  if (h.headingLine1 || h.headingLine2 || h.headingLine3) {
    const h1 = document.querySelector('.hero h1')
    if (h1) h1.innerHTML = `${h.headingLine1 || ''}<br><em>${h.headingLine2 || ''}</em><br>${h.headingLine3 || ''}`
  }
  if (h.subtext) setText('.hero > .container .hero-content p', h.subtext)
  if (h.primaryButtonText) setText('.hero-actions .btn-primary', h.primaryButtonText)
  if (h.secondaryButtonText) setText('.hero-actions .btn-outline', h.secondaryButtonText)
  if (h.backgroundImage?.asset) {
    const img = document.querySelector('.hero-bg img')
    if (img) {
      img.src = imageUrl(h.backgroundImage.asset._id, 1400)
      img.alt = h.backgroundImage.alt || ''
    }
  }
}

// ── HERO BADGES ──
function applyHeroBadges(badges) {
  if (!badges?.length) return
  const inner = document.querySelector('.hero-badges-inner')
  if (!inner) return
  inner.innerHTML = badges.map((b, i) => `
    ${i > 0 ? '<div class="badge-divider"></div>' : ''}
    <div class="badge-item">
      <div class="badge-icon">${b.icon || '✓'}</div>
      <div class="badge-text">
        <strong>${b.title || ''}</strong>
        <span>${b.subtitle || ''}</span>
      </div>
    </div>
  `).join('')
}

// ── STATS ──
function applyStats(stats) {
  if (!stats?.length) return
  const cards = document.querySelectorAll('.stat-card')
  stats.forEach((s, i) => {
    if (!cards[i]) return
    const num = cards[i].querySelector('.stat-number')
    const label = cards[i].querySelector('.stat-label')
    if (num && s.number) {
      num.dataset.count = s.number
      num.dataset.prefix = s.prefix || ''
      num.dataset.suffix = s.suffix || ''
      num.textContent = (s.prefix || '') + '0' + (s.suffix || '')
    }
    if (label && s.label) label.textContent = s.label
  })
}

// ── ABOUT SNIPPET ──
function applyAboutSnippet(a) {
  if (!a) return
  const section = document.querySelector('.about-grid')
  if (!section) return
  if (a.label) setText('.about-grid + div .section-label, .about-grid .section-label', a.label)

  const title = section.closest('.section')?.querySelector('.section-title')
  if (title && (a.headingMain || a.headingAccent)) {
    title.innerHTML = `${a.headingMain || ''} <em>${a.headingAccent || ''}</em>`
  }

  const paras = section.querySelectorAll('p[style]')
  if (paras[0] && a.paragraph1) paras[0].textContent = a.paragraph1
  if (paras[1] && a.paragraph2) paras[1].textContent = a.paragraph2

  if (a.yearsExperience) {
    const badge = section.querySelector('.about-experience strong')
    if (badge) badge.textContent = `${a.yearsExperience}+`
  }

  if (a.highlights?.length) {
    const list = section.querySelector('.about-list')
    if (list) list.innerHTML = a.highlights.map(h => `<li>${h}</li>`).join('')
  }

  if (a.buttonText) setText('.about-grid ~ * .btn-dark, .about-grid .btn-dark', a.buttonText)

  if (a.mainImage?.asset) {
    const img = section.querySelector('.about-img-main')
    if (img) { img.src = imageUrl(a.mainImage.asset._id, 1200); img.alt = a.mainImage.alt || '' }
  }
  if (a.accentImage?.asset) {
    const img = section.querySelector('.about-img-accent')
    if (img) { img.src = imageUrl(a.accentImage.asset._id, 800); img.alt = a.accentImage.alt || '' }
  }
}

// ── SERVICES SECTION HEADING ──
function applyServicesSection(s) {
  if (!s) return
  const section = document.querySelector('.services-grid')?.closest('.section')
  if (!section) return
  const label = section.querySelector('.section-label')
  const title = section.querySelector('.section-title')
  const sub   = section.querySelector('.section-sub')
  const btn   = section.querySelector('.btn-dark')
  if (label && s.label) label.textContent = s.label
  if (title && (s.headingMain || s.headingAccent)) title.innerHTML = `${s.headingMain || ''} <em>${s.headingAccent || ''}</em>`
  if (sub && s.subtext) sub.textContent = s.subtext
  if (btn && s.buttonText) btn.textContent = s.buttonText
}

// ── WHY CHOOSE ──
function applyWhyChoose(w) {
  if (!w) return
  const section = document.querySelector('.why-grid')?.closest('.section')
  if (!section) return
  const label = section.querySelector('.section-label')
  const title = section.querySelector('.section-title')
  const sub   = section.querySelector('.section-sub')
  if (label && w.label) label.textContent = w.label
  if (title && (w.headingMain || w.headingAccent)) title.innerHTML = `${w.headingMain || ''} <em>${w.headingAccent || ''}</em>`
  if (sub && w.subtext) sub.textContent = w.subtext

  if (w.cards?.length) {
    const cards = document.querySelectorAll('.why-card')
    w.cards.forEach((c, i) => {
      if (!cards[i]) return
      const h3 = cards[i].querySelector('h3')
      const p  = cards[i].querySelector('p')
      if (h3 && c.title) h3.textContent = c.title
      if (p  && c.body)  p.textContent  = c.body
    })
  }
}

// ── PROJECTS SECTION HEADING ──
function applyProjectsSection(p) {
  if (!p) return
  const section = document.querySelector('.projects-grid')?.closest('.section')
  if (!section) return
  const label = section.querySelector('.section-label')
  const title = section.querySelector('.section-title')
  if (label && p.label) label.textContent = p.label
  if (title && (p.headingMain || p.headingAccent)) title.innerHTML = `${p.headingMain || ''} <em>${p.headingAccent || ''}</em>`
}

// ── PROCESS ──
function applyProcess(p) {
  if (!p) return
  const section = document.querySelector('.process-steps')?.closest('.section')
  if (!section) return
  const label = section.querySelector('.section-label')
  const title = section.querySelector('.section-title')
  const sub   = section.querySelector('.section-sub')
  if (label && p.label) label.textContent = p.label
  if (title && (p.headingMain || p.headingAccent)) title.innerHTML = `${p.headingMain || ''} <em>${p.headingAccent || ''}</em>`
  if (sub && p.subtext) sub.textContent = p.subtext

  if (p.steps?.length) {
    const steps = document.querySelectorAll('.process-step')
    p.steps.forEach((s, i) => {
      if (!steps[i]) return
      const h3 = steps[i].querySelector('h3')
      const pp = steps[i].querySelector('p')
      if (h3 && s.title) h3.textContent = s.title
      if (pp && s.description) pp.textContent = s.description
    })
  }
}

// ── TESTIMONIALS SECTION HEADING ──
function applyTestimonialsSection(t) {
  if (!t) return
  const section = document.querySelector('.reviews-grid')?.closest('.section')
  if (!section) return
  const label = section.querySelector('.section-label')
  const title = section.querySelector('.section-title')
  const sub   = section.querySelector('.section-sub')
  if (label && t.label) label.textContent = t.label
  if (title && (t.headingMain || t.headingAccent)) title.innerHTML = `${t.headingMain || ''} <em>${t.headingAccent || ''}</em>`
  if (sub && t.subtext) sub.textContent = t.subtext
}

// ── CTA BANNER ──
function applyCtaBanner(c) {
  if (!c) return
  const banner = document.querySelector('.cta-banner')
  if (!banner) return
  if (c.heading) setText('.cta-banner h2', c.heading)
  if (c.subtext) setText('.cta-banner p', c.subtext)
  if (c.primaryButtonText)   setText('.cta-banner .btn-primary', c.primaryButtonText)
  if (c.secondaryButtonText) setText('.cta-banner .btn-outline', c.secondaryButtonText)
}

// ── FEATURED PROJECTS ──
function applyFeaturedProjects(projects) {
  const grid = document.querySelector('.projects-grid')
  if (!grid) return
  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card ${i === 0 ? 'featured' : ''}" data-reveal ${i > 0 ? `data-reveal-delay="${i}"` : ''}>
      <img src="${imageUrl(p.mainImage?.asset?._id, 900)}" alt="${p.mainImage?.alt || p.title}" loading="lazy" />
      <div class="project-overlay">
        <span class="project-tag">${categoryLabel(p.category)}</span>
        <h3>${p.title}</h3>
        <p>${p.location || ''}</p>
      </div>
    </div>
  `).join('')
}

// ── TESTIMONIALS ──
function applyTestimonials(testimonials) {
  const grid = document.querySelector('.reviews-grid')
  if (!grid) return
  grid.innerHTML = testimonials.slice(0,3).map((t, i) => `
    <div class="review-card" data-reveal data-reveal-delay="${i+1}">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
      <p class="review-text">${t.review}</p>
      <div class="review-author">
        <div class="author-avatar">${t.name.charAt(0)}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-location">${t.location || ''}</div>
        </div>
      </div>
    </div>
  `).join('')
}

// ══════════════════════════════════════
//   ABOUT PAGE
// ══════════════════════════════════════
async function loadAbout() {
  const about = await getAbout()
  if (!about) return
  setText('.section-title em', about.headline)
  const paras = document.querySelectorAll('.about-grid p')
  if (paras[0] && about.intro) paras[0].textContent = about.intro
  if (paras[1] && about.body)  paras[1].textContent = about.body
  if (about.yearsExperience) {
    const badge = document.querySelector('.about-experience strong')
    if (badge) badge.textContent = `${about.yearsExperience}+`
  }
  if (about.mainImage?.asset) {
    const img = document.querySelector('.about-img-main')
    if (img) { img.src = imageUrl(about.mainImage.asset._id, 1200); img.alt = about.mainImage.alt || '' }
  }
  if (about.accentImage?.asset) {
    const img = document.querySelector('.about-img-accent')
    if (img) { img.src = imageUrl(about.accentImage.asset._id, 800); img.alt = about.accentImage.alt || '' }
  }
  if (about.highlights?.length) {
    const list = document.querySelector('.about-list')
    if (list) list.innerHTML = about.highlights.map(h => `<li>${h}</li>`).join('')
  }
}

// ══════════════════════════════════════
//   PROJECTS PAGE
// ══════════════════════════════════════
async function loadProjects() {
  const projects = await getProjects()
  if (!projects?.length) return
  const grid = document.querySelector('.gallery-grid')
  if (!grid) return
  grid.innerHTML = projects.map((p, i) => `
    <div class="gallery-item" data-reveal data-reveal-delay="${(i%3)+1}">
      <img src="${imageUrl(p.mainImage?.asset?._id, 800)}" alt="${p.mainImage?.alt || p.title}" loading="lazy" />
      <div class="gallery-caption">
        <div>
          <div class="project-tag" style="margin:0 auto 8px;display:inline-block">${categoryLabel(p.category)}</div>
          <p>${p.title}${p.location ? ' — '+p.location : ''}</p>
          ${p.status==='ongoing' ? '<p style="color:var(--accent);font-size:11px;margin-top:4px">🔨 Ongoing</p>' : ''}
        </div>
      </div>
    </div>
  `).join('')
}

// ══════════════════════════════════════
//   BLOG PAGE
// ══════════════════════════════════════
async function loadBlog() {
  const posts = await getPosts(12)
  if (!posts?.length) return
  const grid = document.querySelector('.blog-grid')
  if (!grid) return
  grid.innerHTML = posts.map((p, i) => `
    <div class="blog-card" data-reveal data-reveal-delay="${(i%3)+1}">
      <div class="blog-img">
        <img src="${imageUrl(p.coverImage?.asset?._id, 600)}" alt="${p.coverImage?.alt || p.title}" loading="lazy" />
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-tag">${p.category || 'News'}</span>
          <span class="blog-date">${formatDate(p.publishedAt)}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <a href="post.html?slug=${p.slug?.current}" class="blog-read">Read More →</a>
      </div>
    </div>
  `).join('')
}

// ══════════════════════════════════════
//   SERVICES PAGE
// ══════════════════════════════════════
async function loadServices() {
  const services = await getServices()
  if (!services?.length) return
  services.forEach((s, i) => {
    const imgs = document.querySelectorAll('.about-img-main')
    if (imgs[i] && s.mainImage?.asset) {
      imgs[i].src = imageUrl(s.mainImage.asset._id, 1200)
      imgs[i].alt = s.mainImage.alt || s.title
    }
    const h2s = document.querySelectorAll('.about-grid .section-title em')
    if (h2s[i] && s.title) h2s[i].textContent = s.title
    const descs = document.querySelectorAll('.about-grid p[style]')
    if (descs[i*2] && s.shortDescription) descs[i*2].textContent = s.shortDescription
  })
}

// ══════════════════════════════════════
//   HELPERS
// ══════════════════════════════════════
function setText(selector, text) {
  const el = document.querySelector(selector)
  if (el && text) el.textContent = text
}
function updateHref(selector, href) {
  document.querySelectorAll(selector).forEach(el => { if (href) el.href = href })
}
function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}
function categoryLabel(cat) {
  const map = {
    renovation:'Full Renovation', bathroom:'Bathroom', kitchen:'Kitchen',
    structural:'Structural', loft:'Loft / Basement', commercial:'Commercial',
    tiling:'Tiling', electrical:'Electrical', plumbing:'Plumbing'
  }
  return map[cat] || cat || 'Project'
}
