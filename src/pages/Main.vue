<template>
  <v-app id="inspire">
    <!-- 头部 -->
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="company-logo"></span>
        <span class="company-name">olyNetCIM保險業務平台</span>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- 头部END -->

    <!-- 侧边导航 -->
    <v-navigation-drawer
      :mini-variant.sync="drawer"
      fixed
      app
    >
      <!-- 用户名 -->
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              userName 
              <router-link class="logout" to="/login">Logout</router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <!-- 用户名END -->

      <!-- 导航list -->
      <v-list dense class="pt-0">
        <!-- <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="sss"
        > -->
        <v-list-tile @click="sss" exact to="/">
          <v-list-tile-action>
            <v-icon medium>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/client-manager">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Client Manager</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Chats</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>All Mail</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Spam</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group prepend-icon="widgets" :value="false" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-title>Categorise</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="sss" to="/error">
            <v-list-tile-content>
              <v-list-tile-title>Social</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="sss" to="/error">
            <v-list-tile-content>
              <v-list-tile-title>Updates</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="sss" to="/error">
            <v-list-tile-content>
              <v-list-tile-title>Forums</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="sss" to="/error">
            <v-list-tile-content>
              <v-list-tile-title>Promotions</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage labels</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create new label</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tommy</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon medium>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>David Lo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
      <!-- 导航list END -->
    </v-navigation-drawer>
    <!-- 侧边导航END -->

    <!-- 页面内容区域 -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- 页面内容区域END -->
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false
    }),
    props: {
      source: String
    },
    methods: {
      sss () {}
    }
  }
</script>

<style lang="less" scoped>
.company-logo {
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: skyblue;
}
.company-name {
  float: left;
  line-height: 50px;
  margin-left: 30px;
}
.primary--text {
  color:red;
}
.logout {
  float: right;
  font-size: 14px;
  line-height: 24px;
}
</style>
