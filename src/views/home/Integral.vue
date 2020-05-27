<template>
  <p class="page-container">积分专区</p>
</template>
<script>
  export default {
    data() {
      return {
        websock: null
      }
    },
    created() {
      //页面刚进入时开启长连接
      this.initWebSocket()
    },
    destroyed() {
      //页面销毁时关闭长连接
      this.websocketclose()
    },
    methods: {
      initWebSocket() {
        let dian_token = window.localStorage.getItem('dian_token');
        //初始化weosocket
        const wsuri = 'ws://localhost:8080/api/v1/vp/so/'+dian_token; //ws地址(后端提供)
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() {
        //连接建立之后执行send方法发送数据
        console.log('WebSocket连接成功')
        this.websocketsend(this.user)
        console.log('WebSocket连接成功')
      },
      websocketonerror(e) {
        //连接建立失败重连
        this.initWebSocket()
      },
      websocketonmessage(e) {
        //数据接收
        const redata = JSON.parse(e.data)
        console.log(redata.value)
      },
      websocketsend(Data) {
        //数据发送
        this.websock.send(Data)
      },
      websocketclose(e) {
        //关闭
        console.log('断开连接', e)
      }
    }
  }
</script>
<style >

</style>
