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
      <el-form-item label="商品类型" prop="serviceType">
        <el-autocomplete
          v-model="ruleForm.serviceType"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择销售商品类型"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
        <el-button type="primary" @click="dialogFormVisible = true" plain>添加具体类型</el-button>
      </el-form-item>


      <!--动态添加开始-->
      <div v-for="(item, index) in ruleForm.serviceAndprice" :key="index">
        <el-row>
          <el-col :span="7">
            <el-form-item label="商品详情" prop="project" class="el-form-itemUser">
              <el-input v-model="item.project" placeholder="商品名及规格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="参考价格" prop="price" class="el-form-itemUser">
              <el-input v-model.number="item.price" placeholder="请输入整数">
              </el-input>
            </el-form-item>
          </el-col>


          <div v-if="index==0">
            <el-col :span="6" class="el-form-itemUser">
              <el-button type="primary" @click="addItem" plain>增加一行商品详情</el-button>
            </el-col>
          </div>

          <div v-if="index>0">
            <el-col :span="6" class="el-form-itemUser">
              <el-button type="info" @click="deleteItem(item, index)">删除</el-button>
            </el-col>
          </div>
        </el-row>

      </div>
      <!--动态添加结束-->
      <div class="form-zhushi">
        注: 如果参考价格与真实价格差异较大可能会引起投诉或者审批失败；
      </div>

      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
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


      <el-form-item label="服务区域" prop="serviceDetailed">
        <el-checkbox-group v-model="ruleForm.serviceDetailed" size="mini">
          <el-checkbox-button v-for="city in quxian" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
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
        <el-input v-model="ruleForm.consigneeName" autocomplete="off"   :placeholder="ruleForm.consigneeName"></el-input>
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


    <!--添加商品/服务类型弹窗开始-->
    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="serviceTypeName">
          <el-input v-model="form.serviceTypeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create_serviceType('form')" v-loading.fullscreen.lock="fullscreenLoading">确
          定
        </el-button>
      </div>
    </el-dialog>
    <!--添加商品/服务类型弹窗结束-->
  </div>
</template>
<script>



  import {get_serviceType} from '../../../api/api';
  import {create_serviceType} from '../../../api/api';
  import {upfabu} from '../../../api/api';
  import {getmyfabubyid} from '../../../api/api';
  import {echo_display} from '../../../api/api';
  import {getquxian} from '../../../api/api';
  export default {

    name: 'editDepartmentStore',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();

          }
        }, 100);
      };
      return {
        id: this.$route.params.id,
        releaseType: this.$route.params.releaseType,
        restaurants: [],//标题下拉
        releaseTypeList: [],
        quxian:[],
        timeout: null,
        dialogFormVisible: false,//添加商品类型弹窗
        fileList: [],
        fullscreenLoading: false,

        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          id:'',
          userId: '',
          releaseType: '',//发布类型
          releaseTitle: '',//标题
          serviceType: '',//商品/服务类型
          serviceAndprice: [],//项目及价格KEY，vaule
          project: '', //项目
          price: '',//价格

          serviceIntroduction: '',//介绍
          remarks: '',//备注
          serviceDetailed: [],//服务地址 来电确认和全市
          pictureUrl: [],//图片
          //实名中获取
          consigneeName: '', //联系人姓名 回显可修改
          contact: '',  //实名联系联系方式 回显 可修改
          detailed:'',
          realNameId:'',
          userType:''

        },
        form: {
          serviceTypeName: '',
          releaseType: '',
        },
        formLabelWidth: '100px',
        rules: {
          releaseType: [
            {required: true, message: '发布类型不能为空', trigger: 'change'},
          ],

          serviceDetailed: [
            {required: true, message: '请选服务/销售城区', trigger: 'change'}
          ],
          serviceType: [
            {required: true, message: '请选销售类型', trigger: 'change'}
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
          contact: [
            {required: true, message: '请输入手机', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号格式错误', trigger: 'blur'}
          ],
          consigneeName: [
            {required: true, message: '请输入姓名'},
            {min: 2, max: 12, message: '长度在2至11位之间', trigger: 'blur'}
          ],
          serviceTypeName: [
            {required: true, message: '请输入商品类型'},
            {min: 2, max: 15, message: '长度在2至15位之间', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '请输入项目/规格'},
            {min: 2, max: 12, message: '长度在2至12位之间', trigger: 'blur'}
          ],
          price: [
            {required: true, validator: checkAge, trigger: 'blur'},
            // { type: 'number', message: '年龄必须为数字值'}
          ],
        }
      }
    },

    created() {
      this.getQuxian();
      this.checke_isButten();
    },
    methods: {
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
      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let length = this.ruleForm.serviceAndprice.length;
            if (length > 1) {
              for (let a = 0; a < length; a++) {
                let serviceAndpriceNoa = this.ruleForm.serviceAndprice[a];
                if (serviceAndpriceNoa.project===undefined || serviceAndpriceNoa.price === undefined || serviceAndpriceNoa.project === '' || serviceAndpriceNoa.price === '') {
                  this.$message.error("新增加:项目/规格或者价格不能有空值");
                  this.fullscreenLoading = false;
                  return false;
                }
              }
            }

            length = 0;
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


      //检查登陆和权限
      checke_isButten() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (this.releaseType === '33' || this.releaseType === '34' || this.releaseType === '18') {
          this.releaseTypeList = [
            {id: "33", name: "电器/设备出售"}, {id: "34", name: "二手电器/设备出售"}, {id: "18", name: "维修电器/设备"}
          ];
          if (role !== '1' && role !== '3') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        } else if (this.releaseType === '4' || this.releaseType === '5' || this.releaseType === '6' ||
          this.releaseType === '29' || this.releaseType === '9' || this.releaseType === '11') {
          this.releaseTypeList = [
            {id: "4", name: "蔬菜出售"}, {id: "5", name: "粮油出售"}, {id: "6", name: "调料/副食出售"}
            , {id: "29", name: "水产/禽蛋出售"}, {id: "9", name: "清洁用品"}, {id: "11", name: "桌椅餐具"}
          ];
          if (role !== '1' && role !== '4') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        } else if (this.releaseType === '101' || this.releaseType === '102' || this.releaseType === '103'
         || this.releaseType === '104') {
          this.releaseTypeList = [
            {id: "101", name: "工服"}, {id: "102", name: "百货"}, {id: "103", name: "绿植"}
            , {id: "104", name: "装饰用品"}
          ];
          if (role !== '1' && role !== '12') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        } else if (this.releaseType === '7' || this.releaseType === '8') {
          this.releaseTypeList = [{id: "7", name: "酒水/饮料"}, {id: "8", name: "消毒餐具"}];
          if (role !== '1' && role !== '5') {
            this.$router.push({path: '/home/release'});
            return false;
          }
        }
        getmyfabubyid(this.id).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data;
            let fileListAndPictureUrl = echo_display(this.ruleForm);
            //图片回显和表格参数
            this.ruleForm.pictureUrl = fileListAndPictureUrl.pictureUrl;
            this.fileList = fileListAndPictureUrl.fileList;

            let serviceAndpricelist = JSON.parse(this.ruleForm.serviceAndprice);

            this.ruleForm.project = serviceAndpricelist[0].project; //没有这两个输入框失去焦点会报错
            this.ruleForm.price = serviceAndpricelist[0].price;

            this.ruleForm.serviceAndprice = serviceAndpricelist;
            this.ruleForm.serviceDetailed=[];
            this.ruleForm.releaseType=this.ruleForm.releaseType.toString();
          } else {
            this.$msgdeal(res.msg);
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

      //下拉
      querySearchAsync(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        this.get_serviceType();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurants);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      get_serviceType() {
        let param = {
          serviceType: this.ruleForm.serviceType,
          releaseType: this.ruleForm.releaseType,
        };
        get_serviceType(param).then((res) => {
          if (res.status === 0) {
            let list = res.data;
            let releaseTitleList = [];
            for (let i = 0; i < list.length; i++) {
              let releaseTitle = {"value": list[i], "address": list[i]};
              releaseTitleList = releaseTitleList.concat(releaseTitle);
            }
            this.restaurants = releaseTitleList;
            //没有找到用户输入的类型引导添加
            if (this.restaurants.length === 0) {
              this.$message.error("没有找到您输入的:具体类型,可手动添加");
              this.form.serviceTypeName = this.ruleForm.serviceType;
              this.ruleForm.serviceType = '';
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      create_serviceType() {
        this.fullscreenLoading = true;
        this.form.releaseType = this.ruleForm.releaseType;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            create_serviceType(this.form).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.$message.success("添加成功");
                this.ruleForm.serviceType = this.form.serviceTypeName;
                this.dialogFormVisible = false;
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

      addItem() {
        this.ruleForm.serviceAndprice.push({
          project: '',
          price: ''
        })
      },
      deleteItem(item, index) {
        this.ruleForm.serviceAndprice.splice(index, 1)
      }
    },
    watch: {
      "$route"(to, from) {
        if (from.path.indexOf('upinformation') !== -1) {
          this.releaseTypeList = [];
          this.releaseType = '';
          this.id= '';
          this.ruleForm = {
            userId: '',
            releaseType: '',//发布类型
            releaseTitle: '',//标题
            serviceType: '',//商品/服务类型
            serviceAndprice: [],//项目及价格KEY，vaule
            project: '', //项目
            price: '',//价格
            serviceIntroduction: '',//介绍
            remarks: '',//备注
            serviceDetailed: '',//服务地址 来电确认和全市
            pictureUrl: [],//图片
            //实名中获取
            consigneeName: '', //联系人姓名 回显可修改
            contact: '',  //实名联系联系方式 回显 可修改
            detailed:'',
            realNameId:'',
            userType:''
          };
          this.restaurants = [];//标题下拉
          this.fileList = [];
        }
        if (to.path.indexOf('upinformation') !== -1) {
          this.ruleForm = {
            id:'',
            userId: '',
            releaseType: '',//发布类型
            releaseTitle: '',//标题
            serviceType: '',//商品/服务类型
            serviceAndprice: [],//项目及价格KEY，vaule
            project: '', //项目
            price: '',//价格
            serviceIntroduction: '',//介绍
            remarks: '',//备注
            serviceDetailed: '',//服务地址 来电确认和全市
            pictureUrl: [],//图片
            //实名中获取
            consigneeName: '', //联系人姓名 回显可修改
            contact: '',  //实名联系联系方式 回显 可修改
            detailed:'',
            realNameId:'',
            userType:''
          };
          this.releaseTypeList = [];
          this.restaurants = [];//标题下拉
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


  .el-form-itemUser {
    display: block;
    float: left;
    margin: 1px 0 8px 1px;
    padding: 1px 0 10px 1px;

  }

</style>
