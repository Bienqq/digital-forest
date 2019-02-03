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
            <v-btn block color="success" @click.stop="showLogin = true">Zaloguj się</v-btn>
          </v-flex>

          <v-divider class="ml-5 mr-5"></v-divider>

          <v-flex justify-center xs8 offset-xs2>
            <v-btn block small color="black" flat @click.stop="showRegister = true">Zarejestruj się !</v-btn>
          </v-flex>

        </v-card>

        <!-- displayed window after clicked button  -->
        <transition name="form-animated">
          <v-dialog v-model="showRegister" hide-overlay >
            <register-form  @closeWindow="showRegister = false" />
          </v-dialog>
        </transition>

        <transition name="form-animated" >
          <v-dialog  v-model="showLogin" hide-overlay>
            <login-form @closeLoginWindow="showLogin = false"/>
          </v-dialog>
        </transition>

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
  .form-animated-enter-active {
    animation: zoomIn .8s;
  }

  .form-animated-leave-active {
    transition: zoomOut .8s;
  }

  .centered{
    position: absolute;
    top: 30%;
    margin-left: auto;
    margin-right: auto;
  }
</style>