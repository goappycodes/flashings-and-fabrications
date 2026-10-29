(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Header shadow + mobile action bar */
  const header = $('[data-header]');
  const actionbar = $('[data-actionbar]');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', scrollY > 8);
    actionbar.classList.toggle('is-on', scrollY > 520);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menu = $('[data-menu]');
  const burger = $('[data-menu-toggle]');
  const setMenu = (open) => { burger.setAttribute('aria-expanded', String(open)); menu.hidden = !open; };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* Reveal on scroll, staggering siblings that enter together */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  $$('.reveal').forEach((el) => {
    const sibs = $$(':scope > .reveal', el.parentElement);
    if (sibs.length > 1) el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
    io.observe(el);
  });

  /* Product cards pre-select the enquiry type */
  const select = $('[data-need-select]');
  $$('[data-need]').forEach((a) => a.addEventListener('click', () => { select.value = a.dataset.need; }));

  /* Enquiry form (front-end only in this concept) */
  const form = $('[data-form]');
  const file = $('[data-file]', form);
  const fileName = $('[data-file-name]', form);
  const fileLabel = fileName.innerHTML;
  file.addEventListener('change', () => {
    const n = file.files.length;
    fileName.innerHTML = n ? (n === 1 ? file.files[0].name : `${n} files attached`) : fileLabel;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach((input) => {
      const valid = input.value.trim() && (input.type !== 'email' || /.+@.+\..+/.test(input.value));
      input.closest('.field').classList.toggle('is-invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (ok) $('[data-form-done]', form).hidden = false;
  });

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
