<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      请认真填写信息(信息有效期为{{youxiaoqi}}天)
      <el-form-item label="发布类型" prop="releaseType">
        <template>
          <el-radio-group v-model="ruleForm.releaseType" v-for="item in releaseTypeList"
                          :key="item.id">
            <el-radio :label="item.id" class="releaseType">{{item.name}}</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>





      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
      </el-form-item>

      <el-form-item label="起步价格" prop="mianjia" v-if="releaseType === '13' ||
        releaseType === '17' ||releaseType === '19'">
        <el-input v-model.number="ruleForm.mianjia" placeholder="起步价格整数(元)"></el-input>
      </el-form-item>

      <div class="authentiCationFailureClass">
        注: 如果参考价格与真实价格差异较大可能会引起投诉或者审批失败；
      </div>
      <el-form-item label="面积" prop="mianjia" v-if="releaseType === '14' ||releaseType === '15' ">
        <el-input v-model.number="ruleForm.mianjia" placeholder="只能是1-10000之间的整数"></el-input>
      </el-form-item>


      <el-form-item label="具体描述" prop="serviceIntroduction">
        <el-input
          type="textarea"
          placeholder="如：具体服务/销售地址，企业信息等"
          v-model="ruleForm.serviceIntroduction"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>


      <el-form-item label="服务区域" prop="serviceDetailed" v-if="releaseType === '13' ||
        releaseType === '17' ||releaseType === '19'">
          <el-checkbox-group v-model="ruleForm.serviceDetailed" size="mini">
            <el-checkbox-button v-for="city in quxian" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详细地址" prop="serviceDetailed" v-if="releaseType === '14' ||releaseType === '15'">
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
        <el-input v-model="realName.companyName" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市">
        <el-input v-model="realName.detailed" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="实名地址">
        <el-input v-model="realName.addressDetailed" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布
        </el-button>
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
     to="" class="a">查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->


  </div>
</template>
<script>
  import {getRealName} from '../../../api/api';
  import {uploadDown_update} from '../../../api/api';
  import {createfabu} from '../../../api/api';

  import {getquxian} from '../../../api/api';
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
        quxian:[],
        releaseType: this.$route.params.releaseType,
        youxiaoqi: '',
        releaseTypeList: [],
        fileList: [],
        timeout: null,
        isLease: false,
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading: false,
        realName: '',//用户实名信息
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          userId: '',
          releaseType: '',//发布类型
          releaseTitle: '',//标题
          serviceType: '',//商品/服务类型
          mianjia: '',
          serviceIntroduction: '',//介绍
          remarks: '',//备注
          serviceDetailed: '',//服务地址 来电确认和全市
          pictureUrl: [],//图片
          //实名中获取
          consigneeName: '', //联系人姓名 回显可修改

          contact: '',  //实名联系联系方式 回显 可修改
        },

        formLabelWidth: '100px',
        rules: {
          releaseType: [
            {required: true, message: '发布类型不能为空', trigger: 'change'},
          ],

          serviceDetailed: [
            {required: true, message: '请选服务/销售城区'}
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

          pictureUrl: [
            {required: true, message: '如果已上传请继续提交'},
          ],

          consigneeName: [
            {required: true, message: '请输入姓名'},
            {min: 2, max: 12, message: '长度在2至11位之间', trigger: 'blur'}
          ],
          serviceTypeName: [
            {required: true, message: '请输入商品/服务类型'},
            {min: 2, max: 15, message: '长度在2至15位之间', trigger: 'blur'}
          ],

          mianjia: [
            {required: true, validator: checkAge},
            // { type: 'number', message: '年龄必须为数字值'}
          ],
        }
      }
    },

    created() {
      this.getRealName();

    },
    methods: {
      goRelease() {
        this.centerDialogVisible = false;
        this.$router.push({path: '/home/myRelease'});
      },
      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading = true;

        let  length = 0;
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



        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            createfabu(this.ruleForm).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                //成功弹窗
                this.fileList = [];
                this.ruleForm.pictureUrl = [];
                this.centerDialogVisible = true;
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

      cntinue() {  //留在本页继续发布
        this.centerDialogVisible = false;
      },
      getRealName() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');


        if (this.releaseType === '14' || this.releaseType === '15') {
          this.youxiaoqi = 90;
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

        } else if (this.releaseType === '13' || this.releaseType === '17' || this.releaseType === '19') {
          this.getQuxian();

          this.releaseTypeList = [
            {id: "13", name: "菜谱/广告"}, {id: "17", name: "装修"}, {id: "19", name: "灭虫"}
          ];
          this.youxiaoqi = 365;
          if (role !== '1' && role !== '7') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        }
        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.realName = res.data;
            this.ruleForm.userId = this.realName.userId;
            this.ruleForm.contact = this.realName.contact;
            this.ruleForm.consigneeName = this.realName.consigneeName;
            if (this.releaseType === '14' ||this.releaseType === '15' ) {
              this.ruleForm.serviceDetailed = this.realName.addressDetailed;
            }else{
              this.ruleForm.serviceDetailed =[];
            }

          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },

      getQuxian(){
        getquxian().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.quxian = res.data;
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

        let resdata = file.response.data;
        for (var i = 0; i < this.ruleForm.pictureUrl.length; i++) {
          if (resdata.id === this.ruleForm.pictureUrl[i].id) {
            uploadDown_update(this.ruleForm.pictureUrl[i]).then((res) => {
              if (res.status !== 0) {
                this.$message.error(res.msg);
              }
              this.ruleForm.pictureUrl.splice(i, 1)
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

    },
    watch: {
      "$route"(to, from) {
        if (from.path.indexOf('crzuAndmie') !== -1) {
          this.releaseTypeList = [];
          this.youxiaoqi = '';
          this.releaseType = '';
          this.ruleForm = {
            userId: '',
            releaseType: '',//发布类型
            releaseTitle: '',//标题
            serviceType: '',//商品/服务类型
            mianjia: '',
            serviceIntroduction: '',//介绍
            remarks: '',//备注
            serviceDetailed: '',//服务地址 来电确认和全市
            pictureUrl: [],//图片
            contact: '',  //实名联系联系方式 回显 可修改
            consigneeName: '', //联系人姓名 回显可修改
          };
          this.restaurants = [];//标题下拉
          this.fileList = [];
        }
        if (to.path.indexOf('crzuAndmie') !== -1) {
          this.releaseType = this.$route.params.releaseType;
          this.getRealName();
        }
      }
    }


  }

</script>
<style>

  .releaseType {
    padding: 0 10px 0 0;
  }

  .el-form-itemUser {
    display: block;
    float: left;
    margin: 1px 0 8px 1px;
    padding: 1px 0 10px 1px;

  }

</style>
