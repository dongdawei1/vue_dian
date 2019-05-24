import axios from 'axios';

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

  })};

//获取权限
export const getPermission = params => {

    return axios({
        url: `${base}/permission/loadData`,
       // params: { uuid: params },
        method: 'get',    //application/x-www-form-urlencoded    ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

    })};

//注册
export const requestCreate = params => { return axios.post(`${base}/api/user/create`, params).then(res => res.data); };

//发布
export const grainAndOil = params => { return axios.post(`${base}/api/commodity/release`, params).then(res => res.data); };

//查询所有发布

export const getPublishings = params => { return axios.post(`${base}/api/getPublishings/getGoods`, params).then(res => res.data);};
