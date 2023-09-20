
import { useHttp } from "../../modules/HTTP.request";
import { footer } from "../../modules/footer";
import { header } from "../../modules/header";
import { cardReload, addCommas, onclick_reload } from "/modules/ui";
let plece = document.querySelector('.categories__collection');
header()
let map = {
   "Популярное": "popular",
   "Новые": "news"
}
let { request } = useHttp();
let res;
await request("/goods", 'get')
   .then(data => res = data);
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
   const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
   const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
   const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
   const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
   dropDownInput.value = map[dropDownBtn.innerText];
   if (dropDownInput.value === 'popular') {
      cardReload(res.slice(0, 25), true, plece)
   } else if (dropDownInput.value === 'news') {
      cardReload(res.slice(25, 50), true, plece)
   }
   // Клик по кнопке. Открыть/Закрыть select
   dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.add('dropdown__button--active');
   });

   // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
   dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
         e.stopPropagation();
         dropDownBtn.innerText = this.innerText;
         dropDownBtn.focus();
         dropDownInput.value = this.dataset.value;
         if (dropDownInput.value === 'popular') {
            cardReload(res.slice(0, 25), true, plece)
         } else if (dropDownInput.value === 'news') {
            cardReload(res.slice(25, 50), true, plece)
         }
         dropDownList.classList.remove('dropdown__list--visible');
      });
   });

   // Клик снаружи дропдауна. Закрыть дропдаун
   document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
         dropDownBtn.classList.remove('dropdown__button--active');
         dropDownList.classList.remove('dropdown__list--visible');
      }
   });

   // Нажатие на Tab или Escape. Закрыть дропдаун
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
         dropDownBtn.classList.remove('dropdown__button--active');
         dropDownList.classList.remove('dropdown__list--visible');
      }
   });
});
let from = document.querySelector('[data-from]');
let to = document.querySelector('[data-to]');
let inputs = document.querySelectorAll('.price-fl__input');
inputs.forEach(input => {
   input.oninput = () => {
      let min = +from.dataset.from
      let max = +to.dataset.to
      if (from.value !== '') {
         min = from.value;
      }
      if (to.value !== '') {
         max = to.value;
      }
      spawnProduct(res, min, max)
   }
})
function spawnProduct(arr, min, max) {
   let clone = arr.filter(item => {
      let itemSalePrice = 0;
      if (item.salePercentage > 0) {
         itemSalePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
      } else {
         itemSalePrice = item.price
      }
      return itemSalePrice >= min && itemSalePrice <= max;
   });
   cardReload(clone, true, plece)
}
let all = document.querySelector('.left-block__coll-title');
all.onclick = () => {
   cardReload(res, true, plece)
}
let allA = document.querySelectorAll('.left-block__ul  a');
allA.forEach(a => {
   a.onclick = () => {
      let type = a.dataset.type
      sections_reload(res, type, true)
   }
})

function sections_reload(arr, type, b) {
   let place = document.querySelector('.categories__collection');
   place.innerHTML = '';
   for (let item of arr) {
      if (b) {
         if (type === item.type) {
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
      } else {
         for (let t of type) {
            if (t === item.brand) {
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
   }
   onclick_reload(false);
}

let lies = document.querySelectorAll('.brend__ul li');
let inputSaveds = [];
lies.forEach(li => [
   li.onclick = () => {
      inputSaveds = [];
      lies.forEach(el => {
         let input = el.querySelector('input');
         if (input.checked === true) {
            inputSaveds.push(input.dataset.type)
         }
      })
      if (inputSaveds.length > 0) {
         sections_reload(res, inputSaveds, false)
      } else {
         cardReload(res, true, plece)
      }
   }
])

let maxBud = document.getElementById("budget");
let minBud = document.getElementById("budget-min");
let rangeValue = maxBud.value;
let valueMin = minBud.value;
let rangeNumber = document.getElementById("max");
let minNumder = document.getElementById('min');
rangeNumber.textContent = rangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
minNumder.textContent = valueMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
maxBud.oninput = () => {
   let rangeValue = maxBud.value;
   let rangeNumber = document.getElementById("max");
   rangeNumber.textContent = rangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
minBud.oninput = () => {
   let valueMin = minBud.value;
   let minNumder = document.getElementById('min');
   minNumder.textContent = valueMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
maxBud.onchange = () => {
   let rangeValue = maxBud.value;
   let valueMin = minBud.value;
   spawnProduct(res, valueMin, rangeValue)
}
minBud.onchange = () => {
   let rangeValue = maxBud.value;
   let valueMin = minBud.value;
   spawnProduct(res, valueMin, rangeValue)
}

footer();