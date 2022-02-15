<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
      <v-text-field
        v-model="user.userid"
        label="아이디"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="비밀번호"
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

    }
   },

  methods: {

    async login(){

      const res = await axios.get(URL_user + '/Login'+ this.user.userid)
      console.log('실행되나?')
      console.log(res)
      alert(res.data)
    },



  },

}
</script>

<style scoped>

</style>
