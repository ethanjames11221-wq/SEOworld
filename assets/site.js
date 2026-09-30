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
  const heroVisual = document.querySelector('.hero-visual');
  if (clearSpace) {
    // Keep the button's state and its announcement in sync without relying on
    // hover or pointer events (native button activation also covers keyboard).
    const status = document.createElement('span');
    status.className = 'motion-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    clearSpace.insertAdjacentElement('afterend', status);

    const setClearState = (cleared, announce = true) => {
      clearSpace.setAttribute('aria-pressed', String(cleared));
      clearSpace.innerHTML = cleared ? 'SPACE<br>MADE<br><span aria-hidden="true">✓</span>' : 'CLEAR<br>SPACE<br><span aria-hidden="true">→</span>';
      clearSpace.setAttribute('aria-label', cleared ? 'Restore clear space illustration' : 'Clear space in illustration');
      heroVisual?.classList.toggle('space-cleared', cleared);
      if (announce) status.textContent = cleared ? 'Space made — the illustration is cleared.' : 'Clear space restored.';
    };

    setClearState(clearSpace.getAttribute('aria-pressed') === 'true', false);
    clearSpace.addEventListener('click', () => {
      setClearState(clearSpace.getAttribute('aria-pressed') !== 'true');
    });
  }
})();
