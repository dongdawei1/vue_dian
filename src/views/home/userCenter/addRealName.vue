<template>
  <div>
    <p>人工录入实名信息</p>
    <!--增加实名页开始-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"    class="demo-ruleForm">
      <el-form-item label="区域"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="送货范围"    prop="address_detailed"  >
        <el-radio v-model="ruleForm.address_detailed" label="全市">全市</el-radio>
        <el-radio v-model="ruleForm.address_detailed" label="本区">本区</el-radio>
      </el-form-item>
      <el-form-item label="注册时手机"    prop="mobilePhone"  >
        <el-input v-model="ruleForm.mobilePhone"  placeholder="注册时手机号"></el-input>
      </el-form-item>

      <el-form-item label="注册用户名"    prop="userName"  >
        <el-input v-model="ruleForm.userName"  placeholder="送货人姓名"></el-input>
      </el-form-item>

      <el-form-item label="送货手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入收/送货人手机号"></el-input>
      </el-form-item>


      <el-form-item label="年龄"    prop="eag"    placeholder="请输入年龄" >
        <el-input v-model="ruleForm.eag"  placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别"        placeholder="请选择性别" >
        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleForm.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
      </el-form-item>
      <el-form-item label="身份证照" prop="licenseUrl">
        <el-upload
          ref="upload"
          action="/api/uploadDown/upload"
          name="picture"
          list-type="picture-card"
          :limit="3"
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>
    <!--商户重新实名结束-->

  </div>
</template>


<script>

  import { uploadDown_update } from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  import {  examineRealName } from '../../../api/api';
  import { isRoleMessage } from '../../../api/api';
  import {  checke_isButten } from '../../../api/api';
  export default {
    data() {
      return {
        fileList:[],
       fullscreenLoading:false,
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2

        //城市组件相关结束
        ruleForm: {　//商家
          selectedOptions: [], //三级联动城市
          provinces_id:'',
          city_id:'',
          district_county_id:'',
          address_detailed: '',//详细地址收/送货地址
          contact:'',//收送货人联系方式
          userName:'',//注册时用户名
          mobilePhone:'',//注册时手机号
          email:'',//邮箱
          licenseUrl: [],//营业执照图片
          eag:'', // 年龄
          gender:'男',//性别
          StringPath:'addRealName'
        },

        permission:'',
        role:'',
        rules: {
          selectedOptions: [
            { required: true, message: '请选择城市和地区'}
          ],
          address_detailed:[
            { required: true, message: '请选择送货范围' }
          ],
          contact:[
            { required: true, message: '送货人手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          mobilePhone:[
            { required: true, message: '注册时手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          userName:[
            { required: true, message: '注册用户名', trigger: 'blur' },
            { min:8,max: 18, message: '长度在8至18位之间', trigger: 'blur' }
          ],
          email:[
            { min:8,max: 30, message: '长度在8至30位之间', trigger: 'blur' }
          ],
          licenseUrl:[
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
          eag:[
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min:2,max: 3, message: '长度在2至3位之间' }
          ],

        }
      }
    },

    created () {
      this.islogin_getuserinif();
    },
    methods: {
      //判断是否登录
      islogin_getuserinif(){
        checke_isButten(this.ruleForm.StringPath).then((res) => {
          if(res.status!==0){
            isRoleMessage(res.msg);
          }
        });
      },

      //城市组件
      handleChange (value) {
        this.ruleForm.provinces_id=this.ruleForm.selectedOptions[0];
        this.ruleForm.city_id=this.ruleForm.selectedOptions[1];
        this.ruleForm.district_county_id=this.ruleForm.selectedOptions[2];
      },

      //审批提交
      submitForm(ruleForm) {

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.ruleForm.isArtificial=2;
            examineRealName(this.ruleForm).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.ruleForm.licenseUrl=[];
                this.fileList=[];
              }  else {
                isRoleMessage(data.msg);
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if(res.status===0){
          let resdata=res.data;
          var picture={"pictureName":resdata.pictureName ,"pictureUrl": resdata.pictureUrl, "useStatus":1,id:resdata.id,"userName":resdata.userName,"userId":resdata.userId};
          this.ruleForm.licenseUrl= this.ruleForm.licenseUrl.concat(picture);
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file,fileList) {

        let resdata=file.response.data;
        for(var i=0;i< this.ruleForm.licenseUrl.length;i++){
          if(resdata.id===this.ruleForm.licenseUrl[i].id){
            uploadDown_update(this.ruleForm.licenseUrl[i]).then((res) => {
              if(res.status!==0 ){
                this.$message.error(res.msg);
              }
              this.ruleForm.licenseUrl.splice(i,1)
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
          message: '最多只能上传3张图片',
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
        const isLt8M = file.size / 1024 / 1024 < 8;
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt8M) {
          this.$message.error('上传图片大小不能超过 8MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt8M;
      },
    }
  }
</script>


<style >
</style>
