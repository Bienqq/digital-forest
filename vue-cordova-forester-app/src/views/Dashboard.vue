<template>
	<v-container align-content-center>
		<!-- purpose of this div is to provide place for swipe gesture to user -->
		<div class="swipe-border" v-touch="{ right: () => handleSwipe('right') }"></div>

		<sidebar-navigation ref="sidebarNavigation"></sidebar-navigation>

		<v-layout align-center justify-center column fill-height>
			<v-progress-circular v-if="loading" :size="60" :width="5" color="white" indeterminate />

			<articles-view v-else v-bind="addRefAfterContentLoaded" :content-list="content.data" :content-amount="content.count" />

			<v-dialog v-model="logoutDialog" max-width="330px">
				<v-card>
					<v-card-title class="headline">Czy na pewno chcesz się wylogować?</v-card-title>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" flat="flat" @click.stop="logout()">
							Wyloguj się
						</v-btn>

						<v-btn color="green darken-1" flat="flat" @click.stop="logoutDialog = false">
							Zostań
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
		<router-view />
	</v-container>
</template>

<script>
	import { mapMutations, mapGetters } from "vuex"
	import SidebarNavigation from "@/components/user-dashboard/SidebarNavigation"
	import router from "@/router"
	import ArticlesView from "@/components/articles/ArticlesView"

	const aboutMeUrl = process.env.VUE_APP_API_ABOUT_ME_URL
	const allContentUrl = process.env.VUE_APP_API_ALL_CONTENT_URL

	export default {
		components: {
			"sidebar-navigation": SidebarNavigation,
			"articles-view": ArticlesView
		},
		data() {
			return {
				logoutDialog: false,
				loading: true,
				content: {
					count: null,
					data: null
				},
				swipeDirection: ""
			}
		},
		methods: {
			//this method call method from its child compoment
			handleSwipe(direction) {
				this.$refs.sidebarNavigation.handleSwipe(direction)
			},
			// works only android backbutton - logging out
			handleBackButton() {
				if (this.$refs.articlesViewRef.showModal === false) {
					this.logoutDialog = true
				}
			},
			logout() {
				this.removeTokensFromLocalStorage()
				this.clearUserContext()
				this.showSnackbar({ message: "Wylogowano pomyślnie", icon: "check" })
				router.push("/")
			},
			// getting all informations about user when enters dashboard
			getUserInfo() {
				this.$http
					.get(aboutMeUrl)
					.then(response => {
						const name = `${response.data.firstName} ${response.data.lastName}`
						this.fillUserContext({
							name: name,
							email: response.data.email,
							role: response.data.role
						})
					})
					.catch(err => this.showSnackbar({ message: err, icon: "error" }))
			},
			getContent() {
				this.$http
					.get(allContentUrl)
					.then(response => {
						this.content.count = response.data.count
						this.content.data = response.data.content
					})
					.catch(err => {
						this.showSnackbar({ message: err, icon: "error" })
					})
					.finally(() => (this.loading = false))
			},
			...mapMutations([
				"showSnackbar",
				"removeTokensFromLocalStorage",
				"updateTokenInLocalStorage",
				"fillUserContext",
				"clearUserContext"
			])
		},
		computed: {
			...mapGetters([
				"getTokenFromLocalStorage",
				"getRefreshTokenFromLocalStorage"
			]),
			// add reference to child component AriclesView after content loading
			addRefAfterContentLoaded() {
				if (this.loading === false) {
					return {
						ref: "articlesViewRef"
					}
				}
			}
		},
		// before route EnterTheForest component add backing to previous view by clicking backbutton
		beforeRouteEnter(to, from, next) {
			next(userDashboard => document.addEventListener("backbutton", userDashboard.handleBackButton))
		},
		// when leaving EnterTheForest remove event handler
		beforeRouteLeave(to, from, next) {
			document.removeEventListener("backbutton", this.handleBackButton)
			next()
		},
		// geting user info and get connent parallel
		async created() {
			this.getUserInfo()
			this.getContent()
		}
	}
</script>

<style scoped lang="scss">
	.swipe-border {
		position: fixed;
		left: 0;
		margin-top: 30px;
		z-index: 100;
		opacity: 1;
		height: 100%;
		width: 5vw;
		padding: 0;
	}
</style>