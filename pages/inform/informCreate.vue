<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
  <inform-create-com id="create"/>


  </v-col>
  </v-row>
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

#create{
  margin-top: 30px;
}

</style>
