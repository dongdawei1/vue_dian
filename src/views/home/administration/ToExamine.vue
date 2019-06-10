<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户实名审批" name="first">
      <First ></First>
    </el-tab-pane>



    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
  import First from './First'
  import { get_user_info } from '../../../api/api';

  export default {
    components: {
      First
    },

    data() {
      return {
        activeName: 'first',//默认打开的导航
      };
    },

    created () {
      this.islogin();
    },

    methods: {
      handleClick(tab, event) {
        this.islogin();
       // console.log(tab, event);
      },

      //判断是否登录
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          console.log(res);
          if (status != 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            let user=JSON.parse(res.data);
            let role=user.role;
            if(role!=1){
              this.$router.push({ path: '/home/release' });
            }
          }
        });
      },



    }
  };
</script>


<style >

</style>
