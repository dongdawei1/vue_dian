<template>
  <div  class="mrpDetails">
    <div class="mrpDetailsBody">
      <div class="titleAll">{{result.releaseTitle}}</div>
      <div  class="mrpDetailsJichu">
        <div  class="mrpDetailsfuwu">
          发布类型 : {{result.releaseType}}<br>
          联 系 人 : {{result.consigneeName}}<br>
          联系方式 : {{result.contact}}<br>
          备    注 : {{result.remarks}}<br>
          发布时间 : {{result.createTime}}<br>
          所在城区 : {{result.detailed}}<br>
          服务区域 : {{result.serviceDetailed}}<br>
          <div >
            <el-table
              :data="result.serviceAndprice"
              style="width: 100%">
              <el-table-column label="商品名称和价格" >
                <el-table-column
                  prop="project"
                  label="具体商品"
                  width="224">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="具体价格(元)"
                  width="120">
                </el-table-column>
              </el-table-column>
            </el-table>

          </div>

          <br>实名详情<br>
          企业名称 : {{realName.companyName}}<br>
          实名城市 : {{realName.detailed}}<br>
          实名地址 : {{realName.addressDetailed}}<br>
        </div>

        <ReservationService></ReservationService>
      </div>

      <div class="juzhong">具体介绍 </div>
      <div class="fuwujieshao">  &emsp; &emsp; {{result.serviceIntroduction}}<br></div>

      <div class="juzhong">图片详情</div>


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

  import {  isRoleMessage } from '../../api/api';
  import { getFoodAndGrainDetails } from '../../api/api';
  import { getRealNameById } from '../../api/api';

  import ReservationService from "../../components/pages/ReservationService";
  import DibuBunner from "../../components/pages/DibuBunner";
  export default {
    name:'foodAndGrainDetails',
    components: {ReservationService, DibuBunner},
    data() {
      return {
        id:this.$route.params.id,
        releaseType:this.$route.params.releaseType,
        tableBunner:{
          permissionid:'',
          bunnerType:1
        },
        result:{
          releaseType:'',
          serviceAndprice:[],
        },
        fileList:[],
        realName:'',
      }
    },

    created () {
      this.tableBunner.permissionid=this.releaseType;
      this.getMrpDetails();

    },
    methods: {
      getMrpDetails(){

        getFoodAndGrainDetails(this.id).then(res =>{
          if(res.status===0){
            this.result=res.data.result;
            if(this.result.releaseType===4){
              this.result.releaseType='蔬菜';
            }else if(this.result.releaseType===5){
              this.result.releaseType='粮油';
            }else if(this.result.releaseType===6){
              this.result.releaseType='副食/调料';
            }else if(this.result.releaseType===29){
              this.result.releaseType='水产/禽蛋';
            }
            let pictureUrl=JSON.parse(this.result.pictureUrl);
            this.result.serviceAndprice=JSON.parse(this.result.serviceAndprice);
            let list=[];
            for(let i=0;i<pictureUrl.length;i++){
              let   picture=pictureUrl[i];
              let filepicture={"name":picture.userName ,"url":picture.pictureUrl};
              list= list.concat(filepicture);
            }
            this.fileList=list;
            this.tableData=res.data.evaluate;
            this. getRealName();
          }else {
            isRoleMessage(res.msg);
          }
        }); },

      getRealName(){
        getRealNameById(this.result.realNameId).then(res =>{
          if(res.status===0){
            this.realName=res.data;
          }else {
            isRoleMessage(res.msg);
          }
        });
      }
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
  /*.el-table thead{*/
  /*color:#21292E;*/
  /*}*/
  table {
    display: table;
    border-collapse: separate;
  }
  .el-table__header{
    color:#21292E
  }
  table__header {
    table-layout: fixed;
    border-collapse: separate;

  }
</style>
