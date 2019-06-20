<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p>发布招聘信息</p>

      <el-form-item label="职位类型"  prop="position" >
      <template>
        <el-select v-model="ruleForm.position" filterable placeholder="请输入或点击选择职位类型">
          <el-option
            v-for="item in restaurants"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script>

  import { grainAndOil } from '../../../api/api';
  import { get_user_info_jurisdiction } from '../../../api/api';
  import { get_position } from '../../../api/api';

  export default {
    data() {
      return {
        restaurants: '', // 类型数据

        resdata:'',//获取的用户信息
        pathString:'/home/releaseWelfare',

        ruleForm: {
          userId:'',
          userName:'',
          position: '',  //职位类型
          number:'',//招聘人数  100
          salaryMin:'',//薪水下限   非必填
          salaryMax:'',//薪水上限  非必填
          unlimited:'', //薪水面议  非必填
          welfare:'',//福利
          education:'', //学历
          experience:'', //工作年限
          describe:'',//职位描述 100字以下
          IntroductoryAward:'',//介绍人奖励  非必填
          email:'',  //非必填
          isPublishContact:'', // 是否公开手机 1公开，2隐藏
          workingAddress:'', //工作地址，默认填充实名中的地址，可以修改

          //实名中获取
          detailed:'',//省市区  回显置灰
          addressDetailed:'',//实名地址不可编辑 回显置灰 不可修改
          contact:'',  //实名联系联系方式 回显置灰 不可修改
          consigneeName:'', //联系人姓名 回显置灰 不可修改
        },
        permission:'',
        role:'',
        rules: {
          position: [
            { required: true, message: '职位类型不能为空', trigger: 'blur' },
          ],
          placeOfOrigin: [
            { required: true, message: '请输入产地', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请输入品牌', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],

          pictureUrl:[
            { required: true, message: '请上传图片', trigger: 'blur' },

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
     this.loadAll();
      this.jurisdiction();
    },
    methods: {

      //判断是否登录 获取用户权限，防止用户直接通过url访问
      jurisdiction() {
        get_user_info_jurisdiction(this.pathString).then((res) => {
          if (res.isbutten === true) {
            this.resdata = res;
          } else {
            this.$router.push({path: '/home/release'});
          }
          if (res.isAuthentication != 2) {
            this.$router.push({path: '/home/myAccount'});
          }
        });
      },

      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            const data = this.ruleForm;
            grainAndOil(data).then(data => {

              if (data && data.status === 0) {

              } else {
                this.$message.error(data.msg);
                let dataerror = data.msg;
                if (dataerror === '用户登陆已过期') {
                  this.$router.push({path: '/login/sign'});
                }
                if (dataerror === '没有此权限') {
                  this.$router.push({path: '/home/release'});
                }
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

 //下拉列表

    loadAll() {
      get_position().then((res) => {
        let datalist=res.data;
        var all=[];
       for(var a=0;a<datalist.length;a++){
        let  valuel={
          value:''
        };
         valuel.value=datalist[a];
          all[a]=valuel;
       }
        this.restaurants=all;
      });
    },

  }
  }
</script>


<style >

</style>
