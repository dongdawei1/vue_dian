<template>

  <div class="dibuBunner">
    <div class="res1"  v-if="res1">
      <div class="dibuBunnerbiaoti">超值活动</div>
      <div class="dibuBunnerreleaseTitle"> {{ resData1.dibuBunnerbiaoti}}</div>
      <div class="dibuBunnerjieshao">
         {{resData1.releaseType}}<br>
        <span v-for="item in resData1.introduceList" >
          {{item.name}} : {{item.value}}<br>
        </span>
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

    <div class="res1"  v-if="res2">
      <div class="dibuBunnerbiaoti">超值活动</div>
      <div class="dibuBunnerreleaseTitle"> {{ resData2.dibuBunnerbiaoti}}</div>
      <div class="dibuBunnerjieshao">
        {{resData2.releaseType}}<br>
        <span v-for="item in resData2.introduceList" >
          {{item.name}} : {{item.value}}<br>
        </span>
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
  export default {
    props: ["tableData"],
    data: function () {
      return {
        res1:false,
        res2:false,
        resData1:{
          introduceList:[]
        },
        resData2:{
          introduceList:[]
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
        this.tableData={
          permissionid:6,
          bunnerType:0
        };

        getBunner(this.tableData).then((res) => {
          console.log(this.tableData)
          if(res.status===0) {
            console.log(res)
            if(res.data.length!==0){
             let list=res.data;
                if(list.length===1){
                  this.res1=true;
                  this.resData1=list[0];
                  this.resData1.introduceList=JSON.parse(this.resData1.introduceList);
                }else {
                  this.res1=true;
                  this.resData1=list[0];
                  this.resData1.introduceList=JSON.parse(this.resData1.introduceList);
                  this.res2=true;
                  this.resData2=list[1];
                  this.resData2.introduceList=JSON.parse(this.resData2.introduceList);

                }
            }
          }else {
            this.$msgdeal(res.msg);
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
