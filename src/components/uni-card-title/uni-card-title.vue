<template>
  <view class="wrapper">{{ title }}</view>
</template>

<script>
export default {
  // import引入的组件
  components: {},
  props: {
    title: [String, Number]
  },
  data() {
    // 这里存放数据
    return {}
  },
  // 生命周期 - 挂载完成
  created() {},
  // 方法集合
  methods: {
    //刷新
    refresh() {}
  }
}
</script>

<style scoped lang="less">
.wrapper {
  padding-top: 20rpx;
  padding-left: 25rpx;
}
</style>
