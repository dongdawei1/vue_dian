<template>
  <div>
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="用户名(必填)">
        <el-input v-model="realName.userName" placeholder="用户登陆系统名称" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getReleaseWelfareAll">查询</el-button>
      </el-form-item>
    </el-form>
    <!--c查询框结束-->
    <div class="userxinxi">
      <div>
        <div class="userxinxiTitle">
          <div class="left">
            <span>  用户名：{{user.username}}</span>
          </div>
          <div class="right">
            <span>  用户id：{{user.id}}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="userxinxiTitle"> 实名信息</div>
        <div class="left">
          <span> 用户类型：{{userRealName.userType}}</span><br>
          <span>  联系人：{{userRealName.consigneeName}}</span><br>
          <span> 实名城市：{{userRealName.detailed}}</span><br>
        </div>
        <div class="right">
          <span>  公司名称：{{userRealName.companyName}}</span><br>
          <span>  联系方式：{{userRealName.contact}}</span><br>
          <span>  地址详情：{{userRealName.addressDetailed}}</span><br>
        </div>
      </div>
    </div>

    <div class="authentiCationFailureClass">
      状态备注：1发布中，2隐藏中,4审核中,5不在有效期，只有为1时可发布广告
    </div>


    <!--表格开始-->
    <el-table
      :data="vos"
      border
      style="width: 100%"
      max-height="500">
      <el-table-column
        fixed
        prop="permissionName"
        label="发布类型"
        width="125"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        fixed
        prop="dataObject.id"
        label="发布id"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="dataObject.welfareStatus"
        label="状态"
        width="90">
      </el-table-column>

      <el-table-column
        prop="dataObject.releaseTitle"
        label="发布标题"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="dataObject.remarks"
        label="发布备注"

        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="dataObject.createTime"
        label="创建时间"

        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="260">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" >查看
          </el-button>
          <el-button @click="examineClick(scope.row, 1)" type="text" size="small" v-if="scope.row.tianjiaguanggao">添加广告
          </el-button>
          <el-button @click="examineClick(scope.row, 2)" type="text" size="small" v-if="scope.row.bianjiguanggao">编辑广告
          </el-button>
          <el-button @click="examineClick(scope.row, 4)" type="text" size="small" v-if="scope.row.quxiaoguanggao">取消广告
          </el-button>
          <el-button @click="examineClick(scope.row, 3)" type="text" size="small" v-if="scope.row.deletefabu">永久删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--查看详情弹窗开始-->
    <el-dialog
      title="发布详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="parent">
        <div class="left">
          <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
          <span>服务区域 : {{tableDataNo.serviceDetailed }}</span><br>

          <span>申请时间 : {{tableDataNo.createTime }}</span><br>
          <span>发布类型 : {{tableDataNo.releaseType}}</span><br>
          <span>商品名称 : {{tableDataNo.serviceType}}</span><br>
          <!--在这里加服务项目-->
          <div >
            <el-table
              :data="tableDataNo.serviceAndprice"
              style="width: 80%">
              <el-table-column label="商品规格和价格" >
                <el-table-column
                  prop="project"
                  label="具体类型"
                  width="224">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="具体价格(元)"
                  width="120">
                </el-table-column>
              </el-table-column>
            </el-table>

          </div>
          <br>实名信息<br>
          <span>公司名称: {{tableDataNo.examineTime }}</span><br>
          <span>联系方式 : {{tableDataNo.contact }}</span><br>
          <span>所在城区 : {{tableDataNo.detailed }}</span><br>
          <span>联系地址: {{tableDataNo.realNameId}}</span><br>
        </div>
        <div class="right">
          <span>交易次数 : {{tableDataNo.servicFrequenc }}</span><br>
          <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
          <span>备注 : {{tableDataNo.remarks }}</span><br>
          <span>发布状态 : {{tableDataNo.welfareStatus }}</span><br>
          <span v-if="tableDataNo.welfareStatus === '审核失败'">失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
        </div>
        <span>具体介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
        <span>商品图片 : </span><br>
        <li v-for="(p, index) in this.tableDataNo.pictureUrl" :key="index">
          <img :src="p.pictureUrl" width="100%">
        </li>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->
  </div>
</template>
<script>
  import {admin_guangggao_realName} from '../../../../api/api';

  import {regionData} from 'element-china-area-data'

  export default {
    data() {
      return {
        fullscreenLoading: false,
        dialogVisible: false,  //查看详情弹窗
        options: regionData,//城市
        //分页结束
        realName: { //查询条件
          userName: '',
        },
        user: '',
        userRealName: '',
        vos: []
      }
    },
    methods: {
      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        this.dialogVisible=true;
      },

      handleClose(done) { //关闭查看详情
        this.dialogVisible=false;
      },
      examineClick(row,type){

      },
      submitForm() {
      },
      getReleaseWelfareAll() {
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        if (this.realName.userName === '') {
          this.$message.error("用户名不能为空");
          return false;
        }

        admin_guangggao_realName(this.realName.userName).then((res) => {
          if (res.status === 0) {
            this.user = res.data.user;
            this.userRealName = res.data.realName;
            this.vos = res.data.vos;
            console.log(this.vos);
            console.log(this.user);
            console.log(this.userRealName);
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      //城市组件
      handleChange(value) {
      },


    },
    watch: {
      "$route"(to, from) {
        if (to.path === '/home/businessEnquiry') {
          this.getReleaseWelfareAllSelect();
        }
      }


    }
  }
</script>
<style>
  .userxinxi {
    font-size: 16px;
    padding: 0px 10px 10px 10px;
  }

  .userxinxiTitle {
    font-size: 18px;

  }
</style>
