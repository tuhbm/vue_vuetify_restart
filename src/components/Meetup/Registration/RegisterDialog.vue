<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn class="primary" accent slot="activator">
      {{ userIsRegistered ? '참석취소' : '참석하기' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered"><v-icon left class="mr-2">info</v-icon>모임 참석을 취소하시겠습니까?</v-card-title>
            <v-card-title v-else><v-icon left class="mr-2">info</v-icon>모임에 참석하시겠습니까?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>나중에 언제든지 결정을 변경할 수 있습니다.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">취소</v-btn>
              <v-btn
                class="green--text darken-1"
                flat
                @click="onAgree">확인</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
