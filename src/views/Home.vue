<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu >

        <div v-for="(item, index) in menuList" :key="index">
  <!--一级菜单导航-->
          <el-menu-item :index= "item.name"  v-if=" item.pid===1 && item.parentCode==null && item.url != '' " >
            <span slot="title">
            <router-link :to="item.url"     >{{ item.name }}</router-link>
            </span>
          </el-menu-item>
          <!--一级菜单下拉-->
        <el-submenu  :index= "item.name"  v-if=" item.pid===1 && item.parentCode===null && item.url === ''"  >  <!--唯一标识-->

          <template slot="title"  >{{ item.name }}</template>

          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in menuList" :key="indexSon">
            <el-menu-item :index="itemSon.name"  v-if=" item.resourceCode === itemSon.parentCode " >
            <router-link :to="itemSon.url"     >{{ itemSon.name }}</router-link>
            </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        </div>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 19px">

          <span>退出登陆</span>
      </el-header>

      <div  id="body">
        <!--显示当前组件  自己的内容  router中设置默认显示的子组件-->
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>

      </div>


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
