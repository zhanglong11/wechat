<template>
  <div class="main">
    <div class="main-body">
      <div class="project-list">
        <uni-card v-for="project in list" :key="project.id" class="item" @click="handleProjectSelected(project)">
          <header slot="title" class="header">
            <div class="name">
              <span>{{ project.name }}</span>
              <span v-if="project.projectUserCategory === 1" class="star">★</span>
            </div>
          </header>
          <p class="description">
            <span class="label">
              <img class="icon" src="./images/user.png" alt="" /> 负责人：{{ project.principalName }}
            </span>
            <span>{{ $getLabelFromArg('projectStatus', project.projectStatus) }} ></span>
          </p>
          <p class="description">
            <span class="label"
              ><img class="icon" src="./images/company.png" alt="" />所属企业:{{ project.companyName }}</span
            >
            <span></span>
          </p>
        </uni-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/api'

export default {
  name: 'SelectProject',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      list: []
    }
  },
  // 生命周期 - 实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到属性，属性内容为空数组
  created() {
    const a = document.getElementsByClassName('uni-page-head-hd')[0]
    a.style.display = 'none'
    this.refresh()
  },
  // 生命周期 - 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，属性可以访问
  mounted() {},
  // 方法集合
  methods: {
    // 刷新主要数据,一般表格页面为刷新列表，详情页面为刷新详情
    refresh() {
      getProjectList().then(res => {
        this.list = res.data
      })
    },
    handleProjectSelected(project) {
      this.$store.commit('changeProject', project)
      this.$utils.toUrl('/pages/message/index')
    }
  }
}
</script>

<style scoped lang="less">
.icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.description {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label {
  display: flex;
  align-items: center;
}
.header {
  width: 100%;
}
.name {
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #555;
  .star {
    font-size: 18px;
    margin-left: 10px;
    color: #49b4b5;
  }
}
</style>
