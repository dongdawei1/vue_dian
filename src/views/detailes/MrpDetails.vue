<template>
  <div  class="mrpDetails">
    <div class="mrpDetailsBody">
    <div class="titleAll">{{mrp.releaseTitle}}</div>
    <div  class="mrpDetailsJichu">
      <div  class="mrpDetailsfuwu">
      服务类别 : {{mrp.releaseType}}<br>
      服务区域 : {{mrp.serviceDetailed}}<br>
      联 系 人 : {{mrp.consigneeName}}<br>
      联系方式 : {{mrp.contact}}<br>
      公司名称 : {{mrp.companyName}}<br>
      发布时间 : {{mrp.createTime}}<br>
      备    注 : {{mrp.remarks}}<br>
      服务次数 : {{mrp.servicFrequenc}}<br>
      起步价格 : {{mrp.startPrice}}<br>
      </div>

        <ReservationService></ReservationService>
    </div>

      <div class="juzhong">服务介绍 </div>
      <div class="fuwujieshao">  &emsp; &emsp; {{mrp.serviceIntroduction}}<br></div>
      <!--引入评价-->
      <Evaluate :tableData="tableData" ></Evaluate>
      <div class="juzhong">服务图片</div>


    <div  class="mrpDetailsUrlall">
      <li v-for="(p, index) in this.fileList" :key="index">
        <div class="mrpDetailsUrlno">
        <img :src="p.url"  >
        </div>
      </li>
    </div>
  </div>

    <!--引入评价-->
    <DibuBunner :tableData="tableBunner" ></DibuBunner>
  </div>
</template>
<script>

  import Evaluate from '../../components/pages/Evaluate';
  import { getMrpDetails } from '../../api/api';
  import ReservationService from "../../components/pages/ReservationService";
  import DibuBunner from "../../components/pages/DibuBunner";
  export default {
    name:'mrpDetails',
    components: {ReservationService, Evaluate,DibuBunner},
    data() {
      return {
        id:this.$route.params.id,
        releaseType:this.$route.params.releaseType,
        tableData:{
          permissionid:13
        },
        tableBunner:{
          permissionid:'',
          bunnerType:1
        },
        StringPath:'menuAndRenovationAndPestControl',
        mrp:{
          releaseType:'',
        },
        fileList:[],
      }
    },

    created () {
      this.tableBunner.permissionid=this.releaseType;
      this.getMrpDetails();

    },
    methods: {
      getMrpDetails(){
        getMrpDetails(this.id).then(res =>{
          if(res.status===0){
          this.mrp=res.data.mrp;
          if(this.mrp.releaseType===13){
            this.mrp.releaseType='菜谱制作/户外广告/灯箱/印刷';
          }else if(this.mrp.releaseType===17){
            this.mrp.releaseType='装修服务';
          }else if(this.mrp.releaseType===19){
            this.mrp.releaseType='灭虫服务';
          }
          let pictureUrl=JSON.parse(this.mrp.pictureUrl);
          let list=[];
           for(let i=0;i<pictureUrl.length;i++){
           let   picture=pictureUrl[i];
             let filepicture={"name":picture.userName ,"url":picture.pictureUrl};
             list= list.concat(filepicture);
           }
            this.fileList=list;
            this.tableData=res.data.evaluate;
            }else {
            this.$msgdeal(res.msg);
            return false;
          }


        }); }
    }
  }
</script>
<style>
  .mrpDetails{



    /*margin:25px 50px 75px 100px;
上边距为25px
右边距为50px
下边距为75px
左边距为100px*/
  }
  .mrpDetailsBody{
    background-color: #F0F6D6;
    margin:20px 0px 0px 0px;
    padding:5px 5px 3px 8%;
  }
  .mrpDetailsJichu{
    margin:10px 0px 10px 30px;
    color:#21292E;
    display: flex;
  }

  .mrpDetailsfuwu{
    margin:10px 40% 10px 30px;
    color:#21292E;
  }
  .juzhong{
    font-size: 18px;
    padding:5px 5px 3px 35%;

  }
  img{

    display: block;
    width: 75%;  /*图片款*/
    text-align:center;
    height:600px;   /*设置图片的高度*/
  }
  .fuwujieshao{
    width: 80%;
    margin:8px 10% 10px 30px;
  }

.mrpDetailsUrlno{
  padding:5px 5px 3px 8%; /*调整图片*/
}
</style>
