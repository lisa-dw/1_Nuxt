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

        <!-- 사진 입력하는 컴포넌트 -->
        <sample-com v-model="inform.imgSrc" ref="UpdatePicture" :inform.imgSrc = 'inform.imgSrc'/>


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
import SampleCom from "./sampleCom";

const URL_informs = 'http://127.0.0.1:8000/api/informs';

export default {
  name: "InformUpdateCom",
  components: {SampleCom},
  data(){
    return{

      inform: {
        title: '',              // 글제목
        content: '',            // 글내용
        user_userid: '',        //글쓴이(FK)
        id:'',                  //글번호
        imgSrc:'',
      },
      informs:[],
      valid: true,
      rules: [
        v => !!v || '내용을 입력해주세요',
      ],

    }
  },

  mounted() {
    console.log('마운티드 됐니?')
    console.log(this.informId)
      this.getPage();
    console.log('마운티드 됨?')
    },


  methods:{


    async update(){
      this.inform.imgSrc=this.$refs.UpdatePicture.inform.imgSrc

      console.log('Start: update : res')
      console.log(res)

      const res = await axios.put(URL_informs +'/' + this.inform.id,
        {
          ... this.inform
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
      console.log('this.$route.params.informId')
      console.log(this.$route.params.informid)

      const page = await axios.get(URL_informs + '/'+ this.$route.params.informid);
      this.inform = page.data
    },

    props:{
      informId: String
    }


  },




}
</script>


<style scoped>

</style>
