import { getToken, setToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
const state = {
  token: getToken() || '',
  mobile: wx.getStorageSync('mobile') || '',
  userName: wx.getStorageSync('userName') || '',
  userId: wx.getStorageSync('userId') || '',
  userInfo: JSON.parse(wx.getStorageSync('userInfo') || '{}'), // 用户信息
  userLongitude: wx.getStorageSync('userLongitude') || '', // 经度，浮点数
  userLatitude: wx.getStorageSync('userLatitude') || '' // 纬度，浮点数
}

const mutations = {
  setToken(state, token) {
    setToken(token)
    state.token = token
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    wx.setStorageSync('userInfo', JSON.stringify(userInfo))
    state.userId = userInfo.id
    wx.setStorageSync('userId', userInfo.id)
    state.mobile = userInfo.mobile
    wx.setStorageSync('mobile', userInfo.mobile)
    state.mobile = userInfo.mobile
    wx.setStorageSync('mobile', userInfo.mobile)
    state.userName = userInfo.realName
    wx.setStorageSync('userName', userInfo.realName)
  }
}

const actions = {
  // 获取当前用户信息
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    let datas = result.data
    commit('setUserInfo', datas)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
