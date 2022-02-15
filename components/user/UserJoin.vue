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
      <div class="span_padding">
      <span v-show="validate.isUserIdDuplicated.duplicate === false">아이디 중복 해야 가입가능해요</span>
      </div>

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
      type="password"
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
      :disabled="valid && this.duplicateCheck===false"
      color="success"
      @click="Join"
    >
      회원가입
    </v-btn>

    <v-btn
      color="warning"
      @click="idConfirm"
    >
      아이디 중복확인
    </v-btn>


    <v-btn
      color="warning"
      @click="emailConfirm"
    >
      이메일 중복확인
    </v-btn>

    <v-btn
      color="warning"
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
          // v => (v && /.+A-Za-z0-9.+/) || '영문, 숫자만 가능합니다.',
          v => (v && v.length >= 8) || '8자 이상 입력해주세요. 영문, 숫자만 가능 합니다.',
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
          v => !!v || '핸드폰 번호를 입력해주세요. (\'-\' 제외)',
          v => (v && v.length <= 11) || '핸드폰 번호를 다시 확인하세요. (\'-\' 제외)'
        ],
        address: [
          v => !!v || '주소를 입력해주세요.'
        ],
      },

        valid: false,
        select: null,

      validate: {
        isEmailDuplicated: {
          duplicate: false,
          message: '이메일이 중복되었어요'
        },
        isUserIdDuplicated: {
          duplicate: false,
          message: '이메일이 중복되었어요'
        },
        isUserHpDuplicated: {
          duplicate: false,
          message: '이메일이 중복되었어요'
        }
      }


    }
  },
  computed: {
    duplicateCheck() {
      return this.validate.isUserIdDuplicated.duplicate && this.validate.isUserHpDuplicated.duplicate && this.validate.isEmailDuplicated.duplicate
    } // ## 변수가 길어서 함수로 만든 것.
  },

  methods: {

    // 회원가입 메소드
    async Join(){



       if(this.inputPw == this.user.password) {

           try {
             console.log('어디까지 왔니')
             const res = await axios.post(URL_user, {
               ...this.user,
             })
             alert("회원가입이 되었습니다.");
             await this.$router.push('/');

           } catch (e) {

             console.log(e.response)
             if (e.response.status === 422) {

               if (e.response.data.errors.userid) {
                 alert('아이디는 영문, 숫자만 가능합니다.')
               }
               else if (e.response.data.errors.password) {
                 alert('비밀번호는 영문, 숫자, 특수문자를 조합 해주세요.')
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
         }
         else {
           alert('비밀번호 확인이 틀렸습니다.')
         }
    },


    // id 중복확인 메소드
    async idConfirm(){

      const res = await axios.get(`${URL_user}/checkUserId/${this.user.userid}`)

      if(res.data) {
        alert('사용할 수 있는 아이디 입니다.');
          this.validate.isUserIdDuplicated.duplicate = true;
      }   // 서버에서 온 응답에 data가 있으면,(1이 응답이 오면),
      else alert('중복된 아이디 입니다.')          // 그렇지 않으면,
    },

    // 이메일 중복확인 메소드
    async emailConfirm(){

      const res = await axios.get(URL_user + '/checkUserEM/' + this.user.email)

      if(res.data) {
        alert('사용할 수 있는 이메일 입니다.');
          this.validate.isEmailDuplicated.duplicate = true;
      }
      else alert('중복된 이메일 입니다.')
    },

    // 전화번호 중복확인 메소드
    async phoneConfirm(){

      const res = await axios.get(URL_user + '/checkUserPh/' + this.user.phone)

      if(res.data){
        alert('사용할 수 있는 전화번호 입니다.');
        this.validate.isUserHpDuplicated.duplicate = true;
      }
      else alert('중복된 전화번호 입니다.')
    },

  },
}
</script>



<style scoped>

.span_padding{
  height: 10px;
}
span{
  color: darkgray;
}

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
