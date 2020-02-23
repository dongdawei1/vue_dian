
<!--注册页-->
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
    <el-input v-model="ruleForm.mobilePhone"  placeholder="请输入手机号"></el-input>
  </el-form-item>

  <el-form-item label="选择角色" prop="role">
    <el-radio-group v-model="ruleForm.role">
      <el-radio :label="2">餐饮/酒店等企业</el-radio>
      <el-radio :label="3">厨具/电器/设备维修</el-radio>
      <el-radio :label="4">蔬菜/调料/粮油/水产禽蛋/清洁用品/桌椅餐具等零售商</el-radio>
      <el-radio :label="5">酒水/消毒餐具</el-radio>
      <el-radio :label="6">商铺/摊位出租</el-radio>
      <el-radio :label="7">装修/菜谱/广告牌/杀虫灭蟑</el-radio>
      <el-radio :label="8">无店面自由直供</el-radio>
      <el-radio :label="11">求职</el-radio>
      <el-radio :label="12">工服/百货/绿植/装饰用品</el-radio>
      <el-radio :label="13">蔬菜/调料/粮油/水产禽蛋/清洁用品等批发商</el-radio>
      <!--<el-radio :label="10">淘特色农产品</el-radio> -->
    </el-radio-group>
  </el-form-item>

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
  </el-form-item>
</el-form>

<!--注册成功时弹窗-->
    <el-dialog
      title="注册成功"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请您牢记用户名和密码，并定期更换密码！</span>
      <span>关闭弹窗进入控制台</span>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>



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
          uuid: '',    //生成验证码对应的 id
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
        },
        captchaPath: '',
        fullscreenLoading: false,
        dialogVisible: false //注册成功后弹窗
      };

    },
    created () {
      this.getCaptcha()
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {

          if (valid) {
            var loginParams = {
             'name': this.ruleForm.name,
              'pass': this.ruleForm.pass,
              'checkPass': this.ruleForm.checkPass,
              'mobilePhone': this.ruleForm.mobilePhone,
              'role': this.ruleForm.role,
              'uuid': this.ruleForm.uuid,
              'captcha': this.ruleForm.captcha
            };
            this.fullscreenLoading = true;
            requestCreate(loginParams).then(data => {
              this.fullscreenLoading = false;

              if (data && data.status === 0) {
                this.dialogVisible= true;
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
      //注册成功后弹窗
      handleClose(done) {
        done();
        this.$router.push({ path: '/home/release' });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取验证码
      getCaptcha () {
        this.ruleForm.uuid=Date.parse(new Date());
        this.captchaPath = getCaptcha1(this.ruleForm.uuid).then((res) => {
          this.captchaPath=res.data.msg

        });
      }
    }
  }
</script>
<style >

</style>
