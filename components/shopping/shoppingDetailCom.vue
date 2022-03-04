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

  <v-btn @click="cart">CART</v-btn>
  <v-btn @click="buy">BUY</v-btn>
  </div>
</template>



<script>
import axios from "axios";
import {mapGetters} from "vuex";

const PD_url = 'http://localhost:8000/api/products/';

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

      makeNum1: '',


    }
  },

  mounted() {
    this.readData();
    // console.log(this.$store.state['buy'].buylist);
    // this.$store.commit('buy/addProduct', this.product.productName, this.count)
  },

  computed:{
    ...mapGetters({
      getUser: 'userState/getUser'
    })
  },

  methods:{

    // 전체 데이터 가져오기.
    async readData(){

      const page = await axios.get(PD_url+this.$route.params.productId);
      this.product = page.data

    },

    // 장바구니 버튼을 클릭했을 때
    async cart(){

      if (this.count <= 0)
          {
            alert('수량을 다시 선택해주세요.')
          }
      else {
          // 재고 - 구매수량 연산 메서드 실행.
          await this.calcul();

          //object로
          let productInform = {
            productId : this.product.id,
            productName : this.product.productName,
            price : this.product.price,
            sumPrice : this.product.price * this.count,
            counts : this.count,
            img : this.product.productImage
          }

        console.log('this.getUser.cartNumber')
          console.log(this.getUser.cartNumber)

        // 만약에 유저 스토어에 cartNumber가 없다면.
        if(this.getUser.cartNumber == null || this.getUser.cartNumber === '') {
          //랜덤숫자 만드는 메서드 실행
          this.makeNumber();
          let buyNumber = this.makeNum1 + '2'
          console.log('buyNumber')
          console.log(buyNumber)
          this.$store.commit('userState/setCartNumber', buyNumber)
        }

        // 만약에 해당 상품에 재고가 남아있다면, 상품의 정보를 buy 스토어에 저장해라.
        if(this.resultStock >= 0) {
          this.$store.commit('buy/setBuyList', productInform)

            alert('장바구니에 추가 되었습니다.')
          }
      }

    },


    // 구매 버튼을 눌렀을 때
    async buy(){

      if (this.count <= 0)
      {
        alert('수량을 다시 선택해주세요.')
      }
      else
      {

        console.log('어디가 안되는거야??')
        // 재고 - 구매수량 연산 메서드 실행.
        await this.calcul();

        //object로
        let productInform2 = {
          productId : this.product.id,
          productName : this.product.productName,
          price : this.product.price,
          sumPrice : this.product.price * this.count,
          counts : this.count,
          img : this.product.productImage
        }

        console.log('this.getUser.buyNumber')
        console.log(this.getUser.buyNumber)

        // 만약에 유저 스토어에 buyNumber가 없다면.
        if(this.getUser.buyNumber == null || this.getUser.buyNumber === '') {
          //랜덤숫자 만드는 메서드 실행
          this.makeNumber();

          let buyNumber2 = this.makeNum1 + '1'
          this.$store.commit('userState/setBuyNumber', buyNumber2)
        }

        //product의 stock -  구매한 물품의 수량을 확인하고,
        //구매 가능하면 구매 페이지로 넘어간다.
        if(this.resultStock >= 0) {
          this.$store.commit('buy/setBuyList', productInform2)

          //바로 구매 페이지로 넘어감
          await this.$router.push('/Shopping/buy');
        }
      }

    },


    // 재고 - 구매수량 연산 메서드
    calcul(){
      this.resultStock = this.product.stock -= this.count;
      return this.resultStock
    },


    // 장바구니/ 카트 아이디 만드는 메서드
    makeNumber(){
      let today = new Date()
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);
      let hours = ('0' + today.getHours()).slice(-2);
      let minutes = ('0' + today.getMinutes()).slice(-2);
      let seconds = ('0' + today.getSeconds()).slice(-2);
      this.makeNum1 = year + month + day + hours + minutes + seconds + this.getUser.id
    }

  },

}
</script>



<style scoped>

</style>
