
import { useHttp } from "../../modules/HTTP.request";
import { footer } from "../../modules/footer";
import { header } from "../../modules/header";
import { onclick_reload } from "../../modules/ui";
import { reload_to_numder, addCommas } from "/modules/ui";
header();
let voidLike = document.querySelector('.void');
let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
reload_to_numder(like_data, '.saveds__count');
reload_to_numder(korzina_data, '.shop__counter');
let { request } = useHttp()
if (voidLike !== null) {

   if (like_data.length === 0) {
      voidLike.style.display = 'flex'
   } else {
      voidLike.style.display = 'none'
   }
}

request("/goods", 'get')
   .then(res => reload(like_data, res))
function reload(arr, data) {
   let place = document.querySelector('.like_data-wrapper')
   for (let item of data) {
      for (let id of arr) {
         if (item.id === +id) {
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
         }
      }
   }

   onclick_reload(true);
}

footer();

