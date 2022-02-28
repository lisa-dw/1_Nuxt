<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <shopping-detail-com
      id = "SPVeiwPageCom"
      :productId="productId"/>

    </v-col>
  </v-row>
</template>

<script>
import ShoppingDetailCom from "../../../components/shopping/shoppingDetailCom";
export default {
  name: "detail",
  components: {ShoppingDetailCom},
  data(){
    return {
      productId:"",
      productData: {

      }
    }
  },

  beforeMount() {

    console.log('beforeMount');

    const productId = this.$route.params.productId
    this.productId = this.$route.params.productId

    console.log(this.$route, '여긴 _productId.vue 파일' , typeof(this.productId));


  }


}
</script>

<style scoped>

</style>
