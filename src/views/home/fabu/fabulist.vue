<template>
  <div class="mrpbody">
    <!-- 筛选区 -->
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

      <el-form-item label="商品名称" v-if="tableDataEnter!==13 && tableDataEnter!==17 && tableDataEnter!==19 &&
      tableDataEnter!==14 && tableDataEnter!==15">
        <el-autocomplete
          v-model="releaseWelfare.serviceType"
          :fetch-suggestions="querySearchAsync2"
          placeholder="请输入或点击选择商品名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>


      <span v-if="tableDataEnter===14 || tableDataEnter===15">
        <br>
      <el-form-item label="面积大于">
        <el-input v-model.number="releaseWelfare.fouseSizeGreater" placeholder="只能是1-10000之间的整数" clearable></el-input>
      </el-form-item>
      <el-form-item label="面积小于">
        <el-input v-model.number="releaseWelfare.fouseSizeLess" placeholder="只能是1-10000之间的整数" clearable></el-input>
      </el-form-item>
       </span>


      <el-form-item label="类型" v-if="tableDataEnter===101 || tableDataEnter===102 ||
               tableDataEnter===103 || tableDataEnter===104">
        <template>
          <el-radio-group v-model="releaseWelfare.releaseType">
            <el-radio :label="101">工服</el-radio>
            <el-radio :label="102">百货</el-radio>
            <el-radio :label="103">绿植</el-radio>
            <el-radio :label="104">装饰用品</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="get_button">查询</el-button>
      </el-form-item>


      <el-form-item v-if="isCreate">
        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM"
            to="" class="a">{{createName}}
          </router-link>
        </el-button>
      </el-form-item>
    </el-form>

    <VmEquipmentList :tableData="tableData" class="vm-margin"></VmEquipmentList>
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

  import {getfabutiao} from '../../../api/api';
  import {regionData} from 'element-china-area-data'
  import {getfabulist} from '../../../api/api';
  import VmEquipmentList from '../../../components/vm-equipment-list';

  export default {
    props: ["tableDataEnter"],
    components: {
      VmEquipmentList
    },
    data() {
      return {
        restaurantsreleaseTitle: [],//标题下拉
        restaurantsserviceType: [],//标题下拉
        timeout: null,
        isCreate: false,
        createName: '',
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
          fouseSizeGreater: '',
          fouseSizeLess: '',//面积小于
        },
      }
    },

    created() {
      this.tableData.releaseType = this.tableDataEnter;
      this.getRealName();
    },
    methods: {
      //判断是否实名和登陆状态
      isAuthenticationM() {
        if (this.tableDataEnter !== 14 && this.tableDataEnter !== 15 && this.tableDataEnter !== 13 &&
          this.tableDataEnter !== 17 && this.tableDataEnter !== 19) {
          this.$router.push('/home/crinformation/' + this.tableDataEnter);
        } else {
          this.$router.push('/home/crzuAndmie/' + this.tableDataEnter);  //带参数
        }
      },
      //获取用户实名信息判断展示哪个城市的信息
      getRealName() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (this.tableDataEnter === 15) {
          if (role === '1' || role === '4' || role === '13' || role === '6' || role === '5' || role === '12') {
            this.isCreate = true; //是否展示发布键
            this.createName = '发布摊位出租信息';
          }
        } else if (this.releaseWelfare.releaseType === 14) {  //店面窗口
          if (role === '1' || role === '2' || role === '6' || role === '3') {
            this.isCreate = true; //是否展示发布键
            this.createName = '发布店面窗口出租信息';
          }
        } else if (this.tableDataEnter === 33 || this.tableDataEnter === 34 || this.tableDataEnter === 18) {
          if (role !== '1' || role !== '3') {
            this.isCreate = true; //是否展示发布键
            if (this.tableDataEnter === 33) {
              this.createName = '发布电器/设备出售信息';
            } else if (this.tableDataEnter === 34) {
              this.createName = '发布二手电器/设备出售信息';
            } else if (this.tableDataEnter === 18) {
              this.createName = '发布电器/设备维修信息';
            }
          }
        } else if (this.tableDataEnter === 4 || this.tableDataEnter === 5 || this.tableDataEnter === 6
          || this.tableDataEnter === 29 || this.tableDataEnter === 9 || this.tableDataEnter === 11) {
          if (role === '1' || role === '4') {
            this.isCreate = true; //是否展示发布键
            if (this.tableDataEnter === 4) {
              this.createName = '发布蔬菜出售信息';
            } else if (this.tableDataEnter === 5) {
              this.createName = '发布粮油出售信息';
            } else if (this.tableDataEnter === 6) {
              this.createName = '发布调料/副食出售信息';
            } else if (this.tableDataEnter === 29) {
              this.createName = '发布水产/禽蛋出售信息';
            } else if (this.tableDataEnter === 6) {
              this.createName = '发布调料/副食出售信息';
            } else if (this.tableDataEnter === 9) {
              this.createName = '发布清洁用品出售信息';
            } else if (this.tableDataEnter === 11) {
              this.createName = '发布桌椅餐具出售信息';
            }
          }
        } else if (this.tableDataEnter === 101) {
          if (role !== '1' || role !== '12') {
            this.isCreate = true; //是否展示发布键
            this.createName = '发布工服/百货出售信息';
          }
        } else if (this.tableDataEnter === 7 || this.tableDataEnter === 8) {
          if (role !== '1' || role !== '5') {
            this.isCreate = true; //是否展示发布键
            if (this.tableDataEnter === 7) {
              this.createName = '发布酒水/饮料出售信息';
            } else if (this.tableDataEnter === 8) {
              this.createName = '发布消毒餐具出售信息';
            }
          }
        } else if (this.tableDataEnter === 13 || this.tableDataEnter === 17 || this.tableDataEnter === 19) {
          if (role !== '1' || role !== '7') {
            this.isCreate = true; //是否展示发布键
            if (this.tableDataEnter === 13) {
              this.createName = '发布菜谱/广告制作信息';
            } else if (this.tableDataEnter === 17) {
              this.createName = '发布装修服务信息';
            } else if (this.tableDataEnter === 19) {
              this.createName = '发布灭虫服务信息';
            }
          }
        }

        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.realName = res.data;
            let selectedOptions = [];
            selectedOptions[0] = this.realName.provincesId.toString();
            selectedOptions[1] = this.realName.cityId.toString();
            selectedOptions[2] = this.realName.districtCountyId.toString();
            this.releaseWelfare.selectedOptions = selectedOptions;
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
        getfabulist(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            this.tableData.tableDatas = res.data.datas;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      getReleaseTitleList(type) {
        this.releaseWelfare.type = type;
        getfabutiao(this.releaseWelfare).then((res) => {
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
