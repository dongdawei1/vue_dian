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
            <el-radio :label="9" >清洁用品</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>

      <el-form-item label="商品名称"  prop="serviceType" >
        <el-autocomplete
          v-model="ruleForm.serviceType"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入或点击选择商品名称"

          @select="serviceTypeUrl"
          clearable></el-autocomplete>
      </el-form-item>

      <div>
        <div v-if="commodityUrl!== null && commodityUrl!==''">
          &nbsp;&nbsp; &nbsp; 参照图片 <img :src="commodityUrl"  >
        </div>
      </div>
      <el-form-item label="标题" prop="releaseTitle">
        <el-input v-model="ruleForm.releaseTitle" placeholder="如：红薯（黄心红薯）某某品种"></el-input>
      </el-form-item>

      <el-form-item label="产地"   prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="产地详情" prop="addressDetailed">
        <el-input v-model="ruleForm.addressDetailed" placeholder="详细地址"></el-input>
      </el-form-item>

      <el-form-item  label="包装方式" prop="commodityPacking">
        <template>
          <el-radio-group v-model="ruleForm.commodityPacking" @change="commodityPackingChange">
            <el-radio :label="1" >散装</el-radio>
            <el-radio :label="2" >袋装</el-radio>
            <el-radio :label="3" >瓶装</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>



      <el-form-item :label="jiagetype" prop="commodityJiage" >
        <el-input v-model="ruleForm.commodityJiage" placeholder="请输入价格,最多两位小数"  ></el-input>
      </el-form-item>
      &nbsp; &nbsp;

       <el-form-item :label="type" prop="commodityCountNo" >
            <el-input v-model.number="ruleForm.commodityCountNo" placeholder="请输入整数"  ></el-input>
          </el-form-item>



      <el-row v-if="isServiceAndprice"  >
        <el-col :span="7" >
          <el-form-item label="包装规格" prop="cations" class="el-form-itemUser">
            <el-input v-model="ruleForm.cations" placeholder="请输入数字最多两位小数"  ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item  label="单位" prop="specifi" class="el-form-itemUser">
            <template>
              <el-radio-group v-model="ruleForm.specifi" >
                <el-radio :label="1" v-if="isg">g</el-radio>
                <el-radio :label="2" v-if="isg">kg</el-radio>
                <el-radio :label="3" v-if="isl">ML</el-radio>
                <el-radio :label="4" v-if="isl">L</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      注:只有在您选定的价格有效期内展示本条商品信息，<br>
      &nbsp;&nbsp;  蔬菜类开始时间最多是 2天后 结束时间最多是4天后；<br>
      &nbsp;&nbsp;  非蔬菜类开始时间最多是 2天后 结束时间最多是15天后；
      <el-form-item label="价格有效期" prop="value1">
        <el-date-picker
          @change="value11"
          v-model="ruleForm.value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商品描述" prop="serviceIntroduction">
        <el-input
          type="textarea"
          placeholder="如：xx红薯适合蒸煮.."
          v-model="ruleForm.serviceIntroduction"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks" >
        <el-input v-model="ruleForm.remarks" placeholder="备注30字以内"></el-input>
      </el-form-item>


      <el-form-item  label="预定方式" prop="reserve">
        <template>
          <el-radio-group v-model="ruleForm.reserve" @change="reserveChange">
            <!--     <el-radio :label="1" disabled>支持线上下单</el-radio> -->
                 <el-radio :label="2" >仅可电话咨询</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>


        <el-form-item  label="送货方式" prop="deliveryType" v-if="isdeliveryType">
          <template>
            <el-radio-group v-model="ruleForm.deliveryType" @change="deliveryTypeChange">
              <el-radio :label="1" disabled >自提</el-radio>
           <!--   <el-radio :label="2" >有偿送货</el-radio>
              <el-radio :label="3" >自提/有偿送货均支持</el-radio>
              <el-radio :label="4" >满N元免运费</el-radio> -->
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item :label="deliveryCollectType" prop="deliveryCollect" v-if="isdeliveryCollect">
        <el-input v-model.number="ruleForm.deliveryCollect" placeholder="请输入金额,最多两位小数"></el-input>
      </el-form-item>



      <el-form-item label="图片" prop="pictureUrl">
        <el-upload
          ref="upload"
          :action="uploadDownUrl"
          name="picture"
          list-type="picture-card"
          :limit="5"
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



      实名信息(修改实名信息请到-个人中心)
      <el-form-item label="联系人">
        <el-input v-model="realName.consigneeName"  :disabled="true" autocomplete="off" :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" >
        <el-input v-model="realName.contact" :disabled="true"  autocomplete="off" :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="市场名称"  >
        <el-input v-model="realName.companyName" :disabled="true" autocomplete="off" :placeholder="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="实名城市" >
        <el-input v-model="realName.detailed" :disabled="true" autocomplete="off" :placeholder="ruleForm.detailed"></el-input>
      </el-form-item>
      <el-form-item label="市场地址" >
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
   <el-button type="primary"><router-link
     v-on:click.native="goRelease"
     to="" class="a" >查看我的发布</router-link></el-button>
     </span>
    </el-dialog>
    <!-- 成功弹窗结束  -->


  </div>
</template>
<script>
  import { getRealName } from '../../../../api/api';
  import { uploadDown_update } from '../../../../api/api';
  import {   get_serviceTypeUrl } from '../../../../api/api';
  import {   create_wholesaleCommodity } from '../../../../api/api';
  import { regionData } from 'element-china-area-data';

  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空或者0'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入整数'));
          }  else {
            callback();
          }
        }, 100);
      };
   var   checkjiage= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }

     if ( /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(value)) {
       callback();
     }
      return callback(new Error('输入有误！请输入数字最多两位小数'));
      };

      return {
        restaurants: [],//标题下拉
        timeout:  null,
        dialogFormVisible: false,//添加商品类型弹窗
        StringPath:'/home/wholesaleMarket',
        fileList:[],
        centerDialogVisible: false,//成功弹窗
        fullscreenLoading:false,
        resdata:'',//获取的用户信息
        realName:'',//用户实名信息
        //城市组件相关开始
        options: regionData,//城市   npm install element-china-area-data -S  城市联动组件 @4.1.2
        //文件上传的参数
        dialogImageUrl: '',
        dialogVisible: false,
        isServiceAndprice:false,//散装就不展示了
        isg:false,
        isl:false,
        isdeliveryType: false,//是否展示送货方式
        isdeliveryCollect:false,//是否展示收取运费
        deliveryCollectType:'运费',
        type:'总数(kg)',
        jiagetype:'单价(元/kg)',
        urllist:[],//示例图片list
        commodityUrl:'',//示例图片
        ruleForm: {
          userId:'',
          releaseType:'',//发布类型
          serviceType:'',//商品名称
          releaseTitle:'',//标题
          selectedOptions:[],//产地
          addressDetailed:'',
          commodityPacking:1,//包装方式
          commodityJiage:'',//价格
          specifi:2,//包装/规格  单位 散装, kg ,g,  L ,ML,  commoditySpecifications:'散装',//产品规格
          cations:0,//包装/规格  输入框
          commodityCountNo:'',//总量
          serviceIntroduction:'',//介绍
          remarks:'',//备注
          value1:[],//价格开始结束时间
          reserve:2,//是否接受预定
          deliveryType:1,//送货方式
          deliveryCollect:0,
          pictureUrl:[],//图片
          //实名中获取
          serviceDetailed:'',
        },

        rules: {
          releaseType: [
            { required: true, message: '发布类型不能为空', trigger: 'change' },
          ],
          commodityPacking: [
            { required: true, message: '包装类型不能为空', trigger: 'change' },
          ],
          cations: [
            { required: true,validator: checkjiage, trigger: 'blur'},
          ],
          specifi: [
            { required: true, message: '包装单位不能为空', trigger: 'change' },
          ],
          commodityCountNo: [
            { required: true,validator: checkAge, trigger: 'blur'},
          ],
          commodityJiage: [
            { required: true,validator: checkjiage, trigger: 'blur'},
          ],
          reserve: [
            { required: true, message: '请选择是否支持线上预定', trigger: 'change' },
          ],
          deliveryType: [
            { required: true, message: '请选择送货方式', trigger: 'change' },
          ],
          deliveryCollect:[
            { required: true,validator: checkjiage, trigger: 'blur'},
          ],
          value1: [
            { required: true, message: '请选择价格有效期', trigger: 'change' },
          ],

          serviceType: [
            { required: true, message: '请选商品名称', trigger: 'change' }
          ],
          releaseTitle:[
            {  required: true, message: '标题不能为空', trigger: 'blur'},
            { min: 6, max: 14, message: '标题在6-14字之内' }
          ],
          selectedOptions: [
            { required: true, message: '请选择产地' }
          ],
          addressDetailed:[
            {  max: 100, message: '产地详情不能超过100个字' }
          ],
          serviceIntroduction:[
            {  required: true, message: '商品描述不能为空', trigger: 'blur' },
            { min: 1, max: 50, message: '商品描述不能超过50个字' }
          ],

          remarks:[
            {  max: 30, message: '备注小于30字' }
          ],

          pictureUrl:[
            { required: true, message: '如果已上传请继续提交' },
          ]
          }
      }
    },

    created () {
      this.getRealName();
    },
    methods: {
      goRelease(){
        this.centerDialogVisible=false;
        this.$router.push({path: '/home/myRelease'});
      },
      //提交
      submitForm(ruleForm) {
        if (!this.$fsAuthent()) {
          return false;
        };
       this.fullscreenLoading=true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(this.ruleForm.pictureUrl.length<1){
              this.$message.error("图片不能为空");
              this.fullscreenLoading=false;
              return false;
            }
            create_wholesaleCommodity(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                //成功弹窗
                this.fileList=[];
                this.ruleForm.pictureUrl=[];
                this.centerDialogVisible=true;
              } else {
                this.$msgdeal(res.msg);
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
        if (!this.$fsAuthent()) {
          return false;
        };
        let role = window.localStorage.getItem('dian_role');
        if (  role !== '1' && role !== '13') {
          this.$router.push({path: '/home/release'});
          return false;
        }
        getRealName().then((res) => { //获取实名信息填充
          if(res.status ===0 ) {
            this.realName=res.data;
            this.ruleForm.userId=this.realName.userId;
          }else {
            this.$msgdeal(res.msg);
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
          message: '最多只能上传5张图片',
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
      //城市组件
      handleChange (value) {
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
        get_serviceTypeUrl(param).then((res) => {
          if(res.status===0) {
            let list=res.data;
            let releaseTitleList=[];
            let urllist=[];
            for(let i=0;i<list.length;i++){
              let  releaseTitle={ "value":list[i].serviceTypeName, "address": list[i].id};
              releaseTitleList=releaseTitleList.concat(releaseTitle);

              let  url={"serviceTypeName" : list[i].serviceTypeName ,"pictureUrl":list[i].pictureUrl};
              urllist=urllist.concat(url);
            }
            this.restaurants=releaseTitleList;
            this.urllist=urllist;
            //没有找到用户输入的类型引导添加
            if(this.restaurants.length===0){
              this.$message.error("没有找到您输入的:商品名称,可联系客服添加");
            }
          }else {
            this.$msgdeal(res.msg);
          }
        });
      },
      commodityPackingChange(){
       if(this.ruleForm.commodityPacking===1){
          this.isServiceAndprice=false;
         this.isg=false;
         this.isl=false;
         this.ruleForm.cations=0;
         this.ruleForm.specifi=2; //kg
         this.type='总数(kg)';
         this.jiagetype='单价(元/kg)';
        }
      else  if(this.ruleForm.commodityPacking===2){
          this.isServiceAndprice=true;
         this.isg=true;
          this.isl=false;
         this.ruleForm.cations='';
         this.type='总数(袋)';
         this.jiagetype='单价(元/袋)';
        }  else  if(this.ruleForm.commodityPacking===3){
         this.isServiceAndprice=true;
         this.isg=false;
         this.isl=true;
         this.ruleForm.cations='';
         this.type='总数(瓶)';
         this.jiagetype='单价(元/瓶)';
       }
      },

      reserveChange(){
        if(this.ruleForm.reserve===1){
          this.isdeliveryType=true;
        }else if(this.ruleForm.reserve===2){
          this.isdeliveryType=false;
        }
      },

     deliveryTypeChange(){
        if(this.ruleForm.deliveryType===1){
          this.isdeliveryCollect=false;
          this.deliveryCollectType='运费';
          this.ruleForm.deliveryCollect=0;
        }else if(this.ruleForm.deliveryType===2 ||this.ruleForm.deliveryType===3){
          this.isdeliveryCollect=true;
          this.deliveryCollectType='运费(元)';
        }else if(this.ruleForm.deliveryType===4 ){
          this.isdeliveryCollect=true;
          this.deliveryCollectType='满(元)免';
        }
  },

      value11(){
      },

      serviceTypeUrl(){
        for(let i=0;i<this.urllist.length;i++){
          let serviceTypeName=this.urllist[i].serviceTypeName;
           if(this.ruleForm.serviceType===serviceTypeName){
             this.commodityUrl=this.urllist[i].pictureUrl;
           }
        }
      },

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
