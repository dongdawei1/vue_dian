<template>
  <div>
    <!--c查询框开始-->
    <el-form :inline="true" :model="realName" class="demo-form-inline">

      <el-form-item label="用户名登陆名">
        <el-input v-model="realName.userName" placeholder="用户登陆系统名称" clearable></el-input>
      </el-form-item>

      <el-form-item label="显示城市">
        <template>
          <el-radio-group v-model="realName.fanwei">
            <el-radio :label="0">全国</el-radio>
            <el-radio :label="1">全省/市</el-radio>
            <el-radio :label="2">区/县</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="请选择城市" class="authentiCationFailureClass">
        <el-cascader
          size="large"
          :options="options"
          v-model="realName.selectedOptions"
          @change="handleChange"
          clearable>
        </el-cascader>
        若 -显示城市 -选择自选省,选该省任意市区即可，自选县区需要选择精确地址
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getguangaoAll1" v-loading.fullscreen.lock="fullscreenLoading">查询
        </el-button>
      </el-form-item>
    </el-form>

    <!--全部表格开始-->
    <el-table
      :data="vos"
      border
      style="width: 100%"
      max-height="500">
      <el-table-column
        prop="id"
        label="id"
        width="70">
      </el-table-column>

      <el-table-column
        label="显示位置" width="95">
        <template slot-scope="scope5">
          <span v-if="scope5.row.bunnerType===0">首页弹窗</span>
          <span v-if="scope5.row.bunnerType===1">首页轮播</span>
          <span v-if="scope5.row.bunnerType===2">详情页轮播</span>
        </template>
      </el-table-column>
      <el-table-column
        label="显示范围" width="80">
        <template slot-scope="scope6">
          <span v-if="scope6.row.fanwei===0">全国</span>
          <span v-if="scope6.row.fanwei===1">全省/市</span>
          <span v-if="scope6.row.fanwei===2">全区/县</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间" :show-overflow-tooltip="true" width="170">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间" :show-overflow-tooltip="true" width="170">
      </el-table-column>


      <el-table-column
        label="优先级别" width="90">
        <template slot-scope="scope3">
          <span v-if="scope3.row.moren===0">默认显示</span>
          <span v-if="scope3.row.moren===1">优先显示</span>
        </template>
      </el-table-column>

      <el-table-column
        label="显示状态" width="80">
        <template slot-scope="scope4">
          <span v-if="scope4.row.bunnerStatus===0">未开始</span>
          <span v-if="scope4.row.bunnerStatus===1">显示中</span>
          <span v-if="scope4.row.bunnerStatus===2">已失效</span>
          <span v-if="scope4.row.bunnerStatus===3">已关闭</span>
        </template>
      </el-table-column>


      <el-table-column
        prop="detailed"
        label="显示城区" :show-overflow-tooltip="true" width="160">
      </el-table-column>
      <el-table-column
        prop="introduceList"
        label="发布用户名" :show-overflow-tooltip="true" width="120">
      </el-table-column>
      <el-table-column
        prop="releaseType"
        label="发布类型" :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="examineName"
        label="创建人" :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        fixed="right"
        label="操作"
        width="260">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看
          </el-button>
          <el-button @click="bianji(scope.row )" type="text" size="small"
                     v-if="scope.row.bunnerStatus===0  || scope.row.bunnerStatus===1"> 编辑
          </el-button>


          <el-button @click="examineClick(scope.row ,2)" type="text" size="small"
                     v-if="scope.row.bunnerStatus===0 "> 马上生效
          </el-button>

          <el-button @click="examineClick(scope.row ,3)" type="text" size="small"
                     v-if="scope.row.bunnerStatus===1 || scope.row.bunnerStatus===0 "> 关闭发布
          </el-button>

          <el-button @click="" type="text" size="small" disabled
                     v-if="scope.row.bunnerStatus===2"> 重新发布请求发布管理中操作
          </el-button>
          <el-button @click="" type="text" size="small" disabled
                     v-if="scope.row.bunnerStatus===3"> 手动关闭的广告
          </el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="realName.currentPage"
      :page-size="realName.pageSize"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>


    <!--创建表单开始-->
    <!--查看详情弹窗开始-->
    <el-dialog
      title="发布详情"
      :visible.sync="dialogVisiblebianji"
      width="60%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="广告类型" prop="bunnerType">
          <template>
            <el-radio-group v-model="ruleForm.bunnerType">
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
              <el-radio :label="3">手动自选省</el-radio>
              <el-radio :label="4">手动自选县/区</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>

        <el-form-item label="请选择城市" v-if="iszixuanchengshi" class="authentiCationFailureClass">
          <el-cascader
            size="large"
            :options="options"
            v-model="ruleForm.selectedOptions"
            @change="handleChange">
          </el-cascader>
          若 -显示城市 -选择自选省,选该省任意市区即可
        </el-form-item>

        <el-form-item label="优先级别" prop="moren">
          <template>
            <el-radio-group v-model="ruleForm.moren" @change="handleChange">
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
          <el-button type="primary" @click="handleClose()">关闭</el-button>
          <el-button type="primary" @click="createForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">
            编辑广告发布
          </el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
  import {agetguangaoAll} from '../../../../api/api';
  import {aupguangao} from '../../../../api/api';

  import {echo_display} from '../../../../api/api';
  import {regionData} from 'element-china-area-data'

  export default {
    data() {
      return {
        dialogVisiblebianji: false,
        total: 0,
        dialogVisible: false,  //查看详情弹窗
        dialogImageUrl: '',
        fileList: [],
        iszixuanchengshi: false,//显示城市选项
        fullscreenLoading: false,
        options: regionData,//城市
        //分页结束
        realName: { //查询条件
          userName: '',
          selectedOptions: [],//城市detailed
          fanwei: '',
          //分页开始
          currentPage: 1,
          pageSize: 20,//每页显示的数量
          //分页结束
        },

        vos: [],
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
          tablenameid: '',
          type: ''
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
          ]

        }
      }
    },
    methods: {
//z222222221
      createForm() {
        length = 0;
        for (let i = 0; i < this.ruleForm.imgUrl.length; i++) {
          if (this.ruleForm.imgUrl[i].useStatus === 1 || this.ruleForm.imgUrl[i].useStatus === 3) {
            length++;
          }
        }
        if (length <= 0) {
          this.$message.error("图片不能为空");
          this.fullscreenLoading = false;
          return false;
        }
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            aupguangao(this.ruleForm).then((res) => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.ruleForm = {};
                this.fileList = [];

                this.iszixuanchengshi = false;
                this.$message.success(res.msg);
                this.dialogVisiblebianji = false;
                this.getguangaoAll();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        });
      },
      //点击查看详情  ，跳到公开详情页
      handleClick(row) {
        //新窗口打开只能用  resolve
        let routeUrl = this.$router.resolve({path: row.url});
        window.open(routeUrl.href, '_blank');
        return true;
      },

      //
      handleChange() {
      },

      bianji(row) {
        //打开弹窗

        this.ruleForm = row;
        let a = {
          pictureUrl: this.ruleForm.imgUrl
        };
        let fileListAndPictureUrl = echo_display(a);
        //图片回显和表格参数
        this.ruleForm.selectedOptions = [];
        this.ruleForm.imgUrl = fileListAndPictureUrl.pictureUrl;
        this.fileList = fileListAndPictureUrl.fileList;
        this.ruleForm.type = 1;
        this.dialogVisiblebianji = true;

      },


      //编辑时触发
      examineClick(row, type) {
        if (type === 3 || type === 2) {
          let params = {
            id: row.id,
            type: type
          };
          aupguangao(params).then((res) => {
            if (res.status === 0) {
              this.$message.success(res.msg);
              this.getguangaoAll();

              return false;
            } else {
              this.$message.error(res.msg);
              return false;
            }
          });
        }
      },

      //查询全部广告
      getguangaoAll() {
        this.fullscreenLoading = true;
        if (!this.$fsAuthent()) {
          return false;
        }
        let role = window.localStorage.getItem('dian_role');
        if (role !== '1') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        agetguangaoAll(this.realName).then((res) => {
          this.fullscreenLoading = false;
          if (res.status === 0) {
            this.vos = res.data.datas;
            this.total = res.data.totalno; //总条数
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
        for (var i = 0; i < this.ruleForm.imgUrl.length; i++) {
          if (file.id === undefined) {
            if (file.response.data.id === this.ruleForm.imgUrl[i].id) {
              this.ruleForm.imgUrl[i].useStatus = 2;
              break;
            }
          } else if (file.id === this.ruleForm.imgUrl[i].id) {
            this.ruleForm.imgUrl[i].useStatus = 2;
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

      getguangaoAll1() {
        this.realName.currentPage = 1;
        this.getguangaoAll();
      },
      handleCurrentChange(currentPage) {
        this.realName.currentPage = currentPage;
        this.getguangaoAll();
      },
      handleClose(done) { //关闭查看详情
        this.ruleForm = {
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
          tablenameid: '',
          type: ''
        };
        this.iszixuanchengshi = false;
        this.dialogVisiblebianji = false;
        this.getguangaoAll();
      },
      reserveChange() {
        if (this.ruleForm.fanwei === 3 || this.ruleForm.fanwei === 4) {
          this.iszixuanchengshi = true;
        } else {
          this.iszixuanchengshi = false;
        }
      }

    }
  }
</script>
<style>
</style>
