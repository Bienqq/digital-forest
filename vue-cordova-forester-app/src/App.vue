<template>
	<v-app id="app">
		<snackbar />
		<transition :name="transitionName" mode="out-in">
			<router-view class="fast" />
		</transition>
	</v-app>
</template>

<script>
	import Snackbar from "@/components/common/Snackbar"

	export default {
		components: {
			"snackbar": Snackbar
		},
		name: "App",
		data() {
			return {
				transitionName: "slideDown"
			};
		},
		watch: {
			$route(to) {
				if (to.path === "/") {
					this.transitionName = "slideDown";
				} else {
					this.transitionName = "slideUp";
				}
			},
		}

	};
</script>

<style lang="scss">
	$lightGray : #f9f9f9;
	$lightGreen :#4caf50;
	$darkGreen :#004d34;

	* {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		margin: 0;
		padding: 0;
		font-family: "Roboto", sans-serif;
	}

	h3 {
		font-size: 5vw;
		font-family: Roboto, sans-serif !important;
		font-weight: 400;
	}

	#app {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		z-index: -1;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url("./assets/img/bg_menu_portrait.png");
		overflow-x: hidden;
		overflow-y: auto;
	}

	.fast {
		animation-duration: 0.7s !important;
	}

	// It is required to hide underlined links for Cordova app
	a {
		text-decoration: none !important;
	}

	//main colors background and font schemes for the application
	.light-gray {
		background: $lightGray;
	}

	.light-green {
		background: $lightGreen;
	}

	.dark-green {
		background: $darkGreen;
	}

	//auxiliaries for eg. spacers, dividers
	.top-spacer {
		margin-top: 5vw;
	}

	.bottom-spacer {
		margin-bottom: 5vw;
	}
</style>