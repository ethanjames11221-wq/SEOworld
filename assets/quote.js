(() => {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const output = document.querySelector('[data-quote-output]');
  const status = document.querySelector('[data-quote-status]');
  const copyButton = document.querySelector('[data-copy-quote]');
  const fields = {
    category: form.querySelector('[name="category"]'),
    postcode: form.querySelector('[name="postcode"]'),
    items: form.querySelector('[name="items"]'),
    access: form.querySelector('[name="access"]')
  };

  const clean = (value) => value.trim().replace(/\s+/g, ' ');
  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    Object.values(fields).forEach((field) => field.removeAttribute('aria-invalid'));
    const category = fields.category.value;
    const postcode = clean(fields.postcode.value);
    const items = clean(fields.items.value);
    const access = fields.access.value;
    const errors = [];
    if (!category) { fields.category.setAttribute('aria-invalid', 'true'); errors.push('choose a category'); }
    if (!postcode) { fields.postcode.setAttribute('aria-invalid', 'true'); errors.push('add your postcode'); }
    if (!items) { fields.items.setAttribute('aria-invalid', 'true'); errors.push('describe what needs clearing'); }
    if (errors.length) {
      setStatus(`Please ${errors.join(', ')}.`, true);
      output.value = '';
      return;
    }

    const message = [
      'Hi Caspar Clearance,',
      '',
      'I would like to ask about waste removal.',
      `Category: ${category}`,
      `Postcode: ${postcode}`,
      `Items: ${items}`,
      `Access: ${access || 'Not specified'}`,
      '',
      'Please let me know what information you need next. Thank you.'
    ].join('\n');
    output.value = message;
    setStatus('Your message is ready to copy. Nothing has been sent.');
    output.focus();
  });

  copyButton.addEventListener('click', async () => {
    if (!output.value) { setStatus('Build your message first.', true); return; }
    try {
      await navigator.clipboard.writeText(output.value);
      setStatus('Copied. Open Instagram and paste the message manually.');
    } catch (error) {
      output.focus();
      output.select();
      setStatus('Copy was unavailable; the message is selected so you can copy it.', true);
    }
  });
})();
