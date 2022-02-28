<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    id ="form"
  >

    <!--아이디 입력-->
      <v-text-field
        v-model="user.userid"
        :rules="rules.userid"
        label="아이디"
        required
      ></v-text-field>
      <div class="span_padding" >
        <div v-show="this.validate.isUserIdDuplicated.show===false"> <!-- 처음 화면에 중복 메세지를  -->
          <span v-show="this.validate.isUserIdDuplicated.duplicate === false">사용할 수 없는 아이디 입니다</span>
        </div>
        <div v-show="this.validate.isUserIdDuplicated.show===true"/> <!-- -->
      </div>

    <!--비밀번호 입력-->
      <v-text-field
        v-model="user.password"
        :rules="rules.password"
        label="비밀번호"
        type="password"
        required
        @click="idConfirm"
      ></v-text-field>

    <v-text-field
      v-model="inputPw"
      :rules="rules.inputPw"
      label="비밀번호 확인"
      type="password"
      required
    ></v-text-field>
    <div class="span_padding" />

    <!--이름 입력-->
    <v-text-field
      v-model="user.name"
      :rules="rules.name"
      label="성명"
      required
    ></v-text-field>
    <div class="span_padding" />

    <!--이메일 입력-->
    <v-text-field
      v-model="user.email"
      :rules="rules.email"
      label="이메일"
      required
    ></v-text-field>
    <div class="span_padding">
      <div v-show="this.validate.isEmailDuplicated.show===false">
       <span v-show="this.validate.isEmailDuplicated.duplicate === false">사용할 수 없는 이메일입니다.</span>
      </div>
      <div v-show="this.validate.isEmailDuplicated.show===true"/>
    </div>

    <!--전화번호 입력-->
    <v-text-field
      v-model="user.phone"
      :rules="rules.phone"
      label="전화번호"
      required
      v-on:click="emailConfirm"
    ></v-text-field>
    <div class="span_padding">
      <div v-show="this.validate.isUserHpDuplicated.show===false">
         <span v-show="this.validate.isUserHpDuplicated.duplicate === false">사용할 수 없는 핸드폰 번호 입니다.</span>
      </div>
      <div v-show="this.validate.isUserHpDuplicated.show===true">'-' 제외</div>
    </div>


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
<!--      <div class="form-box">-->
        <v-text-field
          id="zip"
          v-model="user.zip"
          :rules="rules.zip"
          label="우편번호"
          v-on:click="search"
          required
        ></v-text-field>
<!--        <div v-on:click="search">주소 찾기</div>-->
<!--      </div>-->
    </section>


    <v-text-field
      id="address"
      v-model="user.address"
      :rules="rules.address"
      label="주소"
      required
    ></v-text-field>

    <v-text-field
      id="subAddress"
      v-model="user.subAddress"
      :rules="rules.address"
      label="상세주소"
      ref="address"
      required
      v-on:click="phoneConfirm"
    ></v-text-field>


    <!--회원가입 버튼-->
    <v-btn
      :disabled="!valid"
      color="success"
      @click="Join"
    >
      Join
    </v-btn>



   </v-form>
  </v-col>
</v-row>
</template>

<script>
import axios from 'axios';
import {VueDaumPostcode} from "vue-daum-postcode";

const URL_user = 'http://localhost:8000/api/users'

export default {
  name: "UserJoin",
  components: {VueDaumPostcode},
  data() {
    return {

      user: {
        userid: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        zip:'',
        subAddress:'',
        aa:'',

      },
      users: [],

      inputPw:'',
      postOpen: false,

      rules: {
        userid: [
          v => !!v || '아이디를 입력해주세요.',
          // v => v == /.+\w.+/ || '영문, 숫자만 가능합니다.',
          // v => v === /[A-Z]/ || '영문, 숫자만 가능합니다.',
          // v =>  /^[A-Za-z0-9]$/.test(v) || '영문, 숫자만 가능합니다.',
          v => (v && v.length >= 8) || '8자 이상 입력해주세요. 영문, 숫자만 가능 합니다.',

        ],
        name: [
          v => !!v || '이름을 입력해주세요.'
        ],
        password: [
          v => !!v || '비밀번호를 입력해주세요.',
          v => (v && v.length >= 8) || '8자 이상 입력해주세요. 영문, 숫자, 특수문자를 조합 해주세요.',
        ],
        inputPw:[
          v => v === this.user.password || '비밀번호 확인이 틀렸습니다.',
        ],
        email: [
          v => !!v || 'E-mail을 입력해주세요.',
          v => /.+@.+\..+/.test(v) || '올바르게 입력 해주세요.'
        ],
        phone: [
          v => !!v || '핸드폰 번호를 입력해주세요. (\'-\' 제외)',
          v => (v && v.length <= 11) || '핸드폰 번호를 다시 확인하세요. (\'-\' 제외)'
        ],
        address: [
          v => !!v || '주소를 입력해주세요.'
        ],
        zip: [
          v => !!v || '우편번호를 입력해주세요.'
        ],
      },

        valid: true,
        select: null,


      validate: {
        isEmailDuplicated: {
          duplicate: false,
          message: '이메일이 중복되었습니다',
          show: true,
        },
        isUserIdDuplicated: {
          duplicate: false,
          message: '아이디가 중복되었습니다',
          show: true,
        },
        isUserHpDuplicated: {
          duplicate: false,
          message: '핸드폰 번호가 중복되었습니다',
          show: true,
        }
      }


    }
  },
  computed: {

    duplicateCheck() {
      return this.validate.isUserIdDuplicated.duplicate && this.validate.isUserHpDuplicated.duplicate && this.validate.isEmailDuplicated.duplicate
    }, // ## 변수가 길어서 함수로 만든 것.

  },


  methods: {

    // 회원가입 메소드
    async Join(){

      this.$refs.form.validate()  // 유효성 검사 체크.

           try {
             const res = await axios.post(URL_user, {
               ...this.user,
             })
             alert("회원가입이 되었습니다.");
             await this.$router.push('/');

           } catch (e) {

             console.log(e.response)
             if (e.response.status === 422) {

               if (e.response.data.errors.userid) {
                 alert('아이디는 8자 이상, 영문, 숫자만 가능합니다.')
               }
               else if (e.response.data.errors.password) {
                 alert('비밀번호는 8자 이상, 영문, 숫자, 특수문자를 조합 해주세요.')
               }
               else if(e.response.data.errors.email){
                 alert('이메일을 올바르게 입력 해주세요.')
               }
               else if(e.response.data.errors.phone){
                 alert('전화번호를 올바르게 입력 해주세요.')
               }
               else if(e.response.data.errors.address){
                 alert('주소를 올바르게 입력 해주세요.')
               }
             }
           }
    },


    // id 중복확인 메소드
    async idConfirm(){

      this.validate.isUserIdDuplicated.duplicate = false; // .duplicate 값 초기화 시키기
      this.validate.isUserIdDuplicated.show = false;       // .show 값 초기화 시키기

      const res = await axios.get(`${URL_user}/checkUserId/${this.user.userid}`)

      console.log({res})
      if(res.data !== "") {
          this.validate.isUserIdDuplicated.duplicate = true;  // 서버에서 받은 값. 중복되는 데이터가 없으면 서버에서 1이 온다. res.data가 존재하면 true로 반환.
      }
    },


    // 이메일 중복확인 메소드
    async emailConfirm(){
      this.validate.isEmailDuplicated.duplicate = false;
      this.validate.isEmailDuplicated.show = false;

      const res = await axios.get(URL_user + '/checkUserEM/' + this.user.email)

      if(res.data) {
          this.validate.isEmailDuplicated.duplicate = true;
      }
    },

    // 전화번호 중복확인 메소드
    async phoneConfirm(){
      this.validate.isUserHpDuplicated.duplicate = false;
      this.validate.isUserHpDuplicated.show = false;

      const res = await axios.get(URL_user + '/checkUserPh/' + this.user.phone)

      if(res.data){
        this.validate.isUserHpDuplicated.duplicate = true;
      }
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

.span_padding{
  height: 20px;
  color: darkgray;
}

.form-box{
  border-color: dimgray;
  margin-top: 20px;
  font-weight: bold;
  height: 25px;
  width: 80px;
  text-align: center;
  background-color: lightgray;
}

#closeBt{
  height: 25px;
  width: 60px;
  text-align: center;
  background-color: gainsboro;
}

#form{
  margin-top: 30px;
}

</style>
