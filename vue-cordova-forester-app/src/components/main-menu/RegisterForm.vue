<template>
  
    <v-form v-model="valid">
      <v-container fluid class="pa-2 overflow-hidden">
        <v-layout align-center column >
          <v-card width="100%" >

            <!-- white toolbar -->
            <v-toolbar dark color="#004d34">
              <v-toolbar-title>Rejestracja {{accountTypeComputed}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="closeWindow()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-flex xs12>
              <v-select color="green" box :items="profilesList" label="Wybierz typ konta" v-model="profile"></v-select>
            </v-flex>

            <transition name="dropdown-animated">
              <div v-if="profile === 'Leśniczy'">
                <v-flex xs10 offset-xs1>
                  <v-text-field prepend-inner-icon="person_outline" v-model="firstname" :rules="nameRules" :counter="15"
                    label="Imie" required></v-text-field>
                </v-flex>

                <v-flex xs10 offset-xs1>
                  <v-text-field prepend-inner-icon="person_outline" v-model="lastname" :rules="surnameRules" :counter="30"
                    label="Nazwisko" required></v-text-field>
                </v-flex>

                <v-flex xs10 offset-xs1>
                  <v-text-field prepend-inner-icon="fingerprint" v-model="pesel" :rules="peselRules" :counter="11"
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
                  required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field v-model="password" color="green" prepend-inner-icon="lock" :rules="passwordRules"
                  :counter="30" label="Hasło" type="password" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field v-model="repeatPassword" color="green" prepend-inner-icon="lock" :rules="repeatPasswordRules"
                  :counter="30" label="Powtórz hasło" type="password" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-checkbox color="green">
                  <div slot="label">Zgadzam się na przetwarzanie danych dla celów rejestracyjnych</div>
                </v-checkbox>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-checkbox color="green">
                  <div slot="label">Akceptuję regulamin</div>
                </v-checkbox>
              </v-flex>

              <v-flex justify-center xs8 offset-xs2>
                <v-btn block color="black" flat>Dalej</v-btn>
              </v-flex>
            </div>
          </v-card>
        </v-layout>
      </v-container>
    </v-form>
  

</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        firstname: "",
        lastname: "",
        login: "",
        password: "",
        pesel: "",
        repeatPassword: "",
        profile: "użytkownik",
        nameRules: [
          v => !!v || "Pole wymagane",
          v => v.length <= 15 || "Imię nie może zawierać więcej niż 15"
        ],
        surnameRules: [
          v => !!v || "Pole wymagane",
          v => v.length <= 30 || "Nazwisko nie może zawierać więcej niż 30"
        ],
        loginRules: [
          v => !!v || "Pole wymagane",
          v => v.length <= 15 || "Login nie może zawierać więcej niż 20"
        ],
        peselRules: [
          v => !!v || "Pole wymagane",
          v => /^[0-9]{11}$/.test(v) || "Proszę wpisać poprawny pesel"
        ],
        passwordRules: [
          v => !!v || "Pole wymagane",
          v => v.length <= 15 || "Hasło nie może zawierać więcej niż 30",
          v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
          "Hasło musi zawierać min. 8 znaków, jedną dużą literę i cyfrę"
        ],
        repeatPasswordRules: [
          v => v === this.password || "Hasło powinno być takie samo jak poprzednie"
        ],
        email: "",
        emailRules: [
          v => !!v || "Pole wymagane",
          v => /.+@.+/.test(v) || "Błędnie wpisany E-mail"
        ],
        profilesList: ["Użytkownik", "Leśniczy"]
      };
    },
    methods: {
      closeWindow: function(){
        this.$emit("closeForm")
      }
    },
    computed: {
      accountTypeComputed: function () {
        return this.profile == "użytkownik" ? "użytkownika" : "leśniczego"
      }
    },
    mounted() {
      document.addEventListener("backbutton", function(event){
        this.closeWindow()
     
      })
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