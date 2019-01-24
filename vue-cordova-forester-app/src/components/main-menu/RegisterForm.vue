<template>
  <transition name="rubberBand" mode="out-in">
    <v-form v-model="valid">
      <v-container>
        <v-layout align-center column>
          <v-card width="90vw">
            <!-- pasek u góry -->
            <v-toolbar dark color="#004d34">
              <v-toolbar-title>Rejestracja</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark v-on:click="closeWindow()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-flex xs12>
              <v-select color="#004d34" box :items="typyKont" label="Wybierz typ konta"></v-select>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="login"
                v-bind:rules="nameRules"
                v-bind:counter="20"
                label="Login"
                required
              ></v-text-field>
            </v-flex>

            <!-- <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="firstname"
                v-bind:rules="nameRules"
                v-bind:counter="15"
                label="Imie"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="lastname"
                v-bind:rules="nameRules"
                v-bind:counter="30"
                label="Nazwisko"
                required
              ></v-text-field>
            </v-flex> -->

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="email" v-bind:rules="emailRules" label="E-mail" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="password"
                v-bind:rules="passwordRules"
                v-bind:counter="30"
                label="Hasło"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="repeatPassword"
                v-bind:rules="repeatPassword"
                v-bind:counter="30"
                label="Powtórz Hasło"
                required
              ></v-text-field>
            </v-flex>

            <v-flex justify-center xs8 offset-xs2>
              <v-btn
                block                
                color="black"
                flat
                v-on:click.stop="showRegister = true"
              >Dalej</v-btn>
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
      nameRules: [
        v => !!v || "Pole wymagane",
        v => v.length <= 15 || "Imie nie może zawierać więcej niż 15"
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
  }
};
</script>

<style scoped lang="scss">
</style>
