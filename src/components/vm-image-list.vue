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
            <h2>{{ item.title }}</h2>
            <p>{{item. desc }}</p>
            <a :href="item.detailUrl">
              more >
            </a>
          </div>






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

  import ElPager from "element-ui/packages/pagination/src/pager";
  export default {
    components: {ElPager},
    props: {
      title: {
        type: String,
        default: 'Image List'
      },
      // origin data
      data: {
        type: Array
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
        this.infoList = this.data;
        console.log(this.infoList );
        this.total = this.data.length;
        this.computeArr();
      },


      computeArr() {
        // 页数，如果有小数，只取整数部分
        let pageNum = Number(String(this.total / this.pageSize).split(".")[0]);
        // 定义一个空数组
        let newArr = [];
        // 遍历获取的数据，每次遍历都把数组的0位置开始截取，截取数量为每页显示的数量
        for (let i = 0; i < pageNum; i++) {
          newArr.push(this.infoList.splice(0, this.pageSize));
        }
        // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
        if (this.infoList.length < this.pageSize) {
          newArr.push(this.infoList.splice(0, this.infoList.length));
        }
        // 将新的数组赋给infoList[],用来渲染页面
        this.infoList = newArr;
        // 第一次进入页面显示this.infoList[]数组的第一个元素
        this.movieInfoList = this.infoList[0]
      },
      handleCurrentChange(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.movieInfoList = this.infoList[currentPage - 1];
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
