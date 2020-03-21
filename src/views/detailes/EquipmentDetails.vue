<template>
  <div class="mrpDetails">
    <div class="mrpDetailsBody">
      <div class="titleAll">{{result.releaseTitle}}</div>
      <div class="mrpDetailsJichu">
        <div class="mrpDetailsfuwu">
          发布类型 : {{result.userType}}<br>
          <span v-if="result.releaseType===13 || result.releaseType===17 || result.releaseType===19">
           起步价格(元)： {{result.mianjia}}<br>
          </span>
          联 系 人 : {{result.consigneeName}}<br>
          备 注 : {{result.remarks}}<br>

          <span v-if="result.releaseType!==14 && result.releaseType!==15">
           服务区域 : {{result.serviceDetailed}}<br>
          </span>
          <span v-if="result.releaseType===14 || result.releaseType===15">
           出租面积(平米)： {{result.mianjia}}<br>
           出租地址： {{result.serviceDetailed}}<br>
          </span>
          <span v-if="result.serviceType!==14 && result.releaseType!==15 &&
             result.releaseType!==13 && result.releaseType!==17 && result.releaseType!==19">
           类型： {{result.serviceType}}<br>
          </span>

          <div>
            <el-table
              :data="result.serviceAndprice"
              style="width: 100%">
              <el-table-column label="具体服务/商品和价格">
                <el-table-column
                  prop="project"
                  label="具体维修项目/设备型号"
                  width="224">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="参考价格(元)"
                  width="120">
                </el-table-column>
              </el-table-column>
            </el-table>

          </div>

          <br>实名详情<br>
          企业名称 : {{result.updateTime}}<br>
          联系方式 : {{result.contact}}<br>
          所在城区 : {{result.detailed}}<br>
          联系地址 : {{result.realNameId}}<br>
          发布时间 : {{result.createTime}}<br>
        </div>
        <!-- 线上操作 提示敬请期待-->
        <ReservationService></ReservationService>
      </div>

      <div class="juzhong">具体介绍</div>
      <div class="fuwujieshao"> &emsp; &emsp; {{result.serviceIntroduction}}<br></div>

      <div class="juzhong">图片详情</div>


      <div class="mrpDetailsUrlall">
        <li v-for="(p, index) in this.fileList" :key="index">
          <div class="mrpDetailsUrlno">
            <img :src="p.url">
          </div>
        </li>
      </div>
    </div>
    <!--引入评价-->
    <Evaluate :tableData="tableData"></Evaluate>
    <!-- 轮播广告-->
    <DibuBunner :tableData="tableBunner"></DibuBunner>
  </div>
</template>
<script>

  import {getfabubyid} from '../../api/api';

  import ReservationService from "../../components/pages/ReservationService";
  import DibuBunner from "../../components/pages/DibuBunner";
  import Evaluate from '../../components/pages/Evaluate';

  export default {
    name: 'equipmentDetails',
    components: {
      ReservationService,
      DibuBunner,
      Evaluate
    },
    data() {
      return {
        id: this.$route.params.id,
        releaseType: this.$route.params.releaseType,
        tableData: {}, //评价
        tableBunner: {
          permissionid: '',
          bunnerType: 2 //详情页轮播
        },
        result: {
          releaseType: '',
          serviceAndprice: [],
        },
        fileList: [],
        realName: '',
      }
    },

    created() {
      this.tableBunner.permissionid = this.releaseType;
      this.getMrpDetails();

    },
    methods: {
      getMrpDetails() {
        if (!this.$fsAuthent()) {
          return false;
        }
        getfabubyid(this.id).then(res => {
          console.log(res)
          if (res.status === 0) {
            this.result = res.data.fabu;
            //传入评价
            this.tableData = res.data.evaluate;

            let pictureUrl = JSON.parse(this.result.pictureUrl);
            this.result.serviceAndprice = JSON.parse(this.result.serviceAndprice);
            let list = [];
            for (let i = 0; i < pictureUrl.length; i++) {
              let picture = pictureUrl[i];
              let filepicture = {"name": picture.userName, "url": picture.pictureUrl};
              list = list.concat(filepicture);
            }
            this.fileList = list;
          } else {
            this.$msgdeal(res.msg);
          }
        });
      }
    }
  }
</script>
<style>
  .mrpDetails {


    /*margin:25px 50px 75px 100px;
上边距为25px
右边距为50px
下边距为75px
左边距为100px*/
  }

  .mrpDetailsBody {
    background-color: #F0F6D6;
    margin: 20px 0px 0px 0px;
    padding: 5px 5px 3px 8%;
  }

  .mrpDetailsJichu {
    margin: 10px 0px 10px 30px;
    color: #21292E;
    display: flex;
  }

  .mrpDetailsfuwu {
    margin: 10px 40% 10px 30px;
    color: #21292E;
  }

  .juzhong {
    font-size: 18px;
    padding: 5px 5px 3px 35%;

  }

  img {

    display: block;
    width: 75%; /*图片款*/
    text-align: center;
    height: 600px; /*设置图片的高度*/
  }

  .fuwujieshao {
    width: 80%;
    margin: 8px 10% 10px 30px;
  }

  .mrpDetailsUrlno {
    padding: 5px 5px 3px 8%; /*调整图片*/
  }

  /*.el-table thead{*/
  /*color:#21292E;*/
  /*}*/
  table {
    display: table;
    border-collapse: separate;
  }

  .el-table__header {
    color: #21292E
  }

  table__header {
    table-layout: fixed;
    border-collapse: separate;

  }
</style>
