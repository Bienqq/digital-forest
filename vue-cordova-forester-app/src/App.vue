<template>
  <div id="app">
  </div>
</template>

<script>


export default {
  name: "App",
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

  @media screen and (orientation: landscape) {
    background-image: url("./assets/img/bg_menu_landscape.png");
  }

  @media screen and (orientation: portrait) {
    background-image: url("./assets/img/bg_menu_portrait.png");
  }
}
</style>
