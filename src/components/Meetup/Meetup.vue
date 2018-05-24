<template>
    <v-container class="mt-0">
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
            v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12 sm6 md8 offset-sm3>
          <v-card>
            <v-card-title>
              <h2 class="primary--text">{{ meetup.title }}</h2>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
              </template>
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
              <app-meetup-register-dialog
                :meetupId="meetup.id"
                v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
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
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
