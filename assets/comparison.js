(() => {
  const stage = document.querySelector('[data-comparison]');
  if (!stage) return;
  const input = stage.querySelector('input[type="range"]');
  if (!input) return;
  const update = () => {
    const value = Number(input.value);
    stage.style.setProperty('--comparison-position', `${value}%`);
    input.setAttribute('aria-valuetext', `${value}% before, ${100 - value}% after`);
  };
  input.addEventListener('input', update);
  update();
})();
