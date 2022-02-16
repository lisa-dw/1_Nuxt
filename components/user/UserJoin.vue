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
      <div class="span_padding" >
        <div v-show="this.validate.isUserIdDuplicated.show===false">
          <span v-if="validate.isUserIdDuplicated.duplicate === false">중복된 아이디 입니다</span>
        </div>sdf
        <div v-show="this.validate.isUserIdDuplicated.show===true"/>
      </div>

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
    <div class="span_padding">
      <div v-show="this.validate.isEmailDuplicated.show===false">
       <span v-if="this.validate.isEmailDuplicated.duplicate === false">사용할 수 없는 이메일입니다.</span>
      </div>
      <div v-show="this.validate.isEmailDuplicated.show===true"/>
    </div>

    <v-text-field
      v-model="user.phone"
      :rules="rules.phone"
      label="전화번호"
      required
      v-on:click="emailConfirm"
    ></v-text-field>
    <div class="span_padding">
      <div v-show="this.validate.isUserHpDuplicated.show===false">
         <span v-show="validate.isUserHpDuplicated.duplicate === false">사용할 수 없는 핸드폰 번호 입니다.</span>
      </div>
      <div v-show="this.validate.isUserHpDuplicated.show===true"/>
    </div>

    <v-text-field
      v-model="user.address"
      :rules="rules.address"
      label="주소"
      required
      v-on:click="phoneConfirm"
    ></v-text-field>


    <v-btn
      :disabled="!valid && this.duplicateCheck===true"
      color="success"
      @click="Join"
    >
      회원가입
    </v-btn>

<!--    <v-btn-->
<!--      color="warning"-->
<!--      @click="idConfirm"-->
<!--    >-->
<!--      아이디 중복확인-->
<!--    </v-btn>-->
<!--    -->
<!--    <v-btn-->
<!--      color="warning"-->
<!--      @click="emailConfirm"-->
<!--    >-->
<!--      이메일 중복확인-->
<!--    </v-btn>-->

<!--    <v-btn-->
<!--      color="warning"-->
<!--      @click="phoneConfirm"-->
<!--    >-->
<!--      핸드폰번호 중복확인-->
<!--    </v-btn>-->




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
        ],
        inputPw:[
          v => v === this.user.password || '비밀번호 확인이 틀렸습니다.',
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
    } // ## 변수가 길어서 함수로 만든 것.
  },

  methods: {

    // 회원가입 메소드
    async Join(){


       // if(this.inputPw == this.user.password) {

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
         // }
         // else {
         //   alert('비밀번호 확인이 틀렸습니다.')
         // }
    },


    // id 중복확인 메소드
    async idConfirm(){

      this.validate.isUserIdDuplicated.duplicate = false; // this.validate.isUserIdDuplicated.duplicate의 값을 초기화 시키기// 그렇지 않으면
      this.validate.isUserIdDuplicated.show = true;

      const res = await axios.get(`${URL_user}/checkUserId/${this.user.userid}`)
      console.log({res})
      if(res.data !== "") {
          this.validate.isUserIdDuplicated.duplicate = true;  // true 이면 중복이 없다는 것.
      }   // 서버에서 온 응답에 data가 있으면,(1이 응답이 오면),
      else this.validate.isUserIdDuplicated.show = false;
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

  },
}
</script>



<style scoped>

.span_padding{
  height: 20px;
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
