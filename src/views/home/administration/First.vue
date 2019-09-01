<template>
  <div class="vm-image-list">
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="realName.userName" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="realName.contact" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRealNameAll">查询</el-button>
        <el-button type="primary" plain> <router-link
          v-on:click.native=""
          to="/home/addRealName"  class="a">添加实名 </router-link></el-button>
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
        prop="userName"
        label="用户名"
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
        prop="addressDetailed"
        label="地址详情"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="contact"
        label="联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="consigneeName"
        label="姓名"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="gender"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="eag"
        label="年龄"
        width="60">
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
      <span>用户名 : {{tableDataNo.userName }}</span><br>
      <span>城区 : {{tableDataNo.detailed }}</span><br>
      <span>地址详情 : {{tableDataNo.addressDetailed }}</span><br>
      <span>联系方式 : {{tableDataNo.contact }}</span><br>
      <span>姓名 : {{tableDataNo.consigneeName }}</span><br>
      <span>审批状态 : {{tableDataNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>年龄 : {{tableDataNo.eag }}</span><br>
      <span>性别 : {{tableDataNo.gender }}</span><br>
      <span>邮箱 : {{tableDataNo.email }}</span><br>
      <span>申请时间 : {{tableDataNo.createTime }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>
      <span>图片 :</span><br>
      <li v-for="(p, index) in this.tableDataNo.licenseUrl" :key="index">
        <img :src="p.pictureUrl" width="100%">
      </li>
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
  import {  getRealNameAll } from '../../../api/api';
  import {  examineRealName } from '../../../api/api';
  import { isRoleMessage } from '../../../api/api';
  export default {
    data() {
      return {
        fullscreenLoading:false,
        //分页开始
        total: 0,
        fileList:[],
        //分页结束
        realName: { //查询条件
          userName:'',
          contact: '',
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        dataInline: {
          type: Object
        },
        tableData:[], //全部数据
        tableDataNo:{
          licenseUrl:''
        }, //某一个审批
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
      this.getRealNameAll();
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
            this.form.isArtificial=1;  //审批
            examineRealName(this.form).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.getRealNameAll(); //刷新列表
                this.dialogFormVisible=false;
              }  else {
                isRoleMessage(data.msg);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      handleCurrentChange(currentPage) {
        this.realName.currentPage=currentPage;
        this.getRealNameAll();

      },

      getRealNameAll(){
        getRealNameAll(this.realName).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$message.error(res.msg);
          }
        });
      }

    }
  }
</script>
<style>

</style>
