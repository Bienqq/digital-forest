<template>

  <v-container>
    <v-layout align-center column>
      <v-card width="90vw">

        <!-- pasek u góry -->
        <v-toolbar dark color="#004d34">
          <v-toolbar-title>Logowanie</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark v-on:click="closeWindow()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>


        <!-- sekcja logowanie -->
        <section id="login" v-if="loginToogle">
          <v-form>
            <div class="flip-scale-up-hor">

              <!-- input login -->
              <v-flex xs10 offset-xs1>
                <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" required></v-text-field>
              </v-flex>

              <!-- input hasło -->
              <v-flex xs10 offset-xs1>
                <v-text-field v-model="password" color="green" prepend-inner-icon="lock" label="Hasło" type="password"
                  required></v-text-field>
              </v-flex>

              <v-divider class="top-spacer" />

              <!-- button logowania -->
              <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
                <v-btn block color="success" v-on:click.stop="">Zaloguj</v-btn>
              </v-flex>

              <!-- button zapomnienia xD -->
              <v-flex justify-center xs8 offset-xs2 class="top-spacer">
                <v-btn block small color="black" flat @click="loginToogle = false"> Zapomniałeś hasła? Kliknij tutaj!</v-btn>
              </v-flex>

            </div>
          </v-form>
        </section>

        <section v-else>
          <lost-password-form/>
        </section>

      </v-card>
    </v-layout>
  </v-container>

</template>

<script>
<<<<<<< HEAD:vue-cordova-forester-app/src/components/main-menu/LoginForm/LoginForm.vue
import LostPassword from './LostPassword'
  export default {
    components:{
      "lost-password-form" : LostPassword
=======
  import lostPassword from './LoginForm/lostPassword'
  export default {
    components: {
      "lost-password-form": lostPassword
>>>>>>> origin/master:vue-cordova-forester-app/src/components/main-menu/LoginForm.vue
    },
    data() {
      return ({
        login: "",
        password: "",
        loginToogle: true,
      });
    },
    methods: {
      closeWindow() {
<<<<<<< HEAD:vue-cordova-forester-app/src/components/main-menu/LoginForm/LoginForm.vue
        this.$emit('closeLoginWindow',"");
=======
        this.loginToogle = true
        this.$emit('closeLoginWindow')
>>>>>>> origin/master:vue-cordova-forester-app/src/components/main-menu/LoginForm.vue
      }
    }
  }
</script>

<style>

</style>