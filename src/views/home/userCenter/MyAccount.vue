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
               <el-input v-model="form.username" autocomplete="off" :placeholder="form.username" readonly="readonly"  :disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="手机号" :label-width="formLabelWidth"  prop="mobilePhone"  >
               <el-input v-model="form.mobilePhone" autocomplete="off" :placeholder="form.mobilePhone"></el-input>
             </el-form-item>

             <el-form-item label="原始密码" :label-width="formLabelWidth" prop="rowPassword">
               <el-input type="password" v-model="form.rowPassword" autocomplete="off" placeholder="请输入原始密码"></el-input>
             </el-form-item>

             <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
               <el-input type="password" v-model="form.newPassword" autocomplete="off" placeholder="若不修改密码可以不填写"></el-input>
             </el-form-item>
             <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkenewPassword">
               <el-input type="password" v-model="form.checkenewPassword" autocomplete="off" placeholder="密码修改成功后会跳转至登陆页"></el-input>
             </el-form-item>

           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
           </div>
         </el-dialog>

        <el-button type="info" plain  v-if="isButtenRealName" ><router-link
          v-on:click.native=""
          to="/home/realName"  class="a">立即实名 </router-link></el-button>
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
  import { update_information } from '../../../api/api';

  export default {
    data() {

      return {

        user: '',
        isButtenRealName:false,
        isButtenRealInif:false,
        dialogFormVisible: false, //修改 用户基本信息弹窗
        logining : false,
        fullscreenLoading: false,
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
            {  trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          checkenewPassword: [
            {  trigger: 'blur' }
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
      //修改基本信息
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            //this.logining = true;
            console.log(this.form)
            let loginParams = {
              'username': this.form.username,
              'mobilePhone': this.form.mobilePhone,
              'rowPassword': this.form.rowPassword,
              'newPassword': this.form.newPassword,
              'checkenewPassword':  this.form.checkenewPassword
            };
            this.fullscreenLoading = true;
            update_information(loginParams).then(data => {
              this.fullscreenLoading = false;
             console.log(data)
              let status=data.status;
              let msg=data.msg;
              if(status===0){
                  if(msg==="编辑成功重新登陆"){
                    this.$message.success("修改密码成功请重新登陆");
                  //  sleep(2000);
                    this.dialogFormVisible = false;
                    this.$router.push({ path: '/login/sign' });
                  }else{
                    this.dialogFormVisible = false;
                    this.islogin_getuserinif()
                    this.$message.success(msg);
                    this.form.rowPassword='';
                    this.form.newPassword='';
                    this.form.checkenewPassword='';
                  }
              }else{
                if(msg==="登录过期"){
                  this.$router.push({ path: '/login/sign' });
                }else{
                  this.$message.error(msg)
                }
              }

            });
          } else {
            console.log('系统异常');
            return false;
          }
        });
      },


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
