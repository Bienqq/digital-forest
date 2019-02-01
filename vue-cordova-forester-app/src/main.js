import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "vue2-animate/dist/vue2-animate.min.css"
import "./assets/Animations/Animations.css"
import 'animate.css'
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)

const init = () => new Vue({
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  console.log("Ready, Render the App");
  init();
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}