<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实名审批" name="first">
      <First ></First>
    </el-tab-pane>

    <el-tab-pane label="招聘审批" name="rcruit">
      <Recruit></Recruit>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
  import First from './First'
  import Recruit from './Recruit'
  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';

  export default {
    components: {
      First,
      Recruit
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
