<template>
  <div class="mrpbody">
    <!-- 零售市场筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="所在城区">
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="关键字">
        <el-autocomplete
          v-model="releaseWelfare.releaseTitle"
          :fetch-suggestions="querySearchAsync1"
          placeholder="请输入或点击搜索标题"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>

      <el-form-item label="商品名称">
        <el-autocomplete
          v-model="releaseWelfare.serviceType"
          :fetch-suggestions="querySearchAsync2"
          placeholder="请输入或点击选择商品名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_button">查询</el-button>
      </el-form-item>
      <el-form-item v-if="isCreate">
        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM"
            to="" class="a">发布信息
          </router-link>
        </el-button>
      </el-form-item>
    </el-form>

    <VmFoodAndGrainList :tableData="tableData" class="vm-margin"></VmFoodAndGrainList>
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
  import {getRealName} from '../../api/api';
  import {isRoleMessage} from '../../api/api';
  import {getFoodAndGrainTitleList} from '../../api/api';
  import {regionData} from 'element-china-area-data'
  import {getFoodAndGrainPublicList} from '../../api/api';
  import VmFoodAndGrainList from '../../components/vm-foodAndGrain-list';

  export default {
    props: ["tableDataEnter"],
    components: {
      VmFoodAndGrainList
    },
    data() {
      return {
        restaurantsreleaseTitle: [],//标题下拉
        restaurantsserviceType: [],//标题下拉
        timeout: null,

        isCreate: false,
        options: regionData,//城市
        tableData: {
          tableDatas: [],
          releaseType: '',
        },
        total: 0,
        realName: '',//实名信息
        releaseWelfare: { //查询条件
          selectedOptions: [], //三级联动城市
          serviceType: '',//维修项目，设备名称
          releaseTitle: '', //标题
          //分页开始
          currentPage: 1,
          pageSize: 12,//每页显示的数量
          //分页结束
          releaseType: '',
          type: '', //1查询标题，2查询商品名
        },
      }
    },

    created() {
      this.tableData.releaseType = this.tableDataEnter;
      this.jurisdiction()
    },
    methods: {
      //判断是否实名和登陆状态
      isAuthenticationM() {
        this.$router.push({path: '/home/createFoodAndGrain'});
      },
      //判断是否登录 获取用户权限，并根据权限判断是否展示按钮
      jurisdiction() {
        if(!this.$fsAuthent()){
          return false;
        };
        let role = window.localStorage.getItem('dian_role');
        if (role === '1' || role === '4') {
          this.isCreate = true; //是否展示发布键
        }
        this.getRealName();          //获取实名信息,初始化城市
      },


      //获取用户实名信息判断展示哪个城市的信息
      getRealName() {
        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.realName = res.data;
            let selectedOptions = [];
            selectedOptions[0] = this.realName.provincesId.toString();
            selectedOptions[1] = this.realName.cityId.toString();
            selectedOptions[2] =  this.realName.districtCountyId.toString();
            this.releaseWelfare.selectedOptions =selectedOptions;
            this.releaseWelfare.releaseType = this.tableDataEnter;
            this.getmrpList();     //获取列表
          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage = currentPage;
        this.getmrpList()
      },
      get_button() {
        this.releaseWelfare.currentPage = 1;
        this.getmrpList();
      },
      getmrpList() {
        if(!this.$fsAuthent()){
          return false;
        };
        getFoodAndGrainPublicList(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            this.tableData.tableDatas = res.data.datas;
          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },
      getReleaseTitleList(type) {
        this.releaseWelfare.type = type;
        getFoodAndGrainTitleList(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            let list = res.data;
            let releaseTitleList = [];
            for (let i = 0; i < list.length; i++) {
              let releaseTitle = {"value": list[i], "address": list[i]};
              releaseTitleList = releaseTitleList.concat(releaseTitle);
            }
            if (type === 1) {
              this.restaurantsreleaseTitle = releaseTitleList;
            } else if (type === 2) {
              this.restaurantsserviceType = releaseTitleList;
            }

          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },
      //下拉
      querySearchAsync1(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        this.getReleaseTitleList(1);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurantsreleaseTitle);
        }, 3000 * Math.random());
      },
      //下拉
      querySearchAsync2(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        this.getReleaseTitleList(2);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurantsserviceType);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //城市组件
      handleChange(value) {
      },
    }
  }
</script>


<style>
  .mrpbody {
    padding: 3px 10px 3px 10px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
  }
</style>
