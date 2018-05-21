<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      fixed
      app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetUp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          <v-icon left>supervisor_account</v-icon>
          View Meetups
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>

    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>
