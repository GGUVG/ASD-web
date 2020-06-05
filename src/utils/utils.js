import axios from 'axios';
import QS from 'qs';
//封装axios的post



//获取cookie
export function getAppointCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
  return (arr[2]);
  else
  return null;
  }

  

