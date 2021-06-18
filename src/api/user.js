import http from '../utils/http'
/**
 * 获取项目下的人员列表
 * @param projectId
 * @returns {Array}
 */
export function getUserList(projectId) {
  return http.system.post('/cim6d/system/project/organ/query', { projectId }).then(res => res.data)
}
// 查询未读数量 @author yangjiaqi
export function getUnreadMessage() {
  return http.system.get(`/message/record/unread/count`)
}

// 获取当前用户信息
export function getUserInfo() {
  return http.system.get('/cim6d/system/wx/user/current/get')
}
