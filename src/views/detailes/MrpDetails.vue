<template>
  <div  class="mrpDetails">
    <div  class="mrpDetailsJichu">
      服务类别:{{mrp.releaseType}}<br>
      服务区域:{{mrp.serviceDetailed}}<br>
      联 系 人:{{mrp.consigneeName}}<br>
      联系方式:{{mrp.contact}}<br>
      公司名称:{{mrp.companyName}}<br>
      公司地址:{{mrp.addressDetailed}}<br>
    </div>
    <div  class="mrpDetailsfuwu">
      创建时间:{{mrp.createTime}}<br>
      备    注:{{mrp.remarks}}<br>
      服务次数:{{mrp.servicFrequenc}}<br>
      起步价格:{{mrp.startPrice}}<br>
      服务介绍:{{mrp.serviceIntroduction}}<br>
      服务图片:  <br>
    </div>
    <!--引入评价-->
    <div  class="mrpDetailsUrlall">
      <li v-for="(p, index) in this.fileList" :key="index">
        <img :src="p.url"  >
      </li>
    </div>
  </div>
</template>
<script>


  import {  checke_isButten } from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  import {  operation_usermrp } from '../../api/api';
  import { echo_display } from '../../api/api';
  import { getMrpDetails } from '../../api/api';


  export default {
    name:'mrpDetails',
    data() {
      return {
        id:this.$route.params.id,
        StringPath:'menuAndRenovationAndPestControl',
        mrp:{
          releaseType:'',
        },
        fileList:[],
      }
    },

    created () {
      this.getMrpDetails();

    },
    methods: {
      getMrpDetails(){
        getMrpDetails(this.id).then(res =>{
          if(res.status===0){
          this.mrp=res.data;
          if(this.mrp.releaseType===13){
            this.mrp.releaseType='菜谱制作/户外广告/灯箱/印刷';
          }else if(this.mrp.releaseType===17){
            this.mrp.releaseType='装修服务';
          }else if(this.mrp.releaseType===19){
            this.mrp.releaseType='灭虫';
          }
          let pictureUrl=JSON.parse(this.mrp.pictureUrl);
          let list=[];
           for(let i=0;i<pictureUrl.length;i++){
           let   picture=pictureUrl[i];
             let filepicture={"name":picture.userName ,"url":picture.pictureUrl};
             list= list.concat(filepicture);
           }
            this.fileList=list;
            }else {
            isRoleMessage(res.msg);
          }


        }); }
    }
  }
</script>
<style>
  .mrpDetails{
    background-color: #D3DCE6;
    margin:20px 0px 10px 0px;

    /*margin:25px 50px 75px 100px;
上边距为25px
右边距为50px
下边距为75px
左边距为100px*/
  }
  img{

    display: block;
    width: 60%;
    text-align:center;
    height:600px;   /*设置图片的高度*/
  }

  .mrpDetailsUrlall{
    margin:8px 10px 10px 30px;
  }


</style>
