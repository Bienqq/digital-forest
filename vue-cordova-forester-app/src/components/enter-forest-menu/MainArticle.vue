<template>
  <v-flex xs12 >
    <v-card class="vcard" width="96%">
      <v-img :src="testimg"> </v-img>

      <v-card-title primary-title>
        <div>
          <div class="headline">Nagłówek Artykułu</div>
          <span class="grey--text">Podtytuł który może <br> zajmować wiele linii, a w nim jakieś blablabla</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <p @click="show = !show"> Czytaj więcej </p>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
          sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
          add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>

<script>
  export default {

    name: "MainArtice",
    data() {
     
      return {
        show: false,
        testimg: require("@/assets/img/testBg/1.jpg")
      };

    }
  }
</script>

<style lang="scss" scoped>
  .vcard {
    background: white;
  margin:auto;

  }
</style>