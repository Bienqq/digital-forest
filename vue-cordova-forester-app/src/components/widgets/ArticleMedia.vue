<template>
    <div v-if="media != undefined && media.length != 0">

        <v-img v-if="media.length == 1 && media[0].type == 'image'" :src="media[0].path" :alt="media[0].name" :max-height="imgHeight"></v-img>

        <vue-plyr v-else-if="media[0].type == 'video'" :options="plyrOptions" :emit="['enterfullscreen', 'exitfullscreen']" @exitfullscreen="handleExitFullScreen()" @enterfullscreen="handleEnterFullScreen()">
            <video :poster="media[0].posterPath" size="720">
                <source :src="media[0].path" type="video/mp4">
            </video>
        </vue-plyr>

        <v-carousel v-else hide-delimiters hide-controls :height="carouselHeight">
            <v-carousel-item v-for="(media, index) in media" :key="index" :src="media.path"></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    import {
        VuePlyr
    } from 'vue-plyr'

    import 'vue-plyr/dist/vue-plyr.css'

    export default {
        props: {
            media: {
                type: Array
            },
            imgHeight:{
                type: String,
            },
            carouselHeight:{
                type: String,
            }
        },
        components: {
            "vue-plyr": VuePlyr,
        },
        data() {
            return {
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
    }
</script>

<style lang="scss">
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