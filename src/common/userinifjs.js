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
  getupAut
}
