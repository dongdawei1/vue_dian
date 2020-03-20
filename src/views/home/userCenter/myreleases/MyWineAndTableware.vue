<template>
  <div class="vm-image-list">
    <!--我的发布 已发布的电器。查询开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="发布类型"  >
        <el-select v-model="releaseWelfare.releaseType" placeholder="服务类型">
          <el-option label="酒水饮料" value="7"></el-option>
          <el-option label="消毒餐具" value="8"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布状态"  >
        <template>
          <el-select v-model="releaseWelfare.welfareStatus" clearable placeholder="请选择发布状态">
            <el-option
              v-for="item in  welfareStatuss"
              :key="item.label"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_position_listselect">查询</el-button>
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM()"
          to="" class="a" >发布商品</router-link></el-button>
      </el-form-item>
    </el-form>
    <!--c查询框结束-->
    <GongYongFabu    :tableData="tableData"  @positionlist="get_position_listselect"> </GongYongFabu>
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
  import { getmyfabu} from '../../../../api/api';
  import GongYongFabu from '../../../home/userCenter/myreleases/GongYongFabu';
  export default {
    inject: ["reload"],
    components: {
      GongYongFabu
    },
    data() {
      return {
        //分页开始
        total: 0,
        //分页结束
        welfareStatuss:[
          { "value": "发布中", "label": "1" },
          { "value": "隐藏中", "label": "2" },
          { "value": "审核中", "label": "4" },
          {"value": "非有效期", "label": "5"}
        ],//查询条件职位状态
        releaseWelfare: { //查询条件
          releaseType:'7', //服务类型
          welfareStatus:'',//发布状态
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData:[], //全部数据
      }
    },
    created () {
      this.get_position_list();
    },
    methods: {
      handleCurrentChange(currentPage) {
        this.releaseWelfare.currentPage=currentPage;
        this.get_position_list();

      },
      get_position_listselect(){
        this.releaseWelfare.currentPage=1;
        this.get_position_list();
      },
      get_position_list(){
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1' && role !== '5') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        getmyfabu(this.releaseWelfare).then((res) => {

          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$msgdeal(res.msg);
          }
        });
      },
      //判断是否实名和登陆状态
      isAuthenticationM(){
        if (!this.$fsAuthent()) {
          return false;
        }
        this.$router.push({path: '/home/crinformation/7'});
      },
      //获取实名信息


    },
    watch: {
      "$route"(to, from) {
        if (to.path === '/home/myRelease') {
          this.get_position_list();
        }
      }
    }
  }
</script>
<style>
  .parent {
    padding:0 15px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height:30px;  /*行间距*/
    font-size:16px;
  }


</style>
