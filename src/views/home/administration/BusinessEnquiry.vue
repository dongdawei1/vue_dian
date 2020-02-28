<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="接单申请" name="sellectAddOrder" :key="'sellectAddOrder'">
      <AdminSellectAddOrder v-if="isAdminSellectAddOrder"></AdminSellectAddOrder>
    </el-tab-pane>

    <el-tab-pane label="添加接单" name="addAddOrder" :key="'addAddOrder'">
      <AdminAddAddOrder v-if="isAdminAddAddOrder"></AdminAddAddOrder>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import AdminSellectAddOrder from './jiedanguanli/AdminSellectAddOrder'
  import AdminAddAddOrder from './jiedanguanli/AdminAddAddOrder'


  export default {
    components: {
      AdminSellectAddOrder:AdminSellectAddOrder,
      AdminAddAddOrder:AdminAddAddOrder,
    },

    data() {
      return {
        activeName: 'sellectAddOrder',//默认打开的导航
        isAdminSellectAddOrder:true,
        isAdminAddAddOrder:false,
      };
    },

    created () {

    },

    methods: {
      handleClick(tab, event) {
        if(tab.name === "sellectAddOrder") {
          this.isAdminSellectAddOrder=true;
          this.isAdminAddAddOrder=false;
        }else if(tab.name === "addAddOrder") {
          this.isAdminSellectAddOrder=false;
          this.isAdminAddAddOrder=true;
        }

      },


    }
  };
</script>


<style >

</style>
