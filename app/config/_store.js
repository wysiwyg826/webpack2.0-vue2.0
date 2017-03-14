/**
 * 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: "vuex"
  },
  mutations: {
    changeName (state) {
      state.name = "vuex2"
    }
  }
})

export default store