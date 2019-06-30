<template>
  <div class="vm-image-list">
    <!--发不过的职位  c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="职位类型"  >
        <template>
          <el-select v-model="releaseWelfare.position" clearable placeholder="请输入或点击选择职位类型">
            <el-option
              v-for="item in restaurants"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>

      <el-form-item label="职位状态"  >
        <template>
          <el-select v-model="releaseWelfare.welfareStatus" clearable placeholder="请选择职位状态">
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
        <el-button type="primary" @click="onSubmit">查询</el-button>

        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布职位</router-link></el-button>
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
        prop="position"
        label="职位类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="welfareStatus"
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
        prop="workingAddress"
        label="工作地址"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
        width="110">
      </el-table-column>

      <el-table-column
        prop="introductoryAward"
        label="介绍人奖励"
        width="210"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="number"
        label="人数"
        width="50">
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪水"
        width="110">
      </el-table-column>
        <el-table-column
          prop="welfare"
          label="福利"
          width="110"
          :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="isPublishContact"
        label="公开手机"
        width="80">
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
        width="210">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- 隐藏状态不显示刷新键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small">刷新</el-button>
          <!-- 状态不是失效的不显示延期键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small">延期</el-button>
          <!-- 隐藏和发布互斥 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small">隐藏</el-button>
          <el-button @click="examineClick(scope.row)" type="text" size="small">发布</el-button>
          <el-button @click="examineClick(scope.row)" type="text" size="small">删除</el-button>
          <!-- 只有失败的才显示 编辑键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->
    <!--查看详情弹窗开始-->
    <el-dialog
      title="职位详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <span>用户名 : {{realNameNo.userName }}</span><br>
      <span>职位类型 : {{realNameNo.position }}</span><br>
      <span>联系方式 : {{realNameNo.contact }}</span><br>
      <span>城区 : {{realNameNo.detailed }}</span><br>
      <span>地址详情 : {{realNameNo.workingAddress }}</span><br>

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
      <span>是否公开手机 : {{realNameNo.isPublishContact }}</span><br>


      <span>职位状态 : {{realNameNo.welfareStatus }}</span><br>
      <span>失败原因 : {{realNameNo.authentiCationFailure }}</span><br>
      <span>创建时间 : {{realNameNo.createTime }}</span><br>
      <span>刷新时间 : {{realNameNo.updateTime }}</span><br>
      <span>失效时间 : {{realNameNo.termOfValidity }}</span><br>


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
  import {  getReleaseWelfareAll } from '../../../../api/api';
  import {  examineReleaseWelfare } from '../../../../api/api';
  import { get_position } from '../../../../api/api';
  import { get_user_info_jurisdiction } from '../../../../api/api';

  import { get_position_list } from '../../../../api/api';
  export default {
    data() {
      return {
        fullscreenLoading:false,
        pathString:'/home/releaseWelfare',
        //分页开始
        total: 0,
        currentPage: 1,
        infoList: [],
        movieInfoList: [],
        pageSize: 20,//每页显示的数量
        //分页结束
        restaurants: '', // 查询下来列表
        welfareStatuss:[
          { "value": "发布中", "label": "1" },
          { "value": "隐藏中", "label": "2" },
          { "value": "审核中", "label": "4" },
          { "value": "超过有效期", "label": "5" }
        ],//查询条件职位状态

        releaseWelfare: { //查询条件
          position:'', //职位类型
          welfareStatus:'',//职位状态
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
      this.loadAll();
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
        this.dataInline.position=this.releaseWelfare.position;
        this.dataInline.welfareStatus=this.releaseWelfare.welfareStatus;
        get_position_list(this.dataInline).then((res) => {
          console.log(res)
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            let list=res.data.datas;
            for(let a=0;a<list.length;a++){
             let welfareStatus= list[a].welfareStatus;
             if( welfareStatus===1){
               list[a].welfareStatus='发布中';
               list[a].authentiCationFailure='';
             }else if( welfareStatus===2){
               list[a].welfareStatus='未显示';
               list[a].authentiCationFailure='';
             }else if( welfareStatus===4){
               let authentiCationStatus=list[a].authentiCationStatus;
                if(authentiCationStatus===3){
                 list[a].welfareStatus='审核失败';}
                else{
                  list[a].welfareStatus='审核中'
                  list[a].authentiCationFailure='';;}
             }else if( welfareStatus===5){
               list[a].welfareStatus='已过期';
               list[a].authentiCationFailure='';
             }
             let isPublishContact=list[a].isPublishContact;
             if(isPublishContact===1){
               list[a].isPublishContact='公开';
             }else{list[a].isPublishContact='隐藏';}
            }
        //    1发布中，2隐藏中，3删除,4审核中,5不在有效期
            this.tableData = list;
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
      //判断是否实名和登陆状态
      isAuthenticationM(){
        get_user_info_jurisdiction(this.pathString).then((res) => {
          if(res.isAuthentication===2){
            this.$router.push({ path: this.pathString });
          }else{
            this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能发布信息！</strong>', '用户信息不完善', {
              dangerouslyUseHTMLString: true
            });
            this.$router.push({ path: '/home/myAccount' });
          }
        });
      },

    }
  }
</script>
<style>

</style>
