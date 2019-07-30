<template>
  <el-container >
      <el-header> <DetailsTitle></DetailsTitle></el-header>




      <el-main>
      <div  id="body">
        <!--显示当前组件  自己的内容  router中设置默认显示的子组件-->
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>
      </div>
      </el-main>

  </el-container>
</template>

<script>
  import DetailsTitle from '../components/pages/DetailsTitle';
  export default {

    components: {
      DetailsTitle
    },
    data() {
      return {
        menuList: []
      }
    },
    created () {
    },
    methods: {
    }
  }

</script>



<style >
</style>
