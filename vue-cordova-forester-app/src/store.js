import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        globalSnackbar: {
            message: "",
            icon: null
        },
        userContext: {
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            facebookId: undefined
        }
    },
    mutations: {
        showSnackbar(state, snackbar) {
            state.globalSnackbar.message = snackbar.message
            state.globalSnackbar.icon = snackbar.icon
        },
        fillUserContext(state, userData) {
            state.userContext.email = userData.email
            const firstName = userData.name.split(" ")[0]
            const lastName = userData.name.split(" ")[1]
            state.userContext.firstName = firstName
            state.userContext.lastName = lastName
            state.userContext.facebookId = userData.id
            state.userContext.role = userData.role
        },
        clearUserContext(store) {
            store.userContext = {
                firstName: "",
                lastName: "",
                email: "",
                facebookId: undefined
            }
        },
        addTokensToLocalStorage(store, tokens) {
            localStorage.setItem("token", tokens.token)
            localStorage.setItem("refreshToken", tokens.refreshToken)
        },
        updateTokenInLocalStorage(store, token) {
            localStorage.setItem("token", token)
        },
        removeTokensFromLocalStorage() {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        }
    },
    actions: {},
    getters: {
        getTokenFromLocalStorage() {
            return localStorage.getItem("token")
        },
        getRefreshTokenFromLocalStorage() {
            return localStorage.getItem("refreshToken")
        }
    }
})