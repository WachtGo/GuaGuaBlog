import axios from 'axios'
import { Message } from 'element-ui';
import store from '../store'



const needlogin = ['/message/deleteMessage', '/link/deletelink', '/link/addlink', '/modify/modifyData', '/modify/updateAvatar']

let timer = null  //防止一直点击弹出提示
const request = axios.create({
    baseURL: 'http://116.62.23.57/',
    // baseURL: 'https://wacht.fun/',
    // baseURL: 'https://biejuanle.icu',
    // changeOrigin: true,
    // baseURL: 'http://127.0.0.1:80',
    // baseURL: 'http://localhost:3000'
});

axios.defaults.timeout = 5000
request.interceptors.request.use(config => {
    if (store.state.token) {//有token就发送token，没有就不发，防止发个空的token给后端
        config.headers.Authorization = 'Bearer ' + store.state.token
    } else {
        // console.log(config.url)
        if (needlogin.includes(config.url)) {//没有登录，并且进行的请求的接口需要登录则走向这
            if (timer) return false;
            Message.error('该操作需要登录')
            timer = setTimeout(() => {
                timer = null
            }, 3000);
            return false
        }
    }
    return config
}, error => {
    return Promise.reject(error);
});

request.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});
export default request;

