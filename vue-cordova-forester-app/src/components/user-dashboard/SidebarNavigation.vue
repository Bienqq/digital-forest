<template>
    <div>

        <v-toolbar class="white--text" fixed color="#004d34">
            <v-toolbar-side-icon color="#4caf50" @click.stop="showNavigation = true"></v-toolbar-side-icon>
            <v-toolbar-title> Panel {{userDashboardNameComputed}}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-navigation-drawer v-model="showNavigation" v-touch="{left: () => handleSwipe('left')}" fixed temporary width="240px" >
            <v-list class="pa-0">
                <v-list-tile avatar>

                    <v-list-tile-avatar>
                        <v-icon x-large class="mr-3">person</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title class="title text-truncate mt-2">{{userNameComputed}}</v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list>

            <v-list class="pt-1" dense>
                <v-divider dark></v-divider>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="pt-1">
                        <v-list-tile-title class="subheading">Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>account_box</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="pt-1">
                        <v-list-tile-title class="subheading">Konto</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="pt-1">
                        <v-list-tile-title class="subheading">Ustawienia</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="pt-1">
                        <v-list-tile-title class="subheading">Informacje</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                showNavigation: false,
            }
        },
        methods: {
            //  this method has been caled from its parent component
            handleSwipe(direction) {
                if (direction == "left") {
                    this.showNavigation = false
                }
                if (direction == "right") {
                    this.showNavigation = true
                }
            }
        },
        computed: {
            userNameComputed() {
                const firstName = this.$store.state.userContext.firstName
                const lastName = this.$store.state.userContext.lastName
                return `${firstName} ${lastName}`
            },
            userDashboardNameComputed() {
                const userRole = this.$store.state.userContext.role
                return userRole === "USER" ? "użytkownika" : "leśniczego"
            },
        },
    }
</script>

<style scoped lang="scss">
    .first-plan {
        z-index: 11000 !important;
    }
</style>