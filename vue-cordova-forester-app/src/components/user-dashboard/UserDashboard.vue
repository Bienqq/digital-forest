<template>
    <v-container align-content-center>

        <sidebar-navigation></sidebar-navigation>

        <v-dialog v-model="logoutDialog" max-width="330px">
            <v-card>
                <v-card-title class="headline">Czy na pewno chcesz się wylogować?</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.stop="logout()">
                        Wyloguj się
                    </v-btn>

                    <v-btn color="green darken-1" flat="flat" @click.stop="logoutDialog = false">
                        Zostań
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <router-view></router-view>
    </v-container>
</template>

<script>
    import SidebarNavigation from "./SidebarNavigation"
    import {
        mapMutations,
        mapGetters
    } from 'vuex';
    import router from "@/router"

    const aboutMeUrl = process.env.VUE_APP_API_ABOUT_ME_URL

    export default {
        components: {
            "sidebar-navigation": SidebarNavigation
        },
        data() {
            return {
                logoutDialog: false,
            }
        },
        methods: {
            // works only android backbutton - logging out 
            handleBackButton() {
                this.logoutDialog = true;
            },
            logout() {
                this.removeTokensFromLocalStorage()
                this.showSnackbar({
                    message: "Wylogowano pomyślnie",
                    icon: "check"
                })
                router.push("/")
            },

            //TODO fix this method
            // verify login/register with facebook if it works correctly
            getUserInfo() {
                this.$http.get(aboutMeUrl)
                    .then(response => {
                        const name = `${response.data.firstName} ${response.data.lastName}`
                        this.fillUserContext({
                            name: name,
                            email: response.data.email,
                            role: response.data.role
                        })
                    })
                    .catch(err => {
                        console.log("err in user dashboard")
                        this.showSnackbar({
                            message: err,
                            icon: "error"
                        })
                    })
            },
            ...mapMutations([
                "showSnackbar",
                "removeTokensFromLocalStorage",
                "updateTokenInLocalStorage",
                "fillUserContext"
            ]),
        },
        computed: {
            ...mapGetters([
                "getTokenFromLocalStorage",
                "getRefreshTokenFromLocalStorage"
            ])
        },
        // before route EnterTheForest component add backing to previous view by clicking backbutton
        beforeRouteEnter(to, from, next) {
            next(userDashboard => document.addEventLtisener("backbutton", userDashboard.handleBackButton))
        },
        // when leaving EnterTheForest remove event handler
        beforeRouteLeave(to, from, next) {
            document.removeEventListener("backbutton", this.handleBackButton)
            next()
        },
        mounted() {
            this.getUserInfo()
        },
    }
</script>

<style scoped lang="scss">

</style>