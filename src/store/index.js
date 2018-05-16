import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    scid: null,
    slugid: null,
    subscribe: '', // 关注
    routerchange: false
  },
  mutations : {
  },
  actions: {}
})

export default store
