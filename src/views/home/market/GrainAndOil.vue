<template>
  <div>
  <p class="page-container">粮油</p>
  <el-row  v-if="isbutten">
    <el-button type="primary"><router-link
      v-on:click.native="isAuthenticationM"
      to="/home/grainAndOil">发布信息</router-link></el-button>

  </el-row>
    <VmImageList :data="dataImageList" class="vm-margin"></VmImageList>


    </div>
</template>


<script>
  import VmImageList from '../../../components/vm-image-list'
  import { get_user_info } from '../../../api/api';

  export default {

    name: 'ImageList',
    components: {
      VmImageList
    },


    data() {
      return {
        permission:'',
        role:'',
       isbutten:false,



        dataImageList: [
          {
            id: '201707101552',
            title: 'Title1',
           img: '../static/img/1.jpg',
            desc: 'Lorndustry,y tly dummy t',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101553',
            title: 'Title2',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101554',
            title: 'Title3',
            img: '../static/img/img-3.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101555',
            title: 'Title4',
            img: '../static/img/img-4.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101556',
            title: 'Title5',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101557',
            title: 'Title6',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101558',
            title: 'Title7',
            img: '../static/img/img-3.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101559',
            title: 'Title8',
            img: '../static/img/img-4.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015510',
            title: 'Title9',
            img: '../static/img/1.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015511',
            title: 'Title10',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015512',
            title: 'Title11',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101513',
            title: 'Title12',
            img: '../static/img/img-2.jpg',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            detailUrl: '#',
            editUrl: '#'
          }
        ]







      }
    },

    created () {
      this.islogin()
    },
    methods: {

      isAuthenticationM(){
         let isAuthentication= this.permission.isAuthentication;
        console.log(isAuthentication);
        console.log(this.permission.isAuthentication);

        if(isAuthentication!=1){
          this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能发布信息！</strong>', '用户信息不完善', {
            dangerouslyUseHTMLString: true
          });
          this.$router.push({ path: '/home/myAccount' });
        }else{
           this.$router.push({ path: '/home/GrainAndOilPage' });
        }

      },


      //判断是否登录 获取用户权限
      islogin(){
        get_user_info().then((res) => {

          let status=res.data.status;
          if (status === 0) {
           this.permission=JSON.parse(res.data.data);  //字符串转换为 对象
          this.role=this.permission.role;
           if(this.role===1 ||this.role===4){
             this.isbutten=true;
           }

          }else{
            console.log(res)
            this.$router.push({ path: '/login/sign' });
          }
        });
      },



    }

  }
</script>


<style >
</style>
