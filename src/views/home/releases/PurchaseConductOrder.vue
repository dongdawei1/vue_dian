<template>
  <div>
    <div v-if="voSocket" class="voSocketClass">
      有进行中订单,数据每分钟刷新一次
    </div>
    <div v-if="voSocketPay" class="voSocketClass">
      有未支付的订单,请及时处理,超时将关单！
    </div>
    <el-table
      :data="tableData"

      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>
            <div class="fromDataClass">
              <div class="fromDataTitleClass" v-if="props.row.orderStatu4 ||
                             props.row.orderStatu5 ||
                             props.row.orderStatu6 ||
                             props.row.orderStatu13 ||
                             props.row.orderStatu16
                            ">
                支付信息<br>
                订单总金额：{{props.row.voOrder.commodityZongJiage}}

                <div v-if="props.row.orderStatu4 ||
                             props.row.orderStatu13 ||
                             props.row.orderStatu16
                            ">
                  已支付金额：{{props.row.voOrder.guaranteeMoney}}<br>
                  待支付金额：{{props.row.voOrder.balanceMoney}}<br>
                </div>
              </div>
              <div class="fromDataTitleClass">
                商品信息
              </div>
              <span v-for="(p, index) in  JSON.parse(props.row.voOrder.commoditySnapshot)" :key="index">
                             <div class="forFromData">
                 {{p.serviceType}}&nbsp;
                               采购数量:{{p.number}}&nbsp;{{p.specifiName}}&nbsp;

                       <span v-if="p.specifi_cations!=='--'">包装规格:{{p.specifi_cations}}&nbsp;</span>
                      <span v-if="p.remarks!==''&& p.remarks!== null">备注:{{p.remarks}}&nbsp;</span>
                    </div>&nbsp;&nbsp;
              </span>
            </div>
            <div class="fromDataTitleClass">
              报价者列表
            </div>
            <el-table
              :data="props.row.listOrderCommonOfferEvaluateVo"
              style="width: 100%">
              <el-table-column
                prop="orderCommonOffer.commodityZongJiage"
                label="报价(元)"
                width="120">
              </el-table-column>

              <el-table-column
                prop="orderCommonOffer.saleCompanyName"
                label="商户名"
                width="180"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="orderCommonOffer.consigneeName"
                label="联系人"
                width="180"
                show-overflow-tooltip
                v-if="props.row.orderStatu4 ||props.row.orderStatu12 || props.row.orderStatu13 || props.row.orderStatu16">
              </el-table-column>
              <el-table-column
                prop="orderCommonOffer.contact"
                label="联系方式"
                width="180"
                show-overflow-tooltip
                v-if="props.row.orderStatu4 ||props.row.orderStatu12 || props.row.orderStatu13 || props.row.orderStatu16">
              </el-table-column>


              <el-table-column
                prop="orderCommonOffer.saleUserAddressDetailed"
                label="商户地址"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop=""
                label="总评价"
                show-overflow-tooltip>

                <el-table-column
                  label="商品品质">
                  <template slot-scope="scope">
                    <div class="pingjiaClass">
                      品质高:{{scope.row.evaluate.zhilianghao}}人次<br>
                      品质中:{{scope.row.evaluate.zhiliangyiban}}人次<br>
                      品质差:{{scope.row.evaluate.zhiliangcha}}人次<br>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="价格">
                  <template slot-scope="scope">
                    <div class="pingjiaClass">
                      价格低:{{scope.row.evaluate.jiagedi}}人次<br>
                      价格中:{{scope.row.evaluate.jiagezhong}}人次<br>
                      价格高:{{scope.row.evaluate.jiagegao}}人次<br>
                    </div>
                  </template>
                </el-table-column>


              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                show-overflow-tooltip
                v-if="props.row.orderStatu11 || props.row.orderStatu18 ">

                <template slot-scope="scope">
                  <el-button @click="choice(scope.row,props.row, 12)" type="text" size="small"

                             v-loading.fullscreen.lock="fullscreenLoading">选择此商户
                  </el-button>
                </template>


              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="订单ID"
        prop="voOrder.id"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="voOrder.createTime"
        width="160"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="收货时间"
        prop="voOrder.giveTakeTime"
        width="160"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="预估价格(元)"
        prop="voOrder.commodityJiage"
        width="100"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="订单状态"
        prop="orderStatuName"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="操作结束时间"
        prop="orderStatuName"
        width="180"
        show-overflow-tooltip>
        <template slot-scope="props">
 <span
   v-if="props.row.orderStatu11 || props.row.orderStatu18  || props.row.orderStatu12">{{props.row.voOrder.confirmTime}}</span>
          <span
            v-if="!props.row.orderStatu11 && !props.row.orderStatu18  && !props.row.orderStatu12">--</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        prop="">

        <template slot-scope="scope">
          <el-button @click="operationRow(scope.row,3)" type="text" size="small"
                     v-if="scope.row.orderStatu11 || scope.row.orderStatu18 || scope.row.orderStatu12 "
                     v-loading.fullscreen.lock="fullscreenLoading">关单
          </el-button>
          <el-button @click="payOrder(scope.row.voOrder.id)" type="text" size="small"
                     v-if="scope.row.orderStatu12 "
                     v-loading.fullscreen.lock="fullscreenLoading">定金二维码(微信扫码)
          </el-button>
          <el-button @click="operationRow(scope.row,11)" type="text" size="small"
                     v-if="scope.row.orderStatu3 || scope.row.orderStatu17 ||scope.row.orderStatu19 "
                     v-loading.fullscreen.lock="fullscreenLoading">再次开启发布
          </el-button>

          <el-button @click="operationRow(scope.row,5)" type="text" size="small"
                     v-if="scope.row.orderStatu16"
                     v-loading.fullscreen.lock="fullscreenLoading">确认收货
          </el-button>
          <el-button @click="operationRow(scope.row,6)" type="text" size="small"
                     v-if="scope.row.orderStatu5"
                     v-loading.fullscreen.lock="fullscreenLoading">去评价
          </el-button>

          <el-button @click="" type="text" size="small"
                     v-if="scope.row.orderStatu4"
                     disabled>送货中
          </el-button>
          <el-button @click="" type="text" size="small"
                     v-if="scope.row.orderStatu6"
                     disabled>已完成
          </el-button>

        </template>
      </el-table-column>


    </el-table>
    <!--生成二维码弹窗-->
    <el-dialog
      title="支付完成后窗口自动关闭"
      :visible.sync="centerDialogVisible"
      width="30%"
    >
      <span>请使用微信“扫一扫”扫码支付，超时将关单；若已支付请耐心等待。</span>

      <div class="dialogClass">
        <canvas id="canvas" class="qrcode"></canvas>
      </div>


    </el-dialog>
  </div>


</template>


<script>
  import {get_conduct_purchase_order} from '../../../api/api';
  import {operation_purchase_order} from '../../../api/api';
  import {native_pay_order} from '../../../api/api';
  import {get_pay_order_all} from '../../../api/api';
  import {get_pay_order_byOrderId} from '../../../api/api';

  import QRCode from 'qrcode'; //引入生成二维码插件

  export default {
    components: {
      QRCode: QRCode

    },
    data() {
      return {
        tableData: [],
        centerDialogVisible: false,//二维码弹窗
        fullscreenLoading: false,
        //order:'',
        myInterval: null, //订单状态轮询
        myIntervalPay: null, //支付结果轮询
        voSocket: false,
        voSocketPay: false,
        isLunxun: false,
        codes: '',


      }
    },

    created() {
      this.checke_isButten();
    },
    methods: {
      checke_isButten() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role === '1' || role === '2') {
          let isAuthentication = window.localStorage.getItem('dian_isAuthentication');
          if (isAuthentication === null || isAuthentication !== '2') {
            this.$router.push({path: '/home/myAccount'});
            return false;
          }

          get_conduct_purchase_order(Date.parse(new Date())).then(res => {
            if (res.status === 0) {
              if (res.data === null) {
                return false;
              }
              this.tableData = res.data.listPurchaseSeeOrderVo;
              if (res.data.voSocket === 0) {
                this.initList(1);
                this.voSocket = true;
              } else {
                this.voSocket = false;
                this.beforeDestroy();
                get_pay_order_all().then(date => { //检查是否有待支付的订单
                  if (date.status === 0) {
                    if (date.data === 'YES') {
                      this.initList(0.3);
                      this.voSocketPay = true;
                    } else {
                      this.voSocketPay = false;
                      this.beforeDestroyPay();
                    }
                  } else {
                    this.$msgdeal(res.msg);

                  }
                });
              }
            } else {
              this.$msgdeal(res.msg);
            }
          });
        }
      },


      //获取微信支付二维码链接
      payOrder(id) {
        this.fullscreenLoading = true;
        native_pay_order(id).then(res => {
          this.fullscreenLoading = false;
          if (res.status === 0) {
            this.useqrcode(res.data, id)
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //生成二维码
      useqrcode(codeUrl, id) {
        this.centerDialogVisible = true;
        this.$nextTick(() => { //不加这个第一次打开弹窗时canvas=null
          var canvas = document.getElementById('canvas')
          QRCode.toCanvas(canvas, codeUrl, function (error) {
          });
          this.initListPay(0.3, id)
        })
      },
      //获取支付结果
      getPayResult(id) {
        get_pay_order_byOrderId(id).then(res => {
          if (res.status === 0) {
            let result = res.data;
            if (result === 'YES') {
              this.$message.success("支付成功");
              this.voSocketPay = false;
              this.centerDialogVisible = false;
              this.beforeDestroyPay();
              this.checke_isButten();
            } else if (result === 'FAIL') {
              this.$message.error("支付失败");
              this.voSocketPay = false;
              this.centerDialogVisible = false;
              this.beforeDestroyPay();
              this.checke_isButten();
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },


//订单状态轮询开始
      initList(num) {
        if (num === null || num === '' || num === undefined) {
          num = 2;
        }
        this.beforeDestroy();
        this.myInterval = window.setInterval(() => {
          setTimeout(() => {
            this.checke_isButten() //调用接口的方法
          }, 1)
        }, num * 1000 * 60);
      },

      //订单状态轮询关闭
      beforeDestroy() {
        clearInterval(this.myInterval);
        this.myInterval = null;
      },


      //订单支付状态轮询开始
      initListPay(num, id) {
        if (num === null || num === '' || num === undefined) {
          num = 0.3;
        }
        this.beforeDestroyPay();
        this.myIntervalPay = window.setInterval(() => {
          setTimeout(() => {
            this.getPayResult(id) //支付结果
          }, 1)
        }, num * 1000 * 60);
      },

      //订单支付状态轮询关闭
      beforeDestroyPay() {
        clearInterval(this.myIntervalPay);
        this.myIntervalPay = null;
      },

      choice(scope, props, type) {
        this.fullscreenLoading = true;
        let order = {};
        order.id = props.voOrder.id;
        order.type = type;
        order.orderCommonOfferId = scope.orderCommonOffer.id;
        order.commodityZongJiage = scope.orderCommonOffer.commodityZongJiage;
        operation_purchase_order(order).then(res => {
          this.fullscreenLoading = false;
          if (res.status === 0) {
            this.checke_isButten();
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      operationRow(scope, type) {
        let order = {};
        order.id = scope.voOrder.id;
        order.type = type;
        operation_purchase_order(order).then(res => {
          if (res.status === 0) {
            this.checke_isButten();
          } else {
            this.$msgdeal(res.msg);
          }
        });

        //11--》3关单  或者 13 抢单确认-->12 支付按键-->支付成功变成4 （送货者操作4 变成16） --> 16 确认

        // -->状态==5  （去评价）   status==3|| 17   传给后端 11再次开启
      },


    },
    watch: {
      "$route"(to, from) {
        if (from.path === '/home/release') {
          this.beforeDestroy();
          this.beforeDestroyPay();
          this.centerDialogVisible = false;
        }
        if (to.path === '/home/release') {
          this.checke_isButten();
          if (this.voSocket) {
            get_pay_order_all().then(date => { //检查是否有待支付的订单
              if (date.status === 0) {
                if (date.data === 'YES') {
                  this.voSocketPay = true;
                }
              }
            });
          }
        }
      }
    }
  }

</script>
<style>


  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }


  .fromDataClass {
    border: 1px solid #E7E3E6;
    padding: 5px 0px 10px 10px;
    color: #918D90;
  }

  .fromDataTitleClass {
    font-size: 16px;
    color: #6F6B6E;
  }

  .pingjiaClass {
    font-size: 10px;
  }

  .forFromData {
    background: #F4FBFD;
    display: inline
  }

  .voSocketClass {
    padding: 3px 45px 10px 0px;
    color: #6F6B6E;
    font-size: 18px;
    float: right
  }

  .orderStatuNameClass {
    color: #FC1A40;
  }

  /*二维码大小*/
  .qrcode {
    width: 20rem !important;
    height: 20rem !important;
    margin: 0 auto;
  }

  .dialogClass {
    text-align: center
  }

</style>
