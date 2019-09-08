<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <!--   <router-view :key="$route.fullPath" />    强制刷新-->
    <router-view></router-view>
    </transition>

  </div>

</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }

</script>

<style >

</style>
