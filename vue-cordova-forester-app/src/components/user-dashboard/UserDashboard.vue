<template>
    <div>
        <h1>User dashboard</h1>
        <v-btn color="success" @click.stop="logout">Wyloguj</v-btn>
        <router-view></router-view>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {

            }
        },
        methods: {
            ...mapActions([
                "logout"
            ])
        },
    }
</script>

<style scoped lang="scss">

</style>