
import { useHttp } from "../../modules/HTTP.request";
import { footer } from "../../modules/footer";
import { header } from "../../modules/header";
import { reload_to_numder, addCommas } from "/modules/ui";
header();
let voidLike = document.querySelector('.void-karzina');
let menu = document.querySelector('.visidel');
let { request } = useHttp();
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
let sevedsNumder = {};
reload_to_numder(like_data, '.saveds__count');
reload_to_numder(korzina_data, '.shop__counter');

if (voidLike !== null) {
   if (!korzina_data.length > 0) {
      menu.style.display = 'none';
      voidLike.style.display = 'flex';
   } else {
      menu.style.display = 'flex';
      voidLike.style.display = 'none';
   }
}

request("/goods", 'get')
   .then(res => reload(korzina_data, res))

function reload(arr, data) {
   let place = document.querySelector('.like_data-karzina-wrapper');
   place.innerHTML = ''
   for (let item of data) {
      for (let id of arr) {
         if (item.id === +id) {
            let itemSalePrice = 0;
            if (item.salePercentage > 0) {
               itemSalePrice = item.price - Math.floor((item.price / 100) * item.salePercentage);
            } else {
               itemSalePrice = item.price
            }
            place.innerHTML += `<div class="product-item item" id="${item.id}">
            <img src="${item.media[0]}" alt="${item.type}" width="143px " height="187px" class="img">
      <div class="item-info info">
         <h3>${item.title}</h3>
         <span class="sale-price text" data-price=${item.price}>${itemSalePrice + ' сум'}</span>
         <div class="karzina-counter">
            <button class="minus">-</button>
            <span class="span">1</span>
            <button class="plus">+</button>
         </div>
         <button class="item-del">
            Удалить
         </button>
      </div>
   </div>`
         }
      }
   }
   let items = document.querySelectorAll('.product-item');
   if (!korzina_data.length > 0) {
      place.style.display = 'none';
      menu.style.display = 'none';
      voidLike.style.display = 'flex';
   } else {
      place.style.display = 'flex';
      menu.style.display = 'flex';
      voidLike.style.display = 'none';
   }
   items.forEach(item => {
      let n = 1;
      sevedsNumder[item.id] = n;
      totalSale(sevedsNumder)
      let place = document.querySelector('.like_data-karzina-wrapper');
      let info = item.querySelector('.info');
      let h = info.querySelector('h3');
      let karzinaCount_one = info.querySelector('.karzina-counter');
      let del = info.querySelector('.item-del');
      let price = info.querySelector('.text');
      let minus = item.querySelector('.minus');
      let plus = item.querySelector('.plus');
      let span = item.querySelector('.span');
      if (!korzina_data.length > 0) {
         place.style.display = 'none'
      } else {
         place.style.display = 'flex'
      }
      let money = price.innerHTML.split(' ').at(0);
      money = +money;
      item.addEventListener('click', function (e) {
         if (e.target !== info && e.target !== h && e.target !== karzinaCount_one && e.target !== del && e.target !== price && e.target !== minus && e.target !== plus && e.target !== span) {
            let open_el = [];
            open_el.push(item.id);
            localStorage.setItem("open_el", JSON.stringify(open_el));
            location.assign('/pages/product/')
         }
      });
      minus.onclick = () => {
         if (n > 1) {
            n--;
            sevedsNumder[item.id] = n;
            span.innerHTML = n;
            price.innerHTML = money * n + ' сум';
            totalSale(sevedsNumder);
         }
      }
      plus.onclick = () => {
         n++;
         sevedsNumder[item.id] = n;
         span.innerHTML = n;
         price.innerHTML = money * n + ' сум';
         totalSale(sevedsNumder);
      }
      del.onclick = () => {
         korzina_data = korzina_data.filter(id => id !== item.id);
         localStorage.setItem("korzina_data", JSON.stringify(korzina_data));
         item.remove();
         if (!korzina_data.length > 0) {
            place.style.display = 'none';
            menu.style.display = 'none';
            voidLike.style.display = 'flex';
         } else {
            place.style.display = 'flex';
            menu.style.display = 'flex';
            voidLike.style.display = 'none';
         }
         reload_to_numder(korzina_data, '.shop__counter');

         delete sevedsNumder[item.id];
         totalSale(sevedsNumder);
      }
   })
}
function priceMoney(total, price_total) {
   let menu = document.querySelector('.visidel');
   let menu_texts = menu.querySelectorAll('.visidel__text');
   let menu_title = menu.querySelector('.visidel__price');
   let totalOne = 0;
   for (let key in sevedsNumder) {
      let index = sevedsNumder[key];
      totalOne += index;
   }
   menu_texts.forEach(text => {
      if (+text.dataset.index === 1) {
         text.innerHTML = `Итого товаров: ${totalOne} шт.`;
      } else {
         text.innerHTML = `Итого скидки: ${addCommas(total)} сум`;
      }
   });
   menu_title.innerHTML = `${addCommas(price_total)} сум`;
   totalOne = 0;
}
function totalSale(like_data) {
   let price_total = 0;
   let sum = 0;
   let items = document.querySelectorAll('.product-item');
   items.forEach(el => {
      let info = el.querySelector('.info');
      let price = info.querySelector('.text');
      let money = price.innerHTML.split(' ').at(0);
      let reallyMoney = price.dataset.price
      reallyMoney = +reallyMoney;
      money = +money;
      sum += reallyMoney * like_data[el.id] - money;
      price_total += money;
   })
   priceMoney(sum, price_total)
   sum = 0;
   price_total = 0;
}
footer()