<template>
  <transition name="slideUp" mode="out-in">
    <v-form v-model="valid">
      <v-container >
        <v-layout column>
          <v-flex xs12 md4>
            <v-text-field v-model="firstname" v-bind:rules="nameRules" v-bind:counter="10" label="First name" required></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="lastname" v-bind:rules="nameRules" v-bind:counter="10" label="Last name" required></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="email" v-bind:rules="emailRules" label="E-mail" required></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="email" v-bind:rules="emailRules" label="E-mail" required></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  }
};
</script>

<style scoped lang="scss">
</style>
