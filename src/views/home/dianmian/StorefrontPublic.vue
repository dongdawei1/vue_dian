<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
     请认真填写信息
      <el-form-item  label="发布类型" prop="releaseType">
        <template>
          <el-radio-group v-model="ruleForm.releaseType">
            <el-radio :label="14" v-if="isLease">店面/窗口出租</el-radio>
            <el-radio :label="15" v-if="isRentalBooth">摊位出租转让</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>



      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
      </el-form-item>


      <el-form-item label="面积" prop="fouseSize">
        <el-input  v-model.number="ruleForm.fouseSize" placeholder="只能是1-10000之间的整数"></el-input>
      </el-form-item>

      <el-form-item label="具体描述" prop="serviceIntroduction">
        <el-input
          type="textarea"
          placeholder="如：可以经营的范围，或者租金支付方式"
          v-model="ruleForm.serviceIntroduction"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks" >
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>
      <el-form-item label="所在城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址"  prop="serviceDetailed">
        <el-input v-model="ruleForm.serviceDetailed" placeholder="地址详情100字以内"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="pictureUrl">
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


      <el-form-item label="联系人" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName"  autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  prop="contact">
        <el-input v-model="ruleForm.contact"  autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
     实名信息
      <el-form-item label="公司名称"  >
        <el-input v-model="realName.companyName" :disabled="true" autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市" >
        <el-input v-model="realName.detailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="实名地址" >
        <el-input v-model="realName.addressDetailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.addressDetailed"></el-input>
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
           <el-button type="primary"><router-link
             v-on:click.native="goRelease"
             to="" class="a" >查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->
  </div>
</template>
<script>


  import {  isRoleMessage } from '../../../api/api';
  import { getRealName } from '../../../api/api';
  import { create_rent} from '../../../api/api';
  import { uploadDown_update } from '../../../api/api';
  import {  checke_isButten } from '../../../api/api';
  import { regionData } from 'element-china-area-data'

  export default {
    props: ["tableDataEnter"],
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('面积不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }  else {
              callback();

          }
        }, 100);
      };
      return {
        fileList:[],
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading:false,
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息
        isLease:false,
        isRentalBooth:false,
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2
        ruleForm: {
          selectedOptions: [], //三级联动城市

          userId:'',
          releaseType:'',//发布类型
          releaseTitle:'',//标题
          fouseSize:'',//面积
          serviceIntroduction:'',//描述
          remarks:'',//备注
          serviceDetailed:'',//详细地址
          pictureUrl:[],//图片
          //实名中获取

          contact:'',  //实名联系联系方式 回显 可修改
          consigneeName:'', //联系人姓名 回显可修改

        },

        rules: {
          releaseType: [
            { required: true, message: '发布类型不能为空', trigger: 'change' },
          ],

          serviceDetailed: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' },
            {  max: 100, message: '详细地址不大于100字' }
          ],
          releaseTitle:[
            {  required: true, message: '标题不能为空', trigger: 'blur'},
            { min: 6, max: 14, message: '标题在6-14字之内' }
          ],
          serviceIntroduction:[
            {  required: true, message: '具体描述不能为空', trigger: 'blur' },
            { min: 1, max: 500, message: '具体描述不能超过500个字' }
          ],
          fouseSize:[
            { required: true,validator: checkAge, trigger: 'blur'},
            // { type: 'number', message: '年龄必须为数字值'}
          ],
          remarks:[
            {  max: 30, message: '备注小于30字' }
          ],

          pictureUrl:[
            { required: true, message: '如果已上传请继续提交' },
          ],
          selectedOptions: [
            { required: true, message: '请选择城市和地区'}
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          consigneeName:[
            { required: true, message: '请输入姓名' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],}
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {
      //城市组件
      handleChange (value) {
      },
      //提交
      goRelease(){
        this.centerDialogVisible=false;
        this.$router.push({path: '/home/myRelease'});
      },
      submitForm(ruleForm) {
        this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            create_rent(this.ruleForm).then(res => {
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
            this.ruleForm.serviceDetailed=this.realName.addressDetailed;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },

      checke_isButten(){
        checke_isButten(this.tableDataEnter).then((res) => {
          if(res.status===0){
            if (res.data.isCreate === true) {
              if (res.data.isAuthentication !== 2) {
                this.$router.push({path: '/home/myAccount'});
              }else {
                this.resdata =res.data.data;
                this.ruleForm.userId=this.resdata.id;
                let role=res.data.data.role;
               if(role===2||role===3){
                 this.isLease=true;
               }else if(role===4||role===5){
                 this.isRentalBooth=true;
               }else if(role===1||role===6){
                 this.isLease=true;
                 this.isRentalBooth=true;
               }
               this.getRealName();
              }} else {
              this.$router.push({path: '/home/release'});
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
