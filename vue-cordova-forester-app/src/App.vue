<template>
  <v-app id="app" >
    <transition v-bind:name="transitionName" mode="out-in">
      <router-view class="fast"/>
    </transition>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data(){
    return{
      transitionName: "slideDown"
    }
  },
  watch: {
  '$route' (to, from) {
    if(to.path === "/") {
      this.transitionName = "slideDown"
    }else{
      this.transitionName = "slideUp"
    }
  }
}

};
</script>

<style lang="scss" >
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700,900&subset=latin-ext");
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-bold: 700;
$font-weight-black: 900;

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

#app {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 85%;
  background-image: url("./assets/img/bg_menu_portrait.png");
}

.fast {
  animation-duration: 0.7s !important;
}

// It is required to hide underlined links for Cordova app
a {
  text-decoration: none !important; 
}
</style>
