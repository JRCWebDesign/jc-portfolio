(() => {
  'use strict';
  const id = document.querySelector('meta[name="ga-measurement-id"]')?.content || '';
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  const banner = document.querySelector('#analytics-consent');
  const settings = document.querySelector('#analytics-settings');
  const key = 'jrc.analytics-consent.v1';
  const language = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
  let allowed = false;
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args) => window.dataLayer.push(args);
  window['ga-disable-' + id] = true;
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  // Never send form contents, mailto URLs, arbitrary query parameters or hashes.
  const page = new URL(location.origin + location.pathname);
  const query = new URLSearchParams(location.search);
  for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = query.get(name);
    if (value && /^[a-zA-Z0-9_-]{1,64}$/.test(value)) page.searchParams.set(name, value);
  }
  let referrer = '';
  try { referrer = new URL(document.referrer).origin + '/'; } catch {}
  function start() {
    allowed = true;
    window['ga-disable-' + id] = false;
    gtag('consent', 'update', {analytics_storage: 'granted'});
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', id, {
      page_location: page.href, page_referrer: referrer, page_title: document.title,
      language, allow_google_signals: false, allow_ad_personalization_signals: false,
      send_page_view: true
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  function stop() {
    allowed = false;
    window['ga-disable-' + id] = true;
    gtag('consent', 'update', {analytics_storage: 'denied'});
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', location.hostname, '.jrcweb.tech']) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
      }
    }
  }
  function choose(value) {
    try { localStorage.setItem(key, JSON.stringify({value, at: Date.now()})); } catch {}
    if (value === 'accepted') start(); else stop();
    banner.hidden = true;
  }
  function track(name, parameters = {}) {
    if (allowed) gtag('event', name, {site_language: language, ...parameters});
  }
  let preference;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && Date.now() - saved.at < 180 * 86400000) preference = saved.value;
  } catch {}
  settings.hidden = false;
  settings.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('[data-consent="accepted"]').focus();
  });
  banner.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => { choose(button.dataset.consent); settings.focus(); });
  });
  if (preference === 'accepted') start();
  else if (preference !== 'rejected') banner.hidden = false;
  document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', () => {
      const placement = link.closest('nav') ? 'navigation' : link.closest('.hero') ? 'hero' : link.closest('.services') ? 'services' : 'about';
      track('contact_cta_click', {placement});
    });
  });
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      const project = button.dataset.image.split('/').pop().replace(/\.[^.]+$/, '');
      track('project_preview', {project_id: project});
    });
  });
  document.querySelectorAll('a[href^="mailto:"], #email-draft').forEach(link => {
    link.addEventListener('click', () => track('contact_email_click', {
      placement: link.id === 'email-draft' ? 'draft_fallback' : link.closest('footer') ? 'footer' : 'contact'
    }));
  });
  document.querySelectorAll('.language-switch a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.lang !== language) track('language_change', {selected_language: link.lang});
    });
  });
  let formStarted = false;
  document.querySelector('#contact-form').addEventListener('input', () => {
    if (!formStarted && allowed) { formStarted = true; track('contact_form_start'); }
  });
  // Dispatched only after validation and draft creation, not a confirmed enquiry.
  document.addEventListener('jrc:email-draft-prepared', () => track('email_draft_prepared'));
})();
