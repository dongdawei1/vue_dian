<template>
  <div>

    <!-- 筛选区 -->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="求职城区"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="职位类型"  >
        <el-autocomplete
          v-model="releaseWelfare.position"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择职位"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="getResumeAllselect">查询</el-button>
      </el-form-item>
      <el-form-item  v-if="isCreate">
        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >发布简历</router-link></el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="500">
      <el-table-column
        fixed
        prop="position"
        label="求职类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="detailed"
        label="求职城区"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="addressDetailed"
        label="居住城区"
        width="160"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪水"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="80">
      </el-table-column>
      <el-table-column
        prop="experience"
        label="工作年限"
        width="120">
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
      title="请勿将商户联系方式提供给他人"
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

  import { getRealName } from '../../../api/api';
  import { get_position } from '../../../api/api';
  import { getResumeAll } from '../../../api/api';
  import { getContact} from '../../../api/api';
  import { regionData } from 'element-china-area-data'
  export default {



    data() {
      return {
        restaurants: [],// 职位类型下拉
        role:'',
        isCreate:false,
        tableData: [],
        total: 0,
        dialogVisible: false,//联系方式弹窗
        contact :'', //联系方式
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
          pageSize: 20,//每页显示的数量
          //分页结束
          permissionid:30,
        },
      }
    },

    created () {
      this.getRealName();
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
          selectType:2
        }
        getContact(params).then((res) => {
          if(res.status===0) {
            this.contact=res.data;
            this.dialogVisible=true;//联系方式弹窗
          }else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //判断是否实名和登陆状态
      isAuthenticationM(){
        this.$router.push({path:'/home/myRelease'});
      },


      //获取用户实名信息判断展示哪个城市的信息
      getRealName(){
        if (!this.$fsAuthent()) {
          return false;
        };
        let role = window.localStorage.getItem('dian_role');
        if (role === '1' || role === '11' || role === '4') {
          this.isCreate=true;
        }
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            let selectedOptions = [];
            selectedOptions[0] = this.realName.provincesId.toString();
            selectedOptions[1] = this.realName.cityId.toString();
            selectedOptions[2] =  this.realName.districtCountyId.toString();
            this.releaseWelfare.selectedOptions =selectedOptions;

            this.getResumeAll(); //分页查询
            this.loadAll();
          }else{
            this.$msgdeal(res.msg);
          }
        });
      },

      //获取全部职位类型
      loadAll() {
        get_position().then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurants=releaseTitleList;
          }else{
            this.$msgdeal(res.msg);
          }
        });
      },
      //下拉
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      //模糊查询
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },


      //城市组件
      handleChange (value) {
      },


      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.releaseWelfare.currentPage=currentPage;
        this.getResumeAll();

      },
      getResumeAllselect(){
        this.releaseWelfare.currentPage=1;
        this.getResumeAll();
      },
      getResumeAll(){
        if (!this.$fsAuthent()) {
          return false;
        };
        getResumeAll(this.releaseWelfare).then((res) => {
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
          }else{
            this.$msgdeal(res.msg);
          }
        });
      }
    }
  }
</script>

<style >
</style>
