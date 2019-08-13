<template>
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
        StringPath:'/home/lease',
      }
    },

    created () {

    }
  }
</script>
<style>

</style>
