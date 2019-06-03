<template>
  <div>
  实名页
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"   v-if="isbusiness" class="demo-ruleForm">
      <el-form-item label="城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="收/送货地址"    prop="address_detailed"  >
        <el-input v-model="ruleForm.address_detailed"  placeholder="请输入地址详情，100字内"></el-input>
      </el-form-item>

      <el-form-item label="收/送人电话"    prop="contact"  >
        <el-input v-model="ruleForm.contact"  placeholder="请输入收/送货人联系方式"></el-input>
      </el-form-item>
      <el-form-item label="收/送人姓名"    prop="consignee_name"  >
        <el-input v-model="ruleForm.consignee_name"  placeholder="请输入收/送货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"    prop="email"  >
        <el-input v-model="ruleForm.email"  placeholder="请输入收邮箱用于找回密码"></el-input>
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
        <el-button type="primary" @click="submitForm('ruleForm')">立即实名</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  <!--如果是非商户就展示下边的-->
    <el-form :model="ruleFormnotbusiness" :rules="rules" ref="ruleForm" label-width="100px"   v-if="isnotbusiness" class="demo-ruleForm">
    </el-form>

  </div>
</template>


<script>

  import { uploadDown_update } from '../../../api/api';
  import { get_user_info } from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  export default {
    data() {
      return {
        isbusiness: false, //是否是商家
        isnotbusiness:false,//非商家
        pathString:'/home/GrainAndOilPage',
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2

        //城市组件相关结束
        ruleForm: {
          selectedOptions: [], //三级联动城市
          // provinces_id:'',
          // city_id:'',
          // district_county_id:'',
          address_detailed: '',//详细地址收/送货地址
          contact:'',//收送货人联系方式
          consignee_name:'', //收/送货人姓名
          email:'',//邮箱
          licenseUrl: [],//营业执照图片
        },
        permission:'',
        role:'',
        rules: {
          selectedOptions: [
            { required: true, message: '请选择城市和地区', trigger: 'blur' }
          ],
          address_detailed:[
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { max: 100, message: '不能超过100个字', trigger: 'blur' }
          ],
          contact:[
            { required: true, message: '请输入收/送货人联系方式', trigger: 'blur' },
            { min:6 ,max: 12, message: '长度在6至11位之间', trigger: 'blur' }
          ],
          consignee_name:[
            { required: true, message: '请输入收/送货人姓名', trigger: 'blur' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
          email:[
            { min:8,max: 30, message: '长度在8至30位之间', trigger: 'blur' }
          ],
          licenseUrl:[
            { required: true, message: '请上传图片', trigger: 'blur' },
          ]

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
            let role=user.role;
            console.log( user);
            if(role===2 || role===3 || role===4  || role===5 || role===7 || role===12 ){
              this.isbusiness=true;
            }else{
              this.isnotbusiness=true;
            }
          }else{
            this.$router.push({ path: '/login/sign' });
          }
        });
      },

    //城市组件
      handleChange (value) {
        console.log(this.selectedOptions);
        // this.ruleForm.provinces_id=this.ruleForm.selectedOptions[0];
        // this.ruleForm.city_id=this.ruleForm.selectedOptions[1];
        // this.ruleForm.district_county_id=this.ruleForm.selectedOptions[2];
      },



      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          console.log(this.ruleForm);
          var data ={ 'ruleForm': this.ruleForm}
          console.log( data);
          console.log( valid);
          if (valid) {
           // var data ={ 'ruleForm': this.ruleForm}
            console.log( data);
            // grainAndOil(data).then(data => {
            //
            //   console.log(data)
            //   //let { msg, code, user } = data;
            //   if (data && data.status === 0) {
            //     console.log(data)
            //     // sessionStorage.setItem('user', JSON.stringify(user));
            //     // this.$router.push({ path: '/home' });
            //
            //   }  else {
            //     this.$message.error(data.msg);
            //     let dataerror=data.msg;
            //     if(dataerror==='用户登陆已过期'){
            //       this.$router.push({ path: '/login/sign' });
            //     } if(dataerror==='没有此权限'){
            //       this.$router.push({ path: '/home/release' });
            //     }

              }
            //});



        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
       });
      },

      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {


        if (res.message!=null && res.message!='') {
          var picture={"picture_name":file.name ,"picture_url": res.message, "use_status":1};
          this.ruleForm.licenseUrl= this.ruleForm.licenseUrl.concat(picture);
          console.log(this.ruleForm.licenseUrl);
        }
      },

      //删除文件之前的钩子函数
      handleRemove(file,fileList) {
        //console.log(file);
        for(var i=0;i< this.ruleForm.licenseUrl.length;i++){
          if(file.name===this.ruleForm.licenseUrl[i].picture_name  && file.response.message===this.ruleForm.licenseUrl[i].picture_url){
            // console.log(this.ruleForm.licenseUrl[i] );
            // console.log(this.ruleForm.licenseUrl[i].picture_name );
            uploadDown_update(this.ruleForm.licenseUrl[i]).then((res) => {
              this.ruleForm.licenseUrl[i].use_status=2;
              //this.ruleForm.pictureUrl.splice(i,1);
              // console.log(this.ruleForm.licenseUrl[i].use_status);
              // console.log(this.ruleForm.licenseUrl);
              //  this.ruleForm.pictureUrl= this.ruleForm.pictureUrl.concat({name: file.name ,url: res.message});
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


<style >
</style>
