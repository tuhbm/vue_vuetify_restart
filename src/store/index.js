import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://media.istockphoto.com/photos/time-square-new-york-city-picture-id487537456?k=6&m=487537456&s=612x612&w=0&h=voCuBVi_Kkf8zo50UjpqGNC714WkT3SwwczBzZPD8Us=', id: 'abcde', title: 'Meetup in New York', date: '2018-05-25', place: 'NewYork City Art center', text: 'The purpose of this meetup is for front-end developer fellowship. We look forward to your attendance.' },
      { imageUrl: 'https://asiatours.co/wp-content/uploads/2016/02/travel-tips-for-seoul-south-korea.jpg', id: 'fghij', title: 'Meetup in Seoul', date: '2018-05-24', place: '현대오토웨이타워 구글캠퍼스', text: '한국의 프론트 엔드 개발자들의 친목을 위한 모임입니다. 많은 참석 부탁드립니다. 블라블라.....' }
    ],
    user: {
      id: 'tkkim',
      registeredMeetups: ['seoul meetups - 180525']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'fdsfsa'
      }
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetupsAlign (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetupsAlign.slice(0, 5)
    },
    showLoadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
