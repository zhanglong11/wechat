<template>
  <view class="main">
    <view class="main-body">
      <view>
        <template v-if="taskType">
          <view class="card">
            <uni-form-item label="任务内容" type="textarea" align="left">
              <view>{{ info.taskContent }}</view>
            </uni-form-item>
            <uni-form-item label="任务类型">
              <view>多任务</view>
            </uni-form-item>
            <uni-form-item label="任务重要性">
              <view>{{ $getLabel(importList, info.taskLevel) }}</view>
            </uni-form-item>
            <uni-form-item label="任务发起人">
              <view>{{ info.initiatorStr }}</view>
            </uni-form-item>
            <uni-form-item label="任务发起时间">
              <view>{{ info.createTime }}</view>
            </uni-form-item>
          </view>
          <block v-for="(item, index) in info.taskResultDetailDTOList" :key="index">
            <p class="card-title">
              <span>子任务{{ index + 1 }}</span>
              <span v-if="item.status !== 1" class="btn" @click="urge(item.id)">催办</span>
            </p>
            <uni-form-custom :ref="index" :model="item" class="mt20">
              <uni-card isForm>
                <uni-form-item label="子任务内容" prop="taskContent">
                  {{ item.taskContent }}
                </uni-form-item>
                <uni-form-item label="任务截止时间" prop="taskEndTime">
                  {{ item.taskEndTime }}
                </uni-form-item>
                <uni-form-item label="任务接收人" prop="executor">
                  {{ item.executorStr }}
                </uni-form-item>
                <uni-form-item label="完成情况">
                  <view>{{ $getLabel(statusList, item.status) }}</view>
                </uni-form-item>
                <template v-if="item.status === 1">
                  <uni-form-item label="完成结果">
                    <view>{{ item.taskResult }}</view>
                  </uni-form-item>
                  <uni-form-item class="file-item" label="附件">
                    <uni-attachment v-model="item.fileId" />
                  </uni-form-item>
                </template>
              </uni-card>
            </uni-form-custom>
          </block>
        </template>

        <view v-else class="card">
          <uni-form-item label="任务内容" type="textarea" align="left">
            <view>{{ info.taskContent }}</view>
          </uni-form-item>
          <uni-form-item label="任务类型">
            <view>单一任务</view>
          </uni-form-item>
          <uni-form-item label="任务重要性">
            <view>{{ $getLabel(importList, info.taskLevel) }}</view>
          </uni-form-item>
          <uni-form-item label="任务发起人">
            <view>{{ info.initiatorStr }}</view>
          </uni-form-item>
          <uni-form-item label="任务发起时间">
            <view>{{ info.createTime }}</view>
          </uni-form-item>
          <uni-form-item label="任务截止时间">
            <view>{{ info.taskEndTime }}</view>
          </uni-form-item>
          <uni-form-item label="完成情况">
            <view>{{ $getLabel(statusList, info.status) }}</view>
          </uni-form-item>
          <template v-if="info.status === 1">
            <uni-form-item label="完成结果">
              <view>{{ info.taskResult }}</view>
            </uni-form-item>
            <uni-form-item class="file-item" label="附件">
              <uni-attachment v-model="info.fileId" />
            </uni-form-item>
          </template>
        </view>
      </view>
      <MessageButton></MessageButton>
    </view>
  </view>
</template>

<script>
import Api from './api'
import typeList from './lib/typeList'
import importList from './lib/importList'
import statusList from './lib/statusList'
export default {
  name: 'TaskDetail',
  components: {},
  data() {
    return {
      info: {},
      id: '',
      isLoading: false,
      typeList,
      importList,
      statusList,
      taskType: null,
      type: null
    }
  },
  onLoad(options) {
    this.id = options.id
    this.type = options.type || 'hand'
    this.init()
  },
  onShow() {
    this.init()
  },
  methods: {
    //初始化页面参数
    init() {
      this.getDetail()
    },
    //获取详情
    async getDetail() {
      let res = await Api.detail(this.id)
      this.info = res.data
      this.taskType = res.data.taskType
    },
    //催办
    async urge(id) {
      await Api.urge({ idList: [id] })
      this.$utils.showToast('成功')
    },
    //一键催办
    async urgeAll() {
      let ids = this.info.taskResultDetailDTOList.filter(t => t.status !== 1).map(r => r.id)
      await Api.urge({ idList: ids })
      this.$utils.showToast('成功')
    },
    toResult(id) {
      this.$utils.toUrl(`/pages/task/result?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('detail');
.btn-wrapper {
  button + button {
    margin-top: 20px;
  }
}
.card-title {
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx 10rpx 40rpx;
  .btn {
    color: #1890ff;
  }
}
</style>
