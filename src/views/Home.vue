<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu >

        <div v-for="(item, index) in menuList" :key="index">
  <!--一级菜单导航-->
          <el-menu-item :index= "item.name"  v-if=" item.pid===1 && item.parentCode==null && item.url != '' " >
            <span slot="title">
            <router-link :to="item.url"   class="a"   >{{ item.name }}</router-link>
            </span>
          </el-menu-item>
          <!--一级菜单下拉-->
        <el-submenu  :index= "item.name"  v-if=" item.pid===1 && item.parentCode===null && item.url === ''"  >  <!--唯一标识-->

          <template slot="title"  >{{ item.name }}</template>

          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in menuList" :key="indexSon">
            <el-menu-item :index="itemSon.name"  v-if=" item.resourceCode === itemSon.parentCode " >
            <router-link :to="itemSon.url"   class="a"   >{{ itemSon.name }}</router-link>
            </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        </div>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 19px">
        <el-button type="primary" @click="logout">退出登陆</el-button>
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
  import { userlogout } from '../api/api';
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

      //获取菜单列表，登陆失效后返回首页
      getpermission(){
        getPermission().then((res) => {
          let status=res.status;
          if (status === 0) {
            this.menuList = res.data
          }else{
              this.$router.push({ path: '/login/sign' });
          }
        });
      },
      //退出
      logout(){
        userlogout().then((res) => {
          let status=res.status;
          if (status === 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            this.$message.error(res.msg)
          }
        });


      }


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
