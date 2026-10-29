(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: tuck the top bar away and switch to the light bar once we leave the hero */
  const header = $('[data-header]');
  const actionbar = $('[data-actionbar]');
  const hero = $('.hero');
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (actionbar) actionbar.classList.toggle('is-on', y > hero.offsetHeight * 0.6);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menu = $('[data-menu]');
  const burger = $('[data-menu-toggle]');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach((el, i) => {
    // stagger siblings that enter together
    const sibs = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
    if (sibs.length > 1 && !el.closest('.hero')) el.style.transitionDelay = `${sibs.indexOf(el) * 70}ms`;
    io.observe(el);
  });

  /* Product tabs */
  const tablist = $('[data-tabs]');
  const tabs = $$('[role="tab"]', tablist);
  const selectTab = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
    if (focus) tab.focus();
    if (matchMedia('(max-width: 1080px)').matches) {
      tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) { e.preventDefault(); selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });
  // Hero sector links open the matching product family
  $$('[data-open-tab]').forEach((a) => a.addEventListener('click', () => {
    const t = tabs.find((x) => x.dataset.tab === a.dataset.openTab);
    if (t) selectTab(t);
  }));

  /* Workshop: scroll-driven chapters (desktop only) */
  const track = $('[data-chapters]');
  const chapters = $$('[data-ch]', track);
  const imgs = $$('[data-ch-img]', track);
  const navItems = $$('[data-ch-nav]', track);
  const wide = matchMedia('(min-width: 900px)');
  let current = -1;
  const setChapter = (n) => {
    if (n === current) return;
    current = n;
    chapters.forEach((c, i) => c.classList.toggle('is-active', i === n));
    imgs.forEach((im, i) => im.classList.toggle('is-active', i === n));
    navItems.forEach((li, i) => li.classList.toggle('is-active', i === n));
  };
  const onTrack = () => {
    if (!wide.matches) return;
    const r = track.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / total));
    const seg = p * chapters.length;
    setChapter(Math.min(chapters.length - 1, Math.floor(seg)));
    navItems.forEach((li, i) => li.style.setProperty('--p', Math.min(1, Math.max(0, seg - i)).toFixed(3)));
  };
  addEventListener('scroll', onTrack, { passive: true });
  addEventListener('resize', onTrack);
  onTrack();

  /* Map legend <-> pins */
  const map = $('[data-map]');
  if (map) {
    const pins = Object.fromEntries($$('[data-pin]', map).map((p) => [p.dataset.pin, p]));
    $$('[data-pin-link]', map).forEach((li) => {
      const pin = pins[li.dataset.pinLink];
      const on = () => { pin && pin.classList.add('is-hot'); li.classList.add('is-hot'); };
      const off = () => { pin && pin.classList.remove('is-hot'); li.classList.remove('is-hot'); };
      li.addEventListener('mouseenter', on);
      li.addEventListener('mouseleave', off);
    });
  }

  /* Enquiry form (front-end only in this concept) */
  const form = $('[data-form]');
  const fileInput = $('[data-file]', form);
  const fileName = $('[data-file-name]', form);
  fileInput.addEventListener('change', () => {
    const n = fileInput.files.length;
    fileName.textContent = n ? (n === 1 ? fileInput.files[0].name : `${n} files attached`) : 'PDF, DWG or photos, up to 20 MB';
  });
  // "Ask about X" links pre-tick the matching chip
  $$('[data-enquire]').forEach((a) => a.addEventListener('click', () => {
    const box = $(`input[name="need"][value="${a.dataset.enquire}"]`, form);
    if (box) box.checked = true;
  }));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach((input) => {
      const valid = input.value.trim() && (input.type !== 'email' || /.+@.+\..+/.test(input.value));
      input.closest('.field').classList.toggle('is-invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (!ok) return;
    $('[data-form-done]', form).hidden = false;
  });

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
