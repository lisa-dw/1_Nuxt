<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <!-- 상단 : 글제목, 작성자, 날짜 -->
      <v-simple-table>
        <tbody>
        <tr>
          <th style="width: 65%">{{ inform.title }}</th>
          <th>{{ inform.user_userid }}</th>
          <th>{{inform.updated_at}}</th>
        </tr>
        </tbody>
      </v-simple-table>

      <!-- 이미지 -->
      <div id="imgDiv">
        <v-img :src="inform.imgSrc" max-height="300"/>
      </div>
      <div id="content">
        <br> {{inform.content}} <br>
      </div>

      <v-btn id="BT" :to="goMainList">목록으로</v-btn>
      <v-spacer />
      <v-btn id="BT" :to="writePage">글쓰기</v-btn>
      <v-btn id="BT" :to="`${updatePage}${inform.id}`">글수정</v-btn>
      <v-btn id="BT" @click="this.delete">글삭제</v-btn>

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

const URL_informs = 'http://127.0.0.1:8000/api/informs/' ;

export default {
  name: "InformVeiwPageCom",

data () {
  return {

    inform: {
      title: '',              // 글제목
      content: '',            // 글내용
      user_userid: '',       //글쓴이(FK)
      id: '',                  // 글번호
      updated_at: '',
      imgSrc:'',

    },

    informs: [],

    goMainList:'/inform/informList',
    writePage:'/inform/informCreate',
    updatePage:'/inform/update/',

  }
},

  mounted() {
    console.log(`여긴 informViewPage이고 props는 ${this.informId}`)
    this.getPage();
  },

  computed:{

  },

  methods:{

    // 데이터 가져오기 (mounted함)
    async getPage(){
      const page = await axios.get(URL_informs + this.$route.params.informId);
      this.inform = page.data
    },

    //글 삭제
    async delete(){
      const page = await axios.delete(URL_informs + this.inform.id)
      console.log(page)
      this.$router.go(-1);
    },

  },
  // props:{
  //   informId: String
  // }

}


</script>


<style scoped>


#BT{
  margin: 5px;
}

#imgDiv{
  border-top: darkgrey solid 1px;
  padding-top: 20px;
  margin-top: 15px;
}

#content{
  /*height: 500px;*/
  padding-top: 30px;
  padding-bottom: 70px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: darkgrey solid;
  margin-bottom: 20px;
}

thead{
  border: lightgray;
}

</style>
