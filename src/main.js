/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入路由器

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import iView from 'iview'

import axios from 'axios';
//import VueRouter from "vue-router";

Vue.use(ElementUI)
Vue.use(iView)

import apiUrl from './components/url.vue'
Vue.prototype.uploadDownUrl = apiUrl.uploadDownUrl;

// router.beforeEach((to, from, next) => {
//
//   if(to.fullPath.indexOf("home")!=-1){
//     console.log(12232233323233);
//     console.log(to.fullPath);
//     console.log(to);
//     console.log(from.fullPath);
//     next();
//
//   }
//
//
//
//   next();
//NProgress.start();
// if (to.path == '/home') {
//   sessionStorage.removeItem('user');
// }
// let user = JSON.parse(sessionStorage.getItem('user'));
// if (!user && to.path != '/login') {
//   next({ path: '/login' })
// } else {
//   next()
// }
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App}, // 映射组件标签
  template: '<App/>', // 指定需要渲染到页面的模板
  router              // 注册路由器
})


