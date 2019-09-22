<template>
  <div>
    <div>放使用介绍图片</div>

    <div  class="relsasesButton">
      <el-row  v-if="noIsAuthentication">
        <el-button type="info" plain><router-link
          v-on:click.native="isAuthenticationM('/home/realName')"
          to="" class="a" >您需要完善商户信息才能发布商品、服务等信息哦！点击去完善吧！</router-link></el-button>
      </el-row>

      <el-row  v-if="conductIsAuthentication">
        <el-button type="info" plain disabled>已经收到您提交的商户信息,将在24小时内完成审核，请您耐心等待！</el-button>
      </el-row>

      <el-row  v-if="failIsAuthentication">
        <el-button type="info" plain><router-link
          v-on:click.native="isAuthenticationM('/home/updateRealName')"
          to="" class="a" >提交的信息有部分不够准确，请您再重新提交一次！</router-link></el-button>
      </el-row>

      <el-row  v-if="isButton">

        <el-button type="primary" v-if="isRent"><router-link
          v-on:click.native="isAuthenticationM('/home/createLease')"
          to="" class="a" >发布摊位店面出租转让信息</router-link></el-button>


        <el-button type="primary" v-if="isFoodAndGrain"><router-link
          v-on:click.native="isAuthenticationM('/home/createFoodAndGrain')"
          to="" class="a" >发布蔬菜米面粮油水产、清洁用品、桌椅餐具等销售信息</router-link></el-button>


        <el-button type="primary" v-if="isCreatePosition"><router-link
          v-on:click.native="isAuthenticationM('/home/releaseWelfare')"
          to="" class="a" >发布招聘信息</router-link></el-button>

        <el-button type="primary" v-if="isDepartmentStore"><router-link
          v-on:click.native="isAuthenticationM('/home/createDepartmentStore')"
          to="" class="a" >发布工服、百货、绿植等销售信息</router-link></el-button>

        <el-button type="primary" v-if="isMyEquipment"><router-link
          v-on:click.native="isAuthenticationM('/home/createEquipment')"
          to="" class="a" >发布电器、维修、二手电器等服务和销售信息</router-link></el-button>

        <el-button type="primary" v-if="isWineAndTableware"><router-link
          v-on:click.native="isAuthenticationM('/home/createWineAndTableware')"
          to="" class="a" >发布酒水饮料、消毒餐具等销售信息</router-link></el-button>



        <el-button type="primary" v-if="isMenuAndRenovationAndPestControl"><router-link
          v-on:click.native="isAuthenticationM('/home/createMAndRAndP')"
          to="" class="a" >发布菜谱制作、装修、灭虫等服务信息</router-link></el-button>

        <el-button type="primary" v-if="isJobWanted"><router-link
          v-on:click.native="isAuthenticationM('/home/recruitWorkers')"
          to="" class="a" >查看招聘信息</router-link></el-button>

        <el-button type="primary" v-if="isReceipt" ><router-link
          v-on:click.native="dialogVisible = true"
          to="" class="a" >申请成为可接订单商户</router-link></el-button>



        <el-button type="primary"><router-link
          v-on:click.native="isAuthenticationM('/home/myRelease')"
          to="" class="a" >{{myReleasebutton}}</router-link></el-button>

      </el-row>
    </div>
    <div>轮播广告</div>

    <el-dialog
      title="申请所需步骤"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialogVisibleCss">
      <span>1、签约现场缴纳300元质量保证金;</span><br>
       <span class="dialogVisibleCsszhushi"> 注:每次接单时需要冻结该订单10%的质量保证金,订单完成后退还至保证金余额内;</span><br>
      <span class="dialogVisibleCsszhushi">  注:质保金缴纳方式为线下缴纳请勿微信或转账;</span><br>
      <span>2、本人银行卡号;</span><br>
      <span class="dialogVisibleCsszhushi"> 注:解除可接订单商户时退还300元质量保证金;</span><br>
      <span>3、营业执照复印件;</span><br>
      <span>4、本人身份证复印件;</span><br>
      <span>5、本人健康证复印件;</span><br>
      </div>

      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import { get_user_info } from '../../../api/api';
  import { get_user_info_sign } from '../../../api/api';
  import { getRealName } from '../../../api/api';
  import {  isRoleMessage } from '../../../api/api';
  export default {


    data() {
      return {
        //服装百货  自己一个角色
        isDepartmentStore:false, //12角色
        //商家2
        isCreatePosition:false,//发布职位权限 2,5
        // 厨具/电器/设备维修3
        isMyEquipment:false,
        isRent:false,//摊位出租4，5,6
        //酒水/消毒餐具
        isWineAndTableware:false,//酒水5
        //菜，米面，蛋禽
        isFoodAndGrain:false,//发布商品 4,5
        //商铺/摊位出租6
        //装修/菜谱/广告牌/杀虫灭蟑
        isMenuAndRenovationAndPestControl:false,//菜谱 7 装修7 灭虫7
        //求职11
        isJobWanted:false,//求职11

        isReceipt:false,//是否显示申请成为接单商户，目前只有role=4可以申请
        isReceiptTrue:false,//提交过的用户
        isButton:false, //窗口123456
        noIsAuthentication:false,
        conductIsAuthentication:false,
        failIsAuthentication:false,
        isAuthentication:'',
        user:'', //用户
        role:'',

        myReleasebutton:'我的全部发布',
        dialogVisible: false
      };
    },

    created () {
      this.islogin();
    },

    methods: {

      isAuthenticationM(path){
        get_user_info_sign(path);
      },

      //判断是否登录
      islogin(){
        get_user_info().then((res) => {
          let status=res.status;
          if (status !== 0) {
            this.$router.push({ path: '/login/sign' });
          }else{
            this.user=JSON.parse(res.data);
            this.role=this.user.role;

              let isAuthentication=this.user.isAuthentication;
              if(isAuthentication===2){
                this.isButton=true;
                if(this.role===1){
                  this.isJobWanted=true;
                  this.isCreatePosition=true;
                  this.isMenuAndRenovationAndPestControl=true;
                  this.isRent=true; //窗口123456
                  this.isMyEquipment=true;//发布电器二手
                  this.isFoodAndGrain=true;
                  this.isWineAndTableware=true;
                  this.isDepartmentStore=true;
                  this.getRealName();
                }else if(this.role===3){
                  this.isRent=true; //窗口123456
                  this.isMyEquipment=true;//发布电器二手
                }else if(this.role===4){
                  this.isFoodAndGrain=true;  //蔬菜调料
                  this.isRent=true; //窗口123456
                  this.getRealName();

                }else if(this.role===5){
                  this.isCreatePosition=true; //创建职位
                  this.isRent=true; //窗口123456
                  this.isWineAndTableware=true;
                }else if(this.role===6){
                  this.isRent=true; //窗口123456
                }else if(this.role===7){
                  this.isMenuAndRenovationAndPestControl=true;//菜谱 7//装修7//灭虫7
                }else if(this.role===11){
                  this.isJobWanted=true;
                  this.myReleasebutton='我的简历';
                }else if(this.role===12){
                  this.isDepartmentStore=true;

                }

              }else if(isAuthentication===4){
                this.noIsAuthentication=true;
              }else if(isAuthentication===1){
                this.conductIsAuthentication=true;
              }else if(isAuthentication===3){
                this.failIsAuthentication=true;
              }
          }
        });
      },
      getRealName(){
         getRealName().then((res) => { //获取实名信息填充
           if(res.status ===0 ) {
              if(res.data.isReceipt===1){
              this.isReceipt=true;
              }else if(res.data.isReceipt===3){
                this.isReceiptTrue=true;
              }
           }else {
            isRoleMessage(res.msg);
           }
         });
      },

      handleClose(done) {
        done();
      },
    }
  };
</script>


<style >
  .relsasesButton{
    padding:10px 0px 10px 50px;
  }
  .dialogVisibleCss{
    padding:0px 0px 0px 30px;
    font-size: 16px;
  }
  .dialogVisibleCsszhushi{
    padding:0px 0px 0px 35px;
    color: #FC3729;
  }
</style>
