<template>
  <!--酒水-->
  <div >
    <WineAndTablewareAll :tableDataEnter="7" class="vm-margin"></WineAndTablewareAll>
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
