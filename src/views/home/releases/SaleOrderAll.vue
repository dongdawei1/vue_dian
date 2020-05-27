<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="送货城区" placeholder="请选城区">
        <el-cascader
          size="large"
          :options="options"
          v-model="params.selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="送货日期">
        <el-date-picker type="date"
                        :clearable="false"
                        placeholder="选择日期"
                        v-model="params.giveTakeTime"
                        value-format="yyyy-MM-dd"
                        style="width: 80%;">

        </el-date-picker>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="peceiptGetPendingOrders">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表开始 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="addressDetailed"
        label="送货地址"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
      prop="giveTakeTime"
      label="送货时间"
      width="180">
    </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <!--有人报价可以选择关单-->
        <el-button @click="" type="text" size="small"
                   v-if="isReceipt" disabled>请到APP中接单
        </el-button>
        <el-button @click="" type="text" size="small"
                   v-if="!isReceipt"  disabled> 接单用户可查看
        </el-button>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->


    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="params.currentPage"
      :page-size="params.pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {peceiptGetPendingOrders} from '../../../api/api';
  import {regionData} from 'element-china-area-data'


  export default {
    components: {},
    data() {
      return {
        isReceipt:true,//是否显示接单按钮
        options: regionData,//城市
        total: 0,
        tableData:[],
        myInterval: '',
        params: {
          currentPage: 1,
          pageSize: 20,
          releaseType: '',
          selectedOptions: [],
          giveTakeTime: '',
        },
      }
    },

    created() {
      this.peceiptGetPendingOrders()
    },
    methods: {

      //判断是否登录 获取用户权限
      peceiptGetPendingOrders() {
        peceiptGetPendingOrders(this.params).then((res) => {
          if (res.status === 0) {
            if (res.msg === 'YES' && res.data.datas !== null) {
              this.tableData=res.data.datas;
            } else if (res.msg === 'YES') {
              this.tableData=[];
            } else {
              this.tableData=[];
              this.isReceipt=false;
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },

      handleCurrentChange(currentPage) {
        this.params.currentPage = currentPage;
        this.peceiptGetPendingOrders()
      },


      //城市组件
      handleChange(value) {
      },




    },
    watch: {
      "$route"(to, from) {
        if (to.path === '/home/release') {
          this.peceiptGetPendingOrders();

        }
      }
    }
  }
</script>


<style>
</style>
