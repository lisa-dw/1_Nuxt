<template>

  <user-join/>   <!-- 컴포넌트를 넣은 부분 -->
<!--  <user-test/>-->

</template>

<script>
import UserJoin from "../../components/user/UserJoin";
import UserTest from "../../components/user/UserTest";

export default {
  name: "user.vue",
  components: UserTest, UserJoin,
}
</script>

<style scoped>

</style>
