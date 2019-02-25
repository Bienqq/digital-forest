import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
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
    loggingIn: false
  },
  mutations: {
    showSnackbar(state, snackbar) {
      state.globalSnackbar.message = snackbar.message
      state.globalSnackbar.icon = snackbar.icon
    },
    updateTokens(state, tokens) {
      state.tokens.token = tokens.token
      state.tokens.refreshToken = tokens.refreshToken
    },
    logout(state) {
      state.tokens.token = null
      state.tokens.refreshToken = null
    },
    loginStart(state) {
      state.loggingIn = true
    },
    loginStop(state) {
      state.loggingIn = false
    }
  },
  actions: {
    doLogin({
      commit
    }, request) {
      commit("loginStart")
      const signInUrl = process.env.VUE_APP_API_SIGN_IN_URL

      axios.post(signInUrl, request)
        .then(response => {
          const {
            refreshToken,
            token
          } = response.data

          localStorage.setItem("token", token)
          localStorage.setItem("refreshToken", refreshToken)

          commit("updateTokens", {
            token,
            refreshToken
          })
          commit("showSnackbar", {
            message: "Zarejestrowano pomyślnie",
            icon: require('@/assets/img/check.png')
          })
          router.push("/user-dashboard")

        }).catch(err => {
          commit("updateTokens", {
            token: null,
            refreshToken: null
          })
          commit("showSnackbar", {
            message: err.response.data.message,
            icon: require('@/assets/img/error.png')
          })

        })
        .finally(() => commit("loginStop"))
    },
    logout({
      commit
    }) {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      commit("logout")
      router.push("/")
    }
  },
  getters: {

  }
})