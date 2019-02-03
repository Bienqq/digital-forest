<template>
  <v-container fluid @click.self="hideRegisterForm()">

    <rotate-logo v-if="showLogo" />

    <!-- white box with buttons -->
    <v-layout class="white--text font-weight-medium top-spacer" align-center column>
      <template>
        <v-card width="90%" class="light-gray">

          <v-flex xs10 offset-xs1 class="top-spacer mt-4">
            <v-btn block xs12 color="success" to="/enter-the-forest">Wejdź do lasu</v-btn>
          </v-flex>

          <v-flex xs10 offset-xs1 class="bottom-spacer">
            <v-btn block color="success" @click.stop="showLogin = true"> Zaloguj się</v-btn>
          </v-flex>

<<<<<<< HEAD

          <v-divider></v-divider>
=======
          <v-divider class="ml-5 mr-5"></v-divider>
>>>>>>> e98b9c47531418eeb99fb6678827d4e108eaccd4

          <v-flex justify-center xs8 offset-xs2>
            <v-btn block small color="black" flat @click.stop="showRegister = true">Zarejestruj się !</v-btn>
          </v-flex>

        </v-card>

        <!-- displayed window after clicked button  -->
        <v-dialog fullscreen v-if="showRegister" v-model="showRegister">
          <register-form @closeWindow="showRegister = false" />
        </v-dialog>
        <v-dialog v-if="showLogin" v-model="showLogin">
<<<<<<< HEAD
          <login-form v-on:closeLoginWindow="showLogin = false" />
=======
          <login-form @closeLoginWindow="showLogin = false" />
>>>>>>> e98b9c47531418eeb99fb6678827d4e108eaccd4
        </v-dialog>

      </template>
    </v-layout>
  </v-container>
</template>

<script>
  import RotateLogo from "../common/RotateLogo";
  import RegisterForm from "./RegisterForm";
  import LoginForm from "./login-form/LoginForm.vue"

  export default {
    name: "MainMenu",
    components: {
      "rotate-logo": RotateLogo,
      "register-form": RegisterForm,
      "login-form": LoginForm
    },
    data() {
      return {
        showRegister: false,
        showLogin: false,
        showLogo: true
      };
    },
    methods: {

      hideRegisterForm() {
        if (this.showRegister) {
          this.showRegister = false
          this.showLogo = true
        }
      },
      hideLoginForm() {
        if (this.showLogin) {
          this.showLogin = false
          this.showLogo = true
        }
      }
    },
    created: function () {
      window.addEventListener("keyboardWillShow", () => {
        document.activeElement.scrollIntoViewIfNeeded()
      });
    }
  };
</script>

<style scoped lang="scss">

</style>