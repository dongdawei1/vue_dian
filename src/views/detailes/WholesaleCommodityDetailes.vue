<template>
  <div  class="mrpDetails">
    <div class="mrpDetailsBody">
      <div class="titleAll">{{wholesaleCommodity.releaseTitle}}</div>
      <div  class="mrpDetailsJichu">
        <div  class="mrpDetailsfuwu">
          商品名称 : {{wholesaleCommodity.serviceType}}<br>
          单价(元) : {{wholesaleCommodity.commodityJiage}}<br>
          包装方式 : {{commodityPackingName}}<br>
          剩余数量 : {{wholesaleCommodity.commoditySurplusNo}}{{commodityPackingFangshi}}<br>
          交易次数 : {{wholesaleCommodity.servicFrequenc}}<br>
          商品产地 : {{wholesaleCommodity.detailed}}<br>
          产地详情 : {{wholesaleCommodity.addressDetailed}}<br>
          价格到期日 : {{wholesaleCommodity.endTime}}<br>
          备    注 : {{wholesaleCommodity.remarks}}<br>

         <br>实名详情<br>
          联 系 人 : {{realName.consigneeName}}<br>
          联系方式 : {{realName.contact}}<br>
          市场名称 : {{realName.companyName}}<br>
          市场地址 : {{realName.addressDetailed}}<br>
        </div>

        <ReservationService></ReservationService>
      </div>
      <div class="buttonGoumai">
        <el-form :model="wholesaleCommodity" ref="wholesaleCommodity" label-width="100px" class="demo-ruleForm">
        <div v-if="isDianhua">  <el-button type="primary" disabled>电话联系卖家吧！</el-button></div>
        <div v-if="isXiadan">
          购买数量(整数):&emsp;<el-input-number v-model.number="wholesaleCommodity.commodityReserveNo"  :min="1" :max="max"
        >
        </el-input-number>{{commodityPackingFangshi}}&emsp;
          <el-button type="primary" @click="examineClick" v-loading.fullscreen.lock="fullscreenLoading">购买</el-button>
        </div>

        </el-form>
      </div>
      <div class="juzhong">商品介绍 </div>
      <div class="fuwujieshao">  &emsp; &emsp;&emsp;{{wholesaleCommodity.serviceIntroduction}}<br></div>


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
  import { getWholesaleCommodityPublicId } from '../../api/api';
  import ReservationService from "../../components/pages/ReservationService";
  import DibuBunner from "../../components/pages/DibuBunner";
  export default {
    name:'mrpDetails',
    components: {ReservationService, Evaluate,DibuBunner},
    data() {
      return {
        id:this.$route.params.id,
        releaseType:this.$route.params.releaseType,

        releaseTypeName:'',
        commodityPackingName:'',//包装规格
        commodityPackingFangshi:'',//包装方式
        wholesaleCommodity:{
          releaseType:'',
          commodityReserveNo:'',
        },

        tableData:{
          permissionid:''
        },
        tableBunner:{
          permissionid:9,
          bunnerType:2
        },
        realName:'',
        fileList:[],
        isDianhua:false,
        isXiadan:false,
      //  dialogFormVisible: false,        //购买弹窗


        fullscreenLoading:false,
        max:'',//最大购买量

      }
    },



    created () {
      this.tableBunner.permissionid= Number(this.releaseType);
      this.tableData.permissionid=this.releaseType;
      this.getMrpDetails();

    },
    methods: {
      examineClick(){ //点击打开购买弹窗
        this.fullscreenLoading=true;

        if(this.wholesaleCommodity.commodityPacking===1){
        if ( /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(this.wholesaleCommodity.commodityReserveNo)) {

          console.log(this.wholesaleCommodity)

         this.fullscreenLoading=false;
          return true;
        }
        this.fullscreenLoading=false;
        this.$message({
          type: 'error',
          message: '购买数量只能是数字最多2位小数',
          duration: 1500
        });
        return false;
        }else{
          if (  /^\+?[1-9][0-9]*$/.test(this.wholesaleCommodity.commodityReserveNo)) {
            console.log(this.wholesaleCommodity)
            this.fullscreenLoading=false;
            return true;
          }
          this.fullscreenLoading=false;
          this.$message({
            type: 'error',
            message: '购买数量只能是正整数',
            duration: 1500
          });
          return false;
        }
      },

      getMrpDetails(){
        getWholesaleCommodityPublicId(this.id).then(res =>{
          if(res.status===0){

            this.wholesaleCommodity=res.data.wholesaleCommodity;
            let  releaseType= this.wholesaleCommodity.releaseType;
             if(releaseType===4){
               this.releaseTypeName='蔬菜';
             }else if(releaseType===5){
               this.releaseTypeName='粮油';
             }else if(releaseType===6){
               this.releaseTypeName='调料/副食';
             }else if(releaseType===9){
               this.releaseTypeName='清洁用品';
             }else if(releaseType===29){
               this.releaseTypeName='水产/禽蛋';
             }


            let  commodityPacking=this.wholesaleCommodity.commodityPacking;
            let specifi=this.wholesaleCommodity.specifi;
            if(commodityPacking===1){
              this.commodityPackingName='散装称重(kg)';
              this.commodityPackingFangshi='kg';
            }else if(commodityPacking===2){
              if(specifi===1){
                this.commodityPackingName=this.wholesaleCommodity.cations+'g'+'/袋';
              }else  if(specifi===2){
                this.commodityPackingName=this.wholesaleCommodity.cations+'kg'+'/袋';
              }
              this.commodityPackingFangshi='袋';
            }else if(commodityPacking===3){
              if(specifi===3){
                this.commodityPackingName=this.wholesaleCommodity.cations+'ML'+'/瓶/桶';
              }else  if(specifi===4){
                this.commodityPackingName=this.wholesaleCommodity.cations+'L'+'/瓶/桶';
              }
              this.commodityPackingFangshi='瓶/桶';
            }


            let reserve=this.wholesaleCommodity.reserve;
            if(reserve===1){
                this.isXiadan=true;
            }else{
              this.isDianhua=true;
            }
            this.max=this.wholesaleCommodity.commoditySurplusNo;
            this.realName=res.data.realName;
            let pictureUrl=JSON.parse(this.wholesaleCommodity.pictureUrl);
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
  .buttonGoumai{
    margin:10px 5% 10px 0px;
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
