<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <p>请认真填写信息</p>
      <el-form-item  label="发布类型" prop="releaseType">
        <template>
          <el-radio-group v-model="ruleForm.releaseType">
            <el-radio :label="13">菜谱/广告</el-radio>
            <el-radio :label="17">装修</el-radio>
            <el-radio :label="19">灭虫</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
      </el-form-item>
      <el-form-item label="起步价格" prop="startPrice">
        <el-input v-model="ruleForm.startPrice" placeholder="起步价格(元)"></el-input>
      </el-form-item>

      <el-form-item label="服务描述" prop="serviceIntroduction">
        <el-input
          type="textarea"
          placeholder="如：服务范围，或者服务时间"
          v-model="ruleForm.serviceIntroduction"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks" >
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>

      <el-form-item label="服务地域"  prop="serviceDetailed">
        <el-select v-model="ruleForm.serviceDetailed" placeholder="请选择服务区域">
          <el-option label="全市" value="全市"></el-option>
          <el-option label="来电确认" value="来电确认"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务图片" prop="pictureUrl">
        <el-upload
          ref="upload"
          action="/api/uploadDown/upload"
          name="picture"
          list-type="picture-card"
          :limit="8"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"   >
          <img width="100%"   :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <p>实名信息</p>
      <el-form-item label="联系人">
        <el-input v-model="ruleForm.consigneeName" :disabled="true" autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  >
        <el-input v-model="ruleForm.contact" :disabled="true" autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="公司名称"  >
        <el-input v-model="ruleForm.companyName" :disabled="true" autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市" >
        <el-input v-model="ruleForm.detailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="实名地址" >
        <el-input v-model="ruleForm.addressDetailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布</el-button>
      </el-form-item>
    </el-form>
    <!-- 成功弹窗  -->
    <el-dialog
      title="发布成功"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="cntinue"
    >
      <span>请关注审核状态，约24小时内完成审核</span>
      <span slot="footer" class="dialog-footer">
   <el-button type="primary" @click="" >
     <router-link
       v-on:click.native=""
       to="/home/myRelease" class="a" >查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->
  </div>
</template>
<script>


  import {  checke_isButten } from '../../../../api/api';
  import {  isRoleMessage } from '../../../../api/api';
  import { getRealName } from '../../../../api/api';
  import { create_menuAndRenovationAndPestControl } from '../../../../api/api';
  import { uploadDown_update } from '../../../../api/api';


  export default {
    data() {
      return {
        fileList:[],
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading:false,
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          userId:'',
          releaseType:'',//发布类型
          releaseTitle:'',//标题
          serviceIntroduction:'',//服务描述
          remarks:'',//备注
          startPrice:'',//起步价格
          serviceDetailed:'',//服务城区
          pictureUrl:[],//服务图片
          //实名中获取
          companyName:'',//公司名称
          contact:'',  //实名联系联系方式 回显置灰 不可修改
          consigneeName:'', //联系人姓名 回显置灰 不可修改
          detailed:'',//实名城区
          addressDetailed:'',//实名地址
          StringPath:'menuAndRenovationAndPestControl',
        },

        rules: {
          releaseType: [
            { required: true, message: '发布类型不能为空', trigger: 'change' },
          ],
          companyName: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' },
          ],
          serviceDetailed: [
            { required: true, message: '请选服务城区', trigger: 'change' }
          ],
          releaseTitle:[
            {  required: true, message: '标题不能为空', trigger: 'blur'},
            { min: 6, max: 14, message: '标题在6-14字之内' }
          ],
          serviceIntroduction:[
            {  required: true, message: '服务描述不能为空', trigger: 'blur' },
            { min: 1, max: 500, message: '服务描述不能超过500个字' }
          ],
          remarks:[
            {  max: 30, message: '备注小于30字' }
          ],
          startPrice:[
            {  required: true, message: '起步价格不能为空', trigger: 'blur' }
          ],
          pictureUrl:[
            { required: true, message: '如果已上传请继续提交' },
          ],}
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {

      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            create_menuAndRenovationAndPestControl(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                //成功弹窗
                this.fileList=[];
                this.ruleForm.pictureUrl=[];
                this.centerDialogVisible=true;
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

      cntinue(){  //留在本页继续发布
        this.centerDialogVisible=false;
      },
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            this.ruleForm.contact= this.realName.contact;
            this.ruleForm.consigneeName= this.realName.consigneeName;
            this.ruleForm.companyName= this.realName.companyName;
            this.ruleForm.addressDetailed= this.realName.addressDetailed;
            this.ruleForm.detailed= this.realName.detailed;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      //
      checke_isButten(){
        checke_isButten(this.ruleForm.StringPath).then((res) => {
          if(res.status===0){
            if (res.data.isCreate === true) {
              this.resdata =res.data.data;
              this.ruleForm.userId=this.resdata.id;
            } else {
              this.$router.push({path: '/home/release'});
            }
            if (res.data.isAuthentication !== 2) {
              this.$router.push({path: '/home/myAccount'});
            }else {
              this.getRealName();
            }}else{
            isRoleMessage(res.msg);
          }
        });
      },

      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if(res.status===0){
          let resdata=res.data;
          var picture={"pictureName":resdata.pictureName ,"pictureUrl": resdata.pictureUrl, "useStatus":1,id:resdata.id,"userName":resdata.userName,"userId":resdata.userId};
          this.ruleForm.pictureUrl= this.ruleForm.pictureUrl.concat(picture);
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file,fileList) {

        let resdata=file.response.data;
        for(var i=0;i< this.ruleForm.pictureUrl.length;i++){
          if(resdata.id===this.ruleForm.pictureUrl[i].id){
            uploadDown_update(this.ruleForm.pictureUrl[i]).then((res) => {
              if(res.status!==0 ){
                this.$message.error(res.msg);
              }
              this.ruleForm.pictureUrl.splice(i,1)
            });
            break;
          }
        }
      },
      //点击列表中已上传的文件事的钩子函数
      handlePreview(file) {
      },
      //上传的文件个数超出设定时触发的函数
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传8张图片',
          duration: 2000
        });

      },
      //文件上传前的前的钩子函数
      //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传图片大小不能超过 3MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt3M;
      },

    }
  }
</script>
<style>

</style>
