import Fly from 'flyio/dist/npm/wx'
import { getToken } from './auth'
import utils from './utils'
import store from '../store'
import { isArray } from 'lodash'
let baseUrl = ''
export let urlSuffix = process.env.VUE_APP_BASE_API
// urlSuffix = '-dev'
export const dataProcess = `/cim6d-bim-light${urlSuffix}`
export const construction = flyService(`/cim6d-construction${urlSuffix}`)
const http = flyService(`/cim6d-construction${urlSuffix}`)
http.iotEquipmentMonitor = flyService(`${baseUrl}/cim6d-iot${urlSuffix}`) // 物联网
http.iot = flyService(`${baseUrl}/cim6d-iot${urlSuffix}`) //物联网

export const system = flyService(`${baseUrl}/cim6d-system${urlSuffix}`)
export const wx = flyService(`${baseUrl}/cim6d-wx${urlSuffix}`)
export const schedule = flyService(`${baseUrl}/cim6d-construction${urlSuffix}/schedule`)
http.file = flyService(`${baseUrl}/cim6d-file${urlSuffix}`)
http.system = system
http.material = flyService(`${baseUrl}/cim6d-construction${urlSuffix}`)
http.wx = wx
http.process = flyService(`${baseUrl}/cim6d-process${urlSuffix}`) // 工作流相关
export default http
export const fileUrl = `${baseUrl}/cim6d-file${urlSuffix}`
function flyService(baseURL) {
  const fly = new Fly()
  // 接口地址配置
  fly.config.baseURL = baseURL
  fly.config.timeout = 10000
  const toLogin = function () {
    // store.commit('user/login')
  }
  // 添加拦截器
  fly.interceptors.request.use((request, promise) => {
    // 是否显示加载中
    if (request.isLoading) {
      request.clock = setTimeout(() => {
        request.isInLoading = true
        //utils.showLoading()
      }, 500)
    }
    if (uni.getStorageSync('projectId')) {
      request.headers['project-id'] = uni.getStorageSync('projectId')
    }
    request.headers['application-type'] = 'wx'
    const token = getToken()
    // 免登录临时token
    if (token) {
      // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      request.headers['x-access-token'] = token
    }
    const authParams = {
      // 公共参数
    }

    if (!isArray(request.body)) {
      request.body = {
        ...request.body,
        ...authParams
      }
    }
    return request
  })
  fly.interceptors.response.use(
    response => {
      if (response.request.clock) {
        clearTimeout(response.request.clock)
        if (response.request.isInLoading) {
          utils.hideLoading()
        }
      } else if (response.request.isLoading) {
        utils.hideLoading()
      }
      uni.stopPullDownRefresh()
      // token失效
      if (response.data.code === 1000) {
        toLogin()
        return Promise.reject(response)
      }
      if (response.data.code === 603) {
        location.href = '/404.html'
        return Promise.reject(response)
      }
      if (response.data.code === 200) {
        return response.data
      } else {
        utils.showToast(response.data.message || '系统开小差了')
        return Promise.reject(response)
      }
    },
    err => {
      if (err.request.clock) {
        clearTimeout(err.request.clock)
        if (err.request.isInLoading) {
          utils.hideLoading()
        }
      } else if (err.request.isLoading) {
        utils.hideLoading()
      }
      utils.showToast('网络异常请稍后再试')
      uni.stopPullDownRefresh()
    }
  )
  return fly
}
