<template>
  <div class="tableClass">

    <div v-if="isFromData" class="fromDataClass">
      <div class="fromDataTitleClass">
        采购订单信息
      </div>

      <span v-for="(p, index) in fromData" :key="index">
      <div class="forFromData">
      {{p.serviceType}}&nbsp;
      采购数量:{{p.number}}&nbsp;{{p.specifiName}}&nbsp;

       <span v-if="p.specifi_cations!=='--'">包装规格:{{p.specifi_cations}}&nbsp;</span>
       <span v-if="p.remarks!==''&& p.remarks!== null">备注:{{p.remarks}}&nbsp;</span>

         <el-button type="text" @click="deleteFromData(index,p)">
           <i class="el-icon-delete"></i>
         </el-button>；
        </div>&nbsp;&nbsp;
    </span>

      <div class="submitFormButton">
        <el-button type="primary" size="mini" @click="submitForm" plain>查看预估价格</el-button>
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="myCommonMenuTableData.filter(data => !search || data.serviceType.toLowerCase().includes(search.toLowerCase()))"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="440"
      v-if="isCommonMenuButton"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'1px'}">
      <el-table-column
        label="常用商品名称"
        width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.serviceType }}</template>
      </el-table-column>

      <el-table-column
        prop="commodityPackingName"
        label="包装方式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="specifi_cations"
        label="包装规格"
        width="120"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="数量" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.number" :disabled="scope.row.placing" placeholder="需小于100"></el-input>
        </template>
      </el-table-column>

      <el-table-column
        prop="specifiName"
        label=""
        width="60"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="备注" width="240">
        <template slot-scope="scope">
          <el-input placeholder="15字之内"
                    type="text"
                    v-model="scope.row.remarks"
                    :placeholder="scope.row.remarks"
                    :disabled="scope.row.placing"
                    maxlength="15"
                    show-word-limit
                    clearable></el-input>
        </template>
      </el-table-column>

      <el-table-column width="130">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePreservation(scope.$index, scope.row)" v-if="!scope.row.placing">保存
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.placing">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            clearable/>
        </template>
      </el-table-column>

    </el-table>


    <el-table
      ref="multipleTable"
      :data="allCommonMenuTableData.filter(data => !search || data.serviceType.toLowerCase().includes(search.toLowerCase()))"
      tooltip-effect="dark"
      style="width: 100%"
      :max-height="maxHeight"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'1px'}">

      <el-table-column
        label="全部商品名称"
        width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.serviceType }}</template>
      </el-table-column>

      <el-table-column
        prop="commodityPackingName"
        label="包装方式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="specifi_cations"
        label="包装规格"
        width="120"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="数量" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.number" :disabled="scope.row.placing" placeholder="需小于100"></el-input>
        </template>
      </el-table-column>

      <el-table-column
        prop="specifiName"
        label=""
        width="60"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="备注" width="240">
        <template slot-scope="scope">
          <el-input placeholder="15字之内"
                    type="text"
                    v-model="scope.row.remarks"
                    :disabled="scope.row.placing"
                    maxlength="15"
                    show-word-limit
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column width="130">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePreservation(scope.$index, scope.row)" v-if="!scope.row.placing">保存
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.placing">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            clearable/>
        </template>
      </el-table-column>


    </el-table>

    <!--地址确认框-->
    <el-dialog title="采购信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">

        <el-form-item label="参考价格" :label-width="formLabelWidth">
          <el-input v-model="form.commodityJiage" :disabled="true" autocomplete="off"
                    :placeholder="form.commodityJiage"></el-input>
        </el-form-item>

        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input v-model="form.addressDetailed" :disabled="true" autocomplete="off"
                    :placeholder="form.addressDetailed"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.consigneeName" :disabled="true" autocomplete="off"
                    :placeholder="form.consigneeName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.contact" :disabled="true" autocomplete="off" :placeholder="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="送货时间" prop="giveTakeTime" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.giveTakeTime"
            type="datetime"
            placeholder="日期时间必须是2小时后"
            default-time="08:30:00"
            :picker-options="pickerOption"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks"
                    type="text"
                    placeholder="送货时间或其他重要信息"
                    maxlength="30"
                    show-word-limit
                    clearable></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">发布采购信息
        </el-button>
      </div>
    </el-dialog>
    <!--地址确认框-->
    <!-- 成功弹窗  -->
    <el-dialog
      title="发布成功"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="cntinue"
    >

      <span>进入我的首页-进行中的采购订单查看订单</span>
      <span>订单会每隔1分钟更新报价者列表，请您关注订单状态</span>
      <span slot="footer" class="dialog-footer">
   <el-button type="primary"><router-link
     v-on:click.native="cntinue"
     to="" class="a">我的首页</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->

  </div>
</template>


<script>
  import {create_purchase_order} from '../../../../api/api';
  import {create_order_evaluation} from '../../../../api/api';
  import {getRealName} from '../../../../api/api';
  import {getPurchaseCreateOrderVo} from '../../../../api/api';


  export default {
    data() {
      return {
        pickerOption: {
          disabledDate(time) {
            var nowDate = new Date();
            let yesterDayDate = new Date(nowDate.getTime() - (24 * 60 * 60 * 1000)); // 获取昨天的日期对象
            yesterDayDate.setHours(23, 59, 59, 0);
            let datenow = yesterDayDate.getTime();
            return time.getTime() <= datenow || time.getTime() > datenow + (3 * 24 * 3600 * 1000);
          }
        },
        maxHeight: '280',
        isCommonMenuButton: false, //是否有常用菜单
        centerDialogVisible: false,//发布成功弹窗
        search: '',
        dialogFormVisible: false,//确认弹窗
        formLabelWidth: '120px',
        myCommonMenuTableData: [],
        allCommonMenuTableData: [],
        fromData: [],
        isFromData: false,
        fullscreenLoading: false,
        form: {
          addressDetailed: '',
          giveTakeTime: '',
          contact: '',
          consigneeName: '',
          remarks: '',
          fromData: '',
          isCommonMenu: '',
          commodityJiage: ''
        },
        rules: {
          giveTakeTime: [
            {required: true, message: '送货时间不能为空', trigger: 'change'},
          ],
        }
      }
    },

    created() {
      this.checke_isButten();
    },
    methods: {

      deleteFromData(index, p) {
        if (p.type === 1) {
          for (let a = 0; a < this.myCommonMenuTableData.length; a++) {
            if (this.myCommonMenuTableData[a].commodityPacking === p.commodityPacking
              && this.myCommonMenuTableData[a].serviceType === p.serviceType
              && this.myCommonMenuTableData[a].specifi_cations === p.specifi_cations) {
              this.myCommonMenuTableData[a].number = '';
              this.myCommonMenuTableData[a].remarks = '';
              this.myCommonMenuTableData[a].placing = false;
              this.fromData.splice(index, 1);
              if (this.fromData.length === 0) {
                this.isFromData = false;
              }
              break;
            }
          }
        } else {
          for (let a = 0; a < this.allCommonMenuTableData.length; a++) {
            if (this.allCommonMenuTableData[a].commodityPacking === p.commodityPacking
              && this.allCommonMenuTableData[a].serviceType === p.serviceType
              && this.allCommonMenuTableData[a].specifi_cations === p.specifi_cations) {
              this.allCommonMenuTableData[a].number = '';
              this.allCommonMenuTableData[a].remarks = '';
              this.allCommonMenuTableData[a].placing = false;
              this.fromData.splice(index, 1);
              if (this.fromData.length === 0) {
                this.isFromData = false;
              }
              break;
            }
          }
        }
      },

      handlePreservation(index, row) {
        if (!/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(row.number)) {
          this.$message.error("数量只能是数字");
          return false;
        }
        if (row.number > 100) {
          this.$message.error("数量不能超过100");
          return false;
        }

        if (row.type === 1) {
          this.myCommonMenuTableData[index].number = row.number;
          this.myCommonMenuTableData[index].remarks = row.remarks;
          this.myCommonMenuTableData[index].placing = true;
          //在这里保存
          this.upFromData(row);
        } else {
          this.allCommonMenuTableData[index].number = row.number;
          this.allCommonMenuTableData[index].remarks = row.remarks;
          this.allCommonMenuTableData[index].placing = true;
          //在这里保存
          this.upFromData(row);
        }
        this.isFromData = true;
      },
      handleEdit(index, row) {
        if (row.type === 1) {
          this.myCommonMenuTableData[index].placing = false;
        } else {
          this.allCommonMenuTableData[index].placing = false;
        }
      },
      upFromData(row) {
        if (this.fromData.length > 0) {
          let boolean = false;
          for (let a = 0; a < this.fromData.length; a++) {
            if (this.fromData[a].commodityPacking === row.commodityPacking
              && this.fromData[a].serviceType === row.serviceType
              && this.fromData[a].specifi_cations === row.specifi_cations) {
              this.fromData[a].number = row.number;
              this.fromData[a].remarks = row.remarks;
              boolean = true;
              break;
            }
          }
          if (boolean === false) {
            this.fromData = this.fromData.concat(row);
          }
        } else {
          this.fromData = this.fromData.concat(row);
        }
      },

      checke_isButten() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role === '1' || role === '2') {
          let isAuthentication = window.localStorage.getItem('dian_isAuthentication');
          if (isAuthentication===null ||  isAuthentication !== '2') {
            this.$router.push({path: '/home/myAccount'});
            return false;
          }
            getPurchaseCreateOrderVo().then(res => {
              if (res.status === 0) {
                if (res.data.isCommonMenu === 1) {
                  this.isCommonMenuButton = true;
                  this.myCommonMenuTableData = res.data.myCommonMenu;
                } else {
                  this.maxHeight = 470;
                }
                this.form.isCommonMenu = res.data.isCommonMenu;
                this.allCommonMenuTableData = res.data.allCommonMenu;

              } else {
                this.$msgdeal(res.msg);
              }
            });
          }
          this.$router.push({path: '/home/release'});
      },

      getRealName() {
        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.form.addressDetailed = res.data.addressDetailed;
            this.form.contact = res.data.contact;
            this.form.consigneeName = res.data.consigneeName;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //提交
      submitForm() {
        if (!this.$fsAuthent()) {
          return false;
        }
        if (this.fromData.length === 0) {
          this.$message.error("采购列表不能为空")
          return false;
        }
        this.getRealName();
        let fromData = {
          fromData: this.fromData
        };
        create_order_evaluation(fromData).then(res => {
          this.fullscreenLoading = false;
          if (res.status === 0) {
            this.form.commodityJiage = res.data;
          } else {
            this.$msgdeal(res.msg);
          }
        });
        this.dialogFormVisible = true;
      },

      commitForm(form) {
        this.$refs['form'].validate((valid) => {
          this.fullscreenLoading = true;
          if (valid) {
            this.form.fromData = this.fromData;
            create_purchase_order(this.form).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.dialogFormVisible = false;
                this.fromData = [];
                this.form.fromData = [];
                this.centerDialogVisible = true;

              } else {
                this.$msgdeal(res.msg);
              }
            });
          } else {
            this.fullscreenLoading = false;
            return false;
          }
        });
      },

      cntinue() {  //留在本页继续发布
        this.centerDialogVisible = false;
        this.$router.push('/home/release');
      },


    }
  }

</script>
<style>
  .tableClass {
    margin: 1px 0px 8px 1px;
    padding: 5px 0px 10px 10px;
  }

  .fromDataClass {
    border: 1px solid #E7E3E6;
    padding: 5px 0px 10px 10px;
    color: #918D90;
  }

  .fromDataTitleClass {
    font-size: 16px;
  }

  .submitFormButton {
    text-align: right;
    margin: 4px 121px 2px 10px;
  }

  .forFromData {
    background: #F4FBFD;
    display: inline
  }
</style>
