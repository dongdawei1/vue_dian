<template>
  <div>
    <div v-if="voSocket" class="voSocketClass">
      有进行中订单,数据每2分钟刷新一次
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
                      品质中:{{scope.row.evaluate.zhilianghao}}人次<br>
                      品质差:{{scope.row.evaluate.zhilianghao}}人次<br>
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
                  <el-button @click="choice(scope.row,props.row, 13)" type="text" size="small"

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
        label="该状态剩余处理时间"
        prop="orderStatuName"
        width="180"
        show-overflow-tooltip>
        <template slot-scope="props">
          <span v-if="props.row.orderStatu11" class="orderStatuNameClass">
          <MvCountDown
            @startCallback=""
            @endCallback="checke_isButten"
            :startTime="new Date().getTime()"
            :endTime="headercell(props.row)"
            :endText="'报价结束'"
            :nameText="'报价剩余'"
            :dayTxt="'天'"
            :hourTxt="'小时'"
            :minutesTxt="'分'"
            :secondsTxt="'秒'"
            :isStart="props.row.orderStatu11"
          ></MvCountDown>
          </span>
          <span v-if="props.row.orderStatu18" class="orderStatuNameClass">
          <MvCountDown
            @startCallback="countDownS"
            @endCallback="operationRow(props.row,18)"
            :startTime="new Date().getTime()"
            :endTime="headercel8(props.row)"
            :endText="'超时未选择商家-关单'"
            :nameText="'选择商家剩余'"
            :dayTxt="'天'"
            :hourTxt="'小时'"
            :minutesTxt="'分'"
            :secondsTxt="'秒'"
            :isStart="props.row.orderStatu18"
          ></MvCountDown>
          </span>
          <span v-if="props.row.orderStatu13" class="orderStatuNameClass">
                      <MvCountDown15
                        @startCallback=""
                        @endCallback=""
                        :startTime="new Date().getTime()"
                        :endTime="headercel3(props.row,15)"
                        :endText="'超时未支付质保金-关单'"
                        :nameText="'付质保金剩余'"
                        :dayTxt="'天'"
                        :hourTxt="'小时'"
                        :minutesTxt="'分'"
                        :secondsTxt="'秒'"
                        :isStart="props.row.orderStatu13"
                      ></MvCountDown15>
          </span>

          <span v-if="props.row.orderStatu12" class="orderStatuNameClass">
                      <MvCountDown12
                        @startCallback=""
                        @endCallback="operationRow(props.row,19)"
                        :startTime="new Date().getTime()"
                        :endTime="headercel3(props.row,15)"
                        :endText="'超时未支付定金-关单'"
                        :nameText="'付定金剩余'"
                        :dayTxt="'天'"
                        :hourTxt="'小时'"
                        :minutesTxt="'分'"
                        :secondsTxt="'秒'"
                        :isStart="props.row.orderStatu12"
                      ></MvCountDown12>
          </span>
          <span
            v-if="!props.row.orderStatu11 && !props.row.orderStatu18 && !props.row.orderStatu13 && !props.row.orderStatu12">--</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        prop="">

        <template slot-scope="scope">
          <el-button @click="operationRow(scope.row,3)" type="text" size="small"
                     v-if="scope.row.orderStatu11 || scope.row.orderStatu12"
                     v-loading.fullscreen.lock="fullscreenLoading">关单
          </el-button>

          <el-button @click="payOrder(scope.row.voOrder.id)" type="text" size="small"
                     v-if="scope.row.orderStatu12"
                     v-loading.fullscreen.lock="fullscreenLoading">支付定金(微信扫码支付)
          </el-button>

          <el-button @click="operationRow(scope.row,11)" type="text" size="small"
                     v-if="scope.row.orderStatu3 "
                     v-loading.fullscreen.lock="fullscreenLoading">再次开启发布
          </el-button>
          <el-button @click="operationRow(scope.row,11)" type="text" size="small"
                     v-if=" scope.row.orderStatu17"
                     v-loading.fullscreen.lock="fullscreenLoading">无销售商报价重新发布
          </el-button>

          <el-button @click="operationRow(scope.row,11)" type="text" size="small"
                     v-if=" scope.row.orderStatu20"
                     v-loading.fullscreen.lock="fullscreenLoading">未支付质保金重新发布
          </el-button>
          <el-button @click="operationRow(scope.row,11)" type="text" size="small"
                     v-if=" scope.row.orderStatu19"
                     v-loading.fullscreen.lock="fullscreenLoading">未支付定金重新发布
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
          <el-button @click="" type="text" size="small"
                     v-if="scope.row.orderStatu13"
                     disabled>待销售商支付保证金
          </el-button>
          <!--有人报价可以选择关单-->
          <el-button @click="operationRow(scope.row,3)" type="text" size="small"
                     v-if="scope.row.orderStatu18"
                     v-loading.fullscreen.lock="fullscreenLoading">关单
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
  import {isRoleMessage} from '../../../api/api';
  import {operation_purchase_order} from '../../../api/api';
  import {native_pay_order} from '../../../api/api';

  import QRCode from 'qrcode'; //引入生成二维码插件
  import MvCountDown from '../../../components/MvCountDown/MvCountDown.vue'
  import MvCountDown15 from '../../../components/MvCountDown/MvCountDown15.vue'
  import MvCountDown12 from '../../../components/MvCountDown/MvCountDown12.vue'

  export default {
    components: {
      MvCountDown,
      MvCountDown12,
      MvCountDown15,
      QRCode: QRCode

    },
    data() {
      return {
        tableData: [],
        centerDialogVisible: false,//二维码弹窗
        fullscreenLoading: false,
        //order:'',
        myInterval: null,
        voSocket: false,
        isLunxun: false,
        codes: '',


      }
    },

    created() {
      this.checke_isButten();
    },
    methods: {
      checke_isButten() {
        let uuid = Date.parse(new Date());
        get_conduct_purchase_order(uuid).then(res => {
          if (res.status === 0) {
            console.log(res)
            this.tableData = res.data.listPurchaseSeeOrderVo;
            if (res.data.voSocket === 0) {
              this.initList(2);
              this.voSocket = true;
            } else {
              this.voSocket = false;
              this.beforeDestroy();
            }
          } else {
            isRoleMessage(res);
          }
        });
      },
      //获取微信支付二维码链接
      payOrder(id) {
        this.fullscreenLoading = true;
        native_pay_order(id).then(res => {
          this.fullscreenLoading = false;
          console.log(res)
          if (res.status === 0) {
            let codeUrl = res.msg;
            this.useqrcode(codeUrl)
          } else {
            isRoleMessage(res.msg);
          }
        });
      },
      //生成二维码
      useqrcode(codeUrl) {
        console.log(codeUrl)
        this.centerDialogVisible = true;
        this.$nextTick(() => { //不加这个第一次打开弹窗时canvas=null
          var canvas = document.getElementById('canvas')
          console.log(canvas)
          QRCode.toCanvas(canvas, codeUrl, function (error) {
            if (error){
              this.message.error("生成二维码失败，刷新后重试");
            }
          })
        })
      },

//轮询开始
      initList(num) {
        console.log(num);
        if (num === null || num === '' || num === undefined) {
          console.log(num);
          num = 2;
        }
        this.beforeDestroy();
        if (this.$route.path === '/home/release') {
          this.myInterval = window.setInterval(() => {
            setTimeout(() => {
              this.checke_isButten() //调用接口的方法
            }, 1)
          }, num * 1000 * 60);
        } else {
          this.voSocket = false;
          this.beforeDestroy();
        }
      },

      //轮询关闭
      beforeDestroy() {
        clearInterval(this.myInterval);
        this.myInterval = null;
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
            isRoleMessage(res.msg);
          }
        });
      },
      operationRow(scope, type) {
        console.log(type)
        let order = {};
        order.id = scope.voOrder.id;
        order.type = type;
        operation_purchase_order(order).then(res => {
          if (res.status === 0) {
            this.checke_isButten();
          } else {
            isRoleMessage(res.msg);
          }
        });

        //11--》3关单  或者 13 抢单确认-->12 支付按键-->支付成功变成4 （送货者操作4 变成16） --> 16 确认

        // -->状态==5  （去评价）   status==3|| 17   传给后端 11再次开启
      },
      //倒计时相关开始
      headercell(row) {
        if (row.orderStatu11 === true) {
          //获取创建时间
          let newDateGetTime = new Date().getTime();
          let date2 = new Date(row.voOrder.createTime);
          //获取时间差 毫秒，getTime()获取毫秒值
          let second = newDateGetTime - date2.getTime();
          if (second < 1800000) {
            return newDateGetTime + 1800000 - second;
          } else {
            return 0;
          }
        }
      },
      //超过30分钟有报价，给15分钟buffer
      headercel8(row) {
        if (row.orderStatu18 === true) {
          //获取创建时间
          let newDateGetTime = new Date().getTime();
          let date2 = new Date(row.voOrder.createTime);
          //获取时间差 毫秒，getTime()获取毫秒值
          let second = newDateGetTime - date2.getTime();
          if (second > 1800000 && second <= 45 * 60 * 1000) {
            return newDateGetTime + 45 * 60 * 1000 - second;
          } else {
            return 0;
          }
        }
      },
      //待销售支付定金15分钟
      headercel3(row, num) {
        if (row.orderStatu13 === true || row.orderStatu12 === true) {
          //获取创建时间
          let newDateGetTime = new Date().getTime();
          let date2 = new Date(row.voOrder.updateTime);
          //获取时间差 毫秒，getTime()获取毫秒值
          let second = newDateGetTime - date2.getTime();
          if (second < num * 60 * 1000) {
            return newDateGetTime + num * 60 * 1000 - second;
          } else {
            return 0;
          }
        }
      },


      countDownS(x) {
        // 开始倒计时回调
        // console.log(x)
      },
      countDownE() {
        // 结束倒计时回调
        this.checke_isButten();
      }
      //倒计时相关结束
    },
    watch: {
      "$route": 'initList'    // 要watch route , 一旦发生变化，就调用 fetchData方法
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
    margin:0 auto;
  }
  .dialogClass{
    text-align:center
  }

</style>
