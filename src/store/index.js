import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import systemConfig from './modules/systemConfig'
import getters from './getters'
import { getUserInfo } from '@/api'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    appId: process.env.VUE_APP_WECHAT_APP_ID,
    bindKey: '',
    user: {},
    project: uni.getStorageSync('project') ? uni.getStorageSync('project') : {}
  },
  mutations: {
    changeBindKey(state, bindKey) {
      state.bindKey = bindKey
    },
    changeUser(state, data) {
      state.user = data
    },
    changeProject(state, data) {
      uni.setStorageSync('project', data)
      uni.setStorageSync('projectId', data.id)
      state.project = data
    }
  },
  actions: {
    getUserInfo({ commit }) {
      getUserInfo().then(res => {
        commit('changeUser', res.data)
      })
    }
  },
  modules: {
    user,
    systemConfig
  },
  getters
})

export default store
