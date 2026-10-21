const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
 const dir=__dirname;
 const names=JSON.parse(fs.readFileSync(path.join(dir,'variants.json'),'utf8'));
 for(const n of names) await sharp(path.join(dir,n+'.svg')).resize(3360,840).png().toFile(path.join(dir,n+'.png'));
 const tiles=[];
 for(let i=0;i<names.length;i++){
  const n=names[i];
  const bg=n.includes('blanco-transparente')||n.startsWith('original')?'#0D0C20':'#FFFFFF';
  const logo=await sharp(path.join(dir,n+'.svg')).resize(672,168).png().toBuffer();
  const label=Buffer.from(`<svg width="720" height="45"><text x="24" y="28" font-family="Arial" font-size="16" fill="${bg==='#FFFFFF'?'#17151F':'#FFFFFF'}">${i+1}. ${n}</text></svg>`);
  const tile=await sharp({create:{width:720,height:240,channels:4,background:bg}}).composite([{input:logo,left:24,top:48},{input:label,left:0,top:0}]).png().toBuffer();
  tiles.push({input:tile,left:(i%2)*720,top:Math.floor(i/2)*240});
 }
 await sharp({create:{width:1440,height:1200,channels:4,background:'#dddddd'}}).composite(tiles).png().toFile(path.join(dir,'vista-previa.png'));
 console.log('Exported 10 PNG files at 3360×840 and contact sheet.');
})();
