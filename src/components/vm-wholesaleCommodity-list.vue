<template>

  <div class="vm-image-list">
    <el-row >

      <el-row type="flex" align="middle" justify="space-between" class="panel-body">
        <div class="search-bar">
          <!--   <el-input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></el-input>-->
          <!-- <el-button type="ghost" @click="search"><i class="fa fa-search"></i></el-button>-->
        </div>
      </el-row>
    </el-row>

    <el-row  :gutter="10"  >  <!-- :gutter="10"列间距  :span="6"占100%的1/6   https://element.eleme.cn/#/zh-CN/component/layout-->
      <el-col  :span="6"   v-for="item in tableData.tableDatas" :key="item.id">
        <div  class="grid-content bg-purple">
          <div class="card-img">
            <img :src="item.pictureUrl" alt="">
          </div>
          <div class="card-desc">
            <div class="releaseTitle"> {{ item.releaseTitle}}</div>
            <div class="jieshao">
              商品名称： {{item.serviceType}}<br>
              商品单价： {{item.commodityJiage}} (元)<br>
              包装方式： {{item.commoditySpecifications}}<br>
            </div>
            <div class="xiangqing">
              <el-button type="text"><router-link
                v-on:click.native=""
                :to="'/details/wholesaleCommodityDetailes/'+ item.id+'/'+item.releaseType" class="xiangqing" target='_blank'>查看详情</router-link></el-button>
            </div>
            <!--<p>{{ item.brand }}</p>-->
            <!--<p>{{ item.commodityName }}</p>-->
            <!--<a :src="a">-->
            <!--more >-->
            <!--</a>-->
            <!--</a>-->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElPager from "element-ui/packages/pagination/src/pager";
  export default {
    components: {ElPager},
    props: ["tableData"],
    data: function () {
      return {

      }
    },
    methods: {

    },
    created () {

    },
    mounted() {
    }
  }
</script>
<style>
  .bg-purple {
    background: #FBF8F5;
  }

  .grid-content {
    margin-bottom: 6px; /*下边距 外*/
    /* border-radius: 10px;  div下圆角
      min-height: 3px; 段落最小高度 */
  }
  .card-desc{
    margin-bottom: 1px;
    padding:1px 0px 3px 3px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px  内*/
  }
  .releaseTitle{
    font-size: 16px;
    font-weight:bold;  /*字体加粗*/
  }
  .jieshao{
    font-size: 14px;
  }
  img{
    display: block;
    width: 100%;
    height:160px;   /*设置图片的高度*/
  }


  p{
    font-size: 14px;
    margin: 10px 0;
    text-align: justify;
    height: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
  }



</style>
