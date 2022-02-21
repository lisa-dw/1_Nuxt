<template>
  <div>
    <!-- 파일 post 하는 form과 버튼 부분. -->
    <form method="post" enctype="multipart/form-data">
      <input ref="image" @change="uploadImg()" type="file" id="chooseFile" name="chooseFile" accept="image/*">
    </form>
    <!-- 미리보기 -->
    <img  :src="inform.imgSrc" alt="" style="width: 500px; height: auto;">
  </div>
</template>

<script>
export default {
  name: "sampleCom",

  data() {
    return {
      inform:{
        imgSrc : '',
      },
      informImgSrc:'',

    }
  },

  methods: {

    uploadImg() {
      console.log(this.informImgSrc)
      console.log(this.informImgSrc)

      // this.informImgSrc = '';

      var image = this.$refs.image.files[0]
      const url = URL.createObjectURL(image)  // 가져온 파일을 ObjectURL로 바꿈.
      this.inform.imgSrc = url



      this.$emit('click', this.inform.imgSrc)  // 부모컨포넌트에 this.inform.imgSrc 데이터를 보냄.

      // console.log(url)
      // console.log(this.inform.imgSrc)
    }
  },

  // props:{
  //   inform.imgSrc: String,
  // },
}
</script>

<style scoped>


</style>
