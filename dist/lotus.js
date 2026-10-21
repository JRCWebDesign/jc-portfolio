const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector('#project-dialog');
const image = document.querySelector('#project-image');
let opener;
document.querySelectorAll('.work-item').forEach(button => button.addEventListener('click', () => {
  opener = button;
  document.querySelector('#project-title').textContent = button.dataset.name;
  image.src = button.dataset.image;
  image.alt = `Diseño mobile de ${button.dataset.name}`;
  dialog.showModal();
}));
document.querySelector('#close-project').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});

async function createLotus() {
  const THREE = await import('./vendor/three.module.js');
  const holder = document.querySelector('#scene');
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  holder.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,100);
  camera.position.set(0,3.6,10);camera.lookAt(0,.5,0);
  scene.add(new THREE.HemisphereLight(0xf8dfcf,0x392936,2.1));
  const sunset = new THREE.DirectionalLight(0xffbd98,4.3);sunset.position.set(4,4,-2);scene.add(sunset);
  const soft = new THREE.DirectionalLight(0xd6b9d3,2.5);soft.position.set(-3,3,5);scene.add(soft);
  const rim = new THREE.PointLight(0xf3a2b0,12,15);rim.position.set(3,1,2);scene.add(rim);
  const flower = new THREE.Group();scene.add(flower);
  const petals = [];
  // A cupped surface: a tapered base, broad shoulders and a pointed, lifted tip.
  function petalGeometry(length,width,lift) {
    const positions=[],indices=[],colors=[];
    const rows=40,cols=20;
    const base=new THREE.Color('#702d43'),edge=new THREE.Color('#d8a0ad');
    for(let i=0;i<=rows;i++){
      const t=i/rows;
      const breadth=Math.pow(Math.sin(Math.PI*t),.8)*width;
      for(let j=0;j<=cols;j++){
        const u=(j/cols)*2-1;
        positions.push(u*breadth, lift*t*t + .26*u*u*Math.sin(Math.PI*t)-.12*Math.sin(Math.PI*t), length*t);
        const c=base.clone().lerp(edge,.12+.7*t+.13*Math.abs(u));colors.push(c.r,c.g,c.b);
        if(i<rows&&j<cols){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}
      }
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
  }
  const material = new THREE.MeshPhysicalMaterial({vertexColors:true,side:THREE.DoubleSide,metalness:.16,roughness:.3,clearcoat:.65,clearcoatRoughness:.25});
  const rings=[{count:9,length:2.05,width:.66,lift:.5,y:0},{count:7,length:1.65,width:.61,lift:1.2,y:.08},{count:5,length:1.05,width:.43,lift:1.7,y:.15}];
  rings.forEach((ring,r)=>{
    const geo=petalGeometry(ring.length,ring.width,ring.lift);
    for(let i=0;i<ring.count;i++){
      const pivot=new THREE.Group(),angle=i/ring.count*Math.PI*2+r*.43;
      pivot.rotation.y=angle;pivot.position.y=ring.y;
      pivot.add(new THREE.Mesh(geo,material));flower.add(pivot);
      petals.push({pivot,angle,ring:r,y:ring.y});
    }
  });
  const heart=new THREE.Mesh(new THREE.SphereGeometry(.19,24,16),new THREE.MeshStandardMaterial({color:0xd2a18a,metalness:.35,roughness:.5}));heart.position.y=.3;flower.add(heart);
  let px=0,py=0,rx=0,ry=0,frame,active=true;
  window.addEventListener('pointermove',e=>{px=e.clientX/innerWidth*2-1;py=e.clientY/innerHeight*2-1;},{passive:true});
  window.addEventListener('pointerleave',()=>{px=py=0;});
  function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);if(reduced.matches)draw();}
  window.addEventListener('resize',resize);
  function draw(time=0){
    if(!active)return;
    const mobile=innerWidth<760;
    const progress=reduced.matches?0:Math.max(0,Math.min(1,scrollY/(innerHeight*1.25)));
    const spread=progress*progress*(3-2*progress);
    rx+=(px-rx)*.035;ry+=(py-ry)*.035;
    flower.position.set(mobile?0:1.8,mobile?-1.65:-.2,0);
    flower.scale.setScalar((mobile?.7:.85)*(1-spread*.16));
    flower.rotation.y=reduced.matches?.2:.2+rx*.16+time*.000045+spread*.65;
    flower.rotation.x=reduced.matches?0:ry*.05;
    petals.forEach(({pivot,angle,ring,y})=>{
      const distance=spread*(1.3+ring*.5);
      pivot.position.set(Math.sin(angle)*distance,y+spread*(ring-.6)*.6,Math.cos(angle)*distance);
      pivot.rotation.x=-spread*.35;
      pivot.rotation.z=Math.sin(angle)*spread*.18;
    });
    holder.style.opacity=String(Math.max(0,1-Math.max(0,scrollY/innerHeight-1.35)*1.6));
    const atmosphere=document.querySelector('.atmosphere');
    atmosphere.style.opacity=String(Math.max(.12,1-scrollY/(innerHeight*2.2)));
    if (scrollY < innerHeight * 2.1) renderer.render(scene,camera);
    if(!reduced.matches)frame=requestAnimationFrame(draw);
  }
  document.body.classList.add('webgl-ready');
  const resume=()=>{cancelAnimationFrame(frame);active=!document.hidden;if(active)draw();};
  document.addEventListener('visibilitychange',resume);
  reduced.addEventListener('change',resume);
  window.addEventListener('scroll',()=>{if(reduced.matches)draw();},{passive:true});
  draw();
}
createLotus().catch(error=>{console.warn('La escena 3D no está disponible; se muestra la versión estática.',error);});
