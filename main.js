// ============================================================
// NAV ACTIVE STATE — based on current filename
// ============================================================
(function () {
  const path        = window.location.pathname;
  const currentFile = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    // Case study detail pages → highlight "Case Studies"
    if (currentFile.startsWith('case-study-') && href === 'case-studies.html') {
      a.classList.add('active');
    } else if (href === currentFile) {
      a.classList.add('active');
    }
  });
})();

// ============================================================
// SCROLL REVEALS
// ============================================================
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// FLOATING ORB CANVAS (home page hero only)
// ============================================================
(function () {
  const canvas = document.querySelector('.hero__canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const PALETTE = [
    [157, 252, 195],   // mint green
    [165, 200, 251],   // periwinkle
    [202, 185, 245],   // lavender
  ];

  let orbs = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Orb {
    constructor() {
      this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.r     = Math.random() * 220 + 100;
      this.vx    = (Math.random() - 0.5) * 0.22;
      this.vy    = (Math.random() - 0.5) * 0.22;
      this.phase = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 0.004 + 0.002;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.phase += this.speed;
      if (this.x < -this.r) this.x = canvas.width  + this.r;
      if (this.x > canvas.width  + this.r) this.x = -this.r;
      if (this.y < -this.r) this.y = canvas.height + this.r;
      if (this.y > canvas.height + this.r) this.y = -this.r;
    }

    draw() {
      const alpha = (Math.sin(this.phase) * 0.5 + 0.5) * 0.07 + 0.02;
      const grad  = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      grad.addColorStop(0, `rgba(${this.color.join(',')}, ${alpha})`);
      grad.addColorStop(1, `rgba(${this.color.join(',')}, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  function init() { orbs = Array.from({ length: 7 }, () => new Orb()); }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    orbs.forEach(o => { o.update(); o.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  resize();
  init();
  animate();
})();

// ============================================================
// TYPEWRITER — hero eyebrow
// ============================================================
(function () {
  const el = document.querySelector('[data-tw]');
  if (!el) return;

  const text    = el.dataset.tw;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) { el.textContent = text; return; }

  let i = 0;
  setTimeout(function tick() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 58);
  }, 420);
})();

// ============================================================
// MOBILE NAV — hamburger toggle
// ============================================================
(function () {
  const nav       = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ============================================================
// RESUME PRINT BUTTON
// ============================================================
const printBtn = document.querySelector('.btn--print');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}
