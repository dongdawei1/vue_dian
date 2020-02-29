<template>
  <div class="vm-image-list">
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="用户名(必填)">
        <el-input v-model="realName.userName" placeholder="用户登陆系统名称" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getReleaseWelfareAll">查询</el-button>
      </el-form-item>
    </el-form>
    <!--c查询框结束-->

  </div>
</template>
<script>
  import { admin_guangggao_realName } from '../../../../api/api';

  import { regionData } from 'element-china-area-data'
  export default {
    data() {
      return {
        fullscreenLoading:false,
        options: regionData,//城市
        //分页结束
        realName: { //查询条件
          userName:'',
        },
      }
    },
    created () {

    },

    methods: {
      handleClick(id) {  //点击查看详细
        this.$router.push('/home/adminAddjiedan/'+id);  //带参数页面跳转  name:'editMAndRAndP',
      },


      getReleaseWelfareAll(){
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        if(this.realName.userName===''){
          this.$message.error("用户名不能为空");
          return false;
        }

        admin_guangggao_realName(this.realName.userName).then((res) => {
          if(res.status===0) {
  console.log(res)
          }else{
            this.$message.error(res.msg);
          }
        });
      },
      //城市组件
      handleChange (value) {
      },





    },
    watch: {
      "$route"(to,from){
        if(to.path==='/home/businessEnquiry'){
          this.getReleaseWelfareAllSelect();
        }
      }


    }
  }
</script>
<style>

</style>
