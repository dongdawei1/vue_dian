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
      <el-col  :span="6"   v-for="item in movieInfoList" :key="item.id">
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
<!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>




    <!-- 分页结束 -->
  </div>
</template>

<script>
  import { getPublishings } from '../api/api';
  import ElPager from "element-ui/packages/pagination/src/pager";
  export default {
    components: {ElPager},
    props: {
      title: {
        type: String,
        default: 'Image List'
      },
      // origin data
      dataInline: {
        type: Object
      }
    },
    data: function () {
      return {
        total: 0,
        currentPage: 1,

        infoList: [],
        movieInfoList: [],
        pageSize: 4,//每页显示的数量

      }
    },
    methods: {

      async getHotMovieList() {

        this.dataInline.pageSize=this.pageSize;
        this.dataInline.currentPage=this.currentPage;
        getPublishings(this.dataInline).then((res) => {

          if(res.status===0) {
            console.log(res)
            console.log( res.data)
            this.total = res.data.totalno; //总条数
            console.log(this.total)

            this.movieInfoList = res.data.datas;

          }
        });


      },


      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据

        this.dataInline.currentPage=currentPage;
        getPublishings(this.dataInline).then((res) => {

          if(res.status===0) {
            console.log(res.data.datas)
            this.movieInfoList = res.data.datas;
          }
        });

      },

    },

    mounted() {
      this.getHotMovieList();

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
