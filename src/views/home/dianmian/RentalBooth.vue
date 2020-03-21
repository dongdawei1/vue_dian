<template>
  <div >
    <!--出租摊位-->
    <Fabulist :tableDataEnter="15" class="vm-margin"></Fabulist>
  </div>
</template>

<script>
  import Fabulist from '../../home/fabu/fabulist';
  export default {
    components: {
      Fabulist
    }
  }
</script>
