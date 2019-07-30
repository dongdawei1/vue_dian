<template>
  <div class="mrpbody">
    <!-- 筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="服务城区"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="服务类型"  >
        <el-autocomplete
          v-model="releaseWelfare.releaseTitle"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择职位"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getmrpList">查询</el-button>
      </el-form-item>
      <el-form-item  v-if="isCreate">
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布服务</router-link></el-button>
      </el-form-item>
    </el-form>

    <VmRpList :tableData="tableData" class="vm-margin"></VmRpList>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="releaseWelfare.currentPage"
      :page-size="releaseWelfare.pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>

  </div>
</template>


<script>
  import { getRealName } from '../../api/api';
  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  import {  getReleaseTitleList } from '../../api/api';
  import { get_user_info_sign } from '../../api/api';
  import { regionData } from 'element-china-area-data'
  import { getmrpList } from '../../api/api';
  import VmRpList from '../../components/vm-mrp-list';
  export default {
    components: {
      VmRpList
    },
    data() {
      return {
        restaurants: [],//标题下拉
        timeout:  null,

        isCreate:false,
        pathString:'/home/createMAndRAndP',
        resdata:'',
        options: regionData,//城市
        tableData: [],
        total: 0,
        realName:'',//实名信息
        releaseWelfare: { //查询条件
          selectedOptions: [], //三级联动城市
          provincesId:'',//省id
          cityId:'',
          districtCountyId:'',
          releaseTitle:'', //标题
          //分页开始
          currentPage: 1,
          pageSize: 12,//每页显示的数量
          //分页结束
          StringPath: '/home/pestControl',
          releaseType:19
        },
      }
    },

    created () {
      this.jurisdiction()
    },
    methods: {
      //判断是否实名和登陆状态
      isAuthenticationM(){
        get_user_info_sign(this.pathString);
      },
      //判断是否登录 获取用户权限，并根据权限判断是否展示按钮
      jurisdiction(){
        checke_isButten(this.releaseWelfare.StringPath).then((res) => {
          if(res.status===0){
            if(res.data.isAuthentication !==2 ){
              this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能查看信息！</strong>', '用户信息不完善', {
                dangerouslyUseHTMLString: true
              });
              this.$router.push({ path: '/home/myAccount' });
            }else{
              this.isCreate=res.data.isCreate; //是否展示发布键
              this.resdata=res.data.data; //用户信息
              this.getRealName();          //获取实名信息,初始化城市
            }}else{isRoleMessage(res.msg);}
        });
      },


      //获取用户实名信息判断展示哪个城市的信息
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            this.releaseWelfare.provincesId=this.realName.provincesId;
            this.releaseWelfare.cityId=this.realName.cityId;
            this.releaseWelfare.districtCountyId=this.realName.districtCountyId;
            this.getmrpList();     //获取列表
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage=currentPage;
        this.getmrpList()
      },
      getmrpList(){
        getmrpList(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      getReleaseTitleList(){
        getReleaseTitleList(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
          for(let i=0;i<list.length;i++){
           let  releaseTitle={ "value":list[i] , "address": list[i]};
            releaseTitleList=releaseTitleList.concat(releaseTitle);
          }
            this.restaurants=releaseTitleList;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
    //下拉
      querySearchAsync(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        this.getReleaseTitleList();
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
      //城市组件
      handleChange (value) {
        if(value.length>0){
        this.releaseWelfare.provincesId=value[0];
        this.releaseWelfare.cityId=value[1];
        this.releaseWelfare.districtCountyId=value[2];}else{
          this.releaseWelfare.provincesId=this.realName.provincesId;
          this.releaseWelfare.cityId=this.realName.cityId;
          this.releaseWelfare.districtCountyId=this.realName.districtCountyId;
        }
      },
    }
  }
</script>


<style >
  .mrpbody{
    padding:3px 10px 3px 10px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
  }
</style>
