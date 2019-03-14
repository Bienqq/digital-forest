import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import store from "../store"

export default function configureHttp(Vue) {
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_BASE_URL,
		headers: {
			"Authorization": `Bearer ${store.getters.getTokenFromLocalStorage}`
		}
	})

	const refreshAuthLogic = failedRequest => instance.post(process.env.VUE_APP_API_REFRESH_TOKEN_URL, {
			refreshToken: store.getters.getRefreshTokenFromLocalStorage
		})
		.then(tokenRefreshResponse => {
			const newToken = tokenRefreshResponse.data.token
			store.commit("updateTokenInLocalStorage", newToken)
			failedRequest.response.config.headers["Authorization"] = "Bearer " + newToken
			return Promise.resolve()
		})

	createAuthRefreshInterceptor(instance, refreshAuthLogic)

	Vue.prototype.$http = instance
}