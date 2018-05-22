<template>
   <v-container>
     <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
         <h2 class="primary--text">Create a new meetup</h2>
       </v-flex>
     </v-layout>
     <v-layout row>
       <v-flex xs12>
         <form @submit.prevent="onCreateMeetup">
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="title"
                 label="title"
                 id="title"
                 v-model="title"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="location"
                 label="location"
                 id="location"
                 v-model="location"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="imageUrl"
                 label="imageUrl"
                 id="imageUrl"
                 v-model="imageUrl"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <img :src="imageUrl" height="150">
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="description"
                 label="description"
                 id="description"
                 v-model="description"
                 multi-line
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row class="mb-2">
             <v-flex xs12 sm6 offset-sm3>
               <h3>날짜와 시간 선택</h3>
             </v-flex>
           </v-layout>
           <v-layout row class="mb-2">
             <v-flex xs12 sm6 offset-sm3>
               <v-date-picker
                 v-model="date"
               ></v-date-picker>
               <p>{{ date }}</p>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-time-picker
                 v-model="time"
               ></v-time-picker>
               <p>{{ time }}</p>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-btn
                 class="primary"
                 :disabled="!formIsValid"
                 type="submit"
               >Create Meetup</v-btn>
               {{ submitTableDateTime }}
             </v-flex>
           </v-layout>
         </form>
       </v-flex>
     </v-layout>
   </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: null,
        time: new Date()
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      submitTableDateTime () {
        const date = new Date()
        console.log(date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(|d+)/)[1]
          const minutes = this.time.match(/:(|d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }

        console.log(date)
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: new Date()
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups/')
      }
    }
  }
</script>

<style scoped>

</style>
