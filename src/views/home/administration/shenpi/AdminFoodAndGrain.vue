<template>
  <div class="vm-image-list">
    <!--我的发布 已发布过的职位  c查询框开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">
      <el-form-item label="发布类型">
        <el-select v-model="releaseWelfare.releaseType" placeholder="服务类型">
          <el-option label="蔬菜" value="4"></el-option>
          <el-option label="粮油" value="5"></el-option>
          <el-option label="副食/调料" value="6"></el-option>
          <el-option label="水产/禽蛋" value="29"></el-option>
          <el-option label="清洁用品" value="9"></el-option>
          <el-option label="桌椅餐具" value="11"></el-option>
          <el-option label="工服" value="101"></el-option>
          <el-option label="百货" value="102"></el-option>
          <el-option label="绿植" value="103"></el-option>
          <el-option label="装饰用品" value="104"></el-option>
          <el-option label="酒水饮料" value="7"></el-option>
          <el-option label="消毒餐具" value="8"></el-option>

          <el-option label="电器/设备出售" value="33"></el-option>
          <el-option label="二手电器/设备出售" value="34"></el-option>
          <el-option label="维修电器/设备" value="18"></el-option>

          <el-option label="店面/窗口出租" value="14"></el-option>
          <el-option label="摊位出租转让" value="15"></el-option>
          <el-option label="菜谱/广告" value="13"></el-option>
          <el-option label="装修" value="17"></el-option>
          <el-option label="灭虫" value="19"></el-option>
        </el-select>
      </el-form-item>
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
      style="width: 100%">
      <el-table-column
        fixed
        prop="userType"
        label="用户类型"
        width="120">
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
        label="商品类型带(需审批)"
        width="170"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="serviceDetailed"
        label="服务城区"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="contact"
        label="联系方式"
        width="120">
      </el-table-column>
      <el-table-column
        prop="consigneeName"
        label="联系人"
        width="110"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
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
          <el-radio-group v-model="form.authentiCationStatus" :disabled="shenhezhihui">
            <el-radio label="2">通过</el-radio>
            <el-radio label="3">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="失败原因" prop="authentiCationFailure">
          <el-input v-model="form.authentiCationFailure" placeholder="选择不通过时必须输入，小于15个字"></el-input>
        </el-form-item>
        <div class="shenpibeizhu"  v-if="tableDataNo.libiao">
          备注 ：已经审批过的类型不带(待审批或不通过..)选择1<br>
          示例 ：<br>
          1审批状态不通过，发布类型可以通过；<br>
          2新服务类型不通过，审批状态必须不通过；<br>
          3服务类型不带()备注的，只能选1；<br>
        </div>

        <el-form-item label="服务类型" prop="isServiceType"  v-if="tableDataNo.libiao" >
          {{tableDataNo.serviceType}}<br>
          <template>
            <el-radio-group v-model="form.isServiceType" :disabled="shenhezhihui">
              <el-radio label="1">已有服务类型</el-radio>
              <el-radio label="2">新服务类型通过</el-radio>
              <el-radio label="3">新服务类型不通过</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitServiceType" v-loading.fullscreen.lock="fullscreenLoading"
                   v-if="shenhezhihui">商品类型合规在此手动添加
        </el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">提交
        </el-button>
      </div>
    </el-dialog>
    <!--审核弹窗结束-->


    <!--查看详情弹窗开始-->
    <el-dialog
      title="审核详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <span>用户类型 : {{tableDataNo.userType }}</span><br>
      <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
      <span v-if="tableDataNo.libiao">具体类型 : {{tableDataNo.serviceType }}</span><br>
      <span>服务范围 : {{tableDataNo.serviceDetailed }}</span><br>


      <!--表格开始-->

      <el-table
        :data="tableDataNo.serviceAndprice"
        border
        style="width: 60%" v-if="tableDataNo.libiao">
        <el-table-column
          fixed
          prop="project"
          label="具体项目名称或规格"
          width="220">
        </el-table-column>
        <el-table-column
          fixed
          prop="price"
          label="具体价格"
          width="140">
        </el-table-column>
      </el-table>
      <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
      <span>备注 : {{tableDataNo.remarks }}</span><br>
      <span v-if="!tableDataNo.libiao">面积/服务起步价格 : {{tableDataNo.mianjia }}<br></span>
      <span>具体介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
      <span>申请时间 : {{tableDataNo.createTime }}</span><br>
      <span>审批状态 : {{tableDataNo.authentiCationStatus }}</span><br>
      <span>失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
      <span>审核人员 : {{tableDataNo.examineName }}</span><br>
      <br>实名信息<br>
      <span>公司名称 : {{tableDataNo.realNameId }}</span><br>
      <span>实名电话 : {{tableDataNo.contact }}</span><br>
      <span>实名城市 : {{tableDataNo.detailed }}</span><br>
      <span>实名地址 : {{tableDataNo.updateTime }}</span><br>
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

  import {getfabuad} from '../../../../api/api';
  import {examineAll} from '../../../../api/api';
  import {admin_create_serviceType} from '../../../../api/api';
  import {newstr} from '../../../../api/api';

  export default {
    data() {
      return {
        shenhezhihui: false, //审核弹窗置灰
        fullscreenLoading: false,
        pathString: '/home/releaseWelfare',
        //分页开始
        total: 0,

        //分页结束

        releaseWelfare: { //查询条件
          contact: '',//手机号
          releaseType: '4', //服务类型
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData: [], //全部数据
        tableDataNo: {
          serviceAndprice: '',
          evaluateid: '',
        }, //某一个审批
        dialogVisible: false,  //查看详情弹窗
        dialogFormVisible: false, //审批弹窗
        form: {   //审核表单
          authentiCationStatus: '',
          authentiCationFailure: '', //失败原因
          tabuleType: 18, //维修，电器，二手
          isServiceType: '',
          serviceTypeId: '',
          caidanid:''
        },
        formLabelWidth: '120px',
        fileList: '',
        rules: {
          authentiCationStatus: [
            {required: true, message: '请选择是否通过', trigger: 'change'}
          ],
          isServiceType: [
            {required: true, message: '请选择是否通过', trigger: 'change'}
          ],
          authentiCationFailure: [
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ]
        }


      }
    },
    created() {
      this.get_position_list();
    },

    methods: {
      handleClick(row) {  //点击查看详细
        this.tableDataNo = row;
        this.dialogVisible = true;
      },
      handleClose(done) { //关闭查看详情
        this.dialogVisible = false;
      },

      examineClick(row) { //点击审批打开弹窗
        this.shenhezhihui = false;
        this.form.authentiCationFailure = '';
        this.form.authentiCationStatus = '';
        this.form.isServiceType = '';
        this.tableDataNo = row;
        this.form.serviceTypeId = this.tableDataNo.evaluateid;
        this.dialogFormVisible = true;
        if (this.form.serviceTypeId === -1) {
          this.form.authentiCationStatus = "3";
          this.form.isServiceType = "3";
          this.form.authentiCationFailure = "新发布类型审核失败";
          this.shenhezhihui = true;
        }
      },
      submitServiceType() {
        this.fullscreenLoading = true;
        let form = {
          serviceTypeName: newstr({
            type: 1,
            res: this.tableDataNo.serviceType
          }),
          releaseType: this.releaseWelfare.releaseType
        };
        admin_create_serviceType(form).then(res => {
          this.fullscreenLoading = false;
          if (res.status === 0) {
            this.$message.success("添加成功,请重新审批");
            this.get_position_list(); //刷新列表
            this.dialogFormVisible = false;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //审批提交
      submitForm(form) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true;
            this.form.userId = this.tableDataNo.userId;
            this.form.id = this.tableDataNo.id;
            this.form.serviceTypeId = this.tableDataNo.evaluateid;
            this.form.caidanid= this.tableDataNo.releaseType;


            if (this.form.authentiCationStatus === '2') {
              if (this.form.isServiceType === '3') {
                this.fullscreenLoading = false;
                this.$message.error("服务类型不通过，审核必须也选不通过");
                return false;
              }
            }

            examineAll(this.form).then(data => {
              this.fullscreenLoading = false;
              if (data && data.status === 0) {
                this.$message.success(data.msg);
                this.get_position_list(); //刷新列表
                this.dialogFormVisible = false;
              } else {
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
        this.releaseWelfare.currentPage = currentPage;
        this.get_position_list();

      },
      get_position_listselect() {
        this.releaseWelfare.currentPage = 1;
        this.get_position_list();
      },
      get_position_list() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        getfabuad(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            let list = res.data.datas;
            //     authentiCationStatus
            for (let a = 0; a < list.length; a++) {
              list[a].pictureUrl = JSON.parse(list[a].pictureUrl);
              let authentiCationStatus = list[a].authentiCationStatus;
              if (authentiCationStatus === 1) {
                list[a].authentiCationStatus = '审核中';
                list[a].authentiCationFailure = '';  //审核失败原因
              } else if (authentiCationStatus === 3) {
                list[a].authentiCationStatus = '审核失败'
              }
              let releaseType = list[a].releaseType;
              if (releaseType !== 13 && releaseType !== 14 &&
                releaseType !== 15 && releaseType !== 17 && releaseType !== 19) {
                list[a].libiao=true;
                list[a].serviceAndprice = JSON.parse(list[a].serviceAndprice);
              }else{
                list[a].libiao=false;
              }
            }
            this.tableData = list;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
    },
  }
</script>
<style>

</style>
