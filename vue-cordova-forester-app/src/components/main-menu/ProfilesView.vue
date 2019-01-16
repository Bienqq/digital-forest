<template>
        <v-container grid-list-xs>
            <rotate-logo/>
                <v-layout class="white--text font-weight-medium" align-center column fill-height>
                        <v-flex xs1 mt-5>
                            <v-btn class="responsive-btn" color="success" to="/enter-the-forest"  >Wejdź do lasu</v-btn>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn class="responsive-btn"  color="success"> Zaloguj się</v-btn>
                        </v-flex>
                        <v-btn class="responsive-btn pa-2 font-weight-normal" color="white" flat>Zarejestruj się !</v-btn>
                        <v-btn class="responsive-btn pa-2 font-weight-normal"  color="white" flat> Przypomnij hasło</v-btn>    
                </v-layout>
        </v-container>
</template>

<script>
import RotateLogo from "../common/RotateLogo"
export default {
    name: "ProfilesView",
    components:{
        'rotate-logo' : RotateLogo
    },
    data(){
        return{
        
        }
    }, 

}
</script>

<style scoped lang="scss">
    .responsive-btn {
        width:40vw;
        height: 4vh;
        font-size: 3vw;
    }
</style>
