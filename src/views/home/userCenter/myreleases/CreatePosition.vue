<template>
  <div class="vm-image-list">
    <!--我的发布 已发布过的职位  c查询框开始-->
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
        <el-button type="primary" @click="get_position_list">查询</el-button>

        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM()"
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
          <el-button @click="handleClick(scope.row)" type="text" size="small"  v-if="scope.row.isDisplaySee">查看</el-button>
          <el-button @click="submitForm(scope.row, 1)" type="text" size="small" v-if="scope.row.isDisplayRefresh"  v-loading.fullscreen.lock="fullscreenLoading" >刷新</el-button>
          <el-button @click="submitForm(scope.row, 2)" type="text" size="small" v-if="scope.row.isDisplayDelay" >延期</el-button>
          <el-button @click="submitForm(scope.row, 3)" type="text" size="small"  v-if="scope.row.isDisplayHide">隐藏</el-button>
          <el-button @click="submitForm(scope.row, 4)" type="text" size="small"  v-if="scope.row.isDisplayRelease" >发布</el-button>
          <el-button @click="open(scope.row, 5)" type="text" size="small"  v-if="scope.row.isDisplayDelete"   >删除</el-button>
          <!-- 只有失败的才显示 编辑键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small"   v-if="scope.row.isDisplayEdit" >编辑</el-button>
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

      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span>职位类型 : {{tableDataNo.position }}</span><br>
      <span>联系方式 : {{tableDataNo.contact }}</span><br>
      <span>城区 : {{tableDataNo.detailed }}</span><br>
      <span>地址详情 : {{tableDataNo.workingAddress }}</span><br>

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
      <span>是否公开手机 : {{tableDataNo.isPublishContact }}</span><br>


      <span>职位状态 : {{tableDataNo.welfareStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>创建时间 : {{tableDataNo.createTime }}</span><br>
      <span>刷新时间 : {{tableDataNo.updateTime }}</span><br>
      <span>失效时间 : {{tableDataNo.termOfValidity }}</span><br>


      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->
    <!--编辑弹窗开始-->

   <!--邮箱，公开电话，职位描述，工作地址，四个框-->
    <el-dialog title="修改招聘信息" :visible.sync="dialogFormVisible">
      <el-form :model="tableDataNo" :rules="rules" ref="form"  >

        <!-- placeholder="如：具体工作范围，或者具体年龄等不超过100字"-->
        <el-form-item label="职位描述" prop="describeOne" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="tableDataNo.describeOne"
            :placeholder="tableDataNo.describeOne"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-form-item label="工作地址" prop="workingAddress" :label-width="formLabelWidth">
          <el-input v-model="tableDataNo.workingAddress" :placeholder="tableDataNo.workingAddress"></el-input>
        </el-form-item>

        <el-form-item label="公开电话" prop="isPublishContact"  :label-width="formLabelWidth" >
          <el-radio-group v-model="tableDataNo.isPublishContact"  :placeholder="tableDataNo.isPublishContact"  >
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">不公开</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="邮箱" :label-width="formLabelWidth"  prop="email"  >
          <el-input v-model="tableDataNo.email" autocomplete="off" :placeholder="tableDataNo.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click=" submitFormEdit('form')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑弹窗结束-->

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
  import {  position_operation } from '../../../../api/api';
  import { get_position } from '../../../../api/api';
  import { get_user_info } from '../../../../api/api';

  import { get_position_list } from '../../../../api/api';
  import { isRoleMessage } from '../../../../api/api';

  export default {
    data() {
      return {
        fullscreenLoading:false,
        pathString:'/home/releaseWelfare',
        //分页开始
        total: 0,

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

          currentPage: 1,
          infoList: [],
          movieInfoList: [],
          pageSize: 20,//每页显示的数量
          StringPath:'/home/recruitWorkers'
        },
        dataInline: {
          type: Object
        },
        tableData:[], //全部数据
        tableDataNo:'', //某一个数据
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //编辑弹窗
        formLabelWidth: '120px',
        form:{

        },
        rules: {
          workingAddress: [
            {  required: true, message: '工作地址不能为空', trigger: 'change' },
            { min: 1, max: 100, message: '地址不能超过100个字', trigger: 'blur' }
          ],
          describeOne:[
            {  required: true, message: '职位描述不能为空', trigger: 'change' },
            { min: 1, max: 100, message: '职位描述不能超过100个字', trigger: 'blur' }
          ],
          isPublishContact: [
            { required: true, message: '请勾选是否公开电话', trigger: 'blur' }
          ],},
        //下边没有用到


      }
    },
    created () {
      this.loadAll();
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


      //编辑Edit
      examineClick(row){
        this.tableDataNo=row;
        if(this.tableDataNo.isPublishContact=== '公开'){
          this.tableDataNo.isPublishContact=1;
        }else{
          this.tableDataNo.isPublishContact=2;
        }
        this.dialogFormVisible = true;
      },
      submitFormEdit(form){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data={};
            data.type=6;
            data.userId= this.tableDataNo.userId;
            data.id=this.tableDataNo.id;
            data.workingAddress=this.tableDataNo.workingAddress;
            data.describeOne=this.tableDataNo.describeOne;
            data.isPublishContact=this.tableDataNo.isPublishContact;
            data.email=this.tableDataNo.email;
            position_operation(data).then(res => {
              this.fullscreenLoading=false;
              let msg=res.msg;
              this.fullscreenLoading=false;
              if (res && res.status === 0) {
                this.$message.success(msg);
                this.dialogFormVisible = false;
                this.get_position_list(); //刷新列表
              }  else {
                isRoleMessage(msg);
              }
            });
          } else { return false; }
        });



      },
      //操作
      submitForm(form,type) {
        this.fullscreenLoading=true;
        let data={};
        data.type=type;
        data.userId= form.userId;
        data.id=form.id;
        if(type===1 || type===2 || type===3|| type===4 || type===5){
          position_operation(data).then(data => {
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
  get_position_list(){
    get_position_list(this.releaseWelfare).then((res) => {

      if(res.status===0) {
        this.total = res.data.totalno; //总条数
        this.tableData = res.data.datas;
      }else{
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
      //判断是否实名和登陆状态
      isAuthenticationM(){
        get_user_info().then((res) => {
          console.log(res)
          if(res.status===0){
          if(JSON.parse(res.data).isAuthentication===2){
            this.$router.push({ path: this.pathString });
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

    }
  }
</script>
<style>

</style>
