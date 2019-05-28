<template>
  <div  class="gerentablecss">
    <span>用户基本信息</span>
    <div  class="gerentablecss_content">
      <span>用户名 : {{ user.username }}</span><br>
      <span>手机号 : {{ user.mobilePhone}}</span><br>
    </div>
    <div  class="gerentablecss_butten">
       <el-row>
        <el-button type="info" plain   @click="dialogFormVisible = true">修改基础信息</el-button>
         <!--修改基本信息弹窗-->
         <el-dialog title="编辑基本信息" :visible.sync="dialogFormVisible">
           <el-form :model="form" :rules="rules" ref="form">
             <el-form-item label="用户名" :label-width="formLabelWidth"  prop="username"  >
               <el-input v-model="form.username" autocomplete="off" :placeholder="form.username"></el-input>
             </el-form-item>
             <el-form-item label="手机号" :label-width="formLabelWidth"  prop="mobilePhone"  >
               <el-input v-model="form.mobilePhone" autocomplete="off" :placeholder="form.mobilePhone"></el-input>
             </el-form-item>

             <el-form-item label="原始密码" :label-width="formLabelWidth" prop="rowPassword">
               <el-input type="password" v-model="form.rowPassword" autocomplete="off" placeholder="请输入原始密码"></el-input>
             </el-form-item>

             <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
               <el-input type="password" v-model="form.newPassword" autocomplete="off" placeholder="数字和字母"></el-input>
             </el-form-item>
             <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkenewPassword">
               <el-input type="password" v-model="form.checkenewPassword" autocomplete="off" placeholder="请再输入一次密码"></el-input>
             </el-form-item>

           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitForm('form')">确 定</el-button>
           </div>
         </el-dialog>




        <el-button type="info" plain  v-if="isButtenRealName">立即实名</el-button>
       </el-row>
    </div>
    <div   v-if="isButtenRealInif"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>用户名 : {{ user.username }}</span><br>
        <span>手机号 : {{ user.mobilePhone}}</span><br>
      </div>
      <div  class="gerentablecss_butten">
        <el-row>
          <el-button type="info" plain>修改实名信息</el-button>
        </el-row>
      </div>
    </div>
  </div>

</template>


<script>
  import { get_user_info } from '../../../api/api';
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

        user: '',
        isButtenRealName:false,
        isButtenRealInif:false,
        dialogFormVisible: false, //修改 用户基本信息弹窗

        form: {
          username: '',
          mobilePhone: '',
          rowPassword: '',
          newPassword: '',
          checkenewPassword: '',
        },
        formLabelWidth: '120px',
        rules: {
          username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
        mobilePhone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
        ],
          rowPassword: [
            { required: true, message: '请输入原始密码', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass,required: true, trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          checkenewPassword: [
            { validator: validatePass2, required: true,trigger: 'blur' }
          ]
        },
      }
    },
    created () {
      this.islogin_getuserinif()
    },

    methods: {

      //判断是否登录
      islogin_getuserinif(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status === 0) {
            this.user=JSON.parse(res.data);
            this.form.username=this.user.username;
            this.form.mobilePhone=this.user.mobilePhone;
            console.log( this.user);
            if(this.user.isAuthentication===1){
              //拉取实名信息
              this.isButtenRealInif=true;

            }else {
              this.isButtenRealName=true;
            }
          }else{
            this.$router.push({ path: '/login/sign' });
          }
        });
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {

          }
        });
      }
    }
  }
</script>


<style >
.gerentablecss{
  font-size: 20px;
  padding:10px ;
}
  .gerentablecss_content{
    font-size: 17px;
    padding:20px  ;
  }
  .gerentablecss_butten{
    padding:5px 100px  ;
  }
</style>
