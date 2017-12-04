import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    scid: null,
    slugid: null,
    subscribe : 0,
    nickname: '',
    avatar: '',
    appName: '',
    systemAuthor: '',
    commentGoDetailDown: false,

    subjectTitle: null,
    subjectImg: null,
    subscribe: '', // 关注
    routerchange: false

  },
  mutations : {
    incremenr (state) {
      state.count++
    }
  }
})

export default store
