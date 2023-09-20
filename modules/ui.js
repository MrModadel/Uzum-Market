import Swiper from 'swiper/bundle';

let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
let open_el = JSON.parse(localStorage.getItem('open_el')) || [];

export function sections_reload(arr) {
   let wrapper = document.querySelectorAll('.wr');
   wrapper.forEach(el => {
      el.innerHTML = '';
      for (let item of arr) {
         if (el.dataset.type === item.type) {
            let itemSalePrice = 0;
            let b = false;
            if (item.salePercentage > 0) {
               itemSalePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
            } else {
               itemSalePrice = item.price;
               b = true;
            }
            el.innerHTML += `<div class="product-item" id="${item.id}">
            <div class="product-item__img">
                  <img
                        src="${item.media[0]}"
                        alt="${item.type}"
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
               <h3>${item.title}</h3>
               <div class="product-item__preview">
                  <div class="product-item__price">
                        <span class="original-price">${addCommas(item.price) + ' сум'}</span>
                        <span class="sale-price">${addCommas(itemSalePrice) + ' сум'}</span>
               </div>
                  <div class="product-item__shop">
                        <img src='/icons/korzina_.png' alt="korzina">
                  </div>
               </div>
            </div>
            </div>`
            if (b) {
               let items = document.querySelectorAll('.product-item');
               items.forEach(q => {
                  if (+q.id === item.id) {
                     let span = q.querySelector('.original-price');
                     let sale = q.querySelector('.sale');
                     sale?.remove();
                     span?.remove();
                  }
               })
            }
         }
      }
   })
   onclick_reload(false);
}
export function swiper_reload(arr, place) {
   for (let item of arr) {
      place.innerHTML += `<div class="swiper-slide" data-item_id='${item.id}'>
      <div class="swiper-slider__right">
      <img src="${item.media[0]}" alt="${item.type}">
   </div>
                                    <div class="swiper-slide__left">
                                       <h3>${item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}</h3>
                                       <span>${item.price + ' сум'}</span>
                                       <p>${item.description}</p>
                                    </div>
                                  

                                    </div>`
   }
   let sw_items = document.querySelectorAll('.swiper-slide');
   sw_items.forEach(el => {
      el.onclick = () => {
         open_el = [];
         open_el.push(el.dataset.item_id)
         localStorage.setItem("open_el", JSON.stringify(open_el));
         location.assign('/pages/product/')
      }
   })
   let texts = document.querySelectorAll('.swiper-slide__left p');
   text(texts);
   let swiper = new Swiper('.swiper', {
      speed: 500,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      spaceBetween: 80,
      autoplay: {
         delay: 2700,
         stopOnLastSlide: true
      },
      pagination: {
         el: '.swiper-pagination',
      },
      loop: true
   })
}
function text(texts) {
   if (window.innerWidth <= 648 && window.innerWidth > 496) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 100) + '...';
      })
   } else if (window.innerWidth <= 496 && window.innerWidth > 380) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 70) + '...';
      })
   } else if (window.innerWidth <= 380) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 45) + '...';
      })
   }
}
export function reload_to_numder(arr, teg) {
   let num = document.querySelector(teg);
   num.innerHTML = arr.length;
}
function update_icon_heart(arr, obj) {
   let act, off, teg, src, data;
   if (obj) {
      act = obj.act;
      off = obj.off;
      teg = obj.teg;
      src = obj.src;
      data = obj.data;
   } else {
      act = '/icons/heart-active-icon.svg';
      off = '/icons/heart-icon.svg';
      teg = '.saveds__count';
      src = '.heart';
      data = like_data;
   }
   let items = document.querySelectorAll('.product-item');
   items.forEach(el => {
      let heart = el.querySelector(src)
      if (arr.includes(el.id)) {
         heart.src = act;
      } else {
         heart.src = off
      }
      reload_to_numder(data, teg);
   });
}
export function onclick_reload(b) {
   let items = document.querySelectorAll('.product-item');
   items.forEach(item => {
      let heart = item.querySelector('.heart');
      let korzina = item.querySelector('.product-item__shop img');
      console.log(korzina);

      item.addEventListener('click', function (e) {
         if (e.target !== heart && e.target !== korzina) {
            open_el = [];
            open_el.push(item.id);
            localStorage.setItem("open_el", JSON.stringify(open_el));
            location.assign('/pages/product/');
         }
      });
      //k
      if (!korzina_data.includes(item.id)) {
         korzina.src = '/icons/korzina_.png'

      } else {
         korzina.src = '/icons/korzina_act.png'

      }
      korzina.onclick = () => {
         if (!korzina_data.includes(item.id)) {
            korzina_data.push(item.id);
            localStorage.setItem("korzina_data", JSON.stringify(korzina_data));
         } else {
            korzina_data = korzina_data.filter(elem => elem !== item.id);
            localStorage.setItem("korzina_data", JSON.stringify(korzina_data));
         }
         update_icon_heart(korzina_data, {
            act: '/icons/korzina_act.png',
            off: '/icons/korzina_.png',
            teg: '.shop__counter',
            src: ".product-item__shop img",
            css: true,
            data: korzina_data
         })

      }

      //h
      if (!like_data.includes(item.id)) {
         heart.src = '/icons/heart-icon.svg';
      } else {
         heart.src = '/icons/heart-active-icon.svg'
      }
      heart.onclick = () => {
         if (!like_data.includes(item.id)) {
            like_data.push(item.id);
            localStorage.setItem("like_data", JSON.stringify(like_data));
         } else {
            like_data = like_data.filter(elem => elem !== item.id)
            localStorage.setItem("like_data", JSON.stringify(like_data));
            if (b) {
               item.remove();
               reload_to_numder(like_data, '.saveds__count');
               let voidLike = document.querySelector('.void');
               if (like_data.length === 0) {
                  voidLike.style.display = 'flex'
               } else {
                  voidLike.style.display = 'none'
               }
            }
         }
         update_icon_heart(like_data)
      }
   });
}
export function cardReload(arr, boolian, place) {
   place.innerHTML = ''
   for (let item of arr) {
      let itemSalePrice = 0;
      let b = false;
      if (item.salePercentage > 0) {
         itemSalePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
      } else {
         itemSalePrice = item.price;
         b = true;
      }
      place.innerHTML += `<div class="product-item" id="${item.id}">
      <div class="product-item__img">
            <img
                  src="${item.media[0]}"
                  alt="${item.type}"
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
         <h3>${item.title}</h3>
         <div class="product-item__preview">
            <div class="product-item__price">
                  <span class="original-price">${addCommas(item.price) + ' сум'}</span>
                  <span class="sale-price">${addCommas(itemSalePrice) + ' сум'}</span>
         </div>
            <div class="product-item__shop">
                  <img src='/icons/korzina_.png' alt="korzina">
            </div>
         </div>
      </div>
      </div>`
      if (b) {
         let items = document.querySelectorAll('.product-item');
         items.forEach(q => {
            if (+q.id === item.id) {
               let span = q.querySelector('.original-price');
               let sale = q.querySelector('.sale');
               if (sale !== null) {
                  sale.remove();
               }
               if (span !== null) {
                  span.remove();
               }
            }
         })
      }
      if (boolian) {
         onclick_reload(false);
      }
   }
}
export function addCommas(nStr) {
   nStr += '';
   var x = nStr.split('.');
   var x1 = x[0];
   var x2 = x.length > 1 ? '.' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;
}
