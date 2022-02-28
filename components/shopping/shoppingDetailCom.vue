<template>
<div>
  <v-simple-table>

<tr>
  <td>
    <v-img
      max-height="150"
      max-width="250"
      :src="product.productImage"
    ></v-img>
  </td>

  <td>
    <h1>{{product.title}}</h1> <br>
  {{product.contents}}<br>
  {{product.productName}}<br>
  {{product.price}} <br>

  <button v-on:click="count -= 1" style="width: 10px">-</button>
    {{buy_list.count}}
  <button v-on:click="count += 1">+</button> <br>

  </td>
</tr>
  </v-simple-table>

  <v-btn @click="buy">Buy</v-btn>
  </div>
</template>

<script>
import axios from "axios";

const PD_url = 'http://localhost:8000/api/products/';
const buy_url = 'http://localhost:8000/api/buyLists';

export default {
  name: "shoppingDetailCom",

  data(){
    return{

      product:{
        id:'',
        productName:'',
        price:'',
        stock:'',
        title:'',
        productImage:'',
        contents:'',
       },

      products:[],

      buy_list: {
        count:1,
        price:'',
      },


    }
  },

  mounted() {
    this.readData();
    // console.log(this.$store.state['buy'].buylist);
    // this.$store.commit('buy/addProduct', this.product.productName, this.count)
  },

  computed:{
    // 재고 수 연산하기


  },

  methods:{



    // 전체 데이터 가져오기.
    async readData(){

      console.log('잘 가져옴?');
      console.log(PD_url);
      console.log(this.$route.params.productId);

      const page = await axios.get(PD_url+this.$route.params.productId);
      console.log(page);
      console.log(page.data);

      this.product = page.data
      console.log(this.product.stock);

      console.log('잘 가져옴!');
    },


    async buy(){

      console.log('함수 실행됨?');

      await this.calcul();

      console.log('연산됨!');


      // this.$store.dispatch('buy/addProduct', this.product.productName, this.count)

      // ...mapMutations({
      //   addProduct: 'buy/addProduct',
      // });

      //product의 stock -  구매한 물품의 수량을 확인하고,
      //구매 가능하면 구매 페이지로 넘어간다.

      console.log('연산결과2' + this.product.stock);


      if(this.product.stock =! 0) {
        console.log('저장 되었나?');
        // 구매 목록 저장
        // await axios.post(Buylist_url + this.buy_list.id, {
        //   ...this.buy_list
        // });
        console.log('저장 되었음!');
        await this.$router.push('/Shopping/buy');
      }
    },

    calcul(){
      console.log('calcul 함수 실행됨?');
      console.log(this.product.stock);
      console.log(this.count);

      this.product.stock = this.product.stock -= this.count;
      console.log('연산결과' + this.product.stock);
      return this.product.stock;
    },

  },



}
</script>

<style scoped>

</style>
