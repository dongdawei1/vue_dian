<template>
  <div class="vm-image-list">
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="实名公司名">
        <el-input v-model="realName.companyName" placeholder="实名公司名" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="realName.contact" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getReleaseWelfareAllSelect">查询</el-button>
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="企业名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="authentiCationStatus"
        label="审核状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="authentiCationFailure"
        label="失败原因"
        width="100"
        :show-overflow-tooltip="true">
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

      <span>用户类型 : {{tableDataNo.userType }}</span><br>
      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span>工作地址 : {{tableDataNo.workingAddress }}</span><br>
      <span>职位类型 : {{tableDataNo.position }}</span><br>
      <span>招聘人数 : {{tableDataNo.number }}</span><br>
      <span>薪水 : {{tableDataNo.salary }}</span><br>
      <span>福利 : {{tableDataNo.welfare }}</span><br>
      <span>学历 : {{tableDataNo.education }}</span><br>
      <span>经验 : {{tableDataNo.experience }}</span><br>
      <span>性别 : {{tableDataNo.gender }}</span><br>
      <span>年龄 : {{tableDataNo.age }}</span><br>
      <span>详情 : {{tableDataNo.describeOne }}</span><br>
      <span>奖励 : {{tableDataNo.introductoryAward }}</span><br>
      <span>邮箱 : {{tableDataNo.email }}</span><br>
      <span>公开手机（1为公开）: {{tableDataNo.isPublishContact }}</span><br>
      <span>地址一致（1为一致） : {{tableDataNo.addressConsistency }}</span><br>
      <span>申请时间 : {{tableDataNo.createTime }}</span><br>
      <span>审批状态 : {{tableDataNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>
    <br>实名信息<br>
      <span>公司名称 : {{tableDataNo.companyName }}</span><br>
      <span>实名电话 : {{tableDataNo.contact }}</span><br>
      <span>实名城区 : {{tableDataNo.detailed }}</span><br>
      <span>实名地址 : {{tableDataNo.realNameId }}</span><br>

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
      :current-page="realName.currentPage"
      :page-size="realName.pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
    <!-- 分页结束 -->

  </div>
</template>
<script>
  import {  getReleaseWelfareAll } from '../../../../api/api';
  import {  examineAll } from '../../../../api/api';
  export default {
    data() {
      return {
        fullscreenLoading:false,
        //分页开始
        total: 0,

        //分页结束
        realName: { //查询条件
          companyName:'',
          contact: '',
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },

        tableData:[], //全部数据
        tableDataNo:'', //某一个审批
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //审批弹窗
        form: {   //审核表单
          authentiCationStatus: '',
          authentiCationFailure:'', //失败原因
          tabuleType:30,
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
      this.getReleaseWelfareAll();
    },

    methods: {
      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        this.dialogVisible=true;
      },
      handleClose(done) { //关闭查看详情
        this.dialogVisible=false;
      },
      examineClick(row){ //点击审批打开弹窗
        this.tableDataNo=row;
        this.dialogFormVisible=true;
      },

      //审批提交
      submitForm(form) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.form.userId=this.tableDataNo.userId;
            this.form.id=this.tableDataNo.id;
            examineAll(this.form).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.getReleaseWelfareAll(); //刷新列表
                this.dialogFormVisible=false;
              }  else {
                this.$msgdeal(data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },

      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.realName.currentPage=currentPage;
        this.getReleaseWelfareAll();

      },
      getReleaseWelfareAllSelect(){
         this.realName.currentPage=1;
         this.getReleaseWelfareAll();
      },
      getReleaseWelfareAll(){
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        getReleaseWelfareAll(this.realName).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$msgdeal(res.msg);
          }
        });
      }
    }

  }
</script>
<style>

</style>
