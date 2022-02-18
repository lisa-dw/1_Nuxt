<!-- 페이지 파일 -->
<template>
  <inform-veiw-page-com
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

</style>
