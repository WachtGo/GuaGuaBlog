import request from "./request"

//获取所有用户的昵称和id，用于选择留言板
export function getBoardUsers(params) {
    return request({
        url: '/message/getBoardUsers',
        method: 'get',
        params: params,
    })
}

//获取留言板
export function getMessages(params) {
    return request({
        url: '/message/getMessages',
        method: 'get',
        params: params,
    })
}
//写留言
export function writeMessage(params) {
    return request({
        url: '/message/writeMessage',
        method: 'post',
        data: params,
    })
}
//删除留言
export function deleteMessage(params) {
    return request({
        url: '/message/deleteMessage',
        method: 'post',
        data: params,
    })
}