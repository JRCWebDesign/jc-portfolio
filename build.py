"""Generate both static language routes using the shared template and catalog."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
catalog = json.loads((ROOT / 'src/translations.json').read_text(encoding='utf-8'))
template = (ROOT / 'src/index.html').read_text(encoding='utf-8')
analytics_id = json.loads((ROOT / 'src/analytics-config.json').read_text(encoding='utf-8'))['measurementId']
if analytics_id and not re.fullmatch(r'G-[A-Z0-9]+', analytics_id):
    raise ValueError('Invalid Google Analytics measurement ID')
template = template.replace('{{analyticsId}}', analytics_id)
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

# Fail the deployment rather than publish missing local browser assets.
for page in [ROOT / 'dist/index.html', ROOT / 'dist/en/index.html']:
    html = page.read_text(encoding='utf-8')
    if '{{' in html:
        raise ValueError(f'Unresolved template in {page}')
    for asset in re.findall(r'(?:src|href)="(/[^"#?]+)', html):
        if not (ROOT / 'dist' / asset.lstrip('/')).exists():
            raise FileNotFoundError(f'Missing asset: {asset}')
