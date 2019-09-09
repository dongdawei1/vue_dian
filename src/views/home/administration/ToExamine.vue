<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实名审批" name="first">
      <First ></First>
    </el-tab-pane>

    <el-tab-pane label="招聘审批" name="rcruit">
      <Recruit></Recruit>
    </el-tab-pane>
    <el-tab-pane label="简历审批" name="resume">
      <Resume></Resume>
    </el-tab-pane>

    <el-tab-pane label="装修灭虫" name="third">
      <Mrp></Mrp>
    </el-tab-pane>

    <el-tab-pane label="租房审批" name="fourth">
      <AdminMent></AdminMent>
    </el-tab-pane>
    <el-tab-pane label="电器/维修" name="equipment">
      <AdminEquipment></AdminEquipment>
    </el-tab-pane>

    <el-tab-pane label="菜米调料蛋" name="foodAndGrain">
      <AdminFoodAndGrain></AdminFoodAndGrain>
    </el-tab-pane>

    <el-tab-pane label="酒水/消毒餐具" name="wineAndTableware">
      <AdminWineAndTableware></AdminWineAndTableware>
    </el-tab-pane>


  </el-tabs>
</template>

<script>
  import First from './First'
  import Recruit from './Recruit'
  import Resume from './Resume'
  import Mrp from './Mrp'
  import AdminMent from './AdminMent'
  import AdminEquipment from './AdminEquipment'
  import AdminFoodAndGrain from './AdminFoodAndGrain'
  import AdminWineAndTableware from './AdminWineAndTableware'
  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';

  export default {
    components: {
      First,
      Recruit,
      Resume,
      Mrp,
      AdminMent,
      AdminEquipment,
      AdminFoodAndGrain,
      AdminWineAndTableware
    },

    data() {
      return {
        activeName: 'first',//默认打开的导航
          StringPath:'/home/toExamine',
      };
    },

    created () {
      this.islogin();
    },

    methods: {
      handleClick() {
        this.islogin();
      },

      //判断是否登录
      islogin(){
        checke_isButten(this.StringPath).then((res) => {
        if(res.status!==0){
          isRoleMessage(res.msg);
        }
        });
      },
    }
  };
</script>


<style >

</style>
