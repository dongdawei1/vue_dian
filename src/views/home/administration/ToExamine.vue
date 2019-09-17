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

    <el-tab-pane label="装修灭虫" name="third" :key="'third'">
      <Mrp v-if="isMrp"></Mrp>
    </el-tab-pane>

    <el-tab-pane label="租房" name="fourth" :key="'fourth'">
      <AdminMent v-if="isAdminMent"></AdminMent>
    </el-tab-pane>
    <el-tab-pane label="电器/维修" name="equipment" :key="'equipment'">
      <AdminEquipment  v-if="isAdminEquipment"></AdminEquipment>
    </el-tab-pane>

    <el-tab-pane label="菜米调料蛋" name="foodAndGrain" :key="'foodAndGrain'">
      <AdminFoodAndGrain  v-if="isAdminFoodAndGrain"></AdminFoodAndGrain>
    </el-tab-pane>

    <el-tab-pane label="酒水/消毒餐具" name="wineAndTableware" :key="'wineAndTableware'">
      <AdminWineAndTableware  v-if="isAdminWineAndTableware"></AdminWineAndTableware>
    </el-tab-pane>
    <el-tab-pane label="百货/工服" name="departmentStore" :key="'departmentStore'">
      <AdminDepartmentStore  v-if="isAdminDepartmentStore"></AdminDepartmentStore>
    </el-tab-pane>

    <el-tab-pane label="添加服务类型" name="addAdminServiceType" :key="'addAdminServiceType'">
      <AddAdminServiceType v-if="isAddAdminServiceType"></AddAdminServiceType>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import First from './First'
  import Recruit from './Recruit'
  import Resume from './Resume'
  import Mrp from './Mrp'
  import AdminMent from './AdminMent'
  import AdminEquipment from './AdminEquipment'
  import AdminFoodAndGrain from './AdminFoodAndGrain'
  import AdminWineAndTableware from './AdminWineAndTableware'
  import AddAdminServiceType from './AddAdminServiceType'
  import AdminDepartmentStore from './AdminDepartmentStore'
  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';

  export default {
    components: {
      First:First,
      Recruit:Recruit,
      Resume:Resume,
      Mrp:Mrp,
      AdminMent:AdminMent,
      AdminEquipment:AdminEquipment,
      AdminFoodAndGrain:AdminFoodAndGrain,
      AdminWineAndTableware:AdminWineAndTableware,
      AddAdminServiceType:AddAdminServiceType,
      AdminDepartmentStore:AdminDepartmentStore
    },

    data() {
      return {
        activeName: 'first',//默认打开的导航
          StringPath:'/home/toExamine',

        isFirst:true,
        isRecruit:false,
        isResume:false,
        isMrp:false,
        isAdminMent:false,
        isAdminEquipment:false,
        isAdminFoodAndGrain:false,
        isAdminWineAndTableware:false,
        isAddAdminServiceType:false,
        isAdminDepartmentStore:false
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
            this.isMrp=false;
            this.isAdminMent=false;
            this.isAdminEquipment=false;
            this.isAdminFoodAndGrain=false;
            this.isAdminWineAndTableware=false;
            this.isAddAdminServiceType=false;
            this.isAdminDepartmentStore=false;
        }else if(tab.name === "rcruit") {
          this.isFirst=false;
          this.isRecruit=true;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "resume") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=true;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "third") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=true;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "fourth") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=true;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "equipment") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=true;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "foodAndGrain") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=true;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "wineAndTableware") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=true;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=false;
        }else if(tab.name === "departmentStore") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=false;
          this.isAdminDepartmentStore=true;
        }else if(tab.name === "addAdminServiceType") {
          this.isFirst=false;
          this.isRecruit=false;
          this.isResume=false;
          this.isMrp=false;
          this.isAdminMent=false;
          this.isAdminEquipment=false;
          this.isAdminFoodAndGrain=false;
          this.isAdminWineAndTableware=false;
          this.isAddAdminServiceType=true;
          this.isAdminDepartmentStore=false;
        }



      },

      //判断是否登录
      islogin(){
        checke_isButten(this.StringPath).then((res) => {
        if(res.status!==0){
          isRoleMessage(res.msg);
        }
        });
      },
    }
  };
</script>


<style >

</style>
