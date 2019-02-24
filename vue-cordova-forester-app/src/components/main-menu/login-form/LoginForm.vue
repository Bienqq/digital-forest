<template>
  <v-container class="pa-0 overflow-x-hidden">

    <v-layout align-center column class="animated fadeIn zoomIn fast">

      <v-card width="90vw">
        <v-toolbar dark color="#004d34">
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="$emit('closeForm')">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <section id="login" v-if="loginToogle" class="pt-1">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="animated fadeIn zoomIn fast">

              <v-flex xs10 offset-xs1>
                <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" :rules="loginRules"
                  required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field v-model="password" color="green" prepend-inner-icon="lock" label="Hasło" type="password"
                  :rules="passwordRules" required></v-text-field>
              </v-flex>

              <v-divider class="mt-2 ml-5 mr-5 mb-3" />

              <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
                <v-btn block color="success" :loading="loading" :disabled="!valid" @click.stop="signInButton()">Zaloguj</v-btn>
              </v-flex>

              <v-flex justify-center xs8 offset-xs2 class="top-spacer">
                <v-btn block small color="black" flat @click="loginToogle = false"> Zapomniałeś hasła? Kliknij tutaj!</v-btn>
              </v-flex>

            </div>
          </v-form>
        </section>

        <section v-else>
          <lost-password-form />
        </section>

      </v-card>

    </v-layout>
  </v-container>
</template>

<script>
  import LostPassword from "./LostPassword"
  import axios from "axios"
  import {
    mapMutations
  } from "vuex"

  const signInUrl = process.env.VUE_APP_API_SIGN_IN_URL

  export default {
    components: {
      "lost-password-form": LostPassword
    },
    data() {
      return {
        login: "",
        password: "",
        loginToogle: true,
        loading: false,
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
      signInButton() {
        if (this.$refs.form.validate()) {
          //building request
          const request = {
            login: this.login.trim(),
            password: this.password
          }

          this.loading = true
          axios.post(signInUrl, request)
            .then(response => {
              this.showSnackbar({
                message: "Zarejestrowano pomyślnie",
                icon: require('@/assets/img/check.png')
              })
              const token = response.data.token
              const refreshToken = response.data.refreshToken
              this.saveTokensToLocalStorage(token, refreshToken)
              this.$router.push("/user-dashboard")
            })
            .catch(err => {
              this.showSnackbar({
                message: err.response.data.message,
                icon: require('@/assets/img/error.png')
              })
            })
            .finally(() => this.loading = false)
        }
      },
      saveTokensToLocalStorage(token, refreshToken){
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
      },
      ...mapMutations({
        showSnackbar: "showSnackbar"
      })
    }
  };
</script>

<style lang="scss" scoped>

</style>