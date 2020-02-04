<template>
  <div class="vm-image-list">
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">


      <el-form-item label="用户名">
        <el-input v-model="realName.userName" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="realName.contact" placeholder="手机号" clearable></el-input>
      </el-form-item> <br>

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

      <el-form-item  label="通知状态" >
        <template>
          <el-radio-group v-model="realName.isReceipt" >
            <el-radio label="3" >待通知</el-radio>
            <el-radio label="4" >已通知</el-radio>
          </el-radio-group>
        </template>
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
        prop="companyName"
        label="企业名称"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="isReceipt"
        label="通知状态"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="detailed"
        label="所在城区"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>



      <el-table-column
        prop="addReceiptTime"
        label="申请时间"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="consigneeName"
        label="联系人"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系电话"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="userName"
        label="用户名"
        width="90"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="addressDetailed"
        label="地址详情"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="qianyueTime"
        label="预约签约时间"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="qianyueDetailed"
        label="预约签约地址"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.istongzhi">查看电话通知</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.isbianji">更改签约时间</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->



    <!--通知弹窗-->
    <el-dialog
      title="审核详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span>联系方式 : {{tableDataNo.contact }}</span><br>
      <span>用户名 : {{tableDataNo.userName }}</span><br>
      <span>城区 : {{tableDataNo.detailed }}</span>

      <el-form :model="form" :rules="rules" ref="form">
        <br>
        <el-form-item label="通知状态" prop="isReceipt">
          <el-radio-group v-model="form.isReceipt" >
            <el-radio label="4">通知成功</el-radio>
            <el-radio label="5">用户放弃</el-radio>
          </el-radio-group>
        </el-form-item>
        注 ：通知成功必须选择签约时间和签约地点<br>

        <el-form-item label="签约时间"   >
          <el-date-picker
            v-model="form.value1"
            type="date"
            placeholder="选择签约时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="签约地点"   >
          <el-autocomplete
            v-model="form.addressDetailed"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入或点击选择签约地点"
            clearable></el-autocomplete>
          <!--@select="handleSelect"-->
          <el-button type="primary" @click="dialogFormVisible = true" plain>添加签约地点</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')"  v-loading.fullscreen.lock="fullscreenLoading">已联系完该用户！确认提交</el-button>
      </div>

      <!--添加 线下签约地址  开始-->
      <div v-if="dialogFormVisible">
        ————————————————————————————————————<br>
        添加签约地址，和公司接待人员，提交前请和接待人员联系
        <el-form :model="addPeixun" :rules="rules" ref="addPeixun">
          <br>
          <el-form-item label="签约城市"  >
            <el-input v-model="addPeixun.detailed" :disabled="true" autocomplete="off" :placeholder="tableDataNo.detailed"></el-input>
          </el-form-item>
          <el-form-item label="签约地址" prop="addressDetailed" >
            <el-input v-model="addPeixun.addressDetailed" placeholder="签约地址"></el-input>
          </el-form-item>
          <el-form-item label="接待人员"  prop="consigneeName">
            <el-input v-model="addPeixun.consigneeName" placeholder="本公司接待人员姓名"></el-input>
          </el-form-item>
          <el-form-item label="接待电话"   prop="contact">
            <el-input v-model="addPeixun.contact" placeholder="接待人员电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddPeixun('addPeixun')"  v-loading.fullscreen.lock="fullscreenLoading">确认提交并已通知相关人员</el-button>
        </div>
      </div>
      <!--添加 线下签约地址  结束-->

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
  import {  admin_update_addOrder } from '../../../../api/api';
  import { isRoleMessage } from '../../../../api/api';
  import { admin_select_addOrder } from '../../../../api/api';
  import { getAddressDetailed } from '../../../../api/api';
  import { createAddressDetailed } from '../../../../api/api';

  import { regionData } from 'element-china-area-data'
  export default {
    data() {
      return {
        restaurants: [],//标题下拉
        timeout:  null,

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

        form:{
          isReceipt:'',
          addressDetailed:'',
          value1:'',
          id:''
        },

        addPeixun:{ //添加培训地址
          addressDetailed:'',
          detailed:'',
          contact:'',
          consigneeName:''
        },
        addPeixunButren:false,
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
          isReceipt:'3'
        },

        tableData:[], //全部数据
        tableDataNo:'', //某一个审批
        dialogVisible: false,  //查看详情弹窗
        formLabelWidth: '120px',
        rules: {
          isReceipt: [
            { required: true, message: '请选择通知状态', trigger: 'change' }
          ],
          authentiCationFailure: [
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          addressDetailed: [
            { required: true, message: '请输入签约地址' },
            { max: 200, message: '长度小于200字', trigger: 'blur' }
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          consigneeName:[
            { required: true, message: '请输入接待人员', trigger: 'blur' },
          ],
          value1:[
            { required: true, message: '请选择签约时间', trigger: 'blur' },
          ],
        },

        dialogFormVisible:false,//添加签约地址
      }
    },
    created () {
      this.getReleaseWelfareAll();
    },

    methods: {
      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        this.dialogVisible=true;
        if(row.isbianji===true){
        this.form.value1=row.qianyueTime;
        this.form.addressDetailed=row.qianyueDetailed;
        this.form.isReceipt='4';
        }
      },
      handleClose(done) { //关闭查看详情
        this.dialogVisible=false;
      },



      // //提交签约地址
      submitAddPeixun(form) {
        this.$refs['addPeixun'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.addPeixun.detailed=this.tableDataNo.detailed;
            createAddressDetailed(this.addPeixun).then(data => {
              this.fullscreenLoading=false;
              if ( data.status === 0) {
                this.$message.success(data.msg);
                this.dialogFormVisible=false;
                this.form.addressDetailed=this.addPeixun.addressDetailed;
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
      //提交签约通知
      submitForm(form) {

        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            if(this.form.isReceipt==='4'){
              if(this.form.addressDetailed==='' ||this.form.value1===''){
                this.fullscreenLoading=false;
                this.$message.error("请选择签约时间和签约地点");
                return false;
            }}
            this.form.id=this.tableDataNo.id;
            admin_update_addOrder(this.form).then(data => {
              this.fullscreenLoading=false;
              if ( data.status === 0) {
                this.$message.success(data.msg);
                this.dialogVisible=false;
                this.form.id='';
                this.getReleaseWelfareAll();
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
        if(this.realName.value2===null){
          this.realName.value2=[];
        }
        admin_select_addOrder(this.realName).then((res) => {
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
      },


      //下拉
      querySearchAsync(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        this.getAddressDetailed();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurants);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getAddressDetailed(){
        let param={
          addressDetailed:this.form.addressDetailed,
          detailed:this.tableDataNo.detailed,
        };
        getAddressDetailed(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurants=releaseTitleList;
            //没有找到用户输入的类型引导添加
            if(this.restaurants.length===0){
              this.$message.error("该区域线下培训地址查询失败，请手动添加");
              this.form.serviceTypeName=this.ruleForm.serviceType;
              this.ruleForm.serviceType='';
            }
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
    }

  }
</script>
<style>

</style>
