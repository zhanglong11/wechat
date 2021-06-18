import { construction, system } from '@/utils/http'

// 任务详情
export function getScheduleTaskByTaskId(taskId) {
  return construction.get('/schedule/task/get/' + taskId)
}

// 判断微信消息确认状态(0 未读 1 已读) @author yangjiaqi
export function judgeReadByMessageId(messageId) {
  return system.get(`message/record/judgeRead/${messageId}`)
}

// 微信消息确认 @author yangjiaqi
export function readByWx(messageId) {
  return system.get(`message/record/readByWx/${messageId}`)
}

export function getUserInfo() {
  return system.get('cim6d/system/wx/user/current/get')
}

// 获取用户项目列表
export function getProjectList() {
  return system.get('cim6d/wx/user/project/list')
}
