<template>
    <div>
        <v-card-title>Podaj Login i Email</v-card-title>
        <v-flex xs10 offset-xs1>
            <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" required></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
            <v-text-field color="green" prepend-inner-icon="email" v-model="email" v-bind:rules="emailRules" label="E-mail"
                required></v-text-field>
            <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
                <v-btn block color="success">Zmień hasło</v-btn>

            </v-flex>
        </v-flex>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>