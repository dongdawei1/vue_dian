<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p>创建简历</p>
      <el-form-item label="求职类型" prop="position">
        <template>
          <el-select v-model="ruleForm.position" filterable placeholder="请输入或点击选择职位类型">
            <el-option
              v-for="item in restaurants"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>


      <el-form-item label="工资要求" prop="salary">
        <el-select v-model="ruleForm.salary" placeholder="请选择工资">
          <el-option label="2000元以上" value="2000元以上"></el-option>
          <el-option label="3000元以上" value="3000元以上"></el-option>
          <el-option label="4000元以上" value="4000元以上"></el-option>
          <el-option label="5000元以上" value="5000元以上"></el-option>
          <el-option label="6000元以上" value="6000元以上"></el-option>
          <el-option label="8000元以上" value="8000元以上"></el-option>
          <el-option label="10000元以上" value="10000元以上"></el-option>
          <el-option label="面议" value="面议"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="学历" prop="education">
        <el-select v-model="ruleForm.education" placeholder="请选择学历">
          <el-option label="无" value="无"></el-option>
          <el-option label="初中以上" value="初中以上"></el-option>
          <el-option label="高中以上" value="高中以上"></el-option>
          <el-option label="大专以上" value="大专以上"></el-option>
          <el-option label="本科以上" value="本科以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作经验" prop="experience">
        <el-select v-model="ruleForm.experience" placeholder="请选工作年限">
          <el-option label="无" value="无"></el-option>
          <el-option label="1-2年" value="1-2年"></el-option>
          <el-option label="2-5年" value="2-5年"></el-option>
          <el-option label="5-10年" value="5-10年"></el-option>
          <el-option label="10年以上" value="10年以上"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" placeholder="18-60岁之间"></el-input>
      </el-form-item>


      <el-form-item label="性别" prop="gender">
        <template>
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>


      <el-form-item label="求职城区" prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="所在城区" prop="selectedOptions1">
        <el-cascader
          size="large"
          :options="options"
          v-model="ruleForm.selectedOptions1"
          @change="handleChange1">
        </el-cascader>
      </el-form-item>


      <el-form-item label="自我描述" prop="describeOne">
        <el-input
          type="textarea"
          placeholder="如：具体工作范围，或者其他福利要求"
          v-model="ruleForm.describeOne"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email" placeholder="请输入正确邮箱"></el-input>
      </el-form-item>
      <p>实名信息</p>

      <el-form-item label="联系人" prop="addressDetailed">
        <el-input v-model="ruleForm.consigneeName" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.consigneeName"></el-input>
      </el-form-item>


      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="ruleForm.contact" :disabled="true" autocomplete="off"
                  :placeholder="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="公开电话" prop="isPublishContact">

        <el-radio-group v-model="ruleForm.isPublishContact">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">不公开</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {get_position} from '../../../../api/api';
  import {regionData} from 'element-china-area-data'
  import {getRealName} from '../../../../api/api';
  import {create_resume} from '../../../../api/api';
  import {select_resume_by_id} from '../../../../api/api';


  export default {
    data() {
      return {
        fullscreenLoading: false,
        selectedOptions: [],
        realName: '',//用户实名信息
        options: regionData, //城市组件
        restaurants: '', // 类型数据
        ruleForm: {
          selectedOptions: [],
          selectedOptions1: [],
          userId: '',
          position: '',  //职位类型
          salary: '', //
          education: '', //学历
          experience: '', //工作年限
          age: '',//年龄范围
          gender: '',//性别
          describeOne: '',//职位描述 100字以下
          email: '',  //非必填
          isPublishContact: '', // 是否公开手机 1公开，2隐藏
          //实名中获取
          contact: '',  //实名联系联系方式 回显置灰 不可修改
          consigneeName: '', //联系人姓名 回显置灰 不可修改
          type: 1  //1为创建2为重新发起或者编辑
        },
        permission: '',
        role: '',
        rules: {
          selectedOptions: [
            {type: 'array', required: true, message: '请选择求职城市', trigger: 'change'}
          ],
          selectedOptions1: [
            {type: 'array', required: true, message: '请选择所在城市', trigger: 'change'}
          ],
          position: [
            {required: true, message: '职位类型不能为空', trigger: 'change'},
          ],
          salary: [
            {required: true, message: '请选择工资', trigger: 'change'}
          ],
          education: [
            {required: true, message: '学历不能为空', trigger: 'change'}
          ],
          experience: [
            {required: true, message: '工作经验不能为空', trigger: 'change'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '性别不能为空', trigger: 'change'}
          ],

          describeOne: [
            {required: true, message: '自我描述不能为空', trigger: 'change'},
            {min: 1, max: 100, message: '自我描述不能超过100个字', trigger: 'blur'}
          ],
          isPublishContact: [
            {required: true, message: '请勾选是否公开电话', trigger: 'change'}
          ]
        }
      }
    },

    created() {
      this.jurisdiction()
    },
    methods: {
      //提交
      submitForm(ruleForm) {
        this.fullscreenLoading = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            create_resume(this.ruleForm).then(res => {
              this.fullscreenLoading = false;
              if (res.status === 0) {
                this.$message.success("创建成功，我们将尽快审核！");
                this.$router.push({path: '/home/myRelease'});
              } else {
                this.$msgdeal(res.msg);
              }
            });
          } else {
            this.fullscreenLoading = false;
            return false;
          }
        });
      },

      cntinue() {  //留在本页继续发布
        this.centerDialogVisible = false;
      },
      getRealName() {
        getRealName().then((res) => { //获取实名信息填充
          if (res.status === 0) {
            this.realName = res.data;
            let em = this.realName.email;
            if (em !== '' && em !== null) {
              this.ruleForm.email = em;
            }
            this.ruleForm.userId = this.realName.userId;
            this.ruleForm.contact = this.realName.contact;
            this.ruleForm.consigneeName = this.realName.consigneeName;

            this.selectedOptions[0] = this.realName.provincesId.toString();
            this.selectedOptions[1] = this.realName.cityId.toString();
            this.selectedOptions[2] = this.realName.districtCountyId.toString();

            this.ruleForm.selectedOptions = this.selectedOptions;
            this.ruleForm.selectedOptions1 = this.selectedOptions;

          } else {
            this.$msgdeal(res.msg);
          }
        });
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
              this.$message.error("已有简历请去个人中心查看");
              this.$router.push({path: '/home/myRelease'});
              return false;
            } else {//没有创建过
              this.getRealName();
              this.loadAll();//获取完用户信息在调用
            }
          } else {
            this.$msgdeal(res.msg);
          }
        });
      },

      //城市组件
      handleChange(value) {
      },
      handleChange1(value) {
      },
      //下拉列表

      loadAll() {
        get_position().then((res) => {
          let datalist = res.data;
          var all = [];
          for (var a = 0; a < datalist.length; a++) {
            let valuel = {
              value: ''
            };
            valuel.value = datalist[a];
            all[a] = valuel;
          }
          this.restaurants = all;
        });
      },
    }

  }
</script>
<style>

</style>
