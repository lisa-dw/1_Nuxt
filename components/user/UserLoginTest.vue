<template>
  <v-row justify="center" align="center">
    <v-col cols="14" sm="8" md="6">

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="user.userid"
          label="아이디"
          rules=""
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="비밀번호"
          type="password"
          required
        ></v-text-field>


        <v-btn
          color="success"
          @click="login"
        >
          로그인
        </v-btn>

        <br><br><br>

        <v-btn
          :disabled="!valid"
          color="warning"
          @click="login"
        >
          아이디 찾기
        </v-btn>

        <v-btn
          color="warning"
          @click="login"
        >
          비밀번호 찾기
        </v-btn>
      </v-form>


    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

const URL_user = 'http://localhost:8000/api/users'

export default {
  name: "UserLogin",

  data(){
    return{

      user: {
        userid: '',
        password:'',
      },
      rules:{
        userid: [
          v => !!v || '아이디를 입력해주세요.',
        ],
        password:[
          v => !!v || '비밀번호를 입력해주세요.',
        ],
      },
      valid:true,

    }
  },

  methods: {

    async login(){
      console.log('실행되나?asd')

      try{

        const res = await axios.post(URL_user + '/login/',{
          userid: this.user.userid,
          password: this.user.password,

        })
          .then((res) => {

            if (res.status === 200){

              console.log('실행되나?')
              console.log(res)

              this.$store.commit("userStore/login", res.data);
              alert('로그인 되었습니다.')
              this.$router.push('/');

            }
          });
      }catch (e){

        console.log(e.response)

      }

    },



  },

}
</script>

<style scoped>

</style>
