import Cookies from "js-cookie";

/* 
    传入cookie名获取cookie
*/
export function getCookie(cookieName) {
    // return Cookies.get()//获取所有可见的cookie
    return Cookies.get(cookieName)
}

/* 
    设置cookie
*/
export function setCookie(cookieName, cookieValue) {
    Cookies.set(cookieName, cookieValue, { expires: 999 })//设置30天
}

/* 
    删除cookie -- 退出登录
*/
export function removeCookie(cookieName) {
    Cookies.remove(cookieName)
}
