<template>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="我的首页" v-if="isPurchaseHome"  name="purchaseHome" :key="'purchaseHome'">
        <PurchaseHome v-if="changePurchaseHome"></PurchaseHome>
      </el-tab-pane>
      <el-tab-pane label="进行中的采购订单" v-if="isPurchaseConductOrder"  name="purchaseConductOrder" :key="'purchaseConductOrder'">
        <PurchaseConductOrder v-if="changePurchaseConductOrder"></PurchaseConductOrder>
      </el-tab-pane>





      <el-tab-pane label="我的首页" v-if="isSaleHome"  name="saleHome" :key="'saleHome'">
        <SaleHome v-if="changeSaleHome"></SaleHome>
      </el-tab-pane>

      <el-tab-pane label="待报价订单" v-if="isSaleOrderAll"  name="saleOrderAll" :key="'saleOrderAll'">
        <SaleOrderAll v-if="changeSaleOrderAll"></SaleOrderAll>
      </el-tab-pane>

      <el-tab-pane label="未完成送货的订单" v-if="isSaleConductOrder"  name="saleConductOrder" :key="'saleConductOrder'">
        <SaleConductOrder v-if="changeSaleConductOrder"></SaleConductOrder>
      </el-tab-pane>





    </el-tabs>

  <!--<div>-->
  <!--<p class="page-container">发布需求页</p>-->
  <!--<el-form>-->
  <!--<el-form-item  v-if="isCreate">-->
    <!--<el-button type="primary"><router-link-->
      <!--v-on:click.native="isAuthenticationM"-->
      <!--to="" class="a" >发布招聘</router-link></el-button>-->
  <!--</el-form-item>-->
  <!--</el-form>-->
  <!--</div>-->
</template>

<script>
  import PurchaseConductOrder from './releases/PurchaseConductOrder'
  import PurchaseHome from './releases/PurchaseHome'
  import SaleConductOrder from './releases/SaleConductOrder'
  import SaleHome from './releases/SaleHome'
  import SaleOrderAll from './releases/SaleOrderAll'


  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  export default {
    components: {
      PurchaseConductOrder:PurchaseConductOrder,
      PurchaseHome:PurchaseHome,
      SaleConductOrder:SaleConductOrder,
      SaleHome:SaleHome,
      SaleOrderAll:SaleOrderAll,
    },
    data() {
      return {

        changePurchaseConductOrder:false,
        changePurchaseHome:false,
        changeSaleConductOrder:false,
        changeSaleHome:false,
        changeSaleOrderAll:false,

        isPurchaseConductOrder:false,
        isPurchaseHome:false,
        isSaleConductOrder:false,
        isSaleHome:false,
        isSaleOrderAll:false,

        user:'',
        StringPath:'/home/release',
        activeName:this.$route.params.activeName,
      }
    },

    created () {
      this.islogin()
    },
    methods: {

      handleClick(tab, event) {
        if(tab.name === "purchaseHome") {
          this.changePurchaseConductOrder=false;
            this.changePurchaseHome=true;
            this.changeSaleConductOrder=false;
            this.changeSaleHome=false;
            this.changeSaleOrderAll=false;

        } else if(tab.name === "purchaseConductOrder") {
          this.changePurchaseConductOrder=true;
          this.changePurchaseHome=false;
          this.changeSaleConductOrder=false;
          this.changeSaleHome=false;
          this.changeSaleOrderAll=false;

        }else if(tab.name === "saleHome") {
          this.changePurchaseConductOrder=false;
          this.changePurchaseHome=false;
          this.changeSaleConductOrder=false;
          this.changeSaleHome=true;
          this.changeSaleOrderAll=false;
        }else if(tab.name === "saleOrderAll") {
          this.changePurchaseConductOrder=false;
          this.changePurchaseHome=false;
          this.changeSaleConductOrder=false;
          this.changeSaleHome=false;
          this.changeSaleOrderAll=true;
        }else if(tab.name === "saleConductOrder") {
          this.changePurchaseConductOrder=false;
          this.changePurchaseHome=false;
          this.changeSaleConductOrder=true;
          this.changeSaleHome=false;
          this.changeSaleOrderAll=false;
        }

      },


      //判断是否登录 获取用户权限
      islogin(){
          checke_isButten(this.StringPath).then((res) => {
            if(res.status!==0){
              isRoleMessage(res.msg);
            }
            this.user=res.data.data;  //字符串转换为 对象
            let role=this.user.role;
            if(role===1){
              this.isPurchaseConductOrder=true;
              this.isPurchaseHome=true;
              this.isSaleConductOrder=true;
              this.isSaleHome=true;
              this.isSaleOrderAll=true;

              this.changePurchaseHome=true;
              this.activeName='purchaseHome';
            }else if(role===2){
              this.isPurchaseConductOrder=true;
              this.isPurchaseHome=true;
              this.isSaleConductOrder=false;
              this.isSaleHome=false;
              this.isSaleOrderAll=false;

              this.changePurchaseHome=true;
              this.activeName='purchaseHome';
            }else if(role===4 ){
              this.isPurchaseConductOrder=false;
              this.isPurchaseHome=false;
              this.isSaleConductOrder=true;
              this.isSaleHome=true;
              this.isSaleOrderAll=true;

              this.changeSaleHome=true;
              this.activeName='saleHome';
            }else if(role===11 ||role===3 ||role===5 ||role===6 ||role===7 ||role===8 ||role===12||role===13 ){
              this.isPurchaseConductOrder=false;
              this.isPurchaseHome=false;
              this.isSaleConductOrder=false;
              this.isSaleHome=true;
              this.isSaleOrderAll=false;

              this.changeSaleHome=true;
              this.activeName='saleHome';
            }else {
              this.isPurchaseConductOrder=false;
              this.isPurchaseHome=false;
              this.isSaleConductOrder=false;
              this.isSaleHome=true;
              this.isSaleOrderAll=false;

              this.changeSaleHome=true;
              this.activeName='saleHome';
            }
        });
      },
    }

  }
</script>


<style >
</style>
