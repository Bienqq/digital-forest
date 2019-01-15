<template>
  <v-container align-content-center>
    <h5>Witaj w lesie</h5>
    <router-link to="/">
      <v-btn color="success">Powrót</v-btn>
    </router-link>
    <router-view></router-view>
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
