import {Message} from "element-ui";
import router from "../router";

function msgdealft(params) {
  Message.error(params);
  if (params === '用户登陆已过期' || params === '用户未登录,无法获取当前用户的信息') {
    router.push({path: '/login/sign'});
  } else if (params === '没有权限') {
    router.push({path: '/home/release'});
  }
}

export {
  msgdealft
}
