import request from "./request"

//获取友链
export function sendMail(params) {
    return request({
        url: '/about/sendMail',
        method: 'post',
        data: params,
    })
}
