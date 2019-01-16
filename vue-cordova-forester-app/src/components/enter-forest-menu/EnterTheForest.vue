<template>
  <v-container align-content-center>
      <v-layout align-center column fill-height>
        <h2>Organizm wszedl do lasu</h2>
        <router-link to="/">
          <v-btn color="success" round>Powrót</v-btn>
        </router-link>
        <router-view></router-view>
        </v-layout>
      </v-container>
</template>

<script>


export default {
  name: "EnterTheForest",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">


</style>
