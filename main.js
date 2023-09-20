import { useHttp } from "./modules/HTTP.request";
import { footer } from "./modules/footer";
import { header } from "./modules/header";
import { cardReload } from "./modules/ui"
import { sections_reload, swiper_reload, reload_to_numder } from "./modules/ui";
import 'swiper/css';
let { request } = useHttp();
header()
async function login(user) {
   let like_data = await request('/likes/' + user.id, 'get');
   let korzina_data = await request('/karzina/' + user.id, 'get');
   localStorage.setItem("like_data", JSON.stringify(like_data.arr));
   localStorage.setItem("korzina_data", JSON.stringify(korzina_data.arr));
   location.reload();
}
let user = JSON.parse(localStorage.getItem('user'));
let usuingINfo = JSON.parse(localStorage.getItem('usuingINfo')) || false;
if (!usuingINfo) {
   login(user);
   usuingINfo = true;
   localStorage.setItem("usuingINfo", JSON.stringify(usuingINfo));
}

let swiper_wrapper = document.querySelector('.swiper-wrapper');
let cardConrtainer = document.querySelector('.popular-section__wrapper');
let popular_section = document.querySelector('.popular-section');
let korzina_data = JSON.parse(localStorage.getItem('korzina_data')) || [];
let like_data = JSON.parse(localStorage.getItem('like_data')) || [];
reload_to_numder(like_data, '.saveds__count');
reload_to_numder(korzina_data, '.shop__counter');
let res;
 request("/goods", "get")
   .then(data => res = data)
   .then(() => {
      sections_reload(res)
      cardReload(res.slice(0, 15), true, cardConrtainer)
      swiper_reload(res.slice(20, 30), swiper_wrapper)


      let lengthBtn = document.createElement('button')
      lengthBtn.classList.add('btn-reload')
      lengthBtn.innerHTML = 'Показать все'
      popular_section.append(lengthBtn)
      lengthBtn.dataset.st = true;
      lengthBtn.onclick = () => {
         if (lengthBtn.dataset.st !== 'false') {

            cardReload(res, true, cardConrtainer)
            lengthBtn.dataset.st = false;
            lengthBtn.innerHTML = 'Скрыть'

         } else {
            cardReload(res.slice(0, 15), true, cardConrtainer)
            lengthBtn.dataset.st = true;
            lengthBtn.innerHTML = 'Показать все'
         }

      }

      footer()
   })
