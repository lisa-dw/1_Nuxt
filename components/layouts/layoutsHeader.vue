<template>
  <div>

    <!--## 왼쪽 사이드바-->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="/cat.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ profile.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ profile.message }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>



    <!--## 헤더-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"  />

      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />

      <!--로그인 버튼, 회원가입 버튼-->
      <v-spacer />

        <v-btn :to="Join.to">{{ Join.title }}</v-btn>
        <v-btn :to="Login.to">{{ Login.title }}</v-btn>


    </v-app-bar>


  </div>
</template>

<script>
export default {
  name: "layoutsHeader",

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'News & Information',
          to: '/news/newsMainList'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Project',

      Login:{
        title: 'Login',
        to: '/user/Login'
      },
      Join:{
        title: 'Join',
        to: '/user/userJoin',
      },

      profile:{
        name:'비회원',
        message:'방문하신 것을 환영합니다.',
      },

    }
  }
}
</script>
