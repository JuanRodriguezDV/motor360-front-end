// Motor 360 - lógica principal del prototipo funcional
const DATA_URL='data/noticias.json';
const KEY_FAV='motor360_favoritos', KEY_EXTRA='motor360_noticias_extra', KEY_DEL='motor360_eliminadas';
const page=document.body.dataset.page;
let cache=[];

async function noticias(){
  if(cache.length)return cache;
  let base=[];
  try{base=await (await fetch(DATA_URL)).json()}catch(e){base=[]}
  const extra=JSON.parse(localStorage.getItem(KEY_EXTRA)||'[]');
  const eliminadas=JSON.parse(localStorage.getItem(KEY_DEL)||'[]');
  cache=[...base,...extra].filter(n=>!eliminadas.includes(Number(n.id)));
  return cache;
}
function favs(){return JSON.parse(localStorage.getItem(KEY_FAV)||'[]').map(Number)}
function saveFavs(v){localStorage.setItem(KEY_FAV,JSON.stringify(v));updateFavCount()}
function toggleFav(id){id=Number(id);let f=favs();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];saveFavs(f);return f.includes(id)}
function updateFavCount(){const el=document.querySelector('#fav-count');if(el)el.textContent=favs().length}
function card(n){const active=favs().includes(Number(n.id));return `<article class="card"><div class="card-img"></div><div class="card-body"><span class="tag">${n.categoria}</span><h3>${n.titulo}</h3><p>${n.resumen}</p><small class="muted">${n.fecha}</small><div class="card-actions"><a class="btn" href="detalle.html?id=${n.id}">Ver más</a><button class="btn secondary fav-btn" data-id="${n.id}">${active?'♥':'♡'}</button></div></div></article>`}
function bindFavs(root,rerender){root?.addEventListener('click',e=>{const b=e.target.closest('.fav-btn');if(!b)return;toggleFav(b.dataset.id);rerender()})}
function setYear(){document.querySelectorAll('#year').forEach(e=>e.textContent=new Date().getFullYear())}

async function home(){const data=await noticias();const root=document.querySelector('#destacadas');const render=()=>root.innerHTML=data.filter(n=>n.destacada).slice(0,4).map(card).join('');render();bindFavs(root,render)}
async function news(){const data=await noticias(),root=document.querySelector('#news-list'),search=document.querySelector('#search'),cat=document.querySelector('#category'),count=document.querySelector('#count');const render=()=>{const q=(search.value||'').toLowerCase(),c=cat.value;const f=data.filter(n=>(c==='Todas'||n.categoria===c)&&(`${n.titulo} ${n.resumen} ${n.categoria}`.toLowerCase().includes(q)));root.innerHTML=f.map(card).join('')||'<div class="empty">No encontramos resultados.</div>';count.textContent=`${f.length} noticia(s)`};search.oninput=render;cat.onchange=render;render();bindFavs(root,render)}
async function detail(){const data=await noticias(),id=Number(new URLSearchParams(location.search).get('id')||1),n=data.find(x=>Number(x.id)===id)||data[0],root=document.querySelector('#detail');if(!n){root.innerHTML='<div class="container section empty">Noticia no disponible.</div>';return}const render=()=>root.innerHTML=`<div class="detail-hero"></div><section class="section container article"><article><span class="tag">${n.categoria}</span><h1>${n.titulo}</h1><p><strong>${n.resumen}</strong></p><p class="muted">${n.fecha} · Motor 360</p><p>${n.contenido}</p><p>Esta versión conserva la estructura visual planteada en los mockups de la primera entrega y agrega interacción mediante JavaScript.</p></article><aside class="panel"><button id="detail-fav" class="btn">${favs().includes(Number(n.id))?'♥ Quitar de favoritos':'♡ Agregar a favoritos'}</button><p><a class="btn secondary" href="contacto.html">Contactar</a></p><p><a href="noticias.html">← Volver al listado</a></p></aside></section>`;render();root.addEventListener('click',e=>{if(e.target.id==='detail-fav'){toggleFav(n.id);render()}})}
async function favorites(){const all=await noticias(),root=document.querySelector('#favorites');const render=()=>{const f=all.filter(n=>favs().includes(Number(n.id)));root.innerHTML=f.map(card).join('')||'<div class="empty"><h2>Aún no tienes favoritos</h2><a class="btn" href="noticias.html">Explorar noticias</a></div>'};render();bindFavs(root,render)}
function contact(){const form=document.querySelector('#contact-form'),msg=document.querySelector('#form-message');form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){msg.textContent='Completa los campos obligatorios con información válida.';msg.style.color='#ff6b78';form.reportValidity();return}msg.textContent='¡Mensaje enviado! Hemos recibido tu información.';msg.style.color='#37d48c';form.reset()})}
async function gestion(){const form=document.querySelector('#news-form'),root=document.querySelector('#manage-list');const render=async()=>{cache=[];const all=await noticias();root.innerHTML=all.map(n=>`<div class="manage-row"><span><strong>${n.titulo}</strong><br><small>${n.categoria}</small></span><button class="btn secondary delete" data-id="${n.id}">Eliminar</button></div>`).join('')};form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form),x=JSON.parse(localStorage.getItem(KEY_EXTRA)||'[]');x.push({id:Date.now(),titulo:fd.get('titulo'),categoria:fd.get('categoria'),fecha:new Date().toLocaleDateString('es-CO'),resumen:fd.get('resumen'),contenido:fd.get('resumen'),destacada:false});localStorage.setItem(KEY_EXTRA,JSON.stringify(x));form.reset();render()});root.addEventListener('click',e=>{const b=e.target.closest('.delete');if(!b)return;const id=Number(b.dataset.id),x=JSON.parse(localStorage.getItem(KEY_EXTRA)||'[]');if(x.some(n=>Number(n.id)===id))localStorage.setItem(KEY_EXTRA,JSON.stringify(x.filter(n=>Number(n.id)!==id)));else{const d=JSON.parse(localStorage.getItem(KEY_DEL)||'[]');if(!d.includes(id))d.push(id);localStorage.setItem(KEY_DEL,JSON.stringify(d))}render()});render()}

document.addEventListener('DOMContentLoaded',()=>{setYear();updateFavCount();({home,noticias:news,detalle:detail,favoritos:favorites,contacto:contact,gestion}[page]||(()=>{}))()});