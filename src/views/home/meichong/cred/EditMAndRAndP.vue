<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p>请认真填写信息</p>
      <el-form-item label="发布类型" prop="releaseType">
        <template>
          <el-radio-group v-model="ruleForm.releaseType">
            <el-radio disabled :label="13">菜谱/广告</el-radio>
            <el-radio disabled :label="17">装修</el-radio>
            <el-radio disabled :label="19">灭虫</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="标题6-14字之内"></el-input>
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

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>

      <el-form-item label="服务地域" prop="serviceDetailed">
        <el-select v-model="ruleForm.serviceDetailed" placeholder="请选择服务区域">
          <el-option label="全市" value="全市"></el-option>
          <el-option label="来电确认" value="来电确认"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务图片" prop="pictureUrl">
        <el-upload
          ref="upload"
          :action="uploadDownUrl"
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
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <p>实名信息</p>
      <el-form-item label="联系人" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName" autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="ruleForm.contact" autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="ruleForm.companyName" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市">
        <el-input v-model="ruleForm.detailed" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
  import {operation_usermrp} from '../../../../api/api';
  import {echo_display} from '../../../../api/api';
  import {get_usermrp_id} from '../../../../api/api';


  export default {
    name: 'editMAndRAndP',
    data() {
      return {
        fileList: [],
        id: this.$route.params.id,
        fullscreenLoading: false,

        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          userId: '',
          releaseType: '',//发布类型
          releaseTitle: '',//标题
          serviceIntroduction: '',//服务描述
          remarks: '',//备注
          startPrice: '',//起步价格
          serviceDetailed: '',//服务城区
          pictureUrl: [],//服务图片
          //实名中获取
          companyName: '',//公司名称
          contact: '',  //实名联系联系方式 回显置灰 不可修改
          consigneeName: '', //联系人姓名 回显置灰 不可修改
          detailed: '',//实名城区
          id: '',

        },
        StringPath: 'menuAndRenovationAndPestControl',


        rules: {

          releaseType: [
            {required: true, message: '发布类型不能为空', trigger: 'change'},
          ],
          companyName: [
            {required: true, message: '公司名称不能为空', trigger: 'blur'},
          ],
          serviceDetailed: [
            {required: true, message: '请选服务城区', trigger: 'change'}
          ],
          releaseTitle: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {min: 6, max: 14, message: '标题在6-14字之内'}
          ],
          serviceIntroduction: [
            {required: true, message: '服务描述不能为空', trigger: 'blur'},
            {min: 1, max: 500, message: '服务描述不能超过500个字'}
          ],
          remarks: [
            {max: 30, message: '备注小于30字'}
          ],
          startPrice: [
            {required: true, message: '起步价格不能为空', trigger: 'blur'}
          ],
          pictureUrl: [
            {required: true, message: '如果已上传请继续提交'},
          ], contact: [
            {required: true, message: '请输入手机', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号格式错误', trigger: 'blur'}
          ],
          consigneeName: [
            {required: true, message: '请输入姓名'},
            {min: 2, max: 12, message: '长度在2至11位之间', trigger: 'blur'}
          ],
        }
      }
    },

    created() {
      this.checke_isButten();
    },
    methods: {
      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let length = 0;
            for (let i = 0; i < this.ruleForm.pictureUrl.length; i++) {
              if (this.ruleForm.pictureUrl[i].useStatus === 1 || this.ruleForm.pictureUrl[i].useStatus === 3) {
                length++;
              }
            }
            if (length <= 0) {
              this.$message.error("图片不能为空");
              this.fullscreenLoading = false;
              return false;
            }
            this.ruleForm.StringPath = this.StringPath;
            this.ruleForm.type = 6;
            operation_usermrp(this.ruleForm).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.$message.success('编辑成功，审核约24小时内完成');
                this.$router.push('/home/myRelease');
              } else {
                this.$msgdeal(res.msg);
              }
            });
          } else {
            this.fullscreenLoading = false;
            return false;
          }
        });
      },

      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if (res.status === 0) {
          let resdata = res.data;
          var picture = {
            "pictureName": resdata.pictureName,
            "pictureUrl": resdata.pictureUrl,
            "useStatus": 1,
            id: resdata.id,
            "userName": resdata.userName,
            "userId": resdata.userId
          };
          this.ruleForm.pictureUrl = this.ruleForm.pictureUrl.concat(picture);
        }
      },

      //删除文件之前的钩子函数
      handleRemove(file, fileList) {
        for (var i = 0; i < this.ruleForm.pictureUrl.length; i++) {
          if (file.id === undefined) {
            if (file.response.data.id === this.ruleForm.pictureUrl[i].id) {
              this.ruleForm.pictureUrl[i].useStatus = 2;
              break;
            }
          } else if (file.id === this.ruleForm.pictureUrl[i].id) {
            this.ruleForm.pictureUrl[i].useStatus = 2;
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
      //检查登陆和权限
      checke_isButten() {
        if (!this.$fsAuthent()) {
          return false;
        };
        get_usermrp_id(this.id).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data;
            let fileListAndPictureUrl = echo_display(this.ruleForm);
            //图片回显和表格参数
            this.ruleForm.pictureUrl = fileListAndPictureUrl.pictureUrl;
            this.fileList = fileListAndPictureUrl.fileList;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },

    }
  }
</script>
<style>

</style>
