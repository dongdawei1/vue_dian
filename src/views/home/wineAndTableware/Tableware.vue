<template>
  <!--消毒餐具-->
  <div >
    <WineAndTablewareAll :tableDataEnter="8" class="vm-margin"></WineAndTablewareAll>
  </div>
</template>

<script>
  import WineAndTablewareAll from '../../../components/pages/WineAndTablewareAll';
  export default {
    components: {
      WineAndTablewareAll
    }
  }
</script>


<style >
</style>
