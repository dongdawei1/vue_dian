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

    <el-row  :gutter="20"  >
      <el-col  :span="6"   v-for="item in tableData" :key="item.id">
        <div  class="grid-content bg-purple">
          <div class="card-img">
            <img :src="item.img" alt="">
          </div>
          <div class="card-desc panel-body">
            <h2>{{ item.id }}</h2>
            <p>{{ item.brand }}</p>
            <p>{{ item.commodityName }}</p>
            <a :href="item.detailUrl">
              more >
            </a>
          </div>

          显示商品名称   同行规格，换行 品牌，产地，换行价格，是否在价格有效期，

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

    mounted() {
      console.log(2223232)
      console.log(this.tableData)
    }
  }
</script>
<style>

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #e5e9f2;
  }
  .bg-purple {
    background: #e5e9f2;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }







  img{
    display: block;
    width: 100%
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
