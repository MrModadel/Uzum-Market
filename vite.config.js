// vite.config.js
import {
   resolve
} from 'path'
import {
   defineConfig
} from 'vite'

export default defineConfig({ 
   build: {
      rollupOptions: {
         input: {
            main: resolve(__dirname, 'index.html'),
            karzina: resolve(__dirname, 'pages/karzina/index.html'),
            categories: resolve(__dirname, 'pages/categories/index.html'),
            login: resolve(__dirname, 'pages/login/index.html'),
            product: resolve(__dirname, 'pages/product/index.html'),
            registration: resolve(__dirname, 'pages/registration/index.html'),
            saved: resolve(__dirname, 'pages/saved/index.html'),
         },
      },
   },
})