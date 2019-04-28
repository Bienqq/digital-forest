<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container fluid class="pa-2 overflow-hidden">
			<v-layout align-center column>
				<v-card width="100%" class="wrapper">
					<v-toolbar dark card dense color="#004d34">
						<v-toolbar-title>Rejestracja {{ accountTypeComputed }}</v-toolbar-title>
						<v-spacer />
						<v-btn icon dark @click="$emit('closeForm')">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>

					<v-flex xs12>
						<v-select color="green" box :items="rolesList" :rules="selectRules" label="Wybierz typ konta" v-model="role" required></v-select>
					</v-flex>

					<transition name="dropdown-animated">
						<div v-if="role === 'Leśniczy'">
							<v-flex xs10 offset-xs1>
								<v-text-field prepend-inner-icon="fingerprint" v-model="personalId" :rules="personalIdRules" :counter="11" label="Pesel" required></v-text-field>
							</v-flex>
							<v-divider class="top-spacer ml-3 mr-3" />
						</div>
					</transition>

					<div class="animated fadeIn zoomIn fast">
						<v-flex xs10 offset-xs1>
							<v-text-field color="green" v-model="login" prepend-inner-icon="person" :rules="loginRules" :counter="20" label="Login" required></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-text-field prepend-inner-icon="person_outline" v-model="firstName" :rules="nameRules" :counter="15" label="Imię" required></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-text-field prepend-inner-icon="person_outline" v-model="lastName" :rules="surnameRules" :counter="30" label="Nazwisko" required></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-text-field color="green" prepend-inner-icon="email" v-model="email" :rules="emailRules" label="E-mail" required :counter="30"></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-text-field v-model="password" color="green" prepend-inner-icon="lock" :rules="passwordRules" :counter="30" label="Hasło" type="password" required></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-text-field v-model="repeatPassword" color="green" prepend-inner-icon="lock" :rules="repeatPasswordRules" :counter="30" label="Powtórz hasło" type="password" required></v-text-field>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-checkbox color="green" :rules="checkboxRules1" required>
								<div slot="label">
									Zgadzam się na przetwarzanie danych dla celów rejestracyjnych
									<br />
									<span @click.stop="dialogComponent = 'terms-of-use'" class="blue--text text--darken-3 caption">Warunki korzystania</span>
								</div>
							</v-checkbox>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-checkbox color="green" :rules="checkboxRules2" required>
								<div slot="label">
									Akceptuję regulamin
									<br />
									<span @click.stop="dialogComponent = 'statute'" class="blue--text text--darken-3 caption">Regulamin</span>
								</div>
							</v-checkbox>
						</v-flex>

						<v-flex justify-center xs8 offset-xs2>
							<v-btn block color="black" flat :loading="loading" :disabled="!valid" @click.stop="handleRegisterButton()">Zarejestruj</v-btn>
						</v-flex>
					</div>
				</v-card>

				<component :is="dialogComponent" @closeDialog="dialogComponent = ''"></component>
			</v-layout>
		</v-container>
	</v-form>
</template>

<script>
	import statute from "./Statute"
	import termsOfUse from "./TermsOfUse"
	import { formatName } from "@/utils/formatter"
	import { mapMutations } from "vuex"

	const signUpUrl = process.env.VUE_APP_API_SIGN_UP_URL

	export default {
		components: {
			statute: statute,
			"terms-of-use": termsOfUse
		},
		data() {
			return {
				loading: false,
				valid: true,
				dialogComponent: "",
				showStatute: false,
				showTermsOfUse: false,
				firstName: "",
				lastName: "",
				login: "",
				password: "",
				personalId: "",
				repeatPassword: "",
				role: "Użytkownik",
				facebookId: undefined,
				email: "",
				nameRules: [
					v => !!v || "Pole wymagane",
					v => (v && v.length <= 15) || "Imię nie może zawierać więcej niż 15 znaków",
					v => /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(v) || "Imię zawiera niedozwolone znaki"
				],
				surnameRules: [
					v => !!v || "Pole wymagane",
					v => (v && v.length <= 30) || "Nazwisko nie może zawierać więcej niż 30 znaków",
					v => /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(v) || "Nazwisko zawiera niedozwolone znaki"
				],
				loginRules: [
					v => !!v || "Pole wymagane",
					v => v.length >= 8 || "Login musi zawierać min. 8 znaków",
					v => (v && v.length <= 20) || "Login nie może zawierać więcej niż 20 znaków",
					v => /^\w+( \w+)*$/.test(v) || "Login zawiera niedozwolone znaki"
				],
				personalIdRules: [
					v => !!v || "Pole wymagane",
					v => /^[0-9]{11}$/.test(v) || "Proszę wpisać poprawny pesel"
				],
				passwordRules: [
					v => !!v || "Pole wymagane",
					v => (v && v.length <= 30) || "Hasło nie może zawierać więcej niż 30 znaków",
					v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || "Hasło musi zawierać min. 8 znaków, jedną dużą literę i cyfrę"
				],
				repeatPasswordRules: [
					v => v === this.password || "Hasło powinno być takie samo jak poprzednie"
				],
				emailRules: [
					v => !!v || "Pole wymagane",
					v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "Błędnie wpisany e-mail",
					v => (v && v.length <= 30) || "E-mail nie może zawierać więcej niż 30 znaków"
				],
				checkboxRules1: [
					v => !!v || "Musisz zaakceptować warunki korzystania aby kontynuować"
				],
				checkboxRules2: [
					v => !!v || "Musisz zaakceptować regulamin aby kontynuować"
				],
				selectRules: [v => !!v || "Musisz wybrać typ konta"],
				rolesList: ["Użytkownik", "Leśniczy"]
			}
		},
		computed: {
			accountTypeComputed() {
				return this.role == "Użytkownik" ? "użytkownika" : "leśniczego"
			}
		},
		methods: {
			handleRegisterButton() {
				// validate form
				if (this.$refs.form.validate()) {
					//building request
					const request = {
						login: this.login.trim(),
						password: this.password.trim(),
						email: this.email.trim(),
						role: this.role === "Użytkownik" ? "USER" : "FORESTER",
						firstName: formatName(this.firstName.trim()),
						lastName: formatName(this.lastName.trim()),
						facebookId: typeof this.facebookId === undefined ? undefined : this.facebookId
					}

					// if role is FORESTER add extra part of request
					if (this.role === "Leśniczy") {
						const forester = { personalId: parseInt(this.personalId.trim()) }
						Object.assign(request, forester)
					}
					//perform request
					this.loading = true
					this.$http
						.post(signUpUrl, request)
						.then(response => {
							// reset form and set default role as USER
							this.$refs.form.reset()
							this.role = "Użytkownik"
							this.showSnackbar({ message: "Zarejestrowano pomyślnie", icon: "check" })
						})
						.catch(err => this.showSnackbar({ message: err.response.data.message, icon: "error" }))
						.finally(() => (this.loading = false))
				}
			},
			fillFormWithUserFacebookData(userFacebookData) {
				this.email = userFacebookData.email
				this.firstName = userFacebookData.firstName
				this.lastName = userFacebookData.lastName
				this.facebookId = userFacebookData.facebookId
			},
			...mapMutations(["showSnackbar", "clearUserContext"])
		},
		mounted() {
			const userFacebookData = this.$store.state.userContext
			if (typeof userFacebookData.facebookId !== undefined) {
				this.fillFormWithUserFacebookData(userFacebookData)
				//clear user data in Vuex store
				this.clearUserContext()
			}
		}
	}
</script>

<style scoped lang="scss">
	.dropdown-animated-enter-active {
		animation: slideInDown 0.6s;
	}

	.dropdown-animated-leave-active {
		animation: slideInDown 0.6s reverse;
	}
</style>