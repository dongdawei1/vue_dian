<template>
  <!--店面/窗口出租-->
  <div>
    <StorefrontPublic  :tableDataEnter="StringPath"></StorefrontPublic>
  </div>
</template>
<script>

  import  StorefrontPublic  from './StorefrontPublic';
  export default {
    components: {StorefrontPublic},
    data() {
      return {
        StringPath:'/home/rentalBooth',
      }
    },

    created () {
    },
    methods: {

    }
  }
</script>
<style>
</style>
