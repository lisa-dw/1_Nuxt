<template>
  <div>
    <!-- 주문한 품목 리스트, 테이블 형식으로 보여줌. -->
    <div>
      <br>
       <h6>주문번호 : {{getUser.buyNumber}}</h6>
      <br>

      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th></th>
              <th>구매 목록</th>
              <th>구매 수량</th>
              <th>총 가격</th>
            </tr>
          </thead>

          <tbody>
          <tr
          v-for="(item) in getBuyList"
          :key="item.productId">
            <th><v-img :src="item.img" max-width="55"/></th>
            <th>{{item.productName}}</th> <!-- 구매하는 물품의 id 대신 이름을 가져오고 싶음. -->
            <th>{{item.counts}}</th>
            <th>{{item.sumPrice}}</th>
          </tr>
          </tbody>
        </template>
      </v-simple-table>

      <br><br>

      <v-simple-table>
        <thead>
          <tr>
            <th>총 구매 수량</th><!-- 총 물품 갯수 -->
            <th>결제할 금액</th><!-- 총 물품 가격 -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{this.sumCount}}</th>
            <th>{{this.sumPay}}</th>
          </tr>
        </tbody>
      </v-simple-table>

    </div>
    <hr><br><br>


  <!-- 배송지 기재 -->
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <!--이름 입력-->
      <v-text-field
        v-model="buy_user_inform.name"
        :rules="rules"
        label="성명"
        required
      ></v-text-field>
      <div class="span_padding" />


      <!--전화번호 입력-->
      <v-text-field
        v-model="buy_user_inform.phone"
        :rules="rules"
        label="전화번호"
        required
      ></v-text-field>

      <!--주소 입력-->
      <section class="test">
        <!--주소 검색색창-->
        <div class="post-box" v-if="postOpen" v>
          <template>
            <VueDaumPostcode @complete="oncomplete" />  <!-- 주소 검색창 -->
            <button id="closeBt" @click="close">창닫기</button> <!-- 창닫기 버튼 -->
          </template>
        </div>

        <!--주소 찾기-->
        <v-text-field
          id="zip"
          v-model="buy_user_inform.zip"
          :rules="rules"
          label="우편번호"
          v-on:click="search"
          required
        ></v-text-field>
      </section>


      <v-text-field
        id="address"
        v-model="buy_user_inform.address"
        :rules="rules"
        label="주소"
        required
      ></v-text-field>

      <v-text-field
        id="subAddress"
        v-model="buy_user_inform.subAddress"
        :rules="rules"
        label="상세주소"
        ref="address"
        required
      ></v-text-field>

      <!--결제창으로 가는  버튼-->
      <v-btn
        :disabled="!valid"
        @click="Buy"
      >
        결제
      </v-btn>


    </v-form>

  </div>
</template>

<script>
import axios from "axios";
import {VueDaumPostcode} from "vue-daum-postcode";

import {mapGetters} from 'vuex';

const Buylist_url = 'http://localhost:8000/api/buyLists';
const BuyInform_url = 'http://localhost:8000/api/buyUserInforms';
const PD_url = 'http://localhost:8000/api/products/';

export default {
  name: "shoppingBuyCom",

  components: {VueDaumPostcode},

  data() {
    return {
      product:[{
        id: '',         // 제품 번호
        stock:'',       // 재고
      }],

      buy_list:[{
        id:'',           //주문 번호
        product_id: '',  // 제품 번호    // product 테이블과 FK키
        productName:'',  //  제품 이름
        count:'',        // 갯수
        price:'',        // 총 가격
      }],

      // buy_user_inform: {
      //   id: this.getUser.id,
      //   buy_list_id: '', //  buy_list 테이블과 FK키
      //   created_at: '',
      // },

      buy_user_inform: {
        id: '',
        buy_list_id: '', //  buy_list 테이블과 FK키
        user_id: '',     //  user 테이블과 FK키
        name: '',
        phone: '',
        address: '',
        zip: '',
        subAddress: '',
        created_at: '',
      },

      rules: [
        v => !!v || '입력해주세요.'
      ],

      valid: true,
      postOpen: false,
      sumPay: 0,
      sumCount: 0,

    }
  },

  mounted() {

    this.change();
    this.sums();
    console.log('this.getBuyList')
    console.log(this.getBuyList)

  },

  computed:{

    ...mapGetters({
      getBuyList : 'buy/getBuyList',
      getBuyListCount :'buy/getBuyListCount',
      getUser: 'userState/getUser',

    }),

  },

  methods:{

    // 스토어의 변수들을 디비에 저장하기 위하여 현제 페이지의 data에
    // 다시 옮겨주는 메서드.
    async change(){

      console.log(this.getUser)

      this.buy_user_inform.user_id = this.getUser.userid
      this.buy_user_inform.name = this.getUser.name
      this.buy_user_inform.phone = this.getUser.phone
      this.buy_user_inform.zip = this.getUser.zip
      this.buy_user_inform.address = this.getUser.address
      this.buy_user_inform.subAddress = this.getUser.subAddress

      this.product.stock = this.product.stock

      console.log(this.buy_user_inform)

      console.log(this.getBuyList)

      // this.buy_list.count = this.getBuyList.counts
      // console.log(this.buy_list.count)


    },


    // 구매 버튼 메서드
    async Buy(){


      try{

        // 구매 목록 저장
        const res = await axios.post(Buylist_url+this.buy_list.id, {
          //...this.buy_list
          buyList: [{
            ...this.buy_list,
          }],
          // buyUser: {
          //   ...this.buy_user_inform,
          // },
        });

        console.log(res)

        // 구매자의 배송지 저장.
        const res2 = await axios.post(BuyInform_url+this.buy_user_inform.id, {
          ...this.buy_user_inform
        })

        // 구매자 정보 저장(user_id)

        console.log(res2)

        alert('구매가 완료되었습니다.')

        // 결제창 또는 어딘가로 가는 경로.
        await this.$router.push('');

      }catch (e){

        alert('구매에 실패하였습니다.')

      }
    },




    // 재고 - 구매수량 연산 메서드 ( 서버에서 재고를 가져와야 함 )
    // 각 물품당 재고 검사를 한번씩 해야 하는데, 맵퍼를 써서 돌려야 할까.. 아니면...
    // 우선 보류
    // async calcul(){
    //
    //   const page = await axios.get(PD_url+'/'+this.buy_list.product_id)
    //   this.product.stock = page.data.stock
    //
    //   this.resultStock = this.product.stock -= this.count;
    //   return this.resultStock
    // },


    //  // 총 가격, 갯수 계산 메서드
    async sums(){
      let ResultMap = this.getBuyList.map((x)=> { return x.sumPrice })
      this.sumPay = ResultMap.reduce((a, b) => a + b, 0)

      let ResultMap2 = this.getBuyList.map((x)=> { return x.counts })
      this.sumCount = ResultMap2.reduce((a, b) => a + b, 0)
    },



    // 주소 찾기 api 메서드
    // 컴포넌트로 나누고 싶지만... 시간이 좀 모자름...
    oncomplete: function (data) {
      if (data.userSelectedType === 'R') {
        this.user.address = data.roadAddress;  // 도로명 주소 선택
      } else {
        this.user.address = data.jibunAddress;  // 지번 주소 선택
      }

      if(data.userSelectedType === 'R'){
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
          this.user.subAddress += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if(data.buildingName !== '' && data.apartment === 'Y'){
          this.user.subAddress += (this.user.subAddress !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if(this.user.subAddress !== ''){
          this.user.subAddress = ' (' + this.user.subAddress + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // this.user.subAddress = this.user.subAddress;

      } else {
        this.user.subAddress = '';
      }
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      this.user.zip = data.zonecode;
      // this.user.address = this.user.address;
      this.$refs.address.focus();

      this.postOpen = false
    },

    // 주소찾기 메서드 ( search, oncomplete )
    search: function () {
      this.postOpen = true
    },

    // 주소찾기 api 창 닫기
    async close(){
      this.postOpen = false
    }
  },


}

</script>

<style scoped>

</style>
