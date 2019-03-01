<template>
    <v-snackbar class="ml-2 mr-2" v-model="show" :timeout="3000" top>
        <v-img :src="iconComputed" contain height="40px" width="40px"></v-img>
        <span class="ml-5 title">{{ message }}</span>
    </v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                message: "",
                icon: null
            }
        },
        computed: {
            iconComputed: function(){
                if(this.icon != null){
                    return require(`@/assets/img/${this.icon}.png`)
                }
            }
        },
        created: function () {
            this.$store.watch(state => state.globalSnackbar.message, () => {
                const msg = this.$store.state.globalSnackbar.message
                if (msg !== "") {
                    this.show = true
                    this.message = this.$store.state.globalSnackbar.message
                    this.icon = this.$store.state.globalSnackbar.icon
                    this.$store.commit("showSnackbar", {
                        message: "",
                        icon: null
                    })
                }
            })
        }
    }
</script>

<style <style lang="scss" scoped>

</style>