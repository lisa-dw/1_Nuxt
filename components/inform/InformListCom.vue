<template>
  <v-row justify="center" align="center">
    <v-col cols="14" sm="8" md="6">

    <v-card>
<!-- 리스트 테이블 -->
      <v-data-table
        :headers="headers"
        :items="inform"
        :search="search"
      >
        <template v-slot:inform.title="{ item }">
          <NuxtLink :to="'/inform/informVeiwPage/${inform.id}'">
            {{ inform.title }}
          </NuxtLink>
        </template>

      </v-data-table>


<!-- 하단 데이터 검색 부분 -->
      <v-card-title>
        <v-spacer/> <!--오른쪽 정렬-->
        <v-text-field
          id="searchPart"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

    </v-card>

      <v-spacer/>
      <v-btn :to="writePage" id="writeBt" @click="">글쓰기</v-btn>



    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

const URL_imform = 'http://127.0.0.1:8000/api/informs'

export default {
  name: "InformList",

  data () {
    return {

      inform: [{
        title :'',              // 글제목
        user_userid : '',       //글쓴이(FK)
        id :'',                  // 글번호
        created_at : '',

      },],

      informs:[],

      headers: [
        {
          text: '글제목',
          align: 'start',
          value: 'title',
          sortable: false,
        },
        { text: '작성자',
          value: 'user_userid',
          sortable: false, },

        { text: '날짜',
          value: 'created_at' },
      ],

      search: '',

      writePage:'/inform/informCreate',
      veiwpage:'/inform/informVeiwPage',

    }
  },


  computed:{

  },

  // 페이지 시작하면 함수 실행
  mounted() {
      this.getList();
  },

  methods: {

    async getList(){

      const res = await axios.get(URL_imform)

      console.log('res.data')
      console.log(res.data)

      this.inform = res.data

      console.log('this.inform')
      console.log(this.inform)

    },

    async search(){

      const res = await axios.get()

    }

  },

}
</script>

<style scoped>

#writeBt{
  margin-top: 20px;
}

</style>
