import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalSnackbar: {
      message: "",
      icon: null,
    }
  },
  mutations: {
    showSnackbar(state, snackbar) {
      state.globalSnackbar.message = snackbar.message
      state.globalSnackbar.icon = snackbar.icon
    }
  },
  actions: {

  },
  getters: {

  }
})