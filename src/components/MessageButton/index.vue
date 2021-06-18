<template>
  <a v-if="!read" class="weui-btn weui-btn_primary" @click="submit">已读</a>
</template>

<script>
import { judgeReadByMessageId, readByWx } from '@/api'

export default {
  name: 'MessageButton',
  data() {
    // 这里存放数据
    return {
      read: true,
      messageId: this.$route.query.messageId
    }
  },
  // 生命周期 - 实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到属性，属性内容为空数组
  created() {
    if (this.messageId) {
      judgeReadByMessageId(this.messageId).then(({ data }) => {
        this.read = data === 1
      })
    }
  },
  methods: {
    submit() {
      readByWx(this.messageId).then(() => {
        this.$utils.showToast('成功')
        this.read = true
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
