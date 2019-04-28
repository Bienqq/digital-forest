<template>
	<v-snackbar v-model="show" :timeout="2800" top>
		<v-img :src="iconComputed" max-width="40px" contain height="40px" width="40px"></v-img>
		<span class="subheading mr-4">{{ message }}</span>
	</v-snackbar>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				message: "",
				icon: null
			}
		},
		computed: {
			iconComputed() {
				if (this.icon != null) {
					return require(`@/assets/img/${this.icon}.png`)
				}
			}
		},
		created() {
			this.$store.watch(
				state => state.globalSnackbar.message,() => {
					const msg = this.$store.state.globalSnackbar.message
					if (msg !== "") {
						this.show = true
						this.message = this.$store.state.globalSnackbar.message
						this.icon = this.$store.state.globalSnackbar.icon
						this.$store.commit("showSnackbar", { message: "", icon: null })
					}
				}
			)
		}
	}
</script>

<style <style lang="scss" scoped>
</style>