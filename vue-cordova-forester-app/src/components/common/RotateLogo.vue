<template>
  <v-flex xs12>
    <v-img class="RotateLogo1" :src="logoSrc" aspect-ratio="1.8" min-width="55vw" min-height="55vw" contain></v-img>
    <v-img class="RotateLogo2" :src="textSrc" aspect-ratio="1.8" min-width="18vw" min-height="18vw" contain></v-img>
  </v-flex>
</template>

<script>
export default {
  name: "RotateLogo",
  data() {
    return {
      logoSrc: require("@/assets/img/logo/circle.png"),
      textSrc: require("@/assets/img/logo/text.png")
    };
  }
};
</script>

<style scoped lang="scss">
.RotateLogo1 {
  z-index: 1;
  position: relative;
  -webkit-animation: rotate-center 15s linear infinite both;
  animation: rotate-center 15s linear infinite both;
}
.RotateLogo2 {
  z-index: 2;
  position: relative;
  top: -55vw;
  margin-bottom: -55vw;
}

@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
