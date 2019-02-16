<template>
  <v-container fluid>

    <rotate-logo v-if="formComponent !== 'register-form'" />

    <!-- white box with buttons -->
    <v-layout class="white--text font-weight-medium top-spacer" align-center column>

      <v-card v-if="formComponent === ''" width="90%" class="light-gray mt-5">

        <v-flex xs10 offset-xs1 class="top-spacer mt-4">
          <v-btn block xs12 color="success" to="/enter-the-forest">Wejdź do lasu</v-btn>
        </v-flex>

        <v-flex xs10 offset-xs1 class="bottom-spacer">
          <v-btn block color="success" @click.stop="formComponent = 'login-form'">Zaloguj się</v-btn>
        </v-flex>

        <v-divider class="ml-5 mr-5"></v-divider>

        <v-flex justify-center xs8 offset-xs2>
          <v-btn block small color="black" flat @click.stop="formComponent = 'register-form'">Zarejestruj się !</v-btn>
        </v-flex>

      </v-card>

      <transition name="form-animated" mode="out-in">
        <component :is="formComponent" @closeForm="formComponent = ''"></component>
      </transition>

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
        formComponent: ""
      };
    },
    methods: {
      handleBackButton() {
        if (this.formComponent) {
          this.formComponent = ""
        } else {
          backAsHome.trigger()
        }
      }
    },
    // before route to MainMenu add backing to Android Home view by clicking backbutton
    beforeRouteEnter(to, from, next) {
      next(mainMenu => {
        document.addEventListener("backbutton", mainMenu.handleBackButton)
      })
    },
    // when leaving MainMenu remove event handler
    beforeRouteLeave(to, from, next) {
      document.removeEventListener("backbutton", this.handleBackButton)
      next()
    },
    created: function () {
      window.addEventListener("keyboardWillShow", () => {
        document.activeElement.scrollIntoViewIfNeeded()
      });
    },
  };
</script>

<style scoped lang="scss">
  .form-animated-enter-active {
    animation: zoomIn .4s;
  }

  .form-animated-leave-active {
    animation: zoomOut .4s;
  }
</style>