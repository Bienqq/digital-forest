<template>
    <v-container align-content-center>

        <v-layout align-center column fill-height width="100vw">
            <v-card width="96vw" class="vcard-options" color="rgba(240,240,240,1)">

                <main-article :content-data="contentList[0]" />
                
                <h3 class="header pt-1 pl-2">Reszta aktualności:</h3>

                <v-article v-for="(content, index) in contentList.slice(1)" :content-data="content" :index="index" :key="content.id" />

            </v-card>

        </v-layout>
        <router-view />
    </v-container>
</template>

<script>
    import MainArtice from "./MainArticle"
    import Article from "./Article"

    export default {
        components: {
            "main-article": MainArtice,
            "v-article": Article
        },
        props: {
            contentList: {
                type: Array,
            },
            contentAmount: {
                type: Number
            }
        },
        data() {
            return {

            }
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
        margin-top: 10vw;
        padding-top: 1vw;
    }
</style>