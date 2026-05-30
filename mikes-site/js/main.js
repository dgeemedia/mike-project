// =============================================
//   MIKES CONSTRUCTIONS — Main JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero badge tap to reveal (mobile) ──
  const badgeItems = document.querySelectorAll('.badge-item');
  badgeItems.forEach(badge => {
    badge.addEventListener('click', () => {
      const isActive = badge.classList.contains('active');
      badgeItems.forEach(b => b.classList.remove('active'));
      if (!isActive) badge.classList.add('active');
    });
  });
  // Close tooltip when tapping outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.badge-item')) {
      badgeItems.forEach(b => b.classList.remove('active'));
    }
  });

  // ── Navbar scroll behaviour ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Mobile menu — fullscreen overlay ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      document.body.classList.toggle('menu-open', !isOpen);
    });

    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('menu-open');
      })
    );
  }

  // ── Active nav link ──
  const currentPage = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Contact form — Formspree integration ──
  const form = document.getElementById('contact-form');
  if (form) {
    // Show success message if redirected back after Formspree submission
    if (window.location.search.includes('sent=true')) {
      const msg = document.getElementById('form-success');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Handle form submit with fetch (no page reload)
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const msg = document.getElementById('form-success');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const data = new FormData(form);
        const res  = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          btn.textContent = 'Send Message';
          btn.disabled = false;
          if (msg) {
            msg.style.display = 'block';
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => msg.style.display = 'none', 6000);
          }
        } else {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          alert('Sorry, something went wrong. Please email us directly at enquiry@mikes-constructions.co.uk');
        }
      } catch (err) {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        alert('Sorry, something went wrong. Please email us directly at enquiry@mikes-constructions.co.uk');
      }
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Stats counter animation ──
  const statNums = document.querySelectorAll('.stat-number[data-count]');
  if (statNums.length) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let start = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          start = Math.min(start + step, target);
          el.innerHTML = prefix + start + suffix;
          if (start >= target) clearInterval(interval);
        }, 30);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(n => countObs.observe(n));
  }

});
