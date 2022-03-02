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
    {{count}}
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
      count:1,

    }
  },

  mounted() {
    this.readData();
    // console.log(this.$store.state['buy'].buylist);
    // this.$store.commit('buy/addProduct', this.product.productName, this.count)
  },

  computed:{
    // ...mapGetters({
    //   getBuy: 'modules/buyStore/getBuy'
    // })
  },

  methods:{
    // ...mapActions({
    //   buyAc: 'modules/buyStore/buyAc'
    // }),



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

      // 재고 - 구매수량 연산 메서드 실행.
      await this.calcul();

      console.log('연산됨!');


      //object로
      let samplePayload = {
        productName : 'productName',
        price : 1000,
        count : 3
      }

      //object로
      let test = {
        productName : this.product.productName,
        price : this.product.price,
        count : this.count
      }

      //array 형태로 저장됨.
      let samplePayloadArr = [
        {
          productName : 'productName',
          price : 1000,
          count : 3
        },
        {
          productName : 'productName',
          price : 1000,
          count : 3
        }
      ]



      // 밑에 둘 중 하나 쓰면 됨!
      //buy.js 와 이어져 있음!!!!!ㅜㅜ 힘드러따......ㅜㅜ
      // this.$store.dispatch('buy/addTodo', samplePayloadArr)
      this.$store.commit('buy/setTodo', test)


      console.log('스토어에 보내졌나?');


      //product의 stock -  구매한 물품의 수량을 확인하고,
      //구매 가능하면 구매 페이지로 넘어간다.
      if(this.product.stock >= 0) {
        // console.log('저장 되었나?');
        // // 구매 목록 저장
        // await axios.post(Buylist_url + this.buy_list.id, {
        //   ...this.buy_list
        // });
        // console.log('저장 되었음!');

        // await this.$router.push('/Shopping/buy');
      }
    },

    // 재고 - 구매수량 연산 메서드
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
