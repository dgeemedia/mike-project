// =============================================
//   CONTENT LOADER — mikes-site/js/content.js
// =============================================
import {
  getHomepage, getAboutPage, getServicesPage, getProjectsPage,
  getContactPage, getFaqPage, getFeaturedProjects, getProjects,
  getPosts, getTestimonials, getSiteSettings, getDesignSettings,
  getServices, imageUrl
} from './sanity.js'

const page = location.pathname.split('/').filter(Boolean).pop()?.replace('.html','') || 'index'

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Promise.all([ applyDesign(), loadSiteSettings() ])
    if      (page === 'index'   || page === '') loadHomepage()
    else if (page === 'about')                  loadAbout()
    else if (page === 'services')               loadServices()
    else if (page === 'projects')               loadProjects()
    else if (page === 'contact')                loadContact()
    else if (page === 'faq')                    loadFaq()
    else if (page === 'blog')                   loadBlog()
  } catch(e) { console.warn('Sanity:', e) }
})

// ═══════════════════════════════════════════
//  DESIGN SETTINGS
// ═══════════════════════════════════════════
async function applyDesign() {
  const d = await getDesignSettings()
  if (!d) return
  const r = document.documentElement
  if (d.accentColor)  r.style.setProperty('--accent', d.accentColor)
  if (d.accentDark)   r.style.setProperty('--accent-dark', d.accentDark)
  if (d.primaryColor) r.style.setProperty('--primary', d.primaryColor)
  if (d.textColor)    r.style.setProperty('--text', d.textColor)
  if (d.lightBg)      r.style.setProperty('--light', d.lightBg)
  if (d.headingFont && d.headingFont !== 'Playfair Display') {
    addFont(d.headingFont)
    document.querySelectorAll('h1,h2,h3,h4').forEach(el => el.style.fontFamily = `'${d.headingFont}',serif`)
  }
  if (d.bodyFont && d.bodyFont !== 'Raleway') {
    addFont(d.bodyFont)
    document.body.style.fontFamily = `'${d.bodyFont}',sans-serif`
  }
}
function addFont(name) {
  const l = document.createElement('link')
  l.rel  = 'stylesheet'
  l.href = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g,'+')}:wght@300;400;500;600;700&display=swap`
  document.head.appendChild(l)
}

// ═══════════════════════════════════════════
//  SITE SETTINGS — socials, email, phone
// ═══════════════════════════════════════════
async function loadSiteSettings() {
  const s = await getSiteSettings()
  if (!s) return

  if (s.useLogo && s.logo?.asset?._id) {
    const logoUrl = imageUrl(s.logo.asset._id, (s.logoWidth || 140) * 2)
    const alt     = s.logo.alt || s.companyName || 'Mikes Constructions'
    document.querySelectorAll('.nav-logo-img').forEach(el => {
      el.src = logoUrl
      el.alt = alt
      el.style.maxWidth = `${s.logoWidth || 140}px`
    })
  }

  const links = { Facebook: s.facebook, Instagram: s.instagram, LinkedIn: s.linkedin, TikTok: s.tiktok, YouTube: s.youtube, 'X (Twitter)': s.x, X: s.x }
  Object.entries(links).forEach(([label, href]) => {
    if (href) document.querySelectorAll(`[aria-label="${label}"]`).forEach(el => el.href = href)
  })
  document.querySelectorAll('.footer-contact-item span').forEach(el => {
    if (s.email   && el.textContent.includes('@'))           el.textContent = s.email
    if (s.phone   && el.textContent.includes('Contact via')) el.textContent = s.phone
    if (s.address && el.textContent.includes('Crewe, Cheshire &')) el.textContent = s.address
  })
}

// ═══════════════════════════════════════════
//  HOMEPAGE
// ═══════════════════════════════════════════
async function loadHomepage() {
  const [hp, projects, testimonials] = await Promise.all([
    getHomepage(), getFeaturedProjects(), getTestimonials(true)
  ])
  if (!hp) return

  // Hero
  const h = hp.hero
  if (h) {
    if (h.headingLine1 || h.headingLine2 || h.headingLine3) {
      const el = document.querySelector('.hero h1')
      if (el) el.innerHTML = `${h.headingLine1||''}<br><em>${h.headingLine2||''}</em><br>${h.headingLine3||''}`
    }
    if (h.subtext) setText('.hero-content > p', h.subtext)
    if (h.primaryButtonText)   setText('.hero-actions .btn-primary', h.primaryButtonText)
    if (h.secondaryButtonText) setText('.hero-actions .btn-outline',  h.secondaryButtonText)
    if (h.backgroundImage?.asset?._id) {
      const img = document.querySelector('.hero-bg img')
      if (img) { img.src = imageUrl(h.backgroundImage.asset._id, 1400); img.alt = h.backgroundImage.alt || '' }
    }
  }

  // Badges
  if (hp.heroBadges?.length) {
    const inner = document.querySelector('.hero-badges-inner')
    if (inner) inner.innerHTML = hp.heroBadges.map((b,i) => `
      ${i>0?'<div class="badge-divider"></div>':''}
      <div class="badge-item">
        <div class="badge-icon">${b.icon||'✓'}</div>
        <div class="badge-text"><strong>${b.title||''}</strong><span>${b.subtitle||''}</span></div>
      </div>`).join('')
  }

  // Stats
  if (hp.stats?.length) {
    document.querySelectorAll('.stat-card').forEach((card, i) => {
      const s = hp.stats[i]; if (!s) return
      const num = card.querySelector('.stat-number')
      const lbl = card.querySelector('.stat-label')
      if (num) {
        num.dataset.count  = s.number
        num.dataset.prefix = s.prefix || ''
        num.dataset.suffix = s.suffix || ''
        num.textContent    = (s.prefix||'') + '0' + (s.suffix||'')
      }
      if (lbl && s.label) lbl.textContent = s.label
    })
    if (typeof window.runStatsCounters === 'function') window.runStatsCounters()
  }

  // About snippet
  const a = hp.aboutSnippet
  if (a) {
    const grid = document.querySelector('.about-grid')
    if (grid) {
      if (a.label) { const el = grid.querySelector('.section-label'); if (el) el.textContent = a.label }
      const title = grid.querySelector('.section-title')
      if (title) title.innerHTML = `${a.headingMain||''} <em>${a.headingAccent||''}</em>`
      const ps = grid.querySelectorAll('p[style]')
      if (ps[0] && a.paragraph1) ps[0].textContent = a.paragraph1
      if (ps[1] && a.paragraph2) ps[1].textContent = a.paragraph2
      if (a.yearsExperience) { const b = grid.querySelector('.about-experience strong'); if (b) b.textContent = `${a.yearsExperience}+` }
      if (a.highlights?.length) { const ul = grid.querySelector('.about-list'); if (ul) ul.innerHTML = a.highlights.map(h=>`<li>${h}</li>`).join('') }
      if (a.buttonText) { const btn = grid.querySelector('.btn-dark'); if (btn) btn.textContent = a.buttonText }
      if (a.mainImage?.asset?._id)  { const img = grid.querySelector('.about-img-main');  if (img) { img.src = imageUrl(a.mainImage.asset._id,1200);  img.alt = a.mainImage.alt||'' } }
      if (a.accentImage?.asset?._id){ const img = grid.querySelector('.about-img-accent'); if (img) { img.src = imageUrl(a.accentImage.asset._id,800); img.alt = a.accentImage.alt||'' } }
    }
  }

  // Services section heading
  const sv = hp.servicesSection
  if (sv) {
    const sec = document.querySelector('.services-grid')?.closest('.section')
    if (sec) {
      setSectionHead(sec, sv.label, sv.headingMain, sv.headingAccent, sv.subtext)
      if (sv.buttonText) { const btn = sec.querySelector('.btn-dark'); if (btn) btn.textContent = sv.buttonText }
    }
  }

  // Why Choose
  const wc = hp.whyChoose
  if (wc) {
    const sec = document.querySelector('.why-grid')?.closest('.section')
    if (sec) {
      setSectionHead(sec, wc.label, wc.headingMain, wc.headingAccent, wc.subtext)
      if (wc.cards?.length) {
        document.querySelectorAll('.why-card').forEach((card, i) => {
          const c = wc.cards[i]; if (!c) return
          const h3 = card.querySelector('h3'); const p = card.querySelector('p')
          if (h3 && c.title) h3.textContent = c.title
          if (p  && c.body)  p.textContent  = c.body
        })
      }
    }
  }

  // Projects heading
  const ps = hp.projectsSection
  if (ps) {
    const sec = document.querySelector('.projects-grid')?.closest('.section')
    if (sec) setSectionHead(sec, ps.label, ps.headingMain, ps.headingAccent)
  }

  // Process
  const pr = hp.process
  if (pr) {
    const sec = document.querySelector('.process-steps')?.closest('.section')
    if (sec) {
      setSectionHead(sec, pr.label, pr.headingMain, pr.headingAccent, pr.subtext)
      if (pr.steps?.length) {
        document.querySelectorAll('.process-step').forEach((step, i) => {
          const s = pr.steps[i]; if (!s) return
          const h3 = step.querySelector('h3'); const p = step.querySelector('p')
          if (h3 && s.title)       h3.textContent = s.title
          if (p  && s.description) p.textContent  = s.description
        })
      }
    }
  }

  // Testimonials heading
  const ts = hp.testimonialsSection
  if (ts) {
    const sec = document.querySelector('.reviews-grid')?.closest('.section')
    if (sec) setSectionHead(sec, ts.label, ts.headingMain, ts.headingAccent, ts.subtext)
  }

  // CTA banner
  applyCta(hp.ctaBanner)

  // Featured projects
  if (projects?.length) {
    const grid = document.querySelector('.projects-grid')
    if (grid) grid.innerHTML = projects.map((p,i) => `
      <div class="project-card ${i===0?'featured':''}" data-reveal ${i>0?`data-reveal-delay="${i}"`:''}> 
        <img src="${imageUrl(p.mainImage?.asset?._id,900)}" alt="${p.mainImage?.alt||p.title}" loading="lazy"/>
        <div class="project-overlay">
          <span class="project-tag">${catLabel(p.category)}</span>
          <h3>${p.title}</h3>
          <p>${p.location||''}</p>
        </div>
      </div>`).join('')
  }

  // Testimonials
  if (testimonials?.length) {
    const grid = document.querySelector('.reviews-grid')
    if (grid) grid.innerHTML = testimonials.slice(0,3).map((t,i) => `
      <div class="review-card" data-reveal data-reveal-delay="${i+1}">
        <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
        <p class="review-text">${t.review}</p>
        <div class="review-author">
          <div class="author-avatar">${t.name.charAt(0)}</div>
          <div><div class="author-name">${t.name}</div><div class="author-location">${t.location||''}</div></div>
        </div>
      </div>`).join('')
  }
}

// ═══════════════════════════════════════════
//  ABOUT PAGE
// ═══════════════════════════════════════════
async function loadAbout() {
  const d = await getAboutPage()
  if (!d) return

  if (d.pageHero) {
    const h1 = document.querySelector('.page-hero h1')
    if (h1) h1.innerHTML = `${d.pageHero.headingMain||'About'} <em style="color:var(--accent)">${d.pageHero.headingAccent||'Mikes Constructions'}</em>`
  }

  const s = d.story
  if (s) {
    const label = document.querySelector('.section-label')
    const title = document.querySelector('.section-title')
    if (label && s.label) label.textContent = s.label
    if (title) title.innerHTML = `${s.headingMain||''} <em>${s.headingAccent||''}</em>`
    const ps = document.querySelectorAll('.about-grid > div:last-child p[style]')
    if (ps[0] && s.paragraph1) ps[0].textContent = s.paragraph1
    if (ps[1] && s.paragraph2) ps[1].textContent = s.paragraph2
    if (ps[2] && s.paragraph3) ps[2].textContent = s.paragraph3
    if (s.yearsExperience) { const b = document.querySelector('.about-experience strong'); if (b) b.textContent = `${s.yearsExperience}+` }
    if (s.mainImage?.asset?._id)  { const img = document.querySelector('.about-img-main');  if (img) { img.src = imageUrl(s.mainImage.asset._id,1200);  img.alt = s.mainImage.alt||'' } }
    if (s.accentImage?.asset?._id){ const img = document.querySelector('.about-img-accent'); if (img) { img.src = imageUrl(s.accentImage.asset._id,800); img.alt = s.accentImage.alt||'' } }
  }

  const c = d.commitment
  if (c) {
    const sec = document.querySelector('.section-light .container > div')
    if (sec) {
      const lbl = sec.querySelector('.section-label')
      const ttl = sec.querySelector('.section-title')
      const ps  = sec.querySelectorAll('p')
      if (lbl && c.label) lbl.textContent = c.label
      if (ttl) ttl.innerHTML = `${c.headingMain||''} <em>${c.headingAccent||''}</em>`
      if (ps[0] && c.paragraph1) ps[0].textContent = c.paragraph1
      if (ps[1] && c.paragraph2) ps[1].textContent = c.paragraph2
    }
  }

  const wc = d.whyChoose
  if (wc) {
    const sec = document.querySelector('.why-grid')?.closest('.section')
    if (sec) {
      setSectionHead(sec, wc.label, wc.headingMain, wc.headingAccent)
      if (wc.reasons?.length) {
        document.querySelectorAll('.why-card').forEach((card, i) => {
          const r = wc.reasons[i]; if (!r) return
          const h3 = card.querySelector('h3'); const p = card.querySelector('p')
          if (h3 && r.title) h3.textContent = r.title
          if (p  && r.body)  p.textContent  = r.body
        })
      }
    }
  }

  const ft = d.featuredTestimonial
  if (ft) {
    const quoteEl = document.querySelector('.section .container > div > div p[style*="17px"]')
    const nameEl  = document.querySelector('.section .container > div > div div[style*="font-weight:700"]')
    const locEl   = document.querySelector('.section .container > div > div div[style*="color:var(--grey)"]')
    if (quoteEl && ft.quote) quoteEl.textContent = ft.quote
    if (nameEl  && ft.name)  nameEl.textContent  = ft.name
    if (locEl   && ft.location) locEl.textContent = ft.location
  }

  applyCta(d.ctaBanner)
}

// ═══════════════════════════════════════════
//  SERVICES PAGE
// ═══════════════════════════════════════════
// FIX: Now fetches services from the 'service' document collection via
// getServices() rather than the deprecated inline array inside the
// servicesPage singleton. The page-level fields (hero, intro, CTA) still
// come from getServicesPage(). If Sanity has no service documents yet,
// the static HTML service sections remain visible as a fallback.
async function loadServices() {
  const [d, services] = await Promise.all([ getServicesPage(), getServices() ])

  if (d?.pageHero) {
    const h1 = document.querySelector('.page-hero h1')
    if (h1) h1.innerHTML = `${d.pageHero.headingMain||'Our'} <em style="color:var(--accent)">${d.pageHero.headingAccent||'Services'}</em>`
  }

  if (d?.introText) {
    const p = document.querySelector('.section-sm p[data-reveal]')
    if (p) p.textContent = d.introText
  }

  // Only replace service sections if Sanity has service documents.
  // If the collection is empty we leave the static HTML intact so the page
  // never appears broken while Mike is populating the CMS.
  if (services?.length) {
    const sections = document.querySelectorAll('.about-grid')
    services.forEach((s, i) => {
      const grid = sections[i]
      if (!grid) return
      const iconEl = grid.querySelector('.service-icon')
      const lbl    = grid.querySelector('.section-label')
      const title  = grid.querySelector('.section-title')
      const ps     = grid.querySelectorAll('p[style]')
      const imgs   = grid.querySelectorAll('img')
      if (iconEl && s.icon)         iconEl.textContent  = s.icon
      if (lbl)                      lbl.textContent     = `Service ${String(s.order || i + 1).padStart(2, '0')}`
      if (title)                    title.innerHTML     = `${s.headingMain||''} <em>${s.headingAccent||''}</em>`
      if (ps[0] && s.paragraph1)    ps[0].textContent   = s.paragraph1
      if (ps[1] && s.paragraph2)    ps[1].textContent   = s.paragraph2
      if (s.mainImage?.asset?._id   && imgs[0]) { imgs[0].src = imageUrl(s.mainImage.asset._id,1200);  imgs[0].alt = s.mainImage.alt||'' }
      if (s.accentImage?.asset?._id && imgs[1]) { imgs[1].src = imageUrl(s.accentImage.asset._id,800); imgs[1].alt = s.accentImage.alt||'' }
    })
  }

  if (d?.ctaBanner) applyCta(d.ctaBanner)
}

// ═══════════════════════════════════════════
//  PROJECTS PAGE
// ═══════════════════════════════════════════
async function loadProjects() {
  const [d, projects] = await Promise.all([ getProjectsPage(), getProjects() ])

  if (d?.pageHero) {
    const h1 = document.querySelector('.page-hero h1')
    if (h1) h1.innerHTML = `${d.pageHero.headingMain||'Our Recent'} <em style="color:var(--accent)">${d.pageHero.headingAccent||'Projects'}</em>`
  }

  if (projects?.length) {
    const grid = document.querySelector('.gallery-grid')
    if (grid) {
      grid.innerHTML = projects.map((p, i) => `
        <div class="gallery-item" data-category="${p.category||'renovation'}" data-reveal data-reveal-delay="${(i%3)+1}">
          <img src="${imageUrl(p.mainImage?.asset?._id,800)}" alt="${p.mainImage?.alt||p.title}" loading="lazy"/>
          <div class="gallery-caption">
            <div>
              <div class="project-tag" style="margin:0 auto 8px;display:inline-block">${catLabel(p.category)}</div>
              <p>${p.title}${p.location?' — '+p.location:''}</p>
              ${p.status==='ongoing'?'<p style="color:var(--accent);font-size:11px;margin-top:4px">🔨 Ongoing</p>':''}
            </div>
          </div>
        </div>`).join('')

      const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      grid.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
    }
  }

  if (d?.ctaBanner) {
    setText('.cta-banner h2', d.ctaBanner.heading)
    setText('.cta-banner p',  d.ctaBanner.subtext)
    setText('.cta-banner .btn-primary', d.ctaBanner.buttonText)
  }
}

// ═══════════════════════════════════════════
//  CONTACT PAGE
// ═══════════════════════════════════════════
async function loadContact() {
  const d = await getContactPage()
  if (!d) return

  if (d.pageHero) {
    const h1 = document.querySelector('.page-hero h1')
    if (h1) h1.innerHTML = `${d.pageHero.headingMain||'Get in'} <em style="color:var(--accent)">${d.pageHero.headingAccent||'Touch'}</em>`
  }

  const intro = d.intro
  if (intro) {
    const lbl = document.querySelector('.contact-grid .section-label')
    const ttl = document.querySelector('.contact-grid .section-title')
    const p   = document.querySelector('.contact-grid > div > p[style*="margin-bottom:40px"]')
    if (lbl && intro.label) lbl.textContent = intro.label
    if (ttl) ttl.innerHTML = `${intro.headingMain||''} <em>${intro.headingAccent||''}</em>`
    if (p && intro.paragraph) p.textContent = intro.paragraph
  }

  const cd = d.contactDetails
  if (cd) {
    const items = document.querySelectorAll('.contact-info-item span')
    if (items[0] && cd.serviceArea)   items[0].innerHTML = cd.serviceArea
    if (items[1] && cd.email)         items[1].textContent = cd.email
    if (items[2] && cd.workingHours)  items[2].innerHTML = `${cd.workingHours}${cd.workingHours2?'<br>'+cd.workingHours2:''}`
  }

  if (d.nextSteps?.length) {
    const ol = document.querySelector('.contact-grid ol')
    if (ol) ol.innerHTML = d.nextSteps.map(step => `<li style="margin-bottom:0">${step}</li>`).join('')
  }

  if (d.locationsSection) {
    const sec = document.querySelector('.locations-grid')?.closest('.section')
    if (sec) setSectionHead(sec, d.locationsSection.label, d.locationsSection.headingMain, d.locationsSection.headingAccent, d.locationsSection.subtext)
  }

  if (d.locations?.length) {
    const grid = document.querySelector('.locations-grid')
    if (grid) grid.innerHTML = d.locations.map((loc, i) => `
      <div class="location-card" data-reveal data-reveal-delay="${(i%3)+1}">
        <div class="location-icon">${loc.icon||'🏘'}</div>
        <h3>${loc.title||''}</h3>
        <p>${loc.description||''}</p>
      </div>`).join('')
  }
}

// ═══════════════════════════════════════════
//  FAQ PAGE
// ═══════════════════════════════════════════
async function loadFaq() {
  const d = await getFaqPage()
  if (!d) return

  if (d.pageHero) {
    const h1 = document.querySelector('.page-hero h1')
    if (h1) h1.innerHTML = `${d.pageHero.headingMain||'Frequently Asked'} <em style="color:var(--accent)">${d.pageHero.headingAccent||'Questions'}</em>`
  }

  if (d.sideLabel)          setText('.section .section-label', d.sideLabel)
  if (d.sideHeadingMain || d.sideHeadingAccent) {
    const ttl = document.querySelector('.section .section-title')
    if (ttl) ttl.innerHTML = `${d.sideHeadingMain||''} <em>${d.sideHeadingAccent||''}</em>`
  }
  if (d.sideParagraph) {
    const p = document.querySelector('.section [data-reveal] > p[style]')
    if (p) p.textContent = d.sideParagraph
  }

  if (d.faqs?.length) {
    const list = document.querySelector('.faq-list')
    if (list) {
      list.innerHTML = d.faqs.map((faq, i) => `
        <div class="faq-item ${i===0?'open':''}">
          <div class="faq-question">
            <h3>${faq.question}</h3>
            <div class="faq-toggle">${i===0?'−':'+'}</div>
          </div>
          <div class="faq-answer"><p>${faq.answer}</p></div>
        </div>`).join('')
      // No need to re-bind click handlers — main.js uses document-level
      // event delegation which covers dynamically injected items.
    }
  }

  if (d.ctaBanner) {
    setText('.cta-banner h2', d.ctaBanner.heading)
    setText('.cta-banner p',  d.ctaBanner.subtext)
    setText('.cta-banner .btn-primary', d.ctaBanner.buttonText)
  }
}

// ═══════════════════════════════════════════
//  BLOG PAGE
// ═══════════════════════════════════════════
async function loadBlog() {
  const posts = await getPosts(12)
  if (!posts?.length) return
  const grid = document.querySelector('.blog-grid')
  if (!grid) return
  grid.innerHTML = posts.map((p, i) => `
    <div class="blog-card" data-reveal data-reveal-delay="${(i%3)+1}">
      <div class="blog-img">
        <img src="${imageUrl(p.coverImage?.asset?._id,600)}" alt="${p.coverImage?.alt||p.title}" loading="lazy"/>
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-tag">${p.category||'News'}</span>
          <span class="blog-date">${fmtDate(p.publishedAt)}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt||''}</p>
        <a href="post.html?slug=${p.slug?.current}" class="blog-read">Read More →</a>
      </div>
    </div>`).join('')
}

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════
function setText(sel, text) { const el = document.querySelector(sel); if (el && text) el.textContent = text }

function setSectionHead(sec, label, main, accent, sub) {
  const lbl    = sec.querySelector('.section-label')
  const ttl    = sec.querySelector('.section-title')
  const sub_el = sec.querySelector('.section-sub')
  if (lbl && label)          lbl.textContent = label
  if (ttl && (main||accent)) ttl.innerHTML   = `${main||''} <em>${accent||''}</em>`
  if (sub_el && sub)         sub_el.textContent = sub
}

function applyCta(cta) {
  if (!cta) return
  if (cta.heading)             setText('.cta-banner h2', cta.heading)
  if (cta.subtext)             setText('.cta-banner > .container > p', cta.subtext)
  if (cta.primaryButtonText)   setText('.cta-banner .btn-primary', cta.primaryButtonText)
  if (cta.secondaryButtonText) setText('.cta-banner .btn-outline',  cta.secondaryButtonText)
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function catLabel(cat) {
  return { renovation:'Full Renovation', bathroom:'Bathroom', kitchen:'Kitchen', structural:'Structural', loft:'Loft / Basement', commercial:'Commercial', tiling:'Tiling', electrical:'Electrical', plumbing:'Plumbing' }[cat] || cat || 'Project'
}