<template>
    <v-layout row wrap>

        <!-- Left image card  -->
        <v-flex v-if="index % 2 == 0" xs12 class="pa-2">
            <v-card class="white--text elevation-8 gradient-dark-light">
                <v-layout class="pa-2">
                    <v-flex xs5 class="pa-1">
                        <v-img :src="content.media[0].path" :alt="content.media[0].name" height="33vw"></v-img>
                    </v-flex>
                    <v-flex xs7 class="relative">
                        <v-card-title primary-title class="pa-2">
                            <div>
                                <div class="headline">{{content.title}}</div>
                                <div class="subheading">{{content.subTitle}}</div>
                            </div>
                            <div class="publisher caption pr-2 text-xs-right">
                                {{content.publisher}}
                            </div>
                        </v-card-title>

                    </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pl-3 pb-0 pt-0">
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
                    </div>
                </v-slide-y-transition>

            </v-card>
        </v-flex>

        <!-- Right image card  -->
        <v-flex v-else xs12 class="pa-2">
            <v-card color="purple" class="white--text elevation-8 gradient-light-dark">
                <v-layout row class="pa-2">
                    <v-flex xs7 class="relative">
                        <v-card-title primary-title class="pa-2">
                            <div>
                                <div class="headline">{{ content.title}}</div>
                                <div class="subheading">{{ content.subtitle }}</div>
                            </div>
                            <div class="publisher caption pr-1">
                                {{content.publisher}}
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                        <v-img :src="content.media[0].path" :alt="content.media[0].name" height="33vw" contain></v-img>
                    </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pl-3 pb-0 pt-0">
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
    .relative {
        position: relative;
    }

    .publisher {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .gradient-dark-light {
        background-image: linear-gradient(to bottom, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }

    .gradient-light-dark {
        background-image: linear-gradient(to top, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }
</style>