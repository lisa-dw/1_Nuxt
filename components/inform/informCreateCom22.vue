<template>
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


        <inform-create-com-pic
          ref="childComponent"
          :file="file"
        />

        <v-btn
          :disabled="!valid"
          @click="create">글쓰기</v-btn>

      </v-form>

</template>

<script>
import axios from "axios";
import InformCreateComPic from "./InformCreateComPic";

const URL_informs = 'http://127.0.0.1:8000/api/informs';

export default {
  name: "informCreateCom",
  components: {InformCreateComPic},
  data(){
    return{

      inform: {
        title: '',              // 글제목
        content: '',            // 글내용
        user_userid: '',        //글쓴이(FK)
        imgSrc: '',
      },
      informs:[],
      valid: true,
      rules: [
        v => !!v || '내용을 입력해주세요',
      ],
      file:{}
    }
  },

  computed:{
  //
  },
  watch:{
    file(v){
      console.log(v)
    }
  },

  methods:{

    async create(){
      console.log('create 함수')

      this.$refs.childComponent.submit();
      console.log('자식 함수 실행')
      this.inform.imgSrc = this.components.InformCreateComPic.data().image;
      console.log('this.inform.imgSrc')
      console.log(this.inform.imgSrc)

      const res = await axios.post(URL_informs, {
        title: this.inform.title,
        content: this.inform.content,
        user_userid:this.inform.user_userid,
        imgSrc:this.inform.imgSrc,
      })

      console.log('create : res')
      console.log(res)
      console.log('create : res.data')
      console.log(res.data)
      console.log('this.$route.params.id')
      console.log(this.$route)

      console.log('sub uploadImg : ', this.$refs.childComponent);


      // return this.$router.push('/inform/informVeiwPage'+'${this.inform.id}')

      await this.$router.push('/inform/informVeiwPage')

    },
    childComponent(){
      console.log('asdasd')
    }

  },



}
</script>

<style scoped>


</style>
