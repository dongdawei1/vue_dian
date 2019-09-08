<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      请认真填写信息
      <el-form-item  label="发布类型" prop="releaseType">
        <template>
          <el-radio-group v-model="ruleForm.releaseType">
            <el-radio :label="4" >蔬菜出售</el-radio>
            <el-radio :label="5" >粮油出售</el-radio>
            <el-radio :label="6" >调料/副食出售</el-radio>
            <el-radio :label="29" >水产/禽蛋出售</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="商品类型"  prop="serviceType" >
        <el-autocomplete
          v-model="ruleForm.serviceType"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择销售商品类型"
          clearable></el-autocomplete>
        <!--@select="handleSelect"-->
        <el-button type="primary" @click="dialogFormVisible = true" plain>添加具体类型</el-button>
      </el-form-item>

      <el-row >
        <el-col :span="7" >
          <el-form-item label="商品详情" prop="project" class="el-form-itemUser">
            <el-input v-model="ruleForm.project" placeholder="商品名及规格"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="对应的价格" prop="price" class="el-form-itemUser">
            <el-input v-model.number="ruleForm.price" placeholder="请输入整数" >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="el-form-itemUser">
          <el-button type="primary" @click="addItem" plain>增加一行商品详情</el-button>
        </el-col>
      </el-row>

      <!--动态添加开始-->
      <div  v-for="(item, index) in ruleForm.serviceAndprice" :key="index"  >
        <el-row >
          <el-col :span="7" >
            <el-form-item label="商品详情" prop="project" class="el-form-itemUser">
              <el-input v-model="item.project" placeholder="商品名及规格"  ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="对应的价格" prop="price" class="el-form-itemUser">
              <el-input v-model.number="item.price" placeholder="请输入整数" >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="el-form-itemUser">
            <el-button type="info" @click="deleteItem(item, index)" >删除</el-button>
          </el-col>
        </el-row>
      </div>
      <!--动态添加结束-->


      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="用户关键字搜索6-14字"></el-input>
      </el-form-item>
      <el-form-item label="具体描述" prop="serviceIntroduction">
        <el-input
          type="textarea"
          placeholder="如：具体服务/销售地址，企业信息等"
          v-model="ruleForm.serviceIntroduction"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks" >
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>


      <el-form-item label="服务区域"  prop="serviceDetailed">
        <el-select v-model="ruleForm.serviceDetailed" placeholder="请选择服务/销售区域">
          <el-option label="全市" value="全市"></el-option>
          <el-option label="来电确认" value="来电确认"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图片" prop="pictureUrl">
        <el-upload
          ref="upload"
          action="/api/uploadDown/upload"
          name="picture"
          list-type="picture-card"
          :limit="8"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"   >
          <img width="100%"   :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>


      <el-form-item label="联系人" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName"  autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  prop="contact">
        <el-input v-model="ruleForm.contact"  autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      实名信息
      <el-form-item label="公司名称"  >
        <el-input v-model="realName.companyName" :disabled="true" autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市" >
        <el-input v-model="realName.detailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="实名地址" >
        <el-input v-model="realName.addressDetailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.addressDetailed"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布</el-button>
      </el-form-item>
    </el-form>
    <!-- 成功弹窗  -->
    <el-dialog
      title="发布成功"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="cntinue"
    >
      <span>请关注审核状态，约24小时内完成审核</span>
      <span slot="footer" class="dialog-footer">
   <el-button type="primary" @click="" >
     <router-link
       v-on:click.native=""
       to="/home/myRelease" class="a" >查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->

    <!--添加商品/服务类型弹窗开始-->
    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" >
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="serviceTypeName">
          <el-input v-model="form.serviceTypeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create_serviceType('form')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加商品/服务类型弹窗结束-->
  </div>
</template>
<script>


  import {  isRoleMessage } from '../../../../api/api';
  import { getRealName } from '../../../../api/api';

  import { uploadDown_update } from '../../../../api/api';
  import {  checke_isButten } from '../../../../api/api';

  import {   get_serviceType } from '../../../../api/api';
  import {   create_serviceType } from '../../../../api/api';
  import {   create_foodAndGrain } from '../../../../api/api';


  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }  else {
            callback();

          }
        }, 100);
      };
      return {
        restaurants: [],//标题下拉
        timeout:  null,
        dialogFormVisible: false,//添加商品类型弹窗
        StringPath:'/home/foodAndGrain',
        fileList:[],
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading:false,
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息

        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          userId:'',
          releaseType:'',//发布类型
          releaseTitle:'',//标题

          serviceType:'',//商品/服务类型
          serviceAndprice:[],//项目及价格KEY，vaule

          project:'', //项目
          price:'' ,//价格

          serviceIntroduction:'',//介绍
          remarks:'',//备注
          serviceDetailed:'',//服务地址 来电确认和全市
          pictureUrl:[],//图片
          //实名中获取

          contact:'',  //实名联系联系方式 回显 可修改
          consigneeName:'', //联系人姓名 回显可修改
        },
        form: {
          serviceTypeName: '',
          releaseType:'',
        },
        formLabelWidth: '100px',
        rules: {
          releaseType: [
            { required: true, message: '发布类型不能为空', trigger: 'change' },
          ],

          serviceDetailed: [
            { required: true, message: '请选服务/销售城区', trigger: 'change' }
          ],
          serviceType: [
            { required: true, message: '请选销售类型', trigger: 'change' }
          ],
          releaseTitle:[
            {  required: true, message: '标题不能为空', trigger: 'blur'},
            { min: 6, max: 14, message: '标题在6-14字之内' }
          ],
          serviceIntroduction:[
            {  required: true, message: '具体描述不能为空', trigger: 'blur' },
            { min: 1, max: 500, message: '具体描述不能超过500个字' }
          ],

          remarks:[
            {  max: 30, message: '备注小于30字' }
          ],

          pictureUrl:[
            { required: true, message: '如果已上传请继续提交' },
          ],
          contact:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
          ],
          consigneeName:[
            { required: true, message: '请输入姓名' },
            { min:2,max: 12, message: '长度在2至11位之间', trigger: 'blur' }
          ],
          serviceTypeName:[
            { required: true, message: '请输入商品/服务类型' },
            { min:2,max: 15, message: '长度在2至15位之间', trigger: 'blur' }
          ],
          project:[
            { required: true, message: '请输入项目/规格' },
            { min:2,max: 12, message: '长度在2至12位之间', trigger: 'blur' }
          ],
          price:[
            { required: true,validator: checkAge, trigger: 'blur'},
            // { type: 'number', message: '年龄必须为数字值'}
          ],}
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {

      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let serviceAndpriceNo={
              project: this.ruleForm.project,
              price: this.ruleForm.price,
            };
            this.ruleForm.serviceAndprice=this.ruleForm.serviceAndprice.concat(serviceAndpriceNo);
            let length=this.ruleForm.serviceAndprice.length;
            if(length>1){
              for(let a=0;a<length;a++){
                let serviceAndpriceNoa=this.ruleForm.serviceAndprice[a];
                if(serviceAndpriceNoa.project==='' || serviceAndpriceNoa.price==='' ){
                  this. deleteItem (serviceAndpriceNo, length-1)
                  this.$message.error("新增加:项目/规格或者价格不能有空值")
                  return false;
                }
              }
            }

            create_foodAndGrain(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                //成功弹窗
                this.fileList=[];
                this.ruleForm.pictureUrl=[];
                this.ruleForm.serviceAndprice=[];
                this.centerDialogVisible=true;
              } else {
                isRoleMessage(res.msg);
              }
            });
          } else {
            this.fullscreenLoading=false;
            return false;
          }
        });
      },

      cntinue(){  //留在本页继续发布
        this.centerDialogVisible=false;
      },
      getRealName(){
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            this.ruleForm.contact= this.realName.contact;
            this.ruleForm.consigneeName= this.realName.consigneeName;
          }else {
            isRoleMessage(res.msg);
          }
        });
      },

      checke_isButten(){
        checke_isButten(this.StringPath).then((res) => {
          if(res.status===0){
            if (res.data.isCreate === true) {
              if (res.data.isAuthentication !== 2) {
                this.$router.push({path: '/home/myAccount'});
              }else {
                this.resdata =res.data.data;
                this.ruleForm.userId=this.resdata.id;
                this.getRealName();
              }} else {
              this.$router.push({path: '/home/release'});
            }}else{
            isRoleMessage(res.msg);
          }
        });
      },


      //图片上传相关
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        if(res.status===0){
          let resdata=res.data;
          var picture={"pictureName":resdata.pictureName ,"pictureUrl": resdata.pictureUrl, "useStatus":1,id:resdata.id,"userName":resdata.userName,"userId":resdata.userId};
          this.ruleForm.pictureUrl= this.ruleForm.pictureUrl.concat(picture);
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file,fileList) {

        let resdata=file.response.data;
        for(var i=0;i< this.ruleForm.pictureUrl.length;i++){
          if(resdata.id===this.ruleForm.pictureUrl[i].id){
            uploadDown_update(this.ruleForm.pictureUrl[i]).then((res) => {
              if(res.status!==0 ){
                this.$message.error(res.msg);
              }
              this.ruleForm.pictureUrl.splice(i,1)
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
          message: '最多只能上传8张图片',
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

      //下拉
      querySearchAsync(queryString, cb) {
        // this.releaseWelfare.releaseTitle=queryString;
        if(this.ruleForm.releaseType===''){
          this.$message.error("请先选择:发布类型")
          return false;
        }
        this.get_serviceType();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.restaurants);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      get_serviceType(){


        let param={
          serviceType:this.ruleForm.serviceType,
          releaseType:this.ruleForm.releaseType,
        };
        get_serviceType(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i] , "address": list[i]};
              releaseTitleList=releaseTitleList.concat(releaseTitle);
            }
            this.restaurants=releaseTitleList;
            //没有找到用户输入的类型引导添加
            if(this.restaurants.length===0){
              this.$message.error("没有找到您输入的:具体类型,可手动添加");
              this.form.serviceTypeName=this.ruleForm.serviceType;
              this.ruleForm.serviceType='';
            }
          }else {
            isRoleMessage(res.msg);
          }
        });
      },
      create_serviceType(){
        this.fullscreenLoading=true;
        if(this.ruleForm.releaseType===''){
          this.$message.error("请先选择:发布类型")
          this.fullscreenLoading=false;
          this.dialogFormVisible=false;
          return false;
        }
        this.form.releaseType=this.ruleForm.releaseType;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            create_serviceType(this.form).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                this.$message.success("添加成功");
                this.ruleForm.serviceType=this.form.serviceTypeName;
                this.dialogFormVisible=false;
                //成功弹窗
                // this.fileList=[];
                // this.ruleForm.pictureUrl=[];
                // this.centerDialogVisible=true;
              } else {
                isRoleMessage(res.msg);
              }
            });
          } else {
            this.fullscreenLoading=false;
            return false;
          }
        });
      },

      addItem () {
        this.ruleForm.serviceAndprice.push({
          project: '',
          price: ''
        })
      },
      deleteItem (item, index) {
        this.ruleForm.serviceAndprice.splice(index, 1)
      }
    }
  }

</script>
<style>


  .el-form-itemUser{
    display:block;
    float:left;
    margin : 1px 0px 8px 1px;
    padding: 1px 0px 10px 1px;

  }

</style>
