<template>
  <transition>
  <v-container align-content-center>
        <h5>Witaj w lesie</h5>
        <router-link to="/">
          <v-btn color="success">Powrót</v-btn>
        </router-link>
        <router-view></router-view>
      </v-container>
  </transition>
</template>

<script>


export default {
  name: "EnterTheForest",
  data() {
    return {};
  },
  created() {
    console.log(this.$route.meta.transitionName)
  },
};
</script>

<style scoped lang="scss">


</style>
