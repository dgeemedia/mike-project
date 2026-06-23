// =============================================
//   mikes-site/js/careers-content.js
//   Loads career page content and job listings from Sanity
//   and renders them into careers.html
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

function getCareerPage() {
  return sanityFetch(
    `*[_type=="careerPage"&&_id=="careerPage"][0]{
      pageHero{headingMain,headingAccent,subtext},
      intro{label,headingMain,headingAccent,paragraph},
      perks[]{icon,title,description},
      jobListings[status=="active"]{
        title,location,employmentType,status,trades,
        workingHours{days,startTime,endTime,lunchBreak},
        requirements,description,applyUrl,applyButtonText,publishedAt
      },
      ctaBanner{heading,subtext,primaryButtonText,primaryButtonUrl}
    }`
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderJobCard(job) {
  const trades    = job.trades?.length
    ? `<ul class="trades-list">${job.trades.map(t => `<li>${escHtml(t)}</li>`).join('')}</ul>`
    : ''

  const requirements = job.requirements?.length
    ? `<ul class="requirements-list">${job.requirements.map(r => `<li>${escHtml(r)}</li>`).join('')}</ul>`
    : ''

  const wh = job.workingHours
  const hoursBox = wh
    ? `<div class="hours-box">
         <strong>${escHtml(wh.days)}</strong>
         <p>${escHtml(wh.startTime)} – ${escHtml(wh.endTime)}<br>${escHtml(wh.lunchBreak)}</p>
       </div>`
    : ''

  const applyUrl  = escHtml(job.applyUrl || 'contact.html')
  const applyText = escHtml(job.applyButtonText || 'Apply Now')

  return `
    <div class="job-card" data-reveal>
      <div class="job-card-header">
        <div>
          <h2>${escHtml(job.title)}</h2>
          <div class="job-meta-tags">
            <span class="job-tag active">✅ Now Hiring</span>
            ${job.location       ? `<span class="job-tag">📍 ${escHtml(job.location)}</span>` : ''}
            ${job.employmentType ? `<span class="job-tag">🔄 ${escHtml(job.employmentType)}</span>` : ''}
            ${wh ? `<span class="job-tag">⏰ ${escHtml(wh.days)}, ${escHtml(wh.startTime)}–${escHtml(wh.endTime)}</span>` : ''}
          </div>
        </div>
        <div class="job-apply-header">
          <a href="${applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${applyText}</a>
        </div>
      </div>

      <div class="job-card-body">
        ${trades ? `<div>
          <p class="job-section-title">Trades We're Seeking</p>
          ${trades}
        </div>` : '<div></div>'}

        <div style="display:flex;flex-direction:column;gap:28px">
          ${requirements ? `<div>
            <p class="job-section-title">Requirements</p>
            ${requirements}
          </div>` : ''}

          ${hoursBox ? `<div>
            <p class="job-section-title">Working Hours</p>
            ${hoursBox}
          </div>` : ''}

          ${job.description ? `<div>
            <p class="job-section-title">About the Role</p>
            <p style="font-size:14px;color:var(--grey);line-height:1.7;margin:0">${escHtml(job.description)}</p>
          </div>` : ''}
        </div>
      </div>

      <div class="job-card-footer">
        ${job.publishedAt ? `<span class="job-date">📅 Posted ${fmtDate(job.publishedAt)}</span>` : '<span></span>'}
        <a href="${applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-dark">Fill in Application Form →</a>
      </div>
    </div>`
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const d = await getCareerPage()
    if (!d) return // fall through to static HTML

    // ── Hero ──
    if (d.pageHero) {
      const h1 = document.getElementById('careers-hero-heading')
      if (h1) h1.innerHTML = `${escHtml(d.pageHero.headingMain || 'Join Our')} <em style="color:var(--accent)">${escHtml(d.pageHero.headingAccent || 'Team')}</em>`
      const sub = document.getElementById('careers-hero-sub')
      if (sub && d.pageHero.subtext) sub.textContent = d.pageHero.subtext
    }

    // ── Intro ──
    if (d.intro) {
      const lbl = document.getElementById('careers-intro-label')
      const ttl = document.getElementById('careers-intro-heading')
      const par = document.getElementById('careers-intro-paragraph')
      if (lbl && d.intro.label)       lbl.textContent = d.intro.label
      if (ttl) ttl.innerHTML = `${escHtml(d.intro.headingMain || 'Build Your')} <em>${escHtml(d.intro.headingAccent || 'Career With Us')}</em>`
      if (par && d.intro.paragraph)   par.textContent = d.intro.paragraph
    }

    // ── Perks ──
    if (d.perks?.length) {
      const grid = document.getElementById('perks-grid')
      if (grid) {
        grid.innerHTML = d.perks.map((p, i) => `
          <div class="perk-card" data-reveal data-reveal-delay="${i + 1}">
            <span class="perk-icon">${escHtml(p.icon || '🏗')}</span>
            <h3>${escHtml(p.title || '')}</h3>
            <p>${escHtml(p.description || '')}</p>
          </div>`).join('')
      }
    }

    // ── Job listings (active only) ──
    if (d.jobListings?.length) {
      const stack = document.getElementById('jobs-stack')
      if (stack) {
        stack.innerHTML = d.jobListings.map(renderJobCard).join('')

        // Trigger scroll reveal on dynamically injected cards
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
          })
        }, { threshold: 0.1 })
        stack.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
      }
    } else if (d.jobListings !== undefined) {
      // Sanity returned an empty array — show "no listings" state
      const stack = document.getElementById('jobs-stack')
      if (stack) {
        stack.innerHTML = `
          <div class="no-listings">
            <h3>No Active Vacancies Right Now</h3>
            <p>We don't have any open positions at the moment, but we're always keen to hear from skilled tradespeople.</p>
            <a href="contact.html" class="btn btn-dark">Get in Touch</a>
          </div>`
      }
    }

    // ── CTA Banner ──
    if (d.ctaBanner) {
      const cta = document.getElementById('careers-cta')
      if (cta) {
        const h2  = cta.querySelector('h2')
        const p   = cta.querySelector('p')
        const btn = document.getElementById('careers-cta-btn')
        if (h2  && d.ctaBanner.heading)           h2.textContent  = d.ctaBanner.heading
        if (p   && d.ctaBanner.subtext)           p.textContent   = d.ctaBanner.subtext
        if (btn && d.ctaBanner.primaryButtonText) btn.textContent = d.ctaBanner.primaryButtonText
        if (btn && d.ctaBanner.primaryButtonUrl)  btn.href        = d.ctaBanner.primaryButtonUrl
      }
    }

  } catch (err) {
    console.warn('careers-content.js: Sanity fetch failed, using static fallback.', err)
    // Static HTML in careers.html already serves as the fallback — no action needed.
  }
})