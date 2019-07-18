<template>
  <div>

    <!-- 筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="职位城区"   clearable  placeholder="请选职位城区">
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="职位类型"  >
        <template>
          <el-select v-model="releaseWelfare.position" clearable placeholder="请输入或点击选择职位类型">
            <el-option
              v-for="item in restaurants"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getPositionAll">查询</el-button>
      </el-form-item>
        <el-form-item  v-if="isCreate">
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布招聘</router-link></el-button>
        </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        prop="position"
        label="职位类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="detailed"
        label="工作城区"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="introductoryAward"
        label="介绍人奖励"
        width="210"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪水"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="welfare"
        label="福利"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="number"
        label="招聘人数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="60">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="80">
      </el-table-column>
      <el-table-column
        prop="experience"
        label="工作年限"
        width="80">
      </el-table-column>

      <el-table-column
        prop="addressDetailed"
        label="实名地址"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="workingAddress"
        label="工作地址"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="刷新时间"
        width="180">
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
    <!-- 电话-->
    <el-dialog
      title="禁止将商户联系方式提供给他人"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        联系人:  {{contact.consigneeName}} <br/>
        联系方式:  {{contact.contact}} <br/>
        联系邮箱:  {{contact.email}} <br/>
     </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>

  import { get_user_info_sign } from '../../../api/api';
  import { getRealName } from '../../../api/api';
  import { get_position } from '../../../api/api';
  import { getPositionAll } from '../../../api/api';
  import { getContact} from '../../../api/api';
  import {  checke_isButten } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  export default {



    data() {
      return {
        resdata:'',
        role:'',
        isCreate:false,
        tableData: [],
        total: 0,
        dialogVisible: false,//联系方式弹窗
        contact :'', //联系方式
        pathString:'/home/releaseWelfare',
        restaurants: '', // 职位类型下拉
        options: regionData,//城市
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
          StringPath: '/home/recruitWorkers',
        },
      }
    },

    created () {
      this.jurisdiction()
    },
    methods: { //关闭联系方式弹窗
      handleClose(done) {
            done();
      },

      //获取联系方式
      getContact(form,type){
        let params={
          StringPath:this.releaseWelfare.StringPath,
          queriesType: type,
          id: form.id,
          selectType:1
        }
        getContact(params).then((res) => {
          if(res.status===0) {
            this.contact=res.data;
            this.dialogVisible=true;//联系方式弹窗
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      //判断是否实名和登陆状态
      isAuthenticationM(){
          get_user_info_sign(this.pathString);
      },
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
            this.isCreate=res.data.isCreate; //是否展示发布键
            this.resdata=res.data.data; //用户信息
            this.getRealName();          //获取实名信息,初始化城市
            this.loadAll();

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
            this.getPositionAll; //分页查询
          }
        });
      },
      //获取全部职位类型
      //下拉列表
      loadAll() {
        get_position().then((res) => {
          let datalist=res.data;
          var all=[];
          for(var a=0;a<datalist.length;a++){
            let  valuel={
              value:''
            };
            valuel.value=datalist[a];
            all[a]=valuel;
          }
          this.restaurants=all;
        });
      },
      //城市组件
      handleChange (value) {
        this.releaseWelfare.provincesId=value[0];
        this.releaseWelfare.cityId=value[1];
        this.releaseWelfare.districtCountyId=value[2];
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
