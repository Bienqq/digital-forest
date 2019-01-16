<template>
        <v-container grid-list-xs>
            <RotateLogo/>
                <v-layout class="white--text font-weight-medium" align-center column fill-height mb-5>
                        <v-flex xs1 mt-5>
                            <v-btn class="responsive-btn" color="success" to="/enter-the-forest"  >Wejdź do lasu</v-btn>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn class="responsive-btn" color="success" v-bind:loading="loading1" v-on:click="loading1 = !loading1"> Zaloguj się</v-btn>
                        </v-flex>
                        <p>Nie masz konta ? Zarejestruj się !</p>
                        <p>Przypomnij hasło</p>                    
                </v-layout>
        </v-container>
</template>

<script>
import RotateLogo from "../common/RotateLogo"
export default {
    name: "ProfilesView",
    data(){
        return{
            loading1: false,
        }
    }, 
    components:{
        'RotateLogo' : RotateLogo
    }
}
</script>

<style scoped lang="scss">
    .responsive-btn {
        width:40vw;
        height: 4vh;
        font-size: 3vw;
    }

    p {
        font-size: 3vw;
    }

</style>
