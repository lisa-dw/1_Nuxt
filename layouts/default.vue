<template>
  <v-app>

    <layouts-header/>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <layouts-footer/>

  </v-app>
</template>

<script>
import LayoutsFooter from "../components/layouts/layoutsFooter";
import LayoutsHeader from "../components/layouts/layoutsHeader";
export default {
  name: 'DefaultLayout',

  components: {LayoutsHeader, LayoutsFooter},

}
</script>
