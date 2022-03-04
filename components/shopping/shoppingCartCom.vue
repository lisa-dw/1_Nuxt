<template>
  <div>

    <br> <h1> 장바구니 </h1> <br>
    <h5>장바구니 번호 : {{getUser.cartNumber}}</h5> <br>

<!-- 물품 리스트 테이블 -->
  <v-simple-table>
    <thead>
    <tr>
      <th><v-checkbox v-model="allChecked" @click="all(this)"/></th>
      <th></th>
      <th> 주문 상품 </th>
      <th> 수량  </th>
      <th> 총 가격 </th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(item) in getBuyList"
      :key="item.productId">
     <th> <v-checkbox v-model="checked" :value="item.productId" /> </th>
      <th> <v-img max-width="50" :src="item.img"/></th>
      <th> {{item.productName }} </th>
      <th> {{item.counts}} </th>
      <th> {{item.sumPrice}} </th>

<!--      <th> <button @click="removeBuy(item.productId)"></button> </th>-->
    </tr>
    </tbody>

  </v-simple-table>


<!-- 합산 확인 리스트 테이블 -->
    <br><br>
    <v-simple-table>
      <thead>
        <tr>
          <th> 총 물품 갯수 </th>
          <th> 총 가격 </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{this.sumCount}} 개</th>
          <th>{{this.sumPay}} 원</th>
        </tr>
      </tbody>
    </v-simple-table>


<!-- 삭제, 구매 버튼 -->
    <br><br>
    <v-btn id="btn" @click="clear" > 전체 삭제 </v-btn>
    <v-btn id="btn" @click="remove" > 선택 삭제 </v-btn>

    <v-btn @click="buy"> BUY </v-btn>

  </div>
</template>

<script>


import {mapGetters, mapMutations} from "vuex";

export default {
  name: "shoppingCartCom",

  data(){
    return{

      sumPay: 0,
      sumCount: 0,
      forPay : '/Shopping/buy',

      checked : [], // 체크된 목록들

      deletes: [],

      checkedNames: [],
      makeNum1: '',

      // allChecked: false,

    }
  },

  mounted() {

    this.sums();

  },

  computed:{

    ...mapGetters({
      getBuyList : 'buy/getBuyList',
      getBuyListCount : 'buy/getBuyListCount',
      getUser: 'userState/getUser'
    }),

  },


  methods:{

    // 스토어 뮤테이션들
    ...mapMutations({
      removeBuy : 'buy/removeBuyList',
      clearBuy : 'buy/clearBuyList',
    }),


    // 선택 삭제 버튼
    async remove(){
      this.removeBuy(this.checked);
      // 삭제시 총 물품 갯수, 총 가격 다시 재 계산.
      this.sums();
    },

    // 전체 삭제 버튼
    async clear(){
      this.clearBuy();
      this.sums();
    },

    // 구매 버튼
    async buy(){

      // console.log(this.sumPay)
      // console.log(this.sumCount)
      //
      // let sums = {
      //   sumPay : this.sumPay,
      //   sumCount : this.sumCount
      // }
      //
      // console.log('sums')
      // console.log(sums)

      // // 왜 안되는지......ㅜㅜ
      // this.$store.commit('buy/setBuySum', sums)
      // console.log('여기가 안되는건가?..')

      // 만약에 유저 스토어에 buyNumber가 없다면.
      console.log('this.getUser.buyNumber')
      console.log(this.getUser.buyNumber)

      if(this.getUser.buyNumber == null || this.getUser.buyNumber === '') {
        //랜덤숫자 만드는 메서드 실행
        this.makeNumber();

        let buyNumber2 = this.makeNum1 + '1'
        this.$store.commit('userState/setBuyNumber', buyNumber2)
      }

      await this.$router.push('/Shopping/buy')
    },


    // 총 가격 계산 메서드
    // this.getBuyList의 모든 인덱스의 sumPrice 키의 값들을 다시 배열로 만들고,
    // 그 배열 안의 값들을 다 더해준 것.
    // sumPrices() {
    //   let ResultMap = this.getBuyList.map((x)=> { return x.sumPrice })
    //   this.sumPay = ResultMap.reduce((a, b) => a + b, 0)
    //
    //   return this.sumPay
    // },
    //
    // sumCounts(){
    //   let ResultMap2 = this.getBuyList.map((x)=> { return x.counts })
    //   this.sumCount = ResultMap2.reduce((a, b) => a + b, 0)
    //
    //   return this.sumCount
    // },
    sums(){
      let ResultMap = this.getBuyList.map((x)=> { return x.sumPrice })
      this.sumPay = ResultMap.reduce((a, b) => a + b, 0)

      let ResultMap2 = this.getBuyList.map((x)=> { return x.counts })
      this.sumCount = ResultMap2.reduce((a, b) => a + b, 0)
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
    },

    // 체크박스 전체 선택 구현 하려고 했으나.....
    all(all){
      const checks = document.querySelectorAll('v-checkbox');
      checks.forEach((checkbox) => {checkbox.checked = all.checked
      })
    },


  },


}
</script>



<style scoped>

#btn{
  margin : 5px
}

</style>
