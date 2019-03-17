<template>
    <v-flex xs12 class="ma-2">
        <v-card class="v-card mt-1 white--text elevation-8 gradient-light-dark">
            <v-img :src="content.media[0].path" :alt="content.name" contain> </v-img>

            <v-card-title primary-title>
                <div class="headline">{{ content.title }}</div>
                <span class="grey--text">{{ content.subTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <p @click="showMore = !showMore"> Czytaj więcej </p>
                <v-btn icon @click="showMore = !showMore">
                    <v-icon class=" white--text">{{ showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
                <div v-show="showMore" class="relative">
                    <v-card-text class="pb-5">
                        <p class="body-1">{{content.description}}</p>
                    </v-card-text>

                    <v-card-text class="publisher body-2 text-xs-right">
                        <v-divider class="pa-1"></v-divider>
                        {{content.publisher}}
                    </v-card-text>
                </div>
            </v-slide-y-transition>

        </v-card>
    </v-flex>
</template>

<script>
    export default {
        props: {
            contentData: {
                type: Object
            }
        },
        data() {
            return {
                showMore: false,
                content: this.contentData
            }
        },
    }
</script>

<style lang="scss" scoped>
    .v-card {
        background: white;
        margin: auto;
    }

    .publisher {
        position: absolute;
        bottom: 0;
    }

    .gradient-light-dark {
        background-image: linear-gradient(to top, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
    }
</style>