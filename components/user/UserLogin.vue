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
        color="warning"
        @click="login"
      >
        로그인
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
      const res = await axios.get(URL_user, {

      })
    },



  },

}
</script>

<style scoped>

</style>
