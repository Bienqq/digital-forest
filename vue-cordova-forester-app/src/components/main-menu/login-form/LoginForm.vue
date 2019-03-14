<template>
  <v-container class="pa-0 overflow-x-hidden">

    <v-layout align-center column class="animated fadeIn zoomIn fast">

      <v-card width="90vw">

        <v-toolbar dark card dense color="#004d34">
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="$emit('closeForm')">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <section class="pt-1">
          <v-form ref="form" v-if="loginToogle" v-model="valid" lazy-validation class="animated fadeIn zoomIn fast">

            <v-flex xs10 offset-xs1>
              <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" :rules="loginRules"
                required autocomplete></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="password" color="green" prepend-inner-icon="lock" label="Hasło" type="password"
                :rules="passwordRules" required autocomplete></v-text-field>
            </v-flex>

            <v-flex justify-center xs8 offset-xs2 class="mt-1 mb-3">
              <v-btn block color="success" :loading="loading" :disabled="!valid" @click.stop="hadnleSignInButton()">Zaloguj</v-btn>
            </v-flex>

            <v-divider class="ml-5 mr-5 mb-3" />

            <v-flex justify-center xs8 offset-xs2 class="top-spacer mt-0">

              <v-btn class="white--text caption" block small color="rgb(59,89,152)" :loading="facebookLoading" @click.stop="handleFacebookButton()">
                <font-awesome-icon :icon="['fab', 'facebook-f']" class="mr-2" size="lg" />
                Zaloguj się Facebookiem
              </v-btn>

            </v-flex>

            <v-flex justify-center xs8 offset-xs2 class="top-spacer mt-3">
              <v-btn block small color="black" flat @click="loginToogle = false"> Zapomniałeś hasła? Kliknij tutaj!</v-btn>
            </v-flex>

          </v-form>

          <lost-password-form class="animated fadeIn zoomIn fast" v-else />

        </section>

      </v-card>

    </v-layout>
  </v-container>
</template>

<script>
  import LostPassword from "./LostPassword"
  import {
    mapMutations
  } from "vuex"
  import router from "@/router"
  import {
    library
  } from '@fortawesome/fontawesome-svg-core'
  import {
    faFacebookF
  } from '@fortawesome/free-brands-svg-icons'
  import {
    FontAwesomeIcon
  } from '@fortawesome/vue-fontawesome'

  library.add(faFacebookF)

  const signInUrl = process.env.VUE_APP_API_SIGN_IN_URL
  const signInWithFacebookUrl = process.env.VUE_APP_API_SIGN_IN_WITH_FACEBOOK_URL

  export default {
    components: {
      "lost-password-form": LostPassword,
      "font-awesome-icon": FontAwesomeIcon
    },
    data() {
      return {
        login: "",
        password: "",
        loginToogle: true,
        loading: false,
        facebookLoading: false,
        valid: true,
        loginRules: [
          v => (v && !!v) || "Login nie może być pusty"
        ],
        passwordRules: [
          v => (v && !!v) || "Hasło nie może być puste"
        ]
      };
    },
    computed: {
      formTitle: function () {
        return this.loginToogle == true ? "Logowanie" : "Odzyskiwanie hasła";
      }
    },
    methods: {
      hadnleSignInButton() {
        if (this.$refs.form.validate()) {
          //building request
          this.loading = true
          const request = {
            login: this.login.trim(),
            password: this.password
          }
          //perform action
          this.signIn(request)
        }
      },
      signIn(request) {
        this.$http.post(signInUrl, request)
          .then(response => {
            this.handleLogin(response)
          }).catch(err => {
            this.showSnackbar({
              message: err.response.data.message,
              icon: "error"
            })
          })
          .finally(() => this.loading = false)
      },
      handleFacebookButton() {
        this.facebookLoading = true
        facebookConnectPlugin.login(["public_profile", "email"],
          (response) => {
            facebookConnectPlugin.api("/me?fields=email,name", ["public_profile", "email"], (userData) => {
              this.loginWithFacebook(userData)
            }, (error) => {
              this.showSnackbar({
                message: "Adres e-mail jest wymagany",
                icon: "error"
              })
              this.facebookLoading = false
            })
          }, (error) => {
            this.showSnackbar({
              message: "Błąd połączenia z Facebookiem",
              icon: "error"
            })
            this.facebookLoading = false
          })
      },
      loginWithFacebook(userData) {
        this.$http.post(signInWithFacebookUrl, {
            facebookId: userData.id
          })
          .then(response => {
            this.handleLogin(response)
          })
          .catch(() => {
            this.$emit("facebookRegistration", userData)
          })
          .finally(() => this.facebookLoading = false)
      },
      handleLogin(response) {
        const {
          refreshToken,
          token
        } = response.data
        this.addTokensToLocalStorage({
          token,
          refreshToken
        })
        this.showSnackbar({
          message: "Zalogowano pomyślnie",
          icon: "check"
        })
        router.push("/user-dashboard")
      },
      ...mapMutations([
        "showSnackbar",
        "addTokensToLocalStorage"
      ])
    }
  };
</script>

<style lang="scss" scoped>
  .form-animated-enter-active {
    animation: zoomIn .4s;
  }

  .form-animated-leave-active {
    animation: zoomOut .4s;
  }
</style>