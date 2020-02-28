<template>
  <div  id="container">
     <!--整体-->

    <div  id="banner">
         <!-- banner-->
      <div class="list-group">
        <!--生成路由链接-->
        <router-link to="/login/about_us" class="a">About_us关于我们</router-link>
        <router-link to="/login/register" class="a">register注册</router-link>
        <router-link to="/login/sign" class="a">sign登录</router-link>
        <router-link  v-on:click.native="isAuthenticationM" to="" class="a">全部服务</router-link>
      </div>

    </div>

    <div  id="body">
      <!--显示当前组件  自己的内容  router中设置默认显示的子组件-->
      <keep-alive>
        <router-view msg="abc"></router-view>
      </keep-alive>
    </div>
    <div id="footer">  底</div>

  </div>

</template>

<script>
  import { get_user_info } from '../api/api';
  export default {


    data() {
      return {
        pathHoneRelease:'/home/release'
      }
    },

    created () {

    },
    methods: {

      //判断是否实名和登陆状态 没有登陆点击控制台跳转登录页
      isAuthenticationM() {
        get_user_info().then((res) => {
          let status=res.status;
          if (status === 0) {
            this.$router.push({ path: '/home/release' });
          }else{
            this.$router.push({ path: '/login/sign' });
          }
        });
      },

    }}
</script>

<style >
body{

}
</style>
