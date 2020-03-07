<template>
  <div>
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">
      <el-form-item label="用户名(必填)">
        <el-input v-model="realName.userName" placeholder="用户登陆系统名称" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getReleaseWelfareAll" v-loading.fullscreen.lock="fullscreenLoading">查询
        </el-button>
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

      <!--添加广告模块开始-->
      <div v-if="isguanggao" class="isguanggaoClasss">
        <!--表格开始-->
        <div class="authentiCationFailureClass">
          <span> 首页弹窗同时段只能有一个，首页轮播和详情页轮播同时段只能有3个<br></span>
          <span> 默认显示可以有多个，只能发布内部创建的广告<br></span>
          <span> 切换广告类型或者显示类型，列表会更新，请重新查看<br></span>
        </div>
        <el-table
          :data="listdi"
          border
          style="width: 100%"
          max-height="500">
          <el-table-column
            prop="id"
            label="id"
            width="80">
          </el-table-column>

          <el-table-column
            label="显示位置" width="110">
            <template slot-scope="scope5">
              <span v-if="scope5.row.bunnerType===0">首页弹窗</span>
              <span v-if="scope5.row.bunnerType===1">首页轮播</span>
              <span v-if="scope5.row.bunnerType===2">详情页轮播</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间" :show-overflow-tooltip="true"  width="170">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间" :show-overflow-tooltip="true"  width="170">
          </el-table-column>


          <el-table-column
            label="优先级别" width="100">
            <template slot-scope="scope3"  >
              <span v-if="scope3.row.moren===0">默认显示</span>
              <span v-if="scope3.row.moren===1">优先显示</span>
            </template>
          </el-table-column>

          <el-table-column
            label="显示状态" width="100">
            <template slot-scope="scope4">
              <span v-if="scope4.row.bunnerStatus===0">未开始</span>
              <span v-if="scope4.row.bunnerStatus===1">显示中</span>
            </template>
          </el-table-column>





          <el-table-column
            prop="detailed"
            label="显示城区" :show-overflow-tooltip="true"  width="160">
          </el-table-column>
          <el-table-column
            prop="releaseType"
            label="发布类型" :show-overflow-tooltip="true" >
          </el-table-column>

          <el-table-column
            prop="examineName"
            label="创建人" :show-overflow-tooltip="true" >
          </el-table-column>



        </el-table>
        <!--创建表单开始-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="广告类型" prop="bunnerType">
            <template>
              <el-radio-group v-model="ruleForm.bunnerType" @change="handleChange">
                <el-radio :label="0">首页弹窗</el-radio>
                <el-radio :label="1">首页轮播</el-radio>
                <el-radio :label="2">详情页轮播</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>


          <!--fanwei:'',//范围范围 0全国优先级最高，1全市，2全区-->
          <el-form-item label="显示城市" prop="fanwei">
            <template>
              <el-radio-group v-model="ruleForm.fanwei" @change="reserveChange">
                <el-radio :label="0">全国</el-radio>
                <el-radio :label="1">全省/市</el-radio>
                <el-radio :label="2">区/县</el-radio>
                <el-radio :label="3">手动自选省(选择省/市后，区县任意即可)</el-radio>
                <el-radio :label="4">手动自选县/区</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>

          <el-form-item label="自选城市" prop="selectedOptions" v-if="iszixuanchengshi">
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>

          <el-form-item label="优先级别" prop="moren" >
            <template>
              <el-radio-group v-model="ruleForm.moren"   @change="handleChange">
                <el-radio :label="0">优先级低可重复，没有优先显示的才显示最近创建的</el-radio>
                <el-radio :label="1">优先显示不可重复</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>

          <el-form-item label="标题" prop="dibuBunnerbiaoti">
            <el-input v-model="ruleForm.dibuBunnerbiaoti" :placeholder="ruleForm.dibuBunnerbiaoti"
                      placeholder="用户关键字搜索6-14字"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="ruleForm.url" :disabled="true" autocomplete="off" :placeholder="ruleForm.url"></el-input>
          </el-form-item>

          <el-form-item label="图片" prop="imgUrl">
            <el-upload
              ref="upload"
              :action="uploadDownUrl"
              name="picture"
              list-type="picture-card"
              :limit="1"
              :on-exceed="onExceed"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item label="发布有效期" prop="value1">
            <el-date-picker
              v-model="ruleForm.value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="createForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">
              创建广告发布
            </el-button>
          </el-form-item>
        </el-form>


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
            <el-button @click="examineClick(scope.row)" type="text" size="small"
                       v-if="scope.row.tianjiaguanggao  && scope.row.tablenameid !== 1 && scope.row.tablenameid !== 3">
              添加广告
            </el-button>
            <el-button @click="" type="text" size="small" disabled
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
  import {isguanggao} from '../../../../api/api';
  import {crguanggao} from '../../../../api/api';

  import {uploadDown_update} from '../../../../api/api';
  import {regionData} from 'element-china-area-data'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        listdi: '',
        detailed: '',
        bunnerType: '',
        isguanggao: false,
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
        vos: [],

        iszixuanchengshi: false,
        ruleForm: {
          userId: '',  //o
          permissionid: '',//哪个菜单下  //o
          tableId: '',//id   //o
          url: '',//跳转链接 //o
          dibuBunnerbiaoti: '',//标题    //o

          bunnerType: 1,//0首页弹窗，1首页轮播，2详情页轮播，3边测独立窗口，4其他
          moren: 1,//是否是默认 0是1不是，先查1
          fanwei: 2,//范围范围 0全国优先级最高，1全市，2全区 ,3手动全市省，4手动县区
          selectedOptions: [],//城市detailed
          imgUrl: [],//图片
          value1: [],//开始结束时间
          tablenameid:'',
        },

        rules: {
          bunnerType: [
            {required: true, message: '发布类型不能为空', trigger: 'change'},
          ],
          moren: [
            {required: true, message: '优先级别不能为空', trigger: 'change'},
          ],
          fanwei: [
            {required: true, message: '显示范围不能为空', trigger: 'change'},
          ],
          dibuBunnerbiaoti: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {min: 6, max: 14, message: '标题在6-14字之内'}
          ],

          value1: [
            {required: true, message: '请选择发布有效期', trigger: 'change'},
          ],

          imgUrl: [
            {required: true, message: '如果已上传请继续提交'},
          ],
          selectedOptions: [
            {required: true, message: '请选择城市和地区'}
          ],


        }
      }
    },
    methods: {
//z222222221
      createForm() {
        this.fullscreenLoading = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = false;
            if (this.ruleForm.imgUrl.length < 1) {
              this.$message.error("图片不能为空");
              this.fullscreenLoading = false;
              return false;
            }
            crguanggao(this.ruleForm).then((res) => {
              if (res.status === 0) {
                this.$message.success(res.msg);
                this.ruleForm={};
                this.fileList=[];
                this.isguanggao = false;
                this.getReleaseWelfareAll();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.fullscreenLoading = false;
            return false;
          }
        });
      },
      //点击查看详情  职位简历页面弹窗，其他跳到公开详情页
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
      //查看简历个职位弹窗
      handleClose(done) { //关闭查看详情
        this.zhiweidialogVisible = false;  //职位查看详情弹窗
        this.jianlidialogVisible = false;  //职位查看详情弹窗
        this.tableDataNo = '';
      },
      //更换条件后查询已有广告
      handleChange(value) {
        let pas = {
          selectedOptions: this.ruleForm.selectedOptions,
          bunnerType: this.ruleForm.bunnerType,
          fanwei: this.ruleForm.fanwei,
          moren: this.ruleForm.moren
        };
        isguanggao(pas).then((res) => {
          if (res.status === 0) {
            this.isguanggao = true;
            this.listdi = res.data.listdi;
            this.detailed = res.data.detailed;
            this.bunnerType = res.data.bunnerType;
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      //点击添加广告时触发
      examineClick(row) {
        this.ruleForm.userId = this.user.id;
        this.ruleForm.permissionid = row.permissionid;
        this.ruleForm.tablenameid = row.tablenameid;
        this.ruleForm.tableId= row.dataObject.id;
        this.ruleForm.dibuBunnerbiaoti = row.dataObject.releaseTitle;
        this.ruleForm.url = row.xiangqiurl;
        this.ruleForm.bunnerType=1;
        this.ruleForm.moren=1;
        this.ruleForm.fanwei=2;
        this.ruleForm.selectedOptions = [];
        this.ruleForm.imgUrl = [];
        let list = [];
        list[0] = this.userRealName.provincesId.toString();
        list[1] = this.userRealName.cityId.toString();
        list[2] = this.userRealName.districtCountyId.toString();
        this.ruleForm.selectedOptions = list;
        let pas = {
          selectedOptions: this.ruleForm.selectedOptions,
          bunnerType: this.ruleForm.bunnerType,
          fanwei: this.ruleForm.fanwei,
          moren: this.ruleForm.moren
        };
        isguanggao(pas).then((res) => {

          if (res.status === 0) {
            this.isguanggao = true;
            this.listdi = res.data.listdi;
            this.detailed = res.data.detailed;
            this.bunnerType = res.data.bunnerType;
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      //删除
      submitForm(row) {
        let params = {
          userId: this.user.id,
          id: row.dataObject.id,
          tablenameid: row.tablenameid,
          permissionid: row.permissionid
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
      //查询用户列表
      getReleaseWelfareAll() {
        this.fullscreenLoading = true;
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
          this.fullscreenLoading = false;
          this.isguanggao = false;
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


      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if (res.status === 0) {
          let resdata = res.data;
          var picture = {
            "pictureName": resdata.pictureName,
            "pictureUrl": resdata.pictureUrl,
            "useStatus": 1,
            id: resdata.id,
            "userName": resdata.userName,
            "userId": resdata.userId
          };
          this.ruleForm.imgUrl = this.ruleForm.imgUrl.concat(picture);
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file, fileList) {

        let resdata = file.response.data;
        for (var i = 0; i < this.ruleForm.imgUrl.length; i++) {
          if (resdata.id === this.ruleForm.imgUrl[i].id) {
            uploadDown_update(this.ruleForm.imgUrl[i]).then((res) => {
              if (res.status !== 0) {
                this.$message.error(res.msg);
              }
              this.ruleForm.imgUrl.splice(i, 1)
            });
            break;
          }
        }
      },
      //点击列表中已上传的文件事的钩子函数
      handlePreview(file) {
      },
      //上传的文件个数超出设定时触发的函数
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传1张图片',
          duration: 2000
        });

      },
      //文件上传前的前的钩子函数
      //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt8M = file.size / 1024 / 1024 < 8;
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt8M) {
          this.$message.error('上传图片大小不能超过 8MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt8M;
      },
      reserveChange() {
        if (this.ruleForm.fanwei === 3 || this.ruleForm.fanwei === 4) {
          this.iszixuanchengshi = true;
        } else {
          this.iszixuanchengshi = false;
          this.handleChange();
        }
      }


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

  .isguanggaoClasss {
    width: 99%;
    padding: 0px 10px 10px 10px;
  }
</style>
