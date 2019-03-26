<template>
  <dev>
  <p class="page-container">粮油</p>
  <el-row  v-if="isbutten">
    <el-button type="primary"><router-link to="/home/GrainAndOilPage">发布信息</router-link></el-button>
  </el-row>

    </dev>
</template>


<script>

  import { get_user_info } from '../../../api/api';
  export default {
    data() {
      return {
        permission:'',
        role:'',
       isbutten:false

      }
    },

    created () {
      this.islogin()
    },
    methods: {

      //判断是否登录 获取用户权限
      islogin(){
        get_user_info().then((res) => {

          let status=res.data.status;
          if (status === 0) {
           this.permission=JSON.parse(res.data.data);  //字符串转换为 对象
          this.role=this.permission.role;
           if(this.role===1 ||this.role===4){
             this.isbutten=true;
           }

          }else{
            console.log(res)
            this.$router.push({ path: '/login/sign' });
          }
        });
      },



    }

  }
</script>


<style >
</style>
