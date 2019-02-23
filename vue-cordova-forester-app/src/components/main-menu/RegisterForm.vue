<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container fluid class="pa-2 overflow-hidden">
      <v-layout align-center column>
        <v-card width="100%" class="wrapper">

          <!-- white toolbar -->
          <v-toolbar dark color="#004d34">
            <v-toolbar-title>Rejestracja {{accountTypeComputed}}</v-toolbar-title>

            <v-spacer />

            <v-btn icon dark @click="$emit('closeForm')">
              <v-icon>close</v-icon>
            </v-btn>

          </v-toolbar>

          <v-flex xs12>
            <v-select color="green" box :items="rolesList" :rules="selectRules" label="Wybierz typ konta" v-model="role"
              required></v-select>
          </v-flex>

          <transition name="dropdown-animated">
            <div v-if="role === 'Leśniczy'">

              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="person_outline" v-model="firstName" :rules="nameRules" :counter="15"
                  label="Imię" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="person_outline" v-model="lastName" :rules="surnameRules" :counter="30"
                  label="Nazwisko" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="fingerprint" v-model="personalId" :rules="personalIdRules" :counter="11"
                  label="Pesel" required></v-text-field>
              </v-flex>
              <v-divider class="top-spacer ml-3 mr-3" />

            </div>
          </transition>

          <div class="animated fadeIn zoomIn fast">

            <v-flex xs10 offset-xs1>
              <v-text-field color="green" v-model="login" prepend-inner-icon="person" :rules="loginRules" :counter="20"
                label="Login" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field color="green" prepend-inner-icon="email" v-model="email" :rules="emailRules" label="E-mail"
                required :counter="30"></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="password" color="green" prepend-inner-icon="lock" :rules="passwordRules" :counter="30"
                label="Hasło" type="password" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="repeatPassword" color="green" prepend-inner-icon="lock" :rules="repeatPasswordRules"
                :counter="30" label="Powtórz hasło" type="password" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-checkbox color="green" :rules="checkboxRules1" required>
                <div slot="label">Zgadzam się na przetwarzanie danych dla celów rejestracyjnych</div>
              </v-checkbox>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-checkbox color="green" :rules="checkboxRules2" required>
                <div slot="label">Akceptuję regulamin</div>
              </v-checkbox>
            </v-flex>

            <v-flex justify-center xs8 offset-xs2>
              <v-btn block color="black" flat :loading="loading" :disabled="!valid" @click.stop="handleRegisterButton()">Zarejestruj</v-btn>
            </v-flex>

          </div>

          <v-snackbar class="ml-2 mr-2 custom-snackbar" v-model="snackbar.show" :timeout="2500" top>
            <v-img :src="snackbar.icon" contain height="40px" width="40px"></v-img>
            <span class="ml-5 title">{{ snackbar.text }}</span>
          </v-snackbar>

        </v-card>

      </v-layout>
    </v-container>

  </v-form>
</template>

<script>
  const registerUrl = process.env.VUE_APP_API_SIGN_UP_URL
  import axios from "axios"

  export default {
    data() {
      return {
        loading: false,
        valid: true,
        snackbar:{
          show: false,
          text: "",
          icon: null
        },
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        personalId: "",
        repeatPassword: "",
        role: "Użytkownik",
        email: "",
        nameRules: [
          v => !!v || "Pole wymagane",
          v => (v && v.length <= 15) || "Imię nie może zawierać więcej niż 15 znaków"
        ],
        surnameRules: [
          v => !!v || "Pole wymagane",
          v => (v && v.length <= 30) || "Nazwisko nie może zawierać więcej niż 30 znaków"
        ],
        loginRules: [
          v => !!v || "Pole wymagane",
          v => (v && v.length <= 20) || "Login nie może zawierać więcej niż 20 znaków"
        ],
        personalIdRules: [
          v => !!v || "Pole wymagane",
          v => /^[0-9]{11}$/.test(v) || "Proszę wpisać poprawny pesel"
        ],
        passwordRules: [
          v => !!v || "Pole wymagane",
          v => (v && v.length <= 30) || "Hasło nie może zawierać więcej niż 30 znaków",
          v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
          "Hasło musi zawierać min. 8 znaków, jedną dużą literę i cyfrę"
        ],
        repeatPasswordRules: [
          v => v === this.password || "Hasło powinno być takie samo jak poprzednie"
        ],
        emailRules: [
          v => !!v || "Pole wymagane",
          v => /.+@.+/.test(v) || "Błędnie wpisany E-mail",
          v => (v && v.length <= 30) || "E-mail nie może zawierać więcej niż 30 znaków"
        ],
        checkboxRules1: [
          v => !!v || "Musisz zaakceptować aby kontynuować"
        ],
        checkboxRules2: [
          v => !!v || "Musisz zaakceptować regulamin aby kontynuować"
        ],
        selectRules: [
          v => !!v || "Musisz wybrać typ konta"
        ],
        rolesList: ["Użytkownik", "Leśniczy"],
      };
    },
    computed: {
      accountTypeComputed: function () {
        return this.role == "Użytkownik" ? "użytkownika" : "leśniczego"
      }
    },
    methods: {
      handleRegisterButton() {
        // validate form
        if (this.$refs.form.validate()) {
          const request = {
            login: this.login,
            password: this.password,
            email: this.email,
            role: this.role === "Użytkownik" ? "USER" : "FORESTER",
            firstName: this.firstName === "" ? undefined : this.firstName,
            lastName: this.lastName === "" ? undefined : this.lastName,
            personalId: this.personalId === "" ? undefined : parseInt(this.personalId)
          }

          this.loading = true
          axios.post(registerUrl, request)
            .then(response => {
              this.$refs.form.reset()
              this.snackbarSuccesfull()
            })
            .catch(err => {
              this.snackbarError(err.response.data.message)
            })
            .finally(() => {
              this.loading = false
            })
        }
      },
      snackbarSuccesfull() {
        this.snackbar.icon = require('@/assets/img/check.png')
        this.snackbar.text = "Zarejestrowano pomyślnie"
        this.snackbar.show = true
      },
      snackbarError(errorMessage) {
        this.snackbar.icon = require('@/assets/img/error.png')
        this.snackbar.text = errorMessage
        this.snackbar.show = true
      }
    },
  };
</script>

<style scoped lang="scss">
  .dropdown-animated-enter-active {
    animation: slideInDown .6s;
  }

  .dropdown-animated-leave-active {
    animation: slideInDown .6s reverse;
  }
</style>