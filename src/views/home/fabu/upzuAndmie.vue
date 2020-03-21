<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="发布类型" prop="releaseType">
        <template>
          <el-radio-group  v-model="ruleForm.releaseType" v-for="item in releaseTypeList" :key="item.id" :disabled="true">
            <el-radio :label="item.id" class="releaseType" >{{item.name}}</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <div v-if="ruleForm.authentiCationStatus===3" class="authentiCationFailureClass">
        失败原因:{{ruleForm.authentiCationFailure}}
      </div>

      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
      </el-form-item>





      <el-form-item label="起步价格" prop="mianjia" v-if="releaseType === '13' || releaseType === '17' || releaseType === '19'">
        <el-input v-model.number="ruleForm.mianjia" placeholder="起步价格整数(元)"></el-input>
      </el-form-item>

      <div class="authentiCationFailureClass">
        注: 如果参考价格与真实价格差异较大可能会引起投诉或者审批失败；
      </div>
      <el-form-item label="面积" prop="mianjia" v-if="releaseType === '14'|| releaseType === '15'">
        <el-input v-model.number="ruleForm.mianjia" placeholder="只能是1-10000之间的整数"></el-input>
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

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>




      <el-form-item label="服务区域" prop="serviceDetailed"  v-if="releaseType === '13' || releaseType === '17' || releaseType === '19'">
        <el-select v-model="ruleForm.serviceDetailed" placeholder="请选择服务/销售区域">
          <el-option label="全市" value="全市"></el-option>
          <el-option label="来电确认" value="来电确认"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="serviceDetailed" v-if="releaseType === '14' || releaseType === '15'">
        <el-input v-model="ruleForm.serviceDetailed" placeholder="地址详情100字以内"></el-input>
      </el-form-item>




      <el-form-item label="图片" prop="pictureUrl">
        <el-upload
          ref="upload"
          :action="uploadDownUrl"
          name="picture"
          list-type="picture-card"
          :limit="5"
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

      <el-form-item label="联系人" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName" autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      实名信息
      <el-form-item label="联系方式">
        <el-input v-model="ruleForm.contact" autocomplete="off" :disabled="true"
                  :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="ruleForm.userType" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.userType"></el-input>
      </el-form-item>
      <el-form-item label="实名城市">
        <el-input v-model="ruleForm.detailed" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="实名地址">
        <el-input v-model="ruleForm.realNameId" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.realNameId"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import {upfabu} from '../../../api/api';
  import {getmyfabubyid} from '../../../api/api';
  import {echo_display} from '../../../api/api';

  export default {

    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格/面积不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else if(value<0 || value>1000000){
            callback(new Error('价格/面积在1-1000000之间'));
          }else {
            callback();
          }
        }, 100);
      };
      return {
        id: this.$route.params.id,
        releaseType: this.$route.params.releaseType,
        fileList: [],
        fullscreenLoading: false,
        releaseTypeList:[],
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          id:'',
          userId: '',
          releaseType: '',//发布类型
          releaseTitle: '',//标题
          mianjia: '',//面积
          serviceIntroduction: '',//描述
          remarks: '',//备注
          serviceDetailed: '',//详细地址
          pictureUrl: [],//图片
          //实名中获取
          consigneeName: '', //联系人姓名 回显可修改
          contact: '',  //实名联系联系方式 回显 可修改
          detailed:'',
          realNameId:'',
          userType:''
        },

        rules: {
          releaseType: [
            {required: true, message: '发布类型不能为空', trigger: 'change'},
          ],

          serviceDetailed: [
            {required: true, message: '详细地址不能为空', trigger: 'blur'},
            {max: 100, message: '详细地址不大于100字'}
          ],
          releaseTitle: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {min: 6, max: 14, message: '标题在6-14字之内'}
          ],
          serviceIntroduction: [
            {required: true, message: '具体描述不能为空', trigger: 'blur'},
            {min: 1, max: 500, message: '具体描述不能超过500个字'}
          ],
          remarks: [
            {max: 30, message: '备注小于30字'}
          ],
          mianjia: [
            {required: true, validator: checkAge, trigger: 'blur'},

          ],
          pictureUrl: [
            {required: true, message: '如果已上传请继续提交'},
          ],
          contact: [
            {required: true, message: '请输入手机', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号格式错误', trigger: 'blur'}
          ],
          consigneeName: [
            {required: true, message: '请输入姓名'},
            {min: 2, max: 15, message: '长度在2至11位之间', trigger: 'blur'}
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
            this.ruleForm.type = 6;
            upfabu(this.ruleForm).then(res => {
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


      checke_isButten() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (this.releaseType === '14'|| this.releaseType === '15') {
          if (role === '2' || role === '3'  ) {
            this.releaseTypeList = [{id: "14", name: "店面/窗口出租"}];
            this.ruleForm.releaseType = '14';
          } else if (role === '4' || role === '5' || role === '13' || role === '12') {
            this.releaseTypeList = [{id: "15", name: "摊位出租转让"}];
            this.ruleForm.releaseType = '15';
          } else if ( role === '6' ||role === '1') {
            this.releaseTypeList = [
              {id: "14", name: "店面/窗口出租"}, {id: "15", name: "摊位出租转让"}
            ];
          } else {
            this.$router.push({path: '/home/release'});
            return false;
          }

        } else if (this.releaseType === '13' || this.releaseType === '17'|| this.releaseType === '19') {
          this.releaseTypeList = [
            {id: "13", name: "菜谱/广告"}, {id: "17", name: "装修"}, {id: "19", name: "灭虫"}
          ];
          if (role !== '1' && role !== '7') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        }
        getmyfabubyid(this.id).then((res) => {
          if (res.status === 0) {
            this.ruleForm = res.data;
            let fileListAndPictureUrl = echo_display(this.ruleForm);
            //图片回显和表格参数
            this.ruleForm.pictureUrl = fileListAndPictureUrl.pictureUrl;
            this.fileList = fileListAndPictureUrl.fileList;
            this.ruleForm.releaseType=this.ruleForm.releaseType.toString();
          } else {
            this.$msgdeal(res.msg);
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
          message: '最多只能上传5张图片',
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
    ,
    watch: {
      "$route"(to, from) {
        if (from.path.indexOf('upzuAndmie') !== -1) {
          this.releaseTypeList = [];
          this.releaseType = '';
          this.id= '';
          this.ruleForm =  {
            id:'',
            userId: '',
            releaseType: '',//发布类型
            releaseTitle: '',//标题
            mianjia: '',//面积
            serviceIntroduction: '',//描述
            remarks: '',//备注
            serviceDetailed: '',//详细地址
            pictureUrl: [],//图片
            //实名中获取
            consigneeName: '', //联系人姓名 回显可修改
            contact: '',  //实名联系联系方式 回显 可修改
            detailed:'',
            realNameId:'',
            userType:''
          };
          this.fileList = [];
        }
        if (to.path.indexOf('upzuAndmie') !== -1) {
          this.ruleForm = {
            id:'',
            userId: '',
            releaseType: '',//发布类型
            releaseTitle: '',//标题
            mianjia: '',//面积
            serviceIntroduction: '',//描述
            remarks: '',//备注
            serviceDetailed: '',//详细地址
            pictureUrl: [],//图片
            //实名中获取
            consigneeName: '', //联系人姓名 回显可修改
            contact: '',  //实名联系联系方式 回显 可修改
            detailed:'',
            realNameId:'',
            userType:''
          };
          this.releaseTypeList = [];
          this.fileList = [];
          this.releaseType = this.$route.params.releaseType;
          this.id= this.$route.params.id;
          this.checke_isButten();
        }
      }
    }
  }
</script>
<style>

</style>
