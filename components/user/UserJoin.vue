<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >


      <v-text-field
        v-model="user.userid"
        :rules="rules.userid"
        label="아이디"
        required
      ></v-text-field>


      <v-text-field
        v-model="user.password"
        :rules="rules.password"
        label="비밀번호"
        type="password"
        required
      ></v-text-field>

    <v-text-field
      v-model="inputPw"
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

    <v-btn
      color="success"
      @click="idConfirm"
    >
      아이디 중복확인
    </v-btn>
    <v-btn
      color="success"
      @click="emailConfirm"
    >
      이메일 중복확인
    </v-btn>
    <v-btn
      color="success"
      @click="phoneConfirm"
    >
      핸드폰번호 중복확인
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

      inputPw:'',


      rules: {
        userid: [
          v => !!v || '아이디를 입력해주세요.',
          v => (v && v.length >= 8) || '8자 이상 입력해주세요. 영문, 숫자만 가능 합니다.',
          v => /.+[A-Za-z0-9].+/ || '영문, 숫자만 가능합니다.',
        ],
        name: [
          v => !!v || '이름을 입력해주세요.'
        ],
        password: [
          v => !!v || '비밀번호를 입력해주세요.',
          v => (v && v.length >= 8) || '8자 이상 입력해주세요. 영문, 숫자, 특수문자를 조합 해주세요.',
          // v => (v && ) || '',
        ],
        email: [
          v => !!v || 'E-mail을 입력해주세요.',
          v => /.+@.+/.test(v) || '올바르게 입력 해주세요.'
        ],
        phone: [
          v => !!v || '핸드폰 번호를 입력해주세요.',
          v => (v && v.length <= 11) || '핸드폰 번호를 다시 확인하세요.'
        ],
        address: [
          v => !!v || '주소를 입력해주세요.'
        ],
      },

        valid: false,
        select: null,


    }
  },


  methods: {

    // 회원가입 메소드
    async Join(){

      const res1 = await axios.get(URL_user + '/checkUserId/' + this.user.userid)
      let idCon = res1.data

      const res2 = await axios.get(URL_user + '/checkUserEM/' + this.user.email)
      let emailCon = res2.data

      const res3 = await axios.get(URL_user + '/checkUserPh/' + this.user.phone)
      let phoneCon = res3.data



          if(this.inputPw == this.user.password && idCon==1 && emailCon==1 && phoneCon==1 ) {
              const res = await axios.post(URL_user, {
                ...this.user,
            })
        }

          if(idCon==0){
            alert('중복된 아이디 입니다.')
          }
          else if(this.inputPw !== this.user.password ){
              alert('비밀번호가 틀렸습니다.')
          }
          else if(emailCon==0){
              alert('중복된 이메일 입니다. ')
          }
          else if(phoneCon==0){
              alert('중복된 핸드폰번호 입니다.')
          }


    },


    // id 중복확인 메소드
    async idConfirm(){

      const res = await axios.get(URL_user + '/checkUserId/' + this.user.userid)

      console.log(res)
      if(res.data) alert('사용할 수 있는 아이디 입니다.')   // 서버에서 1이 응답이 오면,
      else alert('중복된 아이디 입니다.')          // 그렇지 않으면,

    },

    // 이메일 중복확인 메소드
    async emailConfirm(){

      const res = await axios.get(URL_user + '/checkUserEM/' + this.user.email)

      console.log(res)
      alert(res)

      if(res.data) alert('사용할 수 있는 이메일 입니다.')
      else alert('중복된 이메일 입니다.')

    },

    // 전화번호 중복확인 메소드
    async phoneConfirm(){

      const res = await axios.get(URL_user + '/checkUserPh/' + this.user.phone)

      if(res.data) alert('사용할 수 있는 전화번호 입니다.')
      else alert('중복된 전화번호 입니다.')

    },



  },




}
</script>



<style scoped>

/*v-text-field{*/
/*  width: 70%;*/
/*}*/

/*.full_screen{*/
/*  width: 70% !important;*/
/*}*/
/*.half_screen {*/
/*  width: 40% !important;*/
/*}*/

</style>
