import{u as $}from"./HTTP.request-89c4859f.js";import{h as P,c as n,b as g,o as M,f as A}from"./ui-960fc6a0.js";let s=document.querySelector(".categories__collection");P();let I={Популярное:"popular",Новые:"news"},{request:T}=$(),o;T("/goods","get").then(m=>o=m).then(()=>{document.querySelectorAll(".dropdown").forEach(function(l){const t=l.querySelector(".dropdown__button"),r=l.querySelector(".dropdown__list"),c=r.querySelectorAll(".dropdown__list-item"),e=l.querySelector(".dropdown__input-hidden");e.value=I[t.innerText],e.value==="popular"?n(o.slice(0,25),!0,s):e.value==="news"&&n(o.slice(25,50),!0,s),t.addEventListener("click",function(i){r.classList.toggle("dropdown__list--visible"),this.classList.add("dropdown__button--active")}),c.forEach(function(i){i.addEventListener("click",function(a){a.stopPropagation(),t.innerText=this.innerText,t.focus(),e.value=this.dataset.value,e.value==="popular"?n(o.slice(0,25),!0,s):e.value==="news"&&n(o.slice(25,50),!0,s),r.classList.remove("dropdown__list--visible")})}),document.addEventListener("click",function(i){i.target!==t&&(t.classList.remove("dropdown__button--active"),r.classList.remove("dropdown__list--visible"))}),document.addEventListener("keydown",function(i){(i.key==="Tab"||i.key==="Escape")&&(t.classList.remove("dropdown__button--active"),r.classList.remove("dropdown__list--visible"))})});let m=document.querySelector("[data-from]"),h=document.querySelector("[data-to]");document.querySelectorAll(".price-fl__input").forEach(l=>{l.oninput=()=>{let t=+m.dataset.from,r=+h.dataset.to;m.value!==""&&(t=m.value),h.value!==""&&(r=h.value),y(o,t,r)}});function y(l,t,r){let c=l.filter(e=>{let i=0;return e.salePercentage>0?i=e.price-Math.floor(e.price/100*e.salePercentage):i=e.price,i>=t&&i<=r});n(c,!0,s)}let k=document.querySelector(".left-block__coll-title");k.onclick=()=>{n(o,!0,s)},document.querySelectorAll(".left-block__ul  a").forEach(l=>{l.onclick=()=>{let t=l.dataset.type;w(o,t,!0)}});function w(l,t,r){let c=document.querySelector(".categories__collection");c.innerHTML="";for(let e of l)if(r){if(t===e.type){let i=0,a=!1;e.salePercentage>0?i=e.price-Math.floor(e.price/100*e.salePercentage):(i=e.price,a=!0),c.innerHTML+=`<div class="product-item" id="${e.id}">
            <div class="product-item__img">
                  <img
                        src="${e.media[0]}"
                        alt="${e.type}"
                        width="230px"
                        height="300px"
                        class="img"
                  >
               <img src="/icons/heart-icon.svg" alt="heart" class="heart">
               <div class="product-item__sale">
                  Скиндка
               </div>
            </div>
            <div class="product-item__info">
               <h3>${e.title}</h3>
               <div class="product-item__preview">
                  <div class="product-item__price">
                        <span class="original-price">${g(e.price)+" сум"}</span>
                        <span class="sale-price">${g(i)+" сум"}</span>
               </div>
                  <div class="product-item__shop">
                        <img src='/icons/korzina_.png' alt="korzina">
                  </div>
               </div>
            </div>
            </div>`,a&&document.querySelectorAll(".product-item").forEach(_=>{if(+_.id===e.id){let p=_.querySelector(".original-price"),v=_.querySelector(".sale");v!==null&&v.remove(),p!==null&&p.remove()}})}}else for(let i of t)if(i===e.brand){let a=0,S=!1;e.salePercentage>0?a=e.price-Math.floor(e.price/100*e.salePercentage):(a=e.price,S=!0),c.innerHTML+=`<div class="product-item" id="${e.id}">
               <div class="product-item__img">
                     <img
                           src="${e.media[0]}"
                           alt="${e.type}"
                           width="230px"
                           height="300px"
                           class="img"
                     >
                  <img src="/icons/heart-icon.svg" alt="heart" class="heart">
                  <div class="product-item__sale">
                     Скиндка
                  </div>
               </div>
               <div class="product-item__info">
                  <h3>${e.title}</h3>
                  <div class="product-item__preview">
                     <div class="product-item__price">
                           <span class="original-price">${g(e.price)+" сум"}</span>
                           <span class="sale-price">${g(a)+" сум"}</span>
                  </div>
                     <div class="product-item__shop">
                           <img src='/icons/korzina_.png' alt="korzina">
                     </div>
                  </div>
               </div>
               </div>`,S&&document.querySelectorAll(".product-item").forEach(p=>{if(+p.id===e.id){let v=p.querySelector(".original-price"),E=p.querySelector(".sale");E!==null&&E.remove(),v!==null&&v.remove()}})}M(!1)}let b=document.querySelectorAll(".brend__ul li"),f=[];b.forEach(l=>[l.onclick=()=>{f=[],b.forEach(t=>{let r=t.querySelector("input");r.checked===!0&&f.push(r.dataset.type)}),f.length>0?w(o,f,!1):n(o,!0,s)}]);let d=document.getElementById("budget"),u=document.getElementById("budget-min"),q=d.value,L=u.value,x=document.getElementById("max"),B=document.getElementById("min");x.textContent=q.toString().replace(/\B(?=(\d{3})+(?!\d))/g," "),B.textContent=L.toString().replace(/\B(?=(\d{3})+(?!\d))/g," "),d.oninput=()=>{let l=d.value,t=document.getElementById("max");t.textContent=l.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")},u.oninput=()=>{let l=u.value,t=document.getElementById("min");t.textContent=l.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")},d.onchange=()=>{let l=d.value,t=u.value;y(o,t,l)},u.onchange=()=>{let l=d.value,t=u.value;y(o,t,l)},A()});
