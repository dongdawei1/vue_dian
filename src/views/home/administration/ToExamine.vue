<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实名" name="first" :key="'first'">
      <First v-if="isFirst"></First>
    </el-tab-pane>

    <el-tab-pane label="招聘" name="rcruit" :key="'rcruit'">
      <Recruit v-if="isRecruit"></Recruit>
    </el-tab-pane>
    <el-tab-pane label="简历" name="resume" :key="'resume'">
      <Resume v-if="isResume"></Resume>
    </el-tab-pane>
    <el-tab-pane label="全部发布" name="foodAndGrain" :key="'foodAndGrain'">
      <AdminFoodAndGrain  v-if="isAdminFoodAndGrain"></AdminFoodAndGrain>
    </el-tab-pane>

    <el-tab-pane label="批发菜米调料蛋" name="wholesaleCommodity" :key="'wholesaleCommodity'">
      <AdminWholesaleCommodity  v-if="isAdminWholesaleCommodity"></AdminWholesaleCommodity>
    </el-tab-pane>


    <el-tab-pane label="添加服务类型" name="addAdminServiceType" :key="'addAdminServiceType'">
      <AddAdminServiceType v-if="isAddAdminServiceType"></AddAdminServiceType>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import First from './shenpi/First'
  import Recruit from './shenpi/Recruit'
  import Resume from './shenpi/Resume'

  import AdminFoodAndGrain from './shenpi/AdminFoodAndGrain'
  import AddAdminServiceType from './shenpi/AddAdminServiceType'

  import  AdminWholesaleCommodity from './shenpi/AdminWholesaleCommodity'


  export default {
    components: {
      First:First,
      Recruit:Recruit,
      Resume:Resume,
      AdminFoodAndGrain:AdminFoodAndGrain,
      AddAdminServiceType:AddAdminServiceType,

      AdminWholesaleCommodity:AdminWholesaleCommodity,
    },

    data() {
      return {
        activeName: 'first',//默认打开的导航
          StringPath:'/home/toExamine',

        isFirst:true,
        isRecruit:false,
        isResume:false,
        isAdminFoodAndGrain:false,

        isAddAdminServiceType:false,

        isAdminWholesaleCommodity:false,
      };
    },

    created () {
      this.islogin();
    },

    methods: {
      handleClick(tab, event) {
        if(tab.name === "first") {
          this.isFirst=true;
          this.isRecruit=false;
            this.isResume=false;
            this.isAdminFoodAndGrain=false;
            this.isAddAdminServiceType=false;

          this.isAdminWholesaleCommodity=false;
        }else if(tab.name === "rcruit") {
          this.isFirst=false;
          this.isRecruit=true;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminFoodAndGrain=false;
          this.isAddAdminServiceType=false;

          this.isAdminWholesaleCommodity=false;
        }else if(tab.name === "resume") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=true;
          this.isAdminFoodAndGrain=false;
          this.isAddAdminServiceType=false;

          this.isAdminWholesaleCommodity=false;
        }else if(tab.name === "foodAndGrain") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isAdminFoodAndGrain=true;
          this.isAddAdminServiceType=false;

          this.isAdminWholesaleCommodity=false;
        }else if(tab.name === "addAdminServiceType") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isAdminFoodAndGrain=false;
          this.isAddAdminServiceType=true;

          this.isAdminWholesaleCommodity=false;
        }
        else if(tab.name === "wholesaleCommodity") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isAdminFoodAndGrain=false;
          this.isAddAdminServiceType=false;

          this.isAdminWholesaleCommodity=true;
        }


      },

      //判断是否登录
      islogin(){
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
      },
    }
  };
</script>


<style >

</style>
