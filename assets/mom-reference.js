(()=>{
if(window.__momLoaded)return;window.__momLoaded=true;
const root=window.Shopify?.routes?.root||'/',en=document.documentElement.lang.startsWith('en');
const words={error:en?'Something went wrong. Please try again.':'İşlem tamamlanamadı. Lütfen tekrar deneyin.',add:en?'ADD TO CART':'SEPETE EKLE',added:en?'ADDED TO CART':'SEPETE EKLENDİ',sold:en?'SOLD OUT':'TÜKENDİ',stock:en?'In stock':'Stokta',copied:en?'COPIED':'KOPYALANDI'};
const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};let lastFocus,deadline=0,timer,busy=false;
function tick(){const r=Math.max(0,Math.ceil((deadline-Date.now())/1000)),el=document.querySelector('#MomCart [data-time]');if(el)el.textContent=`${String(Math.floor(r/60)).padStart(2,'0')}:${String(r%60).padStart(2,'0')}`;if(!r)clearInterval(timer)}
function show(id){const d=document.getElementById(id);if(!d)return;document.querySelectorAll('dialog.mom-dialog[open]').forEach(openDialog=>{if(openDialog!==d)close(openDialog)});lastFocus=document.activeElement;if(!d.open)d.showModal();d.classList.add('open');document.documentElement.style.overflow='hidden';if(id==='MomCart'){deadline=Date.now()+600000;clearInterval(timer);tick();timer=setInterval(tick,1000)}document.querySelector('.discount-teaser')?.setAttribute('hidden','')}
function close(d){if(!d)return;d.classList.remove('open');d.close();if(d.id==='MomOffer')storage.set('mind-discount-dismissed',String(Date.now()));if(d.id==='MomCart')clearInterval(timer);if(!document.querySelector('dialog[open]')){document.documentElement.style.overflow='';document.querySelector('.discount-teaser')?.removeAttribute('hidden')}lastFocus?.focus?.()}
function step(n){document.getElementById('MomOffer')?.setAttribute('data-active-step',String(n));document.querySelectorAll('[data-offer-step]').forEach(x=>x.hidden=x.dataset.offerStep!==String(n));const decline=document.querySelector('.discount-decline');if(decline)decline.hidden=n===3}
async function refresh(html){if(!html){const r=await fetch(root+'?sections=mom-cart',{headers:{Accept:'application/json'}});if(!r.ok)throw Error(words.error);html=(await r.json())['mom-cart']}if(!html)throw Error(words.error);const doc=new DOMParser().parseFromString(html,'text/html'),next=doc.querySelector('[data-cart-content]'),current=document.querySelector('#MomCart [data-cart-content]');if(!next||!current)throw Error(words.error);current.replaceWith(next);const count=Number(next.querySelector('[data-count]')?.dataset.count||0);document.querySelectorAll('[data-mom-count]').forEach(x=>{x.textContent=String(count);x.hidden=count===0});tick()}
document.addEventListener('click',async e=>{
const open=e.target.closest('[data-mom-open]');if(open){e.preventDefault();show(open.dataset.momOpen);return}const shut=e.target.closest('[data-mom-close]');if(shut){close(shut.closest('dialog'));return}
if(e.target.closest('[data-copy]')){try{await navigator.clipboard.writeText(document.getElementById('MomOffer').dataset.code);document.querySelector('[data-copy] small').textContent=words.copied}catch{const span=document.querySelector('[data-copy] span'),selection=getSelection(),range=document.createRange();range.selectNodeContents(span);selection.removeAllRanges();selection.addRange(range)}return}
const thumb=e.target.closest('button[data-image]');if(thumb){setImage(thumb.dataset.image,thumb.dataset.imageAlt);return}
const quantity=e.target.closest('[data-product-quantity]');if(quantity){const q=document.getElementById('MomQuantity');if(Number(quantity.dataset.productQuantity)>0)q.stepUp();else q.stepDown();q.value=String(Math.max(Number(q.min)||1,Number(q.value)));return}
const change=e.target.closest('[data-cart-key]');if(change){if(busy)return;busy=true;change.disabled=true;const box=document.getElementById('MomCart');box?.setAttribute('aria-busy','true');try{const r=await fetch(root+'cart/change.js',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({id:change.dataset.cartKey,quantity:Number(change.dataset.quantity),sections:['mom-cart'],sections_url:location.pathname})}),data=await r.json();if(!r.ok)throw Error(data.description||data.message||words.error);await refresh(data.sections?.['mom-cart'])}catch(err){const el=document.querySelector('[data-cart-error]');if(el)el.textContent=err.message;change.disabled=false}finally{busy=false;box?.removeAttribute('aria-busy')}return}
const arrow=e.target.closest('[data-review-direction]'),dot=e.target.closest('[data-review-index]');if(arrow||dot){const section=(arrow||dot).closest('.reviews'),track=section.querySelector('.review-cards'),width=(track.firstElementChild?.getBoundingClientRect().width||300)+16;if(arrow)track.scrollBy({left:Number(arrow.dataset.reviewDirection)*width,behavior:'smooth'});else track.scrollTo({left:Number(dot.dataset.reviewIndex)*width,behavior:'smooth'})}
});
function variantData(){try{return JSON.parse(document.getElementById('MomVariantData')?.textContent||'[]')}catch{return []}}
function formatMoney(cents){const currency=window.Shopify?.currency?.active||'TRY',value=Number(cents||0)/100;if(currency==='TRY')return `${new Intl.NumberFormat(en?'en-US':'tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)} TL`;return new Intl.NumberFormat(en?'en-US':'tr-TR',{style:'currency',currency}).format(value)}
function productVariant(updateUrl=true){
 const form=document.getElementById('MomProductForm');if(!form)return;
 const choices=[...form.querySelectorAll('[data-option-position]:checked')].sort((a,b)=>Number(a.dataset.optionPosition)-Number(b.dataset.optionPosition)).map(x=>x.value);
 const variants=variantData(),selected=variants.find(v=>choices.length?v.options.every((x,i)=>x===choices[i]):String(v.id)===form.querySelector('[name="id"]').value);
 form.querySelectorAll('.mom-option-group').forEach(group=>{const checked=group.querySelector('input:checked');group.querySelector('[data-option-label]').textContent=checked?.value||''});
 form.querySelectorAll('[data-option-position]').forEach(input=>{const position=Number(input.dataset.optionPosition),exists=variants.some(v=>v.available&&v.options.every((value,i)=>value===(i===position?input.value:choices[i])));input.closest('.mom-variant').classList.toggle('selected',input.checked);input.closest('.mom-variant').classList.toggle('is-unavailable',!exists)});
 const button=form.querySelector('[data-submit]'),available=Boolean(selected?.available);button.disabled=!available;button.textContent=selected?(available?words.add:words.sold):(en?'UNAVAILABLE':'BU SEÇENEK MEVCUT DEĞİL');
 const select=form.querySelector('[name="id"]');select.value=selected?String(selected.id):'';
 const payment=form.querySelector('.mom-dynamic-checkout');if(payment)payment.hidden=!available;
 updateRestock(selected);
 if(!selected)return;
 const price=document.querySelector('.detail-price[data-price]');price.textContent=formatMoney(selected.price);if(selected.compare){const old=document.createElement('s');old.textContent=formatMoney(selected.compare);price.append(' ',old)}
 const q=document.getElementById('MomQuantity');q.min=selected.min||1;q.step=selected.step||1;if(selected.max)q.max=selected.max;else q.removeAttribute('max');q.value=q.min;
 if(selected.image)setImage(selected.image);
 if(updateUrl){const url=new URL(location.href);url.searchParams.set('variant',selected.id);history.replaceState({},'',url);}
 select.dispatchEvent(new Event('change',{bubbles:true}));
}
function updateRestock(selected){
 const panel=document.querySelector('[data-restock]');if(!panel)return;
 const response=panel.querySelector('[data-restock-response]'),requestable=Boolean(selected&&!selected.available);
 panel.hidden=!requestable&&!response;
 panel.querySelectorAll('input,button').forEach(input=>input.disabled=!requestable);
 if(!selected)return;
 const title=selected.options.join(' / '),url=new URL(panel.dataset.productUrl,location.origin);url.searchParams.set('variant',selected.id);
 const values={'[data-restock-option]':title,'[data-restock-id]':String(selected.id),'[data-restock-url]':url.href,'[data-restock-body]':`Stok bildirimi talebi: ${panel.dataset.productTitle} / ${title}. Varyant: ${selected.id}. ${url.href}`};
 Object.entries(values).forEach(([selector,value])=>{const input=panel.querySelector(selector);if(input)input.value=value});
 const label=panel.querySelector('[data-restock-variant]');if(label)label.textContent=`${panel.dataset.productTitle} · ${title}`;
}
function initRestock(){
 const panel=document.querySelector('[data-restock]');if(!panel||panel.dataset.bound)return;
 panel.dataset.bound='true';
 const response=panel.querySelector('[data-restock-response]');if(response){panel.hidden=false;response.focus();}
 panel.querySelector('form')?.addEventListener('submit',e=>{
  const id=document.querySelector('#MomProductForm [name="id"]')?.value,selected=variantData().find(v=>String(v.id)===id);
  if(!selected||selected.available){e.preventDefault();updateRestock(selected);document.querySelector('#MomProductForm [data-submit]')?.focus();return;}
  updateRestock(selected);
 });
}
function setImage(src,alt){const img=document.getElementById('MomMainImage'),zoom=document.getElementById('MomZoomImage');if(img){img.removeAttribute('srcset');img.src=src;if(alt)img.alt=alt}if(zoom){zoom.removeAttribute('srcset');zoom.src=src;if(alt)zoom.alt=alt}document.querySelectorAll('button[data-image]').forEach(x=>{const active=x.dataset.image===src;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))})}
function selectFeature(tab){const section=tab.closest('[data-featured]');section.querySelectorAll('[data-feature-tab]').forEach(x=>{const active=x===tab;x.setAttribute('aria-selected',String(active));x.tabIndex=active?0:-1});section.querySelectorAll('[data-feature-panel]').forEach(x=>x.hidden=x.dataset.featurePanel!==tab.dataset.featureTab);updateArrows(section)}
document.addEventListener('change',e=>{if(e.target.matches('[data-option-position]'))productVariant()});
document.addEventListener('keydown',e=>{if(e.target.matches('[data-feature-tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=[...e.target.closest('[role="tablist"]').querySelectorAll('[role="tab"]')],index=tabs.indexOf(e.target),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectFeature(tabs[next]);tabs[next].focus()}});
document.addEventListener('click',async e=>{
 const tab=e.target.closest('[data-feature-tab]');if(tab){selectFeature(tab);return}
 const arrow=e.target.closest('[data-feature-scroll]');if(arrow){const track=arrow.closest('[data-featured]').querySelector('[data-feature-panel]:not([hidden]) .mom-feature-track');track?.scrollBy({left:Number(arrow.dataset.featureScroll)*(track.clientWidth*.8),behavior:'smooth'});return}
 if(e.target.closest('[data-back-top]')){window.scrollTo({top:0,behavior:'smooth'});return}
 const cartStep=e.target.closest('[data-cart-page-step]');if(cartStep){const input=cartStep.parentElement.querySelector('input');if(Number(cartStep.dataset.cartPageStep)>0)input.stepUp();else input.stepDown();input.dispatchEvent(new Event('change',{bubbles:true}));return}
 const noteToggle=e.target.closest('[data-note-toggle]');if(noteToggle){const panel=noteToggle.parentElement.querySelector('.mom-note-panel');panel.hidden=!panel.hidden;noteToggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)panel.querySelector('textarea').focus();return}
 const save=e.target.closest('[data-note-save]');if(save){save.disabled=true;const panel=save.closest('.mom-note-panel'),status=panel.querySelector('[data-note-status]');status.textContent='';try{const r=await fetch(root+'cart/update.js',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({note:panel.querySelector('textarea').value})});if(!r.ok)throw Error(words.error);panel.hidden=true;const toggle=document.querySelector('[data-note-toggle]');toggle?.setAttribute('aria-expanded','false');toggle?.focus()}catch(err){status.textContent=err.message}finally{save.disabled=false}return}
});
document.addEventListener('submit',async e=>{const f=e.target;if(f.getAttribute('id')!=='MomProductForm')return;e.preventDefault();if(busy)return;busy=true;const button=f.querySelector('[data-submit]'),error=f.querySelector('[data-product-error]');button.disabled=true;error.textContent='';try{const body=new FormData(f);body.set('sections','mom-cart');body.set('sections_url',location.pathname);const r=await fetch(root+'cart/add.js',{method:'POST',body,headers:{Accept:'application/json'}}),data=await r.json();if(!r.ok)throw Error(data.description||data.message||words.error);await refresh(data.sections?.['mom-cart']);button.textContent=words.added;show('MomCart')}catch(err){error.textContent=err.message}finally{const v=variantData().find(v=>String(v.id)===f.querySelector('[name="id"]').value);button.disabled=!v?.available;button.textContent=v?.available?words.add:words.sold;busy=false}});
function initOffer(offer){
 if(!offer||offer.dataset.started)return;
 offer.dataset.started='true';
 const teaser=document.querySelector('.discount-teaser');
 if(offer.querySelector('.errors')){step(2);show('MomOffer');return}
 if(offer.querySelector('[data-offer-success]')){storage.set('mind-discount-subscribed','true');step(3);show('MomOffer');return}
 if(storage.get('mind-discount-subscribed')){step(3);teaser?.removeAttribute('hidden');return}
 teaser?.removeAttribute('hidden');
 if(offer.dataset.autoShow!=='true'||Date.now()-Number(storage.get('mind-discount-dismissed')||0)<604800000)return;
 let ready=false;
 const maybeShow=()=>{
  if(!offer.isConnected){window.removeEventListener('scroll',maybeShow);return}
  if(storage.get('mind-discount-subscribed')||Date.now()-Number(storage.get('mind-discount-dismissed')||0)<604800000){window.removeEventListener('scroll',maybeShow);return}
  if(!ready||scrollY<Math.min(400,document.documentElement.scrollHeight*.2)||document.querySelector('dialog[open]')||document.activeElement?.matches('input,textarea,select'))return;
  window.removeEventListener('scroll',maybeShow);show('MomOffer');
 };
 window.addEventListener('scroll',maybeShow,{passive:true});
 setTimeout(()=>{ready=true;maybeShow()},Number(offer.dataset.delay)||20000);
}
function init(){document.querySelectorAll('#MomProductForm').forEach(f=>{if(!f.dataset.enhanced){f.dataset.enhanced='true';f.classList.add('mom-enhanced');f.querySelector('.mom-option-groups')?.removeAttribute('hidden');productVariant(false)}});document.querySelectorAll('dialog.mom-dialog').forEach(d=>{if(d.dataset.bound)return;d.dataset.bound='true';d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='MomCart'&&d.querySelector('.mom-note-panel:not([hidden])')){closeNote();return}close(d)});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d)}})});document.querySelectorAll('.review-cards').forEach(track=>{if(track.dataset.bound)return;track.dataset.bound='true';track.addEventListener('scroll',()=>{const width=(track.firstElementChild?.getBoundingClientRect().width||1)+16,current=Math.round(track.scrollLeft/width);track.closest('.reviews').querySelectorAll('[data-review-index]').forEach((d,i)=>{d.classList.toggle('active',i===current);d.setAttribute('aria-current',String(i===current))})},{passive:true})});initOffer(document.getElementById('MomOffer'));}init();document.addEventListener('shopify:section:load',init);document.addEventListener('shopify:section:unload',()=>{if(!document.querySelector('dialog[open]'))document.documentElement.style.overflow=''});
function scrollTopButton(){document.querySelectorAll('[data-back-top]').forEach(x=>x.hidden=scrollY<500)}window.addEventListener('scroll',scrollTopButton,{passive:true});scrollTopButton();
let touchX=null;document.addEventListener('touchstart',e=>{if(e.target.closest('.product-main-media'))touchX=e.touches[0].clientX},{passive:true});document.addEventListener('touchend',e=>{if(touchX===null)return;const delta=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(delta)<50)return;const thumbs=[...document.querySelectorAll('.product-thumbs [data-image]')],current=thumbs.findIndex(x=>x.classList.contains('active')),next=thumbs[(current+(delta<0?1:-1)+thumbs.length)%thumbs.length];next?.click()},{passive:true});document.addEventListener('visibilitychange',tick);

function closeNote(){const panel=document.querySelector('.mom-note-panel');if(panel)panel.hidden=true;const toggle=document.querySelector('[data-note-toggle]');toggle?.setAttribute('aria-expanded','false');toggle?.focus()}
function updateArrows(section){const track=section.querySelector('[data-feature-panel]:not([hidden]) .mom-feature-track');if(!track)return;const left=section.querySelector('[data-feature-scroll="-1"]'),right=section.querySelector('[data-feature-scroll="1"]');if(left)left.disabled=track.scrollLeft<=1;if(right)right.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2}
function initDetails(){document.querySelectorAll('[data-featured]').forEach(section=>{section.querySelectorAll('.mom-feature-track').forEach(track=>{if(track.dataset.arrowsBound)return;track.dataset.arrowsBound='true';track.addEventListener('scroll',()=>updateArrows(section),{passive:true})});updateArrows(section)});document.querySelector('[data-cart-page]')?.classList.add('mom-cart-page-enhanced')}
let pageUpdating=false;
async function saveCartPage(){const page=document.querySelector('[data-cart-page]'),form=page?.querySelector('[data-cart-page-form]');if(!form||pageUpdating)return;pageUpdating=true;page.setAttribute('aria-busy','true');const updates=Object.fromEntries([...form.querySelectorAll('[data-line-key]')].map(input=>[input.dataset.lineKey,Math.max(0,Number(input.value)||0)])),note=form.querySelector('[name="note"]')?.value||'',sectionId=page.dataset.sectionId,status=page.querySelector('[data-cart-page-status]');if(status)status.textContent=en?'Updating…':'Güncelleniyor…';form.querySelectorAll('input,textarea,button').forEach(el=>el.disabled=true);
 try{const r=await fetch(root+'cart/update.js',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({updates,note,sections:[sectionId,'mom-cart'],sections_url:location.pathname})}),data=await r.json();if(!r.ok)throw Error(data.description||data.message||words.error);const html=data.sections?.[sectionId];if(!html){location.reload();return}const doc=new DOMParser().parseFromString(html,'text/html'),next=doc.querySelector('[data-cart-page]');if(!next){location.reload();return}page.replaceWith(next);initDetails();if(data.sections?.['mom-cart'])await refresh(data.sections['mom-cart']);const nextStatus=next.querySelector('[data-cart-page-status]');if(nextStatus)nextStatus.textContent=en?'Cart updated':'Sepet güncellendi'}catch(err){if(status)status.textContent=err.message;form.querySelectorAll('input,textarea,button').forEach(el=>el.disabled=false)}finally{pageUpdating=false;document.querySelector('[data-cart-page]')?.removeAttribute('aria-busy')}
}
document.addEventListener('change',e=>{if(e.target.matches('[data-cart-page] [data-line-key]'))saveCartPage()});
document.addEventListener('submit',e=>{if(e.target.matches('[data-cart-page-form]')&&e.submitter?.name==='update'){e.preventDefault();saveCartPage()}});
document.addEventListener('click',e=>{if(e.target.closest('[data-note-close]')){closeNote();return}const clear=e.target.closest('[data-search-clear]');if(clear){const input=clear.form.querySelector('[name="q"]');input.value='';clear.hidden=true;input.focus()}});
document.addEventListener('input',e=>{if(e.target.matches('.search-box [name="q"]')){const clear=e.target.form.querySelector('[data-search-clear]');if(clear)clear.hidden=!e.target.value}});
initDetails();initRestock();document.addEventListener('shopify:section:load',()=>{initDetails();initRestock()});window.addEventListener('resize',()=>document.querySelectorAll('[data-featured]').forEach(updateArrows));

})();
