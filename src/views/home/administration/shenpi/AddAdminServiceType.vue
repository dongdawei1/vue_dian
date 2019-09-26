<template>
  <div>
  <el-form :model="form" :rules="rules" ref="form"  class="demo-ruleForm" label-width="100px">
    <el-form-item  label="发布类型" prop="releaseType">
      <template>
        <el-radio-group v-model="form.releaseType">
          <el-radio :label="33" >电器/设备出售</el-radio>
          <el-radio :label="34" >二手电器/设备出售</el-radio>
          <el-radio :label="18" >维修电器/设备</el-radio>
          <el-radio :label="7" >酒水/饮料</el-radio>
          <el-radio :label="8" >消毒餐具</el-radio>
          <el-radio :label="4" >蔬菜出售</el-radio>
          <el-radio :label="5" >粮油出售</el-radio>
          <el-radio :label="6" >调料/副食出售</el-radio>
          <el-radio :label="29" >水产/禽蛋出售</el-radio>
          <el-radio :label="9" >清洁用品</el-radio>
          <el-radio :label="11" >桌椅餐具</el-radio>
        </el-radio-group>
      </template>
    </el-form-item>

    <el-form-item label="名  称"  prop="serviceTypeName">
      <el-input v-model="form.serviceTypeName" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitServiceType('form')"  v-loading.fullscreen.lock="fullscreenLoading"  >添加</el-button>
    </el-form-item>

  </el-form>
  </div>
</template>
<script>
  import { isRoleMessage } from '../../../../api/api';
  import { admin_create_serviceType } from '../../../../api/api';
  export default {
    data() {
      return {
        fullscreenLoading:false,
        form: {   //审核表单
          serviceTypeName:'',
          releaseType:''
        },
        rules: {
          releaseType: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          serviceTypeName: [
            { required: true, message: '名称不能为空', trigger: 'change' },
            { min: 1, max: 20, message: '名称长度在 1 到 20个字符', trigger: 'blur' }
          ]
        }
      }
    },

    created () {
    },
    methods: {
      submitServiceType() {
        this.fullscreenLoading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            admin_create_serviceType(this.form).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.$message.success("添加成功");
                this.form.serviceTypeName='';
              } else {
                isRoleMessage(res.msg);
              }
            });
          } else {
              this.fullscreenLoading=false;
              return false;
          }
        });
      },

    }
  }
</script>
<style>
</style>
