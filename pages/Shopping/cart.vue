<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <shopping-cart-com/>

    </v-col>
  </v-row>
</template>

<script>
import ShoppingCartCom from "../../components/shopping/shoppingCartCom";

export default {
  name: "cart",
  components: {ShoppingCartCom},
}
</script>

<style scoped>

</style>
