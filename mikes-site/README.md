# Mikes Constructions Group Ltd — Website

A professional multi-page construction website built from scratch.

---

## Pages Included

- `index.html` — Homepage (hero, stats, about, services, projects, reviews, process, CTA)
- `about.html` — About Us
- `services.html` — All Services
- `projects.html` — Project Portfolio / Gallery
- `faq.html` — FAQ Accordion
- `blog.html` — News & Tips (6 starter posts)
- `contact.html` — Contact Form + Locations
- `privacy.html` — Privacy Policy

---

## How to Go Live on Vercel (Free — Takes 5 Minutes)

### Step 1 — Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2 — Upload the Site to GitHub
1. Click the **+** button (top right) → **New repository**
2. Name it: `mikes-constructions`
3. Set it to **Public**
4. Click **Create repository**
5. Click **uploading an existing file**
6. Drag and drop ALL the files from this zip (keep folder structure: css/, js/, etc.)
7. Click **Commit changes**

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account (free)
2. Click **Add New → Project**
3. Select your `mikes-constructions` repository
4. Click **Deploy** — no settings to change

✅ Your site will be live in about 30 seconds at a URL like:
`https://mikes-constructions.vercel.app`

---

## How to Connect a Custom Domain (mikes-constructions.co.uk)

Once deployed on Vercel:
1. Go to your project → **Settings → Domains**
2. Type in `mikes-constructions.co.uk` and click **Add**
3. Vercel will give you DNS records (A record and CNAME)
4. Log into wherever the domain is registered (GoDaddy, Namecheap, etc.)
5. Go to DNS settings and add those records
6. Wait 10–30 minutes for it to go live

---

## Customisation Checklist (Before Going Live)

- [ ] Replace placeholder email (`info@mikes-constructions.co.uk`) with the real one
- [ ] Replace placeholder phone number in footer with real number
- [ ] Add real social media links (Facebook, Instagram, LinkedIn) in `js/nav.js`
- [ ] Add Google Analytics tag (paste inside `<head>` on each page)
- [ ] Connect contact form to a real backend (use Formspree.io — free, paste action URL into the form)
- [ ] Add favicon: save logo as `images/favicon.png`
- [ ] Add Google Search Console once live

---

## Connect the Contact Form (Formspree — Free)

1. Go to https://formspree.io and sign up
2. Create a new form — copy your form endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`)
3. Open `contact.html`
4. Find `<form id="contact-form">` and change it to:
   `<form id="contact-form" action="https://formspree.io/f/xxxxxxxx" method="POST">`
5. Remove the `e.preventDefault()` line from `js/main.js` contact form section

---

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript — no frameworks, no dependencies
- Google Fonts (Playfair Display + Raleway)
- Fully responsive (mobile, tablet, desktop)
- SEO meta tags on every page
- Scroll reveal animations
- Animated stat counters
- FAQ accordion
- Mobile hamburger menu

---

Built for Mikes Constructions Group Ltd © 2026
