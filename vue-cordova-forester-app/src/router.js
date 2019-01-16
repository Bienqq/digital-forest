import Vue from 'vue'
import Router from 'vue-router'
import ProfilesView from "./components/main-menu/ProfilesView"
import EnterTheForest from "./components/enter-forest-menu/EnterTheForest"

Vue.use(Router)

/*
Path rewriting etc does not work under Cordova, that's why it's important to use router 'hash' mode, 
if you run or build for Cordova. history mode does not work! 
The plugin already tries to fix this automatically...
*/


export default new Router({
  routes: [{
      path: "/",
      name: "ProfilesView",
      component: ProfilesView,
    },
    {
      path: "/enter-the-forest",
      name: "EnterTheForest",
      component: EnterTheForest,
    }
  ]
})