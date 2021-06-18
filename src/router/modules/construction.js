// 施工路由汇总
module.exports = {
  children: [
    ...require('../constructionRouter/base'), // 通用组件路由
    ...require('../constructionRouter/patrol'), //巡更打卡
    ...require('../constructionRouter/attendance'), //考勤
    ...require('../constructionRouter/attendanceWl') // 考勤统计物联
  ]
}
