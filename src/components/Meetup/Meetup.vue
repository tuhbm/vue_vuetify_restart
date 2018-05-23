<template>
    <v-container class="mt-0">
      <v-layout row wrap>
        <v-flex xs12 sm6 md8 offset-sm3>
          <v-card>
            <v-card-title>
              <h2 class="primary--text">{{ meetup.title }}</h2>
            </v-card-title>
            <v-card-media
              :src="meetup.imageUrl"
              height="400px">
            </v-card-media>
            <v-card-text>
              <div class="info--text">{{ meetup.date }}   [ {{ meetup.time }} ]</div>
              <div class="mb-3 grey--text lighten-2">{{ meetup.location }}</div>
              <div class="pt-2 pb-2">{{ meetup.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary">참가신청</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.showLoadedMeetup(this.id)
      }
    }
  }
</script>

<style scoped>

</style>
