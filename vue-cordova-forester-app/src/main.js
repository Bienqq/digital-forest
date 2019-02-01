import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "vue2-animate/dist/vue2-animate.min.css"
import "./assets/Animations/Animations.css"
import initCordova from "./plugins" 

Vue.config.productionTip = false
Vue.use(Vuetify)

const initVue = () => new Vue({
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')


const isCordovaApp = (typeof window.cordova !== "undefined")

// If we are not in Cordova, manually trigger the deviceready event 
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent("deviceready"))
}

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  console.log("Ready, Render the App");
  if (isCordovaApp) {
    initCordova()
  }
  initVue();
});
