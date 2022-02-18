<template>
<div style="width: 30%">

<!--    <v-file-input multiple accept="image/*" label="picture Upload" ref="serveImg"/>-->

<!--    <v-btn @click="ddd">서버에 전송하기</v-btn>-->

  <v-file-input ref="image" multiple accept="image/*" label="File input" @change="uploadImg()"/>

  <img  :src="image" alt="" style="width: 500px; height: auto;">


</div>
</template>


<script>

export default {
  data() {
    return {
      image: "",
    };
  },
  props:{
    file: Object
  },

  methods: {
    async uploadImg() {
      console.log('들어왔다')
      var image = this.$refs.image.files[0]
      const url = URL.createObjectURL(image)
      this.image = url

      console.log(url)
      console.log(this.image)
    },

    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      console.log({file})
      this.image = file;
      this.$emit.file = file
    },
  },
};
</script>


<style scoped>

</style>
