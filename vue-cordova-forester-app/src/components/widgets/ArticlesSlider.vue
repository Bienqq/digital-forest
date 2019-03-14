<template>
    <div >
        
        <v-card class="vcard" width="96%">

            <v-layout align-center row fill-height>
                <v-flex xs4>
                    <v-img :src="prop.thumbimg"> </v-img>
                </v-flex>
                <v-flex xs8>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{prop.headermsg}}</div>
                            <div class="actions">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <p> Czytaj więcej </p>
                                <v-btn icon>
                                    <v-icon> keyboard_arrow_right</v-icon>
                                </v-btn>
                            </v-card-actions>
                            </div>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "ArticlesSlider",
         props:['prop'],
        data() {
           
            return {
                show: false,
            };

        },

    }
</script>

<style scoped lang="scss">
.headline{
    position:relative;
    top:0vw;
    left:-2vw;
    font-size: 5vw !important;
}
    .vcard {
        background: white;
        margin: auto;
        padding-top:1vw;
        padding-bottom:8vw;
        padding-left:1vw;
        margin-bottom:2vw;
    }

   
    .actions{
      
        margin-bottom:-8vw !important;
        position:absolute;
        left:0;
        width:95vw;


    }
</style>