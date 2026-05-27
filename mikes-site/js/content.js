// =============================================
//   CONTENT LOADER — mikes-site/js/content.js
//   Hydrates each page with live Sanity content
// =============================================

import {
  getAbout, getFeaturedProjects, getProjects,
  getPosts, getServices, getTestimonials,
  getSiteSettings, imageUrl
} from './sanity.js'

// ── Detect current page ──
const page = location.pathname.split('/').filter(Boolean).pop()?.replace('.html','') || 'index'

// ── Run on DOM ready ──
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Always load site settings (phone, email, socials)
    loadSiteSettings()

    if (page === 'index' || page === '') {
      loadHomepage()
    } else if (page === 'about') {
      loadAbout()
    } else if (page === 'projects') {
      loadProjects()
    } else if (page === 'blog' || page === 'news') {
      loadBlog()
    } else if (page === 'services') {
      loadServices()
    }
  } catch (err) {
    console.warn('Sanity content load error:', err)
    // Falls back to static HTML gracefully
  }
})

// ══════════════════════════════════════
//   SITE SETTINGS
// ══════════════════════════════════════
async function loadSiteSettings() {
  try {
    const settings = await getSiteSettings()
    if (!settings) return

    // Update footer social links
    if (settings.facebook) updateHref('[aria-label="Facebook"]', settings.facebook)
    if (settings.instagram) updateHref('[aria-label="Instagram"]', settings.instagram)
    if (settings.linkedin) updateHref('[aria-label="LinkedIn"]', settings.linkedin)
    if (settings.tiktok) updateHref('[aria-label="TikTok"]', settings.tiktok)
    if (settings.youtube) updateHref('[aria-label="YouTube"]', settings.youtube)
    if (settings.x) updateHref('[aria-label="X (Twitter)"]', settings.x)

    // Update footer contact info
    if (settings.email) {
      document.querySelectorAll('.footer-contact-item span').forEach(el => {
        if (el.textContent.includes('@')) el.textContent = settings.email
      })
    }
    if (settings.phone) {
      document.querySelectorAll('.footer-contact-item span').forEach(el => {
        if (el.textContent.includes('Contact via')) el.textContent = settings.phone
      })
    }
  } catch(e) {}
}

// ══════════════════════════════════════
//   HOMEPAGE
// ══════════════════════════════════════
async function loadHomepage() {
  const [projects, testimonials, settings] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(true),
    getSiteSettings(),
  ])

  // Stats
  if (settings) {
    const statEls = document.querySelectorAll('.stat-number[data-count]')
    if (statEls[0] && settings.projectsCompleted) statEls[0].dataset.count = settings.projectsCompleted
    if (statEls[1] && settings.yearsExperience) statEls[1].dataset.count = settings.yearsExperience
  }

  // Featured projects grid
  if (projects?.length) {
    const grid = document.querySelector('.projects-grid')
    if (grid) {
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
  }

  // Testimonials
  if (testimonials?.length) {
    const grid = document.querySelector('.reviews-grid')
    if (grid) {
      grid.innerHTML = testimonials.slice(0, 3).map((t, i) => `
        <div class="review-card" data-reveal data-reveal-delay="${i + 1}">
          <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
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
  }
}

// ══════════════════════════════════════
//   ABOUT PAGE
// ══════════════════════════════════════
async function loadAbout() {
  const about = await getAbout()
  if (!about) return

  // Headline
  setText('.section-title em', about.headline)

  // Paragraphs
  const paras = document.querySelectorAll('.about-grid p')
  if (paras[0] && about.intro) paras[0].textContent = about.intro
  if (paras[1] && about.body) paras[1].textContent = about.body

  // Years experience badge
  if (about.yearsExperience) {
    const badge = document.querySelector('.about-experience strong')
    if (badge) badge.textContent = `${about.yearsExperience}+`
  }

  // Main image
  if (about.mainImage?.asset) {
    const img = document.querySelector('.about-img-main')
    if (img) {
      img.src = imageUrl(about.mainImage.asset._id, 1200)
      img.alt = about.mainImage.alt || 'About us'
    }
  }

  // Accent image
  if (about.accentImage?.asset) {
    const img = document.querySelector('.about-img-accent')
    if (img) {
      img.src = imageUrl(about.accentImage.asset._id, 800)
      img.alt = about.accentImage.alt || ''
    }
  }

  // Highlights list
  if (about.highlights?.length) {
    const list = document.querySelector('.about-list')
    if (list) {
      list.innerHTML = about.highlights.map(h => `
        <li>${h}</li>
      `).join('')
    }
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
    <div class="gallery-item" data-reveal data-reveal-delay="${(i % 3) + 1}">
      <img src="${imageUrl(p.mainImage?.asset?._id, 800)}" alt="${p.mainImage?.alt || p.title}" loading="lazy" />
      <div class="gallery-caption">
        <div>
          <div class="project-tag" style="margin:0 auto 8px;display:inline-block">${categoryLabel(p.category)}</div>
          <p>${p.title}${p.location ? ' — ' + p.location : ''}</p>
          ${p.status === 'ongoing' ? '<p style="color:var(--accent);font-size:11px;margin-top:4px">🔨 Ongoing</p>' : ''}
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
    <div class="blog-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
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
  // Services page uses about-grid structure per service
  // Only update images if they exist in Sanity
  services.forEach((s, i) => {
    const imgs = document.querySelectorAll('.about-img-main')
    if (imgs[i] && s.mainImage?.asset) {
      imgs[i].src = imageUrl(s.mainImage.asset._id, 1200)
      imgs[i].alt = s.mainImage.alt || s.title
    }
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
  document.querySelectorAll(selector).forEach(el => {
    if (href) el.href = href
  })
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function categoryLabel(cat) {
  const map = {
    renovation: 'Full Renovation', bathroom: 'Bathroom', kitchen: 'Kitchen',
    structural: 'Structural', loft: 'Loft / Basement', commercial: 'Commercial',
    tiling: 'Tiling', electrical: 'Electrical', plumbing: 'Plumbing'
  }
  return map[cat] || cat || 'Project'
}
