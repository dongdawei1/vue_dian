import axios from 'axios';
import router from "../router";

let base = '';
//登陆


axios.defaults.timeout = 15000;




export const requestLogin = params => { return axios.post(`${base}/api/user/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//获取验证码
export const getCaptcha1 = params => { return axios({
    url: `${base}/api/user/captcha`,
    params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

})};


//上传图片时删除
export const uploadDown_update = params   => { return axios.post( `${base}/api/uploadDown/update`, params).then(res => res.data); };

//get_user_info

export const get_user_info = params => {
  return axios({
    url: `${base}/api/user/get_user_info`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数
  }).then(res => res.data); };

//登陆过期跳登陆页，为过期跳传入的地址
export const get_user_info_sign = params => {
  get_user_info().then((res) => {
    if (res.msg==='用户未登录,无法获取当前用户的信息') {
      router.push('/login/sign')
    }else{
      router.push(params)
    }
  }) };

//判断有没有此权限
export const get_user_info_jurisdiction = params => {
   return  get_user_info().then((res) => {

    if (res.msg==='用户未登录,无法获取当前用户的信息') {
      router.push('/login/sign')
    }
     console.log(999999999999)
    console.log(res)


    let status=res.status;

    // router.push('/home/release')
    if (status === 0) {
      //获取用户权限
      let resdata=JSON.parse(res.data);  //字符串转换为 对象
      let role=resdata.role;
       //米面按钮权限
       if(params ==='/home/GrainAndOilPage'){
         if(role===1 ||role===4){
           res.isbutten=true;
           res.isAuthentication=resdata.isAuthentication;
          return res;
         }else{
           res.isbutten=false;
           res.isAuthentication=resdata.isAuthentication;
           return res;
         }
       }


    }


  }).then(res => res); };

//获取菜单
export const getPermission = params => {

    return axios({
        url: `${base}/permission/loadData`,
       // params: { uuid: params },
        method: 'get',    //application/x-www-form-urlencoded    ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

    }).then(res => res.data); };

//注册
export const requestCreate = params => { return axios.post(`${base}/api/user/create`, params).then(res => res.data); };
//修改用户基本信息
export const update_information = params => { return axios.post(`${base}/api/user/update_information`, params).then(res => res.data); };
//退出
export const userlogout = params => { return axios.post(`${base}/api/user/logout`, params).then(res => res.data); };
//s实名
export const newRealName = params => { return axios.post(`${base}/api/realName/newRealName`, params).then(res => res.data); };
//获取实名信息
export const getRealName = params => {

  return axios({
    url: `${base}/api/realName/getRealName`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };
//发布
export const grainAndOil = params => { return axios.post(`${base}/api/commodity/release`, params).then(res => res.data); };

//查询所有发布

export const getPublishings = params => { return axios.post(`${base}/api/getPublishings/getGoods`, params).then(res => res.data);};


//参数n为休眠时间，单位为毫秒:
export const  sleep = params =>{
        var start = new Date().getTime();
             //  console.log('休眠前：' + start);
               while (true) {
                   if (new Date().getTime() - start > params) {
                   break;
                  }}
              // console.log('休眠后：' + new Date().getTime());
               }
