<template>
   <v-container>
     <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
         <h2 class="primary--text">새로운 모임 만들기</h2>
       </v-flex>
     </v-layout>
     <v-layout row>
       <v-flex xs12>
         <form @submit.prevent="onCreateMeetup">
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="title"
                 label="주제"
                 id="title"
                 v-model="title"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="location"
                 label="장소"
                 id="location"
                 v-model="location"
                 placeholder="주소 및 건물이름을 입력해주세요."
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="date"
                 label="날짜"
                 id="date"
                 v-model="date"
                 placeholder="예시: 2018-05-25"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-text-field
                 name="time"
                 label="시간"
                 id="time"
                 v-model="time"
                 placeholder="예시: 01:30 PM"
                 required></v-text-field>
             </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-btn
                 raised
                 class="primary ml-0"
                 @click="onPickFile">이미지 올리기</v-btn>
               <input
                 type="file"
                 style="display: none"
                 ref="fileInput"
                 accept="image/*"
                 @change="onFilePicked">
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
                 label="상세정보"
                 id="description"
                 v-model="description"
                 multi-line
                 no-resize
                 required></v-text-field>
             </v-flex>
           </v-layout>

           <!--<v-layout row class="mb-2">-->
             <!--<v-flex xs12 sm6 offset-sm3>-->
               <!--<v-date-picker-->
                 <!--v-model="date"-->
               <!--&gt;</v-date-picker>-->
               <!--<p>{{ date }}</p>-->
             <!--</v-flex>-->
           <!--</v-layout>-->
           <!--<v-layout row>-->
             <!--<v-flex xs12 sm6 offset-sm3>-->
               <!--<v-time-picker-->
                 <!--v-model="time"-->
               <!--&gt;</v-time-picker>-->
               <!--<p>{{ time }}</p>-->
             <!--</v-flex>-->
           <!--</v-layout>-->
           <v-layout row>
             <v-flex xs12 sm6 offset-sm3>
               <v-btn
                 class="primary ma-0"
                 :disabled="!formIsValid"
                 type="submit"
               >모임 만들기</v-btn>
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
        date: '',
        time: '',
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.date !== '' &&
          this.time !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      }
      // submitTableDateTime () {
      //   const date = new Date(this.date)
      //   if (typeof this.time === 'string') {
      //     const hours = this.time.match(/^(|d+)/)[1]
      //     const minutes = this.time.match(/:(|d+)/)[1]
      //     date.setHours(hours)
      //     date.setMinutes(minutes)
      //   } else {
      //     date.setHours(this.time.getHours())
      //     date.setMinutes(this.time.getMinutes())
      //   }
      //
      //   console.log(date)
      //   return date
      // }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.date,
          time: this.time
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('이미지 파일을 올려주세요.')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style scoped>

</style>
