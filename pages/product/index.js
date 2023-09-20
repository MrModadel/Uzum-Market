
import { useHttp } from "../../modules/HTTP.request";
import { reload_to_numder, addCommas } from "/modules/ui";
import { footer } from "../../modules/footer";
import { header } from "../../modules/header";
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
header()
let img = document.querySelector('.product-image__bigger');
let open_el = JSON.parse(localStorage.getItem('open_el')) || [];
let w = img.getBoundingClientRect().width;
img.style.height = w + 50 + 'px';
let { request } = useHttp();
request("/goods", 'get')
   .then(res => pageReload(res.filter(item => item.id === +open_el[0])))
reload_to_numder(like_data, '.saveds__count');
reload_to_numder(korzina_data, '.shop__counter');
function pageReload(arr) {
   for (let item of arr) {
      let title = document.querySelector('.product-info__title h2')
      let scrollImages = document.querySelector('.product-image__scroll')
      let biggerImg = document.querySelector('.product-image__bigger img')
      let sale_price = document.querySelector('.sale-price')
      let originalPrice = document.querySelector('.original-price')
      let description = document.querySelector('.product-predesc p')
      let minusBtn = document.querySelector('.minus-btn')
      let plusBtn = document.querySelector('.plus-btn')
      let countSpan = document.querySelector('.span')
      let karzinaBtn = document.querySelector('.korzina')
      let savedBtn = document.querySelector('.saved');
      let org_img = document.querySelector('.org-img');
      let swiper = document.querySelector('.swiper');
      if (like_data.includes(`${item.id}`)) {
         savedBtn.setAttribute('disabled', '');
      }
      if (!like_data.includes(`${item.id}`)) {
         savedBtn.onclick = () => {
            like_data.push(`${item.id}`);
            localStorage.setItem("like_data", JSON.stringify(like_data))
            savedBtn.setAttribute('disabled', '');
            reload_to_numder(like_data, '.saveds__count');

         }
      }
      if (korzina_data.includes(`${item.id}`)) {
         karzinaBtn.setAttribute('disabled', '');
      }
      if (!korzina_data.includes(`${item.id}`)) {
         karzinaBtn.onclick = () => {
            korzina_data.push(`${item.id}`);
            localStorage.setItem("korzina_data", JSON.stringify(korzina_data))
            karzinaBtn.setAttribute('disabled', '');
            reload_to_numder(korzina_data, '.shop__counter');
         }
      }


      let itemSalePrice = 0
      let n = 1
      if (item.salePercentage > 0) {
         itemSalePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
      } else {
         itemSalePrice = item.price
      }
      title.innerHTML = item.title
      biggerImg.src = item.media[0]
      let imgArr = scrollImages.querySelectorAll('img');
      imgArr.forEach(img => {
         img.src = item.media[0]
      })
      if (item.media.length === 1) {
         swiper.style.display = 'none'
      } else {
         org_img.style.display = 'none';
         let wrapper = document.querySelector('.swiper-wrapper');
         for (let media of item.media) {
            let slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            wrapper.append(slide)
         }
         let slides = document.querySelectorAll('.product-image__bigger .swiper-slide');
         for (let item_img = 0; item_img < item.media.length; item_img++) {
            for (let slide = 0; slide < slides.length; slide++) {
               let img = document.createElement('img');
               img.src = item.media[item_img];
               img.height = 550;
               img.width = 506;
               img.alt = 'tide';
               if (item_img === slide) {
                  slides[slide].append(img);
               }
            }
         }
         let swiper = new Swiper('.product-swiper', {
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },
            loop: true,
         })
      }
      if (itemSalePrice !== item.price)
         originalPrice.innerHTML = addCommas(itemSalePrice) + ' сум'
      else
         originalPrice.remove();
      sale_price.innerHTML = addCommas(item.price) + ' сум'
      description.innerHTML = item.description
      plusBtn.onclick = () => {
         n++
         countSpan.innerHTML = n
         sale_price.innerHTML = addCommas(itemSalePrice * n) + ' сум'
      }
      minusBtn.onclick = () => {
         if (n > 1) {
            n--
            countSpan.innerHTML = n
            sale_price.innerHTML = addCommas(itemSalePrice * n) + ' сум'
         }
      }
   }
}


footer()
