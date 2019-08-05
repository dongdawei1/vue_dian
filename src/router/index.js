/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// z注册登录相关
import Login from '../views/Login.vue'
import About_us from '../views/login/About_us'
import Register from '../views/login/Register'
import Sign from '../views/login/Sign'
import Lord from '../views/login/Lord'
//home
import Home from '../views/Home.vue'
import Release from '../views/home/Release'

  import Vegetables from '../views/home/market/Vegetables'
import GrainAndOil from '../views/home/market/GrainAndOil'
import Seasoning from '../views/home/market/Seasoning'
import Wine from '../views/home/market/Wine'
import Tableware from '../views/home/market/Tableware'
import Clean from '../views/home/market/Clean'
import DepartmentStore from '../views/home/market/DepartmentStore'
import KitchenUtensils from '../views/home/market/KitchenUtensils'
import AquaticProduct from '../views/home/market/AquaticProduct'

import Menu from '../views/home/Menu'
import Lease from '../views/home/Lease'
import RentalBooth from '../views/home/RentalBooth'
import CreateLease from '../views/home/dianmian/CreateLease'
import CreateRentalBooth from '../views/home/dianmian/CreateRentalBooth'

import RecruitWorkers from '../views/home/recruit/RecruitWorkers'
import JobWanted from '../views/home/recruit/JobWanted'
import ReleaseWelfare from '../views/home/recruit/ReleaseWelfare'

import Renovation from '../views/home/Renovation'
import Repair from '../views/home/Repair'
import PestControl from '../views/home/PestControl'


import MyRelease from '../views/home/userCenter/MyRelease'
import MyAccount from '../views/home/userCenter/MyAccount'
import Detailed from '../views/home/userCenter/Detailed'
import RealName  from '../views/home/userCenter/RealName'
import UpdateRealName  from '../views/home/userCenter/updateRealName'
import AddRealName  from '../views/home/userCenter/addRealName'
import MyJobWanted  from '../views/home/userCenter/myreleases/MyJobWanted'
import CreateMAndRAndP  from '../views/home/userCenter/myreleases/CreateMAndRAndP'
import EditMAndRAndP  from '../views/home/userCenter/myreleases/EditMAndRAndP'


import Integral from '../views/home/Integral'
import Characteristic from '../views/home/Characteristic'

import ToExamine from '../views/home/administration/ToExamine'
import BusinessEnquiry from '../views/home/administration/BusinessEnquiry'



import GrainAndOilPage from '../views/home/releasePage/GrainAndOilPage'

import Details from '../views/Details.vue'
import MrpDetails  from '../views/detailes/MrpDetails'


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
      path: '/',
      component: Login,
      name: '',

      children: [
        {
          path: '/login/about_us', //关于我们
          component: About_us
        },
        {
          path: '/login/register',  //注册
          component: Register
        },
        {
          path: '/login/sign',  //登陆
          component: Sign
        },
        {
          path: '/login/lord',
          component: Lord    //宣传页
        },
        {
          path: '/login',
          redirect: '/login/sign'    //默认显示登陆
        },
        {
          path: '/',
          redirect: '/login/sign'    //默认显示登陆
        }
      ]
    },
    {
      path:'/details',
      component: Details,
      children:[
        {
          hidden: true , //用户包中
          path: '/details/mrpDetails/:id',
          name: 'mrpDetails',
          component:   MrpDetails  //发布灭虫等
        },

      ],
    },
    {
      path: '/home',
      component: Home,
     // hidden: true , //隐藏的 根据状态判断是否隐藏该入口
      children: [
        {
          path: '/home/release',  //发布
          component: Release
        },


       /*市场区开始*/
            {
              path: '/home/vegetables',
              component: Vegetables  //蔬菜
            },
            {
              path: '/home/grainAndOil',
              component: GrainAndOil  //粮油
            },
            {
              path: '/home/seasoning',
              component: Seasoning  //调料
            },
            {
              path: '/home/wine',
              component: Wine  //酒水
            },
            {
              path: '/home/tableware',
              component: Tableware  //餐具
            },

            {
              path: '/home/clean',
              component: Clean  //保洁
            },
            {
              path: '/home/departmentStore',
              component: DepartmentStore  //百货
            },
            {
              path: '/home/kitchenUtensils',
              component: KitchenUtensils  //厨具电器
            },
            {
              path: '/home/aquaticProduct',
              component: AquaticProduct  //水产禽蛋
           },

        /*市场区结束*/


        // {
        //   path: 'message',
        //   component: Message,
        //   children: [
        //     {
        //       path:'detail/:id',
        //       component: MessageDetail
        //     }
        //   ]
        // },
        {
          path: '/home/menu',  //菜谱广告制作
          component: Menu
        },
        {
          path: '/home/lease',  //出租店面窗口
          component: Lease
        },
        {
          path: '/home/rentalBooth',  //出租摊位
          component: RentalBooth
        },
        {
          path: '/home/createLease',  //创建店面
          component: CreateLease
        },
        {
          path: '/home/createRentalBooth',  //创建摊位
          component: CreateRentalBooth
        },

        /*招聘开始*/
             {
                   path: '/home/recruitWorkers',
                   component: RecruitWorkers  //招人
             },
               {
                 path: '/home/jobWanted',
                 component: JobWanted  //求职
               },
        /*招聘结束*/
        {
          path: '/home/renovation',  //装修
          component: Renovation
        },
        {
          path: '/home/repair',  //设备维修
          component: Repair
        },
        {
          path: '/home/pestControl',  //灭虫
          component: PestControl
        },
        /*用户中心开始*/
        {
          path: '/home/myRelease',  //我的发布
          component: MyRelease
        },
        {
          path: '/home/myAccount',  //我的账户
          component: MyAccount
        },
        {
          path: '/home/myJobWanted', //创建简历
          component: MyJobWanted
        },
        {
          path: '/home/detailed',  //收支明细
          component: Detailed
        },

        /*用户中心结束*/
        {
          path: '/home/integral',  //积分专区
          component: Integral
        },
        {
          path: '/home/characteristic',  //特色农产品
          component: Characteristic
        },

        {
          path: '/home/toExamine',
          component: ToExamine,

        },
        {
          path: '/home/businessEnquiry',
          component: BusinessEnquiry
        },

        {
          path: '',
          redirect: '/home/release'
        },

//  跳转的页面
        {
          hidden: true , //隐藏的 根据状态判断是否隐藏该入口
          path: '/home/grainAndOilPage',
          component:  GrainAndOilPage  //发布信息粮油
        },

        //

        {
          hidden: true , //用户包中
          path: '/home/realName',
          component:  RealName  //实名认证
        },

        {
          hidden: true , //用户包中
          path: '/home/updateRealName',
          component:  UpdateRealName  //重新实名认证
        },

        {
          hidden: true , //用户包中
          path: '/home/addRealName',
          component:  AddRealName  //重新实名认证
        },

        {
          hidden: true , //用户包中
          path: '/home/releaseWelfare',
          component:   ReleaseWelfare  //发布招聘
        },
        {
          hidden: true , //用户包中
          path: '/home/createMAndRAndP',
          component:   CreateMAndRAndP  //发布灭虫等
        },
        {
          hidden: true , //用户包中
          path: '/home/editMAndRAndP/:id',
          name: 'editMAndRAndP',
          component:   EditMAndRAndP  //发布灭虫等
        },
      ]
    },

    {
      path: '/',
      redirect: '/login'   //默认显示
    }


  ]





}




)
