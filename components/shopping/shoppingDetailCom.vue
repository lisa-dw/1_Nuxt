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
      resultStock:'',

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



    // 구매 버튼을 눌렀을 때
    async buy(){

      if (this.count <= 0) {
        alert('수량을 다시 선택해주세요.')
        await this.$router.go()
      }
      else

      console.log('함수 실행됨?');

      // 재고 - 구매수량 연산 메서드 실행.
      await this.calcul();

      console.log('연산됨!');


      //object로
      let productInform = {
        productId : this.product.id,
        productName : this.product.productName,
        price : this.product.price,
        counts : this.count
      }

      //product의 stock -  구매한 물품의 수량을 확인하고,
      //구매 가능하면 구매 페이지로 넘어간다.
      if(this.resultStock >= 0) {

        console.log('스토어에 보내졌나?');
        this.$store.commit('buy/setBuyList', productInform)
        console.log('스토어에 보내졌다!');

        // alert('장바구니에 들어갔습니다.');

        //바로 구매 페이지로 넘어감
        await this.$router.push('/Shopping/buy');

      }
    },

    // 재고 - 구매수량 연산 메서드
    calcul(){
      console.log('calcul 함수 실행됨?');
      console.log(this.product.stock);
      console.log(this.count);

      this.resultStock = this.product.stock -= this.count;

      console.log('연산결과' + this.resultStock);

      return this.resultStock

    },

  },



}
</script>

<style scoped>

</style>
