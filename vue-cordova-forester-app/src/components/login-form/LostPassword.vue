<template>
	<v-form ref="form" v-model="valid" lazy-validation class="animated fadeIn zoomIn fast">

		<v-flex xs10 offset-xs1>
			<v-text-field class="mt-2" color="green" :rules="loginRules" v-model="login" prepend-inner-icon="person" label="Login" required></v-text-field>
		</v-flex>

		<v-flex xs10 offset-xs1>
			<v-text-field color="green" :rules="emailRules" prepend-inner-icon="email" v-model="email" label="E-mail" required>
			</v-text-field>
		</v-flex>

		<v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
			<v-btn block color="success" :disabled="!valid" @click="remindPassword()">Przypomnij hasło</v-btn>
		</v-flex>

	</v-form>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		data() {
			return {
				login: "",
				email: "",
				valid: true,
				loginRules: [
					v => !!v || "Login nie może być pusty"
				],
				emailRules: [
					v => v && !!v || "Email nie może być pusty",
					v =>
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					.test(v) || "Błędnie wpisany e-mail",
				],
			}
		},
		methods: {
			remindPassword() {
				if (this.$refs.form.validate()) {
					this.$refs.form.reset()
					this.showSnackbar({ message: "Hasło zostało wysłane na podany adres email", icon: "check" })
				}
			},
			...mapMutations([
				"showSnackbar",
			])
		},
	}
</script>

<style lang="scss" scoped>

</style>