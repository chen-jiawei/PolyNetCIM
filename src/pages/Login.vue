<template>
<div>
  <div class="prevet-default">
    <div class="cover"></div>
    <input type="text">
    <input type="password">
  </div>
  <v-alert class="my-alert" color="#FB8C00" :value="showErrorMsg" type="warning" transition="scale-transition">
    {{errorMsg}}
  </v-alert>
  
  <div class="wrap">
    <!-- 标题 -->
    <div class="wrap_title">
      <div class="logo"></div>
      <!-- 选择语言组件 -->
      <div class="lang">
        <div class="change-lang" @click="changeLang">{{lang}}</div>
      </div>

    </div>
    <div class="about">
      <div class="about-me">{{$t('About')}}</div>
    </div>
    <!-- 登录 -->
    <div class="login">
      <div class="right-logo"></div>
      <div class="login-title">{{$t('Company')}}</div>
      <div class="login-form">
        <v-text-field
            color="#2196F3"
            required
            v-model="name"
            :rules="nameRules"
            :label="$t('UserName')"
            type="text"
            :error="nameError"
        ></v-text-field>
        <v-text-field
          color="#2196F3"
          required
          v-model="pwd"
          :rules="pwdRules"
          :label="$t('Pwd')"
          type="password"
          :error="pwdError"
        ></v-text-field>
        <v-text-field
          color="#2196F3"
          required
          v-model="code"
          :rules="codeRules"
          :label="$t('Code')"
          type="text"
          :error="codeError"
          class="code"
        ></v-text-field>
        <div class="verify-box" @click="refreshCode">
          <Sidentify :identifyCode="identifyCode"></Sidentify>
        </div>
        <v-btn @click="submit" block color="info" :loading="isLoading" style="background:#2196F3;">{{$t('LoginIn')}}<v-icon>　send</v-icon></v-btn>
        <div class="forget">
          <a>{{$t('ForgetPwd')}}</a>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="myfooter">
      <div class="copyright"><span class="left">{{$t('Copyright')}}</span><span class="right">{{$t('LastUpdateTime')}}2019-1-1　12：12</span></div>
      <div>
        <a href="#">{{$t('ServiceAagreement')}}</a> | <a href="#">{{$t('PrivacyPolicyStatement')}}</a> | <a href="#">{{$t('CollectionStatement')}}</a> | <a href="#">{{$t('RegulatoryAuthority')}}</a>
      </div>
    </div>

  </div>
</div>         
</template>

<script>
import helper from '../helper'
import i18n from '../i18n/'
import Sidentify from '../components/identify'
export default {
  components: {
    Sidentify
  },
  mounted () {
    if (this.$route.params.id) {
      this.showErrorMsg = true
      this.errorMsg = this.$t('Logintimeout,pleaseloginagain!')
      this.closeAlert()
    }
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  data () {
    let localelang = localStorage.getItem('locale') === '"en-US"' ? '繁體中文' : 'English'
    return {
      isLoading: false,
      lang: localelang,
      name: 'Z113',
      nameError: false,
      nameRules: [
        v => !!v || this.$t('NameEmpty')
      ],
      pwd: 'test1234',
      pwdError: false,
      pwdRules: [
        v => !!v || this.$t('PwdEmpty')
      ],
      code: '',
      codeError: false,
      codeRules: [
        v => !!v || this.$t('CodeEmpty')
      ],
      showErrorMsg: false,
      identifyCode: '',
      identifyCodes: '1234567890',
      errorMsg: '',
      time: null
    }
  },
  computed: {
    localeLang () {
      return localStorage.getItem('locale') === '"en-US"' ? '繁體中文' : 'English'
    }
  },
  methods: {
    // store管理
    // onSuccess (data) {
    //   this.$store.commit('setAuth', data)
    //   this.$router.replace('/')
    // },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    submit () {
      if (!this.name) {
        this.nameError = true
        return
      }
      if (!this.pwd) {
        this.pwdError = true
        return
      }
      if (this.code !== this.identifyCode) {
        this.codeError = true
        return
      }
      this.login()
    },
    login () {
      // 测试：
      // 用户名： Z113
      // 密码：test1234
      this.isLoading = true
      this.$fetch({
        method: 'POST',
        url: '/ipoly/user/login.json',
        body: {
          staUser: this.name,
          staPassd: this.pwd
        }
      })
      .then(res => {
        if (res.responseCode !== 1000 && res.responseCode !== 5000) {
          this.isLoading = false
          this.showErrorMsg = true
          this.errorMsg = res.message
          this.closeAlert()
        } else {
          this.showErrorMsg = false
          helper.ls.set('userName', this.name)
          this.$router.push('/')
        }
      })
    },
    closeAlert () {
      if (!this.time) {
        this.time = setTimeout(() => {
          this.showErrorMsg = false
          this.time = null
        }, 5000)
      }
    },
    changeLang () {
      if (this.lang === '繁體中文') {
        this.lang = 'English'
        helper.ls.set('locale', 'zh-CN')
        i18n.locale = 'zh-CN'
      } else if (this.lang === 'English') {
        this.lang = '繁體中文'
        helper.ls.set('locale', 'en-US')
        i18n.locale = 'en-US'
      }
    }
  },
  created () {
    document.onkeydown = () => {
      let key = window.event.keyCode
      if (key === 13) {
        this.submit()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.prevet-default {
  width: 1px;
  height: 1px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  .cover {
    width: 1px;
    height: 1px;
    position: relative;
    z-index: 99;
  }
}
.wrap {
  width: 1268px;
  height: 715px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -358px;
  margin-left: -634px;
  box-sizing: border-box;
  padding: 16px;
  .right-logo {
      width: 244px;
      height: 46px;
      background: url(../../static/right_logo.jpg) no-repeat;
      position: absolute;
      top: 150px;
      right: 16px;
    }
  .wrap_title {
    height: 54px;
    font-size: 14px;
    color: #333;
    .logo {
      float: left;
      width: 155px;
      height: 46px;
      background: url(../../static/logo.jpg) no-repeat;
      margin-top: 9px;
    }
    .lang {
      float: right;
      line-height: 90px;
      position: relative;
      .change-lang {
        cursor: pointer;
      }
    }
  }
  .about {
    border-bottom: 7px solid #0661AA;
    margin-top: 17px;
    -moz-box-shadow: 1px 6px 9px #828282; 
    -webkit-box-shadow: 1px 6px 9px #828282; 
    box-shadow: 1px 6px 9px #828282;
    position: relative;
    .about-me {
      padding: 0 20px;
      line-height: 38px;
      background: #0661AA;
      border-radius: 3px;
      text-align: center;
      color: #FFF;
      font-size: 14px;
      position: absolute;
      top: 0px;
    }
  }
  .login {
    margin-top:100px;
    height: 450px;
    background: url(../../static/login_bg.jpg) no-repeat 270px 240px;
    
    .login-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 44px;
    }
    .login-form {
      width: 250px;
      input {
        padding: 0;
        margin-top: 27px;
      }
      .code {
        width: 150px;
        float: left;
        margin-bottom: 10px;
        height: 80px;
      }
      .verify-box {
        width: 80px;
        float: left;
        margin-left: 20px;
        margin-top: 10px;
      }
      .forget {
        font-size: 12px;
        color: #00b0f0;
        margin-top: 17px;
        a {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .myfooter {
    border-top: 1px dashed #999999;
    font-size: 12px;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .copyright {
      line-height: 32px;
      height: 32px;
    }
    a {
      text-decoration: none;
      color: #000;
    }
  }
}

</style>

