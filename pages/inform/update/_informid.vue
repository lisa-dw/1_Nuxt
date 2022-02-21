<template>
  <inform-update-com
  :informId="informId"
  />
</template>

<script>
import InformUpdateCom from "../../../components/inform/InformUpdateCom";
export default {
  name: "informUpdate",
  components: {InformUpdateCom},
  data(){
    return{
      inform: {
        title: '',              // 글제목
        content: '',            // 글내용
        user_userid: '',        //글쓴이(FK)
        id:'',                  //글번호
        imgSrc:'',
      },
      informId:'',
      informData: {

      }
    }
  },

  beforeMount(){

    const url = 'localhost'

    const informId = this.$route.params.informId
     this.informId = this.$route.params.informId

  }
}
</script>

<style scoped>

</style>
