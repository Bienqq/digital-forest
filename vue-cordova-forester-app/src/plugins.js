export default function initPlugins(){ 
    cordova.plugins.backgroundMode.enable()
    document.addEventListener("backbutton",()=>{
     alert("backbuttonClicked")
    })
}