<template>
  <div>

    {{users}}

    <button
      @click="read">ss</button>
  </div>
</template>

<script>

import axios from 'axios'

const URL_user = 'http://localhost:8000/api/users'

export default {
  name: "UserTest",

  data(){
    return{
      user:{
        id:'',
        userid:'',
        name:'',
        password:'',
        email:'',
        phone:'',
        address:'',
      },
      users:[],
    }
  },

  methods: {

    async read(){
      const res = await axios.get(URL_user)
      console.log(res)
      this.users = res.data
    },

  },


}
</script>

<style scoped>

</style>
