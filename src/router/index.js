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

import CreateWineAndTableware from '../views/home/wineAndTableware/jiushui/CreateWineAndTableware'
import EditWineAndTableware from '../views/home/wineAndTableware/jiushui/EditWineAndTableware'

import Clean from '../views/home/market/Clean'
import DepartmentStore from '../views/home/market/DepartmentStore'
import KitchenUtensils from '../views/home/market/KitchenUtensils'
import AquaticProduct from '../views/home/market/AquaticProduct'

import CreateFoodAndGrain from '../views/home/market/caiyou/CreateFoodAndGrain'
import EditFoodAndGrain from '../views/home/market/caiyou/EditFoodAndGrain'


import CreateDepartmentStore from '../views/home/market/baihuo/CreateDepartmentStore'
import EditDepartmentStore from '../views/home/market/baihuo/EditDepartmentStore'

import Menu from '../views/home/Menu'
import Lease from '../views/home/Lease'
import RentalBooth from '../views/home/RentalBooth'

import CreateLease from '../views/home/dianmian/CreateLease'
import CreateRentalBooth from '../views/home/dianmian/CreateRentalBooth'
import UpdateRent from '../views/home/dianmian/UpdateRent'

import RecruitWorkers from '../views/home/recruit/RecruitWorkers'
import JobWanted from '../views/home/recruit/JobWanted'
import ReleaseWelfare from '../views/home/recruit/zhiwei/ReleaseWelfare'

import Renovation from '../views/home/Renovation'
import PestControl from '../views/home/PestControl'

import Repair from '../views/home/equipment/Repair'
import NewEquipment from '../views/home/equipment/NewEquipment'
import OldEquipment from '../views/home/equipment/OldEquipment'
import CreateEquipment from '../views/home/equipment/dianqiAndershouAndweixiu/CreateEquipment'
import EditEquipment from '../views/home/equipment/dianqiAndershouAndweixiu/EditEquipment'



import MyRelease from '../views/home/userCenter/MyRelease'
import MyAccount from '../views/home/userCenter/MyAccount'
import Detailed from '../views/home/userCenter/Detailed'
import RealName  from '../views/home/shiming/RealName'
import UpdateRealName  from '../views/home/shiming/UpdateRealName'
import AddRealName  from '../views/home/shiming/AddAdminRealName'
import MyJobWanted  from '../views/home/userCenter/myreleases/MyJobWanted'
import CreateMAndRAndP  from '../views/home/meichong/CreateMAndRAndP'
import EditMAndRAndP  from '../views/home/meichong/EditMAndRAndP'


import Integral from '../views/home/Integral'
import Characteristic from '../views/home/Characteristic'

import WholesaleMarket from '../views/home/WholesaleMarket'
import CreateWholesaleMarket from '../views/home/wholesaleMarket/pifa/CreateWholesaleMarket'
import EditWholesaleMarket from '../views/home/wholesaleMarket/pifa/EditWholesaleMarket'

import ToExamine from '../views/home/administration/ToExamine'
import BusinessEnquiry from '../views/home/administration/BusinessEnquiry'
import AdminAddjiedan from '../views/home/administration/jiedanguanli/addjiedan/AdminAddjiedan'


import Details from '../views/Details.vue'
import MrpDetails  from '../views/detailes/MrpDetails'

import RentDetails  from '../views/detailes/RentDetails'
import EquipmentDetails  from '../views/detailes/EquipmentDetails'
import FoodAndGrainDetails  from '../views/detailes/FoodAndGrainDetails'
import WineAndTablewareDetails  from '../views/detailes/WineAndTablewareDetails'
import DepartmentStoreDetails  from '../views/detailes/DepartmentStoreDetails'
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
          path: '/details/mrpDetails/:id/:releaseType',
          name: 'mrpDetails',
          component:   MrpDetails  //发布灭虫等

        },
        {
          hidden: true , //用户包中
          path: '/details/rentDetails/:id/:releaseType',
          name: 'rentDetails',
          component:   RentDetails  //发布出租等
        },
        {
          hidden: true , //用户包中
          path: '/details/equipmentDetails/:id/:releaseType',
          name: 'equipmentDetails',
          component:   EquipmentDetails  //发布出租等
        },
        {
          hidden: true , //用户包中
          path: '/details/foodAndGrainDetails/:id/:releaseType',
          name: 'foodAndGrainDetails',
          component:   FoodAndGrainDetails  //发菜等
        },
        {
          hidden: true , //用户包中
          path: '/details/wineAndTablewareDetails/:id/:releaseType',
          name: 'wineAndTablewareDetails',
          component:   WineAndTablewareDetails  //酒等
        },
        {
          hidden: true , //用户包中
          path: '/details/departmentStoreDetails/:id/:releaseType',
          name: 'departmentStoreDetails',
          component:   DepartmentStoreDetails  //酒等
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
          path: '/home/editWholesaleMarket/:id',  //批发市场编辑商品
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
          path: '/home/createFoodAndGrain',
          component: CreateFoodAndGrain  //创建角色4下的菜单
        },
        {
          path: '/home/editFoodAndGrain/:id',  //编辑备电气维修
          name:'editFoodAndGrain',
          component: EditFoodAndGrain
        },
        {
          path: '/home/createWineAndTableware',
          component: CreateWineAndTableware  //创建角色4下的菜单
        },
        {
          path: '/home/editWineAndTableware/:id',  //编辑备电气维修
          name:'editWineAndTableware',
          component: EditWineAndTableware
        },

        {
          path: '/home/createDepartmentStore',
          component: CreateDepartmentStore  //创建角色4下的菜单
        },
        {
          path: '/home/editDepartmentStore/:id',  //编辑备电气维修
          name:'editDepartmentStore',
          component: EditDepartmentStore
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
        {
          path: '/home/createLease',  //创建店面
          component: CreateLease
        },
        {
          path: '/home/createRentalBooth',  //创建摊位
          component: CreateRentalBooth
        },
        {
          path: '/home/updateRent/:id',  //编辑摊位
          component: UpdateRent
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
          path: '/home/createEquipment',  //新建备电气维修
          component: CreateEquipment
        },
        {
          path: '/home/editEquipment/:id',  //编辑备电气维修
          name:'editEquipment',
          component: EditEquipment
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
