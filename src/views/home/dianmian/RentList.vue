<template>
  <div class="mrpbody">
    <!-- 出租 店面窗口  筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="出租城区">
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-autocomplete
          v-model="releaseWelfare.serviceDetailed"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择类型"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>
      <br>
      <el-form-item label="面积大于">
        <el-input v-model.number="releaseWelfare.fouseSizeGreater" placeholder="只能是1-10000之间的整数" clearable></el-input>
      </el-form-item>
      <el-form-item label="面积小于">
        <el-input v-model.number="releaseWelfare.fouseSizeLess" placeholder="只能是1-10000之间的整数" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_button">查询</el-button>
      </el-form-item>
      <el-form-item v-if="isCreate">
        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM"
            to="" class="a">发布出租/转让信息
          </router-link>
        </el-button>
      </el-form-item>
    </el-form>

    <VmRentList :tableData="tableData" class="vm-margin"></VmRentList>
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
  import {getRealName} from '../../../api/api';
  import {regionData} from 'element-china-area-data'
  import {getServiceDetailedList} from '../../../api/api';
  import {getrentList} from '../../../api/api';

  import VmRentList from '../../../components/vm-rent-list';

  export default {
    props: ["tableDataEnter"],
    components: {
      VmRentList
    },
    data() {
      var fouseSizeGreater = (rule, value, callback) => {
        setTimeout(() => {
          if (value !== '') {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (this.releaseWelfare.fouseSizeLess !== '') {
                if (value > this.releaseWelfare.fouseSizeLess) {
                  callback(new Error('不能大于后边的面积'));
                }
              }
              callback();
            }
          }
          callback();
        }, 10);
      };
      var fouseSizeLess = (rule, value, callback) => {
        setTimeout(() => {
          if (value !== '') {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (this.releaseWelfare.fouseSizeGreater !== '') {
                if (value < this.releaseWelfare.fouseSizeGreater) {
                  callback(new Error('不能小于前边的面积'));
                }
              }
              callback();
            }
          }
          callback();
        }, 10);
      };
      return {
        restaurants: [],//标题下拉
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
          serviceDetailed: '',//地址详情
          releaseTitle: '', //标题
          fouseSizeGreater: '',
          fouseSizeLess: '',//面积小于
          //分页开始
          currentPage: 1,
          pageSize: 12,//每页显示的数量
          //分页结束
          releaseType: '',
        },

      }
    },

    created() {
      this.tableData.releaseType = this.tableDataEnter.releaseType;
      this.jurisdiction()
    },
    methods: {
      checkoutNum() {
        let fouseSizeLess = this.releaseWelfare.fouseSizeLess;
        let fouseSizeGreater = this.releaseWelfare.fouseSizeGreater;
        if (fouseSizeLess !== '') {
          if (!Number.isInteger(fouseSizeLess)) {
            this.$message.error({
              showClose: true,
              message: '面积小于: 必须是数字',
              type: 'warning',
              duration: 1800
            });
            return false;
          }
        }
        if (fouseSizeGreater !== '') {
          if (!Number.isInteger(fouseSizeGreater)) {
            this.$message.error({
              showClose: true,
              message: '面积大于: 必须是数字',
              type: 'warning',
              duration: 1800
            });
            return false;
          }
        }

        if (fouseSizeGreater !== '' && fouseSizeLess !== '') {
          if (fouseSizeGreater > fouseSizeLess) {
            this.$message.error({
              showClose: true,
              message: '面积大于  不能大于  面积小于',
              type: 'warning',
              duration: 1800
            });
            return false;
          }
        }
        return true;
      },

      //判断是否实名和登陆状态
      isAuthenticationM() {
        if (this.tableDataEnter.releaseType === 14) {
          this.$router.push({path: '/home/createLease'});
        } else {
          this.$router.push({path: '/home/createRentalBooth'});
        }
      },
      //判断是否登录 获取用户权限，并根据权限判断是否展示按钮
      jurisdiction() {
        this.releaseWelfare.releaseType = this.tableDataEnter.releaseType;
        if(!this.$fsAuthent()){
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (this.releaseWelfare.releaseType === 15) {
          if (role === '1' || role === '4' || role === '13' || role === '6' || role === '5'  || role === '12') {
            this.isCreate = true; //是否展示发布键
          }
        } else if (this.releaseWelfare.releaseType === 14) {  //店面窗口
          if (role === '1' || role === '2' || role === '6' || role === '3') {
            this.isCreate = true; //是否展示发布键
          }
        }
        this.getRealName();
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
            this.getrent_List();     //获取列表
          }else{
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage = currentPage;
        this.getrent_List()
      },


      get_button() {
        this.releaseWelfare.currentPage = 1;
        this.getrent_List();
      },


      getrent_List() {
        let bl = this.checkoutNum();
        if (bl === false) {
          return false;
        }
        if(!this.$fsAuthent()){
          return false;
        }
        getrentList(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            this.tableData.tableDatas = res.data.datas;
          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },
      getReleaseTitleList() {
        let bl = this.checkoutNum();
        if (bl === false) {
          return false;
        }
        if(!this.$fsAuthent()){
          return false;
        }
        getServiceDetailedList(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            let list = res.data;
            let releaseTitleList = [];
            for (let i = 0; i < list.length; i++) {
              let releaseTitle = {"value": list[i], "address": list[i]};
              releaseTitleList = releaseTitleList.concat(releaseTitle);
            }
            this.restaurants = releaseTitleList;
          } else {
            this.$msgdeal(res.msg);
            return false;
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
