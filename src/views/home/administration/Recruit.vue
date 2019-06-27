<template>
  <div class="vm-image-list">
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="realName.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="realName.contact" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--c查询框结束-->
    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="userType"
        label="用户类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="authentiCationStatus"
        label="1审中3不过"
        width="100">
      </el-table-column>
      <el-table-column
        prop="detailed"
        label="省市区"
        width="150"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="workingAddress"
        label="工作地址"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="addressConsistency"
        label="实名地1一致"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="position"
        label="职位类型"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="number"
        label="人数"
        width="50">
      </el-table-column>
      <el-table-column
        prop="isPublishContact"
        label="1公开手机"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="examineClick(scope.row)" type="text" size="small">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->
    <!--查看详情弹窗开始-->
    <el-dialog
      title="审核详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <span>用户类型 : {{realNameNo.userType }}</span><br>
      <span>用户名 : {{realNameNo.userName }}</span><br>
      <span>实名姓名 : {{realNameNo.consigneeName }}</span><br>
      <span>联系方式 : {{realNameNo.contact }}</span><br>
      <span>城区 : {{realNameNo.detailed }}</span><br>
      <span>地址详情 : {{realNameNo.addressDetailed }}</span><br>
      <span>职位类型 : {{realNameNo.position }}</span><br>
      <span>招聘人数 : {{realNameNo.number }}</span><br>
      <span>薪水 : {{realNameNo.salary }}</span><br>
      <span>福利 : {{realNameNo.welfare }}</span><br>
      <span>学历 : {{realNameNo.education }}</span><br>
      <span>经验 : {{realNameNo.experience }}</span><br>
      <span>性别 : {{realNameNo.gender }}</span><br>
      <span>年龄 : {{realNameNo.age }}</span><br>
      <span>详情 : {{realNameNo.describeOne }}</span><br>
      <span>奖励 : {{realNameNo.introductoryAward }}</span><br>
      <span>邮箱 : {{realNameNo.email }}</span><br>
      <span>公开手机 : {{realNameNo.isPublishContact }}</span><br>
      <span>地址一致 : {{realNameNo.addressConsistency }}</span><br>
      <span>申请时间 : {{realNameNo.createTime }}</span><br>
      <span>审批状态 : {{realNameNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{realNameNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{realNameNo.examineName }}</span><br>


      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->

    <!--审核弹窗开始-->
    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="审批状态" prop="authentiCationStatus">
          <el-radio-group v-model="form.authentiCationStatus" >
            <el-radio label="2">通过</el-radio>
            <el-radio label="3">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="失败原因" prop="authentiCationFailure"  >
          <el-input v-model="form.authentiCationFailure"  placeholder="选择不通过时必须输入，小于15个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗结束-->
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
    <!-- 分页结束 -->

  </div>
</template>
<script>
  import {  getReleaseWelfareAll } from '../../../api/api';
  import {  examineReleaseWelfare } from '../../../api/api';

  export default {
    data() {
      return {
        fullscreenLoading:false,
        //分页开始
        total: 0,
        currentPage: 1,
        infoList: [],
        movieInfoList: [],
        pageSize: 20,//每页显示的数量
        //分页结束
        realName: { //查询条件
          userName:'',
          contact: '',
        },
        dataInline: {
          type: Object
        },
        tableData:[], //全部数据
        realNameNo:'', //某一个审批
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //审批弹窗
        form: {   //审核表单
          authentiCationStatus: '',
          authentiCationFailure:'', //失败原因
        },
        formLabelWidth: '120px',
        rules: {
          authentiCationStatus: [
            { required: true, message: '请选择是否通过', trigger: 'change' }
          ],
          authentiCationFailure: [
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getHotMovieList();
    },

    methods: {
      handleClick(row) {  //点击查看详细
        this.realNameNo=row;
        this.dialogVisible=true;
      },
      handleClose(done) { //关闭查看详情
        this.dialogVisible=false;
      },
      examineClick(row){ //点击审批打开弹窗
        this.realNameNo=row;
        console.log(this.realNameNo);
        this.dialogFormVisible=true;
      },
      //查询提交
      onSubmit() {
        this.getHotMovieList();
      },
      //审批提交
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.form.userId=this.realNameNo.userId;
            this.form.id=this.realNameNo.id;
            examineReleaseWelfare(this.form).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.getHotMovieList(); //刷新列表
                this.dialogFormVisible=false;
              }  else {
                this.$message.error(data.msg);
                let dataerror=data.msg;
                if(dataerror==='用户登陆已过期'){
                  this.$router.push({ path: '/login/sign' });
                } if(dataerror==='没有此权限'){
                  this.$router.push({ path: '/home/release' });
                }
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      async getHotMovieList() {
        this.dataInline.pageSize=this.pageSize;
        this.dataInline.currentPage=this.currentPage;
        this.dataInline.userName=this.realName.userName;
        this.dataInline.contact=this.realName.contact;
        getReleaseWelfareAll(this.dataInline).then((res) => {
          console.log(res)
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$message.error(res.msg);
            let dataerror=res.msg;
            if(dataerror==='用户登陆已过期'){
              this.$router.push({ path: '/login/sign' });
            } if(dataerror==='没有此权限'){
              this.$router.push({ path: '/home/release' });
            }
          }
        });
      },

      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.dataInline.currentPage=currentPage;
        getReleaseWelfareAll(this.dataInline).then((res) => {
          if(res.status===0) {
            this.tableData = res.data.datas;
          }else{
            this.$message.error(res.msg);
            let dataerror=res.msg;
            if(dataerror==='用户登陆已过期'){
              this.$router.push({ path: '/login/sign' });
            } if(dataerror==='没有此权限'){
              this.$router.push({ path: '/home/release' });
            }
          }
        });

      },
    },

  }
</script>
<style>

</style>
