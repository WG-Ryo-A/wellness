const menuItems = [
  {slug:'tropical-choco',no:'01',en:'CHOCOLATE MANGO',name:'チョコレートマンゴー',color:'#9b5d3c',notes:'マンゴー・カカオ・アボカド',description:'マンゴーの濃厚な甘みとカカオの香り。デザート感のある、リッチな飲み心地。',tags:['RICH','PROTEIN','COLLAGEN']},
  {slug:'green-apple',no:'02',en:'FRESH APPLE',name:'フレッシュアップル',color:'#6e973b',notes:'りんご・ほうれん草・アボカド',description:'りんごの爽やかさを軸にした、すっきり飲みやすいグリーンスムージー。',tags:['GREEN','FRESH','PROTEIN']},
  {slug:'apple-banana',no:'03',en:'KIWI BANANA',name:'キウイバナナ',color:'#c97887',notes:'りんご・バナナ・キウイ',description:'果実のやさしい甘みとヨーグルトのまろやかさ。朝にも選びやすい軽やかな一杯。',tags:['FRUITY','YOGURT','COLLAGEN']},
  {slug:'green-banana',no:'04',en:'GREEN BANANA',name:'グリーンバナナ',color:'#477728',notes:'葉野菜・バナナ・りんご',description:'グリーン野菜にバナナの自然な甘みを重ねた、まろやかで満足感のある味わい。',tags:['GREEN','MILD','PROTEIN']},
  {slug:'matcha-milk',no:'05',en:'MATCHA MILK',name:'抹茶ミルク',color:'#2f6b35',notes:'抹茶・バナナ・植物素材',description:'抹茶の香りとやさしい甘み。和のニュアンスを楽しむ、落ち着いた一杯。',tags:['JAPANESE','MATCHA','COLLAGEN']},
  {slug:'acai-banana',no:'06',en:'ACAI BANANA',name:'アサイーバナナ',color:'#67315d',notes:'アサイー・バナナ・ブルーベリー',description:'アサイーとベリーの深い果実感。フルーティーで後味はすっきり。',tags:['BERRY','FRUITY','PROTEIN']},
  {slug:'tropical-milk',no:'07',en:'MANGO PINE',name:'マンゴーパイン',color:'#d7a318',notes:'マンゴー・パイン・ヨーグルト',description:'マンゴーとパインの明るい香り。ヨーグルトでまろやかに整えたトロピカルテイスト。',tags:['TROPICAL','YOGURT','COLLAGEN']},
  {slug:'mix-berry',no:'08',en:'MIX BERRY',name:'ミックスベリー',color:'#b94c73',notes:'ストロベリー・ブルーベリー・ラズベリー',description:'3種のベリーの甘酸っぱさとヨーグルトのまろやかさ。軽快で華やかな味わい。',tags:['BERRY','FRESH','PROTEIN']},
  {slug:'choco-banana',no:'09',en:'CHOCO BANANA',name:'チョコバナナ',color:'#6c3a24',notes:'バナナ・カカオ・アボカド',description:'バナナの自然な甘みとカカオの香り。飲み応えがありながら重すぎない一杯。',tags:['RICH','CACAO','COLLAGEN']},
  {slug:'hojicha-milk',no:'10',en:'HOJICHA MILK',name:'ほうじ茶ミルク',color:'#806140',notes:'ほうじ茶・バナナ・アボカド',description:'香ばしいほうじ茶とまろやかなコク。ほっと落ち着く和のスムージー。',tags:['JAPANESE','ROASTED','PROTEIN']},
  {slug:'coffee-milk',no:'11',en:'COFFEE MILK',name:'コーヒーミルク',color:'#704725',notes:'コーヒー・バナナ・アボカド',description:'コーヒーの香ばしさと自然な甘み。満足感を重ねた、大人のリラックステイスト。',tags:['COFFEE','RICH','COLLAGEN']},
  {slug:'tropical-banana',no:'12',en:'TROPICAL BANANA',name:'トロピカルバナナ',color:'#c29f27',notes:'バナナ・パイン・ヨーグルト',description:'バナナとパインに、ヨーグルトを合わせたまろやかな味わい。',tags:['TROPICAL','PROTEIN','COLLAGEN'],noImage:true}
];

const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
const storage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
const menuToggle=$('.menu-toggle'),mobileMenu=$('.mobile-menu');
function setMenu(open){menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');mobileMenu.classList.toggle('is-open',open);mobileMenu.setAttribute('aria-hidden',String(!open));mobileMenu.inert=!open;}
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
$$('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){setMenu(false);menuToggle.focus();}});
$$('.custom-steps details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)$$('.custom-steps details').forEach(other=>{if(other!==item)other.open=false})}));
const rail=$('[data-menu-rail]');
rail.innerHTML=menuItems.map(item=>`<button class="menu-card" type="button" data-product="${item.slug}" aria-label="${item.name}のメニューを拡大"><span class="menu-card__image"><img src="assets/menu/posters/${item.slug}.jpg" alt="${item.name}のメニュー画像" loading="lazy" width="941" height="1672" draggable="false"></span></button>`).join('');
const stride=()=>$('.menu-card',rail).getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap);
function updateRail(){const index=Math.max(0,Math.min(menuItems.length-1,Math.round(rail.scrollLeft/stride())));$('[data-menu-current]').textContent=String(index+1).padStart(2,'0');$('[data-pick-prev]').disabled=rail.scrollLeft<2;$('[data-pick-next]').disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-2;}
rail.addEventListener('scroll',()=>requestAnimationFrame(updateRail),{passive:true});window.addEventListener('resize',updateRail);
$('[data-pick-prev]').addEventListener('click',()=>rail.scrollBy({left:-stride(),behavior:reducedMotion?'instant':'smooth'}));
$('[data-pick-next]').addEventListener('click',()=>rail.scrollBy({left:stride(),behavior:reducedMotion?'instant':'smooth'}));
let drag=null,suppressClick=false;
rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,scroll:rail.scrollLeft,id:e.pointerId};suppressClick=false;});
rail.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.x)>7){suppressClick=true;rail.setPointerCapture(drag.id);rail.classList.add('is-dragging');rail.scrollLeft=drag.scroll-(e.clientX-drag.x);}});
function endDrag(){drag=null;rail.classList.remove('is-dragging');setTimeout(()=>suppressClick=false,0)}
rail.addEventListener('pointerup',endDrag);rail.addEventListener('pointercancel',endDrag);rail.addEventListener('lostpointercapture',endDrag);updateRail();
const productDialog=$('[data-product-dialog]');
function openProduct(slug){const item=menuItems.find(p=>p.slug===slug);if(!item)return;const img=$('[data-dialog-image]');img.src=`assets/menu/posters/${item.slug}.jpg`;img.alt=`${item.name}のメニュー画像`;$('[data-dialog-en]').textContent=item.en;$('[data-dialog-name]').textContent=item.name;$('[data-dialog-description]').textContent=item.description;$('[data-dialog-notes]').textContent=item.notes;$('[data-dialog-tags]').innerHTML=item.tags.map(t=>`<span>${t}</span>`).join('');productDialog.showModal();document.body.classList.add('is-locked');}
rail.addEventListener('click',e=>{if(suppressClick){e.preventDefault();return}const card=e.target.closest('[data-product]');if(card)openProduct(card.dataset.product)});
$('[data-dialog-close]').addEventListener('click',()=>productDialog.close());
for(const dialog of $$('dialog')){dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>document.body.classList.remove('is-locked'));}
// Kuppa coupon: existing store event, with Tokyo day and persistent claim/expiry.
const kuppa=$('[data-kuppa]'),kuppaButton=$('.kuppa-button'),kuppaVideo=$('.kuppa video'),couponDialog=$('[data-coupon-dialog]');
const isDemo=new URLSearchParams(location.search).get('demo')==='1';
function dayKey(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
const seenKey=()=>`sapro-kuppa-seen-${dayKey()}`,usedKey=()=>`sapro-kuppa-used-${dayKey()}`,claimKey=()=>`sapro-kuppa-claim-${dayKey()}`;
let claim=null,clockTimer=null,hideTimer=null;
try{claim=JSON.parse(storage.get(claimKey())||'null')}catch{}
const savedCoupon=$('[data-saved-coupon]');savedCoupon.hidden=!claim;
function hideKuppa(){kuppa.classList.remove('is-visible','is-caught');kuppa.setAttribute('aria-hidden','true');kuppaButton.tabIndex=-1;kuppaVideo.pause();}
function showKuppa(){if($('dialog[open]')||(!isDemo&&(storage.get(seenKey())||storage.get(usedKey()))))return;kuppa.style.right='20px';kuppa.style.bottom='25px';kuppa.setAttribute('aria-hidden','false');kuppaButton.tabIndex=0;kuppa.classList.add('is-visible');if(!reducedMotion)kuppaVideo.play().catch(()=>{});clearTimeout(hideTimer);hideTimer=setTimeout(hideKuppa,12000);}
function refreshCoupon(){const now=new Date();$('[data-coupon-clock]').textContent=now.toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo',hour12:false});const b=$('[data-coupon-use]');if(storage.get(usedKey())){b.textContent='使用済み';b.disabled=true}else if(!claim||now.getTime()>claim.expires||claim.day!==dayKey()){b.textContent='有効期限切れ';b.disabled=true}else{b.disabled=false;if(b.dataset.confirmed!=='1')b.textContent='スタッフ確認後に使用する';}}
function openCoupon(){if(!claim)return;$('[data-coupon-code]').textContent=claim.code;$('[data-coupon-expiry]').textContent='有効期限 '+new Date(claim.expires).toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',hour12:false});$('[data-coupon-use]').dataset.confirmed='0';refreshCoupon();clearInterval(clockTimer);clockTimer=setInterval(refreshCoupon,1000);couponDialog.showModal();document.body.classList.add('is-locked');if(!reducedMotion)$('.coupon-dog video').play().catch(()=>{});}
kuppaButton.addEventListener('click',()=>{clearTimeout(hideTimer);hideKuppa();storage.set(seenKey(),'1');if(!claim){claim={day:dayKey(),expires:Date.now()+30*60*1000,code:`KUPPA-${dayKey().replaceAll('-','')}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`};storage.set(claimKey(),JSON.stringify(claim));}savedCoupon.hidden=false;openCoupon();});
savedCoupon.addEventListener('click',openCoupon);$$('[data-coupon-close]').forEach(b=>b.addEventListener('click',()=>couponDialog.close()));
couponDialog.addEventListener('close',()=>{clearInterval(clockTimer);$('.coupon-dog video').pause();});
$('[data-coupon-use]').addEventListener('click',e=>{refreshCoupon();const b=e.currentTarget;if(b.disabled)return;if(b.dataset.confirmed!=='1'){b.dataset.confirmed='1';b.textContent='スタッフ確認：もう一度タップ';return}storage.set(usedKey(),'1');refreshCoupon();});
window.addEventListener('keydown',e=>{if(isDemo&&e.key.toLowerCase()==='k'&&!e.ctrlKey&&!e.metaKey)showKuppa()});
if(!claim&&!storage.get(seenKey())&&!storage.get(usedKey()))setTimeout(showKuppa,isDemo?5000:45000+Math.random()*30000);
