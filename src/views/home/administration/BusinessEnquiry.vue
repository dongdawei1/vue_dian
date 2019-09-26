<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="接单申请" name="sellectAddOrder" :key="'sellectAddOrder'">
      <AdminSellectAddOrder v-if="isAdminSellectAddOrder"></AdminSellectAddOrder>
    </el-tab-pane>


  </el-tabs>
</template>

<script>
  import AdminSellectAddOrder from './jiedanguanli/AdminSellectAddOrder'

  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';

  export default {
    components: {
      AdminSellectAddOrder:AdminSellectAddOrder,

    },

    data() {
      return {
        activeName: 'sellectAddOrder',//默认打开的导航
        isAdminSellectAddOrder:true,
      };
    },

    created () {

    },

    methods: {
      handleClick(tab, event) {
        if(tab.name === "sellectAddOrder") {
          this.isAdminSellectAddOrder=true;
        }else if(tab.name === "rcruit") {
          this.isAdminSellectAddOrder=false;
        }

      },


    }
  };
</script>


<style >

</style>
