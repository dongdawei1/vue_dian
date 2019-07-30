<template>
  <div>
    wwww

{{id}}
  </div>
</template>
<script>


  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  import {  operation_usermrp } from '../../api/api';
  import { echo_display } from '../../api/api';
  import { get_usermrp_id } from '../../api/api';


  export default {
    name:'mrpDetails',
    data() {
      return {
        id:this.$route.params.id,
        StringPath:'menuAndRenovationAndPestControl',


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
