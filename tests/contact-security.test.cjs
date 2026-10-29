const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const vm = require('node:vm');

test('both routes keep contact controls disabled until JavaScript is ready', () => {
  for (const path of ['dist/index.html', 'dist/en/index.html']) {
    const html = readFileSync(path, 'utf8');
    const controls = html.match(/<(?:input|textarea|button)\b[^>]*data-contact-control[^>]*>/g);
    assert.equal(controls.length, 4);
    assert.ok(controls.every(tag => /\bdisabled\b/.test(tag)));
  }
});

test('contact handler prevents native submission and encodes untrusted text in mailto', () => {
  let submit;
  let prevented = false;
  const controls = Array.from({length: 4}, () => ({disabled: true}));
  const form = {
    reportValidity: () => true,
    addEventListener(event, handler) { assert.equal(event, 'submit'); submit = handler; },
    querySelectorAll() { assert.equal(typeof submit, 'function'); return controls; }
  };
  const status = {};
  const fallback = {hidden: true};
  const values = new Map([['nombre', 'Prueba &bcc=other@example.org'], ['email', 'test@example.org'], ['mensaje', '<script>alert(1)</script>\n&subject=alterado']]);
  const context = {
    document: {querySelector: selector => selector === '#contact-form' ? form : selector === '#form-status' ? status : fallback, dispatchEvent() {}},
    window: {location: {}},
    FormData: class {get(key) {return values.get(key);}},
    Event: class {}, t: {'ui.subject': 'Consulta: ', 'ui.greeting': 'Hola', 'ui.ready': 'Listo'}
  };
  const source = readFileSync('dist/jrc.js', 'utf8');
  vm.runInNewContext(source.slice(source.indexOf("const form=document.querySelector('#contact-form');"), source.indexOf("document.addEventListener('click',event=>{if(nav")), context);
  assert.ok(controls.every(control => !control.disabled));
  submit({preventDefault() {prevented = true;}});
  assert.ok(prevented);
  const url = new URL(context.window.location.href);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'hola@jrcweb.tech');
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.ok(url.searchParams.get('body').includes(values.get('mensaje')));
  assert.equal(fallback.href, context.window.location.href);
  assert.equal(fallback.hidden, false);
});
