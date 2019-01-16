<template>
        <v-container grid-list-xs>
            <RotateLogo/>
                <v-layout align-center column fill-height>
                        <v-flex xs1>
                            <v-btn color="success" v-bind:loading="loading1" v-on:click="loading1 = !loading1" round >Leśniczy</v-btn>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn color="success" v-bind:loading="loading2" v-on:click="loading2 = !loading2" round >Użytkownik</v-btn>
                        </v-flex>
                        <v-flex xs1>
                            <router-link to="/enter-the-forest">
                                <v-btn color="success" v-bind:loading="loading3" v-on:click="loading3 = !loading3" round >Wejdź do lasu</v-btn>
                            </router-link> 
                        </v-flex>
                </v-layout>
        </v-container>
</template>

<script>
import RotateLogo from "../common/RotateLogo"
export default {
    name: "ProfilesView",
    data(){
        return{
            logoSrc: require("@/assets/img/cyfrowy_las.png"),
            loading1: false,
            loading2: false,
            loading3: false
        }
    }, 
    components:{
        'RotateLogo' : RotateLogo
    }
}
</script>

<style scoped lang="scss">



</style>
