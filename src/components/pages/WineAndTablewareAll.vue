<template>
  <div class="mrpbody">
    <!-- 筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="所在城区"  v-if="isSelectedOptions"  >
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="关键字"  >
        <el-autocomplete
          v-model="releaseWelfare.releaseTitle"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击搜索关键字"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getmrpList">查询</el-button>
      </el-form-item>
      <el-form-item  v-if="isCreate">
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布商品</router-link></el-button>
      </el-form-item>
    </el-form>

    <VmWineAndTablewareList :tableData="tableData" class="vm-margin"></VmWineAndTablewareList>
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
  import {  getWineAndTablewareTitleList } from '../../api/api';
  import { get_user_info_sign } from '../../api/api';
  import { regionData } from 'element-china-area-data'
  import { getWineAndTablewarePublicList } from '../../api/api';
  import VmWineAndTablewareList from '../../components/vm-wineAndTableware-list';
  export default {
    props: ["tableDataEnter"],
    components: {
      VmWineAndTablewareList
    },
    data() {
      return {
        isSelectedOptions:false,//是否展示城市

        restaurants: [],//标题下拉
        timeout:  null,

        isCreate:false,
        pathString:'/home/createWineAndTableware',
        StringPath:'/home/wineAndTableware',
        resdata:'',
        options: regionData,//城市
        tableData: {
          tableDatas:[],
          releaseType:'',
        },
        total: 0,
        realName:'',//实名信息
        releaseWelfare: { //查询条件
          selectedOptions: [], //三级联动城市
          releaseTitle:'', //标题
          //分页开始
          currentPage: 1,
          pageSize: 12,//每页显示的数量
          //分页结束
          releaseType:'',
        },
      }
    },

    created () {
      this.tableData.releaseType =this.tableDataEnter;
      this.jurisdiction()
    },
    methods: {
      //判断是否实名和登陆状态
      isAuthenticationM(){
        get_user_info_sign(this.pathString);
      },
      //判断是否登录 获取用户权限，并根据权限判断是否展示按钮
      jurisdiction(){
        checke_isButten(this.StringPath).then((res) => {
          if(res.status===0){
            if(res.data.isAuthentication !==2 ){
              this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能查看信息！</strong>', '用户信息不完善', {
                dangerouslyUseHTMLString: true
              });
              this.$router.push({ path: '/home/myAccount' });
            }else{

              this.isCreate=res.data.isCreate; //是否展示发布键
              this.resdata=res.data.data; //用户信息
              let role=this.resdata.role;
              if(role===1 || role===3){
                this.isSelectedOptions=true;
              }
              this.getRealName();          //获取实名信息,初始化城市
            }}else{isRoleMessage(res.msg);}
        });
      },


      //获取用户实名信息判断展示哪个城市的信息
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            this.releaseWelfare.selectedOptions[0]=this.realName.provincesId;
            this.releaseWelfare.selectedOptions[1]=this.realName.cityId;
            this.releaseWelfare.selectedOptions[2]=this.realName.districtCountyId;
            this.releaseWelfare.releaseType=this.tableDataEnter;
            this.getmrpList();     //获取列表
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage=currentPage;
        this.getmrpList()
      },
      getmrpList(){
        getWineAndTablewarePublicList(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData.tableDatas = res.data.datas;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      getReleaseTitleList(){
        getWineAndTablewareTitleList(this.releaseWelfare).then((res) => {
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
        if(value.length===0){
          this.releaseWelfare.selectedOptions[0]=this.realName.provincesId;
          this.releaseWelfare.selectedOptions[1]=this.realName.cityId;
          this.releaseWelfare.selectedOptions[2]=this.realName.districtCountyId;
        }else{
          this.releaseWelfare.selectedOptions[0]=value[0];
          this.releaseWelfare.selectedOptions[1]=value[1];
          this.releaseWelfare.selectedOptions[2]=value[2];
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
