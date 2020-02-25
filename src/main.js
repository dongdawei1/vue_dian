/*
入口JS
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router'  ;//引入路由器

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';
import iView from 'iview';

Vue.use(ElementUI);
Vue.use(iView);
//全局挂载  ,格式化代码快捷键   Ctrl+Alt +L
import apiUrl from './components/url.vue';

Vue.prototype.uploadDownUrl = apiUrl.uploadDownUrl;

import {msgdealft} from './common/msgdeal.js';

Vue.prototype.$msgdeal = msgdealft;


import {getisAut} from './common/userinifjs.js';
Vue.prototype.$isAuthentication = getisAut;
import {getrole} from './common/userinifjs.js';
Vue.prototype.$role = getrole;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App}, // 映射组件标签
  template: '<App/>', // 指定需要渲染到页面的模板
  router              // 注册路由器
});


