<template>
  <div>
    <br>审核失败原因 ：{{ruleForm.authentiCationFailure}}<br>
         <!--商户重新实名开始-->
    <br><el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="isbusiness" class="demo-ruleForm">
      <el-form-item label="城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="街道/小区"    prop="addressDetailed"  >
        <el-input v-model="ruleForm.addressDetailed"  :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>

    <el-form-item label="详细楼号"    prop="address_dianming"  >
      <el-input v-model="ruleForm.address_dianming"  placeholder="如:4号楼三层"></el-input>
    </el-form-item>

      <el-form-item label="收/送人手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入收/送货人手机号"></el-input>
      </el-form-item>
      <el-form-item label="收/送人姓名"    prop="consigneeName"  >
        <el-input v-model="ruleForm.consigneeName"  placeholder="请输入收/送货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleForm.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
      </el-form-item>
      <el-form-item label="企业名称"    prop="companyName"  >
        <el-input v-model="ruleForm.companyName"  placeholder="请输入企业/公司名称"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="licenseUrl">
        <el-upload
          ref="upload"
          :action="uploadDownUrl"
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
        <el-button type="primary" @click="submitForm('ruleForm',2)" v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>
    <!--商户重新实名结束-->

    <!--如果是批发商就展示下边的开始-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="iswholesale" class="demo-ruleForm">


      <el-form-item label="市场所在地"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="地址详情"    prop="addressDetailed"  >
        <el-input v-model="ruleForm.addressDetailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="市场名称"  prop="companyName1" >
        <el-autocomplete
          v-model="ruleForm.companyName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择市场名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
        <!--<el-button type="primary" @click="dialogFormVisible = true" plain>添加具体类型</el-button>-->
      </el-form-item>
      <el-form-item label="实名手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="在线下单联系方式"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名"    prop="consigneeName"  >
        <el-input v-model="ruleForm.consigneeName"  placeholder="下单后联系人"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm',13)"  v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>
    <!--批发商结束-->



    <!--如果是求职就展示下边的开始-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormnotbusiness" label-width="100px"   v-if ="iswanted" class="demo-ruleForm">
      <el-form-item label="求职地域"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="现居住地"    prop="addressDetailed"  >
        <el-input v-model="ruleForm.addressDetailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="姓名"    prop="consigneeName"  >
        <el-input v-model="ruleForm.consigneeName"  placeholder="请输入姓名"></el-input>
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


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm',11)" v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>

    <!--租房重新实名开始-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="islease" class="demo-ruleForm">
      <el-form-item label="城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="详细地址"    prop="addressDetailed"  >
        <el-input v-model="ruleForm.addressDetailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="手机号码"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名"    prop="consigneeName"  >
        <el-input v-model="ruleForm.consigneeName"  placeholder="请输入联系人人姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleForm.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
      </el-form-item>
      <el-form-item label="商铺图片" prop="licenseUrl">
        <el-upload
          ref="upload"
          :action="uploadDownUrl"
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
        <el-button type="primary" @click="submitForm('ruleForm',6)" v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>
    <!--商户重新实名结束-->
  </div>
</template>


<script>

  import { get_user_info } from '../../../api/api';
  import {  updateRealName } from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  import {  isRoleMessage} from '../../../api/api';

  import { getUserRealName } from '../../../api/api';
  import { echo_display } from '../../../api/api';
  import {  getwholesale} from '../../../api/api';
  export default {

    data() {
      var checkAge = (rule, value, callback) => {
        value=this.ruleForm.companyName;
        if (!value) {
          return callback(new Error('市场名称不能为空'));
        }
        if(value.length>30){
          return callback(new Error('市场名称不能大于30字'));
        }else {
          callback();
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   }  else {
        //     callback();
        //
        //   }
        // }, 100);
      };
      return {
        restaurants: [],//标题下拉
        timeout:  null,
        fullscreenLoading:false,
        isbusiness:false,//商家
        iswanted:false,//求职
        islease:false,//出租
        iswholesale:false,//批发
        fileList:[],
        pathString:'/home/GrainAndOilPage',
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2

        //城市组件相关结束
        ruleForm: {　//商家
          selectedOptions:[], //三级联动城市
          provincesId:'',
          cityId:'',
          districtCountyId:'',
          addressDetailed: '',//详细地址收/送货地址
          address_dianming:'',
          contact:'',//收送货人联系方式
          consigneeName:'', //收/送货人姓名
          email:'',//邮箱
          companyName:'',//企业名称
          licenseUrl:[],//营业执照图片
          authentiCationFailure:'',
          eag:'', // 年龄
          gender:'男',//性别

        },
        permission:'',
        role:'',
        rules: {
          selectedOptions: [
            { required: true, message: '请选择城市和地区', trigger: 'change'  }
          ],
          addressDetailed:[
            { required: true, message: '请输入街道/小区', trigger: 'blur' },
            { max: 100, message: '不能超过100个字', trigger: 'blur' }
          ],
          address_dianming:[
            { required: true, message: '请输入详细楼号/店名', trigger: 'blur' },
            { max: 100, message: '不能超过100个字', trigger: 'blur' }
          ],
          contact:[
            { required: true, message: '请输入收/送货人手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          consigneeName:[
            { required: true, message: '请输入收/送货人姓名', trigger: 'blur' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
          email:[
            { min:8,max: 30, message: '长度在8至30位之间', trigger: 'blur' }
          ],
          licenseUrl:[
            { required: true, message: '请上传图片' },
          ],
          eag:[
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min:2,max: 3, message: '长度在2至3位之间', trigger: 'blur' }
          ],
          companyName:[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          companyName1:[
            // { required: true, message: '请输入市场名称', trigger: 'change'}
            { required: true,validator: checkAge, trigger: 'change'},
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
        get_user_info().then((res) => {
          let status=res.status;
          if (status === 0) {
            let user=JSON.parse(res.data);
            if( user.isAuthentication===3) {
              //拉取实名信息
              getUserRealName().then((res) => {
                if (res.status === 0) {
                  let role = user.role;
                  this.ruleForm = res.data;
                  if (role === 1 ||role === 2 || role === 3 || role === 4 || role === 5 || role === 7 || role === 12) {
                    this.ruleForm.pictureUrl= this.ruleForm.licenseUrl
                    let fileListAndPictureUrl=  echo_display(this.ruleForm);
                    //图片回显和表格参数
                    this.ruleForm.licenseUrl=fileListAndPictureUrl.pictureUrl;
                    this.fileList=fileListAndPictureUrl.fileList;
                    this.isbusiness = true;
                  } else if (role === 11) {
                    this.iswanted = true;
                  }else if (role === 13) {
                    this.iswholesale = true;
                  }
                  else if (role === 6) {
                    this.ruleForm.pictureUrl= this.ruleForm.licenseUrl
                    let fileListAndPictureUrl=  echo_display(this.ruleForm);
                    //图片回显和表格参数
                    this.ruleForm.licenseUrl=fileListAndPictureUrl.pictureUrl;
                    this.fileList=fileListAndPictureUrl.fileList;
                    this.islease = true;//出租
                  } else {
                    this.$router.push({path: '/home/myAccount'});
                  }
                  let selectedOptions=[];
                  selectedOptions[0]=res.data.provincesId.toString();
                  selectedOptions[1]=res.data.cityId.toString();
                  selectedOptions[2]=res.data.districtCountyId.toString();
                  this.ruleForm.selectedOptions=selectedOptions;
                } else {//获取实名信息失败
                  this.$message.error(res.msg);
                }
              });
            }else{ //获取实名信息！=3
              this.$router.push({ path: '/home/myAccount' });
            }
          }else{ //获取登陆信息失败
            this.$router.push({ path: '/login/sign' });
          }
        });
      },

      //城市组件
      handleChange (value) {
        this.ruleForm.provincesId=this.ruleForm.selectedOptions[0];
        this.ruleForm.cityId=this.ruleForm.selectedOptions[1];
        this.ruleForm.districtCountyId=this.ruleForm.selectedOptions[2];
      },


      //商家
      submitForm(formName,type) {
        this.$refs[formName].validate((valid) => {
          var data ={
            'ruleForm': this.ruleForm,
            'isbusiness':type   //是否是商家
          }
          if (valid) {
            this.fullscreenLoading=true;

            let length=0;
            if(type===2){
              for(let i=0;i< this.ruleForm.licenseUrl.length;i++){
                if(this.ruleForm.licenseUrl[i].useStatus===1){
                  length++;
                }
              }
              if(length===0){
                this.fullscreenLoading=false;
                this.$message.error('图片不能为空');
                return  false;
              }
            }
            updateRealName(data).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.$router.push({ path: '/home/myAccount' });
              }  else {
                isRoleMessage(data.msg);
              }
            });
          } else {
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
          for(var i=0;i< this.ruleForm.licenseUrl.length;i++){
            if(file.id===undefined){
              if(file.response.data.id===this.ruleForm.licenseUrl[i].id){
                this.ruleForm.licenseUrl[i].useStatus=2;
                break;
              }
            }else if(file.id===this.ruleForm.licenseUrl[i].id){
              this.ruleForm.licenseUrl[i].useStatus=2;
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

      //下拉
      querySearchAsync(queryString, cb) {
        if(this.ruleForm.selectedOptions.length===0){
          this.$message.error("请先选择市场所在地")
          return false;
        }
        this.getwholesale();
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

      getwholesale(){
        let  param= {
          selectedOptions:this.ruleForm.selectedOptions,
          companyName:this.ruleForm.companyName
        };
        getwholesale(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurants=releaseTitleList;
            //没有找到用户输入的类型引导添加
            if(this.restaurants.length===0){
              this.$message.error("没有找到您输入的:市场名称可以联系客服添加");
            }
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
    }
  }
</script>


<style >
</style>
