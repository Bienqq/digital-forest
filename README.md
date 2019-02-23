# Cordova-vue-forester-app

Based on: [vue-cli-plugin-cordova](https://github.com/m0dch3n/vue-cli-plugin-cordova)

## Our API on heroku: [swagger-ui](https://forester-node-server.herokuapp.com/api-docs)


## required dependencies
* Node.js with npm
* Gradle
* Android virtual device (AVD)
* Vue CLI
* Cordova

## Install dependencies

```sh
npm install #Install required dependencies
```

## How to run
```sh
npm install -g cordova # If cordova is not already installed
vue add cordova # Adding cordova to Vue project
npm run cordova-serve-android # Development Android
npm run cordova-build-android # Build Android
npm run cordova-serve-browser # Development Browser
npm run cordova-build-browser # Build Browser
npm run cordova-prepare # prepare for build
```
