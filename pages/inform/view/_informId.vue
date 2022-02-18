<!-- 페이지 파일 -->
<template>
  <!-- :informId="informId" => :informId -> 이 컨포넌트의 informId를 해당 page에
        data() -> informId 로 사용한다. -->
  <inform-veiw-page-com
    id = "veiwPageCom"
    :informId="informId"
  />
</template>

<script>

import InformVeiwPageCom from "../../../components/inform/InformVeiwPageCom";
export default {
  name: "informPage",
  components: {InformVeiwPageCom},
  data(){
    return {
      informId:"",
      informData: {

      }
    }
  },
  beforeMount() {
    const url = "localhost"

    const informId = this.$route.params.informId
    this.informId = this.$route.params.informId

    console.log(this.$route, '여긴 _informId.vue 파일' , typeof(this.informId));

    // this.$axios.get(`${url}/${informId}`).then(r =>{
    //   console.log(r, '서버의응답 이고 이걸 위에뿌려주세요')
    //   this.informData = r
    // }).catch(r => {
    //   console.log(r, '에러가발생했어요')
    // })
  }
}

</script>



<style scoped>

#veiwPageCom{
  margin-top: 50px;
}


</style>
