<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="送货城区" placeholder="请选职位城区">
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
  import {isRoleMessage} from '../../../api/api';
  import {regionData} from 'element-china-area-data'

  export default {
    components: {},
    data() {
      return {
        options: regionData,//城市
        total: 0,
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
      // this.islogin()
    },
    methods: {

      //判断是否登录 获取用户权限
      peceiptGetPendingOrders() {
        console.log(this.params);
        peceiptGetPendingOrders(this.params).then((res) => {
          console.log(res.data.datas.length);
          if (res.status === 0) {
            if (res.msg === 'YES' && res.data.datas.length > 0) {
              this.initList(1);
            } else {
              this.beforeDestroy();
            }
          } else {
            isRoleMessage(res.msg);
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

      //订单状态轮询开始
      initList(num) {
        if (num === null || num === '' || num === undefined) {
          num = 2;
        }
        this.beforeDestroy();
        this.myInterval = window.setInterval(() => {
          setTimeout(() => {
            this.peceiptGetPendingOrders() //调用接口的方法
          }, 1)
        }, num * 1000 * 60);
      },

      //订单状态轮询关闭
      beforeDestroy() {
        clearInterval(this.myInterval);
        this.myInterval = null;
      },
    }

  }
</script>


<style>
</style>
