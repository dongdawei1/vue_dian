<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
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
  .a{
    text-decoration: none;
  /**设置所有的链接class=a没有下划线 */
  }
</style>
