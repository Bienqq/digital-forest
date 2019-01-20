<template>
<v-container grid-list-xs v-on:click.self="hideLoginForm()">
            <rotate-logo/>
                <v-layout class="white--text font-weight-medium" align-center column>
                        <template v-if="!showForm">
                          <v-flex xs1 mt-5>
                              <v-btn class="responsive-btn" color="success" to="/enter-the-forest">Wejdź do lasu</v-btn>
                          </v-flex>
                          <v-flex xs1>
                              <v-btn class="responsive-btn" color="success" v-on:click.stop="showLoginForm()"> Zaloguj się</v-btn>
                          </v-flex>
                          <v-btn class="responsive-btn pa-2 font-weight-normal" color="white" flat>Zarejestruj się !</v-btn>
                          <v-btn class="responsive-btn pa-2 font-weight-normal" color="white" flat> Przypomnij hasło</v-btn> 
                       </template>
                       <template v-else>
                          <component v-bind:is="loginComponent"></component> 
                       </template>
                </v-layout>
    </v-container>
</template>

<script>
import RotateLogo from "../common/RotateLogo";
import LoginForm from "./LoginForm";
export default {
  name: "MainMenu",
  components: {
    "rotate-logo": RotateLogo,
    "login-form": LoginForm
  },
  data() {
    return {
      loginComponent: "login-form",
      showForm: false
    };
  },
  methods: {
    showLoginForm() {
      this.showForm = true;
    },

    hideLoginForm() {
      if (this.showForm) {
        this.showForm = false;
      }
    }
  },
  created: function() {
    window.addEventListener("keyboardWillShow", () => {
      document.activeElement.scrollIntoViewIfNeeded()
    });
  }
};
</script>

<style scoped lang="scss">
.responsive-btn {
  width: 40vw;
  height: 4vh;
  font-size: 3vw;
}
</style>
