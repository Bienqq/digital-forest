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
                <v-flex xs10 offset-xs1>
                    <transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
                        <p class="errorInfo">błędnie wpisane dane</P>
                    </transition>

                </v-flex>
            </div>
        </section>


    </div>
</template>

<script>
    import changePassword from './changePassword'
    export default {
        components: {
            "change-password": changePassword
        },
        data() {
            return {
                login: "",
                email: "",
                confirmed: false,
                isCorrect: false
            }
        },
        methods: {
            checkChangePassword() {
                this.confirmed = true

                if (this.isCorrect == false) {
                    setTimeout(() => {
                        this.confirmed = false
                    }, 1500);
                }
            }
        }
    }
</script>

<style>
    .errorInfo {
        text-align: center;
        color: red;
    }
</style>