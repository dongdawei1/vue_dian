<template>
  <el-container >

      <el-header >   <DetailsTitle></DetailsTitle> </el-header>

    <el-container >
      <!--<el-aside width="200px">Aside</el-aside>-->
      <el-header >
        <!--显示当前组件  自己的内容  router中设置默认显示的子组件-->
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>
      </el-header>
      </el-container >
      </el-container >

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
