/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入路由器

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//import VueRouter from "vue-router";

Vue.use(ElementUI)



// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/home') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App}, // 映射组件标签
  template: '<App/>', // 指定需要渲染到页面的模板
  router              // 注册路由器
})
