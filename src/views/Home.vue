<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu >

        <div v-for="(item, index) in menuList" :key="index">
        <el-submenu  :index= "item.name"  >
          <template slot="title"><i   class="111" ></i>{{ item.name }}</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        </div>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 19px">

        <span>王小虎</span> <span>退出登陆</span>
      </el-header>

    </el-container>
  </el-container>
</template>

<script>
  import { getPermission } from '../api/api';
	export default {
		data() {
			return {
			  menuList: []

			}
		},
    created () {
        this.getpermission()

    },
		methods: {

      //判断是否登录
      getpermission(){
        getPermission().then((res) => {

          let status=res.data.status;
          if (status === 0) {
            console.log(res);
            console.log(1)
            this.menuList = res.data.data
            console.log(this.menuList)
            // sessionStorage.setItem('user', JSON.stringify(user));
         //   this.$router.push({ path: '/home' });

          }else{
            console.log(res)
            this.$router.push({ path: '/login/sign' });
          }
        });
      },
		}
	}

</script>



<style >
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

</style>
