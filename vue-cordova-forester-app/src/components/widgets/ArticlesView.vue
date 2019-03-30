<template>
    <v-container align-content-center>

        <v-layout align-center column fill-height width="100vw">
            <v-card width="96vw" class="vcard-options" color="rgba(240,240,240,1)">

                <main-article :content-data="contentList[0]" @showModal="handleModal('main-article', true)" />

                <h3 v-if="contentAmount >= 2" class="header pt-1 pl-2">Reszta aktualności:</h3>

                <h3 v-if="contentAmount == 0" class="header pt-1 pl-2">Aktualnie nie ma żadnych wpisów</h3>

                <v-article v-for="(content, index) in contentList.slice(1)" :content-data="content" :index="index" :key="content.id" />

            </v-card>


            <v-dialog v-model="turnOnArticleModal" lazy scrollable>
                <v-layout align-center d-block justify-center column>
                    <v-card class="py-1">
                        <component :is="articleModal" v-bind="articleModalProps" />
                    </v-card>
                </v-layout>
            </v-dialog>

        </v-layout>

        <router-view />

    </v-container>
</template>

<script>
    import MainArticle from "./MainArticle"
    import Article from "./Article"

    export default {
        components: {
            "main-article": MainArticle,
            "v-article": Article,
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
                articleModal: "",
                turnOnArticleModal: false,
            }
        },
        methods: {
            handleModal(article, visible) {
                this.turnOnArticleModal = visible
                if (visible == false) {
                    setTimeout(() => this.articleModal = article, 400)
                } else {
                    this.articleModal = article
                }
            },
        },
        computed: {
            articleModalProps: function() {
                if (this.articleModal !== "") {
                    return {
                        "content-data": this.contentList[0],
                        "description-visible": true,
                    }
                }
            }
        },
        created() {
            document.addEventListener("backbutton", () => {
                this.handleModal("", false)
            })
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