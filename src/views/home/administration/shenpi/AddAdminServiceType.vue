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

   蔬菜类型必须上传示例图片<br>
    <br><el-form-item label="示例图片" >
      <el-upload
        ref="upload"
        action="/api/uploadDown/upload"
        name="picture"
        list-type="picture-card"
        :limit="1"
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
      <el-button type="primary" @click="submitServiceType('form')"  v-loading.fullscreen.lock="fullscreenLoading"  >添加</el-button>
    </el-form-item>

  </el-form>
  </div>
</template>
<script>
  import { isRoleMessage } from '../../../../api/api';
  import { admin_create_serviceType } from '../../../../api/api';
  import { uploadDown_update } from '../../../../api/api';
  export default {
    data() {
      return {
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],

        fullscreenLoading:false,
        form: {   //审核表单
          serviceTypeName:'',
          releaseType:'',
          pictureUrl:[]//蔬菜示例图片
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

        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.form.releaseType===4){
              if(this.form.pictureUrl.length===0){
                this.$message.error("蔬菜出售必须添加示例图片");
                return false;
              }
            }

            this.fullscreenLoading = true;
            admin_create_serviceType(this.form).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.$message.success("添加成功");
                this.form.serviceTypeName='';
                this.form.pictureUrl=[];
                this.fileList=[];
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

      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if(res.status===0){
          let resdata=res.data;
          var picture={"pictureName":resdata.pictureName ,"pictureUrl": resdata.pictureUrl, "useStatus":1,id:resdata.id,"userName":resdata.userName,"userId":resdata.userId};
          this.form.pictureUrl= this.form.pictureUrl.concat(picture);
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file,fileList) {

        let resdata=file.response.data;
        for(var i=0;i< this.form.pictureUrl.length;i++){
          if(resdata.id===this.form.pictureUrl[i].id){
            uploadDown_update(this.form.pictureUrl[i]).then((res) => {
              if(res.status!==0 ){
                this.$message.error(res.msg);
              }
              this.form.pictureUrl.splice(i,1)
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
          message: '最多只能上传1张图片',
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
<style>
</style>
