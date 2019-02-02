<template>
    <div>

        <!-- input login -->
        <v-flex xs10 offset-xs1>
            <v-text-field color="green" v-model="login" prepend-inner-icon="person" label="Login" required></v-text-field>
        </v-flex>

        <!-- input email -->
        <v-flex xs10 offset-xs1>
            <v-text-field color="green" prepend-inner-icon="email" v-model="email" label="E-mail" required>
            </v-text-field>
        </v-flex>

        <!-- button -->
        <v-flex justify-center xs8 offset-xs2 class="bottom-spacer">
            <v-btn block color="success" @click="checkChangePassword()">Zmień hasło</v-btn>
        </v-flex>
        <section id="changePasswordInput" v-if="confirmed">
            <div v-if="isCorrect">
                <change-password />
            </div>
            <div v-else>
                <p class="errorInfo animated infinite pulse">błędnie wpisane dane</P>
            </div>
        </section>


    </div>
</template>

<script>
    import ChangePassword from './ChangePassword'
    export default {
        components: {
            "change-password": ChangePassword
        },
        data() {
            return {
                login: "",
                email: "",
                confirmed: false,
                isCorrect: false,
                visible: true
            }
        },
        methods: {
            checkChangePassword() {
                this.confirmed = true
                this.visible = !this.visible
                if (this.isCorrect == false) {
                    setTimeout(() => {
                        this.confirmed = false
                    }, 2000);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .errorInfo {
        text-align: center;
        color: red;
    }
</style>