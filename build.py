"""Generate both static language routes using the shared template and catalog."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
catalog = json.loads((ROOT / 'src/translations.json').read_text(encoding='utf-8'))
template = (ROOT / 'src/index.html').read_text(encoding='utf-8')
for language, path in [('es', 'index.html'), ('en', 'en/index.html')]:
    def translate(match):
        return catalog[match[1]][language]
    html = re.sub(r'\{\{([^{}]+)\}\}', translate, template)
    target = ROOT / 'dist' / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding='utf-8')
    runtime = {key: value[language] for key, value in catalog.items() if key.startswith('ui.')}
    (ROOT / 'dist' / f'i18n-{language}.js').write_text(
        'window.translations=' + json.dumps(runtime, ensure_ascii=False) + ';\n', encoding='utf-8')
print('Built / and /en/ with static translated HTML.')
