export default function initPlugins(){ 
    cordova.plugins.backgroundMode.enable()
    window.screen.orientation.lock('portrait')
}