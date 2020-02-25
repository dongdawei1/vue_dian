<template>
  <!--蔬菜区-->
  <div >
    <FoodAndGrainAll :tableDataEnter="4" class="vm-margin"></FoodAndGrainAll>
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
