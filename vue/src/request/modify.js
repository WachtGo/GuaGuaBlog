import request from "./request"


//修改资料
export function modifyData(params) {
    return request({
        url: '/modify/modifyData',
        method: 'post',
        data: params,
    })
}

//修改头像
export function updateAvatar(params) {
    return request({
        url: '/modify/updateAvatar',
        method: 'post',
        data: params,
    })
}
