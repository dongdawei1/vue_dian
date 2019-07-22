import axios from 'axios';
import router from "../router";
import { Message } from 'element-ui';
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



//检查权限
export const checke_isButten=  params => {
  return axios({
  url: `${base}/api/getRole/getIsRole`,
  params: { StringPath: params },
  method: 'get',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

}).then(res => res.data); };

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
//重新实名
export const updateRealName = params => { return axios.post(`${base}/api/realName/updateRealName`, params).then(res => res.data); };

//获取实名信息
export const getRealName = params => {

  return axios({
    url: `${base}/api/realName/getRealName`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };
//审核分页查询实名
export const getRealNameAll = params => { return axios.post(`${base}/api/toExamine/getRealNameAll`, params).then(res => res.data); };
//分页查询待审批招聘
export const getReleaseWelfareAll = params => { return axios.post(`${base}/api/toExamine/getReleaseWelfareAll`, params).then(res => res.data); };
//分页查询简历
export const getPositionAll = params => { return axios.post(`${base}/api/releaseWelfare/get_position_all`, params).then(res => res.data);};
//分页查询简历
export const getResumeAll = params => { return axios.post(`${base}/api/resume/get_resume_all`, params).then(res => res.data);};
//实名审核
export const examineRealName = params => { return axios.post(`${base}/api/toExamine/examineRealName`, params).then(res => res.data); };
//审核发布招聘
export const examineReleaseWelfare = params => { return axios.post(`${base}/api/toExamine/examineReleaseWelfare`, params).then(res => res.data); };


//审核发布简历
export const examineResume = params => { return axios.post(`${base}/api/toExamine/examineResume`, params).then(res => res.data); };
//s审核简历列表
export const getTrialResumeAll = params => { return axios.post(`${base}/api/toExamine/getTrialResumeAll`, params).then(res => res.data); };
//发布
export const grainAndOil = params => { return axios.post(`${base}/api/commodity/release`, params).then(res => res.data); };

//查询所有发布
export const getPublishings = params => { return axios.post(`${base}/api/getPublishings/getGoods`, params).then(res => res.data);};

//查询所有联系方式
export const getContact= params => { return axios.post(`${base}/api/getPublishings/getContact`, params).then(res => res.data);};
//获取职位类型
export const get_position = params => {
  return axios({
    url: `${base}/api/releaseWelfare/get_position`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数
  }).then(res => res.data); };
//发布职位
export const create_position = params => { return axios.post(`${base}/api/releaseWelfare/create_position`, params).then(res => res.data); };
//用户分页查询自己发布的职位
export const get_position_list = params => { return axios.post(`${base}/api/releaseWelfare/get_position_list`, params).then(res =>isButtonAndList(res.data) ); };
//用户操作自己发布的职位
export const position_operation = params => { return axios.post(`${base}/api/releaseWelfare/position_operation`, params).then(res =>res.data) };


//创建简历
export const create_resume = params => { return axios.post(`${base}/api/resume/create_resume`, params).then(res => res.data); };
//简历操作
export const operation_resume = params => { return axios.post(`${base}/api/resume/operation_resume`, params).then(res => res.data); };

//获取自己发布的简历
export const select_resume_by_id = params => {
  return axios({
    url: `${base}/api/resume/select_resume_by_id`,
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

//灭虫广告装修
export const create_menuAndRenovationAndPestControl= params => { return axios.post(`${base}/api/menuAndRenovationAndPestControl/create_menuAndRenovationAndPestControl`, params).then(res => res.data); };
//用户查询自己发布的装修等
export const get_usermrp_list= params => { return axios.post(`${base}/api/menuAndRenovationAndPestControl/get_usermrp_list`, params).then(res => isButtonAndListusermrp(res.data) ); };

function isButtonAndListusermrp(res) {

  if (res.status === 0) {
    let list = res.data.datas;
    for (let a = 0; a < list.length; a++) {
      let welfareStatus = list[a].welfareStatus;
      if (welfareStatus === 1) {
        list[a].welfareStatus = '发布中';
        list[a].authentiCationFailure = '';
        list[a].isDisplayRefresh = true;
        list[a].isDisplayHide = true;
        list[a].isDisplayEdit = true;
      } else if (welfareStatus === 2) {
        list[a].welfareStatus = '隐藏中';
        list[a].authentiCationFailure = '';  //审核失败原因
        list[a].isDisplayRelease = true;
      } else if (welfareStatus === 4) {
        let authentiCationStatus = list[a].authentiCationStatus;
        list[a].isDisplayHide = true;
        if (authentiCationStatus === 3) {
          list[a].welfareStatus = '审核失败';
          list[a].isDisplayEdit = true;
        } else {
          list[a].welfareStatus = '审核中'
          list[a].authentiCationFailure = '';
        }
      } else if (welfareStatus === 5) {
        list[a].welfareStatus = '已过期';
        list[a].authentiCationFailure = '';
        list[a].isDisplayDelay = true;
      }

      list[a].isDisplaySee = true;
      list[a].isDisplayDelete = true;
      let releaseType=list[a].releaseType;
      console.log(releaseType)
      if(releaseType===13){
        list[a].releaseType='菜谱/户外广告';
      }else if(releaseType===17){
        list[a].releaseType='装修';
      }else if(releaseType===19){
        list[a].releaseType='灭虫';
      }else{
        list[a].releaseType='';
      }
    }
    res.data.datas = list;
    return res;
    //    1发布中，2隐藏中，3删除,4审核中,5不在有效期
  } else {
    return res;
  }
}

  function isButtonAndList(res) {

    if (res.status === 0) {
      let list = res.data.datas;

      for (let a = 0; a < list.length; a++) {
        let welfareStatus = list[a].welfareStatus;
        if (welfareStatus === 1) {
          list[a].welfareStatus = '发布中';
          list[a].authentiCationFailure = '';
          list[a].isDisplayRefresh = true;
          list[a].isDisplayHide = true;
        } else if (welfareStatus === 2) {
          list[a].welfareStatus = '隐藏中';
          list[a].authentiCationFailure = '';  //审核失败原因
          list[a].isDisplayRelease = true;
        } else if (welfareStatus === 4) {
          let authentiCationStatus = list[a].authentiCationStatus;
          list[a].isDisplayHide = true;
          if (authentiCationStatus === 3) {
            list[a].welfareStatus = '审核失败';
            list[a].isDisplayEdit = true;
          } else {
            list[a].welfareStatus = '审核中'
            list[a].authentiCationFailure = '';
          }
        } else if (welfareStatus === 5) {
          list[a].welfareStatus = '已过期';
          list[a].authentiCationFailure = '';
          list[a].isDisplayDelay = true;
        }

        list[a].isDisplaySee = true;
        list[a].isDisplayDelete = true;
        let isPublishContact = list[a].isPublishContact;
        if (isPublishContact === 1) {
          list[a].isPublishContact = '公开';
        } else {
          list[a].isPublishContact = '隐藏';
        }


      }
      res.data.datas = list;
      return res;
      //    1发布中，2隐藏中，3删除,4审核中,5不在有效期
    } else {
      return res;
    }
  }

//根据错误跳转页面和报错
  export const isRoleMessage = params => {
    Message.error(params);
    if (params === '用户登陆已过期' || params === '用户未登录,无法获取当前用户的信息') {
      router.push({path: '/login/sign'});
    } else if (params === '没有权限') {
      router.push({path: '/home/release'});
    } else {

    }
  }
//参数n为休眠时间，单位为毫秒:
  export const sleep = params => {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
      if (new Date().getTime() - start > params) {
        break;
      }
    }
    // console.log('休眠后：' + new Date().getTime());
  }

