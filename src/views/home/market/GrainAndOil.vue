<template>
  <div>
  <p class="page-container">粮油</p>
    类别，品牌，产地，价格，是否在价格有效期，
  <el-row  v-if="isbutten">
    <el-button type="primary"><router-link
      v-on:click.native="isAuthenticationM"
      to="/home/grainAndOil">发布信息</router-link></el-button>

  </el-row>
    <!-- 筛选区 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>


    <VmImageList :dataInline="formInline" class="vm-margin"></VmImageList>


    </div>
</template>


<script>
  import VmImageList from '../../../components/vm-image-list'
  import { get_user_info } from '../../../api/api';

  export default {

    name: 'ImageList',
    components: {
      VmImageList
    },


    data() {
      return {
        permission:'',
        role:'',
       isbutten:false,

        formInline: {
          permissionid:5,
          user: '',
          region: ''
        }








      }
    },

    created () {
      this.islogin()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

      isAuthenticationM(){
         let isAuthentication= this.permission.isAuthentication;
        console.log(isAuthentication);
        console.log(this.permission.isAuthentication);

        if(isAuthentication!=1){
          this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能发布信息！</strong>', '用户信息不完善', {
            dangerouslyUseHTMLString: true
          });
          this.$router.push({ path: '/home/myAccount' });
        }else{
           this.$router.push({ path: '/home/GrainAndOilPage' });
        }

      },


      //判断是否登录 获取用户权限
      islogin(){
        get_user_info().then((res) => {

          let status=res.data.status;
          console.log(res);

          if (status === 0) {
           this.permission=JSON.parse(res.data.data);  //字符串转换为 对象




          this.role=this.permission.role;
           if(this.role===1 ||this.role===4){
             this.isbutten=true;
           }

          }else{
            console.log(res)
            this.$router.push({ path: '/login/sign' });
          }
        });
      },



    }

  }
</script>


<style >
</style>
