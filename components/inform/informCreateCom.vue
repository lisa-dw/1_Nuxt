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

        <sample-com ref="UpdatePicture"/>

        <v-btn
          :disabled="!valid"
          @click="create">글쓰기</v-btn>

      </v-form>

</template>

<script>
import axios from "axios";
import SampleCom from "./sampleCom";

const URL_informs = 'http://127.0.0.1:8000/api/informs';

export default {
  name: "informCreateCom",
  components: {SampleCom},
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
    }
  },

  watch:{
    file(v){
      console.log(v)
    }
  },

  methods:{

    async create(){

      console.log(this.$refs.UpdatePicture.inform.imgSrc)
      this.inform.imgSrc=this.$refs.UpdatePicture.inform.imgSrc
      console.log('create 함수')

      // const formData = new FormData();
      // console.log(formData)
      console.log(this.inform.imgSrc)
      // this.inform.imgSrc=formData.append("image", this.inform.imgSrc);
      console.log('자식 컨포넌트에서 url 잘 들어옴')


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

      // console.log('sub uploadImg : ', this.$refs.childComponent);


      // return this.$router.push('/inform/informVeiwPage'+'${this.inform.id}')

      await this.$router.push('/inform/informList')

    },



    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      console.log({file})
      console.log(file)
      this.inform.imgSrc = file;
      console.log(file)
      console.log(file.name)
      console.log(this.inform.imgSrc)

    },

  },



}
</script>

<style scoped>


</style>
