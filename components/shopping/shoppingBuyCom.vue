<template>
  <div>
    <!-- 주문한 품목 리스트, 테이블 형식으로 보여줌. -->
    <div>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th>구매 목록</th>
              <th>구매 수량</th>
              <th>총 가격</th>
            </tr>
          </thead>

          <tbody>
          <tr>
            <th>{{buy_list.product_id}}</th> <!-- 구매하는 물품의 id 대신 이름을 가져오고 싶음. -->
            <th>{{buy_list.count}}</th>
            <th>{{buy_list.price}}</th>
          </tr>
          </tbody>
        </template>
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
        <div class="post-box" v-if="postOpen">
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

const Buylist_url = 'http://localhost:8000/api/buyLists';
const BuyInform_url = 'http://localhost:8000/api/buyUserInforms';

export default {
  name: "shoppingBuyCom",

  components: {VueDaumPostcode},

  data() {
    return {
      product:{
        stock:'',
      },

      buy_list:{
        id:'',          //주문 번호
        product_id: '', // 제품 번호
        count:'',       // 갯수
        price:'',       // 총 가격
      },

      buy_lists: [],

      buy_user_inform: {
        id:'',
        buy_list_id: '', //  buy_list 테이블과 FK키
        name: '',
        phone: '',
        address: '',
        zip: '',
        subAddress: '',
        created_at: '',
      },

      buy_user_informs: [],

      rules: [
        v => !!v || '입력해주세요.'
      ],

      valid: true,
      postOpen: false,

    }
  },

  methods:{
    async Buy(){

      // // 구매 목록 저장
      // const res = await axios.post(Buylist_url+this.buy_list.id, {
      //   ...this.buy_list
      // });

      // 구매자의 배송지 저장.
      const res2 = await axios.post(BuyInform_url+this.buy_user_inform.id, {
        ...this.buy_user_inform
      })

      // 결제창 또는 어딘가로 가는 경로.
      await this.$router.push('');

    },


    // 주소 찾기 api 메서드
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

    async close(){
      this.postOpen = false
    }
  },


}

</script>

<style scoped>

</style>
