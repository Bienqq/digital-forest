<template>
    <v-layout row wrap>

        <!-- Left image card  -->
        <v-flex v-if="index % 2 == 0" xs12 class="pa-2">

            <v-card class="white--text elevation-8 gradient-dark-light animated fadeIn">
                <v-layout row class="pa-2">
                    <v-flex xs5 align-self-center>

                        <div v-if="content.media.length != 0">
                            <v-img v-if="content.media.length == 1" :src="content.media[0].path" :alt="content.media[0].name" height="33vw"></v-img>

                            <v-carousel v-else hide-delimiters hide-controls height="33vw">
                                <v-carousel-item v-for="(media, index) in content.media" :key="index" :src="media.path"></v-carousel-item>
                            </v-carousel>
                        </div>

                    </v-flex>

                    <v-flex xs7 class="wrapper-relative">
                        <v-card-title primary-title class="pa-2 mb-2">
                            <div>
                                <div class="headline">{{content.title}}</div>
                                <div class="subheading">{{content.subTitle}}</div>
                            </div>
                        </v-card-title>
                        <div class="location-left pl-1 text-xs-right caption">
                            <v-icon class="white--text" small>location_on</v-icon>
                            <span>Polska, Warszawa</span>
                        </div>
                    </v-flex>
                </v-layout>

                <v-divider dark class="mx-2"></v-divider>

                <v-card-actions class="pl-3 py-0">
                    <p @click="showMore = !showMore"> Czytaj więcej </p>
                    <v-btn icon @click="showMore = !showMore">
                        <v-icon class=" white--text">{{ showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    {{content.publishDate}}
                </v-card-actions>

                <v-slide-y-transition>
                    <div v-show="showMore">
                        <v-card-text class="pb-1">
                            <p class="body-1">{{content.description}}</p>
                        </v-card-text>
                        <v-divider dark class="mx-2"></v-divider>
                        <v-card-text class="body-2 text-xs-right pa-2">
                            <span class="font-italic"> {{content.publisher}}</span>
                        </v-card-text>
                    </div>
                </v-slide-y-transition>

            </v-card>

        </v-flex>

        <!-- Right image card  -->
        <v-flex v-else xs12 class="pa-2">

            <v-card class="white--text elevation-8 gradient-light-dark animated fadeIn">
                <v-layout row class="pa-2">
                    <v-flex xs7 class="wrapper-relative">
                        <v-card-title primary-title class="pa-2 mb-2">
                            <div>
                                <div class="headline">{{ content.title}}</div>
                                <div class="subheading">{{ content.subtitle }}</div>
                            </div>
                        </v-card-title>

                        <div class="location-left pl-1 caption">
                            <v-icon class="white--text" small>location_on</v-icon>
                            <span>Polska, Warszawa</span>
                        </div>

                    </v-flex>

                    <v-flex xs5 align-self-center>

                        <div v-if="content.media.length != 0">
                            <v-img v-if="content.media.length == 1" :src="content.media[0].path" :alt="content.media[0].name" height="33vw"></v-img>

                            <v-carousel v-else hide-delimiters hide-controls height="33vw">
                                <v-carousel-item v-for="(media, index) in content.media" :key="index" :src="media.path"></v-carousel-item>
                            </v-carousel>
                        </div>


                    </v-flex>

                </v-layout>


                <v-divider dark class="mx-2"></v-divider>

                <v-card-actions class="pl-3 py-0">
                    <p @click="showMore = !showMore"> Czytaj więcej </p>
                    <v-btn icon @click="showMore = !showMore">
                        <v-icon class="white--text">{{ showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    {{content.publishDate}}
                </v-card-actions>

                <v-slide-y-transition>
                    <div v-show="showMore">
                        <v-card-text class="pb-1">
                            <p class="body-1">{{content.description}}</p>
                        </v-card-text>
                        <v-divider dark class="mx-2"></v-divider>
                        <v-card-text class="body-2 text-xs-right pa-2">
                            <span class="font-italic"> {{content.publisher}}</span>
                        </v-card-text>
                    </div>
                </v-slide-y-transition>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: {
            contentData: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        data() {
            return {
                show: false,
                content: this.contentData,
                showMore: false,
            }
        }
    }
</script>

<style scoped lang="scss">
    .gradient-dark-light {
        background-image: linear-gradient(to bottom, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }

    .gradient-light-dark {
        background-image: linear-gradient(to top, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }

    .wrapper-relative {
        position: relative;
    }

    .location-left {
        position: absolute;
        bottom: -5%;
        width: 100%;
    }
</style>