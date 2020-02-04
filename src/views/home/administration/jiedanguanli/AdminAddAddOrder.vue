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

      <el-form-item  label="通知状态" >
        <template>
          <el-radio-group v-model="realName.isReceipt" >
            <el-radio label="6" >审核不通过</el-radio>
            <el-radio label="4" >已通知</el-radio>
          </el-radio-group>
        </template>
      </el-form-item> <br>

      <el-form-item label="签约城市"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="realName.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
      </el-form-item>


      <el-form-item label="签约地点"   >
        <el-autocomplete
          v-model="realName.addressDetailed"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择签约地点"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>

      <el-form-item label="签约时间">
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
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small" v-if="scope.row.istongzhi">重新审核</el-button>
          <el-button @click="handleClick(scope.row.id)" type="text" size="small" v-if="scope.row.isbianji">去签约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->


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
  import { isRoleMessage } from '../../../../api/api';
  import { admin_select_signingOrder } from '../../../../api/api';
  import { getAccurateressDetailed } from '../../../../api/api';

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
          isReceipt:'4',
          addressDetailed:''
        },

        tableData:[], //全部数据
        tableDataNo:'', //某一个审批

      }
    },
    created () {
      this.getReleaseWelfareAll();
    },

    methods: {
      handleClick(id) {  //点击查看详细
        this.$router.push('/home/adminAddjiedan/'+id);  //带参数页面跳转  name:'editMAndRAndP',
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
        admin_select_signingOrder(this.realName).then((res) => {
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
        if(this.realName.selectedOptions.length===0){
          this.$message.error("请先选择签约城市");
          return false;
        }
        this.getAccurateressDetailed();
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
      getAccurateressDetailed(){
        let param={
          addressDetailed:this.realName.addressDetailed,
          selectedOptions:this.realName.selectedOptions,
        };
        getAccurateressDetailed(param).then((res) => {
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
              this.$message.error("该城市下没有签约地点！");
            }
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
    },
    watch: {
      "$route"(to,from){
        if(to.path==='/home/businessEnquiry'){
          this.getReleaseWelfareAllSelect();
        }
      }


    }
  }
</script>
<style>

</style>
