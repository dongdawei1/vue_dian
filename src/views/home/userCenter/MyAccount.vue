<template>
  <div  class="gerentablecss">
    <span>用户基本信息</span>
    <div  class="gerentablecss_content">
      <span>用户名 : {{ user.username }}</span><br>
      <span>手机号 : {{ user.mobilePhone}}</span><br>
    </div>
    <!--编辑基本信息弹窗开始-->
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
    <!--编辑基本信息弹窗结束-->
    <div  class="gerentablecss_butten">
       <el-row>
        <el-button type="info" plain   @click="dialogFormVisible = true">修改基础信息</el-button>
        <el-button type="info" plain  v-if="isButtenRealName" ><router-link
          v-on:click.native=""
          to="/home/realName"  class="a">立即实名 </router-link></el-button>
       </el-row>
    </div>
    <!--商户实名信息开始-->
    <div   v-if="isbusiness"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>城  区 : {{realName.detailed }}</span><br>
        <span>收/送货地址 : {{ realName.addressDetailed}}</span><br>
        <span>收/送货姓名 : {{ realName.consigneeName}}</span><br>
        <span>收/送人手机 : {{ realName.contact}}</span><br>
        <span>邮箱 : {{ realName.email}}</span><br>
        <span>实名状态 : {{ realName.authentiCationStatus}}</span><br>
        <span v-if="authentication_status">审核失败原因 : {{ realName.authentiCationFailure}}</span><br>
      </div>
      <div  class="gerentablecss_butten"  v-if="authentication_status" >
        <el-row>
          <el-button type="info" plain>
            <router-link
              v-on:click.native=""
              to="/home/updateRealName"  class="a">重新发起实名 </router-link></el-button>
        </el-row>
      </div>
    </div>
    <!--商户实名信息结束-->

    <!--批发商户开始-->
    <div   v-if="iswholesale"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>所在城区 : {{realName.detailed }}</span><br>
        <span>市场地址 : {{ realName.addressDetailed}}</span><br>
        <span>市场名 : {{ realName.companyName}}</span><br>
        <span>姓名 : {{ realName.consigneeName}}</span><br>
        <span>手机 : {{ realName.contact}}</span><br>
        <span>实名状态 : {{ realName.authentiCationStatus}}</span><br>
        <span v-if="authentication_status">审核失败原因 : {{ realName.authentiCationFailure}}</span><br>
      </div>
      <div  class="gerentablecss_butten"  v-if="authentication_status" >
        <el-row>
          <el-button type="info" plain>
            <router-link
              v-on:click.native=""
              to="/home/updateRealName"  class="a">重新发起实名 </router-link></el-button>
        </el-row>
      </div>
    </div>
    <!--批发商户结束-->

    <!--求职实名信息开始-->
    <div   v-if="iswanted"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>求职地域 : {{realName.detailed }}</span><br>
        <span>现居住地: {{ realName.addressDetailed}}</span><br>
        <span>姓名 : {{ realName.consigneeName}}</span><br>
        <span>手机 : {{ realName.contact}}</span><br>
        <span>性别 : {{ realName.gender}}</span><br>
        <span>年龄 : {{ realName.eag}}</span><br>
        <span>邮箱 : {{ realName.email}}</span><br>
        <span>实名状态 : {{ realName.authentiCationStatus}}</span><br>
        <span v-if="authentication_status">审核失败原因 : {{ realName.authentiCationFailure}}</span><br>
      </div>
      <div  class="gerentablecss_butten"  v-if="authentication_status" >
        <el-row>
          <el-button type="info" plain>
            <router-link
              v-on:click.native=""
              to="/home/updateRealName"  class="a">重新发起实名 </router-link></el-button>
        </el-row>
      </div>
    </div>
    <!--求职实名信息结束-->

    <!--租房实名信息开始-->
    <div   v-if="islease"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>城  区 : {{realName.detailed }}</span><br>
        <span>详细地址 : {{ realName.addressDetailed}}</span><br>
        <span>联系人姓名 : {{ realName.consigneeName}}</span><br>
        <span>联系方式 : {{ realName.contact}}</span><br>
        <span>邮箱 : {{ realName.email}}</span><br>
        <span>实名状态 : {{ realName.authentiCationStatus}}</span><br>
        <span v-if="authentication_status">审核失败原因 : {{ realName.authentiCationFailure}}</span><br>
      </div>
      <div  class="gerentablecss_butten"  v-if="authentication_status" >
        <el-row>
          <el-button type="info" plain>
            <router-link
              v-on:click.native=""
              to="/home/updateRealName"  class="a">重新发起实名 </router-link></el-button>
        </el-row>
      </div>
    </div>
    <!--租房实名信息结束-->

    <!--自由供货者已实名-->
    <div   v-if="isfree"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>城  区 : {{realName.detailed }}</span><br>
        <span>送货范围 : {{ realName.addressDetailed}}</span><br>
        <span>联系人姓名 : {{ realName.consigneeName}}</span><br>
        <span>联系方式 : {{ realName.contact}}</span><br>
        <span>邮箱 : {{ realName.email}}</span><br>
        <span>实名状态 : {{ realName.authentiCationStatus}}</span><br>
        <span v-if="authentication_status">审核失败原因 : {{ realName.authentiCationFailure}}</span><br>
      </div>
      <div  class="gerentablecss_butten"  v-if="authentication_status" >
        <el-row>
          <el-button type="info" plain>
            <router-link
              v-on:click.native=""
              to="/home/updateRealName"  class="a">重新发起实名 </router-link></el-button>
        </el-row>
      </div>
    </div>
    <!--自由供货者已实名-->

    <!--自由供货者未实名-->
    <div   v-if="isnotbusiness"   >
      <span>用户实名信息</span>
      <div  class="gerentablecss_content">
        <span>请联系客服进行线下实名</span><br>
      </div>
    </div>
    <!--自由供货者未实名-->
  </div>

</template>


<script>
  import { get_user_info } from '../../../api/api';
  import { update_information } from '../../../api/api';
  import { getRealName } from '../../../api/api';

  export default {
    data() {
      return {
        realName:'',
        user: '',
        isButtenRealName:false,   //没有实名显示立即实名按键
        isnotbusiness:false,//自由供货者显示这个
        dialogFormVisible: false, //修改 用户基本信息弹窗
        fullscreenLoading: false,
        //根据不同的角色显示不同的 详情
        isbusiness: false, //商家
        iswanted:false,//求职
        islease:false,//出租
        isfree:false,//自由供货者
        iswholesale:false,
        authentication_status:false, //审核是失败的状态

        form: {
          username: '',
          mobilePhone: '',
          rowPassword: '',
          newPassword: '',
          checkenewPassword: '',
        },
        formRealName: {
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
            this.user=res.data;
            let role=this.user.role;
            this.form.username=this.user.username;
            this.form.mobilePhone=this.user.mobilePhone;
            if(this.user.isAuthentication!==4){
              //拉取实名信息
              getRealName().then((res) => {
                if(res.status ===0 ){
                  this.realName=res.data;
                  let authentiCationStatus=this.realName.authentiCationStatus;
                  if(authentiCationStatus===1){
                    this.realName.authentiCationStatus='审核中,请您关注客服来电';
                    this.authentication_status=false;
                  }if(authentiCationStatus===2){
                    this.realName.authentiCationStatus='审核通过';
                    this.authentication_status=false;
                  }if(authentiCationStatus===3){
                    this.realName.authentiCationStatus='审核失败';
                    this.authentication_status=true;
                  }
                }else{
                  this.$message.error(res.msg);
                }
              });

              if(role===1 ||role===2 || role===3 || role===4  || role===5 || role===7 || role===12 ){
                this.isbusiness=true;  //显示商家信息
              }else if(role===11){
                this.iswanted=true;
              }else if(role===6){
                this.islease=true;
              }else if(role===8){
                this.isfree=true;
              }else if(role===13){
                this.iswholesale=true;
              }

              else{
                this.$message.error("获取用户信息失败");
              }
            }else {
              if(role!==8){
                this.isButtenRealName=true;
              }else{
                this.isnotbusiness=true;
              }

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
              let status=data.status;
              let msg=data.msg;
              if(status===0){
                  if(msg==="编辑成功重新登陆"){
                    this.$message.success("修改密码成功请重新登陆");
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
            return false;
          }
        });
      },
      //城市组件
      handleChange (value) {
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
