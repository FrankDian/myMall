import Vue from 'vue'
import Router from 'vue-router'
import Hello from './../components/HelloWorld'
// import GoodsList from './../views/GoodsList'
// import Title from '@/views/Title'
// import Image from '@/views/Image'
// import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      // name: 'GoodsList',
      components: {
        dafault: Hello,
        // title: Title,
        // img: Image
      }
      // children:[
      //   {
      //     path:'img',
      //     name:'img',
      //     component: Image
      //   },
      //   {
      //     path:'title',
      //     name:'title',
      //     component: Title
      //   }
      // ]
    }
    // {
    //   path:'/cart/:cartId',
    //   name:'cart',
    //   component:Cart
    // }
  ]
})
