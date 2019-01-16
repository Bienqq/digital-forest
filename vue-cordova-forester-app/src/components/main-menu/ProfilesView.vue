<template>
    <transition name="slideOutUp" mode="out-in">
        <v-container grid-list-xs>
                <v-img v-bind:src="logoSrc" aspect-ratio="1.8" min-width="300px"  min-height="300px" contain ></v-img>
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
                <router-view></router-view>
        </v-container>
    </transition>
</template>

<script>
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
}
</script>

<style scoped lang="scss">



</style>
