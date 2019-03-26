<template>
  <dev>
    Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品类别" prop="type">
        <el-radio-group v-model="ruleForm.type">
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


      <el-form-item label="活动形式" prop="remarks">
        <el-input  v-model="ruleForm.remarks"  placeholder="10字以内"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>


  </dev>
</template>


<script>

  import { get_user_info } from '../../../api/api';
  export default {
    data() {
      return {
        ruleForm: {
          commodityName: '', //名
          placeOfOrigin: '',//产地
          brand:'',//品牌
          specifications:'',//规格
          price:'',//价格
          remarks: '', //备注
          priceEffectiveStart: '', //开始
          priceEffectiveEnd: '', //结束
          type: '' //类型
        },



        permission:'',
        role:'',
        isbutten:false,
        rules: {
          commodityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
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
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],


          priceEffectiveStart: [
            { type: 'date', required: true, message: '开始日期', trigger: 'change' }
          ],
          priceEffectiveEnd: [
            { type: 'date', required: true, message: '结束日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个商品类别', trigger: 'change' }
          ],

          remarks: [
            { message: '请填写活动形式', trigger: 'blur' },
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
              this.$router.push({ path: '/home/Release' });
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }





    }

  }
</script>


<style >
</style>
