import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";//状态持久化，将vuex资源保存在localStorage中
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'//用来存token
import { getStorage, setStorage, removeStorage } from '@/utils/storage'//用来存信息

import message from "./message"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'blog_State', //其实就是设置本地存储的键名，默认值vuex,
      storage: window.localStorage, // 缓存的介质localStorage
      // storage: window.sessionStorage,// 缓存的介质sessionStorage
      whiteList: ['token', 'userInfo'],// 白名单 要缓存的数据，刷新不会丢失，重新打开也不会丢失
      // blackList: [], // 黑名单 不缓存的数据，刷新丢失
    }),
  ],
  state: {
    token: null,//登录信息
    userInfo: {//无需存用户id，因为后端通过token获取，
    },
  },
  getters: {
  },
  mutations: {
    //将token保存在cookie中
    setTOKEN(state, tokenValue) {
      state.token = tokenValue
      setCookie('blog_token', tokenValue)
    },
    //清除token,退出登录
    removeTOKEN(state) {
      state.token = null
      state.userInfo = {//改回站长的数据
      },
        removeCookie('blog_token')
      // console.log()
    },
    //设置本地存储
    setSTORAGE(state, obj) {
      // console.log('设置本地存储', obj.name, obj.value)
      setStorage(obj.name, obj.value)
    },
    // 清楚特定本地存储
    removeSTORAGE(state, name) {
      // console.log('清除本地存储：', name)
      removeStorage(name)
    },
    //更新vuex中的用户信息
    setUSERINFO(state, userInfo) {
      // console.log('更新vuex中的用户信息', userInfo)
      state.userInfo = userInfo
    },
    //更新留言数量
    updateMessageCount(state, count) {
      // console.log('更新留言数量', count)
      state.userInfo.messageCount = count
    }
  },
  actions: {//接收异步
    getTOKEN(state, tokenName) {
      return getCookie(tokenName)
    },
    getSTORAGE(state, name) {
      return getStorage(name)
    },
  },
  modules: {
    message,
  }
})
