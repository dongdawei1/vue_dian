<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>


        <el-menu-item index="发布信息">
            <span slot="title">
            <router-link to="/home/release" class="a">发布信息</router-link>
            </span>
        </el-menu-item>


        <!--一级菜单下拉-->
        <el-submenu index="零售市场">  <!--唯一标识-->
          <template slot="title">零售市场</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in marketList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="酒水">  <!--唯一标识-->
          <template slot="title">酒水/消毒餐具</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in wineAndTablewareList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="招聘专区">
          <template slot="title">招聘专区</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in personnelList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="电器设备">
          <template slot="title">电器设备/维修</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in repairList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="出租">
          <template slot="title">店面摊位窗口出租</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in rentalBoothList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="灭虫">
          <template slot="title">菜谱/装修/灭虫</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in menuList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="批发市场" v-if="isrolewholesaleMarket">
            <span slot="title">
            <router-link to="/home/wholesaleMarket" class="a">批发市场</router-link>
            </span>
        </el-menu-item>

        <el-submenu index="用户中心">
          <template slot="title">用户中心</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in userList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>

            <div v-if="isdetailed">
              <el-menu-item index="收支明细">
                <router-link to="/home/detailed" class="a">收支明细</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="其他" v-if="isrole1">
          <template slot="title">其他</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in businessList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="积分" >
          <template slot="title">积分</template>
          <el-menu-item-group>
            <div v-for="(itemSon, indexSon) in integralList" :key="indexSon">
              <el-menu-item :index="itemSon.name">
                <router-link :to="itemSon.url" class="a">{{ itemSon.name }}</router-link>
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 19px">
        <el-button type="primary" @click="logout">退出登陆</el-button>
      </el-header>

      <div id="body">
        <!--显示当前组件  自己的内容  router中设置默认显示的子组件-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import {userlogout} from '../api/api';
  import {logOu} from '../common/logmainjs.js';

  export default {
    data() {
      return {
        marketList: [
          {name: '蔬菜区', url: '/home/vegetables'},
          {name: '粮油区', url: '/home/grainAndOil'},
          {name: '副食/调料区', url: '/home/seasoning'},
          {name: '清洁用品', url: '/home/clean'},
          {name: '工服/绿植/百货', url: '/home/departmentStore'},
          {name: '桌椅餐具', url: '/home/kitchenUtensils'},
          {name: '水产/禽蛋区', url: '/home/aquaticProduct'}
        ],
        wineAndTablewareList: [
          {name: '酒水/饮料', url: '/home/wine'},
          {name: '消毒餐具', url: '/home/tableware'}
        ],
        personnelList: [
          {name: '职位专区', url: '/home/recruitWorkers'},
          {name: '求职专区', url: '/home/jobWanted'}
        ],
        repairList: [
          {name: '电器设备出售', url: '/home/newEquipment'},
          {name: '设备维修', url: '/home/repair'},
          {name: '二手电器设备', url: '/home/oldEquipment'}
        ],
        rentalBoothList: [
          {name: '店面/窗口出租', url: '/home/lease'},
          {name: '摊位出租转让', url: '/home/rentalBooth'}
        ],
        menuList: [
          {name: '菜谱/广告牌制作', url: '/home/menu'},
          {name: '装修专区', url: '/home/renovation'},
          {name: '灭虫专区', url: '/home/pestControl'}
        ],
        userList: [
          {name: '我的发布', url: '/home/myRelease'},
          {name: '我的账户', url: '/home/myAccount'}
        ],
        businessList: [
          {name: '注册', url: '/home/toExamine'},
          {name: '接单', url: '/home/businessEnquiry'}
        ],
        integralList: [
          {name: '积分', url: '/home/integral'},
          {name: '特色农产品', url: '/home/characteristic'}
        ],
        isrole1: false,
        isrolewholesaleMarket: false,
        isdetailed: false,

        role: window.localStorage.getItem("dian_role"),
      }
    },
    created() {
      this.getpermission();
    },
    methods: {
      //获取菜单列表，登陆失效后返回首页
      getpermission() {
        if (this.role !== null && this.role !== '') {
          if (this.role === '1' || this.role === '2' || this.role === '3' || this.role === '5' || this.role === '6' || this.role === '7' || this.role === '13') {
            this.isdetailed = true;

          }
          if (this.role !== '2') {
            this.isrolewholesaleMarket = true;
          }
          if(this.role === '1'){
            this.isrole1=true;
          }
        }
      },
      //退出
      logout() {
        userlogout().then((res) => {
          let status = res.status;
          if (status === 0) {
            logOu();
            this.$router.push({path: '/login/sign'});
          } else {
            this.$message.error(res.msg)
          }
        });
      }


    }
  }

</script>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

</style>
