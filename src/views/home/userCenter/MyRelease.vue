<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="采购发布" name="isPurchase"  v-if="isPurchase">
    </el-tab-pane>




    <el-tab-pane label="维修服务" name="isPurchase"  v-if="isRepair">
    </el-tab-pane>

    <el-tab-pane label="商品发布" name="isPurchase"  v-if="isCommodity">
    </el-tab-pane>



    <el-tab-pane label="消毒餐具" name="isTableware"  v-if="isTableware">
    </el-tab-pane>

    <el-tab-pane label="酒水" name="isWine"  v-if="isWine">
    </el-tab-pane>
    <el-tab-pane label="服装百货" name="isDepartmentStore"  v-if="isDepartmentStore">
    </el-tab-pane>

    <el-tab-pane label="电器/维修/二手物品" name="myEquipment"  v-if="isMyEquipment">
      <MyEquipment></MyEquipment>
    </el-tab-pane>
    <el-tab-pane label="摊位/店面信息" name="rent"  v-if="isRent">
      <MyRent></MyRent>
    </el-tab-pane>

    <el-tab-pane label="菜谱/装修/杀虫/广告牌" name="mrp"  v-if="isMenuAndRenovationAndPestControl">
    <MyMAndRAndP></MyMAndRAndP>
    </el-tab-pane>

    <el-tab-pane label="我的简历" name="myJobWanted"  v-if="isJobWanted">
      <MyJobWanted></MyJobWanted>
    </el-tab-pane>
    <el-tab-pane label="发布招聘" name="createPosition" v-if="isCreatePosition">
      <CreatePosition></CreatePosition>
    </el-tab-pane>

  </el-tabs>
</template>

<script>

  import CreatePosition from './myreleases/CreatePosition'
  import MyJobWanted from './myreleases/MyJobWanted'
  import MyMAndRAndP from './myreleases/MyMAndRAndP'
  import MyRent from './myreleases/MyRent'
  import MyEquipment from './myreleases/MyEquipment'


  import { get_user_info } from '../../../api/api';

  export default {
    components: {
      CreatePosition,
      MyJobWanted,
      MyMAndRAndP,
      MyRent,
      MyEquipment
    },

    data() {
      return {
        //商家2
        isCreatePosition:false,//发布职位权限 2,5

        isPurchase:false,//采购信息 2
        // 厨具/电器/设备维修3
        isMyEquipment:false,


        isRepair:false,//发布维修信息 3
        //蔬菜/调料/水产禽蛋4
        isCommodity:false,//发布商品 4,5
         isRent:false,//摊位出租4，5,6
        isWindowRental:false,//窗口出租 2,3,6
       //酒水/消毒餐具/清洁用品5
        isTableware:false,//消毒餐具5
        isWine:false,//酒水5

        //商铺/摊位出租6
        //装修/菜谱/广告牌/杀虫灭蟑
        isMenuAndRenovationAndPestControl:false,//菜谱 7 装修7 灭虫7

        //求职11
        isJobWanted:false,//求职11
        //工服百货
        isDepartmentStore:false,//百货12

        activeName: '',//默认打开的导航 ,根据每个不同的商户判断然后确认打开那个默认
        user:'', //用户
      };
    },

    created () {
      this.islogin();
    },

    methods: {

      handleClick(tab, event) {
      },

      //判断是否登录
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status !== 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            this.user=JSON.parse(res.data);
            let role=this.user.role;
           if(role===1){
             this.isPurchase=true;//采购信息 2
             this.isJobWanted=true;
             this.isCreatePosition=true;
             this.isMenuAndRenovationAndPestControl=true;
             this.isRent=true; //窗口123456
             this.isMyEquipment=true;//发布电器二手
            this.activeName='createPosition';
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
            }else if(role===4){
              this.isCommodity=true;
             this.isRent=true; //窗口123456
            }else if(role===5){
              this.isCreatePosition=true;
              this.isCommodity=true;//发布厨具 3
             this.isRent=true; //窗口123456
              this.isTableware=true;//消毒餐具5
              this.isWine=true;//酒水5
            }else if(role===6){
             this.isRent=true; //窗口123456
             this.activeName='rent';
            }else if(role===7){
              this.isMenuAndRenovationAndPestControl=true;//菜谱 7//装修7//灭虫7
             this.activeName='mrp';
            }else if(role===11){
              this.activeName='myJobWanted';
              this.isJobWanted=true;
            }else if(role===12){
              this.isDepartmentStore=true;
            }


          }
        });
      },
    }
  };
</script>


<style >

</style>
