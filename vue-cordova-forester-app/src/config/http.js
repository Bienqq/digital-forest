import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import store from "@/store"

export default function configureHttp(Vue) {
	// axios instance configuration
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_BASE_URL
	})
	
	// function with automatic refresh token when 401 Unauthorized error occurs
	const refreshAuthLogic = failedRequest => instance.post(process.env.VUE_APP_API_REFRESH_TOKEN_URL, {
			refreshToken: localStorage.getItem("refreshToken")
		})
		.then(tokenRefreshResponse => {
			const newToken = tokenRefreshResponse.data.token
			store.commit("updateTokenInLocalStorage", newToken)
			failedRequest.response.config.headers["Authorization"] = "Bearer " + newToken
			return Promise.resolve()
		}).catch(() => {
			return Promise.resolve()
		})

	createAuthRefreshInterceptor(instance, refreshAuthLogic)

	Vue.prototype.$http = instance
}