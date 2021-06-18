<template>
  <div class="main">
    <uni-card>
      <uni-form-item label="任务名称">{{ form.taskName }}</uni-form-item>
      <uni-form-item label="计划开始时间">{{ form.planStartDate | ymd }}</uni-form-item>
      <uni-form-item label="计划结束时间">{{ form.planEndDate | ymd }}</uni-form-item>
      <uni-form-item label="实际开始时间">{{ form.actualStartDate | ymd }}</uni-form-item>
      <uni-form-item label="实际结束时间">{{ form.actualEndDate | ymd }}</uni-form-item>
      <uni-form-item label="任务状态">{{ getTaskStatusByValue(form.status) }}</uni-form-item>
      <uni-form-item label="验收状态">{{ getAcceptStatusByValue(form.acceptanceStatus) }}</uni-form-item>
      <uni-form-item label="任务执行人">{{ form.executePersonName }}</uni-form-item>
      <uni-form-item label="关联状态">{{ ['未关联', '已关联'][form.isBind] }}</uni-form-item>
      <uni-form-item label="变更记录">
        <a v-if="form.recordList.length" @click="$utils.toUrl('/pages/schedule/changeRecord?taskId=' + taskId)">
          查看 >
        </a>
        <span v-else>无</span>
      </uni-form-item>
      <uni-form-item label="里程碑">{{ ['否', '是'][form.milestoneFlag] }}</uni-form-item>
    </uni-card>
  </div>
</template>

<script>
import { getScheduleTaskByTaskId, getScheduleTaskReceive, startScheduleTask } from './api'
import { getTaskStatusByValue } from './lib/taskStatusList'
import { getAcceptStatusByValue } from './lib/acceptStatusList'

export default {
  name: 'Detail',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      taskId: '',
      form: {
        recordList: []
      },
      isLoading: false
    }
  },
  computed: {
    isReceiver() {
      return this.form.receiver
    }
  },
  onLoad(options) {
    this.taskId = options.taskId || options.id
  },
  onShow() {
    this.refresh()
  },
  // 生命周期 - 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，属性可以访问
  mounted() {},
  // 方法集合
  methods: {
    // 刷新主要数据,一般表格页面为刷新列表，详情页面为刷新详情
    refresh() {
      getScheduleTaskByTaskId(this.taskId).then(res => {
        this.form = res.data
      })
    },
    getTaskStatusByValue,
    getAcceptStatusByValue
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/common.less';
.button + .button {
  margin-top: 15px;
}
.main {
  padding: 10px 25px 25px;
}
</style>
