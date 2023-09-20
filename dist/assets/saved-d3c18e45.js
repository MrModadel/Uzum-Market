import{u as _}from"./HTTP.request-89c4859f.js";import{h as f,r as p,b as d,o as v,f as g}from"./ui-960fc6a0.js";f();let l=document.querySelector(".void"),r=JSON.parse(localStorage.getItem("like_data"))||[],h=JSON.parse(localStorage.getItem("korzina_data"))||[];p(r,".saveds__count");p(h,".shop__counter");let{request:y}=_();l!==null&&(r.length===0?l.style.display="flex":l.style.display="none");y("/goods","get").then(i=>S(r,i));function S(i,n){let m=document.querySelector(".like_data-wrapper");for(let e of n)for(let u of i)if(e.id===+u){let t=0,s=!1;e.salePercentage>0?t=e.price-Math.floor(e.price/100*e.salePercentage):(t=e.price,s=!0),m.innerHTML+=`<div class="product-item" id="${e.id}">
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
                        <span class="original-price">${d(e.price)+" сум"}</span>
                        <span class="sale-price">${d(t)+" сум"}</span>
               </div>
                  <div class="product-item__shop">
                        <img src='/icons/korzina_.png' alt="korzina">
                  </div>
               </div>
            </div>
            </div>`,s&&document.querySelectorAll(".product-item").forEach(a=>{if(+a.id===e.id){let o=a.querySelector(".original-price"),c=a.querySelector(".sale");c!==null&&c.remove(),o!==null&&o.remove()}})}v(!0)}g();
