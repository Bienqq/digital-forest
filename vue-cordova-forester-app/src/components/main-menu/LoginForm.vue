<template>
    <v-form v-model="valid">
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

          <div class="flip-scale-up-hor">
            <v-flex xs10 offset-xs1>
              <v-text-field color="green" v-model="login" prepend-inner-icon="person" 
                label="Login" required></v-text-field>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-text-field v-model="password" color="green" prepend-inner-icon="lock" 
               label="Hasło" type="password" required></v-text-field>
            </v-flex>
            <v-divider class="top-spacer"/> 
            <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
              <v-btn  block color="success"  v-on:click.stop="showRegister = true">Zaloguj</v-btn>
            </v-flex>
 <v-flex justify-center xs8 offset-xs2 class="top-spacer" >
                            <v-btn block small color="black" flat> Zapomniałeś hasła? Kliknij tutaj!</v-btn> 
                          </v-flex>
          </div>
        </v-card>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
data(){
    return({
        login:"",
        password:""
    });
},
methods:{
    closeWindow(){
        this.$emit('closeLoginWindow',"");
    }
}
}
</script>

<style>

</style>
