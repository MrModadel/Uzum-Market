import { useHttp } from "./HTTP.request";
let { request } = useHttp();

let open_el = JSON.parse(localStorage.getItem('open_el')) || [];
let user = JSON.parse(localStorage.getItem('user'));
let headerWrapper = document.querySelector('.header');
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
if (window.NodeList && !NodeList.prototype.forEach) {
   NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
         callback.call(thisArg, this[i], i, this);
      }
   };
}
export function header() {
   headerWrapper.innerHTML += `
   <div class="header__inner container">
   <div class="header__wrapper">
      <div class="header__logo">
         <h1>
            <a href="/" class="header__img">
               <img src="/icons/haeder-logo.svg" alt="logo">
            </a>
            <a href="/" class="--dis dis-img">
            <img src="/icons/logo__two.svg" alt="logo" >
         </a>
         </h1>
      </div>
      <div class="header__catalog">
         <button type="button">Каталог</button>
      </div>
      <div class="header__search">
         <div class="search-input">
            <div class="search-input-box">
               <input type="text" name="headerSearch" placeholder="Искать товары" class="headerSearch">
               <div class="search-icon">
                  <img src="/icons/search-icon.svg" alt="search">
               </div>
            </div>
            <div class="list"></div>
         </div>
      </div>
      <div class="header__nav">
         <ul>
            <li class='user'>
               <img src="/icons/user-icon.svg" alt="user">
               <a href="#">${user.firstname}</a>
            </li>
            <li>
               <a href="/pages/saved/">
                  Избранное
                  <span class="count saveds__count">0</span>
               </a>
            </li>
            <li>
               <a href="/pages/karzina/">
                  Корзина
                  <span class="count shop__counter">0</span>
               </a>
            </li>
         </ul>
      </div>
   </div>
   <div class="header__search --dis">
      <div class="search-input">
         <div class="search-input-box">
            <input type="text" name="headerSearch" placeholder="Искать товары" class="headerSearch">
            <div class="search-icon">
               <img src="/icons/search-icon.svg" alt="search">
            </div>
         </div>
         <div class="list"></div>
      </div>
   </div>
</div>
<div class="modal">
<div class="modal__dialog">
   <div class="modal__content">
         <div data-close class="modal__close">&times;</div>
         <div class="modal__title">Хотите выйти?</div>
         <div class="btn-box">
         <form name='endSave'>
         <button class="btn-one btn_dark btn_min true">Да</button>
         </form>
      </div>
   </div>
</div>
</div>`
   let end = headerWrapper.querySelector('form');
   end.onsubmit = async (e) => {
      korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
      like_data = JSON.parse(localStorage.getItem('like_data')) || [];
      e.preventDefault();
      console.log(korzina_data, like_data);
      await request('/karzina/' + user.id, 'patch', { arr: korzina_data })
      await request('/likes/' + user.id, 'patch', { arr: like_data })
      localStorage.clear();
      location.assign('/pages/login/');
   }
   let headerInner = document.querySelector('.header__wrapper')
   let bg = document.querySelector('.body-active')
   let swiper = document.querySelector('.swiper');
   let userOne = document.querySelectorAll('.user');
   let modal = document.querySelector('.modal')
   let closeBtns = document.querySelectorAll('[data-close]')
   userOne.forEach((btn) => {
      btn.onclick = () => {
         modal.classList.add('show', 'fade')
      }
   })
   closeBtns.forEach((btn) => {
      btn.onclick = () => {
         modal.classList.remove('show', 'fade')
      }
   })
   let catalogBtn = document.querySelector('.header__catalog button')
   let lists = document.querySelectorAll('.list')
   let inputs = document.querySelectorAll('.headerSearch');
   request("/goods", 'get')
      .then(res => onInput(res))


   function searchReload(arr, val) {
      lists.forEach(list => {
         list.innerHTML = ''
      })
      for (let item of arr) {
         let re = new RegExp(val, "g")
         let title = item.title.toLowerCase().replace(re, `<b style="color:red">${val}</b>`)
         lists.forEach(list => {
            list.innerHTML += `
            <a href="/pages/product/">
               <div class="search-item" id="${item.id}">
                     <span>${title}</span>
               </div>
            </a>`
            let serchItem = document.querySelectorAll('.search-item')
            serchItem.forEach(el => {
               el.onclick = () => {
                  open_el = [];
                  open_el.push(el.id)
                  localStorage.setItem("open_el", JSON.stringify(open_el));
               }
            })
         })
      }
   }

   function onInput(arr) {
      inputs.forEach(input => {
         input.oninput = () => {
            let val = input.value.toLowerCase().trim();
            let filtered = arr.filter(item => item.title.toLowerCase().includes(val))
            if (val.length > 0) {
               lists.forEach(list => {
                  list.style.display = 'block';
               })
               bg.classList.add('body-active__block')
               searchReload(filtered, val)
               if (swiper !== null) {
                  swiper.classList.add('swiper-active')
               }
               headerInner.style.alignItems = 'start'

            } else {
               lists.forEach(list => {
                  list.style.display = 'none';
               })
               bg.classList.remove('body-active__block')
               if (swiper !== null) {
                  swiper.classList.remove('swiper-active')
               }
               headerInner.style.alignItems = 'center'
            }
         }
      })
   }
   catalogBtn.onclick = () => {
      location.assign('/pages/categories/')
   }
}