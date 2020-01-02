<template>
  <div>
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
                prop="orderCommonOffer.saleUserAddressDetailed"
                label="地址"
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
                show-overflow-tooltip>

                <template slot-scope="scope">
                  <el-button @click="choice(scope.row,props.row )" type="text" size="small"
                             v-if="props.row.orderStatu11"
                             v-loading.fullscreen.lock="fullscreenLoading">选择此商户
                  </el-button>
                </template>


              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="voOrder.createTime"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="收货时间"
        prop="voOrder.giveTakeTime"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="预估价格(元)"
        prop="voOrder.commodityJiage"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="订单状态"
        prop="orderStatuName"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="报价剩余时间"
        prop="orderStatuName"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="操作"
        prop="">

        <template slot-scope="scope">
          <el-button @click="operationRow(scope.row,1)" type="text" size="small"
                     v-if="scope.row.orderStatu11 || scope.row.orderStatu12"
                     v-loading.fullscreen.lock="fullscreenLoading">关单
          </el-button>

          <el-button @click="operationRow(scope.row,2)" type="text" size="small"
                     v-if="scope.row.orderStatu12"
                     v-loading.fullscreen.lock="fullscreenLoading">支付定金
          </el-button>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>


<script>
  import {get_conduct_purchase_order} from '../../../api/api';
  import {isRoleMessage} from '../../../api/api';


  export default {
    data() {
      return {
        tableData: [],
        fullscreenLoading: false,
      }
    },

    created() {
      this.checke_isButten();
    },
    methods: {
      checke_isButten() {
        get_conduct_purchase_order().then(res => {
          if (res.status === 0) {
            console.log(111)
            console.log(res)
            this.tableData = res.data.listPurchaseSeeOrderVo;
            console.log(this.tableData)

          } else {
            isRoleMessage(res);
          }
        });
      },
      choice(scope, props) {
        this.fullscreenLoading = true;

        console.log(scope);
        console.log(props)
      },
      operationRow(scope, type) {
        //type=1  关单， 2支付定金

      },
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
</style>
