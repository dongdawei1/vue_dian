<template>

  <div class="vm-image-list">
    <!--我的发布 已发布过的装修等  c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="发布日期">
        <el-date-picker type="date"
                        :clearable="false"
                        placeholder="选择日期"
                        v-model="releaseWelfare.giveTakeTime"
                        value-format="yyyy-MM-dd"
                        style="width: 80%;">

        </el-date-picker>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="releaseWelfare.orderStatus"  placeholder="请选择状态">
          <el-option label="送货中" value="2"></el-option>
          <el-option label="已完成" value="3"></el-option>
          <el-option label="全部" value="9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_position_listselect"
                   v-loading.fullscreen.lock="fullscreenLoading"
        >查询</el-button>
        <el-button type="test" disabled>
          抢单中的请去app中查看
        </el-button>
      </el-form-item>
    </el-form>
    <!--c查询框结束-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>
            <div class="fromDataTitleClass">
              商品信息
            </div>
            <span v-for="(p, index) in  JSON.parse(props.row.commoditySnapshot)" :key="index">
                             <div class="forFromData">
                 {{p.serviceType}}&nbsp;
                               采购数量:{{p.number}}&nbsp;{{p.specifiName}}&nbsp;

                       <span v-if="p.specifi_cations!=='--'">包装规格:{{p.specifi_cations}}&nbsp;</span>
                      <span v-if="p.remarks!==''&& p.remarks!== null">备注:{{p.remarks}}&nbsp;</span>
                    </div>&nbsp;&nbsp;
              </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="订单ID"

        prop="id"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="订单类型"

        prop="paymentTime"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="收货时间"
        prop="collectTime"

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="订单状态"

        prop="guanShanReason"
        show-overflow-tooltip>
      </el-table-column>


      <el-table-column
        label="订单总额"
        prop="guanShanTime"

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="应收金额"
        prop="balanceMoney"

        show-overflow-tooltip>
      </el-table-column>

    </el-table>


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
  import {isRoleMessage} from '../../../api/api';
  import {mySaleOrder} from '../../../api/api';


  export default {
    data() {
      return {
        fullscreenLoading:false,
        //分页开始
        total: 0,
        //分页结束
        releaseWelfare: { //查询条件
          orderStatus:'2',
          releaseType: '', //服务类型
          giveTakeTime: '',//送货时间
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData: [], //全部数据
        formLabelWidth: '120px',
      }
    },
    created() {
      this.get_myPurchase_Order();
    },
    methods: {
      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.releaseWelfare.currentPage = currentPage;
        this.get_myPurchase_Order();

      },
      get_position_listselect() {
        this.releaseWelfare.currentPage = 1;
        this.get_myPurchase_Order();
      },
      get_myPurchase_Order() {
        this.fullscreenLoading=true;
        mySaleOrder(this.releaseWelfare).then((res) => {
          this.fullscreenLoading=false;
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          } else {
            isRoleMessage(res.msg);
          }
        });
      },

      isAuthenticationM() {
        this.$router.push({path: '/home/purchaseCreateOrder'});
      },

    }
  }
</script>
<style>
  .fromDataTitleClass {
    font-size: 16px;
    color: #6F6B6E;
  }

  .forFromData {
    background: #F4FBFD;
    display: inline
  }
</style>
