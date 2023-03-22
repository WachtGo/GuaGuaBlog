import request from "./request"

//获取友链
export function getlink(params) {
    return request({
        url: '/link/getlink',
        method: 'get',
        params: params,
    })
}

//添加链接
export function addlink(params) {
    return request({
        url: '/link/addlink',
        method: 'post',
        data: params,
    })
}

//添加链接
export function deletelink(params) {
    return request({
        url: '/link/deletelink',
        method: 'post',
        data: params,
    })
}