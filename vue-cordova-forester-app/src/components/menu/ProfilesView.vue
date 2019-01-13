<template>
    <v-container grid-list-xs>
        <v-layout align-center justify-center column fill-height>
            <v-flex xs1>
                <v-img v-bind:src="logoSrc" width="300px" height="300px"></v-img>
            </v-flex>
            <v-layout align-center justify-start column >
                <v-flex xs1>
                    <v-btn color="success" v-bind:loading="loading1" v-on:click="loading1 = !loading1" round >Leśniczy</v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn color="success" v-bind:loading="loading2" v-on:click="loading2 = !loading2" round >Użytkownik</v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn color="success" v-bind:loading="loading3" v-on:click="loading3 = !loading3" round >Wejdz do lasu</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
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
    }
}
</script>

<style scoped>

</style>
