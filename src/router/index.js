/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'
// z注册登录相关
import Login from '../views/Login.vue'
import About_us from '../views/login/About_us'
import Register from '../views/login/Register'
import Sign from '../views/login/Sign'

//   全局挂载
Vue.use(VueRouter)
/*
内部定义并注册了2个组件标签(router-link/router-view),
给组件对象添加了2个属性:
  1. $router: 路由器
  2. $route: 当前路由
 */


export default new VueRouter ({
  mode : 'history',
  // 注册应用中所有的路由
  routes: [

    {
      path: '/login',
      component: Login,
      name: '',

      children: [
        {
          path: '/login/about_us',
          component: About_us
        },
        {
          path: '/login/register',
          component: Register
        },
        {
          path: '/login/sign',
          component: Sign
        },
        {
          path: '/login',
          redirect: '/login/sign'    //默认显示
        }
      ]
    },
    {
      path: '/home',
      component: Home,
     // hidden: true , //隐藏的 根据状态判断是否隐藏该入口
      children: [
        {
          path: '/home/news',
          component: News
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              path:'detail/:id',
              component: MessageDetail
            }
          ]
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'   //默认显示
    }


  ]
})
