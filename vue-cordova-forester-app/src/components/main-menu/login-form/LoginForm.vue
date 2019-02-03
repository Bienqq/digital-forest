<template>
  <v-container class="pa-0 overflow-x-hidden">
    <v-layout align-center column class="animated fadeIn zoomIn fast">
      <v-card width="90vw">

        <v-toolbar dark color="#004d34">
          <v-toolbar-title>{{formTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeWindow()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <section id="login" v-if="loginToogle">
          <v-form>
            <div class="animated fadeIn zoomIn fast">

              <v-flex xs10 offset-xs1>
                <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" required></v-text-field>
              </v-flex>

              <v-flex xs10 offset-xs1>
                <v-text-field v-model="password" color="green" prepend-inner-icon="lock" label="Hasło" type="password"
                  required></v-text-field>
              </v-flex>

              <v-divider class="top-spacer ml-5 mr-5 mb-3" />

              <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
                <v-btn block color="success" @click.stop="">Zaloguj</v-btn>
              </v-flex>

              <v-flex justify-center xs8 offset-xs2 class="top-spacer">
                <v-btn block small color="black" flat @click="loginToogle = false"> Zapomniałeś hasła? Kliknij tutaj!</v-btn>
              </v-flex>

            </div>
          </v-form>
        </section>

        <section v-else >
          <lost-password-form />
        </section>

      </v-card>
    </v-layout>
  </v-container>

</template>

<script>
  import LostPassword from "./LostPassword";
  export default {
    components: {
      "lost-password-form": LostPassword
    },
    data() {
      return {
        login: "",
        password: "",
        loginToogle: true
      };
    },
    methods: {
      closeWindow() {
        this.loginToogle = true;
        this.$emit("closeLoginWindow");
      }
    },
    computed: {
      formTitle: function () {
        return this.loginToogle == true ? "Logowanie" : "Odzyskiwanie hasła";
      }
    },
    created() {
      document.addEventListener("backbutton", () => {
        this.$emit("closeLoginWindow")
      })
    },
  };
</script>

<style>
</style>