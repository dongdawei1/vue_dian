import axios from 'axios';
import router from "../router";
import { Message } from 'element-ui';
let base = '';
//登陆


axios.defaults.timeout = 15000;




export const requestLogin = params => { return axios.post(`${base}/api/user/login`, params).then(res => res.data); };


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
export const addOrder = params => { return axios.post(`${base}/api/realName/addOrder`, params).then(res => res.data); };


//获取实名信息
export const getRealName = params => {

  return axios({
    url: `${base}/api/realName/getRealName`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };


//获取实名信息
export const getUserRealName = params => {

  return axios({
    url: `${base}/api/realName/getUserRealName`,
    // params: { uuid: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };

//根据id获取实名信息
export const getRealNameById = params => {

  return axios({
    url: `${base}/api/realName/getRealNameById`,
    params: { id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };

export const getRealNameByuserId = params => {

  return axios({
    url: `${base}/api/realName/getRealNameByuserId`,
    params: { id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: { 'Content-Type': 'application/json; charset=utf-8'}  这种方法后端拿不到参数

  }).then(res => res.data); };

//待审核实名
export const getRealNameAll = params => { return axios.post(`${base}/api/toExamine/getRealNameAll`, params).then(res => isButtonAndListusermrp(res.data,9)); };
export const admin_select_addOrder = params => { return axios.post(`${base}/api/toExamine/admin_select_addOrder`, params).then(res => isButtonAndListusermrp(res.data,10) );};
export const admin_select_signingOrder = params => { return axios.post(`${base}/api/toExamine/admin_select_signingOrder`, params).then(res => isButtonAndListusermrp(res.data,10) );};
export const admin_select_signingOrderById = params => {
  return axios({
    url: `${base}/api/toExamine/admin_select_signingOrderById`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
export const admin_create_orderUser = params => { return axios.post(`${base}/api/toExamine/admin_create_orderUser`, params).then(res => res.data);};

//待审批招聘
export const getReleaseWelfareAll = params => { return axios.post(`${base}/api/toExamine/getReleaseWelfareAll`, params).then(res => isButtonAndListusermrp(res.data,3)); };
//待审核简历
export const getTrialResumeAll = params => { return axios.post(`${base}/api/toExamine/getTrialResumeAll`, params).then(res => isButtonAndListusermrp(res.data,3)); };
//待审核装修灭虫列表
export const getmrpAll= params => { return axios.post(`${base}/api/toExamine/getmrpAll`, params).then(res => isButtonAndListusermrp(res.data,2) ); };
//待审核出租房
export const adminMent= params => { return axios.post(`${base}/api/toExamine/adminMent`, params).then(res => isButtonAndListusermrp(res.data,6) ); };
//待审核电器二手
export const adminEquipment= params => { return axios.post(`${base}/api/toExamine/adminEquipment`, params).then(res => isButtonAndListusermrp(res.data,8) ); };
//待审核菜
export const adminFoodAndGrain= params => { return axios.post(`${base}/api/toExamine/adminFoodAndGrain`, params).then(res => isButtonAndListusermrp(res.data,8) ); };
//待审核批发菜
export const adminWholesaleCommodity= params => { return axios.post(`${base}/api/toExamine/adminWholesaleCommodity`, params).then(res => isButtonAndListusermrp(res.data,14) ); };

//待审批酒
export const adminWineAndTableware= params => { return axios.post(`${base}/api/toExamine/adminWineAndTableware`, params).then(res => isButtonAndListusermrp(res.data,8) ); };
export const adminDepartmentStore= params => { return axios.post(`${base}/api/toExamine/adminDepartmentStore`, params).then(res => isButtonAndListusermrp(res.data,8) ); };
export const getAddressDetailed= params => { return axios.post(`${base}/api/toExamine/getAddressDetailed`, params).then(res =>  res.data);  };
export const getAccurateressDetailed= params => { return axios.post(`${base}/api/toExamine/getAccurateressDetailed`, params).then(res =>  res.data);  };
export const createAddressDetailed= params => { return axios.post(`${base}/api/toExamine/createAddressDetailed`, params).then(res =>  res.data);  };
export const admin_update_addOrder= params => { return axios.post(`${base}/api/toExamine/admin_update_addOrder`, params).then(res =>  res.data);  };

//除实名外所有审核
export const examineAll= params => { return axios.post(`${base}/api/toExamine/examineAll`, params).then(res => res.data);};
//实名审核
export const examineRealName = params => { return axios.post(`${base}/api/toExamine/examineRealName`, params).then(res => res.data); };

//分页查询招聘
export const getPositionAll = params => { return axios.post(`${base}/api/releaseWelfare/get_position_all`, params).then(res => res.data);};
//分页查询简历
export const getResumeAll = params => { return axios.post(`${base}/api/resume/get_resume_all`, params).then(res => res.data);};





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
export const get_position_list = params => { return axios.post(`${base}/api/releaseWelfare/get_position_list`, params).then(res =>isButtonAndListusermrp(res.data,4) ); };
//用户操作自己发布的职位
export const position_operation = params => { return axios.post(`${base}/api/releaseWelfare/position_operation`, params).then(res =>res.data) };


//创建简历
export const create_resume = params => { return axios.post(`${base}/api/resume/create_resume`, params).then(res => res.data); };
//简历操作
export const operation_resume = params => { return axios.post(`${base}/api/resume/operation_resume`, params).then(res => res.data); };
//操作灭虫
export const operation_usermrp = params => { return axios.post(`${base}/api/menuAndRenovationAndPestControl/operation_usermrp`, params).then(res => res.data); };



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
export const get_usermrp_list= params => { return axios.post(`${base}/api/menuAndRenovationAndPestControl/get_usermrp_list`, params).then(res => isButtonAndListusermrp(res.data,1) ); };
//根据id获取发布的装修
export const get_usermrp_id= params => {
  return axios({
    url: `${base}/api/menuAndRenovationAndPestControl/get_usermrp_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//获取装修等标题（灭虫等列表页）
export const getReleaseTitleList= params =>  { return axios.post(`${base}/api/menuAndRenovationAndPestControl/getReleaseTitleList`, params).then(res => res.data); };

//获取装修等标题（灭虫等列表页）
export const getmrpList= params =>  { return axios.post(`${base}/api/menuAndRenovationAndPestControl/getmrpList`, params).then(res => res.data); };
//获取装修详情公开

export const getMrpDetails = params => {
  return axios({
    url: `${base}/api/menuAndRenovationAndPestControl/getMrpDetails`,
    method: 'get',    //application/x-www-form-urlencoded    ,
    params: { id: params },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

//创建租房
export const create_rent= params => { return axios.post(`${base}/api/rent/create_rent`, params).then(res => res.data); };
//获取自己发布的租房信息
export const get_myRent_list= params => { return axios.post(`${base}/api/rent/get_myRent_list`, params).then(res => isButtonAndListusermrp(res.data,5) ); };
//操作自己发布的租房信息
export const operation_userment= params => { return axios.post(`${base}/api/rent/operation_userment`, params).then(res => res.data);};
//根据id查询自己发布租房
export const get_userrent_id= params => {
  return axios({
    url: `${base}/api/rent/get_userrent_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//公开概览租房
export const getrentList= params => { return axios.post(`${base}/api/rent/getrentList`, params).then(res => res.data);};
//租房详情

export const get_rent_id= params => {
  return axios({
    url: `${base}/api/rent/get_rent_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };


//获取租房title
export const getServiceDetailedList= params => { return axios.post(`${base}/api/rent/getServiceDetailedList`, params).then(res => res.data);};


//获取bunner
export const getBunner = params => {
  return axios({
    url: `${base}/api/bunner/getBunner`,
    method: 'get',    //application/x-www-form-urlencoded    ,
    params: { permissionid: params.permissionid,
              bunnerType: params.bunnerType},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//回显图片
export const echo_display= params => {
  let pictureUrlList = JSON.parse(params.pictureUrl)
  let length=pictureUrlList.length;
  if (length > 0) {
   let pictureUrl=[];
   let fileList=[];
    for (let i=0;i<length; i++ ){
      if(pictureUrlList[i].useStatus===3){
        //var picture={"pictureName":resdata.pictureName ,"pictureUrl": resdata.pictureUrl, "useStatus":1,id:resdata.id,"userName":resdata.userName,"userId":resdata.userId};
        //存入参数
        let picture={"pictureName":pictureUrlList[i].pictureName ,"pictureUrl": pictureUrlList[i].pictureUrl, "useStatus":3,"id":pictureUrlList[i].id,"userName":pictureUrlList[i].userName,"userId":pictureUrlList[i].userId};
        pictureUrl= pictureUrl.concat(picture);
        //图片回显
        let filepicture={"name":pictureUrlList[i].userName ,"url":pictureUrlList[i].pictureUrl,"id":pictureUrlList[i].id};
         fileList= fileList.concat(filepicture);
      }}
    return {"fileList":fileList,"pictureUrl":pictureUrl};
  }

 };


//获取服务商品名称
export const get_serviceType = params => {
  return axios({
    url: `${base}/api/serviceType/get_serviceType`,
    method: 'get',    //application/x-www-form-urlencoded    ,
    params: { releaseType: params.releaseType,
              serviceType:params.serviceType},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

export const get_serviceTypeUrl = params => {
  return axios({
    url: `${base}/api/serviceType/get_serviceTypeUrl`,
    method: 'get',    //application/x-www-form-urlencoded    ,
    params: { releaseType: params.releaseType,
      serviceType:params.serviceType},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };



export const create_serviceType= params => { return axios.post(`${base}/api/serviceType/create_serviceType`, params).then(res => res.data);};
export const admin_create_serviceType= params => { return axios.post(`${base}/api/toExamine/admin_create_serviceType`, params).then(res => res.data);};

//创建电器/维修
export const create_equipment= params => { return axios.post(`${base}/api/equipment/create_equipment`, params).then(res => res.data); };
//用户获取自己创建电器/维修
export const get_myEquipment_list= params => { return axios.post(`${base}/api/equipment/get_myEquipment_list`, params).then(res =>  isButtonAndListusermrp(res.data,7) ); };
//电器操作列
export const operation_userequipment= params => { return axios.post(`${base}/api/equipment/operation_userequipment`, params).then(res => res.data); };
//用户根据id获取
export const get_userequipment_id= params => {
  return axios({
    url: `${base}/api/equipment/get_userequipment_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//公开根据id获取
export const getEquipmentDetails= params => {
  return axios({
    url: `${base}/api/equipment/getEquipmentDetails`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

export const getEquipmentReleaseTitleList= params => { return axios.post(`${base}/api/equipment/getEquipmentReleaseTitleList`, params).then(res => res.data); };
export const getEquipmentPublicList= params => { return axios.post(`${base}/api/equipment/getEquipmentPublicList`, params).then(res => res.data); };

export const create_foodAndGrain= params => { return axios.post(`${base}/api/foodAndGrain/create_foodAndGrain`, params).then(res => res.data);};
//用户获取自己创建菜
export const get_myFoodAndGrain_list= params => { return axios.post(`${base}/api/foodAndGrain/get_myFoodAndGrain_list`, params).then(res =>  isButtonAndListusermrp(res.data,7) ); };
//操作菜
export const operation_userFoodAndGrain= params => { return axios.post(`${base}/api/foodAndGrain/operation_userFoodAndGrain`, params).then(res => res.data); };
export const getFoodAndGrainTitleList= params => { return axios.post(`${base}/api/foodAndGrain/getFoodAndGrainTitleList`, params).then(res => res.data); };
export const getFoodAndGrainPublicList= params => { return axios.post(`${base}/api/foodAndGrain/getFoodAndGrainPublicList`, params).then(res => res.data); };
//公开根据id获取
export const getFoodAndGrainDetails= params => {
  return axios({
    url: `${base}/api/foodAndGrain/getFoodAndGrainDetails`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//用户根据id获取
export const get_userFoodAndGrain_id= params => {
  return axios({
    url: `${base}/api/foodAndGrain/get_userFoodAndGrain_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//酒水
export const create_wineAndTableware= params => { return axios.post(`${base}/api/wineAndTableware/create_wineAndTableware`, params).then(res => res.data);};
export const get_myWineAndTableware_list= params => { return axios.post(`${base}/api/wineAndTableware/get_myWineAndTableware_list`, params).then(res =>  isButtonAndListusermrp(res.data,7) ); };
export const operation_userWineAndTableware= params => { return axios.post(`${base}/api/wineAndTableware/operation_userWineAndTableware`, params).then(res => res.data); };
export const getWineAndTablewareTitleList= params => { return axios.post(`${base}/api/wineAndTableware/getWineAndTablewareTitleList`, params).then(res => res.data); };
export const getWineAndTablewarePublicList= params => { return axios.post(`${base}/api/wineAndTableware/getWineAndTablewarePublicList`, params).then(res => res.data); };
export const getWineAndTablewareDetails= params => {
  return axios({
    url: `${base}/api/wineAndTableware/getWineAndTablewareDetails`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

//b百货工服
export const create_departmentStore= params => { return axios.post(`${base}/api/departmentStore/create_departmentStore`, params).then(res => res.data);};
export const get_myDepartmentStore_list= params => { return axios.post(`${base}/api/departmentStore/get_myDepartmentStore_list`, params).then(res =>  isButtonAndListusermrp(res.data,7) ); };
export const operation_userDepartmentStore= params => { return axios.post(`${base}/api/departmentStore/operation_userDepartmentStore`, params).then(res => res.data);};
//用户根据id获取
export const get_userDepartmentStore_id= params => {
  return axios({
    url: `${base}/api/departmentStore/get_userDepartmentStore_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
export const getDepartmentStoreTitleList= params => { return axios.post(`${base}/api/departmentStore/getDepartmentStoreTitleList`, params).then(res => res.data); };
export const getDepartmentStorePublicList= params => { return axios.post(`${base}/api/departmentStore/getDepartmentStorePublicList`, params).then(res => res.data); };

export const getwholesale= params => { return axios.post(`${base}/api/wholesale/getwholesale`, params).then(res => res.data); };

export const getDepartmentStoreDetails= params => {
  return axios({
    url: `${base}/api/departmentStore/getDepartmentStoreDetails`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//用户根据id获取
export const get_userWineAndTableware_id= params => {
  return axios({
    url: `${base}/api/wineAndTableware/get_userWineAndTableware_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };

export const create_wholesaleCommodity= params => { return axios.post(`${base}/api/wholesaleCommodity/create_wholesaleCommodity`, params).then(res => res.data);};
export const get_wholesaleCommodity_serviceType= params => { return axios.post(`${base}/api/wholesaleCommodity/get_wholesaleCommodity_serviceType`, params).then(res => res.data);};
export const get_myWholesaleCommodity_list= params => { return axios.post(`${base}/api/wholesaleCommodity/get_myWholesaleCommodity_list`, params).then(res => isButtonAndListusermrp(res.data,13) ); };
export const operation_userWholesaleCommodity= params => { return axios.post(`${base}/api/wholesaleCommodity/operation_userWholesaleCommodity`, params).then(res => res.data);};
export const get_userWholesaleCommodity_id= params => {
  return axios({
    url: `${base}/api/wholesaleCommodity/get_userWholesaleCommodity_id`,
    params:{ id: params },
    method: 'get',    //application/x-www-form-urlencoded    ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(res => res.data); };
//制保留2位小数，如：2，会在2后面补上00.即2.00

function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  //转换单位
  var f = Math.round(x*100)/10000;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

export const  toDecimal= x =>{
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  //转换单位
  var f = Math.round(x*100)/10000;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
function isButtonAndListusermrp(res,type) {

  if (res.status === 0) {
    let list = res.data.datas;
    //用户获取自己发布  广告装修
    if(type===1){
    for (let a = 0; a < list.length; a++) {
      list[a].pictureUrl=JSON.parse(list[a].pictureUrl);
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
    }
    //管理员获取广告装修
    else if(type===2){
      for (let a = 0; a < list.length; a++) {

        list[a].pictureUrl=JSON.parse(list[a].pictureUrl);
        let authentiCationStatus = list[a].authentiCationStatus;
        if(authentiCationStatus===1){
          list[a].authentiCationStatus='审核中'
          list[a].authentiCationFailure = '';  //审核失败原因
        }else if(authentiCationStatus===3){
          list[a].authentiCationStatus='审核失败'
        }
        let releaseType=list[a].releaseType;
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
    }

    //管理员获取  实名 招聘  简历

    else if(type===3 || type===9){
      for (let a = 0; a < list.length; a++) {
        let authentiCationStatus = list[a].authentiCationStatus;
        if(type===9){
        list[a].licenseUrl=JSON.parse(list[a].licenseUrl);
        }
        if(authentiCationStatus===1){
          list[a].authentiCationStatus='审核中'
          list[a].authentiCationFailure = '';  //审核失败原因
        }else if(authentiCationStatus===3){
          list[a].authentiCationStatus='审核失败'
        }
      }
    }
    //用户获取自己发布的招聘
    else if(type===4){
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
    }
    //用户获取自己发布的租房
    else if(type===5 || type===7 || type===13){
      for (let a = 0; a < list.length; a++) {
        list[a].pictureUrl=JSON.parse(list[a].pictureUrl);
        if(type===7){
         list[a].serviceAndprice=JSON.parse( list[a].serviceAndprice);
        }
         if(type===13){
           //价格相关转换金额
           list[a].commodityJiage=toDecimal2( list[a].commodityJiage);
           list[a].deliveryCollect=toDecimal2( list[a].deliveryCollect);

           let reserve=list[a].reserve;
           if(reserve===1){
             list[a].reserve='支持在线下单';
           }else{
             list[a].reserve='只支持在线预订';
           }
           //   1自取,2送货,3自取+送货4满免 deliveryType
           let deliveryType=list[a].deliveryType;
           if(deliveryType===1){
             list[a].deliveryType='自取';
           }else if(deliveryType===2){
             list[a].deliveryType='送货';
           }else if(deliveryType===3){
             list[a].deliveryType='自取+送货';
           }else if(deliveryType===4){
             list[a].deliveryType='满免';
           }
           let isButten=list[a].isButten;
           list[a].isDisplayEdit = isButten.edit;
           list[a].isDisplayHide = isButten.hide;
           list[a].isDisplayRelease = isButten.release;
           list[a].isDisplayRefresh = isButten.refresh;
           list[a].isDisplayDelete = isButten.delete;
           list[a].isDisplayOrder = isButten.order;
           list[a].isDisplaySee = true;
           delete list[a].isButten;
           let  commodityPacking=list[a].commodityPacking;
           let specifi=list[a].specifi;
           if(commodityPacking===1){
             list[a].commodityPacking='散装';
           }else if(commodityPacking===2){
             list[a].commodityPacking='袋装';
             if(specifi===1){
               list[a].commoditySpecifications=list[a].cations+'g'+'/袋';
             }else  if(specifi===2){
               list[a].commoditySpecifications=list[a].cations+'kg'+'/袋';
             }
           }else if(commodityPacking===3){
             if(specifi===3){
               list[a].commoditySpecifications=list[a].cations+'ML'+'/瓶/桶';
             }else  if(specifi===4){
               list[a].commoditySpecifications=list[a].cations+'L'+'/瓶/桶';
             }

             list[a].commodityPacking='瓶/桶装';
           }}
        let welfareStatus = list[a].welfareStatus;
        if (welfareStatus === 1) {
          if(type===13){
            list[a].welfareStatus = '审核通过';
          }else{
          list[a].welfareStatus = '发布中';
          }
          list[a].authentiCationFailure = '';
          if(type!==13){
          list[a].isDisplayRefresh = true;
          list[a].isDisplayHide = true;
          list[a].isDisplayEdit = true;
          }
        } else if (welfareStatus === 2) {
          list[a].welfareStatus = '隐藏中';
          list[a].authentiCationFailure = '';  //审核失败原因
          if(type!==13) {
            list[a].isDisplayRelease = true;
          }
        } else if (welfareStatus === 4) {
          let authentiCationStatus = list[a].authentiCationStatus;
          if (authentiCationStatus === 3) {
            list[a].welfareStatus = '审核失败';
            if(type!==13) {
              list[a].isDisplayEdit = true;
            }
          } else {
            list[a].welfareStatus = '审核中'
            list[a].authentiCationFailure = '';
          }
        } else if (welfareStatus === 5) {
          if(type!==13) {
            list[a].welfareStatus = '已过期';
            list[a].authentiCationFailure = '';
            list[a].isDisplayDelay = true;
          }else{
            list[a].welfareStatus = '审核通过';
            list[a].authentiCationFailure = '';
          }
        }
        if(type!==13) {
          list[a].isDisplaySee = true;
          list[a].isDisplayDelete = true;
        }
        let releaseType=list[a].releaseType;
        if(releaseType===14){
          list[a].releaseType='店面/窗口出租';
        }else if(releaseType===15){
          list[a].releaseType='摊位出租/转让';
        }else if(releaseType===18){
          list[a].releaseType='设备维修';
        }else if(releaseType===33){
          list[a].releaseType='电器设备出售';
        }else if(releaseType===34){
          list[a].releaseType='二手电器设备';
        }else if(releaseType===4){
          list[a].releaseType='蔬菜';
        }else if(releaseType===5){
          list[a].releaseType='粮油';
        }else if(releaseType===6){
          list[a].releaseType='副食/调料';
        }else if(releaseType===29){
          list[a].releaseType='水产/禽蛋';
        }else if(releaseType===9){
          list[a].releaseType='清洁用品';
        } else if(releaseType===11){
          list[a].releaseType='桌椅餐具';
        }else if(releaseType===7){
          list[a].releaseType='酒水/饮料';
        }else if(releaseType===8){
          list[a].releaseType='消毒餐具';
        } else if(releaseType===101){
          list[a].releaseType='工服';
        }
        else if(releaseType===102){
          list[a].releaseType='百货';
        }
        else if(releaseType===103){
          list[a].releaseType='绿植';
        }
        else if(releaseType===104){
          list[a].releaseType='装饰用品';
        }
        else{
          list[a].releaseType='';
        }
      }
    }
    //管理员租房
    else if(type===6 || type===8  || type===14){
      for (let a = 0; a < list.length; a++) {
        if(type===8){
          list[a].serviceAndprice=JSON.parse( list[a].serviceAndprice);
        }
        if(type===14){
        //价格相关转换金额
          list[a].commodityJiage=toDecimal2( list[a].commodityJiage);
          list[a].deliveryCollect=toDecimal2( list[a].deliveryCollect);
      let reserve=list[a].reserve;
      if(reserve===1){
        list[a].reserve='支持在线下单';
      }else{
        list[a].reserve='只支持在线预订';
      }

       //   1自取,2送货,3自取+送货4满免 deliveryType
       let deliveryType=list[a].deliveryType;
       if(deliveryType===1){
         list[a].deliveryType='自取';
       }else if(deliveryType===2){
         list[a].deliveryType='送货';
       }else if(deliveryType===3){
         list[a].deliveryType='自取+送货';
       }else if(deliveryType===4){
         list[a].deliveryType='满免';
       }


        let  commodityPacking=list[a].commodityPacking;
          let specifi=list[a].specifi;
          if(commodityPacking===1){
            list[a].commodityPacking='散装';
          }else if(commodityPacking===2){
            list[a].commodityPacking='袋装';
            if(specifi===1){
              list[a].commoditySpecifications=list[a].cations+'g'+'/袋';
            }else  if(specifi===2){
              list[a].commoditySpecifications=list[a].cations+'kg'+'/袋';
            }
          }else if(commodityPacking===3){
            if(specifi===3){
              list[a].commoditySpecifications=list[a].cations+'ML'+'/瓶/桶';
            }else  if(specifi===4){
              list[a].commoditySpecifications=list[a].cations+'L'+'/瓶/桶';
            }

            list[a].commodityPacking='瓶/桶装';
          }
        }
        list[a].pictureUrl=JSON.parse(list[a].pictureUrl);
        let authentiCationStatus = list[a].authentiCationStatus;
        if(authentiCationStatus===1){
          list[a].authentiCationStatus='审核中'
          list[a].authentiCationFailure = '';  //审核失败原因
        }else if(authentiCationStatus===3){
          list[a].authentiCationStatus='审核失败'
        }
        let releaseType=list[a].releaseType;
        if(releaseType===14){
          list[a].releaseType='店面/窗口出租';
        }else if(releaseType===15){
          list[a].releaseType='摊位出租/转让';
        }else if(releaseType===18){
          list[a].releaseType='设备维修';
        }else if(releaseType===33){
          list[a].releaseType='电器设备出售';
        }else if(releaseType===34){
          list[a].releaseType='二手电器设备';
        }else if(releaseType===4){
          list[a].releaseType='蔬菜';
        }else if(releaseType===5){
          list[a].releaseType='粮油';
        }else if(releaseType===6){
          list[a].releaseType='副食/调料';
        }else if(releaseType===29){
          list[a].releaseType='水产/禽蛋';
        }else if(releaseType===9){
          list[a].releaseType='清洁用品';
        } else if(releaseType===11){
          list[a].releaseType='桌椅餐具';
        }else if(releaseType===7){
          list[a].releaseType='酒水/饮料';
        }else if(releaseType===8){
          list[a].releaseType='消毒餐具';
        }
        else if(releaseType===101){
          list[a].releaseType='工服';
        }
        else if(releaseType===102){
          list[a].releaseType='百货';
        }
        else if(releaseType===103){
          list[a].releaseType='绿植';
        }
        else if(releaseType===104){
          list[a].releaseType='装饰用品';
        }
        else{
          list[a].releaseType='';
        }
      }
    }
    else if(type===10){
      for (let a = 0; a < list.length; a++) {
        let isReceipt = list[a].isReceipt;
        if(isReceipt===3){
          list[a].qianyueTime=''
          list[a].qianyueDetailed = '';  //审核失败原因
          list[a].isReceipt = '未通知';
          list[a].istongzhi = true;
          list[a].isbianji = false;
        }else if(isReceipt===4){
          list[a].isReceipt = '已通知';
          list[a].istongzhi = false;
          list[a].isbianji = true;

        }else if(isReceipt===6){
          list[a].isReceipt = '已拒绝';
          list[a].istongzhi = true;
          list[a].isbianji = false;

        }
      }
    }

 //查看和删除全部有 除了审批scope.row.isDisplaySee">查看，scope.row.isDisplayDelete"   >删除，
//       </el-button>
//       scope.row.isDisplayRefresh"  v-loading.fullscreen.lock="fullscreenLoading" >刷新</el-button>
//       scope.row.isDisplayDelay" >延期</el-button>
//       "scope.row.isDisplayHide">隐藏</el-button>
//       scope.row.isDisplayRelease" >发布</el-button>
//       </el-button>
//       scope.row.isDisplayEdit" >编辑</el-button>
    res.data.datas = list;
    return res;
    //    1发布中，2隐藏中，3删除,4审核中,5不在有效期
  } else {
    return res;
  }
}


export const changeNum = params =>{
  if ( /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(params)) {
    console.log('有效');
    return true;
  }
  return false;
};
export const newstr= params => {
  if(params.type===1){
    return   params.res.replace("(商品类型不存在，如果合规请手动添加: )","");
  }
};

//根据错误跳转页面和报错
  export const isRoleMessage = params => {
    Message.error(params);
    if (params === '用户登陆已过期' || params === '用户未登录,无法获取当前用户的信息') {
      router.push({path: '/login/sign'});
    } else if (params === '没有权限') {
      router.push({path: '/home/release'});
    } else {

    }
  };
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
  };




