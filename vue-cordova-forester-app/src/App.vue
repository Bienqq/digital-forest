<template>
  <v-app id="app">
    <transition :name="transitionName" mode="out-in">
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


$lightGray : #f9f9f9;
$lightGreen :#4caf50;
$darkGreen :#004d34; 

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v42/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "liga";
}

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

h3{
  font-size: 5vw;
  font-family: Roboto,sans-serif!important;
  font-weight: 400;
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
.light-gray{
  background:#f9f9f9;
} 
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
