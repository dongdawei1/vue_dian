<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="isCreate">
      <p>创建/编辑简历</p>
      <el-form-item label="求职类型"  prop="position" >
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


      <el-form-item label="工资要求"  prop="salary">
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


      <el-form-item label="学历" prop="education">
        <el-select v-model="ruleForm.education" placeholder="请选择学历">
          <el-option label="无" value="无"></el-option>
          <el-option label="初中以上" value="初中以上"></el-option>
          <el-option label="高中以上" value="高中以上"></el-option>
          <el-option label="大专以上" value="大专以上"></el-option>
          <el-option label="本科以上" value="本科以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作经验" prop="experience">
        <el-select v-model="ruleForm.experience" placeholder="请选工作年限">
          <el-option label="无" value="无"></el-option>
          <el-option label="1-2年" value="1-2年"></el-option>
          <el-option label="2-5年" value="2-5年"></el-option>
          <el-option label="5-10年" value="5-10年"></el-option>
          <el-option label="10年以上" value="10年以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" placeholder="18-60岁之间"></el-input>
      </el-form-item>




      <el-form-item  label="性别" prop="gender">
        <template>
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>



      <el-form-item label="求职城区"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="所在城区"   prop="selectedOptions1">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions1"
          @change="handleChange1">
        </el-cascader>
      </el-form-item>



      <el-form-item label="自我描述" prop="describeOne">
        <el-input
          type="textarea"
          placeholder="如：具体工作范围，或者其他福利要求"
          v-model="ruleForm.describeOne"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email" placeholder="请输入正确邮箱"></el-input>
      </el-form-item>
      <p>实名信息</p>

      <el-form-item label="联系人" prop="addressDetailed">
        <el-input v-model="ruleForm.consigneeName" :disabled="true" autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>


      <el-form-item label="联系方式" prop="contact"  >
        <el-input v-model="ruleForm.contact" :disabled="true" autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="公开电话" prop="isPublishContact"  >

        <el-radio-group v-model="ruleForm.isPublishContact">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">不公开</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布</el-button>
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
   <el-button type="primary" @click="jurisdiction1()" >查看简历</el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->
    <!--发布过简历展示详情-->
    <div  class="jianlixiangqi" v-if="isDetails"   >
      <h4> <span>简历详情</span></h4>
      <div  class="gerentablecss_content">
        <div class="left">
          <span>求职类型 : {{ruleForm.position }}</span><br>
          <span>学历 : {{ruleForm.education }}</span><br>
          <span>年龄 : {{ruleForm.age }}</span><br>
          <span>性别 : {{ruleForm.gender }}</span><br>
          <span>邮箱 : {{ruleForm.email}}</span><br>
          <span>联系人 : {{ruleForm.consigneeName }}</span><br>
          <span>联系方式 : {{ruleForm.contact }}</span><br>
          <span>是否公开电话 : {{isPublishContact }}</span><br>
          <span>创建时间 : {{ruleForm.createTime }}</span><br>
          <span>刷新时间 : {{ruleForm.updateTime }}</span><br>
        </div>
        <div class="right">
          <span>工资要求 : {{ruleForm.salary }}</span><br>
          <span>工作经验 : {{ruleForm.experience }}</span><br>
          <span>求职城区 : {{ruleForm.detailed }}</span><br>
          <span>所在城区 : {{ruleForm.addressDetailed }}</span><br>
          <span>简历状态 : {{ruleForm.authentiCationStatus }}</span><br>
          <span v-if="ruleForm.authentication_status">审核失败原因 : {{ ruleForm.authentiCationFailure}}<br></span>

        </div>
        <span>自我描述 : {{ruleForm.describeOne }}</span><br>
      </div>
      <br>
      <el-button type="primary" @click="endAndAgain()" v-if="ruleForm.isEnd">编辑</el-button>
      <el-button type="primary" @click="operation(ruleForm,1)" v-if="ruleForm.isRefresh" v-loading.fullscreen.lock="fullscreenLoading">刷新</el-button>
      <el-button type="primary" @click="operation(ruleForm,2)" v-if="ruleForm.isHide" v-loading.fullscreen.lock="fullscreenLoading">隐藏</el-button>
      <el-button type="primary" @click="operation(ruleForm,3)" v-if="ruleForm.isDel" >删除</el-button>
      <el-button type="primary" @click="operation(ruleForm,4)" v-if="ruleForm.isRelease" v-loading.fullscreen.lock="fullscreenLoading">显示简历</el-button>

      <el-button type="primary" @click="endAndAgain()" v-if="ruleForm.isAgain">重新发布</el-button>
    </div>

  </div>
</template>
<script>
  import { get_position } from '../../../../api/api';
  import { regionData } from 'element-china-area-data'
  import {  checke_isButten } from '../../../../api/api';
  import {  isRoleMessage } from '../../../../api/api';
  import { getRealName } from '../../../../api/api';
  import { create_resume } from '../../../../api/api';
  import { select_resume_by_id } from '../../../../api/api';
  import { operation_resume } from '../../../../api/api';

  export default {
    data() {
      return {
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading:false,
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息
        options: regionData, //城市组件
        isCreate:false, //显示创建页面
        isDetails:false,//详情
        restaurants: '', // 类型数据
        ruleForm: {
          selectedOptions:[],
          provinces_id:'',
          city_id:'',
          district_county_id:'',
          selectedOptions1:[],
          provinces_id1:'',
          city_id1:'',
          district_county_id1:'',
          userId:'',
          position: '',  //职位类型
          salary:'', //
          education:'', //学历

          experience:'', //工作年限
          age:'',//年龄范围

          gender:'',//性别
          describeOne:'',//职位描述 100字以下
          email:'',  //非必填
          isPublishContact:'', // 是否公开手机 1公开，2隐藏


          //实名中获取
          contact:'',  //实名联系联系方式 回显置灰 不可修改
          consigneeName:'', //联系人姓名 回显置灰 不可修改
          type:1  //1为创建2为重新发起或者编辑
        },
        StringPath:'/home/jobWanted',
        permission:'',
        role:'',
        rules: {
          selectedOptions: [
            { type: 'array', required: true, message: '请选择求职城市'}
          ],
          selectedOptions1: [
            { type: 'array', required: true, message: '请选择所在城市' }
          ],
          position: [
            { required: true, message: '职位类型不能为空', trigger: 'change' },
          ],
          salary: [
            { required: true, message: '请选择工资', trigger: 'change' }
          ],
          education: [
            { required: true, message: '学历不能为空', trigger: 'change' }
          ],
          experience: [
            { required: true, message: '工作经验不能为空', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'change' }
          ],

          describeOne:[
            {  required: true, message: '自我描述不能为空', trigger: 'change' },
            { min: 1, max: 100, message: '自我描述不能超过100个字', trigger: 'blur' }
          ],
          isPublishContact: [
            { required: true, message: '请勾选是否公开电话', trigger: 'change' }
          ]}
      }
    },

    created () {
      this.jurisdiction()
    },
    methods: {
      //编辑重新发布
      endAndAgain(){
        this.isDetails=false;
        this.isCreate=true;
        this.ruleForm.type=2;
     if(this.ruleForm.gender==='男'){
       this.ruleForm.gender=1;
     }else{
       this.ruleForm.gender=2;
     }

      },
      jurisdiction1(){
        this.isCreate=false;
        this.centerDialogVisible=false;
        this.isDetails=true;
        this.jurisdiction();


      },
      //操作
      operation(ruleForm,type){
        let data={};
        data.type=type;
        data.userId= ruleForm.userId;
        data.id=ruleForm.id;
        data.StringPath =this.StringPath;
        if(type===1 || type===2 || type===4){
          this.fullscreenLoading=true;
          operation_resume(data).then(res => {
            this.fullscreenLoading=false;
            if (res.status === 0) {
              this.jurisdiction();
            }  else {isRoleMessage(res.msg);}});
        }else  if(type===3){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            operation_resume(data).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                this.ruleForm.type=1;
                this.jurisdiction();
              }  else {
                isRoleMessage(res.msg);
              }
            });
          }).catch(() => {this.fullscreenLoading=false;});
        } else{this.$message.error("操作类型错误");}
      },
      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.ruleForm.StringPath=this.StringPath;
            create_resume(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                //成功弹窗
                this.centerDialogVisible=true;
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

      cntinue(){  //留在本页继续发布
        this.centerDialogVisible=false;
      },
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            let  em=this.realName.email;
            if(em!=='' && em!==null){
              this.ruleForm.email=em;
            }
            this.ruleForm.contact= this.realName.contact;
            this.ruleForm.consigneeName= this.realName.consigneeName;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      //判断是否登录 获取用户权限，防止用户直接通过url访问
      jurisdiction() {
        select_resume_by_id().then((res) => {
          if(res.status===0){
           if(res.data!==null){
            this.ruleForm=res.data;
            if(this.ruleForm.isPublishContact===1){
              this.isPublishContact='公开'
            }else{this.isPublishContact='不公开'}

            let welfareStatus=this.ruleForm.welfareStatus;
            if(welfareStatus===1){
              this.ruleForm.authentiCationStatus='发布中'
              this.ruleForm.isEnd=true;
              this.ruleForm.isRefresh=true;
              this.ruleForm.isHide=true;
              this.ruleForm.isDel=true;
            }else if(welfareStatus===2){
              this.ruleForm.authentiCationStatus='隐藏中'
              this.ruleForm.isRelease=true;
              this.ruleForm.isDel=true;
              this.ruleForm.isEnd=true;
            }else if(welfareStatus===4){
              let authentiCationStatus=this.ruleForm.authentiCationStatus;
              if(authentiCationStatus===1){
                this.ruleForm.authentiCationStatus='审核中'
                this.ruleForm.isDel=true;
              }else if(authentiCationStatus===3){
                this.ruleForm.authentiCationStatus='审核失败'
                this.ruleForm.isAgain=true;//重新发起
                this.ruleForm.isDel=true;
                this.ruleForm.authentication_status=true;
              }
            }
           this.isDetails=true;  //详情
           }else{//没有创建过
             this.isDetails=false;
            this.checke_isButten();}
          }else{isRoleMessage(res.msg);}});
      },
      //
      checke_isButten(){
        checke_isButten(this.StringPath).then((res) => {
          if(res.status===0){
            if (res.data.isCreate === true) {
              this.isCreate=res.data.isCreate;
              this.resdata =res.data.data;
              this.ruleForm.userId=this.resdata.id;
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
      //城市组件
      handleChange (value) {

        this.ruleForm.provinces_id=this.ruleForm.selectedOptions[0];
        this.ruleForm.city_id=this.ruleForm.selectedOptions[1];
        this.ruleForm.district_county_id=this.ruleForm.selectedOptions[2];
      },
      handleChange1 (value) {

        this.ruleForm.provinces_id1=this.ruleForm.selectedOptions1[0];
        this.ruleForm.city_id1=this.ruleForm.selectedOptions1[1];
        this.ruleForm.district_county_id1=this.ruleForm.selectedOptions1[2];
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
<style>
  .jianlixiangqi {
    padding:0px 10px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height:30px;  /*行间距*/
    font-size:16px;
  }
  .left{
    width: 50%;
    display: table-cell;
  }
  .right{
    width: 50%;
    display: table-cell;
  }

</style>
