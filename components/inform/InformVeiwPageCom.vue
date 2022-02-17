<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-simple-table id="table1">
<!--        <thead>-->
<!--          <th>글제목</th>-->
<!--          <th>작성자</th>-->
<!--          <th>작성날짜</th>-->
<!--        </thead>-->

        <tbody>
        <tr>
          <th style="width: 65%">{{ inform.title }}</th>
          <th>{{ inform.user_userid }}</th>
          <th>{{inform.updated_at}}</th>
        </tr>
        </tbody>
      </v-simple-table>

      <div id="content">
        <br> {{inform.content}} <br>
      </div>



      <v-btn id="BT" :to="goMainList">목록으로</v-btn>
      <v-spacer />
      <v-btn id="BT" :to="writePage">글쓰기</v-btn>
      <v-btn id="BT" :to="updatePage">글수정</v-btn>
      <v-btn id="BT" @click="this.delete">글삭제</v-btn>


<!--      <v-img-->
<!--        lazy-src="https://picsum.photos/id/11/10/6"-->
<!--        max-height="300"-->
<!--        max-width="500"-->
<!--        src="https://picsum.photos/id/11/500/300"-->
<!--      ></v-img>-->

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

const URL_informs = 'http://127.0.0.1:8000/api/informs/1' ;
// const URL_informs = 'http://127.0.0.1:8000/api/informs/${inform.id}' ;

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

    },

    informs: [],

    goMainList:'/inform/informList',
    writePage:'/inform/informCreate',
    updatePage:'/inform/informUpdate/${inform.id}',


  }
},

  mounted() {
    this.getPage();
  },

  computed:{

  },

  methods:{

    // 데이터 가져오기 (mounted함)
    async getPage(){
      const page = await axios.get(URL_informs);
      this.inform = page.data
    },

    //글 삭제
    async delete(){
      const page = await axios.delete(URL_informs+'/'+this.inform.id)
      console.log(page)
    },

  },

}


</script>


<style scoped>

#table1{
  margin-top: 50px;
}


#BT{
  margin: 5px;
}

#content{
  height: 500px;
  border-bottom: darkgrey solid;
  border-top: darkgrey solid 1px;
  margin-top: 15px;
  margin-bottom: 20px;
}

thead{
  border: lightgray;
}

</style>
