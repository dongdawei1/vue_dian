<template>
  <div class="vm-image-list">
    <!--我的发布 已发布过的 c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">
      <el-form-item label="发布类型"  >
        <el-select v-model="releaseWelfare.releaseType" placeholder="服务类型">
          <el-option label="蔬菜" value="401"></el-option>
          <el-option label="粮油" value="405"></el-option>
          <el-option label="副食/调料" value="406"></el-option>
          <el-option label="水产/禽蛋" value="429" ></el-option>
          <el-option label="清洁用品" value="409"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在城区"   >
        <el-cascader
          size="large"
          :options="options"
          v-model="releaseWelfare.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="市场名称"  >
        <el-autocomplete
          v-model="releaseWelfare.companyName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择市场名称"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
        <!--<el-button type="primary" @click="dialogFormVisible = true" plain>添加具体类型</el-button>-->
      </el-form-item><br>

      <el-form-item label="手机号">
        <el-input v-model="releaseWelfare.contact" placeholder="手机号" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="get_position_listselect">查询</el-button>
      </el-form-item>

    </el-form>
    <!--c查询框结束-->
    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"  >
      <el-table-column
        fixed
        prop="releaseType"
        label="商品类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="authentiCationStatus"
        label="状态"
        width="90">
      </el-table-column>
      <el-table-column
        prop="authentiCationFailure"
        label="失败原因"
        width="90"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="releaseTitle"
        label="标题"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="serviceType"
        label="商品名"
        width="170"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="commodityJiage"
        label="单价(元)"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="commoditySpecifications"
        label="包装规格"
        width="110"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="commodityPacking"
        label="包装方式"
        width="100">
      </el-table-column>

      <el-table-column
        prop="commodityCountNo"
        label="商品总数"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="deliveryType"
        label="送货方式"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="deliveryCollect"
        label="运费/满N减(元)"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="examineClick(scope.row)" type="text" size="small">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->



    <!--审核弹窗开始-->
    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="审批状态" prop="authentiCationStatus">
          <el-radio-group v-model="form.authentiCationStatus" >
            <el-radio label="2">通过</el-radio>
            <el-radio label="3">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="失败原因" prop="authentiCationFailure"  >
          <el-input v-model="form.authentiCationFailure"  placeholder="选择不通过时必须输入，小于15个字"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗结束-->



    <!--查看详情弹窗开始-->
    <el-dialog
      title="发布详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <span>商品类型 : {{tableDataNo.releaseType }}</span><br>
      <span>下单方式 : {{tableDataNo.reserve }}</span><br>
      <span>商品名 : {{tableDataNo.serviceType }}</span><br>
      <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
      <span>产地详情 : {{tableDataNo.addressDetailed }}</span><br>
      <span>产地 : {{tableDataNo.detailed }}</span><br>


      <span>包装规格 : {{tableDataNo.commoditySpecifications }}</span><br>
      <span>单价 : {{tableDataNo.commodityJiage }}</span><br>
      <span>商品数量 : {{tableDataNo.commodityCountNo }}</span><br>
      <span>包装方式 : {{tableDataNo.commodityPacking }}</span><br>
      <span>商品介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
      <span>备注 : {{tableDataNo.remarks }}</span><br>
      <span>送货方式 : {{tableDataNo.deliveryType }}</span><br>
      <span>运费/满N减 : {{tableDataNo.deliveryCollect }}(元)</span><br>
      <span>价格开始 : {{tableDataNo.startTime }}</span><br>
      <span>价格结束 : {{tableDataNo.endTime }}</span><br>
      <span>创建时间 : {{tableDataNo.createTime }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>

      <br>实名信息<br>
      <span>实名城市 : {{realName.detailed }}</span><br>
      <span>实名地址 : {{realName.addressDetailed }}</span><br>
      <span>市场名: {{realName.companyName }}</span><br>

      <span>图片 : </span><br>
      <li v-for="(p, index) in this.tableDataNo.pictureUrl" :key="index">
        <img :src="p.pictureUrl" width="100%">
      </li>

      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->

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

  import { adminWholesaleCommodity} from '../../../../api/api';
  import { examineAll} from '../../../../api/api';

  import { admin_create_serviceType } from '../../../../api/api';
  import { newstr } from '../../../../api/api';
  import { regionData } from 'element-china-area-data'
  import {  getwholesale} from '../../../../api/api';
  import {  getRealNameByuserId} from '../../../../api/api';

  export default {
    data() {
      return {
        restaurants: [],//标题下拉
        timeout:  null,
        realName:'',
        fullscreenLoading:false,
        pathString:'/home/releaseWelfare',
        //分页开始
        total: 0,

        //分页结束

        releaseWelfare: { //查询条件
          contact:'',//手机号
          releaseType:'401', //服务类型
          selectedOptions: [], //三级联动城市
          companyName:'',//市场名称
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData:[], //全部数据
        options: regionData,//城市
        tableDataNo:{
          serviceAndprice:'',
          evaluateid:'',
        }, //某一个审批
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //审批弹窗
        form: {   //审核表单
          authentiCationStatus: '',
          authentiCationFailure:'', //失败原因
          tabuleType:35, //


        },
        formLabelWidth: '120px',
        fileList:'',
        rules: {
          authentiCationStatus: [
            { required: true, message: '请选择是否通过', trigger: 'change' }
          ],
          isServiceType: [
            { required: true, message: '请选择是否通过', trigger: 'change' }
          ],
          authentiCationFailure: [
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.get_position_list();
    },

    methods: {
      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        this.dialogVisible=true;
        this.getRealName(this.tableDataNo.userId);
      },
      handleClose(done) { //关闭查看详情
        this.realName='',
        this.dialogVisible=false;
      },

      examineClick(row){ //点击审批打开弹窗
        this.tableDataNo=row;
        this.dialogFormVisible=true;
      },
      submitServiceType(){
        this.fullscreenLoading=true;
        let  form={
          serviceTypeName: newstr({
            type:1,
            res:this.tableDataNo.serviceType
          }),
          releaseType:this.releaseWelfare.releaseType
        };
        admin_create_serviceType(form).then(res => {
          this.fullscreenLoading=false;
          if (res.status === 0) {
            this.$message.success("添加成功,请重新审批");
            this.get_position_list(); //刷新列表
            this.dialogFormVisible=false;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //审批提交
      submitForm(form) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.form.userId=this.tableDataNo.userId;
            this.form.id=this.tableDataNo.id;
            examineAll(this.form).then(data => {
              this.fullscreenLoading=false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.get_position_list(); //刷新列表
                this.dialogFormVisible=false;
              }  else {
                this.$msgdeal(data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },




      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
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
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        adminWholesaleCommodity(this.releaseWelfare).then((res) => {
          if(res.status===0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          }else{
            this.$msgdeal(res.msg);
          }
        });
      },
      //城市组件
      handleChange (value) {
      },


      //下拉
      querySearchAsync(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        if(this.releaseWelfare.selectedOptions.length===0){
          this.$message.error("请先选择市场所在地")
          return false;
        }
        this.getwholesale();
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

      getwholesale(){
        let  param= {
          selectedOptions:this.releaseWelfare.selectedOptions,
          companyName:this.releaseWelfare.companyName
        };
        getwholesale(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurants=releaseTitleList;
            //没有找到用户输入的类型引导添加
            if(this.restaurants.length===0){
              this.$message.error("没有找到您输入的:市场名称可以手动添加");
            }
          }else {
            this.$msgdeal(res.msg);
          }
        });
      },
      getRealName(realNameId){
        getRealNameByuserId(realNameId).then(res =>{
          if(res.status===0){
            this.realName=res.data;
          }else {
            this.$msgdeal(res.msg);
          }
        });
      }
    },

  }
</script>
<style>

</style>
