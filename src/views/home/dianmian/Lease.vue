<template>
  <div >
    <!--出租店面-->
    <RentList :tableDataEnter="tableDataEnter" class="vm-margin"></RentList>
  </div>
</template>

<script>
  import RentList from './RentList';
  export default {
    components: {
      RentList
    },
    data() {
      return {
        tableDataEnter:{
          StringPath:'/home/lease',
          releaseType:14
        },
      }
    }
  }
</script>
