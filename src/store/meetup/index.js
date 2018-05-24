import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media.istockphoto.com/photos/time-square-new-york-city-picture-id487537456?k=6&m=487537456&s=612x612&w=0&h=voCuBVi_Kkf8zo50UjpqGNC714WkT3SwwczBzZPD8Us=',
        id: 'abcde',
        title: 'Meetup in New York',
        date: '2018-05-25',
        time: '12:00 PM',
        location: 'NewYork City Art center',
        description: 'The purpose of this meetup is for front-end developer fellowship. We look forward to your attendance.'
      },
      {
        imageUrl: 'https://asiatours.co/wp-content/uploads/2016/02/travel-tips-for-seoul-south-korea.jpg',
        id: 'fghij',
        title: 'Meetup in Seoul',
        date: '2018-05-24',
        time: '12:00 PM',
        location: '현대오토웨이타워 구글캠퍼스',
        description: '한국의 프론트 엔드 개발자들의 친목을 위한 모임입니다. 많은 참석 부탁드립니다. 블라블라.....'
      }
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.time) {
        meetup.time = payload.time
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            time: obj[key].time,
            location: obj[key].location,
            description: obj[key].description,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      if (payload.time) {
        updateObj.time = payload.time
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
