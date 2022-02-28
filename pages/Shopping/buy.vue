<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <shopping-buy-com/>

    </v-col>
  </v-row>
</template>

<script>
import ShoppingBuyCom from "../../components/shopping/shoppingBuyCom";
export default {
  name: "buy",
  components: {ShoppingBuyCom}
}
</script>

<style scoped>

</style>
