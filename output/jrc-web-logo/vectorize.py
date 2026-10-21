from PIL import Image
import numpy as np
from pathlib import Path
import json

OUT = Path(__file__).parent
src = Image.open(r'C:/Users/user/.codex/generated_images/01a14a4f-de55-7442-a763-3e12f63512d4/exec-d2384f50-824c-4482-accb-95c6b5196144.png').convert('RGB')
a = np.asarray(src)
mask = a.max(axis=2) > 120
# Crop to the chosen mark, retaining a generous clear space.
mask[:390] = False
mask[620:] = False
yy, xx = np.indices(mask.shape)
accent = (xx >= 890) | ((xx >= 814) & (xx <= 863) & (yy < 480))

def simplify(p, eps=.65):
    p = np.asarray(p, dtype=float)
    if len(p) < 3: return p.tolist()
    v = p[-1] - p[0]
    if np.dot(v,v) == 0: d = np.linalg.norm(p-p[0],axis=1)
    else:
        t = np.clip((p-p[0]) @ v / np.dot(v,v),0,1)
        d = np.linalg.norm(p-(p[0]+t[:,None]*v),axis=1)
    i = int(np.argmax(d))
    if d[i] <= eps: return [p[0].tolist(),p[-1].tolist()]
    return simplify(p[:i+1],eps)[:-1]+simplify(p[i:],eps)

def trace(m):
    edges = {}
    for y,x in zip(*np.where(m)):
        x,y=int(x),int(y)
        if y==0 or not m[y-1,x]: edges[(x,y)]=(x+1,y)
        if x==m.shape[1]-1 or not m[y,x+1]: edges[(x+1,y)]=(x+1,y+1)
        if y==m.shape[0]-1 or not m[y+1,x]: edges[(x+1,y+1)]=(x,y+1)
        if x==0 or not m[y,x-1]: edges[(x,y+1)]=(x,y)
    paths=[]
    while edges:
        start=next(iter(edges)); p=[start]; cur=start
        while cur in edges:
            cur=edges.pop(cur); p.append(cur)
            if cur==start: break
        area=abs(sum(p[i][0]*p[i+1][1]-p[i+1][0]*p[i][1] for i in range(len(p)-1)))/2
        if area<8: continue
        k=len(p)//2
        pts=simplify(p[:k+1])[:-1]+simplify(p[k:])[:-1]
        paths.append('M'+' L'.join(f'{x-210:g},{y-365:g}' for x,y in pts)+' Z')
    return ' '.join(paths)

base=trace(mask & ~accent)
purple=trace(mask & accent)
variants=[
 ('original-transparente','#F5F2ED','#B17AF2',None),
 ('web-negro-transparente','#17151F','#17151F',None),
 ('negro-violeta-transparente','#17151F','#A16BE0',None),
 ('blanco-violeta-fondo-oscuro','#F5F2ED','#B17AF2','#0D0C20'),
 ('web-negro-fondo-blanco','#17151F','#17151F','#FFFFFF'),
 ('negro-violeta-fondo-blanco','#17151F','#A16BE0','#FFFFFF'),
 ('blanco-transparente','#FFFFFF','#FFFFFF',None),
 ('blanco-fondo-oscuro','#FFFFFF','#FFFFFF','#0D0C20'),
 ('jrc-violeta-web-negro-transparente','#A16BE0','#17151F',None),
 ('jrc-violeta-web-negro-fondo-blanco','#A16BE0','#17151F','#FFFFFF'),
]
for name, c1,c2,bg in variants:
    rect=f'<rect width="1120" height="280" fill="{bg}"/>' if bg else ''
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="280" viewBox="0 0 1120 280" role="img" aria-labelledby="title"><title id="title">JRC Web</title>{rect}<g fill-rule="evenodd"><path fill="{c1}" d="{base}"/><path fill="{c2}" d="{purple}"/></g></svg>'
    (OUT/(name+'.svg')).write_text(svg,encoding='utf-8')
(OUT/'variants.json').write_text(json.dumps([v[0] for v in variants]),encoding='utf-8')
print('Created',len(variants),'SVG variants with outlined shapes, no embedded raster or fonts.')
