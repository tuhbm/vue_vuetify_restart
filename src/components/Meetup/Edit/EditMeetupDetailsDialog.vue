<template>
  <v-dialog
    width="350px"
    persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title class="headline">
              <v-icon left>edit</v-icon>
              모임 수정
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="주제"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="location"
                label="장소"
                id="location"
                v-model="editedLocation"
                required></v-text-field>
              <v-text-field
                name="date"
                label="날짜"
                id="date"
                v-model="editedDate"
                required></v-text-field>
              <v-text-field
                name="time"
                label="시간"
                id="time"
                v-model="editedTime"
                required></v-text-field>
              <v-text-field
                name="description"
                label="상세정보"
                id="description"
                v-model="editedDescription"
                multi-line
                no-resize
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">취소</v-btn>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="onSaveChanges">저장</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editedLocation: this.meetup.location,
      editedDate: this.meetup.date,
      editedTime: this.meetup.time
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' ||
        this.editedDescription.trim() === '' ||
        this.editedLocation.trim() === '' ||
        this.editedDate.trim() === '' ||
        this.editedTime.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
        location: this.editedLocation,
        date: this.editedDate,
        time: this.editedTime
      })
    }
  }
}
</script>

<style scoped>

</style>
