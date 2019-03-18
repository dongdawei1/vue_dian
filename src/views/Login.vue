<template>
  <div  id="container">
     <!--整体-->

    <div  id="banner">
         <!-- banner-->
      <div class="list-group">
        <!--生成路由链接-->
        <router-link to="/login/about_us" class="list-group-item">About_us关于我们</router-link>
        <router-link to="/login/register" class="list-group-item">register注册</router-link>
        <router-link to="/login/sign" class="list-group-item">sign登录</router-link>
        <router-link to="/home" class="list-group-item">全部服务</router-link>
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

</script>

<style >
body{

}
</style>
