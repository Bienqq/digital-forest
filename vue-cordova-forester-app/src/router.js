import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from "./components/main-menu/MainMenu"
import EnterTheForest from "./components/enter-forest-menu/EnterTheForest"
import UserDashboard from "./components/user-dashboard/UserDashboard"

Vue.use(Router)

/*
Path rewriting etc does not work under Cordova, that's why it's important to use router 'hash' mode, 
if you run or build for Cordova. history mode does not work! 
The plugin already tries to fix this automatically...
*/


export default new Router({
  routes: [{
      path: "/",
      name: "MainMenu",
      component: MainMenu,
    },
    {
      path: "/enter-the-forest",
      name: "EnterTheForest",
      component: EnterTheForest,
    },
    {
      path: "/user-dashboard",
      name: "UserDashboard",
      component: UserDashboard
    }
  ]
})