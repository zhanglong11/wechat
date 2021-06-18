<template>
  <view class="main">
    <view class="main-body">
      <view>
        <view class="card">
          <uni-form-item label="消息标题" type="textarea" align="left">
            <view>{{ info.title }}</view>
          </uni-form-item>
          <uni-form-item v-if="info.content" label="内容" type="textarea" align="left">
            <view>{{ info.content }}</view>
          </uni-form-item>
          <uni-form-item label="消息类型">
            <view>{{ $getLabel(typeList, info.type) }}</view>
          </uni-form-item>
          <uni-form-item v-if="type === 'receive'" label="发送人">
            <view>{{ info.sendName }}</view>
          </uni-form-item>
          <uni-form-item v-else label="接收人">
            <view>{{ info.sendName }}</view>
          </uni-form-item>
          <uni-form-item label="发送时间">
            <view>{{ info.sendTime }}</view>
          </uni-form-item>
          <uni-form-item v-if="info.fileId" class="file-item" label="附件">
            <uni-attachment v-model="info.fileId" />
          </uni-form-item>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Api from './api'
import typeList from './lib/typeList'
export default {
  name: 'MessageDetail',
  components: {},
  data() {
    return {
      info: {},
      id: '',
      type: 'receive',
      isLoading: false,
      typeList
    }
  },
  onLoad(options) {
    this.id = options.id
    this.type = options.type
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
      this.info = { ...res.data }
      if (this.info.readStatus === 0 && this.type === 'receive') {
        this.read()
      }
    },
    //已读
    async read() {
      await Api.read([this.id])
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/pages/quality/detail.less');
</style>
