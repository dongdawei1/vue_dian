<template>
  <div>
    <StorefrontPublic  :tableData="resdata"></StorefrontPublic>
  </div>
</template>
<script>
  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';
  import  StorefrontPublic  from './StorefrontPublic';
  export default {
    components: {StorefrontPublic},
    data() {
      return {
        StringPath:'/home/rentalBooth',
        resdata:{
          roleType:'',
        }
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {
      //
      checke_isButten(){
        checke_isButten(this.StringPath).then((res) => {
          if(res.status===0){
            if (res.data.isCreate === true) {
              this.resdata =res.data.data;
              this.resdata.roleType =1;//摊位等于1
            } else {
              this.$router.push({path: '/home/release'});
            }
            if (res.data.isAuthentication !== 2) {
              this.$router.push({path: '/home/myAccount'});
            }else {
              this.getRealName();
            }}else{
            isRoleMessage(res.msg);
          }
        });
      },

    }
  }
</script>
<style>
</style>
