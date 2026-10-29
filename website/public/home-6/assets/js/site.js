(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- header ---------- */
  const hdr = $('#hdr');
  const burger = $('.burger');
  const menu = $('#menu');
  const setSolid = () => hdr.classList.toggle('is-solid', window.scrollY > 24 || !menu.hidden);
  setSolid();
  window.addEventListener('scroll', setSolid, { passive: true });

  const closeMenu = () => {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    setSolid();
  };
  burger.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    setSolid();
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); burger.focus(); } });
  window.matchMedia('(min-width: 1121px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal, .fold').forEach((el) => {
    const sibs = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
    const i = sibs.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 4) * 80}ms`;
    io.observe(el);
  });

  /* ---------- hero slideshow ---------- */
  const slides = $$('.slide');
  const htabs = $$('.htab');
  const pause = $('.hero__pause');
  const DURATION = 7000;
  let cur = 0, start = 0, elapsed = 0, raf = 0;
  let paused = reduced;

  const show = (n) => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === cur;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', String(!on));
      const img = $('img', s);
      if (on && img.loading === 'lazy') img.loading = 'eager';
    });
    htabs.forEach((t, i) => {
      const on = i === cur;
      t.classList.toggle('is-active', on);
      t.classList.toggle('is-done', i < cur);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('i', t).style.width = i < cur ? '100%' : '0';
    });
    elapsed = 0;
    start = performance.now();
  };

  const tick = (now) => {
    if (!paused) {
      const p = Math.min((elapsed + now - start) / DURATION, 1);
      $('i', htabs[cur]).style.width = `${p * 100}%`;
      if (p >= 1) show(cur + 1);
    }
    raf = requestAnimationFrame(tick);
  };

  const setPaused = (v) => {
    if (v && !paused) elapsed += performance.now() - start;
    if (!v && paused) start = performance.now();
    paused = v;
    pause.setAttribute('aria-pressed', String(v));
    pause.setAttribute('aria-label', v ? 'Play slideshow' : 'Pause slideshow');
  };

  htabs.forEach((t, i) => {
    t.addEventListener('click', () => { show(i); });
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      show(cur + d);
      htabs[cur].focus();
    });
  });
  pause.addEventListener('click', () => setPaused(!paused));
  setPaused(paused);
  show(0);
  raf = requestAnimationFrame(tick);

  // Stop the clock when the hero is off screen or the tab is hidden.
  let heroVisible = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }, { threshold: 0.2 }).observe($('.hero'));
  const hold = () => {
    const away = document.hidden || !heroVisible;
    if (away && raf) { cancelAnimationFrame(raf); raf = 0; if (!paused) elapsed += performance.now() - start; }
    if (!away && !raf) { start = performance.now(); raf = requestAnimationFrame(tick); }
  };
  document.addEventListener('visibilitychange', hold);
  window.addEventListener('scroll', hold, { passive: true });

  /* ---------- tablists (products, projects) ---------- */
  const tablist = (tabs, panels, onChange) => {
    let active = tabs.findIndex((t) => t.classList.contains('is-active'));
    const select = (n, focus) => {
      active = (n + tabs.length) % tabs.length;
      tabs.forEach((t, i) => {
        const on = i === active;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        panels[i].classList.toggle('is-active', on);
      });
      const t = tabs[active];
      t.parentElement.scrollTo({ left: t.offsetLeft - 24, behavior: reduced ? 'auto' : 'smooth' });
      if (focus) t.focus();
      if (onChange) onChange(active);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        select(map[e.key], true);
      });
    });
    return { select, get index() { return active; } };
  };

  tablist($$('.tabs .tab'), $$('.panels .panel'));

  const projects = tablist($$('.ptab'), $$('.proj'));
  $$('.projects [data-dir]').forEach((b) => b.addEventListener('click', () => projects.select(projects.index + Number(b.dataset.dir))));

  /* ---------- latest rail ---------- */
  const rail = $('.rail');
  const railBtns = $$('.latest [data-scroll]');
  const railState = () => {
    railBtns[0].disabled = rail.scrollLeft < 8;
    railBtns[1].disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    railBtns[0].parentElement.classList.toggle('is-idle', railBtns[0].disabled && railBtns[1].disabled);
  };
  railBtns.forEach((b) => b.addEventListener('click', () => {
    const card = $('.card', rail);
    const step = card ? card.getBoundingClientRect().width + 28 : 320;
    rail.scrollBy({ left: step * Number(b.dataset.scroll), behavior: reduced ? 'auto' : 'smooth' });
  }));
  rail.addEventListener('scroll', railState, { passive: true });
  window.addEventListener('resize', railState);
  railState();

  /* ---------- stepped enquiry ---------- */
  const form = $('#enquiry-form');
  const steps = $$('.step', form);
  const bar = $('.steps__progress i', form);
  const count = $('.steps__count b', form);
  const back = $('[data-back]', form);
  const next = $('[data-next]', form);
  const send = $('[type="submit"]', form);
  const done = $('.form-card .done');
  let step = 0;

  const err = (key, on) => { $(`[data-err="${key}"]`, form).hidden = !on; };
  const goTo = (n) => {
    step = n;
    steps.forEach((s, i) => { s.hidden = i !== step; s.classList.toggle('is-active', i === step); });
    bar.style.width = `${((step + 1) / steps.length) * 100}%`;
    count.textContent = String(step + 1);
    back.hidden = step === 0;
    next.hidden = step === steps.length - 1;
    send.hidden = step !== steps.length - 1;
  };
  const valid = () => {
    if (step === 0) {
      const ok = $$('input[name="need"]:checked', form).length > 0;
      err('need', !ok);
      return ok;
    }
    if (step === 1) {
      const t = form.elements.details;
      const ok = t.value.trim().length > 2;
      t.classList.toggle('is-bad', !ok);
      err('details', !ok);
      if (!ok) t.focus();
      return ok;
    }
    const name = form.elements.name, email = form.elements.email;
    const okName = name.value.trim().length > 1;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    name.classList.toggle('is-bad', !okName);
    email.classList.toggle('is-bad', !okEmail);
    err('contact', !(okName && okEmail));
    if (!okName) name.focus(); else if (!okEmail) email.focus();
    return okName && okEmail;
  };

  next.addEventListener('click', () => {
    if (!valid()) return;
    goTo(step + 1);
    const first = $('textarea, input:not([type="file"])', steps[step]);
    if (first) first.focus({ preventScroll: true });
  });
  back.addEventListener('click', () => goTo(step - 1));
  $$('input[name="need"]', form).forEach((c) => c.addEventListener('change', () => err('need', false)));

  const fileInput = form.elements.drawing;
  fileInput.addEventListener('change', () => {
    $('.file__name', form).textContent = fileInput.files.length ? fileInput.files[0].name : 'Optional. PDF, DWG, DXF or image.';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!valid()) return;
    // Front end only for the concept. On the live site this posts to the enquiry endpoint.
    const first = form.elements.name.value.trim().split(/\s+/)[0];
    $('[data-name]', done).textContent = first ? `, ${first}` : '';
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });

  // "Enquire about ..." buttons tick the matching box and jump to the form.
  $$('[data-need]').forEach((a) => a.addEventListener('click', () => {
    const box = $(`input[name="need"][value="${a.dataset.need}"]`, form);
    if (box) box.checked = true;
    err('need', false);
  }));
  $$('[data-book]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (step < 2) {
      if (!$$('input[name="need"]:checked', form).length) $('input[value="Not sure yet"]', form).checked = true;
      if (!form.elements.details.value.trim()) form.elements.details.value = 'Please call me back to talk it through.';
      goTo(2);
    }
    $('input[name="pref"][value="call"]', form).checked = true;
    $('.form-card').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    form.elements.name.focus({ preventScroll: true });
  }));

  goTo(0);

  /* ---------- footer year ---------- */
  $$('[data-year]').forEach((y) => { y.textContent = String(new Date().getFullYear()); });
})();
