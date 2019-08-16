<template>
  <div >
    <!--出租摊位-->
    <RentList :tableDataEnter="tableDataEnter" class="vm-margin"></RentList>
  </div>
</template>

<script>
  import RentList from '../home/dianmian/RentList';
  export default {
    components: {
      RentList
    },
    data() {
      return {
        tableDataEnter:{
          StringPath:'/home/rentalBooth',
          releaseType:15
        },
      }
    }
  }
</script>
