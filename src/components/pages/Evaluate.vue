<template>

  <div class="evaluate">
    <div class="pingjia">
      用<br>
      户<br>
      评<br>
      价 <br></div>

    <div   class="evaluatebody" v-if="fuwu">
      <div class="evaluateType">
        服务态度 </div>
        <div class="evaluateNo">
          很好 ({{tableData.fuwutaiduhao}})<br>
          满意 ({{tableData.fuwutaiduzhong}})<br>
          较差 ({{tableData.fuwutaiducha}})<br>
       </div>
    </div>
    <div   class="evaluatebody" v-if="jiage">
      <div class="evaluateType">
        服务价格 </div>
        <div class="evaluateNo">
          合理 ({{tableData.jiagedi}})<br>
          偏高 ({{tableData.jiagezhong}})<br>
          较高 ({{tableData.jiagegao}})<br>
        </div>

    </div>
    <div   class="evaluatebody" v-if="zhunshi">
      <div class="evaluateType">
      准时
      </div>
      <div class="evaluateNo">
        满意 ({{tableData.zhunshihao}})<br>
        接受 ({{tableData.zhunshijiaohao}})<br>
        较差 ({{tableData.zhunshijiaocha}})<br>
      </div>

    </div>
    <div   class="evaluatebody" v-if="zhilian">
      <div class="evaluateType">
        质量
      </div>
        <div class="evaluateNo">
          满意 ({{tableData.zhilianghao}})<br>
          接受 ({{tableData.zhiliangyiban}})<br>
          较差 ({{tableData.zhiliangcha}})<br>
        </div>
    </div>
    <div   class="evaluatebody" v-if="shouhou">
      <div class="evaluateType">
        售后服务
      </div>
        <div class="evaluateNo">
          满意 ({{tableData.shouhouhao}})<br>
          接受 ({{tableData.shouhouzhong}})<br>
          较差 ({{tableData.shouhoucha}})<br>
        </div>
    </div>
    <div   class="evaluatebody" v-if="zhuangye">
      <div class="evaluateType">
        专业程度
      </div>
        <div class="evaluateNo">
          较高 ({{tableData.zhuanyehao}})<br>
          中等 ({{tableData.zhuanyemanyi}})<br>
          一般 ({{tableData.zhuayeyiban}})<br>
        </div>
    </div>


  </div>
</template>

<script>
  export default {
    props: ["tableData"],
    data: function () {
      return {
        fuwu:true,
        jiage:true,
        zhunshi:false,
        zhilian:false,
        shouhou:false,
        zhuangye:false,

      }
    },
    methods: {
      zhanshi(){
        console.log(this.tableData);
        let permissionid=this.tableData.permissionid;
        if(permissionid===13){
            this.shouhou=true;
            this.zhuangye=true;
        }




      }
    },

    mounted() {
      this.zhanshi();
    }
  }
</script>
<style>
  .evaluate{
    height:100px;  /*高度*/
    /*background-color: #F0EFEB;*/
    display: flex;


  }
  .evaluatebody{
    display: flex;
    width: 20%;
    margin: 17px 2px 10px 10px;

  }
  .evaluateType{
    text-align:center;   /* 水平居中 */
    line-height: 65px;  /* 垂直剧终 */

  }
  .pingjia{
    margin: 10px 10px 10px 30px;
    font-weight:bold;  /*字体加粗*/
    color:#302A22

  }
  .evaluateNo{
    margin: 0px 10px 10px 10px;
  }
  .flex-item {
    /*background-color: #F1B5D3;*/
    width: 32%;
    margin: 1%;    /*空隙*/
    text-align:center;
    font-weight:bold;
    font-size: 24px;
    padding:4px 0px 3px 2px;
    color:#C49FA0
  }
  .grid-content {
    margin-bottom: 6px; /*下边距 外*/
    /* border-radius: 10px;  div下圆角
      min-height: 3px; 段落最小高度 */
  }
  .card-desc{
    margin-bottom: 1px;
    padding:1px 0px 3px 3px;
    /*框间距上填充为25px
右填充为50px
下填充为75px
左填充为100px  内*/
  }
  .releaseTitle{
    font-size: 16px;
    font-weight:bold;  /*字体加粗*/
  }
  .jieshao{
    font-size: 14px;
  }
  .xiangqing{
    font-size: 15px;
    text-decoration: none;
    /*text-align:center    居中不好看*/
  }

</style>
