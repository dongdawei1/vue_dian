<template>
  <div class="mrpDetails">
    <div class="mrpDetailsBody">
      <div class="titleAll">{{rent.releaseTitle}}</div>
      <div class="mrpDetailsJichu">
        <div class="mrpDetailsfuwu">
          出租类别 : {{rent.releaseType}}<br>
          联 系 人 : {{rent.consigneeName}}<br>
          备 注 : {{rent.remarks}}<br>
          发布时间 : {{rent.createTime}}<br>
          使用面积 : {{rent.fouseSize}}<br>
          出租地址 : {{rent.serviceDetailed}}<br>
          <br>实名详情<br>
          企业名称 : {{rent.companyName}}<br>
          联系方式 : {{rent.contact}}<br>
          所在城区 : {{rent.detailed}}<br>
          联系地址 : {{rent.realNameId}}<br>
        </div>

        <ReservationService></ReservationService>
      </div>

      <div class="juzhong">具体介绍</div>
      <div class="fuwujieshao"> &emsp; &emsp; {{rent.serviceIntroduction}}<br></div>

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
    <DibuBunner :tableData="tableBunner"></DibuBunner>
  </div>
</template>
<script>

  import {get_rent_id} from '../../api/api';
  import ReservationService from "../../components/pages/ReservationService";
  import DibuBunner from "../../components/pages/DibuBunner";

  export default {
    name: 'rentDetails',
    components: {ReservationService, DibuBunner},
    data() {
      return {
        id: this.$route.params.id,
        releaseType: this.$route.params.releaseType,
        tableBunner: {
          permissionid: 3,
          bunnerType: 2
        },
        StringPath: 'menuAndRenovationAndPestControl',
        rent: {
          releaseType: '',
        },
        fileList: [],
      }
    },

    created() {
      this.tableBunner.permissionid = this.releaseType;
      this.getMrpDetails();

    },
    methods: {
      getMrpDetails() {

        get_rent_id(this.id).then(res => {
          if (res.status === 0) {
            this.rent = res.data;
            if (this.rent.releaseType === 14) {
              this.rent.releaseType = '店面/窗口出租';
            } else if (this.rent.releaseType === 15) {
              this.rent.releaseType = '摊位出租/转让';
            }
            let pictureUrl = JSON.parse(this.rent.pictureUrl);
            let list = [];
            for (let i = 0; i < pictureUrl.length; i++) {
              let picture = pictureUrl[i];
              let filepicture = {"name": picture.userName, "url": picture.pictureUrl};
              list = list.concat(filepicture);
            }
            this.fileList = list;
            this.tableData = res.data.evaluate;
            this.getRealName();
          } else {
            this.$msgdeal(res.msg);
            return false;
          }
        });
      },

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
</style>
