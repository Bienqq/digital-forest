import Vue from "vue"
import Vuex from "vuex"
import router from "./router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalSnackbar: {
      message: "",
      icon: null,
    },
    tokens: {
      token: null,
      refreshToken: null,
    },
    userFacebookData: {
      firstName: "",
      lastName: "",
      email: "",
      facebookId: undefined
    },
  },
  mutations: {
    showSnackbar(state, snackbar) {
      state.globalSnackbar.message = snackbar.message
      state.globalSnackbar.icon = snackbar.icon
    },
    setTokens(state, tokens) {
      state.tokens.token = tokens.token
      state.tokens.refreshToken = tokens.refreshToken
    },
    fillUserFacebookData(state, userData) {
      state.userFacebookData.email = userData.email
      const firstName = userData.name.split(" ")[0]
      const lastName = userData.name.split(" ")[1]
      state.userFacebookData.firstName = firstName
      state.userFacebookData.lastName = lastName
      state.userFacebookData.facebookId = userData.id
    },
    clearUserFacebookData(store) {
      store.userFacebookData = {
        firstName: "",
        lastName: "",
        email: "",
        facebookId: undefined
      }
    }
  },
  actions: {
    updateTokens({
      commit
    }, tokens) {
      localStorage.setItem("token", tokens.token)
      localStorage.setItem("refreshToken", tokens.refreshToken)
      commit("setTokens", tokens)
    },
    logout({
      commit
    }) {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      commit("setTokens", {
        token: null,
        refreshToken: null
      })
      router.push("/")
    }
  },
  getters: {

  }
})