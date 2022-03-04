<template>
  <v-container>
    <v-row justify="center" align="center">

          <v-col
            v-for="item in product"
            :key="item.productName"
            cols="12"
            sm="4"
          >

            <!-- 시작 -->
            <v-card

              class="mx-auto my-12"
              max-width="300"
              height="470"
              id="Card"
              link :to="`/Shopping/view/${item.id}`"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <!--상품이미지-->
              <v-img
                height="250"
                :src="item.productImage"
              ></v-img>

              <!--상품명-->
              <v-card-title><b>{{ item.productName}}</b></v-card-title>

              <v-divider class="mx-4"></v-divider>
              <!--# 하단 시작-->

              <!--하단 제목-->
              <v-card-title>{{ item.title }}</v-card-title>

              <!--별점, 주소, 가게설명-->
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >

                </v-row>


                <div>{{ item.grade }}</div> <br>
                <b><div>1kg당 {{ item.price }}원</div></b>
              </v-card-text>


            </v-card>


        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const PD_url = 'http://localhost:8000/api/products';

export default {
  name: "shoppingMainCom",

  data(){
    return{

      product:{
        id:'',
        productName:'',
        price:'',
        grade:'',
        stock:'',
        title:'',
        productImage:'',
        contents:'',

      },
      products:[],


    }
  },

  mounted() {
    this.readData();
  },


  methods:{

    // 전체 데이터 가져오기.
    async readData(){

      console.log('잘 가져옴?');
      console.log(PD_url);
      console.log(this.$axios);


      const page = await axios.get(PD_url)
      // const page_ = axios this.$axios.get()
      console.log(page);
      this.product = page.data

      console.log('잘 가져옴!');
    },

    // async buy(){
    //
    // },
  },


}

</script>


<style scoped>



#Card{
  margin-right: 20px !important;
  margin-left: 20px !important;
}

</style>
