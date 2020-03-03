<template>
  <div class="vm-image-list">
    <!--我的发布 已发布过的职位  c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="手机号">
        <el-input v-model="releaseWelfare.contact" placeholder="手机号" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="get_position_listselect">查询</el-button>
      </el-form-item>

    </el-form>
    <!--c查询框结束-->
    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"  >
      <el-table-column
        fixed
        prop="userType"
        label="用户类型"
        width="120">
      </el-table-column>
      <el-table-column
        fixed
        prop="releaseType"
        label="发布类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="authentiCationStatus"
        label="状态"
        width="90">
      </el-table-column>
      <el-table-column
        prop="authentiCationFailure"
        label="失败原因"
        width="90"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="releaseTitle"
        label="标题"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="fouseSize"
        label="使用面积(平米)"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="serviceDetailed"
        label="地址详情"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="contact"
        label="联系方式"
        width="110">
      </el-table-column>
      <el-table-column
        prop="consigneeName"
        label="联系人"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
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



    <!--查看详情弹窗开始-->
    <el-dialog
      title="审核详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <span>用户类型 : {{tableDataNo.userType }}</span><br>
      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span>出租地址 : {{tableDataNo.serviceDetailed }}</span><br>

      <span>发布类型 : {{tableDataNo.releaseType}}</span><br>
      <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
      <span>使用面积: {{tableDataNo.fouseSize }} (平米)</span><br>
      <span>备注 : {{tableDataNo.remarks }}</span><br>
      <span>具体介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
      <span>申请时间 : {{tableDataNo.createTime }}</span><br>
      <span>审批状态 : {{tableDataNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>
      <br>实名详情<br>

      <span>实名公司 : {{tableDataNo.companyName }}</span><br>
      <span>实名电话 : {{tableDataNo.contact }}</span><br>
      <span>实名城市 : {{tableDataNo.detailed }}</span><br>
      <span>实名地址 : {{tableDataNo.realNameId }}</span><br>



      <span>图片 : </span><br>
      <li v-for="(p, index) in this.tableDataNo.pictureUrl" :key="index">
        <img :src="p.pictureUrl" width="100%">
      </li>

      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="releaseWelfare.currentPage"
      :page-size="releaseWelfare.pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
    <!-- 分页结束 -->

  </div>
</template>
<script>

  import { adminMent} from '../../../../api/api';
  import { examineAll} from '../../../../api/api';

  export default {
    data() {
      return {
        fullscreenLoading:false,
        pathString:'/home/releaseWelfare',
        //分页开始
        total: 0,

        //分页结束

        releaseWelfare: { //查询条件
          contact:'',//手机号
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData:[], //全部数据
        tableDataNo:{
          pictureUrl:'',
        }, //某一个审批
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //审批弹窗
        form: {   //审核表单
          authentiCationStatus: '',
          authentiCationFailure:'', //失败原因
          tabuleType:14, //14,15房屋出租
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
      this.get_position_list();
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
                this.get_position_list(); //刷新列表
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
        this.releaseWelfare.currentPage=currentPage;
        this.get_position_list();

      },
      get_position_listselect(){
        this.releaseWelfare.currentPage=1;
        this.get_position_list();
      },
      get_position_list(){
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        adminMent(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$msgdeal(res.msg);
          }
        });
      },
    },
  }
</script>
<style>

</style>
