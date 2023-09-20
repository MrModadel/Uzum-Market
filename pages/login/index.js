import { useHttp } from "../../modules/HTTP.request"
let form = document.forms.loginForm
let emailInput = document.querySelector('#email')
let passInput = document.querySelector('#password')
let { request } = useHttp()

form.onsubmit = async (e) => {
   e.preventDefault()
   let item;
   await request("/users/?email=" + emailInput.value, "get")
      .then(res => item = res[0])
   if (!item){
      alert('У вас неправельный логин!')
      return;
   }
      if (passInput.value === item.password) {
         localStorage.setItem('user', JSON.stringify(item))
         location.assign('/')
      } else
         alert('У вас неправельный пороль!')
}