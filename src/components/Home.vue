<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large router to="/meetups" class="info">모임 둘러보기</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large router to="/meetup/new" class="info">모임 만들기</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
            v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 v-if="!loading && meetups.length !== 0">
          <v-carousel style="cursor: pointer">
            <v-carousel-item
              v-for="meetup in meetups"
              :src="meetup.imageUrl"
              :key="meetup.id"
              @click.native="onLoadMeetup(meetup.id)">
              <div class="title">
                {{ meetup.title }}
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex
          xs12
          v-if="!loading && !meetups.length"
          class="mt-5 mb-5">
          <p class="display-2 text-xs-center">현재 등록된 모임이 없습니다.</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 class="text-xs-center">
          <p class="display-3">우리 모임에 참석해보세요!</p>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.featureMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
.title{
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-size: 2em;
  padding-top: 10px;
  width: 100%;
}
</style>
