<template>
  <div>
    <div v-if="isCreate" class="isCreateClass">
      <el-button type="primary">
        <router-link
          v-on:click.native="isAuthenticationM"
          to="" class="a">去发布个人求职信息
        </router-link>
      </el-button>
    </div>

    <!--发布过简历展示详情-->
    <div class="jianlixiangqi" v-if="isDetails">
      <h4><span>简历详情</span></h4>
      <div class="gerentablecss_content">
        <div class="left">
          <span>id : {{da.id }}</span><br>
          <span>求职类型 : {{da.position }}</span><br>
          <span>学历 : {{da.education }}</span><br>
          <span>年龄 : {{da.age }}</span><br>
          <span>性别 : {{da.gender }}</span><br>
          <span>邮箱 : {{da.email}}</span><br>
          <span>联系人 : {{da.consigneeName }}</span><br>
          <span>联系方式 : {{da.contact }}</span><br>
          <span>是否公开电话 : {{da.isPublishContact }}</span><br>
          <span>创建时间 : {{da.createTime }}</span><br>
          <span>失效时间 : {{da.termOfValidity }}</span><br>
        </div>
        <div class="right">
          <span>工资要求 : {{da.salary }}</span><br>
          <span>工作经验 : {{da.experience }}</span><br>
          <span>求职城区 : {{da.detailed }}</span><br>
          <span>所在城区 : {{da.addressDetailed }}</span><br>
          <span>简历状态 : {{da.authentiCationStatus }}</span><br>
          <span v-if="da.authentication_status">审核失败原因 : {{ da.authentiCationFailure}}<br></span>

        </div>
        <span>自我描述 : {{da.describeOne }}</span><br>
      </div>
      <br>
      <el-button type="primary" @click="endAndAgain()" v-if="da.isEnd">编辑</el-button>
      <el-button type="primary" @click="operation(1)" v-if="da.isRefresh"
                 v-loading.fullscreen.lock="fullscreenLoading">刷新
      </el-button>
      <el-button type="primary" @click="operation(2)" v-if="da.isHide"
                 v-loading.fullscreen.lock="fullscreenLoading">隐藏
      </el-button>
      <el-button type="primary" @click="operation(3)" v-if="da.isDel">删除</el-button>
      <el-button type="primary" @click="operation(4)" v-if="da.isRelease"
                 v-loading.fullscreen.lock="fullscreenLoading">显示简历
      </el-button>
      <el-button type="primary" @click="operation(5)" v-if="da.yanqi"
                 v-loading.fullscreen.lock="fullscreenLoading">延期
      </el-button>
      <el-button type="primary" @click="endAndAgain()" v-if="da.isAgain">重新发布</el-button>
    </div>

  </div>
</template>
<script>
  import {select_resume_by_id} from '../../../../api/api';
  import {operation_resume} from '../../../../api/api';

  export default {
    data() {
      return {
        da: {},
        isCreate: false, //显示button
        isDetails: false,//详情

        fullscreenLoading: false
      }
    },

    created() {
      this.jurisdiction()
    },
    methods: {
      //操作
      operation(type) {
        let data = {};
        data.type = type;
        data.userId = this.da.userId;
        data.id = this.da.id;
        if (type === 1 || type === 2 || type === 4 || type === 5) {
          this.fullscreenLoading = true;
          operation_resume(data).then(res => {
            this.fullscreenLoading = false;
            if (res.status === 0) {
              this.$message.success("操作成功");
              this.jurisdiction();
            } else {
              this.$msgdeal(res.msg);
            }
          });
        } else if (type === 3) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            operation_resume(data).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.isCreate = true; //显示button
                this.isDetails = false;//详情
              } else {
                this.$msgdeal(res.msg);
              }
            });
          }).catch(() => {
            this.fullscreenLoading = false;
          });
        } else {
          this.$message.error("操作类型错误");
        }
      },

      //判断是否登录 获取用户权限，防止用户直接通过url访问
      jurisdiction() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1' && role !== '11' && role !== '4') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        select_resume_by_id().then((res) => {
          if (res.status === 0) {
            if (res.data !== null) {
              this.da = res.data;
              if (this.da.isPublishContact === 1) {
                this.da.isPublishContact = '公开'
              } else {
                this.da.isPublishContact = '不公开'
              }

              let welfareStatus = this.da.welfareStatus;
              if (welfareStatus === 1) {
                this.da.authentiCationStatus = '发布中'
                this.da.isEnd = true;
                this.da.isRefresh = true;
                this.da.isHide = true;
                this.da.isDel = true;
              } else if (welfareStatus === 2) {
                this.da.authentiCationStatus = '隐藏中'
                this.da.isRelease = true;
                this.da.isDel = true;
                this.da.isEnd = true;
              } else if (welfareStatus === 4) {
                let authentiCationStatus = this.da.authentiCationStatus;
                if (authentiCationStatus === 1) {
                  this.da.authentiCationStatus = '审核中'
                  this.da.isDel = true;
                } else if (authentiCationStatus === 3) {
                  this.da.authentiCationStatus = '审核失败'
                  this.da.isAgain = true;//重新发起
                  this.da.isDel = true;
                  this.da.authentication_status = true;
                }
              } else if (welfareStatus === 5) {
                this.da.authentiCationStatus = '已过期未显示'
                this.da.isDel = true;
                this.da.yanqi = true;
              }
              this.isDetails = true;  //详情
              this.isCreate = false;
            } else {//没有创建过
              this.isDetails = false;
              this.isCreate = true;
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },
      //判断是否实名和登陆状态
      isAuthenticationM() {
        this.$router.push({path: '/home/createResume'});
      },
      endAndAgain() {
        this.$router.push({path: '/home/upResume'});
      }

    },
    watch: {
      "$route"(to, from) {
        if (to.path === '/home/myRelease') {
          this.jurisdiction();
        }
      }
    }
  }
</script>
<style>
  .jianlixiangqi {
    padding: 0 10px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height: 30px; /*行间距*/
    font-size: 16px;
  }


  .isCreateClass {
    padding: 20px;
  }
</style>
