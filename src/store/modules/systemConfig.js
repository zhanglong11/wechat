import $utils from '@/utils/utils'
import { system } from '@/utils/http'
import treeForEach from '@/utils/treeForEach'

export default {
  namespaced: true,
  state: {
    argTree: JSON.parse(wx.getStorageSync('argTree') || '[]')
  },
  mutations: {
    changeList(state, tree) {
      state.argTree = tree
    }
  },
  actions: {
    async getArgTree({ commit }) {
      const tree = await system.post('cim6d/arg/tree', { module: 'construction' }).then(res => res.data)
      treeForEach(tree, e => {
        e.label = e.argText
        e.value = e.argCode
      })
      wx.setStorageSync('argTree', JSON.stringify(tree))
      commit('changeList', tree)
    }
  }
}
