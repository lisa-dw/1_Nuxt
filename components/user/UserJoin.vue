<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >


      <v-text-field
        v-model="user.userid"
        :counter="10"
        :rules="rules.userid"
        label="아이디"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="rules.password"
        label="비밀번호"
        required
      ></v-text-field>

    <v-text-field
      v-model="user.password"
      label="비밀번호 입력 확인"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.name"
      :rules="rules.name"
      label="성명"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="rules.email"
      label="이메일"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.phone"
      :rules="rules.phone"
      label="전화번호"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.address"
      :rules="rules.address"
      label="주소"
      required
    ></v-text-field>

    <!---->
    <v-btn
      :disabled="!valid"
      color="success"
      @click="Join"
    >
      회원가입
    </v-btn>




  </v-form>
</template>

<script>
import axios from 'axios'

const URL_user = 'http://localhost:8000/api/users'

export default {
  name: "UserJoin",

  data() {
    return {

      user: {
        userid: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        address: '',

      },
      users: [],


      rules: {
        userid: [
          v => !!v || 'ID is required',
          v => (v && v.length < 8) || '8자 이상 입력해주세요.'
        ],
        name: [
          v => !!v || 'Name is required'
        ],
        password: [
          v => !!v || 'Name is required',
          v => (v && v.length < 8) || '8자 이상 입력해주세요.'
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        phone: [
          v => !!v || 'phone Number is required',
          v => (v && v.length <= 11) || '핸드폰 번호를 다시 확인하세요.'
        ],
        address: [
          v => !!v || 'address is required'
        ],
      },

        valid: true,
        select: null,


        // sites: [
        //   'naver.com',
        //   'ilark.com',
        //   'google.com',
        //   '직접 입력',
        // ],

    }
  },


  methods: {

    async Join(){
      console.log('함수실행')
      const res = await axios.post(URL_user, {

        ...this.user,

      })
        console.log('가입하기')
        console.log(res)
    },


    async get(){
      const res = await axios.get(URL_user)
      this.users = res.data
    },

  },





}
</script>
