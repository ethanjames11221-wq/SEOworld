(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); document.body.classList.remove('menu-open');
    }));
  }
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .14 });
    reveal.forEach(el => observer.observe(el));
  } else reveal.forEach(el => el.classList.add('is-visible'));
  const clearSpace = document.querySelector('[data-clear-space]');
  if (clearSpace) clearSpace.addEventListener('click', () => {
    const active = clearSpace.getAttribute('aria-pressed') === 'true';
    clearSpace.setAttribute('aria-pressed', String(!active));
    clearSpace.innerHTML = active ? 'CLEAR<br>SPACE<br><span>→</span>' : 'SPACE<br>MADE<br><span>✓</span>';
    document.querySelector('.hero-visual')?.classList.toggle('space-cleared', !active);
  });
})();
