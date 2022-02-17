<template>

  <news-main-list2/>

<!--  <news-main-list/>-->

<!--  <user-login/> &lt;!&ndash; 컴포넌트로 로그인 페이지 조립 &ndash;&gt;-->

</template>



<script>
import UserLogin from "../../components/user/UserLogin";
import NewsMainList from "../../components/news/NewsMainList";
import NewsMainList2 from "../../components/news/NewsMainList2";
export default {
  name: "Login",
  components: {NewsMainList2, NewsMainList, UserLogin}
}
</script>



<style scoped>

</style>
