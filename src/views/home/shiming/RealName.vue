<template>
  <div>
  实名页
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="isbusiness" class="demo-ruleForm">
      <el-form-item label="所在城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="实名地址"    prop="address_detailed"  >
        <el-input v-model="ruleForm.address_detailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="实名手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入收/送货人手机"></el-input>
      </el-form-item>
      <el-form-item label="联系人"    prop="consignee_name"  >
        <el-input v-model="ruleForm.consignee_name"  placeholder="请输入收/送货人姓名"></el-input>
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
          action="/api/uploadDown/upload"
          name="picture"
          list-type="picture-card"
          :limit="3"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"   >
          <img width="100%"   :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"  v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>

  <!--如果是求职就展示下边的开始-->
    <el-form :model="ruleFormnotbusiness" :rules="rules" ref="ruleFormnotbusiness" label-width="100px"   v-if ="iswanted" class="demo-ruleForm">

      <el-form-item label="求职地域"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleFormnotbusiness.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="手机"    prop="contact"  >
        <el-input v-model="ruleFormnotbusiness.contact"  placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="姓名"    prop="consignee_name"  >
        <el-input v-model="ruleFormnotbusiness.consignee_name"  placeholder="请输入姓名"></el-input>
      </el-form-item>


      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleFormnotbusiness.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="resetFormWanted('ruleFormnotbusiness')" v-loading.fullscreen.lock="fullscreenLoading">立即实名</el-button>
      </el-form-item>
    </el-form>
    <!--如果是求职就展示下边的结束-->

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="islease" class="demo-ruleForm">
      <el-form-item label="所在城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址"    prop="address_detailed"  >
        <el-input v-model="ruleForm.address_detailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="联系手机"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名"    prop="consignee_name"  >
        <el-input v-model="ruleForm.consignee_name"  placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleForm.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
      </el-form-item>
      <el-form-item label="企业名称"    prop="companyName"  >
        <el-input v-model="ruleForm.companyName"  placeholder="请输入企业/公司名称"></el-input>
      </el-form-item>
      <el-form-item label="商铺图片" prop="licenseUrl">
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
  </div>
</template>


<script>

  import { uploadDown_update } from '../../../api/api';
  import { get_user_info } from '../../../api/api';
  import {  newRealName } from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  import {  isRoleMessage} from '../../../api/api';


  export default {
    data() {
      return {
        fullscreenLoading:false,
        isbusiness:false, //商家
        iswanted:false,//求职
        islease:false,//出租
        isnotbusiness:false,//非商家
        isNewRealName:false,//判断是第一次还是重新发起
        pathString:'/home/GrainAndOilPage',
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2

        //城市组件相关结束
        ruleForm: { //商家
          selectedOptions: [], //三级联动城市
          provinces_id:'',
          city_id:'',
          district_county_id:'',
          address_detailed: '',//详细地址收/送货地址
          contact:'',//收送货人联系方式
          consignee_name:'', //收/送货人姓名
          email:'',//邮箱
          companyName:'',//企业名称
          licenseUrl: [],//营业执照图片
        },

        ruleFormnotbusiness: {   //非商家
          selectedOptions: [], //三级联动城市
          provinces_id:'',
          city_id:'',
          district_county_id:'',
          address_detailed: '',//详细地址收/送货地址
          contact:'',//收送货人联系方式
          consignee_name:'', //收/送货人姓名
          eag:'', // 年龄
          gender:'男',//性别
          email:'',//邮箱
        },
        permission:'',
        role:'',
        rules: {
          selectedOptions: [
            { required: true, message: '请选择城市和地区' }
          ],
          address_detailed:[
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { max: 100, message: '不能超过100个字', trigger: 'blur' }
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          consignee_name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
          email:[
            { min:8,max: 30, message: '长度在8至30位之间', trigger: 'blur' }
          ],
          licenseUrl:[
            { type: 'array',required: true, message: '如果已上传请继续提交' },
          ],
          eag:[
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min:2,max: 3, message: '长度在2至3位之间', trigger: 'blur' }
          ],
          companyName:[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
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
            if( user.isAuthentication!==4){
              this.$router.push({ path: '/home/myAccount' });
            }
            let role=user.role;
            if(role===1||role===2 || role===3 || role===4  || role===5 || role===7 || role===12 ){
              this.isbusiness=true;
            }else if(role===11){
              this.iswanted=true;
            }else if(role===6){
              this.islease=true;
            }else{
              this.$router.push({ path: '/home/myAccount' });
            }
          }else{
            this.$router.push({ path: '/login/sign' });
          }
        });
      },

    //城市组件
      handleChange (value) {
       // console.log(this.selectedOptions);
        this.ruleForm.provinces_id=this.ruleForm.selectedOptions[0];
        this.ruleForm.city_id=this.ruleForm.selectedOptions[1];
        this.ruleForm.district_county_id=this.ruleForm.selectedOptions[2];

        this.ruleFormnotbusiness.provinces_id=this.ruleFormnotbusiness.selectedOptions[0];
        this.ruleFormnotbusiness.city_id=this.ruleFormnotbusiness.selectedOptions[1];
        this.ruleFormnotbusiness.district_county_id=this.ruleFormnotbusiness.selectedOptions[2];
      },


     //商家提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var data ={
            'ruleForm': this.ruleForm,
            'isbusiness': 2   //是否是商家
                      }
          if (valid) {
            this.fullscreenLoading = true;

            let length=0;
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

            newRealName(data).then(data => {
              this.fullscreenLoading = false;
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


      //求职提交
      resetFormWanted(ruleFormnotbusiness) {
        this.$refs['ruleFormnotbusiness'].validate((valid) => {
      var data ={
        'ruleForm': this.ruleFormnotbusiness,
        'isbusiness': 11
      }
      if (valid) {
        this.fullscreenLoading = true;
        newRealName(data).then(data => {
          this.fullscreenLoading = false;
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
