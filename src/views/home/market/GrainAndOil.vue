<template>
  <!--粮油-->
  <div >
    <FoodAndGrainAll :tableDataEnter="5" class="vm-margin"></FoodAndGrainAll>
  </div>
</template>

<script>
  import FoodAndGrainAll from '../../../components/pages/FoodAndGrainAll';
  export default {
    components: {
      FoodAndGrainAll
    }
  }
</script>


<style >
</style>
