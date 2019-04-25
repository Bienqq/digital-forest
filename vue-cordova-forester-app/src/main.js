import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import initCordova from "./config/plugins"
import http from "./config/http"

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
    iconfont: 'md'
})

Vue.use(Vuex)
Vue.use(http)

const initVue = () => new Vue({
    router,
    store,
    components: {
        App
    },
    render: h => h(App),
}).$mount('#app')

const isCordovaApp = (typeof window.cordova !== "undefined")

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
    console.log("Ready, Render the App");
    if (isCordovaApp) {
        initCordova()
    }
    initVue();
});

// If we are not in Cordova, manually trigger the deviceready event 
if (!isCordovaApp) {
    document.dispatchEvent(new CustomEvent("deviceready"))
}