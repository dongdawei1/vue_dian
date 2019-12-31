<template>
  <div>2222</div>
</template>


<script>
  import {get_conduct_purchase_order} from '../../../api/api';
  import {isRoleMessage} from '../../../api/api';


  export default {
    data() {
      return {}
    },

    created() {
      this.checke_isButten();
    },
    methods: {
      checke_isButten() {
        get_conduct_purchase_order().then(res => {
          if (res.status === 0) {
            console.log(res)

          } else {
            isRoleMessage(res.msg);
          }
        });
      },
    }
  }

</script>
<style>
</style>
