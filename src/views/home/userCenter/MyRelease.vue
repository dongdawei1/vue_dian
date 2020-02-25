<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">


    <el-tab-pane label="采购信息" name="myPurchase"  v-if="isPurchase" :key="'myPurchase'">
      <myPurchase v-if="purchase"></myPurchase>
    </el-tab-pane>


    <el-tab-pane label="酒水/消毒餐具" name="myWineAndTableware"  v-if="isWineAndTableware" :key="'myWineAndTableware'">
      <myWineAndTableware v-if="wineAndTableware"></myWineAndTableware>
    </el-tab-pane>

    <el-tab-pane label="电器/维修/二手物品" name="myEquipment"  v-if="isMyEquipment" :key="'myEquipment'">
      <myEquipment v-if="equipment"></myEquipment>
    </el-tab-pane>
    <el-tab-pane label="摊位/窗口/店面出租" name="rent"  v-if="isRent" :key="'rent'">
      <myRent v-if="rent"></myRent>
    </el-tab-pane>

    <el-tab-pane label="菜谱/装修/杀虫/广告牌" name="mrp"  v-if="isMenuAndRenovationAndPestControl" :key="'mrp'">
    <myMAndRAndP v-if="mAndRAndP"></myMAndRAndP>
    </el-tab-pane>

    <el-tab-pane label="我的简历" name="myJobWanted"  v-if="isJobWanted" :key="'myJobWanted'">
      <myJobWanted v-if="jobWanted"></myJobWanted>
    </el-tab-pane>

    <el-tab-pane label="发布米面/蔬菜/水产蛋禽" name="createFoodAndGrain" v-if="isFoodAndGrain" :key="'createFoodAndGrain'">
      <myFoodAndGrain v-if="createFoodAndGrain"></myFoodAndGrain>
    </el-tab-pane>

    <el-tab-pane label="招聘信息" name="createPosition" v-if="isCreatePosition" :key="'createPosition'">
      <myZhiWei v-if="zhiWei"></myZhiWei>
    </el-tab-pane>
    <el-tab-pane label="工服/绿植/百货/装饰用品" name="myDepartmentStore" v-if="isDepartmentStore" :key="'myDepartmentStore'">
      <myDepartmentStore v-if="departmentStore"></myDepartmentStore>
    </el-tab-pane>
    <el-tab-pane label="发布米面/蔬菜/水产蛋禽批发" name="myWholesaleCommodity" v-if="isWholesaleCommodity" :key="'myWholesaleCommodity'">
      <myWholesaleCommodity v-if="wholesaleCommodity" @change="change"></myWholesaleCommodity>
    </el-tab-pane>

    <el-tab-pane label="批发订单" name="myWholesaleCommodityOrder" v-if="isWholesaleCommodityOrder" :key="'myWholesaleCommodityOrder'">
      <myWholesaleCommodityOrder v-if="wholesaleCommodityOrder" @change="change" :CommodityId="commodityOrder"></myWholesaleCommodityOrder>
    </el-tab-pane>



  </el-tabs>
</template>

<script>

  import MyZhiWei from './myreleases/MyZhiWei'
  import MyJobWanted from './myreleases/MyJobWanted'
  import MyMAndRAndP from './myreleases/MyMAndRAndP'
  import MyRent from './myreleases/MyRent'
  import MyEquipment from './myreleases/MyEquipment'
  import MyFoodAndGrain from './myreleases/MyFoodAndGrain'
  import MyDepartmentStore from './myreleases/MyDepartmentStore'
  import MyWineAndTableware from './myreleases/MyWineAndTableware'
  import MyWholesaleCommodity from './myreleases/MyWholesaleCommodity'
  import MyWholesaleCommodityOrder from './myreleases/MyWholesaleCommodityOrder'
  import MyPurchase from './myreleases/MyPurchase'
  import { get_user_info } from '../../../api/api';

  export default {
    components: {
      myZhiWei:MyZhiWei,
      myJobWanted:MyJobWanted,
      myMAndRAndP:MyMAndRAndP,
      myRent:MyRent,
      myEquipment:MyEquipment,
      myFoodAndGrain:MyFoodAndGrain,
      myWineAndTableware:MyWineAndTableware,
      myDepartmentStore:MyDepartmentStore,
      myWholesaleCommodity:MyWholesaleCommodity,
      myWholesaleCommodityOrder:MyWholesaleCommodityOrder,
      myPurchase:MyPurchase

    },

    data() {
      return {
        commodityOrder:0,
        //服装百货  自己一个角色
         isDepartmentStore:false, //12角色
         departmentStore:false,
        //商家2
        isCreatePosition:false,//发布职位权限 2,5
        zhiWei:false,
        isPurchase:false,//采购信息 2
        purchase:false,
        // 厨具/电器/设备维修3
        isMyEquipment:false,
        equipment:false,
        isRent:false,//摊位出租4，5,6
        rent:false,
        isWindowRental:false,//窗口出租 2,3,6
       //酒水/消毒餐具
        isWineAndTableware:false,//酒水5
        wineAndTableware:false,
        //菜，米面，蛋禽
        isFoodAndGrain:false,//发布商品 4,5
        createFoodAndGrain:false,
        //商铺/摊位出租6
        //装修/菜谱/广告牌/杀虫灭蟑
        isMenuAndRenovationAndPestControl:false,//菜谱 7 装修7 灭虫7
        mAndRAndP:false,
        //求职11
        isJobWanted:false,//求职11
        jobWanted:false,

        isWholesaleCommodity:false,//批发
        wholesaleCommodity:false,

        isWholesaleCommodityOrder:false,
        wholesaleCommodityOrder:false,//批发订单

        activeName: '',//默认打开的导航 ,根据每个不同的商户判断然后确认打开那个默认
        user:'', //用户
        role:'',


      };
    },

    created () {
      this.islogin();
    },

    methods: {

      change(data){
        this.commodityOrder=data;
       this.activeName='myWholesaleCommodityOrder';
       this.wholesaleCommodity=false;
       this.wholesaleCommodityOrder=true;//批发订单
      },

      handleClick(tab, event) {

          if(tab.name === "mrp") {
          this.mAndRAndP=true;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;

          } else   if(tab.name === "myPurchase") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=true;
          }
          else if(tab.name === "myJobWanted") {
            this.mAndRAndP=false;
            this.jobWanted=true;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "createPosition") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=true;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "myWineAndTableware") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=true;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "myEquipment") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=true;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "rent") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=true;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "createFoodAndGrain") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=true;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "myDepartmentStore") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.wholesaleCommodity=false;
            this.departmentStore=true;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "myWholesaleCommodity") {
            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=true;
            this.wholesaleCommodityOrder=false;
            this.purchase=false;
          }else if(tab.name === "myWholesaleCommodityOrder") {
            this.commodityOrder=0;

            this.mAndRAndP=false;
            this.jobWanted=false;
            this.zhiWei=false;
            this.wineAndTableware=false;
            this.equipment=false;
            this.rent=false;
            this.createFoodAndGrain=false;
            this.departmentStore=false;
            this.wholesaleCommodity=false;
            this.wholesaleCommodityOrder=true;
            this.purchase=false;
          }


      },

      //判断是否登录
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status !== 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            this.user=res.data;
            let role=this.user.role;
            this.role=role;
           if(role===1){
             this.isPurchase=true;//采购信息 2
             this.isJobWanted=true;
             this.isCreatePosition=true;
             this.isMenuAndRenovationAndPestControl=true;
             this.isRent=true; //窗口123456
             this.isMyEquipment=true;//发布电器二手
             this.isFoodAndGrain=true;
             this.isWineAndTableware=true;
             this.isDepartmentStore=true;
             this.isWholesaleCommodity=true;
             this.mAndRAndP=true;
            this.activeName='mrp';
           }
           else if(role===2 ){
              this.isCreatePosition=true;  //招聘
               this.isPurchase=true;//采购信息 2
               this.isRent=true; //窗口123456
              this.activeName='createPosition';
            }else if(role===3){
             this.isRent=true; //窗口123456
              this.isWindowRental=true;
              this.isMyEquipment=true;//发布电器二手
             this.activeName='myEquipment';
            }else if(role===4){
             this.isFoodAndGrain=true;  //蔬菜调料
             this.isRent=true; //窗口123456
             this.activeName='createFoodAndGrain';
            }else if(role===5){
              this.isCreatePosition=true;
             this.isRent=true; //窗口123456
             this.isWineAndTableware=true;
             this.activeName='myWineAndTableware';
            }else if(role===6){
             this.rent=true;
             this.isRent=true; //窗口123456
             this.activeName='rent';
            }else if(role===7){
              this.isMenuAndRenovationAndPestControl=true;//菜谱 7//装修7//灭虫7
             this.mAndRAndP=true;
             this.activeName='mrp';
            }else if(role===11){
              this.activeName='myJobWanted';
              this.isJobWanted=true;
              this.jobWanted=true;
            }else if(role===12){
              this.isDepartmentStore=true;
              this.departmentStore=true;
             this.activeName='myDepartmentStore';
            }
           else if(role===13){
             this.isWholesaleCommodity=true;
             this.wholesaleCommodity=true;
             this.isWholesaleCommodityOrder=true;
             this.activeName='myWholesaleCommodity';
           }
          }
        });
      },
    }
  };
</script>


<style >

</style>
