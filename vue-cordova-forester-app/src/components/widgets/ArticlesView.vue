<template>
  <v-container align-content-center>

    <v-toolbar class="full-width">
      <v-toolbar-side-icon color="#4caf50"></v-toolbar-side-icon>
      <v-toolbar-title>Panel użytkownika</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-layout align-center column fill-height width="100vw">
      <v-card width="96vw" class="vcard-options" color="rgba(240,240,240,1)">

        <main-article />

        <h3 class="header">Reszta Aktualności:</h3>

        <articles-slider v-for="(property,index) in articlesList" :prop="property" :key="index"></articles-slider>
      </v-card>
      <router-view />
    </v-layout>
  </v-container>
</template>

<script>
  import MainArtice from "./MainArticle"
  import ArticlesSlider from './ArticlesSlider'
  export default {
    name: "EnterTheForest",
    components: {
      "main-article": MainArtice,
      "articles-slider": ArticlesSlider
    },
    data() {
      return {
        articlesList: [{
            thumbimg: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Epping_Forest_Centenary_Walk_2_-_Sept_2008.jpg/1200px-Epping_Forest_Centenary_Walk_2_-_Sept_2008.jpg",
            headermsg: 'Artykuł numer 1'
          },
          {
            thumbimg: "http://www.banktapet.pl/pictures/2013/0727/1/nature-trees-forests-paths-sunlight-wallpaper-543162.jpg",
            headermsg: 'Artykuł numer 3 o dłuższej nazwie i jeszcze dłuższej nazwie'
          },
        ],
      };
    },
  };
</script>

<style scoped lang="scss">
  .full-width {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    background: #004d34 !important;
    color: white !important;
  }

  .header {
    margin-left: 2vw;
    margin-top: 1vw;
  }

  .vcard-options {
    margin-top: 13vw;
    padding-top: 1vw;
  }
</style>