<template>
  <div class="mrpbody">
    <!-- 筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="市场城区"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange"
          >
        </el-cascader>
      </el-form-item>
      <!--先把商品名根据条件和城市筛选出来-->

      <el-form-item label="市场名称"  >
        <el-autocomplete
          v-model="releaseWelfare.companyName"
          :fetch-suggestions="querySearchAsyncshichang"
          placeholder="请输入或点击选择市场名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
        <!--<el-button type="primary" @click="dialogFormVisible = true" plain>添加具体类型</el-button>-->
      </el-form-item>
      <!--先把商品名根据条件和城市筛选出来-->
      <el-form-item label="商品名称"  >
        <el-autocomplete
          v-model="releaseWelfare.serviceType"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择商品名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>
      <br>
      <!--默认填充蔬菜-->
      <el-form-item  label="商品类型" prop="releaseType">
        <template>
          <el-radio-group v-model="releaseWelfare.releaseType">
            <el-radio :label="401" >蔬菜出售</el-radio>
            <el-radio :label="405" >粮油出售</el-radio>
            <el-radio :label="406" >调料/副食出售</el-radio>
            <el-radio :label="429" >水产/禽蛋出售</el-radio>
            <el-radio :label="409" >清洁用品</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="get_button">查询</el-button>
      </el-form-item>
      <el-form-item  v-if="isCreate">
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布商品</router-link></el-button>
      </el-form-item>
    </el-form>

    <VmWholesaleCommoditylist :tableData="tableData" class="vm-margin"></VmWholesaleCommoditylist>
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
  import {  wholesaleCommodity_serviceType } from '../../api/api';
  import { regionData } from 'element-china-area-data'
  import { getWholesaleCommodityPublicList } from '../../api/api';
  import VmWholesaleCommoditylist from '../../components/vm-wholesaleCommodity-list';
  import {  getwholesale} from '../../api/api';

  export default {
    props: ["tableDataEnter"],
    components: {
      VmWholesaleCommoditylist
    },
    data() {
      return {
        restaurants: [],//标题下拉
        restaurantsshichang: [],//市场拉
        timeout:  null,

        isCreate:false,
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
          releaseType:401,
          serviceType:'',
          companyName:'',//市场名
        },
      }
    },

    created () {
      this.getRealName();
    },
    methods: {
      //判断是否实名和登陆状态
      isAuthenticationM(){
        this.$router.push({path: '/home/createWholesaleMarket'});
      },

      //获取用户实名信息判断展示哪个城市的信息
      getRealName(){
        if(!this.$fsAuthent()){
          return false;
        };
        let role = window.localStorage.getItem('dian_role');
        if (role === '1' || role === '13') {
          this.isCreate = true; //是否展示发布键
        }
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            let selectedOptions=[];
            selectedOptions[0]=this.realName.provincesId.toString();
            selectedOptions[1]=this.realName.cityId.toString();
            selectedOptions[2]=this.realName.districtCountyId.toString();

            this.releaseWelfare.selectedOptions=selectedOptions;
            this.getmrpList();     //获取列表
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage=currentPage;
        this.getmrpList()
      },
      get_button() {
        this.releaseWelfare.currentPage = 1;
        this.getmrpList();
      },
      getmrpList(){
        getWholesaleCommodityPublicList(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData.tableDatas = res.data.datas;
            this.tableData.releaseType =this.releaseWelfare.releaseType;
          }else {
            this.$msgdeal(res.msg);
          }
        });
      },
      getReleaseTitleList(){
        wholesaleCommodity_serviceType(this.releaseWelfare).then((res) => {
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
              this.$message({
                type: 'error',
                message: '没有找到商品,如果选择了市场名，可以更换一下试试！',
                duration: 1500
              });
            }
          }else {
            this.$msgdeal(res.msg);
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
      },

      //市场下拉
      querySearchAsyncshichang(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        if(this.releaseWelfare.selectedOptions.length===0){
          this.$message.error("请先选择市场所在地")
          return false;
        }
        this.getwholesaleshichang();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurantsshichang);
        }, 3000 * Math.random());
      },


      getwholesaleshichang(){
        let  param= {
          selectedOptions:this.releaseWelfare.selectedOptions,
          companyName:this.releaseWelfare.companyName
        };
        getwholesale(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurantsshichang=releaseTitleList;
            //没有找到用户输入的类型引导添加
            if(this.restaurantsshichang.length===0){
                this.$message({
                  type: 'error',
                  message: '没有找到您输入的:市场名称可以联系客服添加',
                  duration: 1500
                });
            }
          }else {
            this.$msgdeal(res.msg);
          }
        });
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
