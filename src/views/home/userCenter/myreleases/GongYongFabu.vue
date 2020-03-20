<template>
  <div class="vm-image-list">

    <!--表格开始-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      max-height="500">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="examineName"
        label="发布类型"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop=""
        label="具体"
        width="120"
        :show-overflow-tooltip="true"
       >
         <template slot-scope="scope2">
          <span v-if="scope2.row.releaseType===13  || scope2.row.releaseType===17 ||scope2.row.releaseType===19  ">
           起步价格(元) {{scope2.row.mianjia}} </span>
           <span v-if=" scope2.row.releaseType===14||scope2.row.releaseType===15 ">
            出租面积(平米){{scope2.row.mianjia}} </span>
           <span v-if=" scope2.row.releaseType!==14 && scope2.row.releaseType!==15   && scope2.row.releaseType!==13
           && scope2.row.releaseType!==17 && scope2.row.releaseType!==19  ">
            商品类型:{{scope2.row.serviceType}} </span>


        </template>
      </el-table-column>



      <el-table-column
        prop="examineTime"
        label="发布状态"
        width="90">
      </el-table-column>

      <el-table-column
        prop="termOfValidity"
        label="过期时间"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="authentiCationFailure"
        label="失败原因"
        width="90"
        :show-overflow-tooltip="true">
        <template slot-scope="scope1">
          <span v-if="scope1.row.authentiCationStatus!==3"> -- </span>
        </template>
      </el-table-column>


      <el-table-column
        prop="releaseTitle"
        label="标题"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="serviceDetailed"
        label="服务区域"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="servicFrequenc"
        label="服务次数"
        width="100"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
        width="115">
      </el-table-column>
      <el-table-column
        prop="consigneeName"
        label="联系人"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="210">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"  >查看</el-button>
          <el-button @click="submitForm(scope.row, 1)" type="text" size="small" v-if="scope.row.welfareStatus===1"  v-loading.fullscreen.lock="fullscreenLoading" >刷新</el-button>
          <el-button @click="submitForm(scope.row, 3)" type="text" size="small"  v-if="scope.row.welfareStatus===1" v-loading.fullscreen.lock="fullscreenLoading">隐藏</el-button>
          <el-button @click="submitForm(scope.row, 4)" type="text" size="small"  v-if="scope.row.welfareStatus===2" v-loading.fullscreen.lock="fullscreenLoading">发布</el-button>
          <el-button @click="open(scope.row, 5)" type="text" size="small"    v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
          <el-button @click="submitForm(scope.row, 2)" type="text" size="small" v-if="scope.row.welfareStatus===5" v-loading.fullscreen.lock="fullscreenLoading">延期</el-button>
          <!-- 只有失败的才显示 编辑键 -->
          <el-button @click="examineClick(scope.row)" type="text" size="small"   >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格结束-->
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

          <span>创建时间 : {{tableDataNo.createTime }}</span><br>
          <span>发布类型 : {{tableDataNo.examineName}}</span><br>

          <span v-if="tableDataNo.releaseType===13  || tableDataNo.releaseType===17 ||tableDataNo.releaseType===19  ">
           起步价格: {{tableDataNo.mianjia}} (元)<br> </span>
          <span v-if=" tableDataNo.releaseType===14||tableDataNo.releaseType===15 ">
          出租面积:  {{tableDataNo.mianjia}} (平米)<br> </span>
          <span v-if=" tableDataNo.releaseType!==14 && tableDataNo.releaseType!==15   && tableDataNo.releaseType!==13
           && tableDataNo.releaseType!==17 && tableDataNo.releaseType!==19  ">
            商品名称 : {{tableDataNo.serviceType}}<br> </span>



          <!--在这里加服务项目-->
          <div  v-if=" tableDataNo.releaseType!==14 && tableDataNo.releaseType!==15   && tableDataNo.releaseType!==13
           && tableDataNo.releaseType!==17 && tableDataNo.releaseType!==19  ">
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
          <span>公司名称: {{tableDataNo.userType }}</span><br>
          <span>联系方式 : {{tableDataNo.contact }}</span><br>
          <span>所在城区 : {{tableDataNo.detailed }}</span><br>
          <span>联系地址: {{tableDataNo.realNameId}}</span><br>
        </div>
        <div class="right">
          <span>交易次数 : {{tableDataNo.servicFrequenc }}</span><br>
          <span>标题 : {{tableDataNo.releaseTitle }}</span><br>
          <span>备注 : {{tableDataNo.remarks }}</span><br>
          <span>发布状态 : {{tableDataNo.examineTime }}</span><br>
          <span v-if="tableDataNo.authentiCationStatus ===3">失败原因 : {{tableDataNo.authentiCationFailure }}</span><br>
        </div>


        <span>具体介绍 : {{tableDataNo.serviceIntroduction }}</span><br>
        <span>商品图片 : </span><br>
        <li v-for="(p, index) in tableDataNo.pictureUrl" :key="index">
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

  import {  upfabu } from '../../../../api/api';
  export default {
    props: ["tableData"],

    data() {
      return {
        fullscreenLoading:false,
        tableDataNo:{
          pictureUrl:'',
          serviceAndprice:''
        }, //某一个数据
        dialogVisible: false,  //查看详情弹窗
        formLabelWidth: '120px',
      }
    },
    created () {
    },
    methods: {
      examineClick(tableDataNo){

        if( tableDataNo.releaseType!==14 && tableDataNo.releaseType!==15   && tableDataNo.releaseType!==13
          && tableDataNo.releaseType!==17 && tableDataNo.releaseType!==19  ){
        this.$router.push('/home/upinformation/'+tableDataNo.releaseType+'/'+tableDataNo.id);  //带参数页面跳转  name:'editMAndRAndP',
        }
      },



      handleClick(row) {  //点击查看详细
        this.tableDataNo=row;
        if(typeof this.tableDataNo.serviceAndprice!=="object"){
          this.tableDataNo.serviceAndprice=JSON.parse(this.tableDataNo.serviceAndprice);
        }
        if(typeof this.tableDataNo.pictureUrl!=="object"){
          this.tableDataNo.pictureUrl=JSON.parse(this.tableDataNo.pictureUrl);
        }

        this.dialogVisible=true;
      },

      handleClose(done) { //关闭查看详情
        this.tableDataNo=[];
        this.dialogVisible=false;
      },

      //操作
      submitForm(form,type) {
        this.fullscreenLoading=true;
        let data={};
        data.type=type;
        data.userId= form.userId;
        data.id=form.id;
        data.releaseType=form.releaseType;
        if(type===1 || type===2 ||  type===3|| type===4 || type===5){
          upfabu(data).then(data => {
            this.fullscreenLoading=false;
            let msg=data.msg;
            if (data && data.status === 0) {
              this.$message.success(msg);
            }  else {
              this.$msgdeal(msg);
            }
          });
        }else{
          this.$message.error("操作类型错误");
        }
        this.$emit('positionlist');
      },
      //删除
      open(form,type) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this. submitForm(form,type);
        }).catch(() => {

        });
      },





    }
  }
</script>
<style>
  .parent {
    padding:0 15px 25px 40px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px*/
    line-height:30px;  /*行间距*/
    font-size:16px;
  }


</style>
