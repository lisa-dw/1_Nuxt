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
          @click="update">수정하기</v-btn>
        <v-btn @click="this.delete">삭제하기</v-btn>

      </v-form>

    </v-col>
  </v-row>
</template>


<script>
import axios from "axios";

const URL_informs = 'http://127.0.0.1:8000/api/informs';

export default {
  name: "InformUpdateCom",


  data(){
    return{

      inform: {
        title: '',              // 글제목
        content: '',            // 글내용
        user_userid: '',        //글쓴이(FK)
        id:'',                  //글번호
      },
      informs:[],
      valid: true,
      rules: [
        v => !!v || '내용을 입력해주세요',
      ],

    }
  },

  mounted() {
      this.getPage();
    },


  methods:{

    async update(){

      console.log('Start: update : res')
      console.log(res)

      const res = await axios.put(URL_informs +'/' + this.inform.id,
        {
          ... this.item
      })
      console.log('update : res')
      console.log(res)
      console.log('update : res.data')
      console.log(res.data)

      await this.$router.push('/inform/informList')
    },

    //글 삭제
    async delete(){
      const page = await axios.delete(URL_informs+'/'+this.inform.id)
      console.log(page)
    },

    // 데이터 가져오기 (mounted함)
    async getPage(){
      const page = await axios.get(URL_informs+'/'+1);
      this.inform = page.data
    },


  },




}
</script>


<style scoped>

</style>
