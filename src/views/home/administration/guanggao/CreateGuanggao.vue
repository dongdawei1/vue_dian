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
    <div v-if="isxianshi">

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
          label="失效时间"
          width="110"
          :show-overflow-tooltip="true">
          <template slot-scope="scope1">
            <span v-if="scope1.row.tablenameid===9">{{scope1.row.dataObject.endTime}}</span>
            <span v-if="scope1.row.tablenameid!==9">{{scope1.row.dataObject.termOfValidity}}</span>
          </template>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看
            </el-button>
            <el-button @click="examineClick(scope.row, 1)" type="text" size="small" v-if="scope.row.tianjiaguanggao">
              添加广告
            </el-button>
            <el-button @click="examineClick(scope.row, 2)" type="text" size="small" disabled
                       v-if="!scope.row.deletefabu">需先删除广告才能操作
            </el-button>

            <el-button @click="submitForm(scope.row)" type="text" size="small" v-if="scope.row.deletefabu">永久删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查看职位详情弹窗开始-->
    <el-dialog
      title="职位详情"
      :visible.sync="zhiweidialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="zhiweixiangqi">

        <div class="left">
          <span>联系人 : {{tableDataNo.consigneeName }}</span><br>
          <span>职位类型 : {{tableDataNo.position }}</span><br>
          <span>奖励 : {{tableDataNo.introductoryAward }}</span><br>
          <span v-if="tableDataNo.isPublishContact===1">是否公开手机<br> </span>
          <span v-if="tableDataNo.isPublishContact===2">不公开手机<br> </span>
          <span>创建时间 : {{tableDataNo.createTime }}</span><br>
          <span>刷新时间 : {{tableDataNo.updateTime }}</span><br>
          <span>失效时间 : {{tableDataNo.termOfValidity }}</span><br>
          <span>邮箱 : {{tableDataNo.email }}</span><br>
        </div>
        <div class="right">
          <span>招聘人数 : {{tableDataNo.number }}</span><br>
          <span>薪水 : {{tableDataNo.salary }}</span><br>
          <span>福利 : {{tableDataNo.welfare }}</span><br>
          <span>学历 : {{tableDataNo.education }}</span><br>
          <span>经验 : {{tableDataNo.experience }}</span><br>
          <span>性别 : {{tableDataNo.gender }}</span><br>
          <span>年龄 : {{tableDataNo.age }}</span><br>

        </div>
        <span>工作地址 : {{tableDataNo.workingAddress }}</span><br>
        <span>职位详情 : {{tableDataNo.describeOne }}</span><br>
        <br>实名信息<br>
        <span>公司名称 : {{userRealName.companyName }}</span><br>
        <span>联系方式 : {{userRealName.contact }}</span><br>
        <span>城区 : {{userRealName.detailed }}</span><br>
        <span>地址详情 : {{userRealName.addressDetailed }}</span><br>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
    <!--查看详情弹窗结束-->
    <!--查看简历详情弹窗开始-->
    <el-dialog
      title="简历详情"
      :visible.sync="jianlidialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="zhiweixiangqi">
        <div class="left">
          <span>求职类型 : {{tableDataNo.position }}</span><br>
          <span>学历 : {{tableDataNo.education }}</span><br>
          <span>年龄 : {{tableDataNo.age }}</span><br>
          <span>性别 : {{tableDataNo.gender }}</span><br>
          <span v-if="tableDataNo.isPublishContact===1">公开电话 <br></span>
          <span v-if="tableDataNo.isPublishContact===2">不公开电话 <br></span>
          <span>创建时间 : {{tableDataNo.createTime }}</span><br>
          <span>失效时间 : {{tableDataNo.termOfValidity }}</span><br>
          <span>邮箱 : {{tableDataNo.email}}</span><br>
        </div>
        <div class="right">
          <span>工资要求 : {{tableDataNo.salary }}</span><br>
          <span>工作经验 : {{tableDataNo.experience }}</span><br>
          <span>求职城区 : {{tableDataNo.detailed }}</span><br>
          <span>所在城区 : {{tableDataNo.addressDetailed }}</span><br>
        </div>
        <span>自我描述 : {{tableDataNo.describeOne }}</span><br>
        <br>实名信息<br>
        <span>公司名称 : {{userRealName.companyName }}</span><br>
        <span>联系方式 : {{userRealName.contact }}</span><br>
        <span>城区 : {{userRealName.detailed }}</span><br>
        <span>地址详情 : {{userRealName.addressDetailed }}</span><br>
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
  import {adminupall} from '../../../../api/api';
  import {regionData} from 'element-china-area-data'

  export default {
    data() {
      return {
        tableDataNo: '',
        isxianshi: false,
        fullscreenLoading: false,
        zhiweidialogVisible: false,  //职位查看详情弹窗
        jianlidialogVisible: false,  //jianli查看详情弹窗
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
        if (row.tablenameid !== 1 && row.tablenameid !== 3) {
          //新窗口打开只能用  resolve
          let routeUrl = this.$router.resolve({path: row.xiangqiurl});
          window.open(routeUrl.href, '_blank');
          return true;
        } else if (row.tablenameid === 1) {
          this.jianlidialogVisible = false;
          this.tableDataNo = row.dataObject
          this.zhiweidialogVisible = true;

          return true;
        } else if (row.tablenameid === 3) {
          this.zhiweidialogVisible = false;
          this.tableDataNo = row.dataObject
          this.jianlidialogVisible = true;

          return true;
        }
        this.$message.error("用户表id无效，联系技术");
      },

      handleClose(done) { //关闭查看详情
        this.zhiweidialogVisible = false;  //职位查看详情弹窗
        this.jianlidialogVisible = false;  //职位查看详情弹窗
        this.tableDataNo = '';
      },
      examineClick(row, type) {

      },
      submitForm(row) {
        let params={
          userId:this.user.id,
          id:row.dataObject.id,
          tablenameid:row.tablenameid,
          permissionid:row.permissionid
        };
        adminupall(params).then((res) => {
          if (res.status === 0) {
            this.$message.success(res.msg);
            this.getReleaseWelfareAll();
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      getReleaseWelfareAll() {
        this.isxianshi = false;
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
            this.isxianshi = true;
            this.user = res.data.user;
            this.userRealName = res.data.realName;
            this.vos = res.data.vos;
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

  .zhiweixiangqi {
    width: 100%;
    padding: 0px 10px 25px 16px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height: 30px; /*行间距*/
    font-size: 16px;
  }

</style>
