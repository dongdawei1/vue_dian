<template>
  <div>
    <div>放使用介绍图片</div>

    <div class="relsasesButton">
      <el-row v-if="noIsAuthentication">
        <el-button type="info" plain>
          <router-link
            v-on:click.native="isAuthenticationM('/home/realName')"
            to="" class="a">您需要完善店面信息才能发布招聘等信息哦！点击去完善吧！
          </router-link>
        </el-button>
      </el-row>

      <el-row v-if="conductIsAuthentication">
        <el-button type="info" plain disabled>已经收到您提交的店面信息,将在24小时内完成审核，请您耐心等待！</el-button>
      </el-row>

      <el-row v-if="failIsAuthentication">
        <el-button type="info" plain>
          <router-link
            v-on:click.native="isAuthenticationM('/home/updateRealName')"
            to="" class="a">提交的信息有部分不够准确，请您再重新提交一次！
          </router-link>
        </el-button>
      </el-row>

      <el-row v-if="isButton">


        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM('/home/purchaseCreateOrder')"
            to="" class="a">发布采购信息
          </router-link>
        </el-button>


        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM('/home/crzuAndmie/14')"
            to="" class="a">发布窗口/早点出租信息
          </router-link>
        </el-button>

        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM('/home/releaseWelfare')"
            to="" class="a">发布招聘信息
          </router-link>
        </el-button>

        <el-button type="primary">
          <router-link
            v-on:click.native="isAuthenticationM('/home/myRelease')"
            to="" class="a">我的全部发布
          </router-link>
        </el-button>

      </el-row>
    </div>
    <div>轮播广告</div>
  </div>
</template>

<script>

  import {getupAut} from '../../../common/userinifjs.js';

  export default {


    data() {
      return {
        isButton: false, //窗口123456
        noIsAuthentication: false,
        conductIsAuthentication: false,
        failIsAuthentication: false,
        isAuthentication: '',
        role: ''
      };
    },

    created() {
      this.islogin();
    },

    methods: {
      //判断是否登录
      islogin() {
        this.role = window.localStorage.getItem('dian_role');
        if (this.role === null || this.role === '') {
          this.$role();
          this.role = window.localStorage.getItem('dian_role');
        }

        if (this.role === '1' || this.role === '2') {
          let isAuthentication = window.localStorage.getItem('dian_isAuthentication');
          if (isAuthentication !== '2') {
            getupAut();
            isAuthentication = window.localStorage.getItem('dian_isAuthentication');
          }
          if (isAuthentication === '2') {
            this.isButton = true;
          } else if (isAuthentication === '4') {
            this.noIsAuthentication = true;
          } else if (isAuthentication === '1') {
            this.conductIsAuthentication = true;
          } else if (isAuthentication === '3') {
            this.failIsAuthentication = true;
          }

        }
      },
      isAuthenticationM(path) {
        this.$router.push({path: path});
      }
    }
  };
</script>


<style>
  .relsasesButton {
    padding: 10px 0 10px 50px;
  }
</style>
