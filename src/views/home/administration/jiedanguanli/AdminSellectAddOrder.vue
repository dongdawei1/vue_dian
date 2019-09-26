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

      <el-form-item label="所在城区"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="realName.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
      </el-form-item>

      <el-form-item label="申请时间">
      <el-date-picker
        v-model="realName.value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
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
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
      <span>企业名称 : {{tableDataNo.companyName }}</span><br>
      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span>联系方式 : {{tableDataNo.contact }}</span><br>
      <span>城区 : {{tableDataNo.detailed }}</span><br>
      <span>地址详情 : {{tableDataNo.addressDetailed }}</span><br>
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
      <span>公开手机 : {{tableDataNo.isPublishContact }}</span><br>
      <span>地址一致 : {{tableDataNo.addressConsistency }}</span><br>
      <span>申请时间 : {{tableDataNo.createTime }}</span><br>
      <span>审批状态 : {{tableDataNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>


      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->


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
  import { isRoleMessage } from '../../../../api/api';
  import { admin_select_addOrder } from '../../../../api/api';

  import { regionData } from 'element-china-area-data'
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },



        fullscreenLoading:false,
        //分页开始
        total: 0,
        options: regionData,//城市
        //分页结束
        realName: { //查询条件
          selectedOptions: [], //三级联动城市
          userName:'',
          contact: '',
          currentPage: 1,
          pageSize: 20,//每页显示的数量
          value2: [],
        },

        tableData:[], //全部数据
        tableDataNo:'', //某一个审批
        dialogVisible: false,  //查看详情弹窗

        formLabelWidth: '120px',

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


      // //审批提交
      // submitForm(form) {
      //   this.$refs['form'].validate((valid) => {
      //     if (valid) {
      //       this.fullscreenLoading=true;
      //       this.form.userId=this.tableDataNo.userId;
      //       this.form.id=this.tableDataNo.id;
      //       examineAll(this.form).then(data => {
      //         this.fullscreenLoading=false;
      //         if (data && data.status === 0) {
      //           this.$message.success(data.msg);
      //           this.getReleaseWelfareAll(); //刷新列表
      //           this.dialogFormVisible=false;
      //         }  else {
      //           isRoleMessage(data.msg);
      //         }
      //       });
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },

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
          console.log(this.realName)
        if(this.realName.value2===null){
          this.realName.value2=[];
        }

        admin_select_addOrder(this.realName).then((res) => {
          console.log(res)
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            isRoleMessage(res.msg);
          }
        });
      },
      //城市组件
      handleChange (value) {
          // this.releaseWelfare.selectedOptions[0]=value[0];
          // this.releaseWelfare.selectedOptions[1]=value[1];
          // this.releaseWelfare.selectedOptions[2]=value[2];
      },
    }

  }
</script>
<style>

</style>
