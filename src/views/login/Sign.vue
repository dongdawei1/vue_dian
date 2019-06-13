<!--登陆页-->

<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">

      <div class="site-content">
        <!--
     <div class="brand-info">
       <h2 class="brand-info__text">renren-fast-vue</h2>
       <p class="brand-info__intro">renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案。</p>
     </div> -->
     <div class="login-main">

       <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
         <h3 class="login-title">管理员登录</h3>
         <el-form-item prop="userName">
           <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
         </el-form-item>
         <el-form-item prop="password">
           <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
         </el-form-item>
         <el-form-item prop="captcha">
           <el-row :gutter="20">
             <el-col :span="14">
               <el-input v-model="dataForm.captcha" placeholder="验证码">
               </el-input>
             </el-col>
             <el-col :span="10" class="login-captcha">
               <img :src="captchaPath" @click="getCaptcha()" alt="">
             </el-col>
           </el-row>
         </el-form-item>
         <el-form-item>
           <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()"  v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
 </div>
</div>

</template>

<script>
// import { getUUID } from '@/utils';
import { requestLogin } from '../../api/api';
import { getCaptcha1 } from '../../api/api';
import { get_user_info } from '../../api/api';


export default {
 data () {
   return {
     dataForm: {
       userName: '',
       password: '',
       uuid: '',
       captcha: ''
     },
     dataRule: {
       userName: [
         { required: true, message: '帐号不能为空', trigger: 'blur' }
       ],
       password: [
         { required: true, message: '密码不能为空', trigger: 'blur' }
       ],
       captcha: [
         { required: true, message: '验证码不能为空', trigger: 'blur' }
       ]
     },
     captchaPath: '',
     fullscreenLoading: false
   }
 },
 created () {
   this.islogin(),
   this.getCaptcha()
 },
 methods: {
   // 提交表单
   dataFormSubmit () {
     this.$refs['dataForm'].validate((valid) => {

       if (valid) {

         //NProgress.start();
         var loginParams = {
           'username': this.dataForm.userName,
           'password': this.dataForm.password,
           // 'uuid': this.dataForm.uuid,
           'uuid':1,
           'captcha': this.dataForm.captcha
         };
         this.fullscreenLoading = true;
         requestLogin(loginParams).then(data => {
             this.fullscreenLoading = false;
           let { msg, code, user } = data;
           if (data && data.status === 0) {
           this.$router.push({ path: '/home/release' });
           }  else {
             this.getCaptcha()
             this.$message.error(data.msg)
           }
         });
       } else {
         return false;
       }

     })
   },

   //判断是否登录
   islogin(){
     get_user_info().then((res) => {
       let status=res.status;
       if (status === 0) {
          this.$router.push({ path: '/home/release' });
       }else{
         this.$router.push({ path: '/login/sign' });
       }
     });
   },


   // 获取验证码
   getCaptcha () {
     // this.dataForm.uuid = getUUID()
     // var uuid={"uuid":this.dataForm.uuid};
     //var uuid=Math.random()*10000000;
     var uuid=1;
     console.log(uuid)
     this.captchaPath = getCaptcha1(uuid).then((res) => {

       this.captchaPath=res.data.msg

     });
   }



 }
}
</script>

<style lang="scss">
  /*
  .site-wrapper.site-page--login {
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background-color: rgba(38, 50, 56, .6);
 overflow: hidden;
 &:before {
   position: fixed;
   top: 0;
   left: 0;
   z-index: -1;
   width: 100%;
   height: 100%;
   content: "";

  // background-image: url(~@/assets/img/login_bg.jpg);
   background-size: cover;
 }
 .site-content__wrapper {
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   padding: 0;
   margin: 0;
   overflow-x: hidden;
   overflow-y: auto;
   background-color: transparent;
 }
 .site-content {
   min-height: 100%;
   padding: 30px 500px 30px 30px;
 }
 .brand-info {
   margin: 220px 100px 0 90px;
   color: #fff;
 }
 .brand-info__text {
   margin:  0 0 22px 0;
   font-size: 48px;
   font-weight: 400;
   text-transform : uppercase;
 }
 .brand-info__intro {
   margin: 10px 0;
   font-size: 16px;
   line-height: 1.58;
   opacity: .6;
 }
 .login-main {

   水平方向居中
   justify-content: center;
   垂直方向居中
 align-items: center;
 生成边框
display: flex;

  position: absolute;

  top: 0;
  right: 0;
  padding: 150px 60px 180px;
  width: 470px;
  min-height: 100%;
                 background-color: #fff;
  }
  .login-title {
    font-size: 16px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100px;
      cursor: pointer;
      height: 36px;
      vertical-align: middle;
      margin-top: -5px;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
  }


  */
</style>
