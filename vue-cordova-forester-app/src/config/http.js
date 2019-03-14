import axios from "axios"
import store from "../store"

export default function configureHttp(Vue) {
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_BASE_URL,
		headers: {
			"Authorization": `Bearer ${store.getters.getTokenFromLocalStorage}`
		}
	})

	instance.interceptors.response.use(undefined, (err) => {
		return new Promise((resolve, reject) => {
			if (err.status === 401) {

				console.log(instance)
				instance.post(process.env.VUE_APP_API_REFRESH_TOKEN_URL, {
						refreshToken: store.getters.getRefreshTokenFromLocalStorage
					}).then(response => {
						store.updateTokenInLocalStorage(response.data.token)
					})
					.catch(error => {
						reject(error)
					})
			}
			console.log("Interceptor error")
			console.log(err)
			throw err
		})
	})

	Vue.prototype.$http = instance
}