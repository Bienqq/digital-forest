<template>
<v-container fluid v-on:click.self="hideRegisterForm()">
            <rotate-logo v-if="showLogo"/>
                <v-layout class="white--text font-weight-medium top-spacer" align-center column  >
                        <template >
                           <v-card width="90%" class="light-gray">
                          <v-flex xs10 offset-xs1 class="top-spacer">
                              <v-btn block xs12  color="success" to="/enter-the-forest">Wejdź do lasu</v-btn>
                          </v-flex>
                          <v-flex xs10 offset-xs1  class="bottom-spacer">
                              <v-btn block  color="success" > Zaloguj się</v-btn>
                          </v-flex>
                            <v-divider ></v-divider>
                          <v-flex justify-center xs8 offset-xs2 >
                             <v-btn block  small color="black" flat v-on:click.stop="showRegister = true">Zarejestruj się !</v-btn>
                          </v-flex>
                          <!-- <v-flex justify-center xs8 offset-xs2 >
                            <v-btn block small color="black" flat> Przypomnij hasło</v-btn> 
                          </v-flex> -->
                           </v-card>
                          <v-dialog  v-model="showRegister"> <Register-form v-on:closeWindow="showRegister = false"/> </v-dialog>
                       </template>
                </v-layout>
    </v-container>
</template>

<script>
import RotateLogo from "../common/RotateLogo";
import RegisterForm from "./RegisterForm";
export default {
  name: "MainMenu",
  components: {
    "rotate-logo": RotateLogo,
    "Register-form": RegisterForm
  },
  data() {
    return {
      RegisterComponent: "Register-form",
      showRegister: false,
      showLogo : true
    };
  },
  methods: {
    showRegisterForm() {
      this.showRegister = true;
      this.showLogo = false;
    },

    hideRegisterForm() {
      if (this.showRegister) {
        this.showRegister = false;
        this.showLogo = true;
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

</style>
