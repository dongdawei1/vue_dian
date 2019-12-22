<template>
<div class="tableClass">

  <div v-if="isFromData" class="fromDataClass">
    <div class="fromDataTitleClass" >
     我的商品
    </div>
    <span v-for="(p, index) in fromData" :key="index">
      {{p.serviceType}}&nbsp;  {{p.commodityPacking}}&nbsp;
      <span v-if="p.specifi_cations!='--'">{{p.specifi_cations}}&nbsp;</span>
      数量:{{p.number}}&nbsp;
      <span v-if="p.remarks!=''">备注:{{p.remarks}}&nbsp;</span>
         <el-button type="text" @click="deleteFromData(index,p)">
           <i class="el-icon-delete"></i>
         </el-button>&nbsp;,&nbsp;
    </span>
    <div  class="submitFormButton">
    <el-button type="primary" size="mini"  @click="submitForm" v-loading.fullscreen.lock="fullscreenLoading" plain>发布</el-button>
    </div>
  </div>

  <el-table
    ref="multipleTable"
    :data="myCommonMenuTableData.filter(data => !search || data.serviceType.toLowerCase().includes(search.toLowerCase()))"
    tooltip-effect="dark"
    style="width: 100%"
    max-height="440"
    v-if="isCommonMenuButton"
    :row-style="{height:'20px'}"
    :cell-style="{padding:'1px'}">
    <el-table-column
      label="常用商品名称"
      width="120">
      <template slot-scope="scope">{{ scope.row.serviceType }}</template>
    </el-table-column>

    <el-table-column
      prop="commodityPacking"
      label="包装方式"
      width="120">
    </el-table-column>

    <el-table-column
      prop="specifi_cations"
      label="包装规格"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="数量">
      <template slot-scope="scope">
        <el-input v-model="scope.row.number" :disabled="scope.row.isPlacing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remarks"  :disabled="scope.row.isPlacing"></el-input>
      </template>
    </el-table-column>

    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handlePreservation(scope.$index, scope.row)"  v-if="!scope.row.isPlacing">保存</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"  v-if="scope.row.isPlacing">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>




  <el-table
    ref="multipleTable"
    :data="allCommonMenuTableData.filter(data => !search || data.serviceType.toLowerCase().includes(search.toLowerCase()))"
    tooltip-effect="dark"
    style="width: 100%"
    :max-height="maxHeight"
    :row-style="{height:'20px'}"
    :cell-style="{padding:'1px'}">

    <el-table-column
      label="全部商品名称"
      width="120">
      <template slot-scope="scope">{{ scope.row.serviceType }}</template>
    </el-table-column>
    <el-table-column
      prop="commodityPacking"
      label="包装方式"
      width="120">
    </el-table-column>
    <el-table-column
      prop="specifi_cations"
      label="包装规格"
      show-overflow-tooltip>
    </el-table-column>

      <el-table-column label="数量">
        <template slot-scope="scope">
            <el-input v-model="scope.row.number" :disabled="scope.row.isPlacing"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
            <el-input v-model="scope.row.remarks"  :disabled="scope.row.isPlacing"></el-input>
        </template>
      </el-table-column>

    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column>
<el-table-column>
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handlePreservation(scope.$index, scope.row)"  v-if="!scope.row.isPlacing">保存</el-button>
      <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)"  v-if="scope.row.isPlacing">编辑</el-button>
    </template>
    </el-table-column>

  </el-table>

</div>
</template>


<script>
  import {  isRoleMessage } from '../../../../api/api';


  import {  operation_userWholesaleCommodity } from '../../../../api/api';
  import {  checke_isButten } from '../../../../api/api';

  import { echo_display } from '../../../../api/api';
  import {   get_userWholesaleCommodity_id } from '../../../../api/api';
  import {   toDecimal } from '../../../../api/api';

  import {   getPurchaseCreateOrderVo } from '../../../../api/api';




  export default {

    data() {
      return {
        maxHeight:'280',
        isCommonMenuButton:false, //是否有常用菜单
        search: '',
        StringPath:'/home/purchaseCreateOrder',

        ruleForm: {
          userId:'',
          releaseType:'',//发布类型
        },

        rules:{},
        myCommonMenuTableData:[],
        allCommonMenuTableData: [],
        fromData:[],
        isFromData:false,
        fullscreenLoading:false,
      }
    },

    created () {
      this.checke_isButten();
    },
    methods: {
      deleteFromData(index,p){
        if(p.type===1){
          for(let a=0;a<this.myCommonMenuTableData.length;a++){
            if(this.myCommonMenuTableData[a].commodityPacking===p.commodityPacking
              && this.myCommonMenuTableData[a].serviceType===p.serviceType
              && this.myCommonMenuTableData[a].specifi_cations===p.specifi_cations){
              this.myCommonMenuTableData[a].number='';
              this.myCommonMenuTableData[a].remarks='';
              this.myCommonMenuTableData[a].isPlacing=false;
              this.fromData.splice(index, 1);
              if(this.fromData.length===0){
                this.isFromData=false;
              }
              break ;
            }
          }
        }else{
          for(let a=0;a<this.allCommonMenuTableData.length;a++){
            if(this.allCommonMenuTableData[a].commodityPacking===p.commodityPacking
              && this.allCommonMenuTableData[a].serviceType===p.serviceType
              && this.allCommonMenuTableData[a].specifi_cations===p.specifi_cations){
              this.allCommonMenuTableData[a].number='';
              this.allCommonMenuTableData[a].remarks='';
              this.allCommonMenuTableData[a].isPlacing=false;
              this.fromData.splice(index, 1);
              if(this.fromData.length===0){
                this.isFromData=false;
              }
              break ;
            }
          }
        }
      },

      handlePreservation(index, row) {
        if ( !/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(row.number)) {
          this.$message.error("数量只能是数字");
          return false;
        }
        if( row.type===1){
          this.myCommonMenuTableData[index].number=row.number;
          this.myCommonMenuTableData[index].remarks=row.remarks;
          this.myCommonMenuTableData[index].isPlacing=true;
          //在这里保存
          this.upFromData(row);
        }else {
          this.allCommonMenuTableData[index].number=row.number;
          this.allCommonMenuTableData[index].remarks=row.remarks;
          this.allCommonMenuTableData[index].isPlacing=true;
          //在这里保存
          this.upFromData(row);
        }
        this.isFromData=true;
      },
      handleEdit(index, row) {
        if( row.type===1){
          this.myCommonMenuTableData[index].isPlacing=false;
        }else {
          this.allCommonMenuTableData[index].isPlacing=false;
        }
      },
      upFromData(row){
     if(this.fromData.length>0){
       let boolean=false;
     for(let a=0;a<this.fromData.length;a++){
     if(this.fromData[a].commodityPacking===row.commodityPacking
       && this.fromData[a].serviceType===row.serviceType
       && this.fromData[a].specifi_cations===row.specifi_cations){
       this.fromData[a].number=row.number;
       this.fromData[a].remarks=row.remarks;
       boolean=true;
       break ;
       }
     }
     if(boolean===false){
       this.fromData=this.fromData.concat(row);
     }
     }else{
       this.fromData=this.fromData.concat(row);
       }
      },

      checke_isButten(){
        checke_isButten(this.StringPath).then((data) => {
          if(data.status===0){
            if (data.data.isCreate !== true) {
              this.$router.push({path: '/home/release'});
            }
            if (data.data.isAuthentication !== 2) {
              this.$router.push({path: '/home/myAccount'});
            }
            getPurchaseCreateOrderVo().then(res => {
              var commonMenu_list=[];
              var commonMenu={
                serviceType:'',
                commodityPacking:'',
                specifi_cations:'' , //包装方式
                number:'',
                remarks:'',
                isPlacing:false,
                type:''
              };
              if(res.status===0){
                  if(res.data.isCommonMenu===1){
                    this.isCommonMenuButton=true;
                    var tableDataListmyCommonMenu=res.data.myCommonMenu;
                    for(let a=0;a<tableDataListmyCommonMenu.length;a++){
                      commonMenu={};
                      commonMenu.serviceType=tableDataListmyCommonMenu[a].serviceType;
                      if(tableDataListmyCommonMenu[a].commodityPacking===1){
                        commonMenu.commodityPacking='散装';
                        commonMenu.specifi_cations='--';
                      }else if(tableDataListmyCommonMenu[a].commodityPacking===2){
                        commonMenu.commodityPacking='袋装';
                        if(tableDataListmyCommonMenu[a].specifi===1){
                          commonMenu.specifi_cations=tableDataListmyCommonMenu[a].cations+'/g';
                        }else if(tableDataListmyCommonMenu[a].specifi===2){
                          commonMenu.specifi_cations=tableDataListmyCommonMenu[a].cations+'/kg';
                        }
                      }else if(tableDataListmyCommonMenu[a].commodityPacking===3){
                        commonMenu.commodityPacking='瓶装';
                        if(tableDataListmyCommonMenu[a].specifi===3){
                          commonMenu.specifi_cations=tableDataListmyCommonMenu[a].cations+'/ML';
                        }else if(tableDataListmyCommonMenu[a].specifi===4){
                          commonMenu.specifi_cations=tableDataListmyCommonMenu[a].cations+'/L';
                        }
                      }
                      commonMenu.type=1;
                      commonMenu.serviceType=tableDataListmyCommonMenu[a].serviceType;
                      commonMenu_list=commonMenu_list.concat(commonMenu);
                    }
                  this.myCommonMenuTableData=commonMenu_list;
                  }else{
                    this.maxHeight=470;
                  }
                var tableDataListallCommonMenu=res.data.allCommonMenu;
                  commonMenu_list=[];
                for(let a=0;a<tableDataListallCommonMenu.length;a++){
                     commonMenu={};
                  if(tableDataListallCommonMenu[a].commodityPacking===1){
                    commonMenu.commodityPacking='散装';
                    commonMenu.specifi_cations='--';
                  }else if(tableDataListallCommonMenu[a].commodityPacking===2){
                    commonMenu.commodityPacking='袋装';
                    if(tableDataListallCommonMenu[a].specifi===1){
                      commonMenu.specifi_cations=tableDataListallCommonMenu[a].cations+'/g';
                    }else if(tableDataListallCommonMenu[a].specifi===2){
                      commonMenu.specifi_cations=tableDataListallCommonMenu[a].cations+'/kg';
                    }
                  }else if(tableDataListallCommonMenu[a].commodityPacking===3){
                    commonMenu.commodityPacking='瓶装';
                    if(tableDataListallCommonMenu[a].specifi===3){
                      commonMenu.specifi_cations=tableDataListallCommonMenu[a].cations+'/ML';
                    }else if(tableDataListallCommonMenu[a].specifi===4){
                      commonMenu.specifi_cations=tableDataListallCommonMenu[a].cations+'/L';
                    }
                  }
                  commonMenu.type=0;
                  commonMenu.serviceType=tableDataListallCommonMenu[a].serviceType;
                  commonMenu_list=commonMenu_list.concat(commonMenu);
                }
                this.allCommonMenuTableData=commonMenu_list;
              }else{
                isRoleMessage(res.msg);
              }
            });
          }else{
            isRoleMessage(data.msg);
          }
        });
      },


      //提交
      submitForm() {
        //  this.fullscreenLoading=true;
        if(this.fromData.length===0){
          this.$message.error("采购列表不能为空")
          return false;
        }
        operation_userWholesaleCommodity(this.ruleForm).then(res => {
              this.fullscreenLoading=false;
              if (res.status === 0) {
                this.id='';
                this.ruleForm='';
                this.fileList=[];
                this.$message.success('编辑成功，审核约24小时内完成');
                this.$router.push('/home/myRelease');
              } else {
                isRoleMessage(res.msg);
              }
            });
      },

      cntinue(){  //留在本页继续发布
        this.centerDialogVisible=false;
      },


    }
  }

</script>
<style>
  .tableClass{
    margin : 1px 0px 8px 1px;
    padding: 5px 0px 10px 10px;
  }
  .fromDataClass{
    border:1px solid #E7E3E6;
    padding: 5px 0px 10px 10px;
    color:#918D90;
  }
  .fromDataTitleClass{
    font-size: 16px;
  }
  .submitFormButton{
    text-align:right;
    margin:4px 121px 2px 10px;
  }
</style>
