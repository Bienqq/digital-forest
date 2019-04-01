<template>
    <v-dialog id="modal-dialog" full-width lazy scrollable v-model="show">
        <v-layout column fill-height>
            <v-card>
                <main-article :content-data="contentData" :description-visible="true" />
            </v-card>
        </v-layout>
    </v-dialog>
</template>

<script>
    import MainArticle from "./MainArticle"

    export default {
        props: {
            contentData: {
                type: Object
            },
        },
        data() {
            return {
                show: true,
            }
        },
        components: {
            "main-article": MainArticle,
        },
        methods: {

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

</style>