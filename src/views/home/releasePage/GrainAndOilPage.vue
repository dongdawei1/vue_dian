<template>
  <dev>
    Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品类别" prop="commoditytype">
        <el-radio-group v-model="ruleForm.commoditytype">
          <el-radio label="米/面"></el-radio>
          <el-radio label="油"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="商品名称" prop="commodityName" >
        <el-input v-model="ruleForm.commodityName"  placeholder="如：某某品牌大米"></el-input>
      </el-form-item>


      <el-form-item label="商品产地" prop="placeOfOrigin" >
        <el-input v-model="ruleForm.placeOfOrigin" ></el-input>
      </el-form-item>

      <el-form-item label="商品品牌" prop="brand" >
        <el-input v-model="ruleForm.brand" ></el-input>
      </el-form-item>

      <el-form-item label="商品规格" prop="specifications" >
        <el-input v-model="ruleForm.specifications" ></el-input>公斤/升
      </el-form-item>


      <el-form-item label="商品价格" prop="price" >
        <el-input v-model="ruleForm.price" placeholder="元" ></el-input>
      </el-form-item>

      <el-form-item label="价格有效期" required>
        <el-col :span="11">
          <el-form-item prop="priceEffectiveStart">
            <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.priceEffectiveStart" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="priceEffectiveEnd">
            <el-date-picker  type="date" placeholder="结束日期" v-model="ruleForm.priceEffectiveEnd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>



      <el-form-item label="图片">
        <el-upload
          ref="upload"
          action="/api/uploadDown/upload"
          name="picture"
          list-type="picture-card"
          :limit="5"

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





      <el-form-item label="备注" prop="remarks">
        <el-input  v-model="ruleForm.remarks"  placeholder="10字以内"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>


  </dev>
</template>


<script>

  import { get_user_info } from '../../../api/api';
  import { uploadDown_update } from '../../../api/api';
  import { grainAndOil } from '../../../api/api';

  export default {
    data() {
      return {

        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        //图片列表（用于在上传组件中回显图片）
      // fileList: {name: '', url: ''},

        ruleForm: {
          commodityName: '', //名
          placeOfOrigin: '',//产地
          brand:'',//品牌
          specifications:'',//规格
          price:'',//价格
          remarks: '', //备注
          priceEffectiveStart: '', //开始
          priceEffectiveEnd: '', //结束
          commoditytype: '', //类型
          pictureUrl: [],
          permissionid : 5,
        },

        permission:'',
        role:'',
        rules: {
          commodityName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          placeOfOrigin: [
            { required: true, message: '请输入产地', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请输入品牌', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],


          specifications: [
            { required: true, message: '请输入规格', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],


          priceEffectiveStart: [
            { type: 'date', required: true, message: '开始日期', trigger: 'change' }
          ],
          priceEffectiveEnd: [
            { type: 'date', required: true, message: '结束日期', trigger: 'change' }
          ],
          commoditytype: [
            { required: true, message: '请至少选择一个商品类别', trigger: 'change' }
          ],

          remarks: [
            { min: 1, max: 10, message: '备注不能超过10个字', trigger: 'blur' }
          ]
        }





      }
    },

    created () {
      this.islogin()

    },
    methods: {

      //判断是否登录 获取用户权限
      islogin(){
        get_user_info().then((res) => {

          let status=res.data.status;
          if (status === 0) {
            this.permission=JSON.parse(res.data.data);  //字符串转换为 对象
            this.role=this.permission.role;
            if(this.role===1 ||this.role===4){
              this.isbutten=true;
            }else{
              this.$router.push({ path: '/home' });
            }
          }else{
            console.log(res)
            this.$router.push({ path: '/login/sign' });
          }
        });
      },




      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            const data = this.ruleForm;
            console.log(data);
            grainAndOil(data).then(data => {

              console.log(data)
              //let { msg, code, user } = data;
              if (data && data.status === 0) {
                console.log(data)
                // sessionStorage.setItem('user', JSON.stringify(user));
                // this.$router.push({ path: '/home' });

              }  else {
                   this.$message.error(data.msg);
                   let dataerror=data.msg;
                     if(dataerror==='用户登陆已过期'){
                       this.$router.push({ path: '/login/sign' });
                } if(dataerror==='没有此权限'){
                  this.$router.push({ path: '/home' });
                }

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


        if (res.message!=null && res.message!='') {

          this.ruleForm.pictureUrl= this.ruleForm.pictureUrl.concat({name: file.name ,url: res.message});
          console.log(this.ruleForm.pictureUrl);
        }
      },

      //删除文件之前的钩子函数
      handleRemove(file,fileList) {

        for(var i=0;i< this.ruleForm.pictureUrl.length;i++){
         if(file.name===this.ruleForm.pictureUrl[i].name  && file.response.message===this.ruleForm.pictureUrl[i].url ){

           uploadDown_update(this.ruleForm.pictureUrl[i]).then((res) => {
             this.ruleForm.pictureUrl.splice(i,1);
             console.log(this.ruleForm.pictureUrl);
           //  this.ruleForm.pictureUrl= this.ruleForm.pictureUrl.concat({name: file.name ,url: res.message});
             console.log("删除图片"+file.name);
           });
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
