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
import Wine from '../views/home/wineAndTableware/Wine'
import Tableware from '../views/home/wineAndTableware/Tableware'

import Clean from '../views/home/market/Clean'
import DepartmentStore from '../views/home/market/DepartmentStore'
import KitchenUtensils from '../views/home/market/KitchenUtensils'
import AquaticProduct from '../views/home/market/AquaticProduct'




import Menu from '../views/home/meichong/Menu'
import Lease from '../views/home/dianmian/Lease'
import RentalBooth from '../views/home/dianmian/RentalBooth'



import RecruitWorkers from '../views/home/recruit/RecruitWorkers'
import JobWanted from '../views/home/recruit/JobWanted'
import ReleaseWelfare from '../views/home/recruit/zhaopin/ReleaseWelfare'

import CreateResume from '../views/home/recruit/jianli/CreateResume'
import UpResume from '../views/home/recruit/jianli/UpResume'


import Renovation from '../views/home/meichong/Renovation'
import PestControl from '../views/home/meichong/PestControl'

import Repair from '../views/home/equipment/Repair'
import NewEquipment from '../views/home/equipment/NewEquipment'
import OldEquipment from '../views/home/equipment/OldEquipment'

import crinformation  from '../views/home/fabu/crinformation'
import upinformation  from '../views/home/fabu/upinformation'
import crzuAndmie  from '../views/home/fabu/crzuAndmie'
import upzuAndmie  from '../views/home/fabu/upzuAndmie'

import MyRelease from '../views/home/userCenter/MyRelease'
import MyAccount from '../views/home/userCenter/MyAccount'
import Detailed from '../views/home/userCenter/Detailed'
import RealName  from '../views/home/shiming/RealName'
import UpdateRealName  from '../views/home/shiming/UpdateRealName'

import MyJobWanted  from '../views/home/userCenter/myreleases/MyJobWanted'



import Integral from '../views/home/Integral'
import Characteristic from '../views/home/Characteristic'

import WholesaleMarket from '../views/home/WholesaleMarket'
import CreateWholesaleMarket from '../views/home/wholesaleMarket/pifa/CreateWholesaleMarket'
import EditWholesaleMarket from '../views/home/wholesaleMarket/pifa/EditWholesaleMarket'

import ToExamine from '../views/home/administration/ToExamine'
import Guanggao from '../views/home/administration/Guanggao'
import BusinessEnquiry from '../views/home/administration/BusinessEnquiry'
import AdminAddjiedan from '../views/home/administration/jiedanguanli/addjiedan/AdminAddjiedan'
import AddRealName  from '../views/home/administration/tianjiashiming/AddAdminRealName'

import Details from '../views/Details.vue'

import EquipmentDetails  from '../views/detailes/EquipmentDetails'
import WholesaleCommodityDetailes  from '../views/detailes/WholesaleCommodityDetailes'

import PurchaseCreateOrder from '../views/home/releases/createOrder/PurchaseCreateOrder'




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
          path: '/details/equipmentDetails/:id/:releaseType',
          name: 'rentDetails',
          component:   EquipmentDetails  //发布出租等
        },


        {
          hidden: true , //用户包中
          path: '/details/wholesaleCommodityDetailes/:id/:releaseType',
          name: 'wholesaleCommodityDetailes',
          component:   WholesaleCommodityDetailes  //批发
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
        {
          path: '/home/purchaseCreateOrder',  //发布
          component: PurchaseCreateOrder
        },


        {
          path: '/home/wholesaleMarket',  //批发市场
          component: WholesaleMarket
        },
        {
          path: '/home/createWholesaleMarket',  //批发市场创建商品
          component: CreateWholesaleMarket
        },
        {
          path: '/home/editWholesaleMarket/:id',  //批发市场创建商品
          component: EditWholesaleMarket
        },


       /*市场区开始*/
            {
              path: '/home/vegetables',
              component: Vegetables , //蔬菜
            },
            {
              path: '/home/grainAndOil',
              component: GrainAndOil,  //粮油
            },
            {
              path: '/home/seasoning',
              component: Seasoning , //调料
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
              component: KitchenUtensils  //普通餐具
            },
            {
              path: '/home/aquaticProduct',
              component: AquaticProduct  //水产禽蛋
           },




        {
          path: '/home/crinformation/:releaseType',
          component: crinformation  //创建发布
        },

        {
          path: '/home/upinformation/:releaseType/:id',
          component: upinformation  //编辑发布
        },
        {
          path: '/home/upzuAndmie/:releaseType/:id',
          component: upzuAndmie  //编辑灭虫，出租
        },


        {
          path: '/home/crzuAndmie/:releaseType',
          component: crzuAndmie  //创建发布
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
          path: '/home/lease',  //出租店面窗口列表
          component: Lease
        },
        {
          path: '/home/rentalBooth',  //出租摊位列表
          component: RentalBooth
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
          path: '/home/repair',  //设备电气维修
          component: Repair
        },
        {
          path: '/home/newEquipment',  //新设备电器
          component: NewEquipment
        },
        {
          path: '/home/oldEquipment',  //旧设备电气
          component: OldEquipment
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
          path: '/home/guanggao',
          component: Guanggao,

        },


        {
          path: '/home/businessEnquiry',
          component: BusinessEnquiry
        },
        {
          path: '/home/adminAddjiedan/:id',
          name:'adminAddjiedan',
          component: AdminAddjiedan
        },



        {
          path: '',
          redirect: '/home/release'
        },

//  跳转的页面


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
          path: '/home/createResume',
          component:   CreateResume  //发布简历
        },
        {
          hidden: true , //用户包中
          path: '/home/upResume',
          component:   UpResume  //修改简历
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
