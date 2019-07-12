<template>
  <p class="page-container">发布需求页</p>
</template>

<script>

  import { get_user_info } from '../../api/api';
  export default {
    data() {
      return {
        permission:'',
        role:'',
        isCreate:false

      }
    },

    created () {
      this.islogin()
    },
    methods: {

      //判断是否登录 获取用户权限
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status === 0) {
            this.permission=JSON.parse(res.data);  //字符串转换为 对象
            this.role=this.permission.role;
            if(this.role===1 ||this.role===4){
              this.isbutten=true;   //根据权限判断是否展示按钮
            }
          }else{
            if(res.msg==='用户未登录,无法获取当前用户的信息'){
              this.$router.push({ path: '/login/sign' });
            }
          }
        });
      },



    }

  }
</script>


<style >
</style>
