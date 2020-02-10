<template>
  <div class="vm-image-list">
    <!--我的发布 已发布过的装修等  c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="发布状态"  >
        <template>
          <el-select v-model="releaseWelfare.welfareStatus" clearable placeholder="请选择发布状态">
            <el-option
              v-for="item in  welfareStatuss"
              :key="item.label"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_position_listselect">查询</el-button>
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM()"
          to="" class="a" >发布出租/转让店面信息</router-link></el-button>
      </el-form-item>

    </el-form>
    <!--c查询框结束-->
    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      max-height="500">
      <el-table-column
        fixed
        prop="releaseType"
        label="出租类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="welfareStatus"
        label="发布状态"
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
        width="140"
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
        label="失效时间"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="termOfValidity"
        label="创建时间"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="210">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"  v-if="scope.row.isDisplaySee">查看</el-button>
          <el-button @click="submitForm(scope.row, 1)" type="text" size="small" v-if="scope.row.isDisplayRefresh"  v-loading.fullscreen.lock="fullscreenLoading" >刷新</el-button>
          <el-button @click="submitForm(scope.row, 2)" type="text" size="small" v-if="scope.row.isDisplayDelay" v-loading.fullscreen.lock="fullscreenLoading" >延期</el-button>
          <el-button @click="submitForm(scope.row, 3)" type="text" size="small"  v-if="scope.row.isDisplayHide" v-loading.fullscreen.lock="fullscreenLoading">隐藏</el-button>
          <el-button @click="submitForm(scope.row, 4)" type="text" size="small"  v-if="scope.row.isDisplayRelease" v-loading.fullscreen.lock="fullscreenLoading">显示</el-button>
          <el-button @click="open(scope.row, 5)" type="text" size="small"  v-if="scope.row.isDisplayDelete"   v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
          <!-- 只有失败的才显示 编辑键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small"   v-if="scope.row.isDisplayEdit" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->
    <!--查看详情弹窗开始-->
    <el-dialog
      title="出租/转让详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="parent">
        <div class="left">
          <span>发布状态 : {{tableDataNo.welfareStatus }}</span><br>
          <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
          <span>联系方式 : {{tableDataNo.contact }}</span><br>
          <span>所在城区 : {{tableDataNo.detailed }}</span><br>
          <span>地址详情 : {{tableDataNo.serviceDetailed }}</span><br>
        </div>
        <div class="right">
          <span v-if="tableDataNo.welfareStatus === '审核失败'">失败原因 : {{tableDataNo.authentiCationFailure }}<br></span>
          <span>发布类型 : {{tableDataNo.releaseType}}</span><br>
          <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
          <span>使用面积: {{tableDataNo.fouseSize }} (平米)</span><br>
          <span>失效时间 : {{tableDataNo.termOfValidity }}</span><br>


        </div>
        <span>备注 : {{tableDataNo.remarks }}</span><br>
        <span>具体介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
        <span>实名信息  ------- </span><br>
        <span>公司名称: {{realName.companyName }}</span><br>
        <span>实名地址: {{realName.addressDetailed }}</span><br>
        <span>现场图片 : </span><br>
        <li v-for="(p, index) in this.tableDataNo.pictureUrl" :key="index">
          <img :src="p.pictureUrl" width="100%">
        </li>
      </div>
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
  import {  operation_userment } from '../../../../api/api';
  import { get_user_info } from '../../../../api/api';
  import { get_myRent_list} from '../../../../api/api';
  import { isRoleMessage } from '../../../../api/api';
  import {   getRealName } from '../../../../api/api';


  export default {
    inject: ["reload"],
    data() {
      return {
        fullscreenLoading:false,

        //分页开始
        total: 0,
        //分页结束
        welfareStatuss:[
          { "value": "发布中", "label": "1" },
          { "value": "隐藏中", "label": "2" },
          { "value": "审核中", "label": "4" },
          { "value": "已过期", "label": "5" },
        ],//查询条件职位状态
        releaseWelfare: { //查询条件
          releaseType:'', //服务类型
          welfareStatus:'',//发布状态
          currentPage: 1,
          pageSize: 20,//每页显示的数量
          StringPath:'',
        },
        tableData:[], //全部数据
        tableDataNo:{
          pictureUrl:'',
        }, //某一个数据
        dialogVisible: false,  //查看详情弹窗
        formLabelWidth: '120px',
        resdata:'',//获取的用户信息
        realName:'',//实名信息
      }
    },
    created () {
      this.get_user_info();
      this.getRealName();
    },
    methods: {
      examineClick(row){
        this.reload();
        this.$router.push('/home/updateRent/'+row.id);  //带参数页面跳转  name:'editMAndRAndP',
        // id:this.$route.params.id,
      },


      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        this.dialogVisible=true;
      },

      handleClose(done) { //关闭查看详情
        this.dialogVisible=false;
      },

      //操作
      submitForm(form,type) {
        this.fullscreenLoading=true;
        let data={};
        data.type=type;
        data.userId= form.userId;
        data.id=form.id;
        data.releaseType=form.releaseType;
        if(data.releaseType==='摊位出租/转让'){
          data.releaseType=15;
        }else{
          data.releaseType=14;
        }
        if(type===1 || type===2|| type===3|| type===4 || type===5){
          operation_userment(data).then(data => {
            this.fullscreenLoading=false;
            let msg=data.msg;
            if (data && data.status === 0) {
              this.$message.success(msg);
            }  else {
              isRoleMessage(msg);
            }
          });
        }else{
          this.$message.error("操作类型错误");
        }
        this.get_position_list(); //刷新列表
      },
      //删除
      open(form,type) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this. submitForm(form,type);
        }).catch(() => {

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
        get_myRent_list(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            isRoleMessage(res.msg);
          }
        });
      },
   //获取实名信息
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },

      //
      get_user_info(){
        get_user_info().then((res) => {
          if(res.status===0){
            this.resdata=JSON.parse(res.data)
            if(this.resdata.isAuthentication===2){
              this.get_position_list();
            }else{
              this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能发布信息！</strong>', '用户信息不完善', {
                dangerouslyUseHTMLString: true
              });
              this.$router.push({ path: '/home/myAccount' });
            }}else {
            isRoleMessage(res.msg);
          }
        });
      },


      //判断是否实名和登陆状态
      isAuthenticationM(){
        let role=this.resdata.role;
        if(role===2||role===3){
          this.$router.push({ path: '/home/createLease' });
        }else{
          this.$router.push({ path: '/home/createRentalBooth' });
        }
      },

    }
  }
</script>
<style>
  .parent {
    padding:0px 15px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height:30px;  /*行间距*/
    font-size:16px;
  }
  .left{
    width: 40%;
    display: table-cell;
  }
  .right{
    width: 50%;
    display: table-cell;
  }
</style>
