<template>
  <div>
  <p class="page-container">发布需求页</p>
  <el-form>
  <el-form-item  v-if="isCreate">
    <el-button type="primary"><router-link
      v-on:click.native="isAuthenticationM"
      to="" class="a" >发布招聘</router-link></el-button>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  export default {
    data() {
      return {
        user:'',
        isCreate:false,
        StringPath:'/home/release'
      }
    },

    created () {
      this.islogin()
    },
    methods: {

      //判断是否登录 获取用户权限
      islogin(){
          checke_isButten(this.StringPath).then((res) => {
            if(res.status!==0){
              isRoleMessage(res.msg);
            }
            this.user=res.data.data;  //字符串转换为 对象
            this.isCreate=res.data.isCreate; //是否展示发布键

        });
      },
    }

  }
</script>


<style >
</style>
