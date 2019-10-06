<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      请认真填写信息
        <el-form-item label="所在城区"   prop="selectedOptions">
          <el-cascader
            size="large"
            :options="options"
            v-model="ruleForm.selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>

      <el-form-item label="姓名" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName"  autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  prop="contact">
        <el-input v-model="ruleForm.contact"  autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="执照名"  prop="companyName">
        <el-input v-model="ruleForm.companyName"  autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="经营地址"  prop="addressDetailed">
        <el-input v-model="ruleForm.addressDetailed"  autocomplete="off" :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>


      <el-form-item label="送货范围"    prop="delivery"  >
        <el-radio v-model="ruleForm.delivery" label="全市">全市</el-radio>
        <el-radio v-model="ruleForm.delivery" label="本区">本区</el-radio>
      </el-form-item>


      <el-form-item label="紧急联系人" >
        <el-input v-model="ruleForm.urgentName"   ></el-input>
      </el-form-item>
      <el-form-item label="紧急联系方式"  prop="urgentContact">
        <el-input v-model="ruleForm.urgentContact"   ></el-input>
      </el-form-item>


      <el-form-item label="备注" >
        <el-input v-model="ruleForm.licenseUrl" placeholder="备注"></el-input>
      </el-form-item>



      <el-form-item label="执照截止日"  prop="licenseEndTime" >
        <el-date-picker
          v-model="ruleForm.licenseEndTime"
          type="date"
          placeholder="请选择执照到期日"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="健康证截止"  prop="healthyEndTime" >
        <el-date-picker
          v-model="ruleForm.healthyEndTime"
          type="date"
          placeholder="请选择健康证到期日"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item  label="用户类型" prop="userType">
        <template>
          <el-radio-group v-model="ruleForm.userType">
            <el-radio :label="1" >自营</el-radio>
            <el-radio :label="2" >合作</el-radio>
            <el-radio :label="3" >加盟</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="合同编号"  prop="contractNo">
        <el-input v-model="ruleForm.contractNo" placeholder="请输入纸质合同编号"></el-input>
      </el-form-item>

     账户信息:银行卡或者支付宝必须填一个
      <el-form-item label="银行卡号" >
        <el-input v-model="ruleForm.bankCard" placeholder="请输入银行卡号"></el-input>
      </el-form-item>
      <el-form-item label="支付宝号" >
        <el-input v-model="ruleForm.alipay" placeholder="请输入支付宝号"></el-input>
      </el-form-item>
      <el-form-item label="退款人姓名"  prop="accountName">
        <el-input v-model="ruleForm.accountName" placeholder="退还质量保证金银行卡姓名"></el-input>
      </el-form-item>
      <el-form-item label="质保金(元)"  prop="availableAmount">
        <el-input v-model.number="ruleForm.availableAmount" autocomplete="off" placeholder="收取的质保金金额"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">添加</el-button>
      </el-form-item>
    </el-form>



  </div>
</template>
<script>


  import {  isRoleMessage } from '../../../../../api/api';

  import { regionData } from 'element-china-area-data'

  import {  admin_create_orderUser } from '../../../../../api/api';
  import {   admin_select_signingOrderById } from '../../../../../api/api';
  export default {
    name:'adminAddjiedan',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('质保金不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('质保金只能为整百数字'));
          }  else {
            callback();

          }
        }, 100);
      };
      return {
        id:this.$route.params.id,
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2
        fullscreenLoading:false,
        ruleForm: {
          userId:'',
          id:'',//
          contact:'',//收/送货联系方式
          consigneeName:'',// 收/送货人姓名
          companyName:'',// 企业名称
          addressDetailed:'',//详细地址，
          selectedOptions:[],// 省市区

          delivery:' ',//送货范围  送货范围 1 本区2 全市
          urgentContact:' ',//紧急联系方式
          urgentName:' ',//紧急联系人

          licenseUrl:' ', //备注
          licenseEndTime:'' ,//营业执照结束时间
          healthyEndTime:'',//健康证结束时间
          userType:'',//1自营2合作
          contractNo:'',//合同编号

          //账户相关
          accountName:'',//银行卡姓名
          bankCard:'',//银行卡号
          alipay:'',//支付宝账户
          availableAmount:'',//金额
        },

        rules: {
          selectedOptions: [
            { required: true, message: '请选择城市和地区'}
          ],
          companyName:[
            {  required: true, message: '公司名称不能为空', trigger: 'blur'},
            { max: 100, message: '公司名称不能大于100字' }
          ],
          addressDetailed:[
            {  required: true, message: '经营地址不能为空', trigger: 'blur'},
            { max: 100, message: '经营地址不能大于100字' }
          ],
          delivery: [
            { required: true, message: '请选择送货范围', trigger: 'change' }
          ],
          licenseEndTime: [
            { required: true, message: '请选择营业执照到期日', trigger: 'change' }
          ],
          healthyEndTime: [
            { required: true, message: '请选择健康证到期日', trigger: 'change' }
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          urgentContact:[
            { min: 11, max: 11, message: '紧急联系联系方式手机号格式错误', trigger: 'blur' }
          ],
          consigneeName:[
            { required: true, message: '请输入姓名' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
          contractNo:[
            { required: true, message: '请输入合同编号' },
            { max: 20, message: '合同编号不能为空', trigger: 'blur' }
          ],
          availableAmount:[
            { required: true,validator: checkAge, trigger: 'blur'},
          ],
          accountName:[
            { required: true, message: '请输入退款人姓名' },
            { min:2,max: 12, message: '长度在2至12位之间', trigger: 'blur' }
          ],
     }
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {

      //提交
      submitForm(ruleForm) {
      if(this.ruleForm.bankCard==='' && this.ruleForm.alipay===''){
        this.$message.error("银行卡或者支付宝必须填写一个");
        return false;
      }
       //this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {

            admin_create_orderUser(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                this.$message.success("添加成功");
             //  this.$router.push('/home/businessEnquiry');
              } else {
                isRoleMessage(res.msg);
              }
            });
          } else {
            this.fullscreenLoading=false;
            return false;
          }
        });
      },


      //检查登陆和权限
      checke_isButten(){
        admin_select_signingOrderById(this.id).then(res => {
                if (res.status === 0) {
                  res.data.urgentContact='';//紧急联系方式
                  res.data.urgentName='';//紧急联系人
                  res.data.licenseUrl=''; //备注
                  res.data.accountName=res.data.consigneeName;
                  res.data.availableAmount=300;
                  res.data.bankCard='';
                  res.data.alipay='';
                  res.data.isReceipt=2;
                  let selectedOptions=[]
                  selectedOptions=selectedOptions.concat(res.data.provincesId.toString());
                  selectedOptions=selectedOptions.concat(res.data.cityId.toString());
                  selectedOptions=selectedOptions.concat(res.data.districtCountyId.toString());
                  res.data.selectedOptions=selectedOptions;

                  this.ruleForm=res.data;
                } else {
                  isRoleMessage(res.msg);
                }
              });
      },

      //城市组件
      handleChange (value) {
      },
    }
  }

</script>
<style>


  .el-form-itemUser{
    display:block;
    float:left;
    margin : 1px 0px 8px 1px;
    padding: 1px 0px 10px 1px;

  }

</style>
