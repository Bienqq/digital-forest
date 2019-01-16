import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "vue2-animate/dist/vue2-animate.min.css"

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')