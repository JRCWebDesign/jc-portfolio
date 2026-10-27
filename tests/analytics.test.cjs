const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('dist/analytics.js', 'utf8');
function setup({id = 'G-TEST123', saved = null} = {}) {
  function element(extra = {}) {
    return {hidden: true, handlers: {}, addEventListener(name, fn) {this.handlers[name] = fn;}, focus() {}, ...extra};
  }
  const yes = element({dataset: {consent: 'accepted'}});
  const no = element({dataset: {consent: 'rejected'}});
  const banner = element({querySelector: () => yes, querySelectorAll: () => [yes, no]});
  const settings = element();
  const form = element();
  const email = element({id: '', closest: () => null});
  const project = element({dataset: {image: '/assets/mobile-barber.png'}});
  const scripts = [];
  const documentEvents = {};
  const storage = new Map(saved ? [['jrc.analytics-consent.v1', JSON.stringify({value: saved, at: Date.now()})]] : []);
  const document = {
    documentElement: {lang: 'es-UY'}, title: 'JRC Web',
    referrer: 'https://example.org/private?email=private@example.org', cookie: '',
    head: {append: el => scripts.push(el)}, createElement: () => ({}),
    querySelector(selector) {
      return selector.startsWith('meta') ? {content: id} : selector === '#analytics-consent' ? banner : selector === '#analytics-settings' ? settings : form;
    },
    querySelectorAll(selector) {
      return selector === '[data-image]' ? [project] : selector.includes('mailto:') ? [email] : [];
    },
    addEventListener: (name, fn) => {documentEvents[name] = fn;}
  };
  const window = {};
  vm.runInNewContext(source, {
    document, window, URL, URLSearchParams, Date, JSON,
    location: {origin: 'https://www.jrcweb.tech', pathname: '/', hostname: 'www.jrcweb.tech', search: '?email=private@example.org&utm_source=instagram&utm_campaign=test&message=private'},
    localStorage: {getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value)}
  });
  return {window, scripts, yes, no, banner, settings, form, email, project, documentEvents};
}
test('unconfigured site does not initialise analytics', () => {
  const state = setup({id: ''});
  assert.equal(state.scripts.length, 0);
  assert.equal(state.settings.hidden, true);
  assert.equal(state.window.dataLayer, undefined);
});
test('no external Google script before consent or after refusal', () => {
  const state = setup();
  assert.equal(state.scripts.length, 0);
  assert.equal(state.banner.hidden, false);
  state.no.handlers.click();
  state.email.handlers.click();
  assert.equal(state.scripts.length, 0);
  assert.equal(state.window.dataLayer.filter(x => x[0] === 'event').length, 0);
});
test('acceptance loads once, sanitises URLs and measures intent without form data', () => {
  const state = setup();
  state.yes.handlers.click();
  state.yes.handlers.click();
  assert.equal(state.scripts.length, 1);
  const config = state.window.dataLayer.find(x => x[0] === 'config')[2];
  assert.equal(config.page_location, 'https://www.jrcweb.tech/?utm_source=instagram&utm_campaign=test');
  assert.equal(config.page_referrer, 'https://example.org/');
  state.form.handlers.input();
  state.form.handlers.input();
  state.documentEvents['jrc:email-draft-prepared']();
  state.project.handlers.click();
  const events = state.window.dataLayer.filter(x => x[0] === 'event');
  assert.deepEqual(Array.from(events, x => x[1]), ['contact_form_start', 'email_draft_prepared', 'project_preview']);
  assert.equal(JSON.stringify(state.window.dataLayer).includes('private'), false);
  assert.equal(events.some(x => x[1] === 'generate_lead'), false);
  state.no.handlers.click();
  state.email.handlers.click();
  assert.equal(state.window.dataLayer.filter(x => x[0] === 'event').length, events.length);
  assert.equal(state.window['ga-disable-G-TEST123'], true);
});
test('saved consent is applied on the next visit', () => {
  assert.equal(setup({saved: 'accepted'}).scripts.length, 1);
  const rejected = setup({saved: 'rejected'});
  assert.equal(rejected.scripts.length, 0);
  assert.equal(rejected.banner.hidden, true);
});
