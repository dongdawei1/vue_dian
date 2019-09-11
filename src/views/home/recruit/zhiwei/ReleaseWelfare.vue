<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p>职位信息,有效期30天，在我的发布刷新即可增加有效期</p>
      <el-form-item label="职位类型"  prop="position" >
      <template>
        <el-select v-model="ruleForm.position" filterable placeholder="选择职位类型">
          <el-option
            v-for="item in restaurants"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      </el-form-item>

      <el-form-item label="招聘人数"   prop="number">
        <template>
          <el-input-number v-model="ruleForm.number" :min="1" :max="99"  :precision="0" label="99个以下"></el-input-number>
        </template>
        </el-form-item>

      <el-form-item label="职位工资"  prop="salary">
        <el-select v-model="ruleForm.salary" placeholder="请选择工资">
          <el-option label="2000元以上" value="2000元以上"></el-option>
          <el-option label="3000元以上" value="3000元以上"></el-option>
          <el-option label="4000元以上" value="4000元以上"></el-option>
          <el-option label="5000元以上" value="5000元以上"></el-option>
          <el-option label="6000元以上" value="6000元以上"></el-option>
          <el-option label="8000元以上" value="8000元以上"></el-option>
          <el-option label="10000元以上" value="10000元以上"></el-option>
          <el-option label="面议" value="面议"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="学历要求" prop="education">
        <el-select v-model="ruleForm.education" placeholder="请选择学历">
          <el-option label="不限" value="不限"></el-option>
          <el-option label="初中以上" value="初中以上"></el-option>
          <el-option label="高中以上" value="高中以上"></el-option>
          <el-option label="大专以上" value="大专以上"></el-option>
          <el-option label="本科以上" value="本科以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作年限" prop="experience">
        <el-select v-model="ruleForm.experience" placeholder="请选工作年限">
          <el-option label="不限" value="不限"></el-option>
          <el-option label="1年以上" value="1年以上"></el-option>
          <el-option label="2年以上" value="2年以上"></el-option>
          <el-option label="3年以上" value="3年以上"></el-option>
          <el-option label="4年以上" value="4年以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年龄范围" prop="age">
        <el-select v-model="ruleForm.age" placeholder="请选年龄范围">
          <el-option label="18-30岁" value="18-30岁"></el-option>
          <el-option label="18-40岁" value="18-40岁"></el-option>
          <el-option label="18-50岁" value="18-50岁"></el-option>
          <el-option label="30-40岁" value="30-40岁"></el-option>
          <el-option label="30-60岁" value="30-60岁"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="其他福利" prop="welfare">
        <el-checkbox-group v-model="ruleForm.welfare">
          <el-checkbox label="五险" name="welfare"></el-checkbox>
          <el-checkbox label="包住" name="welfare"></el-checkbox>
          <el-checkbox label="包吃" name="welfare"></el-checkbox>
          <el-checkbox label="房补" name="welfare"></el-checkbox>
          <el-checkbox label="13薪" name="welfare"></el-checkbox>
          <el-checkbox label="其他" name="welfare"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item  label="选择性别" prop="gender">
      <template>
        <el-radio-group v-model="ruleForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">不限</el-radio>
        </el-radio-group>
      </template>
      </el-form-item>


      <el-form-item label="介绍奖励" prop="introductoryAward">
        <el-select v-model="ruleForm.introductoryAward" placeholder="介绍人奖励可不选">
          <el-option label="无" value="无"></el-option>
          <el-option label="每人100元入职一个月后奖励" value="每人100元入职一个月后奖励"></el-option>
          <el-option label="每人200元入职一个月后奖励" value="每人200元入职一个月后奖励"></el-option>
          <el-option label="每人300元入职一个月后奖励" value="每人300元入职一个月后奖励"></el-option>
          <el-option label="每人400元入职一个月后奖励" value="每人400元入职一个月后奖励"></el-option>
          <el-option label="每人500元入职一个月后奖励" value="每人500元入职一个月后奖励"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email" placeholder="请输入正确邮箱"></el-input>
      </el-form-item>

      <el-form-item label="工作地址" prop="workingAddress">
        <el-input v-model="ruleForm.workingAddress" placeholder="请输工作地址"></el-input>
      </el-form-item>

      <el-form-item label="职位描述" prop="describeOne">
      <el-input
        type="textarea"
        placeholder="如：具体工作范围，或者具体年龄等不超过100字"
        v-model="ruleForm.describeOne"
        maxlength="100"
        show-word-limit
      >
      </el-input>
      </el-form-item>

      <el-form-item label="联系人"  prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName"  autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>


      <el-form-item label="联系方式" prop="contact"  >
        <el-input v-model="ruleForm.contact"  autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="工作城市" >
        <el-input v-model="ruleForm.detailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <!--实名中的信息不提交-->
      <el-form-item label="实名地址" >
        <el-input v-model="realName.addressDetailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" >
        <el-input v-model="realName.companyName" :disabled="true" autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <!--实名中的信息不提交结束-->
      <el-form-item label="公开电话" prop="isPublishContact"  >

          <el-radio-group v-model="ruleForm.isPublishContact">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">不公开</el-radio>
          </el-radio-group>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"  v-loading.fullscreen.lock="fullscreenLoading">立即发布</el-button>
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
    <el-button @click="cntinue">继续发布</el-button>
    <el-button type="primary"><router-link
      v-on:click.native="goRelease"
      to="" class="a" >查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->
  </div>
</template>


<script>

  import { create_position } from '../../../../api/api';
  import {  checke_isButten } from '../../../../api/api';
  import {  isRoleMessage } from '../../../../api/api';
  import { get_position } from '../../../../api/api';
  import { getRealName } from '../../../../api/api';
  export default {
    data() {
      return {
        fullscreenLoading:false,
        restaurants: '', // 类型数据
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息

        centerDialogVisible: false,//成功弹窗
        ruleForm: {
          userId:'',
          position: '',  //职位类型
          number:1,//招聘人数  100
          salary:'', //  salaryMin,salaryMax ,unlimited拼的字符串提交
          welfare:[],//福利
          education:'不限', //学历
          experience:'不限', //工作年限
          age:'',//年龄范围
          gender:'',//性别
          describeOne:'',//职位描述 100字以下
          introductoryAward:'',//介绍人奖励  非必填
          email:'',  //非必填
          isPublishContact:'', // 是否公开手机 1公开，2隐藏
          workingAddress:'', //工作地址，默认填充实名中的地址，可以修改

          //实名中获取
          detailed:'',//省市区  回显置灰
          contact:'',  //实名联系联系方式  可修改
          consigneeName:'', //联系人姓名 可修改
          realNameId:'',//实名id
          StringPath:'/home/releaseWelfare',
        },
        permission:'',
        role:'',
        rules: {
          position: [
            { required: true, message: '职位类型不能为空', trigger: 'change' },
          ],
          number: [
            { required: true, message: '请输入招聘人数', trigger: 'blur' }
          ],
          salary: [
            { required: true, message: '请选择工资', trigger: 'change' }
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],

          welfare:[
            { required: true, message: '福利不能为空', trigger: 'change' },

          ],
          education: [
            { required: true, message: '学历不能为空', trigger: 'change' }
          ],
          experience: [
            { required: true, message: '工作经验不能为空', trigger: 'change' }
          ],
          age: [
            { required: true, message: '年龄范围不能为空', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'change' }
          ],
          workingAddress: [
            {  required: true, message: '工作地址不能为空', trigger: 'change' },
            { min: 1, max: 100, message: '地址不能超过100个字', trigger: 'blur' }
          ],
          describeOne:[
            {  required: true, message: '职位描述不能为空', trigger: 'change' },
            { min: 1, max: 100, message: '职位描述不能超过100个字', trigger: 'blur' }
          ],
          isPublishContact: [
            { required: true, message: '请勾选是否公开电话', trigger: 'change' }
          ],
          introductoryAward: [
            { required: true, message: '请选择是否有介绍奖励', trigger: 'change' }
          ],
          consigneeName:[
            { required: true, message: '请输入姓名' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
        }
      }
    },

    created () {
      this.jurisdiction();
    },
    methods: {
        cntinue(){  //留在本页继续发布
        this.centerDialogVisible=false;
     },
      goRelease(){
        this.centerDialogVisible=false;
        this.$router.push({path: '/home/myRelease'});
      },
      //判断是否登录 获取用户权限，防止用户直接通过url访问
      jurisdiction() {
        checke_isButten(this.ruleForm.StringPath).then((res) => {
          if(res.status===0){
          if (res.data.isCreate === true) {
            this.resdata =res.data.data;
            this.ruleForm.userId=this.resdata.id;
            this.ruleForm.userName=this.resdata.username;
          } else {
            this.$router.push({path: '/home/release'});
          }
          if (res.data.isAuthentication !== 2) {
            this.$router.push({path: '/home/myAccount'});
          }else {
          this.getRealName();
          this.loadAll();//获取完用户信息在调用
          }}else{
            isRoleMessage(res.msg);
          }
        });
      },

      submitForm(ruleForm) {
        this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            create_position(this.ruleForm).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.ruleForm.position='';
               //成功弹窗
                this.centerDialogVisible=true;

              } else {
                isRoleMessage(data.msg);
              }
            });
          } else {
            this.fullscreenLoading=false;
            return false;
          }
        });
      },
      getRealName(){
              getRealName().then((res) => { //获取实名信息填充

                if(res.status ===0 ) {
                  this.realName=res.data;
                  let  em=this.realName.email;
                      if(em!=='' && em!==null){
                        this.ruleForm.email=em;
                      }
                   this.ruleForm.workingAddress= this.realName.addressDetailed;
                   this.ruleForm.detailed= this.realName.detailed;
                   this.ruleForm.contact= this.realName.contact;
                   this.ruleForm.consigneeName= this.realName.consigneeName;
                  this.ruleForm.realNameId=this.realName.id;

                }else {
                  isRoleMessage(res.msg);
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
