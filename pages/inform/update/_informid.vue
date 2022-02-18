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
