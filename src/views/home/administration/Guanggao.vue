<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="添加广告/发布管理" name="sellectAddOrder" :key="'sellectAddOrder'">
      <AdminSellectAddOrder v-if="isAdminSellectAddOrder"></AdminSellectAddOrder>
    </el-tab-pane>

    <el-tab-pane label="广告管理" name="addAddOrder" :key="'addAddOrder'">
      <AdminAddAddOrder v-if="isAdminAddAddOrder"></AdminAddAddOrder>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import AdminSellectAddOrder from './guanggao/CreateGuanggao'
  import AdminAddAddOrder from './guanggao/GuangliGuanggao'


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
