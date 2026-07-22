const menuItems = [
  {slug:'tropical-choco',no:'01',en:'TROPICAL CHOCO',name:'トロピカルチョコ',calories:254,color:'#9b5d3c',notes:'マンゴー・カカオ・アボカド',description:'マンゴーの濃厚な甘みとカカオの香り。デザート感のある、リッチな飲み心地。',tags:['RICH','PROTEIN','COLLAGEN']},
  {slug:'green-apple',no:'02',en:'GREEN APPLE',name:'グリーンアップル',calories:210,color:'#6e973b',notes:'りんご・ほうれん草・アボカド',description:'りんごの爽やかさを軸にした、すっきり飲みやすいグリーンスムージー。',tags:['GREEN','FRESH','PROTEIN']},
  {slug:'apple-banana',no:'03',en:'APPLE BANANA',name:'アップルバナナ',calories:150,color:'#c97887',notes:'りんご・バナナ・キウイ',description:'果実のやさしい甘みとヨーグルトのまろやかさ。朝にも選びやすい軽やかな一杯。',tags:['FRUITY','YOGURT','COLLAGEN']},
  {slug:'green-banana',no:'04',en:'GREEN BANANA',name:'グリーンバナナ',calories:210,color:'#477728',notes:'葉野菜・バナナ・りんご',description:'グリーン野菜にバナナの自然な甘みを重ねた、まろやかで満足感のある味わい。',tags:['GREEN','MILD','PROTEIN']},
  {slug:'matcha-milk',no:'05',en:'MATCHA MILK',name:'抹茶ミルク',calories:253,color:'#2f6b35',notes:'抹茶・バナナ・植物素材',description:'抹茶の香りとやさしい甘み。和のニュアンスを楽しむ、落ち着いた一杯。',tags:['JAPANESE','MATCHA','COLLAGEN']},
  {slug:'acai-banana',no:'06',en:'ACAI BANANA',name:'アサイーバナナ',calories:150,color:'#67315d',notes:'アサイー・バナナ・ブルーベリー',description:'アサイーとベリーの深い果実感。フルーティーで後味はすっきり。',tags:['BERRY','FRUITY','PROTEIN']},
  {slug:'tropical-milk',no:'07',en:'TROPICAL MILK',name:'トロピカルミルク',calories:148,color:'#d7a318',notes:'マンゴー・パイン・ヨーグルト',description:'マンゴーとパインの明るい香り。ヨーグルトでまろやかに整えたトロピカルテイスト。',tags:['TROPICAL','YOGURT','COLLAGEN']},
  {slug:'mix-berry',no:'08',en:'MIX BERRY',name:'ミックスベリー',calories:137,color:'#b94c73',notes:'ストロベリー・ブルーベリー・ラズベリー',description:'3種のベリーの甘酸っぱさとヨーグルトのまろやかさ。軽快で華やかな味わい。',tags:['BERRY','FRESH','PROTEIN']},
  {slug:'choco-banana',no:'09',en:'CHOCO BANANA',name:'チョコバナナ',calories:210,color:'#6c3a24',notes:'バナナ・カカオ・アボカド',description:'バナナの自然な甘みとカカオの香り。飲み応えがありながら重すぎない一杯。',tags:['RICH','CACAO','COLLAGEN']},
  {slug:'hojicha-milk',no:'10',en:'HOJICHA MILK',name:'ほうじ茶ミルク',calories:265,color:'#806140',notes:'ほうじ茶・バナナ・アボカド',description:'香ばしいほうじ茶とまろやかなコク。ほっと落ち着く和のスムージー。',tags:['JAPANESE','ROASTED','PROTEIN']},
  {slug:'coffee-milk',no:'11',en:'COFFEE MILK',name:'コーヒーミルク',calories:281,color:'#704725',notes:'コーヒー・バナナ・アボカド',description:'コーヒーの香ばしさと自然な甘み。満足感を重ねた、大人のリラックステイスト。',tags:['COFFEE','RICH','COLLAGEN']}
];

const customSteps = [
  {title:'今日ほしい感覚から。',text:'リフレッシュしたい日、しっかり満たしたい日。今の自分を起点に一杯を組み立てます。',image:'mix-berry.webp',theme:'#c85178'},
  {title:'好きな味わいを軸に。',text:'フルーティー、グリーン、リッチ、やさしい和の味。飲みたいと思える方向から選びます。',image:'green-apple.webp',theme:'#698e36'},
  {title:'自分だけの仕上がりへ。',text:'一日のシーンや好みに合わせて仕上げを調整。決まった正解ではなく、あなたに合う一杯へ。',image:'tropical-choco.webp',theme:'#8e5637'}
];

const $ = (selector,scope=document)=>scope.querySelector(selector);
const $$ = (selector,scope=document)=>[...scope.querySelectorAll(selector)];
const storage={
  get(key){try{return localStorage.getItem(key)}catch{return null}},
  set(key,value){try{localStorage.setItem(key,value)}catch{}}
};

setTimeout(()=>$('.page-loader')?.classList.add('is-hidden'),520);

// Header and compact mobile nav
const header=$('[data-header]');
const menuToggle=$('.menu-toggle');
const mobileMenu=$('.mobile-menu');
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',scrollY>28),{passive:true});
menuToggle?.addEventListener('click',()=>{
  const open=menuToggle.getAttribute('aria-expanded')!=='true';
  menuToggle.setAttribute('aria-expanded',String(open));
  mobileMenu.classList.toggle('is-open',open);
  mobileMenu.setAttribute('aria-hidden',String(!open));
});
$$('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{
  menuToggle?.setAttribute('aria-expanded','false');
  mobileMenu?.classList.remove('is-open');
  mobileMenu?.setAttribute('aria-hidden','true');
}));

// Reveal
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.12});
$$('.reveal').forEach((el,i)=>{
  el.style.transitionDelay=`${Math.min(i%4,3)*60}ms`;
  revealObserver.observe(el);
});

// Hero rotation
const heroImages=$$('.hero-image');
const heroName=$('[data-hero-name]');
const heroNames=['MIX BERRY','GREEN APPLE','TROPICAL CHOCO'];
let heroIndex=0;
function changeHero(){
  if(!heroImages.length)return;
  heroImages[heroIndex].classList.remove('is-active');
  heroIndex=(heroIndex+1)%heroImages.length;
  heroImages[heroIndex].classList.add('is-active');
  document.documentElement.style.setProperty('--accent',heroImages[heroIndex].dataset.theme);
  if(heroName)heroName.textContent=heroNames[heroIndex];
}
setInterval(changeHero,5200);

const tilt=$('[data-tilt]');
tilt?.addEventListener('pointermove',event=>{
  if(matchMedia('(hover:none)').matches)return;
  const rect=tilt.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width-.5;
  const y=(event.clientY-rect.top)/rect.height-.5;
  tilt.style.transform=`perspective(1000px) rotateY(${x*3.5}deg) rotateX(${-y*3.5}deg)`;
});
tilt?.addEventListener('pointerleave',()=>tilt.style.transform='');

// Custom story tabs
const customPreview=$('[data-custom-preview]');
$$('[data-custom-step]').forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.customStep);
  const step=customSteps[index];
  if(!step)return;
  $$('[data-custom-step]').forEach((tab,tabIndex)=>{
    const active=tabIndex===index;
    tab.classList.toggle('is-active',active);
    tab.setAttribute('aria-selected',String(active));
  });
  customPreview?.classList.add('is-changing');
  setTimeout(()=>{
    $('[data-custom-title]').textContent=step.title;
    $('[data-custom-text]').textContent=step.text;
    const image=$('[data-custom-image]');
    image.src=`assets/menu/${step.image}`;
    document.documentElement.style.setProperty('--accent',step.theme);
    customPreview?.classList.remove('is-changing');
  },220);
}));

// Staff original slider
const rail=$('[data-menu-rail]');
rail.innerHTML=menuItems.map(item=>`
  <button class="menu-card reveal" type="button" data-product="${item.slug}" style="--card-color:${item.color}" aria-label="${item.name}の詳細を見る">
    <span class="menu-card__image">
      <img src="assets/menu/${item.slug}.webp" alt="${item.name}" loading="lazy" />
      <span class="menu-card__number">${item.no}</span>
      <span class="menu-card__arrow" aria-hidden="true">↗</span>
    </span>
    <span class="menu-card__body">
      <span class="menu-card__overline">STAFF ORIGINAL / ${item.en}</span>
      <span class="menu-card__title-row">
        <span class="menu-card__name">${item.name}</span>
        <strong class="menu-card__calorie">${item.calories}<small>kcal</small></strong>
      </span>
      <span class="menu-card__description">${item.description}</span>
      <span class="menu-card__notes"><small>MAIN NOTES</small><span>${item.notes}</span></span>
      <span class="menu-card__detail">DETAIL <i aria-hidden="true">→</i></span>
    </span>
  </button>`).join('');
$$('.menu-card').forEach((card,i)=>{
  card.style.transitionDelay=`${(i%3)*55}ms`;
  revealObserver.observe(card);
});

const menuCurrent=$('[data-menu-current]');
const railProgress=$('[data-rail-progress]');
function cardStride(){
  const first=$('.menu-card',rail);
  if(!first)return 0;
  const style=getComputedStyle(rail);
  return first.getBoundingClientRect().width+parseFloat(style.gap||0);
}
function updateRailState(){
  const cards=$$('.menu-card',rail);
  if(!cards.length)return;
  const railRect=rail.getBoundingClientRect();
  let nearest=0;
  let distance=Infinity;
  cards.forEach((card,index)=>{
    const d=Math.abs(card.getBoundingClientRect().left-railRect.left);
    if(d<distance){distance=d;nearest=index}
  });
  if(menuCurrent)menuCurrent.textContent=String(nearest+1).padStart(2,'0');
  if(railProgress){
    const max=Math.max(1,rail.scrollWidth-rail.clientWidth);
    const ratio=Math.min(1,Math.max(0,rail.scrollLeft/max));
    railProgress.style.width=`${9.1+(90.9*ratio)}%`;
  }
}
rail.addEventListener('scroll',()=>requestAnimationFrame(updateRailState),{passive:true});
window.addEventListener('resize',updateRailState,{passive:true});
$('[data-pick-prev]')?.addEventListener('click',()=>rail.scrollBy({left:-cardStride(),behavior:'smooth'}));
$('[data-pick-next]')?.addEventListener('click',()=>rail.scrollBy({left:cardStride(),behavior:'smooth'}));

let dragging=false,startX=0,startScroll=0;
rail.addEventListener('pointerdown',event=>{
  if(event.pointerType==='touch')return;
  dragging=true;startX=event.clientX;startScroll=rail.scrollLeft;
  rail.classList.add('is-dragging');rail.setPointerCapture(event.pointerId);
});
rail.addEventListener('pointermove',event=>{
  if(!dragging)return;
  rail.scrollLeft=startScroll-(event.clientX-startX);
});
rail.addEventListener('pointerup',()=>{dragging=false;rail.classList.remove('is-dragging')});
rail.addEventListener('pointercancel',()=>{dragging=false;rail.classList.remove('is-dragging')});
updateRailState();

// Product details
const productDialog=$('[data-product-dialog]');
function openProduct(slug){
  const item=menuItems.find(product=>product.slug===slug);
  if(!item)return;
  const image=$('[data-dialog-image]');
  image.src=`assets/menu/${item.slug}.webp`;image.alt=item.name;
  $('[data-dialog-en]').textContent=item.en;
  $('[data-dialog-name]').textContent=item.name;
  $('[data-dialog-description]').textContent=item.description;
  $('[data-dialog-notes]').textContent=item.notes;
  $('[data-dialog-calorie]').textContent=`${item.calories} kcal`;
  $('[data-dialog-tags]').innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join('');
  productDialog.style.setProperty('--dialog-color',item.color);
  productDialog.showModal();document.body.classList.add('is-locked');
}
rail.addEventListener('click',event=>{
  if(dragging)return;
  const card=event.target.closest('[data-product]');
  if(card)openProduct(card.dataset.product);
});
$('[data-dialog-close]')?.addEventListener('click',()=>productDialog.close());
productDialog?.addEventListener('click',event=>{if(event.target===productDialog)productDialog.close()});
productDialog?.addEventListener('close',()=>document.body.classList.remove('is-locked'));

// Kuppa hidden coupon event
const kuppa=$('[data-kuppa]');
const kuppaVideo=$('.kuppa video');
const couponDialog=$('[data-coupon-dialog]');
const isDemo=new URLSearchParams(location.search).get('demo')==='1';
const todayKey=new Date().toISOString().slice(0,10);
const seenKey=`sapro-kuppa-seen-${todayKey}`;
const usedKey=`sapro-kuppa-used-${todayKey}`;
let expiryAt=null;
let clockTimer=null;
const safeSpots=[{top:'12%',left:'2%'},{top:'18%',right:'2%'},{bottom:'5%',left:'3%'},{bottom:'7%',right:'3%'},{top:'52%',right:'2%'}];
function scheduleKuppa(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  if(!isDemo&&storage.get(seenKey))return;
  setTimeout(showKuppa,isDemo?5000:45000+Math.random()*30000);
}
function showKuppa(){
  const spot=safeSpots[Math.floor(Math.random()*safeSpots.length)];
  kuppa.removeAttribute('style');Object.assign(kuppa.style,spot);
  kuppa.setAttribute('aria-hidden','false');kuppa.classList.add('is-visible');
  kuppaVideo.currentTime=0;kuppaVideo.play().catch(()=>{});
  setTimeout(()=>{if(!kuppa.classList.contains('is-caught'))hideKuppa()},9000);
}
function hideKuppa(){kuppa.classList.remove('is-visible','is-caught');kuppa.setAttribute('aria-hidden','true')}
$('.kuppa-button')?.addEventListener('click',()=>{
  kuppa.classList.add('is-caught');storage.set(seenKey,'1');
  setTimeout(()=>{hideKuppa();openCoupon()},620);
});
function openCoupon(){
  expiryAt=new Date(Date.now()+30*60*1000);
  const stamp=new Date();
  const code=`KUPPA-${String(stamp.getMonth()+1).padStart(2,'0')}${String(stamp.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`;
  $('[data-coupon-code]').textContent=code;
  $('[data-coupon-expiry]').textContent=`有効期限 ${String(expiryAt.getHours()).padStart(2,'0')}:${String(expiryAt.getMinutes()).padStart(2,'0')}`;
  createConfetti();updateCouponClock();clockTimer=setInterval(updateCouponClock,1000);
  const useButton=$('[data-coupon-use]');
  if(storage.get(usedKey)){useButton.textContent='使用済み';useButton.classList.add('is-used');useButton.disabled=true}
  couponDialog.showModal();document.body.classList.add('is-locked');
  $('.coupon-dog video')?.play().catch(()=>{});
}
function updateCouponClock(){
  const now=new Date();$('[data-coupon-clock]').textContent=now.toLocaleTimeString('ja-JP',{hour12:false});
  if(expiryAt&&now>expiryAt){const button=$('[data-coupon-use]');button.textContent='有効期限切れ';button.disabled=true;button.classList.add('is-used')}
}
function createConfetti(){
  const wrap=$('.coupon-confetti');const colors=['#c92739','#b78a3d','#6e973b','#d95c7c'];
  wrap.innerHTML=Array.from({length:28},(_,index)=>`<i style="left:${Math.random()*100}%;--c:${colors[index%colors.length]};--d:${3+Math.random()*3}s;--delay:${-Math.random()*5}s"></i>`).join('');
}
$$('[data-coupon-close]').forEach(button=>button.addEventListener('click',()=>couponDialog.close()));
couponDialog?.addEventListener('click',event=>{if(event.target===couponDialog)couponDialog.close()});
couponDialog?.addEventListener('close',()=>{clearInterval(clockTimer);document.body.classList.remove('is-locked')});
$('[data-coupon-use]')?.addEventListener('click',event=>{
  if(event.currentTarget.dataset.confirmed!=='1'){
    event.currentTarget.textContent='スタッフ確認：もう一度タップ';event.currentTarget.dataset.confirmed='1';return;
  }
  storage.set(usedKey,'1');event.currentTarget.textContent='使用済み';event.currentTarget.classList.add('is-used');event.currentTarget.disabled=true;
});
window.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='k'&&!kuppa.classList.contains('is-visible'))showKuppa()});
scheduleKuppa();
