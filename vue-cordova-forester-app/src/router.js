import Vue from "vue"
import Router from "vue-router"

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
            component: () => import("@/views/MainMenu")
        },
        {
            path: "/enter-the-forest",
            name: "EnterTheForest",
            component: () => import("@/views/EnterTheForest")
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () => import("@/views/Dashboard")
        }
    ]
})