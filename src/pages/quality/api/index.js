/*
质量管理的api
 */
import http from '@/utils/http'
export default {
  //保存检查计划
  savePlan: data => {
    return http.post('/inspectPlan/save', data)
  },
  //保存并启用检查计划
  saveAndStartPlan: data => {
    return http.post('/inspectPlan/saveAndEnable', data)
  },
  // 获取检查计划列表
  getPlanList: data => {
    return http.post('/inspectPlan/list', data)
  },
  //获取计划详情
  getPlanDetail: id => {
    return http.get(`/inspectPlan/get/${id}`, {})
  },
  //删除计划
  deletePlanById: data => {
    return http.post(`/inspectPlan/batchDelete`, data)
  },
  //停用计划
  stopPlanById: id => {
    return http.get(`/inspectPlan/disable/${id}`, {})
  },
  //启用计划
  startPlanById: id => {
    return http.get(`/inspectPlan/enable/${id}`, {})
  },
  //根据检查id获取问题详细列表
  getIssueListByInspectId: id => {
    return http.get(`/inspectPlan/inspectProblem/listAll/${id}`, {})
  },
  //添加检查情况
  addIssueInspectList: data => {
    return http.post('/inspectPlan/inspectProblem/add', data)
  },
  //获取问题列表
  getIssueList: data => {
    return http.post('/inspectProblem/list', data)
  },
  //获取问题详情
  getIssueDetailById: id => {
    return http.get(`/inspectProblem/get/${id}`, {})
  },
  //保存问题
  saveIssue: data => {
    return http.post('/inspectProblem/save', data)
  },
  //保存并下达问题
  saveAddReleaseIssue: data => {
    return http.post('/inspectProblem/saveAndRelease', data)
  },
  //删除问题
  deleteIssueById: data => {
    return http.post('/inspectProblem/batchDelete', data)
  },
  //问题下达
  releaseIssueById: id => {
    return http.get(`/inspectProblem/release/${id}`, {})
  },
  //整改保存
  handleRectify: data => {
    return http.post('/inspectProblem/rectify', data)
  },
  //复查保存
  handleReview: data => {
    return http.post('/inspectProblem/review', data)
  },
  //验收申请列表
  getInspectionList: data => {
    return http.post('qualityAcceptanceApply/list', data)
  },
  //验收申请列表
  getInspectionInfo: id => {
    return http.get(`qualityAcceptanceApply/get/${id}`, {})
  },
  //验收申请保存
  getInspectionSave: data => {
    return http.post('qualityAcceptanceApply/save', data)
  },
  //验收申请保存并提交
  getInspectionSaveAndSubmit: data => {
    return http.post('qualityAcceptanceApply/saveAndSubmit', data)
  },
  //删除计划
  deleteInspectionById: data => {
    return http.post(`qualityAcceptanceApply/batchDelete`, data)
  },

  //关联
  link: data => http.post(`bim/bind`, data)
}
