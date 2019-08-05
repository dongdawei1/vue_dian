<template>

  <div class="dibuBunner">
    <div class="res1"  v-if="res1">
      <div class="dibuBunnerbiaoti">超值活动</div>
      <div class="dibuBunnerreleaseTitle"> {{ resData1.releaseTitle}}</div>
      <div class="dibuBunnerjieshao">
        服务区域： {{resData1.serviceDetailed}}<br>
        起步价格： {{resData1.startPrice}} (元)<br>
      </div>
      <div class="dibuBunnerxiangqing">
        <el-button type="text"><router-link
          v-on:click.native="tiaozhuan(resData1.url)"
          to="" class="a" >查看详情</router-link></el-button>
      </div>
    </div>

    <div class="res1">
      <div class="dibuBunnerbiaoti">不是想要的？</div>
      <div class="dibuBunnerreleaseTitle"> 马上发布需求信息试试</div>
      <div class="dibuBunnerjieshao">
        信息发布商户主动找上门！<br>
        采购/招聘/简历/商品等都可以发布哦！
      </div>
      <div class="dibuBunnerxiangqing">
        <el-button type="text"><router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a" >马上发布</router-link></el-button>
      </div>
    </div>

    <div class="res1" v-if="res2">
      <div class="dibuBunnerbiaoti">超值活动</div>
      <div class="dibuBunnerreleaseTitle"> {{ resData2.releaseTitle}}</div>
      <div class="dibuBunnerjieshao">
        服务区域： {{resData2.serviceDetailed}}<br>
        起步价格： {{resData2.startPrice}} (元)<br>
      </div>
      <div class="dibuBunnerxiangqing">
        <el-button type="text"><router-link
          v-on:click.native="tiaozhuan(resData2.url)"
          to="" class="a" >查看详情</router-link></el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getBunner }  from '../../api/api';
  import {  isRoleMessage } from '../../api/api';
  export default {
    props: ["tableData"],
    data: function () {
      return {
        res1:false,
        res2:false,
        resData1:{
          url:''
        },
        resData2:{
          url:''
        },


      }
    },
    methods: {
       tiaozhuan(row){
         this.$router.push(row);
       },

      isAuthenticationM(){
        this.$router.push('/home/myRelease');  //带参数页面跳转  name:'editMAndRAndP',
        // id:this.$route.params.id,
      },

      getBunner(){
        getBunner(this.tableData).then((res) => {
          if(res.status===0) {
            if(res.data!==null){
             let list=res.data;
                if(list.length===1){
                  this.res1=true;
                  let res1= list[0];
                  this.resData1=res1.object;
                  this.resData1.url=res1.url;
                }else {
                  this.res1=true;
                 let res1= list[0];
                  this.resData1=res1.object;
                  this.resData1.url=res1.url;
                  this.res2=true;
                  let res2= list[1];
                  this.resData2=res2.object;
                  this.resData2.url=res2.url;

                }
            }
          }else {
            isRoleMessage(res.msg);
          }
        });

      }
    },

    mounted() {
      this.getBunner();
    }
  }
</script>
<style>
  .dibuBunner{
    height:260px;  /*高度*/
    /*background-color: #F0EFEB;*/
    display: flex;
    background-color:#F0EFEB;

  }

 .res1{
   background-color: #F0F6D6;
   margin: 17px 12px 30px 10px;
   width: 31%;
 }

  .dibuBunnerbiaoti{
    text-align:center;   /* 水平居中 */
    line-height: 65px;  /* 垂直剧终 */
    font-size: 18px;
    font-weight:bold;  /*字体加粗*/
  }
  .dibuBunnerreleaseTitle{
    font-size: 17px;
    padding:0px 0px 3px 30px;
  }
  .dibuBunnerjieshao{
    padding:0px 0px 3px 50px;
  }
  .dibuBunnerxiangqing{
    font-size: 16px;
    padding:0px 0px 3px 30px;
  }




</style>
