import {msgdealft} from "./msgdeal.js";
import {get_user_info} from '../api/api';
import {checkLog} from "./logmainjs.js";

function getisAut() {

  let isAuthentication = window.localStorage.getItem('dian_isAuthentication');
  if (isAuthentication === null || isAuthentication === '') {

    get_user_info().then((res) => {
      if (checkLog(res)) {
        return true;
      } else {
        msgdealft(res.msg);
      }
    });
  }
}

function isAuthentication() {
  let role = window.localStorage.getItem('dian_role');
  if (role === null || role === '') {
    this.$alert('<strong>获取用户信息失败！</strong>', '请重新登陆', {
      dangerouslyUseHTMLString: true
    });
    this.$router.push({path: '/home/release'});
    return false;
  }
  if (window.localStorage.getItem('dian_isAuthentication')===null || window.localStorage.getItem('dian_isAuthentication') !== '2') {

    get_user_info().then((res) => {
      if(res.status===0){
        if(res.data.isAuthentication===2){
           if(checkLog(res)){
             return true;
           }
        }
      }
    });
    this.$alert('<strong>您需要在用户中心下的我的账户完善商户信息才能查看信息！</strong>', '用户信息不完善', {
      dangerouslyUseHTMLString: true
    });
    this.$router.push({path: '/home/myAccount'});
    return false;
  }

  return true;
}

function getupAut() {
  get_user_info().then((res) => {
    if (checkLog(res)) {
      return true;
    } else {
      msgdealft(res.msg);
    }
  });
}


function getrole() {
  let role = window.localStorage.getItem('dian_role');
  if (role === null || role === '') {
    get_user_info().then((res) => {
      if (checkLog(res)) {
        return true;
      } else {
        msgdealft(res.msg);
      }
    });
  }

}

// 保存
// window.localStorage.setItem('foo','bar')//1起名字，2 给值
// 删除
// window.localStorage.removeItem()
// 修改
// window.localStorage.setItem()
// 读取
// window.localStorage.getItem()   如果读取不到返回    null
export { //很关键
  getisAut,
  getrole,
  getupAut,
  isAuthentication
}
