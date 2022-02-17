<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
        <v-card-title class="headline">
          게시판
        </v-card-title>

        <v-card-text>

        </v-card-text>



        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
          >
            새글 쓰기
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-col>
  </v-row>

<!--    <v-data-table>-->

<!--        :headers="headers"-->
<!--        :items="writeInforms"-->
<!--        :search="search"-->

<!--    </v-data-table>-->

<!--    <v-card-title>-->

<!--      <v-spacer></v-spacer>-->
<!--      <v-text-field-->
<!--        id="searchPart"-->
<!--        v-model="search"-->
<!--        append-icon="mdi-magnify"-->
<!--        label="Search"-->
<!--        single-line-->
<!--        hide-details-->
<!--      ></v-text-field>-->
<!--    </v-card-title>-->

<!--  </v-card>-->

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "NewsMainList2",
  // data: () => ({
  // }),
  // computed: {
  //   ...mapGetters('consults', ['getConsults']),
  //   consult() {
  //     const id = this.$route.params.id
  //     return this.getConsults.filter((e) => e.id == id)[0]
  //   }
  // },
  // mounted () {
  //   this.get_consults()
  // },
  // methods: {
  //   get_consults() {
  //     this.$store.dispatch('consults/index_consults')
  //       .then((resp) => {
  //       })
  //   }
  //
  // }
}
</script>

<style scoped>

</style>
