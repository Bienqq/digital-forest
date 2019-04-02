<template>
    <v-dialog id="modal-dialog" :content-class="['animated', 'zoomIn']" scrollable v-model="show">
        <v-layout class="animated fadeIn faster" column fill-height>
            <v-card>
                <v-flex xs12 class="ma-2" v-if="content !== undefined">
                    <v-card class="v-card mt-1 white--text elevation-8 gradient-light-dark" @click="$emit('showModal', content)">

                        <div v-if="content.media != undefined && content.media.length != 0" v-on:dblclick="doubleClick">
                            <v-img v-if="content.media.length == 1 && mediaType == 'image'" :src="content.media[0].path" :alt="content.media[0].name" contain max-height="80vw"></v-img>

                            <vue-plyr v-else-if="mediaType == 'video'" ref="videoPlayer" :options="plyrOptions" :emit="['enterfullscreen', 'exitfullscreen']" @exitfullscreen="handleExitFullScreen()" @enterfullscreen="handleEnterFullScreen()">
                                <video :poster="content.media[0].posterPath">
                                    <source :src="content.media[0].path" type="video/mp4" size="720">
                                </video>
                            </vue-plyr>

                            <v-carousel v-else hide-delimiters hide-controls height="50vw">
                                <v-carousel-item v-for="(media, index) in content.media" :key="index" :src="media.path"></v-carousel-item>
                            </v-carousel>

                        </div>

                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{content.title}}</div>
                                <div class="subheading">{{content.subTitle}}</div>
                            </div>

                        </v-card-title>
                        <div class="text-xs-right pb-2 px-3">
                            <v-icon class="white--text" medium>location_on</v-icon>
                            <span>Warszawa</span>
                        </div>
                        <v-divider dark class="mx-2"></v-divider>

                        <v-card-actions>
                            <span class="pl-1">{{content.publishDate}}</span>
                            <v-spacer></v-spacer>
                            <p @click.stop="showMore = !showMore"> Czytaj więcej </p>
                            <v-btn icon @click.stop="showMore = !showMore">
                                <v-icon class=" white--text">{{ showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-slide-y-transition>
                            <div v-show="showMore" class="relative">
                                <v-card-text class="pb-5">
                                    <p class="body-1">{{content.description}}</p>
                                </v-card-text>

                                <v-card-text class="publisher body-2 text-xs-right">
                                    <v-divider dark class="pa-1"></v-divider>
                                    <span class="font-italic">{{content.publisher}}</span>
                                </v-card-text>
                            </div>
                        </v-slide-y-transition>

                    </v-card>
                </v-flex>

            </v-card>
        </v-layout>
    </v-dialog>
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
        },
        components: {
            "vue-plyr": VuePlyr,
        },
        data() {
            return {
                show: true,
                content: this.contentData,
                showMore: true,
                mediaType: this.contentData.media[0].type,
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

        methods: {
            handleExitFullScreen() {
                window.screen.orientation.lock('portrait')
            },
            handleEnterFullScreen() {
                window.screen.orientation.unlock()
            },
            mediaClicked() {
                if (this.mediaType === "video") {

                }
                console.log("single click")
                //console.log(this.$refs.videoPlayer.player.play())
            },
            doubleClick() {
                console.log("doubleclick")
            }
        },
        watch: {
            show: function() {
                this.$emit("closeModal")
            }
        },

    }
</script>

<style lang="scss">
    // no scoped styles here in order to override child v-dialog styles with new ones
    #modal-dialog {
        .v-dialog {
            margin: 5px;
        }
    }

    .publisher {
        position: absolute;
        bottom: 0;
    }

    .gradient-light-dark {
        background-image: linear-gradient(to top, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }
</style>