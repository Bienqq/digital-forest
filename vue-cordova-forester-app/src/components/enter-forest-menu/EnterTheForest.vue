<template>
	<div>
		<h1>Enter the forest view</h1>
		<router-view></router-view>
	</div>

</template>

<script>
	import { mapMutations } from "vuex"
	import router from "@/router"

	export default {
		data() {
			return {

			}
		},
		methods: {
			handleBackButton() {
				this.showSnackbar({ message: "Wyszedłeś z lasu!", icon: "exit" })
				router.push("/")
			},
			...mapMutations([
				"showSnackbar"
			])
		},
		mounted: function() {
			this.showSnackbar({ message: "Wszedłeś do lasu!", icon: "enter" })
		},
		// before route EnterTheForest component add backing to previous view by clicking backbutton
		beforeRouteEnter(to, from, next) {
			next(enterTheForestComponent => document.addEventListener("backbutton", enterTheForestComponent.handleBackButton))
		},
		// when leaving EnterTheForest remove event handler
		beforeRouteLeave(to, from, next) {
			document.removeEventListener("backbutton", this.handleBackButton)
			next()
		}
	}
</script>

<style>

</style>