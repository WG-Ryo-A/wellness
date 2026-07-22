const menuItems = [
  { slug:'tropical-choco', no:'01', en:'TROPICAL CHOCO', name:'トロピカルチョコ', calories:254, color:'#9b5d3c', notes:'マンゴー・カカオ・アボカド', description:'マンゴーの濃厚な甘みとカカオの香り。デザート感のある、リッチな飲み心地。', tags:['RICH','PROTEIN','COLLAGEN'] },
  { slug:'green-apple', no:'02', en:'GREEN APPLE', name:'グリーンアップル', calories:210, color:'#6e973b', notes:'りんご・ほうれん草・アボカド', description:'りんごの爽やかさを軸にした、すっきり飲みやすいグリーンスムージー。', tags:['GREEN','FRESH','PROTEIN'] },
  { slug:'apple-banana', no:'03', en:'APPLE BANANA', name:'アップルバナナ', calories:150, color:'#c97887', notes:'りんご・バナナ・キウイ', description:'果実のやさしい甘みとヨーグルトのまろやかさ。朝にも選びやすい軽やかな一杯。', tags:['FRUITY','YOGURT','COLLAGEN'] },
  { slug:'green-banana', no:'04', en:'GREEN BANANA', name:'グリーンバナナ', calories:210, color:'#477728', notes:'葉野菜・バナナ・りんご', description:'グリーン野菜にバナナの自然な甘みを重ねた、まろやかで満足感のある味わい。', tags:['GREEN','MILD','PROTEIN'] },
  { slug:'matcha-milk', no:'05', en:'MATCHA MILK', name:'抹茶ミルク', calories:253, color:'#2f6b35', notes:'抹茶・バナナ・植物素材', description:'抹茶の香りとやさしい甘み。和のニュアンスを楽しむ、落ち着いた一杯。', tags:['JAPANESE','MATCHA','COLLAGEN'] },
  { slug:'acai-banana', no:'06', en:'ACAI BANANA', name:'アサイーバナナ', calories:150, color:'#67315d', notes:'アサイー・バナナ・ブルーベリー', description:'アサイーとベリーの深い果実感。フルーティーで後味はすっきり。', tags:['BERRY','FRUITY','PROTEIN'] },
  { slug:'tropical-milk', no:'07', en:'TROPICAL MILK', name:'トロピカルミルク', calories:148, color:'#d7a318', notes:'マンゴー・パイン・ヨーグルト', description:'マンゴーとパインの明るい香り。ヨーグルトでまろやかに整えたトロピカルテイスト。', tags:['TROPICAL','YOGURT','COLLAGEN'] },
  { slug:'mix-berry', no:'08', en:'MIX BERRY', name:'ミックスベリー', calories:137, color:'#b94c73', notes:'ストロベリー・ブルーベリー・ラズベリー', description:'3種のベリーの甘酸っぱさとヨーグルトのまろやかさ。軽快で華やかな味わい。', tags:['BERRY','FRESH','PROTEIN'] },
  { slug:'choco-banana', no:'09', en:'CHOCO BANANA', name:'チョコバナナ', calories:210, color:'#6c3a24', notes:'バナナ・カカオ・アボカド', description:'バナナの自然な甘みとカカオの香り。飲み応えがありながら重すぎない一杯。', tags:['RICH','CACAO','COLLAGEN'] },
  { slug:'hojicha-milk', no:'10', en:'HOJICHA MILK', name:'ほうじ茶ミルク', calories:265, color:'#806140', notes:'ほうじ茶・バナナ・アボカド', description:'香ばしいほうじ茶とまろやかなコク。ほっと落ち着く和のスムージー。', tags:['JAPANESE','ROASTED','PROTEIN'] },
  { slug:'coffee-milk', no:'11', en:'COFFEE MILK', name:'コーヒーミルク', calories:281, color:'#704725', notes:'コーヒー・バナナ・アボカド', description:'コーヒーの香ばしさと自然な甘み。満足感を重ねた、大人のリラックステイスト。', tags:['COFFEE','RICH','COLLAGEN'] }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const storage = {
  get(key){ try { return localStorage.getItem(key); } catch { return null; } },
  set(key,value){ try { localStorage.setItem(key,value); } catch {} }
};

window.addEventListener('load', () => {
  setTimeout(() => $('.page-loader')?.classList.add('is-hidden'), 450);
});

// Header / mobile navigation
const header = $('[data-header]');
const menuToggle = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');
window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', scrollY > 32), { passive:true });
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('is-locked', open);
});
$$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded','false'); mobileMenu.classList.remove('is-open'); mobileMenu.setAttribute('aria-hidden','true'); document.body.classList.remove('is-locked');
}));

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold:.14 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`; revealObserver.observe(el); });

// Cursor glow
const orb = $('.cursor-orb');
window.addEventListener('pointermove', e => {
  if (!orb) return;
  orb.animate({ left:`${e.clientX}px`, top:`${e.clientY}px` }, { duration:900, fill:'forwards', easing:'cubic-bezier(.2,.8,.2,1)' });
}, { passive:true });

// Hero image rotation and color mood
const heroImages = $$('.hero-image');
const heroName = $('[data-hero-name]');
let heroIndex = 0;
const heroNames = ['MIX BERRY','GREEN APPLE','TROPICAL CHOCO'];
function changeHero() {
  heroImages[heroIndex].classList.remove('is-active');
  heroIndex = (heroIndex + 1) % heroImages.length;
  heroImages[heroIndex].classList.add('is-active');
  document.documentElement.style.setProperty('--accent', heroImages[heroIndex].dataset.theme);
  if (heroName) heroName.textContent = heroNames[heroIndex];
}
setInterval(changeHero, 5200);

// Gentle pointer tilt on hero visual
const tilt = $('[data-tilt]');
tilt?.addEventListener('pointermove', e => {
  const r = tilt.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  tilt.style.transform = `perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`;
});
tilt?.addEventListener('pointerleave', () => tilt.style.transform = '');

// Menu rendering
const rail = $('[data-menu-rail]');
rail.innerHTML = menuItems.map(item => `
  <button class="menu-card reveal" type="button" data-product="${item.slug}" style="--card-color:${item.color}" aria-label="${item.name}の詳細を見る">
    <span class="menu-card__image">
      <img src="assets/menu/${item.slug}.webp" alt="${item.name}" loading="lazy" />
      <span class="menu-card__number">${item.no}</span>
      <span class="menu-card__arrow" aria-hidden="true">↗</span>
    </span>
    <span class="menu-card__body">
      <span class="menu-card__title-row">
        <span>
          <span class="menu-card__en">${item.en}</span>
          <span class="menu-card__name">${item.name}</span>
        </span>
        <strong class="menu-card__calorie">${item.calories}<small>kcal</small></strong>
      </span>
      <span class="menu-card__description">${item.description}</span>
      <span class="menu-card__notes"><small>MAIN NOTES</small><span>${item.notes}</span></span>
      <span class="menu-card__tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</span>
      <span class="menu-card__detail">DETAIL <i aria-hidden="true">→</i></span>
    </span>
  </button>`).join('');
$$('.menu-card').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 70}ms`;
  revealObserver.observe(el);
});

// Product dialog
const productDialog = $('[data-product-dialog]');
function openProduct(slug) {
  const item = menuItems.find(x => x.slug === slug); if (!item) return;
  $('[data-dialog-image]').src = `assets/menu/${item.slug}.webp`;
  $('[data-dialog-image]').alt = item.name;
  $('[data-dialog-en]').textContent = item.en;
  $('[data-dialog-name]').textContent = item.name;
  $('[data-dialog-description]').textContent = item.description;
  $('[data-dialog-notes]').textContent = item.notes;
  $('[data-dialog-calorie]').textContent = `${item.calories} kcal`;
  $('[data-dialog-tags]').innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
  productDialog.style.setProperty('--dialog-color', item.color);
  productDialog.showModal(); document.body.classList.add('is-locked');
}
rail.addEventListener('click', e => { const card=e.target.closest('[data-product]'); if(card) openProduct(card.dataset.product); });
$('[data-dialog-close]')?.addEventListener('click', () => productDialog.close());
productDialog?.addEventListener('click', e => { if(e.target === productDialog) productDialog.close(); });
productDialog?.addEventListener('close', () => document.body.classList.remove('is-locked'));

// Kuppa hidden coupon event
const kuppa = $('[data-kuppa]');
const kuppaVideo = $('.kuppa video');
const couponDialog = $('[data-coupon-dialog]');
const isDemo = new URLSearchParams(location.search).get('demo') === '1';
const todayKey = new Date().toISOString().slice(0,10);
const seenKey = `sapro-kuppa-seen-${todayKey}`;
const usedKey = `sapro-kuppa-used-${todayKey}`;
let expiryAt = null;
let clockTimer = null;

const safeSpots = [
  {top:'12%',left:'2%'},{top:'18%',right:'2%'},{bottom:'5%',left:'3%'},{bottom:'7%',right:'3%'},{top:'52%',right:'2%'}
];
function scheduleKuppa() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!isDemo && storage.get(seenKey)) return;
  const delay = isDemo ? 5500 : 45000 + Math.random()*30000;
  setTimeout(showKuppa, delay);
}
function showKuppa() {
  const spot = safeSpots[Math.floor(Math.random()*safeSpots.length)];
  kuppa.removeAttribute('style'); Object.assign(kuppa.style, spot);
  kuppa.setAttribute('aria-hidden','false'); kuppa.classList.add('is-visible');
  kuppaVideo.currentTime = 0; kuppaVideo.play().catch(()=>{});
  setTimeout(() => { if(!kuppa.classList.contains('is-caught')) hideKuppa(); }, 9000);
}
function hideKuppa() { kuppa.classList.remove('is-visible','is-caught'); kuppa.setAttribute('aria-hidden','true'); }
$('.kuppa-button')?.addEventListener('click', () => {
  kuppa.classList.add('is-caught'); storage.set(seenKey,'1');
  setTimeout(() => { hideKuppa(); openCoupon(); }, 650);
});

function openCoupon() {
  expiryAt = new Date(Date.now() + 30*60*1000);
  const stamp = new Date();
  const code = `KUPPA-${String(stamp.getMonth()+1).padStart(2,'0')}${String(stamp.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`;
  $('[data-coupon-code]').textContent = code;
  const expiry = `${String(expiryAt.getHours()).padStart(2,'0')}:${String(expiryAt.getMinutes()).padStart(2,'0')}`;
  $('[data-coupon-expiry]').textContent = `有効期限 ${expiry}`;
  createConfetti(); updateCouponClock(); clockTimer=setInterval(updateCouponClock,1000);
  const useBtn=$('[data-coupon-use]');
  if(storage.get(usedKey)) { useBtn.textContent='使用済み'; useBtn.classList.add('is-used'); useBtn.disabled=true; }
  couponDialog.showModal(); document.body.classList.add('is-locked');
  $('.coupon-dog video')?.play().catch(()=>{});
}
function updateCouponClock() {
  const now=new Date(); $('[data-coupon-clock]').textContent = now.toLocaleTimeString('ja-JP',{hour12:false});
  if(expiryAt && now>expiryAt){ const btn=$('[data-coupon-use]');btn.textContent='有効期限切れ';btn.disabled=true;btn.classList.add('is-used'); }
}
function createConfetti(){
  const wrap=$('.coupon-confetti'); const colors=['#c92739','#b78a3d','#6e973b','#d95c7c'];
  wrap.innerHTML=Array.from({length:28},(_,i)=>`<i style="left:${Math.random()*100}%;--c:${colors[i%colors.length]};--d:${3+Math.random()*3}s;--delay:${-Math.random()*5}s"></i>`).join('');
}
$$('[data-coupon-close]').forEach(btn => btn.addEventListener('click',()=>couponDialog.close()));
couponDialog?.addEventListener('click',e=>{if(e.target===couponDialog)couponDialog.close()});
couponDialog?.addEventListener('close',()=>{clearInterval(clockTimer);document.body.classList.remove('is-locked')});
$('[data-coupon-use]')?.addEventListener('click', e => {
  if(e.currentTarget.dataset.confirmed !== '1'){
    e.currentTarget.textContent='スタッフ確認：もう一度タップ'; e.currentTarget.dataset.confirmed='1'; return;
  }
  storage.set(usedKey,'1'); e.currentTarget.textContent='使用済み'; e.currentTarget.classList.add('is-used'); e.currentTarget.disabled=true;
});

// Demo / QA shortcut: press K to summon Kuppa.
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='k' && !kuppa.classList.contains('is-visible')) showKuppa()});
scheduleKuppa();
