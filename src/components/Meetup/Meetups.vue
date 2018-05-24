<template>
  <v-container>
    <v-layout
      class="mb-2"
      row
      wrap
      v-for="meetup in meetups"
      :key="meetup.id">
      <v-flex xs12 sm10 md10 lg10 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="meetup.imageUrl"
                  height="144px">
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title class="text-lg-left">
                  <div>
                    <h2 class="white--text mb-0">{{ meetup.title }}</h2>
                    <div>{{ meetup.date }}   [ {{ meetup.time }} ]</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meetup.id">
                    <v-icon left light>arrow_forward</v-icon>
                    모임 상세보기
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>

<style scoped>

</style>
