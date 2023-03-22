import request from "./request"

//未登录时的展示的数据用户
export function getroot(params) {
    return request({
        url: '/user/root',
        method: 'get',
        params: params,
    })
}

//登录
export function login(params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params,
    })
}

//注册
export function register(params) {
    return request({
        url: '/user/register',
        method: 'post',
        data: params,
    })
}


//获取图片验证码
export function getCaptcha() {
    return request({
        url: '/user/getCaptcha',
        method: 'get'
    })
}