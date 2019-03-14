<template>
  <v-app id="inspire">
    <!-- 头部 -->
    <v-toolbar
      color="#06a1f7"
      card
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="company-logo">
          <img src="../../static/logo.png" alt="">
        </span>
        <span class="company-name">{{$t('Company')}}</span>       
      </v-toolbar-title>
      
      <div class="lang">
        <v-select :items="['English','繁體中文']" v-model="lang" solo hide-details light @change="chooseLang"></v-select>
      </div>
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
              <v-icon size="28" class="usericon" :class="{userIcon: drawer}">account_circle</v-icon>
              <span class="username" v-if="!drawer">{{userName}}</span>
              <div class="logout" @click="logout"><v-icon color="#06a1f7" size="24">power_settings_new</v-icon></div>
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
            <v-icon size="24">home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Home')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/client-manager">
          <v-list-tile-action>
            <v-icon size="24">widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('ClientManager')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/Account-statistics">
          <v-list-tile-action>
            <v-icon size="24">assessment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('AccountStatistics')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('File')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Edit')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('View')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">dns</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Managers')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">backup</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Policy')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Data')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Tools')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">aspect_ratio</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Window')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sss" to="/error">
          <v-list-tile-action>
            <v-icon size="24">live_help</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('Help')}}</v-list-tile-title>
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
import helper from '../helper'
import i18n from '../i18n/'
export default {
  name: 'Main',
  created () {
    this.authority()
    this.userName = helper.ls.get('PolyName') || null
    if (!this.userName) this.$router.push('/login')
  },
  data () {
    let localeLang = helper.ls.get('locale')
    if (localeLang === 'zh-CN') {
      localeLang = '繁體中文'
    } else {
      localeLang = 'English'
    }
    return {
      userName: null,
      lang: localeLang,
      drawer: null,
      drawerRight: null

    }
  },
  props: {
    source: String
  },
  methods: {
    authority () {
      this.$fetch({
        method: 'POST',
        url: '/ipoly/user/getAuthorityInfo.json'
      })
        .then(res => {
          if (res && res.body) {
            let { ugsCli } = res.body
            helper.ls.set('authority', ugsCli)
          }
        })
    },
    sss () {},
    chooseLang (lang) {
      if (lang === '繁體中文') {
        helper.ls.set('locale', 'zh-CN')
        i18n.locale = 'zh-CN'
      } else if (lang === 'English') {
        helper.ls.set('locale', 'en-US')
        i18n.locale = 'en-US'
      }
    },
    logout () {
      this.$fetch({
        method: 'post',
        url: '/ipoly/user/loginOut.json'
      })
      .then(res => {
        helper.ls.set('polyRouter', null)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.company-logo {
  float: left;
  width: 38px;
  height: 38px;
  line-height: 70px;
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
  font-weight: bold;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.usericon {
  vertical-align: middle;
}
.username {
  font-size: 16px;
  color: #000;
}
.userIcon {
  margin-left: 12px;
} 
.lang {
  margin-left: auto;
  height: 34px;
}
</style>
<style lang="less">
.lang {
  .v-input__control {
    min-height: 34px !important;
    width: 150px;
  }
}
.v-list__tile__action {
  min-width: 47px;
}
.v-toolbar__content .v-list__tile {
  padding: 0 26px 0 24px;
}
.pt-0 .v-list__tile {
  margin: 17px 0 16px 0;
  padding: 0 28px;
}
</style>

