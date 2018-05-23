import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken3, // #C62828
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC8CMw9u801FQG4dRQ6p43z5katAvu9Qpg',
      authDomain: 'meetup-78b46.firebaseapp.com',
      databaseURL: 'https://meetup-78b46.firebaseio.com',
      projectId: 'meetup-78b46',
      storageBucket: ''
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user) // 로그인 유지하기
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
