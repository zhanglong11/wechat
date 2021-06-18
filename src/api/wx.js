import { wx } from '@/utils/http'
import store from '@/store'

/**
 * wx-jsapi-controller-getSignature
 */

export function getSignature() {
  const isIOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const appId = store.state.appId
  const url = isIOS ? localStorage.getItem('landPageUrl') : location.href
  return wx.post(`noToken/wx/jsapi/${appId}/getSignature`, { url })
}
