<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="采购发布" name="isPurchase"  v-if="isPurchase">
    </el-tab-pane>

    <el-tab-pane label="窗口出租" name="isWindowRental" v-if="isWindowRental">
    </el-tab-pane>

    <el-tab-pane label="厨具" name="isPurchase"  v-if="isKitchenUtensils">
    </el-tab-pane>

    <el-tab-pane label="维修服务" name="isPurchase"  v-if="isRepair">
    </el-tab-pane>

    <el-tab-pane label="商品发布" name="isPurchase"  v-if="isCommodity">
    </el-tab-pane>

    <el-tab-pane label="摊位信息" name="isPurchase"  v-if="isBooth">
    </el-tab-pane>

    <el-tab-pane label="消毒餐具" name="isTableware"  v-if="isTableware">
    </el-tab-pane>

    <el-tab-pane label="酒水" name="isWine"  v-if="isWine">
    </el-tab-pane>

    <el-tab-pane label="菜谱" name="isMenu"  v-if="isMenu">
    </el-tab-pane>

    <el-tab-pane label="装修服务" name="isRenovation"  v-if="isRenovation">
    </el-tab-pane>

    <el-tab-pane label="灭虫服务" name="isPestControl"  v-if="isPestControl">
    </el-tab-pane>

    <el-tab-pane label="我的简历" name="myJobWanted"  v-if="isJobWanted">
      <MyJobWanted></MyJobWanted>
    </el-tab-pane>
    <el-tab-pane label="服装百货" name="isDepartmentStore"  v-if="isDepartmentStore">
    </el-tab-pane>

    <el-tab-pane label="发布招聘" name="createPosition" v-if="isCreatePosition">
      <CreatePosition></CreatePosition>
    </el-tab-pane>

  </el-tabs>
</template>

<script>

  import CreatePosition from './myreleases/CreatePosition'
  import MyJobWanted from './myreleases/MyJobWanted'
  import { get_user_info } from '../../../api/api';

  export default {
    components: {
      CreatePosition,
      MyJobWanted
    },

    data() {
      return {
        //商家2
        isCreatePosition:false,//发布职位权限 2,5
        isWindowRental:false,//窗口出租 2,3,6
        isPurchase:false,//采购信息 2
        // 厨具/电器/设备维修3
        isKitchenUtensils:false,//发布厨具 3
        isRepair:false,//发布维修信息 3
        //蔬菜/调料/水产禽蛋4
        isCommodity:false,//发布商品 4,5
         isBooth:false,//摊位出租4，5,6

       //酒水/消毒餐具/清洁用品5
        isTableware:false,//消毒餐具5
        isWine:false,//酒水5

        //商铺/摊位出租6
        //装修/菜谱/广告牌/杀虫灭蟑
        isMenu:false,//菜谱 7
        isRenovation:false,//装修7
        isPestControl:false,//灭虫7
        //求职11
        isJobWanted:false,//求职11
        //工服百货
        isDepartmentStore:false,//百货12

        activeName: '',//默认打开的导航 ,根据每个不同的商户判断然后确认打开那个默认
        user:'' //用户

      };
    },

    created () {
      this.islogin();
    },

    methods: {
      handleClick(tab, event) {
        this.islogin();
      },

      //判断是否登录
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status != 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            this.user=JSON.parse(res.data);
            let role=this.user.role;
            if(role===1 ||role===2 ){
              this.isCreatePosition=true;
                this.isWindowRental=true;//窗口出租 2,3,6
                this.isPurchase=true;//采购信息 2
              this.activeName='createPosition';
            }else if(role===3){
              this.isWindowRental=true;
              this.isKitchenUtensils=true;//发布厨具 3
              this.isRepair=true;//发布维修信息 3
            }else if(role===4){
              this.isCommodity=true;
              this.isBooth=true;//发布厨具 3
            }else if(role===5){
              this.isCreatePosition=true;
              this.isCommodity=true;//发布厨具 3
              this.isBooth=true;//发布维修信息 3
              this.isTableware=true;//消毒餐具5
              this.isWine=true;//酒水5
            }else if(role===6){
              this.isWindowRental=true;//
              this.isBooth=true;//
            }else if(role===7){
              this.isMenu=true;//菜谱 7
                this.isRenovation=true;//装修7
                this.isPestControl=true;//灭虫7
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
