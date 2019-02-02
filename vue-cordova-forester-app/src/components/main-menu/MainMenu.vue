<template>
  <v-container fluid v-on:click.self="hideRegisterForm()">

    <rotate-logo v-if="showLogo" />

    <!-- white box with buttons -->
    <v-layout class="white--text font-weight-medium top-spacer" align-center column>
      <template>
        <v-card width="90%" class="light-gray">

          <v-flex xs10 offset-xs1 class="top-spacer">
            <v-btn block xs12 color="success" to="/enter-the-forest">Wejdź do lasu</v-btn>
          </v-flex>

          <v-flex xs10 offset-xs1 class="bottom-spacer">
            <v-btn block color="success" v-on:click.stop="showLogin = true"> Zaloguj się</v-btn>
          </v-flex>

          <v-divider></v-divider>

          <v-flex justify-center xs8 offset-xs2>
            <v-btn block small color="black" flat v-on:click.stop="showRegister = true">Zarejestruj się !</v-btn>
          </v-flex>

        </v-card>

        <!-- displayed windows after clicked button  -->
        <v-dialog fullscreen :is="register-form">
          <register-form v-on:closeWindow="showRegister = false" />
        </v-dialog>
        <v-dialog v-model="showLogin">
          <login-form v-on:closeLoginWindow="showLogin = false" />
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
        registerComponent: "register-form",
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