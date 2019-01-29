<template>
  <transition name="rubberBand" mode="out-in">
    <v-form v-model="valid">
      <v-container>
        <v-layout align-center column>
          <v-card width="90vw">
            <!-- pasek u góry -->
            <v-toolbar dark color="#004d34">
              <v-toolbar-title>Rejestracja {{accountTypeComputed}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark v-on:click="closeWindow()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-flex xs12>
              <v-select color="green" box :items="typyKont" label="Wybierz typ konta" v-model="accountType"></v-select>
            </v-flex>

            <div v-if="accountType === 'Leśniczy'">
              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="person_outline" v-model="firstname" v-bind:rules="nameRules" v-bind:counter="15" label="Imie" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="person_outline" v-model="lastname" v-bind:rules="surnameRules" v-bind:counter="30" label="Nazwisko" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field prepend-inner-icon="fingerprint" v-model="pesel" v-bind:rules="peselRules" v-bind:counter="11" label="Pesel" required></v-text-field>
              </v-flex>
            </div>

            <v-divider class="top-spacer"/>

            <v-flex xs10 offset-xs1>
              <v-text-field color="green" v-model="login" prepend-inner-icon="person" v-bind:rules="loginRules"
                v-bind:counter="20" label="Login" required></v-text-field>
            </v-flex>



            <v-flex xs10 offset-xs1>
              <v-text-field color="green" prepend-inner-icon="email" v-model="email" v-bind:rules="emailRules" label="E-mail"
                required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="password" color="green" prepend-inner-icon="lock" v-bind:rules="passwordRules"
                v-bind:counter="30" label="Hasło" type="password" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="repeatPassword" color="green" prepend-inner-icon="lock" v-bind:rules="repeatPasswordRules"
                v-bind:counter="30" label="Powtórz Hasło" type="password" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-checkbox  color="green">
                <div slot="label">Zgadzam się na przetwarzanie danych dla celów rejestracyjnych.</div>
              </v-checkbox>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-checkbox color="green">
                <div slot="label">Akceptuję Regulamin</div>
              </v-checkbox>
            </v-flex>

            <v-flex justify-center xs8 offset-xs2>
              <v-btn block color="black" flat v-on:click.stop="showRegister = true">Dalej</v-btn>
            </v-flex>
          </v-card>
        </v-layout>
      </v-container>
    </v-form>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        firstname: "",
        lastname: "",
        login:"",
        password:"",
        pesel:"",
        repeatPassword:"",
        accountType: "Użytkownik",
        nameRules: [
          v => !!v || "Pole wymagane",
          v => v.length <= 15 || "Imie nie może zawierać więcej niż 15"
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
          "Hasło musi zawierać min. 8 znaków, jedną dużą litere i cyfrę"
        ],
        repeatPasswordRules: [
          v => v === this.password || "Hasło powinno być takie samo jak poprzednie."
        ],
        email: "",
        emailRules: [
          v => !!v || "Pole wymagane",
          v => /.+@.+/.test(v) || "Błędnie wpisany E-mail"
        ],
        typyKont: ["Użytkownik", "Leśniczy"]
      };
    },
    methods: {
      closeWindow() {
        this.$emit("closeWindow");
      }
    },
    computed: {
      accountTypeComputed: function () {
        return this.accountType == "Użytkownik" ? "Użytkownika" : "Leśniczego";
      }
    }
  };
</script>

<style scoped lang="scss">
</style>