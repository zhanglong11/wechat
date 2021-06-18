import Vue from 'vue'
import App from './App'

import store from './store'
import utils from './utils/utils' // 通用函数封装
import _ from 'lodash'
import fly from './utils/http'
import MessageButton from '@/components/MessageButton'
import EmptyTemplate from '@/components/empty-template' // 无数据空载页
import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.component('EmptyTemplate', EmptyTemplate)

Vue.config.productionTip = false
Vue.prototype.fly = fly
Vue.prototype.axios = fly

Vue.prototype.$store = store
Vue.prototype.$utils = utils
Vue.prototype._ = _
moment.locale('zh-cn')
Vue.prototype.moment = moment
document.title = '工程飞鱼'
Object.defineProperty(document, 'title', {
  set: function () {
    return ''
  }
})
Vue.component(MessageButton.name, MessageButton)
const getLabel = (options, value) => {
  return _.get(_.find(options, { value }), 'label', '-')
}
Vue.prototype.$getLabel = getLabel
Vue.prototype.$getLabelFromArg = (argGroup, value) => {
  return getLabel(_.find(store.state.systemConfig.argTree, { argGroup })?.children ?? [], value)
}
Vue.prototype.$getArgList = group =>
  store.state.systemConfig.argTree &&
  store.state.systemConfig.argTree.filter(item => item.argCode === group)[0].children.filter(item => !item.deleteFlag)
// 全局过滤器
import * as customFilters from '@/utils/filters'
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key])
})
App.mpType = 'app'
console.log(location.href)
import { getSignature } from '@/api/wx'
~(async function () {
  if (!sessionStorage.getItem('token')) {
    alert('系统异常')
    throw new Error('系统异常')
  } else {
    await store.dispatch('systemConfig/getArgTree')
    await store.dispatch('user/getUserInfo')
    const app = new Vue({
      store,
      ...App
    })
    app.$mount()
  }
  getSignature().then(res => {
    jWeixin.config({
      ...res.data,
      jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
    })
    jWeixin.ready(() => {
      jWeixin.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          store.commit('user/setCoordinate', {
            longitude,
            latitude
          })
        }
      })
    })
  })
})()
