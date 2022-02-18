<template>
  <div>
  <inform-create-com/>
  <inform-create-com-pic/>
  </div>
</template>

<script>
import InformCreateCom from "../../components/inform/informCreateCom";
import InformCreateComPic from "../../components/inform/InformCreateComPic";
export default {
  name: "informCreate",
  components: {InformCreateComPic, InformCreateCom}
}
</script>

<style scoped>

</style>
