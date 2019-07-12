<template>
  <div>
    类别，品牌，产地，价格，是否在价格有效期，
  <el-row  v-if="isbutten">
    <el-button type="primary"><router-link
      v-on:click.native="isAuthenticationM"
      to="" class="a" >发布信息</router-link></el-button>
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
  import VmImageList from '../../../components/vm-image-list';
  import { get_user_info_sign } from '../../../api/api';
  import { get_user_info_jurisdiction } from '../../../api/api';
  export default {

    name: 'ImageList',
    components: {
      VmImageList
    },


    data() {
      return {
        resdata:'',
        role:'',
        isCreate:false,

        formInline: { //分页查询条件
          permissionid:5,
          user: '',
          region: ''
        },
        pathString:'/home/GrainAndOilPage'
      }
    },

    created () {
      this.jurisdiction()
    },
    methods: {
      onSubmit() {
      },
      //判断是否实名和登陆状态
      isAuthenticationM(){
        if(this.resdata.isAuthentication !=2 ){
          this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能发布信息！</strong>', '用户信息不完善', {
            dangerouslyUseHTMLString: true
          });
          this.$router.push({ path: '/home/myAccount' });
        }else{
          get_user_info_sign(this.pathString);
        }
      },

      //判断是否登录 获取用户权限，并根据权限判断是否展示按钮
      jurisdiction(){
        get_user_info_jurisdiction(this.pathString).then((res) => {
          if(res.isCreate===true){
            this.isbutten=true;
          }
          this.resdata=res;
        });

      },
    }

  }
</script>


<style >
</style>
