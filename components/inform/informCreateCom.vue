<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          label="writer"
          :rules="rules"
          hide-details="auto"
          v-model="inform.user_userid"
          style="margin-bottom: 30px"
        />

      <v-text-field
        label="title"
        :rules="rules"
        hide-details="auto"
        v-model="inform.title"
        style="margin-bottom: 30px"
      />

          <v-textarea
            filled
            label="contents"
            :rules="rules"
            auto-grow
            v-model="inform.content"
          ></v-textarea>

        <v-btn
          :disabled="!valid"
          @click="create">글쓰기</v-btn>

      </v-form>

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

const URL_informs = 'http://127.0.0.1:8000/api/informs';

export default {
  name: "informCreateCom",

  data(){
    return{

      inform: {
        title: '',              // 글제목
        content: '',            // 글내용
        user_userid: '',        //글쓴이(FK)
      },
      informs:[],
      valid: true,
      rules: [
        v => !!v || '내용을 입력해주세요',
      ],

    }
  },

  methods:{

    async create(){

      const res = await axios.post(URL_informs, {
        title: this.inform.title,
        content: this.inform.content,
        user_userid:this.inform.user_userid,
      })
      console.log('create : res')
      console.log(res)
      console.log('create : res.data')
      console.log(res.data)

      await this.$router.push('/inform/informList')

    }

  },



}
</script>

<style scoped>


</style>
