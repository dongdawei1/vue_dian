<template>
  <div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="公司名称"
        width="300"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
      prop="name"
      label="服务区域"
      width="160"
      :show-overflow-tooltip="true">
    </el-table-column>

      <el-table-column
        prop="name"
        label="服务简介"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="name"
        label="联系人"
        width="120">
      </el-table-column>

      <el-table-column
        prop="name"
        label="联系人电话"
        width="140">
      </el-table-column>

      <el-table-column
        prop="address"
        label="公司地址"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="getContact(scope.row,1)" type="text" size="small" v-if="scope.row.isPublishContact">获取手机号码</el-button>
          <el-button @click="getContact(scope.row,2)" type="text" size="small" v-if="scope.row.isEmail">获取邮箱</el-button>
        </template>
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

  </div>
</template>


<script>
  import { getRealName } from '../../api/api';
  import { getPositionAll } from '../../api/api';
  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  export default {



    data() {
      return {
        resdata:'',
        tableData: [],
        total: 0,
        realName:'',//实名信息
        releaseWelfare: { //查询条件
          selectedOptions: [], //三级联动城市
          provincesId:'',//省id
          cityId:'',
          districtCountyId:'',
          position:'', //职位类型
          //分页开始
          currentPage: 1,
          infoList: [],
          movieInfoList: [],
          pageSize: 20,//每页显示的数量
          //分页结束
          StringPath: '/home/pestControl',
        },
      }
    },

    created () {
      this.jurisdiction()
    },
    methods: {

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
            this.getPositionAll(); //分页查询
          }
        });
      },

      handleCurrentChange(currentPage) {

        this.releaseWelfare.currentPage=currentPage;
        this.getPositionAll()

      },
      getPositionAll(){
        getPositionAll(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
            let length= this.tableData.length;
            for(let a=0;a<length;a++){
              if(this.tableData[a].isPublishContact===1){
                this.tableData[a].isPublishContact=true;
                this.tableData[a].isEmail=false;
              }else{
                this.tableData[a].isEmail=true;
                this.tableData[a].isPublishContact=false;
              }
            }
          }else {
            isRoleMessage(res.msg);
          }
        });
      }


    }

  }
</script>


<style >
</style>
