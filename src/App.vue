<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <!--   <router-view :key="$route.fullPath" />    强制刷新-->
      <router-view v-if="isRouterAlive"></router-view>
    </transition>

  </div>

</template>

<script>
  export default {
    name: 'app',


    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isRouterAlive: true
      };
    },
    methods: {
      //刷新当前页面
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>

<style>

</style>
