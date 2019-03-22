<template>
	<el-row class="container">
    <el-menu
      style="background-color: #2e3d64"
    >
      <div v-for="(item, index) in menuList" :key="index">
        <el-submenu
          style="background-color: #2e3d64"
          :index="item.resourceCode"
          v-if="item.children.length > 0"
        >
          <template slot="title">
            <div
              @mouseover="toggleIcon(index, item, 'over')"
              @mouseout="toggleIcon(index, item, 'out')"
            >
              <i
                v-if="!item.parentCode"
                :style="{
                      'background-image':
                        activeIndex[index] ||
                        user.openMenu === item.resourceCode
                          ? `url(${item.iconHover})`
                          : `url(${item.icon})`,
                    }"
              ></i>
              {{ item.name }}
            </div
              @mouseover="toggleIcon(index, item, 'over')"
              @mouseout="toggleIcon(index, item, 'out')"
            >
          </template>
          <el-menu-item-group style="background-color: #2e3d64">
            <el-menu-item
              v-for="(citem, cindex) in item.children"
              :key="cindex"
              :index="citem.resourceCode"
              :class="{
                    'is-active': activeMenu === citem.resourceCode,
                    'isnot-active': activeMenu !== citem.resourceCode,
                  }"
              @click="sendOmega(citem.resourceCode)"
            >
              <router-link :to="{ path: citem.url }">{{
                citem.name
                }}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          @click="oneMenu(item.resourceCode)"
          v-if="item.children.length === 0"
          :class="{ 'is-active': user.openMenu === item.resourceCode }"
          :index="item.resourceCode"
          :key="item.resourceCode"
          class="no-children-item"
        >
          <div
            @mouseover="toggleIcon(index, item, 'over')"
            @mouseout="toggleIcon(index, item, 'type')"
          >
            <i
              v-if="!item.parentCode"
              :style="{
                    'background-image':
                      activeIndex[index] || user.openMenu === item.resourceCode
                        ? `url(${item.iconHover})`
                        : `url(${item.icon})`,
                  }"
            ></i>
            <router-link :to="{ path: item.url }">{{
              item.name
              }}</router-link>
          </div>
        </el-menu-item>
      </div>
    </el-menu>
  </el-row>
</template>

<script>
  import { getPermission } from '../api/api';
	export default {
		data() {
			return {
			  menuList: [],
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
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


</style>
