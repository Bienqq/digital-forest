<template>
    <v-layout row wrap>

        <!-- Left image card  -->
        <v-flex v-if="index % 2 == 0" xs12 class="pa-2">

            <v-card class="white--text elevation-8 gradient-dark-light animated fadeIn" @click="$emit('showModal', content)">
                <v-layout row class="pa-2">
                    <v-flex xs5 align-self-center>

                        <div v-if="content.media != undefined && content.media.length != 0" @click.stop="">

                            <v-img v-if="content.media.length == 1 && content.media[0].type == 'image'" :src="content.media[0].path" :alt="content.media[0].name" height="33vw"></v-img>

                            <vue-plyr v-else-if="content.media[0].type == 'video'" :options="plyrOptions">
                                <video :poster="content.media[0].posterPath" size="720">
                                    <source :src="content.media[0].path" type="video/mp4">
                                </video>
                            </vue-plyr>

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
                                <div class="hidden-xs-only mt-2">
                                    {{descriptionPreview}}
                                </div>
                            </div>
                        </v-card-title>
                        <div class="location-left pl-1 text-xs-right caption">
                            <v-icon class="white--text" small>location_on</v-icon>
                            <span>Polska, Warszawa</span>
                        </div>
                    </v-flex>
                </v-layout>

                <v-divider dark class="mx-2 mt-2"></v-divider>

                <v-card-actions class="pl-3 py-0">
                    <p @click.stop="showMore = !showMore"> Czytaj więcej </p>
                    <v-btn icon @click.stop="showMore = !showMore">
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

        <!-- Right image card  -->
        <v-flex v-else xs12 class="pa-2">

            <v-card class="white--text elevation-8 gradient-light-dark animated fadeIn" @click="$emit('showModal', content)">
                <v-layout row class="pa-2">
                    <v-flex xs7 class="wrapper-relative">
                        <v-card-title primary-title class="pa-2 mb-2">
                            <div>
                                <div class="headline">{{ content.title}}</div>
                                <div class="subheading">{{ content.subTitle }}</div>
                                <div class="hidden-xs-only mt-2">
                                    {{descriptionPreview}}
                                </div>
                            </div>
                        </v-card-title>

                        <div class="location-left pl-1 caption">
                            <v-icon class="white--text" small>location_on</v-icon>
                            <span>Polska, Warszawa</span>
                        </div>

                    </v-flex>

                    <v-flex xs5 align-self-center>

                        <div v-if="content.media != undefined && content.media.length != 0" @click.stop="">

                            <v-img v-if="content.media.length == 1 && content.media[0].type == 'image'" :src="content.media[0].path" :alt="content.media[0].name" height="33vw"></v-img>

                            <vue-plyr v-else-if="content.media[0].type == 'video'" :options="plyrOptions">
                                <video :poster="content.media[0].posterPath">
                                    <source :src="content.media[0].path" type="video/mp4" size="720">
                                </video>
                            </vue-plyr>

                            <v-carousel v-else hide-delimiters hide-controls height="33vw">
                                <v-carousel-item v-for="(media, index) in content.media" :key="index" :src="media.path"></v-carousel-item>
                            </v-carousel>
                        </div>

                    </v-flex>

                </v-layout>


                <v-divider dark class="mx-2 mt-2"></v-divider>

                <v-card-actions class="pl-3 py-0">
                    <p @click.stop="showMore = !showMore"> Czytaj więcej </p>
                    <v-btn icon @click.stop="showMore = !showMore">
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
    import {
        VuePlyr
    } from 'vue-plyr'

    import 'vue-plyr/dist/vue-plyr.css'
    export default {
        props: {
            contentData: {
                type: Object
            },
            index: {
                type: Number
            },
            descriptionVisible: {
                type: Boolean,
                default: false,
            }
        },
        components: {
            "vue-plyr": VuePlyr,
        },
        data() {
            return {
                content: this.contentData,
                showMore: this.descriptionVisible,
                plyrOptions: {
                    controls: [
                        "play",
                        "progress",
                        "current-time",
                        "mute",
                        "volume",
                        "fullscreen",
                    ],
                },
            }
        },
        computed: {
            descriptionPreview() {
                if (this.content.description.length > 400) {
                    return this.content.description.substring(0, 400) + "..."
                } else {
                    return this.content.description
                }
            }
        },
    }
</script>

<style lang="scss">
    // No scoped styles here because we need to override default plyr styles here

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

    // just copied from plyr source css to change some css properties
    .plyr {
        -moz-osx-font-smoothing: auto;
        -webkit-font-smoothing: subpixel-antialiased;
        direction: ltr;
        font-family: Avenir, "Avenir Next", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
        font-variant-numeric: tabular-nums;
        font-weight: 500;
        line-height: 1.7;
        max-width: 100%;
        min-width: 110px;
        position: relative;
        text-shadow: none;
        -webkit-transition: -webkit-box-shadow .3s ease;
        transition: -webkit-box-shadow .3s ease;
        transition: box-shadow .3s ease;
        transition: box-shadow .3s ease, -webkit-box-shadow .3s ease;
    }

    // same as above
    .plyr__control {
        background: 0 0;
        border: 0;
        border-radius: 3px;
        color: inherit;
        cursor: pointer;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        overflow: visible;
        padding: 0px;
        position: relative;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
</style>