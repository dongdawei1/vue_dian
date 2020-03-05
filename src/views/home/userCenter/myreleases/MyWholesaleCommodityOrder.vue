<template>
  <div class="vm-image-list">
    <!--我的发布 已发布的批发。查询开始-->
    <el-form :inline="true" :model="releaseWelfare" class="demo-form-inline">

      <el-form-item label="商品类型">
        <el-select v-model="releaseWelfare.releaseType" placeholder="服务类型">
          <el-option label="蔬菜" value="4"></el-option>
          <el-option label="粮油" value="5"></el-option>
          <el-option label="副食/调料" value="6"></el-option>
          <el-option label="水产/禽蛋" value="29"></el-option>
          <el-option label="清洁用品" value="9"></el-option>
        </el-select>
      </el-form-item>


      <!--根据商品 类型， id,送取货时间查找，状态   -->

      <el-form-item label="价格有效期">
        <el-select v-model="releaseWelfare.commodityType" placeholder="请选择价格有效期状态" clearable
                   @change="serviceTypecheck(1)">
          <el-option label="价格有效期内" value="1"></el-option>
          <el-option label="价格有效期已结束" value="2"></el-option>
          <el-option label="价格有效期未开始" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <template>
          <el-select v-model="releaseWelfare.welfareStatus" clearable placeholder="请选择发布状态"
                     @change="serviceTypecheck(2)">
            <el-option
              v-for="item in  welfareStatuss"
              :key="item.label"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <br>

      <el-form-item label="商品名称">
        <el-autocomplete
          v-model="releaseWelfare.serviceType"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择商品名称"
          @change="serviceTypecheck"
          clearable></el-autocomplete>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="get_position_listselect">查询</el-button>
        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM()"
            to="" class="a">发布商品
          </router-link>
        </el-button>
      </el-form-item>

    </el-form>
    <!--c查询框结束-->
    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      max-height="500">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="releaseType"
        label="商品类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="id"
        label="商品编号"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="serviceType"
        label="商品名称"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

    </el-table>
    <!--表格结束-->
    <!--查看详情弹窗开始-->
    <el-dialog
      title="发布详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="parent">
        <div class="left">
          <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
          <span>商品类型 : {{tableDataNo.releaseType }}</span><br>
          <span>下单方式 : {{tableDataNo.reserve }}</span><br>
          <span>商品名 : {{tableDataNo.serviceType }}</span><br>
          <span>包装规格 : {{tableDataNo.commoditySpecifications }}</span><br>
          <span>单价 : {{tableDataNo.commodityJiage }}</span><br>
          <span>商品数量 : {{tableDataNo.commodityCountNo }}</span><br>
          <span>包装方式 : {{tableDataNo.commodityPacking }}</span><br>

          <span>产地 : {{tableDataNo.detailed }}</span><br>
          <span>产地详情 : {{tableDataNo.addressDetailed }}</span><br>
          <span>商品介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
          <span>备注 : {{tableDataNo.remarks }}</span><br>

          <span v-if="tableDataNo.welfareStatus === '审核失败'">失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>

        </div>


        <div class="right">
          <span>发布状态 : {{tableDataNo.welfareStatus }}</span><br>
          <span>价格开始 : {{tableDataNo.startTime }}</span><br>
          <span>价格结束 : {{tableDataNo.endTime }}</span><br>

          <span>送货方式 : {{tableDataNo.deliveryType }}</span><br>
          <span>运费/满N减 : {{tableDataNo.deliveryCollect }}(元)</span><br>
          <span>创建时间 : {{tableDataNo.createTime }}</span><br>
          <span>交易次数 : {{tableDataNo.servicFrequenc }}</span><br>

        </div>

        <br> 实名信息<br>
        <span>联系人 : {{realName.consigneeName }}</span><br>
        <span>联系方式 : {{realName.contact }}</span><br>
        <span>市场名称: {{realName.companyName }}</span><br>
        <span>所在城区 : {{realName.detailed }}</span><br>
        <span>地址详情: {{realName.addressDetailed }}</span><br>


        <span>商品图片 : </span><br>
        <li v-for="(p, index) in this.tableDataNo.pictureUrl" :key="index">
          <img :src="p.pictureUrl" width="100%">
        </li>
      </div>
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
  import {operation_userFoodAndGrain} from '../../../../api/api';
  import {get_wholesaleCommodity_serviceType} from '../../../../api/api';
  import {getRealName} from '../../../../api/api';
  import {get_myWholesaleCommodity_list} from '../../../../api/api';

  export default {
    props: ["CommodityId"],
    data() {
      return {
        restaurants: [],//标题下拉
        timeout: null,

        fullscreenLoading: false,
        realName: '',//实名信息
        pathString: '/home/createFoodAndGrain',
        //分页开始
        total: 0,
        //分页结束
        welfareStatuss: [
          {"value": "审核通过", "label": "1"},
          {"value": "隐藏中", "label": "2"},
          {"value": "审核中", "label": "4"}
        ],//查询条件职位状态
        releaseWelfare: { //查询条件
          releaseType: '4', //服务类型
          welfareStatus: '',//发布状态
          serviceType: '', //商品名称
          commodityType: '',//是否在价格有效期内

          type: 2,//1公开，2自己发布过的
          currentPage: 1,
          pageSize: 20,//每页显示的数量
        },
        tableData: [], //全部数据
        tableDataNo: {
          pictureUrl: '',
          serviceAndprice: '',
        }, //某一个数据
        dialogVisible: false,  //查看详情弹窗
        formLabelWidth: '120px',
        rules: {
          workingAddress: [
            {required: true, message: '工作地址不能为空', trigger: 'change'},
            {min: 1, max: 100, message: '地址不能超过100个字', trigger: 'blur'}
          ],
          describeOne: [
            {required: true, message: '职位描述不能为空', trigger: 'change'},
            {min: 1, max: 100, message: '职位描述不能超过100个字', trigger: 'blur'}
          ],
          isPublishContact: [
            {required: true, message: '请勾选是否公开电话', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.get_position_list();
      this.getRealName();
    },
    methods: {
      examineClick(row) {
        this.$router.push('/home/editFoodAndGrain/' + row.id);  //带参数页面跳转  name:'editMAndRAndP',
        // id:this.$route.params.id,
      },


      handleClick(row) {  //点击查看详细
        this.tableDataNo = row;
        this.dialogVisible = true;
      },


      handleClose(done) { //关闭查看详情
        this.dialogVisible = false;
      },

      //操作
      submitForm(form, type) {
        this.fullscreenLoading = true;
        let data = {};
        data.type = type;
        data.userId = form.userId;
        data.id = form.id;
        if (type === 1 || type === 2 || type === 3 || type === 4 || type === 5) {
          operation_userFoodAndGrain(data).then(data => {
            this.fullscreenLoading = false;
            let msg = data.msg;
            if (data && data.status === 0) {
              this.$message.success(msg);
            } else {
              this.$msgdeal(msg);
            }
          });
        } else {
          this.$message.error("操作类型错误");
        }
        this.get_position_list(); //刷新列表
      },
      //删除
      open(form, type) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm(form, type);
        }).catch(() => {

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
        get_myWholesaleCommodity_list(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            this.total = res.data.totalno; //总条数
            this.tableData = res.data.datas;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },

      //判断是否实名和登陆状态
      isAuthenticationM() {
        if (!this.$fsAuthent()) {
          return false;
        }
        this.$router.push({path: this.pathString});
      },
      //获取实名信息
      getRealName() {
        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.realName = res.data;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },


      //下拉
      querySearchAsync(queryString, cb) {
        if (this.releaseWelfare.releaseType === '') {
          this.$message.error("请先选择:发布类型")
          return false;
        }
        this.get_serviceType();
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
      get_serviceType() {
        get_wholesaleCommodity_serviceType(this.releaseWelfare).then((res) => {
          if (res.status === 0) {
            let list = res.data;
            let releaseTitleList = [];
            for (let i = 0; i < list.length; i++) {
              let releaseTitle = {"value": list[i], "address": list[i]};
              releaseTitleList = releaseTitleList.concat(releaseTitle);
            }
            this.restaurants = releaseTitleList;

            //没有找到用户输入的类型引导添加
            if (this.restaurants.length === 0) {
              this.$message.error({
                type: 'info',
                message: '没找到商品,可以尝试更换筛选条件',
                duration: 2000
              });
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      serviceTypecheck(type) {
        if (type === 1) {
          this.releaseWelfare.welfareStatus = '';
        } else if (type === 2) {
          this.releaseWelfare.commodityType = '';
        }
      }
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
    padding: 0px 15px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height: 30px; /*行间距*/
    font-size: 16px;
  }



</style>

