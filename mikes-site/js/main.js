// =============================================
//   mikes-site/js/main.js — main JS file for Mikes Constructions Group Ltd website
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
  // Uses event delegation so it works for both static HTML items AND items
  // dynamically injected by content.js after DOMContentLoaded.
  //
  // FIX (v2): The toggle element (div.faq-toggle) now syncs its text content
  // to '+' (closed) or '−' (open) whenever an item is opened or closed.
  // Previously the symbol never changed, leaving all toggles showing '+' even
  // when an item was visibly expanded.
  //
  // FIX (v2): On initial load, any .faq-item that already has class 'open'
  // (the first static item on faq.html) now has its toggle set to '−' so the
  // symbol matches the expanded state from the start.

  // Sync toggle symbol for items that start open in the HTML
  document.querySelectorAll('.faq-item.open .faq-toggle').forEach(toggle => {
    toggle.textContent = '−';
  });

  document.addEventListener('click', e => {
    const question = e.target.closest('.faq-question');
    if (!question) return;
    const item = question.closest('.faq-item');
    if (!item) return;

    const isOpen = item.classList.contains('open');

    // Close all items and reset their toggles to '+'
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const t = i.querySelector('.faq-toggle');
      if (t) t.textContent = '+';
    });

    // Open the clicked item (if it was closed) and set its toggle to '−'
    if (!isOpen) {
      item.classList.add('open');
      const toggle = item.querySelector('.faq-toggle');
      if (toggle) toggle.textContent = '−';
    }
  });

  // ── Contact form — Formspree integration ──
  const form = document.getElementById('contact-form');
  if (form) {
    if (window.location.search.includes('sent=true')) {
      const msg = document.getElementById('form-success');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

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
  // Exported as window.runStatsCounters() so content.js can re-run it after
  // Sanity data has updated the data-count values on stat elements.
  window.runStatsCounters = function () {
    const statNums = document.querySelectorAll('.stat-number[data-count]');
    if (!statNums.length) return;

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

    statNums.forEach(n => {
      // Reset text so counter animates fresh after Sanity data update
      const prefix = n.dataset.prefix || '';
      const suffix = n.dataset.suffix || '';
      n.textContent = prefix + '0' + suffix;
      countObs.observe(n);
    });
  };

  // Run immediately for any static stat numbers already in the DOM
  window.runStatsCounters();

  // ── Project filter tabs ──
  const filterTabs = document.querySelectorAll('.filter-btn');
  if (filterTabs.length) {
    filterTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button styling
        filterTabs.forEach(b => {
          b.classList.remove('active', 'btn-dark');
          b.style.background = 'var(--light)';
          b.style.color = 'var(--text)';
          b.style.border = '1px solid var(--border)';
        });
        btn.classList.add('active', 'btn-dark');
        btn.style.background = '';
        btn.style.color = '';
        btn.style.border = '';

        const filter = btn.dataset.filter;
        const items  = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
          const cat = item.dataset.category || '';
          const show = filter === 'all' || cat === filter;

          if (show) {
            item.style.display = '';
            // Re-trigger reveal animation for items coming back into view
            item.classList.remove('revealed');
            setTimeout(() => {
              const revealObs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                  if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
                });
              }, { threshold: 0.1 });
              revealObs.observe(item);
            }, 10);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

});