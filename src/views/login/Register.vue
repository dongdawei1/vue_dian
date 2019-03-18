

<template>

  <div>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


  <el-form-item label="店/用户名" prop="name"  >
    <el-input v-model="ruleForm.name"  placeholder="手机号/邮箱注册,8-18位"></el-input>
  </el-form-item>

  <el-form-item label="用户密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="数字和字母"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再输入一次密码"></el-input>
  </el-form-item>


  <el-form-item label="联系手机" prop="mobilePhone"  >
    <el-input v-model="ruleForm.mobilePhone"  placeholder="手机号"></el-input>
  </el-form-item>

  <el-form-item label="选择角色" prop="role">
    <el-radio-group v-model="ruleForm.role">
      <el-radio :label="2">餐饮/酒店等企业</el-radio>
      <el-radio :label="4">蔬菜/调料/酒水等销售商</el-radio>
      <el-radio :label="6">商铺出租/求职</el-radio>
      <el-radio :label="8">无店面自由直供</el-radio>
      <el-radio :label="10">淘特色农产品</el-radio>
    </el-radio-group>
  </el-form-item>


  <!-- 根据用户角色判断是否显示 营业执照      -->

  <!-- 下拉城市选择列表开始   城市，送货地址，送货方式 在下单时录入 ,营业执照在接单或者下单时录入
  <el-form-item label="省/城市/区" prop="region">
    <el-select
      v-model="sheng"
      @change="choseProvince"
      placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="shi"
      @change="choseCity"
      placeholder="市级地区">
      <el-option
        v-for="item in shi1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="qu"
      @change="choseBlock"
      placeholder="区级地区">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>

  </el-form-item>

  <el-form-item label="收货地址" prop="address"  >
    <el-input v-model="ruleForm.city"  placeholder="街道-市场名摊位号/店名"></el-input>
  </el-form-item>

    <el-form-item label="联系方式" prop="contact"  >
    <el-input v-model="ruleForm.contact"  placeholder="收/送货备用联系方式"></el-input>
  </el-form-item>


   -->

  <!--下来选择城市结束-->






  <el-form-item label="验证码"   prop="captcha">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-input v-model="ruleForm.captcha" placeholder="点击图片获取新验证码">
        </el-input>
      </el-col>
      <el-col :span="10" class="login-captcha">
        <img :src="captchaPath" @click="getCaptcha()" alt="">
      </el-col>
    </el-row>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')"  v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  </template>
<script>

  import { requestCreate } from '../../api/api';

  import { getCaptcha1 } from '../../api/api';

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          name: '',
          pass:'',
          checkPass:'',
          mobilePhone:'',  //手机号码
          role: '' ,  //角色
          captcha:'', //验证码
          uuid: ''    //生成验证码对应的 id
          // region: '',      //省/城市/区
          // city :'',        //详细地址
          // contact:''   //备用联系方式


        },
        rules: {
          name: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass,required: true, trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, required: true,trigger: 'blur' }
          ],
          mobilePhone:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          captcha: [
         { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]

         // city: [
         //    { required: true, message: '请输入地址', trigger: 'blur' },
         //    { min: 10, max: 40, message: '长度在 10 到 40 个字符', trigger: 'blur' }
         //  ],
         //  contact: [
         //    { required: true, message: '请输入联系方式', trigger: 'blur' },
         //    { min: 10, max: 40, message: '长度在 10 到 40 个字符', trigger: 'blur' }
         //  ]
        },
        captchaPath: '',
        fullscreenLoading: false
      };

    },
    created () {
      this.getCaptcha()
    },
    methods: {
      submitForm() {


        this.$refs['ruleForm'].validate((valid) => {

          if (valid) {

            this.logining = true;
            //NProgress.start();
            var loginParams = {



             'name': this.ruleForm.name,
              'pass': this.ruleForm.pass,
              'checkPass': this.ruleForm.checkPass,
              'mobilePhone': this.ruleForm.mobilePhone,
              'role': this.ruleForm.role,
             // 'uuid': this.dataForm.uuid,
              'uuid': 2,
              'captcha': this.ruleForm.captcha
            };

            this.fullscreenLoading = true;


            requestCreate(loginParams).then(data => {
              this.fullscreenLoading = false;

              let { msg, code, user } = data;
              if (data && data.status === 0) {
                console.log(data)
                // sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/home' });
                console.log(data)
              }  else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取验证码
      getCaptcha () {
        // this.dataForm.uuid = getUUID()
        // var uuid={"uuid":this.dataForm.uuid};
        //var uuid=Math.random()*10000000;
        var uuid=2;
        console.log(uuid)
        this.captchaPath = getCaptcha1(uuid).then((res) => {

          this.captchaPath=res.data.msg

        });
      }
    }
  }
</script>
<style >

</style>
