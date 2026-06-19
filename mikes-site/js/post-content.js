// =============================================
//   mikes-site/js/post-content.js
//   Loads a single blog post by slug from Sanity
//   and renders it into post.html
// =============================================

import { imageUrl } from './sanity.js'

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

// Fetch a single post by slug
function getPost(slug) {
  return sanityFetch(
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
}

// Fetch up to 3 related posts (same category, excluding current)
function getRelatedPosts(category, excludeSlug) {
  const catFilter = category ? `&&category=="${category}"` : ''
  return sanityFetch(
    `*[_type=="post"&&status=="published"&&slug.current!="${excludeSlug}"${catFilter}]|order(publishedAt desc)[0...3]{
      _id,title,slug,category,excerpt,publishedAt,coverImage{asset->{_id},alt}
    }`
  )
}

// ── Portable Text renderer ──
// Sanity's portable text is an array of block objects.
// We render the subset used in this site's post schema.
function renderPortableText(blocks) {
  if (!blocks?.length) return ''

  return blocks.map(block => {

    // Embedded images
    if (block._type === 'image') {
      const src = block.asset?._id ? imageUrl(block.asset._id, 1200) : ''
      const alt = block.alt || ''
      const caption = block.caption || ''
      if (!src) return ''
      return `
        <figure>
          <img src="${src}" alt="${escHtml(alt)}" loading="lazy" />
          ${caption ? `<figcaption>${escHtml(caption)}</figcaption>` : ''}
        </figure>`
    }

    // Standard block (paragraph, headings, lists, blockquote)
    if (block._type !== 'block') return ''

    const style   = block.style || 'normal'
    const content = renderSpans(block.children || [], block.markDefs || [])

    if (block.listItem === 'bullet') return `<li>${content}</li>`
    if (block.listItem === 'number') return `<li>${content}</li>`

    switch (style) {
      case 'h1':         return `<h1>${content}</h1>`
      case 'h2':         return `<h2>${content}</h2>`
      case 'h3':         return `<h3>${content}</h3>`
      case 'h4':         return `<h4>${content}</h4>`
      case 'blockquote': return `<blockquote>${content}</blockquote>`
      default:           return content ? `<p>${content}</p>` : ''
    }

  })
  // Wrap consecutive list items in <ul> or <ol>
  .reduce((acc, html, i, arr) => {
    const block = blocks[i]
    const prev  = blocks[i - 1]
    const next  = blocks[i + 1]

    if (block.listItem === 'bullet') {
      if (prev?.listItem !== 'bullet') acc += '<ul>'
      acc += html
      if (next?.listItem !== 'bullet') acc += '</ul>'
      return acc
    }
    if (block.listItem === 'number') {
      if (prev?.listItem !== 'number') acc += '<ol>'
      acc += html
      if (next?.listItem !== 'number') acc += '</ol>'
      return acc
    }
    return acc + html
  }, '')
}

function renderSpans(children, markDefs) {
  return children.map(span => {
    if (span._type !== 'span') return ''
    let text = escHtml(span.text || '')
    const marks = span.marks || []

    marks.forEach(mark => {
      // Decorator marks
      if (mark === 'strong')    { text = `<strong>${text}</strong>`; return }
      if (mark === 'em')        { text = `<em>${text}</em>`;         return }
      if (mark === 'underline') { text = `<u>${text}</u>`;           return }
      if (mark === 'code')      { text = `<code>${text}</code>`;     return }

      // Annotation marks (links)
      const def = markDefs.find(d => d._key === mark)
      if (def?._type === 'link') {
        const href   = escHtml(def.href || '#')
        const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : ''
        text = `<a href="${href}"${target}>${text}</a>`
      }
    })

    return text
  }).join('')
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function catLabel(cat) {
  return {
    tips: 'Tips & Advice', bathroom: 'Bathroom', kitchen: 'Kitchen',
    conversions: 'Conversions', news: 'News', company: 'Company Update'
  }[cat] || cat || 'News'
}

// ── Main ──
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(location.search)
  const slug   = params.get('slug')

  if (!slug) {
    showNotFound()
    return
  }

  try {
    const post = await getPost(slug)

    if (!post) {
      showNotFound()
      return
    }

    renderPost(post)

    // Load related posts in the background
    const related = await getRelatedPosts(post.category, slug)
    if (related?.length) renderRelated(related)

  } catch (err) {
    console.error('post-content.js:', err)
    showNotFound()
  }
})

function renderPost(post) {
  // ── Update <head> SEO meta ──
  const title = post.seoTitle || post.title
  const desc  = post.seoDescription || post.excerpt || ''
  const cover = post.coverImage?.asset?._id ? imageUrl(post.coverImage.asset._id, 1200) : 'https://mikes-constructions.co.uk/images/og-image.jpg'
  const url   = `https://mikes-constructions.co.uk/post.html?slug=${post.slug?.current}`

  document.title = `${title} | Mikes Constructions Group Ltd`
  setMeta('description', desc)
  setById('canonical-tag',  'href',    url)
  setById('og-url',         'content', url)
  setById('og-title',       'content', title)
  setById('og-desc',        'content', desc)
  setById('og-image',       'content', cover)
  setById('tw-title',       'content', title)
  setById('tw-desc',        'content', desc)
  setById('tw-image',       'content', cover)

  // ── Replace hero skeleton with real post hero ──
  const heroWrapper = document.getElementById('post-hero-wrapper')
  if (heroWrapper) {
    const coverSrc = post.coverImage?.asset?._id ? imageUrl(post.coverImage.asset._id, 1400) : ''
    heroWrapper.innerHTML = coverSrc
      ? `
        <div class="post-hero">
          <img src="${escHtml(coverSrc)}" alt="${escHtml(post.coverImage?.alt || post.title)}" />
          <div class="post-hero-overlay">
            <div class="container">
              <a href="blog.html" class="post-back">← Back to News &amp; Tips</a>
              <div class="post-meta">
                <span class="blog-tag">${escHtml(catLabel(post.category))}</span>
                <span style="color:rgba(255,255,255,0.6);font-size:14px">${escHtml(fmtDate(post.publishedAt))}</span>
                ${post.author ? `<span style="color:rgba(255,255,255,0.6);font-size:14px">By ${escHtml(post.author)}</span>` : ''}
              </div>
              <h1 style="color:#fff;font-size:clamp(26px,4vw,44px);max-width:800px;line-height:1.2">${escHtml(post.title)}</h1>
            </div>
          </div>
        </div>`
      : `
        <section class="page-hero">
          <div class="container">
            <div class="breadcrumb">
              <a href="index.html">Home</a><span>/</span>
              <a href="blog.html">News &amp; Tips</a><span>/</span>
              <span>${escHtml(catLabel(post.category))}</span>
            </div>
            <h1>${escHtml(post.title)}</h1>
          </div>
        </section>`
  }

  // ── Render body ──
  const bodyEl   = document.getElementById('post-content')
  const loadEl   = document.getElementById('post-loading')
  if (loadEl) loadEl.style.display = 'none'

  if (bodyEl) {
    bodyEl.style.display = ''
    const rendered = post.body?.length
      ? renderPortableText(post.body)
      : `<p>${escHtml(post.excerpt || '')}</p>`
    bodyEl.innerHTML = rendered
  }

  // ── Update breadcrumb in page-hero fallback (no cover image case) ──
  const breadcrumbLast = document.querySelector('.breadcrumb span:last-child')
  if (breadcrumbLast && breadcrumbLast.textContent === 'Loading…') {
    breadcrumbLast.textContent = post.title
  }
}

function renderRelated(posts) {
  const section = document.getElementById('related-section')
  const grid    = document.getElementById('related-grid')
  if (!section || !grid) return

  grid.innerHTML = posts.map(p => {
    const cover = p.coverImage?.asset?._id ? imageUrl(p.coverImage.asset._id, 600) : ''
    return `
      <div class="blog-card" data-reveal>
        ${cover ? `<div class="blog-img"><img src="${escHtml(cover)}" alt="${escHtml(p.coverImage?.alt||p.title)}" loading="lazy"/></div>` : ''}
        <div class="blog-body">
          <div class="blog-meta">
            <span class="blog-tag">${escHtml(catLabel(p.category))}</span>
            <span class="blog-date">${escHtml(fmtDate(p.publishedAt))}</span>
          </div>
          <h3>${escHtml(p.title)}</h3>
          <p>${escHtml(p.excerpt || '')}</p>
          <a href="post.html?slug=${escHtml(p.slug?.current)}" class="blog-read">Read More →</a>
        </div>
      </div>`
  }).join('')

  section.style.display = ''

  // Trigger reveal animations on related cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
    })
  }, { threshold: 0.1 })
  grid.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
}

function showNotFound() {
  const loadEl    = document.getElementById('post-loading')
  const notFound  = document.getElementById('post-not-found')
  const skeletonH = document.getElementById('post-hero-skeleton')
  if (loadEl)   loadEl.style.display   = 'none'
  if (notFound) notFound.style.display = ''
  if (skeletonH) {
    skeletonH.querySelector('h1').textContent = 'Post Not Found'
    const breadcrumbSpan = skeletonH.querySelector('.breadcrumb span')
    if (breadcrumbSpan) breadcrumbSpan.textContent = 'Not Found'
  }
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

function setById(id, attr, value) {
  const el = document.getElementById(id)
  if (el) el.setAttribute(attr, value)
}