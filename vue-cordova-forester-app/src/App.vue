<template>
  <v-app id="app">
    <transition v-bind:name="transitionName" mode="out-in">
      <router-view class="fast"/>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slideDown"
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === "/") {
        this.transitionName = "slideDown";
      } else {
        this.transitionName = "slideUp";
      }
    },
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
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: 100vw auto;
  background-image: url("./assets/img/bg_menu_portrait.png");
  overflow-x: hidden;
  overflow-y: auto;
}

.fast {
  animation-duration: 0.7s !important;
}

// It is required to hide underlined links for Cordova app
a {
  text-decoration: none !important;
}

//main colors background and font schemes for the application
.light-green{
  background:#4caf50;
}
.dark-green{
background: #004d34;
}


//auxiliaries for eg. spacers, dividers
.top-spacer{
  margin-top:5vw;
}
.bottom-spacer{
  margin-bottom:5vw;
}
</style>
