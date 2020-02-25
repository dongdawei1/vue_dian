function checkLog(res) {
  if(res.status===0){
    let user=res.data;
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
// window.localStorage.getItem()   如果读取不到返回    null
export { //很关键
  checkLog,
  logOu
}
