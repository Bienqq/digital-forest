<template>
    <div >

        <v-flex xs10 offset-xs1>
            <v-text-field v-model="password" color="green" prepend-inner-icon="lock" :rules="passwordRules"
                :counter="30" label="Hasło" type="password" required></v-text-field>
        </v-flex>

        <v-flex xs10 offset-xs1>
            <v-text-field v-model="repeatPassword" color="green" prepend-inner-icon="lock" :rules="repeatPasswordRules"
                :counter="30" label="Powtórz Hasło" type="password" required></v-text-field>
        </v-flex>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                password: "",
                repeatPassword: "",
                passwordRules: [
                    v => !!v || "Pole wymagane",
                    v => v.length <= 15 || "Hasło nie może zawierać więcej niż 30",
                    v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
                    "Hasło musi zawierać min. 8 znaków, jedną dużą litere i cyfrę"
                ],
                repeatPasswordRules: [
                    v => v === this.password || "Hasło powinno być takie samo jak poprzednie"
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>