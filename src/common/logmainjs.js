function checkLog(data) {
  if(data.status===0){
    let user=data.data;
    window.localStorage.setItem('dian_isAuthentication',user.isAuthentication);
    window.localStorage.setItem('dian_role',user.role);
    return true;
  }
  return false;
}
function logOu(){
  window.localStorage.removeItem('dian_isAuthentication');
  window.localStorage.removeItem('dian_role');
}

// 保存
// window.localStorage.setItem('foo','bar')//1起名字，2 给值
// 删除
// window.localStorage.removeItem()
// 修改
// window.localStorage.setItem()
// 读取
// window.localStorage.getItem()
export { //很关键
  checkLog,
  logOu
}
